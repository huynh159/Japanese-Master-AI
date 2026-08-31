/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sakura: {
          50: '#fff5f7',
          100: '#ffe6ed',
          200: '#fecddb',
          300: '#fda4be',
          400: '#fb7199',
          500: '#f43f77',
          600: '#e11d5a',
          700: '#be1245',
          800: '#9f123c',
          900: '#851438',
        },
        jpindigo: {
          800: '#1e2640',
          900: '#0f172a',
          950: '#080d19',
        },
        jpgold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        jp: ['"Noto Sans JP"', '"Hiragino Sans"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'sakura-glow': '0 0 20px rgba(244, 63, 119, 0.35)',
      }
    },
  },
  plugins: [],
}
