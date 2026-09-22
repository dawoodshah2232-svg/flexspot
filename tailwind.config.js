/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0C10',
        coal: '#10141A',
        card: '#141922',
        cardhi: '#1B2230',
        electric: '#2E7CF6',
        electricdark: '#1B5FD0',
        neon: '#2BFF88',
        gold: '#FFC93C',
        golddeep: '#E8A90C',
        mist: '#9AA4B2',
        snow: '#F5F7FA',
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
      },
    },
  },
  plugins: [],
};
