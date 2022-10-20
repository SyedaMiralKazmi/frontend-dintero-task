import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/quickr-api': {
        target: 'https://api.test.quickr.no',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/quickr-api/, '')
      },
      '/dintero-api/companies': {
        target: 'https://test.dintero.com/v1/accounts/P11100000/search/external/organizations/no/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dintero-api\/companies/, '')

      }
    }
  }
})
