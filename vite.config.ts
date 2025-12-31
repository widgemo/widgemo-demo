import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync('./key.pem'),
    //   cert: fs.readFileSync('./cert.pem'),
    // },
    host: '0.0.0.0',
    allowedHosts: ["fcb32ff492ac.ngrok.app","849991690ad0.ngrok.app", "10.0.0.229"]
  },
  resolve: {
    alias: {
      'widgemo-core': path.resolve(__dirname, '../widgemo-core/dist/index.es.js')
    }
  }
})
