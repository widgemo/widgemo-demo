import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["fcb32ff492ac.ngrok.app","849991690ad0.ngrok.app"]
  },
  resolve: {
    alias: {
      'widgemo-core': path.resolve(__dirname, '../widgemo-core/dist/index.es.js')
    }
  }
})
