/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        'custom-purple': 'rgb(115, 75, 159)',
        'custom-orange': '#ff7200',
        gray: {
          750: '#374151',
          800: '#1f2937',
          850: '#18212f',
          900: '#111827',
          950: '#090e18',
        },
      },
      opacity: {
        '70': '0.7',
        '98': '0.98',
      },
      ringColor: {
        'custom-orange': '#ff7200',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
