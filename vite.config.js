import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure CSS is properly extracted
    cssCodeSplit: true,
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Show chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Ensure proper asset handling
  assetsInclude: ['**/*.mp4', '**/*.webm'],
})
