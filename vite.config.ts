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
    allowedHosts: ["fcb32ff492ac.ngrok.app", "849991690ad0.ngrok.app", "10.0.0.229", "widgemo.com", "dev.widgemo.com"]
  },
  resolve: {
    alias: {
      '@widgemo/widgemo-core': path.resolve(__dirname, '../widgemo-core/src/index.ts')
    },
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react-router') || id.includes('/@remix-run/')) return 'vendor-router';
            if (id.includes('/react-bootstrap/') || id.includes('/bootstrap/')) return 'vendor-bootstrap';
            if (id.includes('/react-icons/')) return 'vendor-icons';
            return 'vendor-misc';
          }

          // Keep core library code in its own shared chunk when imported from alias path.
          if (id.includes('/widgemo-core/src/')) {
            return 'widgemo-core';
          }

          return undefined;
        }
      }
    }
  }
})
