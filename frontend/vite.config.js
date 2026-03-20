import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          router: ['react-router-dom'],
          'firebase-core': ['firebase/app'],
          'firebase-auth': ['firebase/auth'],
          'firebase-store': ['firebase/firestore'],
          'firebase-storage': ['firebase/storage'],
          http: ['axios'],
        },
      },
    },
  },
});
