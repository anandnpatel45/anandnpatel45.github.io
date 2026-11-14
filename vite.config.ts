import { cpSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'portfolio-media',
      apply: 'build',
      writeBundle({ dir }) {
        cpSync('Media', `${dir ?? 'dist'}/Media`, { recursive: true })
      },
    },
  ],
  optimizeDeps: { exclude: ['lucide-react'] },
})
