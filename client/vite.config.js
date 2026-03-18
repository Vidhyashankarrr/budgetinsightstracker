import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ REMOVE tailwind import

export default defineConfig({
  plugins: [react()],
})

