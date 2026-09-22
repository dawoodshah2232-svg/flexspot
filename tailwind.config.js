/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        coal: 'rgb(var(--c-coal) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        cardhi: 'rgb(var(--c-cardhi) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        electric: '#2E7CF6',
        electricdark: '#1B5FD0',
        neon: '#2BFF88',
        neondeep: '#0E9F5D',
        gold: '#FFC93C',
        golddeep: '#E8A90C',
        mist: 'rgb(var(--c-mist) / <alpha-value>)',
        snow: 'rgb(var(--c-snow) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glowblue: '0 0 24px rgba(46,124,246,.45)',
        glowgreen: '0 0 24px rgba(43,255,136,.35)',
        glowgold: '0 0 32px rgba(255,201,60,.45)',
        card: '0 8px 32px rgba(0,0,0,.45)',
        cardlight: '0 8px 28px rgba(15,23,42,.10)',
      },
    },
  },
  plugins: [],
};
