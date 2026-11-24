import { defineConfig } from 'vite'

export default defineConfig({
  // the router needs an absolute base; the deploy workflow overrides it with --base=/artzt/
  base: '/',
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
