import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/GPA-Calculator-v2/',
  server: {
    host: true,  
  },
})
