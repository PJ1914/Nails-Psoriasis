/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        slatebrand: {
          50: '#f3f7f8',
          100: '#dfeaec',
          200: '#bfd6da',
          300: '#97bac2',
          400: '#6999a4',
          500: '#4d7d89',
          600: '#406672',
          700: '#37545e',
          800: '#32474e',
          900: '#2d3d43',
        },
        sand: '#f7f2ea',
        coral: '#d9816f',
        pine: '#285943',
      },
      boxShadow: {
        soft: '0 18px 40px rgba(22, 32, 40, 0.08)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
