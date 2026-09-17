import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // import { ... } from '@sdk/queries' | '@sdk/requests'
      '@sdk': fileURLToPath(new URL('./src/sdk', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Generated SDK calls are same-origin (/api/v1/...) in dev; forward them to Spring Boot.
      '/api': 'http://localhost:8080',
    },
  },
})
