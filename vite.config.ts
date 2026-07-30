/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/news': {
        target: 'https://gnews.io/api/v4',
        changeOrigin: true,
        rewrite: (path) =>
          `${path}?category=technology&lang=en&max=6&apikey=${process.env.VITE_GNEWS_API_KEY ?? ''}`,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
