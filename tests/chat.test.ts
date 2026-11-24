// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createChatHandler } from '../api/chat'
import { PORTFOLIO_CONTEXT } from '../src/utils/portfolioContext'

function request(body: unknown = { question: '¿Qué es Code Duel?', history: [] }) {
  return new Request('http://localhost/api/chat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

const groqUrl = 'https://api.groq.com/openai/v1/chat/completions'
const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions'
const both = { GROQ_API_KEY: 'groq-simulada', OPENROUTER_API_KEY: 'openrouter-simulada' }

function completion(content: string, finish = 'stop') {
  return Response.json({ choices: [{ finish_reason: finish, message: { content } }] })
}

describe('API del chatbot', () => {
  it('devuelve 503 si no hay ningún proveedor configurado', async () => {
    const upstream = vi.fn()
    vi.stubGlobal('fetch', upstream)
    expect((await createChatHandler({})(request())).status).toBe(503)
    expect(upstream).not.toHaveBeenCalled()
  })

  it('valida método, pregunta, historial y tamaño antes de consumir cuota', async () => {
    const upstream = vi.fn()
    vi.stubGlobal('fetch', upstream)
    const chat = createChatHandler(both)
    expect((await chat(new Request('http://localhost/api/chat'))).status).toBe(405)
    expect((await chat(request({ question: ' ', history: [] }))).status).toBe(400)
    expect((await chat(request({ question: 'Hola', history: [{ role: 'model', content: 'Hola' }] }))).status).toBe(400)
    expect((await chat(request({ question: 'a'.repeat(90_000), history: [] }))).status).toBe(413)
    expect(upstream).not.toHaveBeenCalled()
  })

  it('envía el contexto oficial y devuelve solo el texto de la respuesta', async () => {
    const upstream = vi.fn().mockResolvedValue(Response.json({ candidates: [{
      finishReason: 'STOP', content: { parts: [{ thought: true, text: 'interno' }, { text: 'Spring Boot' }] },
    }] }))
    vi.stubGlobal('fetch', upstream)
    const response = await createChatHandler({ GEMINI_API_KEY: 'simulada' })(request())
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ answer: 'Spring Boot' })
    const [url, init] = upstream.mock.calls[0]
    expect(url).toBe('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent')
    expect(init.headers['x-goog-api-key']).toBe('simulada')
    expect(JSON.parse(init.body)).toMatchObject({
      systemInstruction: { parts: [{ text: PORTFOLIO_CONTEXT }] },
      contents: [{ role: 'user', parts: [{ text: '¿Qué es Code Duel?' }] }],
    })
  })

  it('no devuelve detalles del proveedor y pausa las consultas si se agota la cuota', async () => {
    const upstream = vi.fn().mockResolvedValue(new Response('Detalle interno', { status: 429 }))
    vi.stubGlobal('fetch', upstream)
    const chat = createChatHandler({ GEMINI_API_KEY: 'simulada' })
    const response = await chat(request())
    expect(response.status).toBe(429)
    expect(response.headers.get('Retry-After')).toBe('60')
    expect(await response.text()).not.toContain('Detalle interno')
    expect((await chat(request())).status).toBe(429)
    expect(upstream).toHaveBeenCalledTimes(1)
  })

  it('prioriza Groq, traduce el historial y no consulta otro proveedor si responde', async () => {
    const upstream = vi.fn().mockResolvedValueOnce(completion('Code Duel usa Java.'))
    vi.stubGlobal('fetch', upstream)
    const response = await createChatHandler(both)(request({ question: '¿En qué lenguaje?', history: [
      { role: 'user', content: '¿Qué es Code Duel?' }, { role: 'model', content: 'Un proyecto del portafolio.' },
    ] }))
    expect(await response.json()).toEqual({ answer: 'Code Duel usa Java.' })
    expect(upstream).toHaveBeenCalledTimes(1)
    const [url, init] = upstream.mock.calls[0]
    expect(url).toBe(groqUrl)
    expect(init.headers.Authorization).toBe('Bearer groq-simulada')
    expect(JSON.parse(init.body)).toMatchObject({ model: 'openai/gpt-oss-20b', messages: [
      { role: 'system', content: PORTFOLIO_CONTEXT }, { role: 'user', content: '¿Qué es Code Duel?' },
      { role: 'assistant', content: 'Un proyecto del portafolio.' }, { role: 'user', content: '¿En qué lenguaje?' },
    ] })
  })

  it('pasa a OpenRouter Free ante cuota de Groq y respeta la pausa solo para Groq', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    const upstream = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 429, headers: { 'Retry-After': '15' } }))
      .mockResolvedValueOnce(completion('Respuesta de OpenRouter'))
      .mockResolvedValueOnce(completion('Otra respuesta de OpenRouter'))
      .mockResolvedValueOnce(completion('Groq vuelve a responder'))
    vi.stubGlobal('fetch', upstream)
    const chat = createChatHandler(both)
    expect(await (await chat(request())).json()).toEqual({ answer: 'Respuesta de OpenRouter' })
    expect(await (await chat(request())).json()).toEqual({ answer: 'Otra respuesta de OpenRouter' })
    vi.setSystemTime(Date.now() + 15_100)
    expect(await (await chat(request())).json()).toEqual({ answer: 'Groq vuelve a responder' })
    expect(upstream.mock.calls.map(([url]) => url)).toEqual([groqUrl, openRouterUrl, openRouterUrl, groqUrl])
    const init = upstream.mock.calls[1][1]
    expect(init.headers.Authorization).toBe('Bearer openrouter-simulada')
    const body = JSON.parse(init.body)
    expect(body.model).toBe('recursive/flint-v1.0:free')
    expect(body).not.toHaveProperty('models')
  })

  it('usa OpenRouter por sí solo si falta la clave de Groq', async () => {
    const upstream = vi.fn().mockResolvedValueOnce(completion('Code Duel usa Spring Boot.'))
    vi.stubGlobal('fetch', upstream)
    expect((await createChatHandler({ OPENROUTER_API_KEY: 'simulada' })(request())).status).toBe(200)
    expect(upstream).toHaveBeenCalledExactlyOnceWith(openRouterUrl, expect.anything())
  })

  it('tras un timeout de Groq, prueba otro modelo si OpenRouter devuelve 200 sin una respuesta completa', async () => {
    const upstream = vi.fn().mockRejectedValueOnce(new DOMException('Tiempo agotado', 'TimeoutError'))
      .mockResolvedValueOnce(completion('Texto parcial', 'length'))
      .mockResolvedValueOnce(completion('Code Duel usa Java y Spring Boot.'))
    vi.stubGlobal('fetch', upstream)
    const answer = await createChatHandler(both)(request())
    expect(answer.status).toBe(200)
    expect(await answer.json()).toEqual({ answer: 'Code Duel usa Java y Spring Boot.' })
    expect(upstream.mock.calls.map(([url, init]) => [url, JSON.parse(init.body).model])).toEqual([
      [groqUrl, 'openai/gpt-oss-20b'], [openRouterUrl, 'recursive/flint-v1.0:free'], [openRouterUrl, 'openrouter/free'],
    ])
  })

  it('solo devuelve 502 cuando se agotan las opciones configuradas', async () => {
    const upstream = vi.fn().mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(completion(' '))
      .mockResolvedValueOnce(completion(' '))
    vi.stubGlobal('fetch', upstream)
    expect((await createChatHandler(both)(request())).status).toBe(502)
    expect(upstream.mock.calls.map(([url]) => url)).toEqual([groqUrl, openRouterUrl, openRouterUrl])
  })

  it('no malgasta intentos en otro modelo si OpenRouter agotó su cuota compartida', async () => {
    const upstream = vi.fn().mockResolvedValueOnce(new Response(null, { status: 429, headers: { 'Retry-After': '60' } }))
    vi.stubGlobal('fetch', upstream)
    const chat = createChatHandler({ OPENROUTER_API_KEY: 'simulada' })
    expect((await chat(request())).status).toBe(429)
    expect((await chat(request())).status).toBe(429)
    expect(upstream).toHaveBeenCalledTimes(1)
  })

  it('no reenvía una pregunta que el proveedor rechazó por moderación', async () => {
    const upstream = vi.fn().mockResolvedValueOnce(completion('', 'content_filter'))
    vi.stubGlobal('fetch', upstream)
    expect((await createChatHandler(both)(request())).status).toBe(422)
    expect(upstream).toHaveBeenCalledTimes(1)
  })
})
