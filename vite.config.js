import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Preview (GitHub Pages) is served under /flexspot/ — build with
  // VITE_BASE_PATH=/flexspot/ for the preview. Root deploys (Vercel)
  // use the default '/'.
  base: process.env.VITE_BASE_PATH || '/',
});
