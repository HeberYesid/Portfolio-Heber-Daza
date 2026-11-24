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
      .mockResolvedValueOnce(Response.json({ answer: '**Investment Tracker** y Code Duel.', provider: 'groq', model: 'openai/gpt-oss-20b' }))
      .mockResolvedValueOnce(Response.json({ answer: 'Code Duel usa Spring Boot.', provider: 'openrouter', model: 'qwen/qwen3-next-80b-a3b-instruct:free' }))
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
    expect(screen.getByText('Groq · openai/gpt-oss-20b')).toBeVisible()
    expect(screen.getByText('OpenRouter · qwen/qwen3-next-80b-a3b-instruct:free')).toBeVisible()
    expect(fetchChat).toHaveBeenNthCalledWith(2, '/api/chat', expect.objectContaining({
      body: JSON.stringify({ question: '¿Y qué usa el segundo?', history: [
        { role: 'user', content: question },
        { role: 'model', content: '**Investment Tracker** y Code Duel.' },
      ] }),
    }))
    expect(screen.queryByText(/modo local/)).not.toBeInTheDocument()
  })

  it('muestra el proveedor aunque el modelo no esté identificado', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ answer: 'Una respuesta generada.', provider: 'openrouter' })))
    render(<Chatbot />)

    await userEvent.setup().click(screen.getByRole('button', { name: /Qué proyectos has desarrollado/ }))

    expect(await screen.findByText('OpenRouter · modelo no informado')).toBeVisible()
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

  it.each([
    ['idioams', 'Inglés B1'],
    ['idiomas', 'Inglés B1'],
    ['herramientss', /Git, GitHub, Swagger\/OpenAPI/],
    ['herramientas', /Git, GitHub, Swagger\/OpenAPI/],
    ['¿Qué herramientas usa Heber?', /Git, GitHub, Swagger\/OpenAPI/],
  ])('responde a «%s» con datos del perfil si no hay IA disponible', async (question, expected) => {
    const fetchChat = vi.fn().mockResolvedValue(new Response(null, { status: 503 }))
    vi.stubGlobal('fetch', fetchChat)
    render(<Chatbot />)

    await userEvent.setup().type(screen.getByRole('textbox'), `${question}{Enter}`)

    expect(await screen.findByText(expected)).toBeVisible()
    expect(screen.getByText(/modo local/)).toBeVisible()
    expect(fetchChat).toHaveBeenCalledOnce()
  })

  it('ofrece un contacto del sitio si no hay red', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Sin red')))
    render(<Chatbot />)

    await userEvent.setup().click(screen.getByRole('button', { name: /Cómo puedo contactarte/ }))
    expect(await screen.findByRole('link', { name: 'sección de contacto' })).toHaveAttribute('href', '#contact')
  })
})
