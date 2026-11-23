// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getNews } from '../api/news'

describe('Noticias: contrato del servidor', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('consulta los titulares de tecnología de GNews con una clave del servidor', async () => {
    const data = { articles: [{ title: 'Artículo de prueba' }] }
    const request = vi.fn().mockResolvedValue(Response.json(data))
    vi.stubGlobal('fetch', request)

    const result = await getNews('GET', 'clave-simulada')
    const upstream = new URL(request.mock.calls[0][0])

    expect(upstream.origin + upstream.pathname).toBe('https://gnews.io/api/v4/top-headlines')
    expect(Object.fromEntries(upstream.searchParams)).toEqual({
      category: 'technology', lang: 'en', max: '6', apikey: 'clave-simulada',
    })
    expect(result).toEqual({ status: 200, body: data })
  })

  it('no consulta al proveedor si el método no es GET o falta la clave', async () => {
    const request = vi.fn()
    vi.stubGlobal('fetch', request)

    expect((await getNews('POST', 'clave-simulada')).status).toBe(405)
    expect((await getNews('GET', '')).status).toBe(503)
    expect(request).not.toHaveBeenCalled()
  })

  it('devuelve un error sin exponer la respuesta privada del proveedor', async () => {
    const request = vi.fn()
      .mockResolvedValueOnce(Response.json({ error: 'detalle privado' }, { status: 429 }))
      .mockRejectedValueOnce(new Error('detalle privado'))
    vi.stubGlobal('fetch', request)

    expect(await getNews('GET', 'clave-simulada')).toEqual({ status: 429, body: { error: 'No se pudieron consultar las noticias.' } })
    expect(await getNews('GET', 'clave-simulada')).toEqual({ status: 502, body: { error: 'No se pudieron consultar las noticias.' } })
  })
})
