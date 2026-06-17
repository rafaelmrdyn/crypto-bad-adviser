import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// The CoinStats API needs an X-API-KEY header and blocks browser CORS.
// We proxy /api -> https://openapiv1.coinstats.app and inject the key
// server-side so it never ships in the client bundle.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.COINSTATS_API_KEY || ''

  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
      proxy: {
        '/api': {
          target: 'https://openapiv1.coinstats.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('X-API-KEY', apiKey)
              proxyReq.setHeader('accept', 'application/json')
            })
          },
        },
      },
    },
  }
})
