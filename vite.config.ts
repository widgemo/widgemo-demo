import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync('./key.pem'),
    //   cert: fs.readFileSync('./cert.pem'),
    // },
    host: '0.0.0.0',
    allowedHosts: ['widgemo.com', 'dev.widgemo.com']
  },
  resolve: {
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

          return undefined;
        }
      }
    }
  }
})
