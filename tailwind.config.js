/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily:{
    sans:['Roboto','Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']

  },
  gridTemplateColumns:{
    '70/30':'70% 28%',
  },
  colors: {
    'custom-purple': 'rgb(115, 75, 159)',
    'custom-orange': '#ff7200',
  },
  
  opacity: {
    '70': '0.7',
  },
    },
  },
  plugins: [],
}
  
