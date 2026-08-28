/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: '#FFF0F3',
          100: '#FFD6DE',
          200: '#FFADBF',
          300: '#FF85A0',
          400: '#FF5C82',
          500: '#FF3366',
          600: '#E6194D',
          700: '#B30D38',
          800: '#800825',
          900: '#4D0017',
        },
        indigo: {
          50: '#EEEDF8',
          100: '#C5C3E8',
          200: '#9C99D8',
          300: '#736FC8',
          400: '#4A45B8',
          500: '#211BA8',
          600: '#1A157F',
          700: '#130F56',
          800: '#0C092D',
          900: '#050404',
          950: '#1E1B4B',
        },
        gold: {
          300: '#F0D080',
          400: '#E8C060',
          500: '#D4A853',
          600: '#C09040',
          700: '#A07030',
        },
        cream: '#FAFAF7',
      },
      fontFamily: {
        serif: ['"Noto Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'japan-gradient': 'linear-gradient(135deg, #1E1B4B 0%, #2D1B4E 30%, #4A1942 60%, #7B2D5E 80%, #FF6B8A 100%)',
        'hero-gradient': 'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'petal-fall': 'petalFall 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

