/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#0A0A0F',
          900: '#13131A',
          800: '#1C1C24',
          700: '#24242E',
          600: '#2D2D39',
          500: '#373745',
        },
        brand: {
          50: '#F7F7F8',
          100: '#EEEEF1',
          200: '#D8D8DE',
          300: '#B4B4BE',
          400: '#8E8E9C',
          500: '#6B6B7B',
          600: '#4D4D5C',
          700: '#36363F',
          800: '#25252C',
          900: '#18181C',
        }
      },
      backgroundImage: {
        'gradient-fade': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
        'dot-pattern': 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot': '24px 24px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(109, 109, 120, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(109, 109, 120, 0.2)',
      },
    },
  },
  plugins: [],
}

