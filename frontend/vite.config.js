import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config - dev server on port 5173 by default
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false }
})
