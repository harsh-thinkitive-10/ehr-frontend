import { fileURLToPath, URL } from 'node:url';
import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error -- plain .mjs plugin, no type declarations
import { jsxLocator } from './plugins/vite-plugin-jsx-locator.mjs';

export default defineConfig({
  plugins: [
    // MUST come before react(), so attributes exist when JSX is compiled.
    // normalizePath: on Windows Vite module ids use forward slashes.
    jsxLocator({ root: normalizePath(fileURLToPath(new URL('.', import.meta.url))).replace(/\/$/, '') }),
    react(),
  ],

  resolve: {
    alias: {
      '@sdk': fileURLToPath(new URL('./src/sdk', import.meta.url)),
    },
  },

  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});