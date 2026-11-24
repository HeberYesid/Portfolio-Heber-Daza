import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Chatbot from './Chatbot'

afterEach(() => vi.unstubAllGlobals())

describe('Asistente IA', () => {
  it('no envía preguntas vacías y mantiene un campo accesible', async () => {
    const fetchChat = vi.fn()
    vi.stubGlobal('fetch', fetchChat)
    render(<Chatbot />)

    await userEvent.setup().type(screen.getByRole('textbox', { name: 'Pregunta para el asistente' }), '   {Enter}')

    expect(screen.getByRole('button', { name: 'ENVIAR' })).toBeDisabled()
    expect(fetchChat).not.toHaveBeenCalled()
  })

  it('envía sugerencias y conserva el historial para un seguimiento', async () => {
    const fetchChat = vi.fn()
      .mockResolvedValueOnce(Response.json({ answer: '**Investment Tracker** y Code Duel.' }))
      .mockResolvedValueOnce(Response.json({ answer: 'Code Duel usa Spring Boot.' }))
    vi.stubGlobal('fetch', fetchChat)
    const user = userEvent.setup()
    render(<Chatbot />)

    const question = '¿Qué proyectos has desarrollado?'
    await user.click(screen.getByRole('button', { name: /Qué proyectos has desarrollado/ }))
    expect(await screen.findByText('Investment Tracker', { selector: 'strong' })).toBeVisible()
    expect(fetchChat).toHaveBeenNthCalledWith(1, '/api/chat', expect.objectContaining({
      method: 'POST', body: JSON.stringify({ question, history: [] }),
    }))
    const input = screen.getByRole('textbox')
    expect(input).toHaveFocus()
    await user.type(input, '¿Y qué usa el segundo?{Enter}')
    expect(await screen.findByText('Code Duel usa Spring Boot.')).toBeVisible()
    expect(fetchChat).toHaveBeenNthCalledWith(2, '/api/chat', expect.objectContaining({
      body: JSON.stringify({ question: '¿Y qué usa el segundo?', history: [
        { role: 'user', content: question },
        { role: 'model', content: '**Investment Tracker** y Code Duel.' },
      ] }),
    }))
    expect(screen.queryByText(/modo local/)).not.toBeInTheDocument()
  })

  it.each([403, 404, 429, 502, 503, 504])('responde en modo local ante HTTP %s', async status => {
    const fetchChat = vi.fn().mockResolvedValue(new Response(null, { status }))
    vi.stubGlobal('fetch', fetchChat)
    const user = userEvent.setup()
    render(<Chatbot />)

    await user.type(screen.getByRole('textbox'), '¿Cómo funciona Code Duel?{Enter}')
    expect(await screen.findByText(/modo local/)).toBeVisible()
    expect(screen.getByText(/ejecución aislada de código con Docker/)).toBeVisible()
    await user.type(screen.getByRole('textbox'), '¿Qué salario pide Heber?{Enter}')
    expect(await screen.findByText(/No encontré ese dato/)).toBeVisible()
    expect(fetchChat).toHaveBeenCalledTimes(1)
  })

  it('ofrece un contacto del sitio si no hay red', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Sin red')))
    render(<Chatbot />)

    await userEvent.setup().click(screen.getByRole('button', { name: /Cómo puedo contactarte/ }))
    expect(await screen.findByRole('link', { name: 'sección de contacto' })).toHaveAttribute('href', '#contact')
  })
})
