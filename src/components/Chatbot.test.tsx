import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Chatbot from './Chatbot'

describe('Asistente IA', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('ofrece Contacto en lugar de aceptar preguntas si no hay configuración', () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', '')
    render(<Chatbot />)

    expect(screen.getByText('El asistente no está disponible en este momento.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ir a Contacto' })).toHaveAttribute('href', '#contact')
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('presenta un campo con nombre accesible cuando está configurado', () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'clave-simulada')
    render(<Chatbot />)

    expect(screen.getByRole('textbox', { name: 'Pregunta para el asistente' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'ENVIAR' })).toBeDisabled()
  })
})
