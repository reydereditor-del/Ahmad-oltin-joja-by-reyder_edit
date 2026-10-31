/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbf0',
          100: '#fef5d6',
          200: '#fde7a8',
          300: '#fbd370',
          400: '#f8ba37',
          500: '#f49d14',
          600: '#d97b0a',
          700: '#b4570b',
          800: '#92430f',
          900: '#783810',
          950: '#451c05',
        },
        obsidian: {
          950: '#070709',
          900: '#0d0d12',
          850: '#12121a',
          800: '#171722',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
