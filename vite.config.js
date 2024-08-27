import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@/images': '/resources/images',
      '@': '/resources/ts',
    },
  },
  plugins: [
    laravel({
      input: 'resources/ts/app.tsx',
      refresh: true,
    }),
    react(),
  ],
})
