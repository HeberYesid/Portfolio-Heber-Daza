import react from '@vitejs/plugin-react'
import { loadEnv, type Connect, type Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import { respondWithNews } from './api/news'
import { Readable } from 'node:stream'
import { createChatHandler, type ChatEnv } from './api/chat'

function localNews(apiKey: string | undefined): Plugin {
  const news: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/news') return next()
    void respondWithNews(req, res, apiKey).catch(next)
  }

  return {
    name: 'local-news',
    configureServer(server) {
      server.middlewares.use(news)
    },
    configurePreviewServer(server) {
      server.middlewares.use(news)
    },
  }
}

function localChat(env: ChatEnv): Plugin {
  const handleChat = createChatHandler(env)
  const chat: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/chat') return next()
    const method = req.method ?? 'GET'
    const headers = new Headers()
    for (const [name, values] of Object.entries(req.headersDistinct)) {
      for (const value of values ?? []) headers.append(name, value)
    }
    const options: RequestInit & { duplex: 'half' } = { method, headers, duplex: 'half' }
    if (method !== 'GET' && method !== 'HEAD') options.body = Readable.toWeb(req) as ReadableStream<Uint8Array>
    void handleChat(new Request('http://localhost/api/chat', options)).then(async response => {
      res.statusCode = response.status
      response.headers.forEach((value, name) => res.setHeader(name, value))
      res.end(await response.text())
    }).catch(next)
  }

  return {
    name: 'local-chat',
    configureServer(server) { server.middlewares.use(chat) },
    configurePreviewServer(server) { server.middlewares.use(chat) },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['GNEWS_', 'GEMINI_', 'GROQ_', 'OPENROUTER_'])
  return {
    plugins: [react(), localNews(env.GNEWS_API_KEY), localChat(env)],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  }
})
