import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    watch: {
      usePolling: true,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.js'],
  },
})
