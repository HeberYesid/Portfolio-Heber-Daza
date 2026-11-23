import react from '@vitejs/plugin-react'
import { loadEnv, type Connect, type Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import { respondWithNews } from './api/news'

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

export default defineConfig(({ mode }) => ({
  plugins: [react(), localNews(loadEnv(mode, process.cwd(), 'GNEWS_API_KEY').GNEWS_API_KEY)],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
}))
