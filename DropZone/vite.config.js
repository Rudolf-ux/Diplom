import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Все запросы /api/* в разработке уходят на бэкенд (порт 4000).
      '/api': 'http://localhost:4000',
    },
  },
})
