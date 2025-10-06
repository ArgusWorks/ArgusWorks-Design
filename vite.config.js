import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'bella-vista': resolve(__dirname, 'demos/bella-vista-restaurant/index.html'),
        'local-business': resolve(__dirname, 'templates/local-business/index.html'),
        'refined-cravings': resolve(__dirname, 'client-proposals/refined-cravings/index.html'),
        'cafe-cultivate': resolve(__dirname, 'client-proposals/cafe-cultivate/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    // Enable serving files from subdirectories
    fs: {
      allow: ['..']
    }
  }
})