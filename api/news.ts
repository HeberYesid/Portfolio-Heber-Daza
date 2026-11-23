import type { IncomingMessage, ServerResponse } from 'node:http'

export async function getNews(method: string | undefined, apiKey: string | undefined): Promise<{ status: number; body: unknown }> {
  if (method !== 'GET') {
    return { status: 405, body: { error: 'Método no permitido.' } }
  }
  if (!apiKey?.trim()) {
    return { status: 503, body: { error: 'El servicio de noticias no está configurado.' } }
  }

  const url = new URL('https://gnews.io/api/v4/top-headlines')
  url.search = new URLSearchParams({ category: 'technology', lang: 'en', max: '6', apikey: apiKey }).toString()

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (response.ok) return { status: 200, body: await response.json() }
    return { status: response.status, body: { error: 'No se pudieron consultar las noticias.' } }
  } catch {
    return { status: 502, body: { error: 'No se pudieron consultar las noticias.' } }
  }
}

export async function respondWithNews(req: IncomingMessage, res: ServerResponse, apiKey: string | undefined) {
  const { status, body } = await getNews(req.method, apiKey)
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', status === 200 ? 'public, max-age=1800, s-maxage=1800' : 'no-store')
  if (status === 405) res.setHeader('Allow', 'GET')
  res.end(JSON.stringify(body))
}

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return respondWithNews(req, res, process.env.GNEWS_API_KEY)
}
