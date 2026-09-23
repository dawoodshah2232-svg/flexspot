import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Canonical URL convention: VITE_SITE_URL at build time, falling back to the
// production domain so bare `npm run build` (no env) still works — index.html
// carries %VITE_SITE_URL% placeholders that otherwise crash the build
// ("URI malformed") when the env var is absent.
const SITE_URL = (process.env.VITE_SITE_URL || 'https://flexspot.lol').replace(/\/+$/, '');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'site-url-placeholders',
      // Runs before vite:build-html — that plugin decodeURIs attribute values
      // (e.g. the canonical link href) and crashes on the raw %VITE_SITE_URL%
      // placeholder when the env var is absent.
      enforce: 'pre',
      transform(code, id) {
        if (id.endsWith('index.html')) {
          return code.replaceAll('%VITE_SITE_URL%', SITE_URL);
        }
        return undefined;
      },
    },
  ],
  // Preview (GitHub Pages) is served under /flexspot/ — build with
  // VITE_BASE_PATH=/flexspot/ for the preview. Root deploys (Vercel)
  // use the default '/'.
  base: process.env.VITE_BASE_PATH || '/',
});
