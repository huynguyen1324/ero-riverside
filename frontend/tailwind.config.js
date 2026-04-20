/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fafb',
          100: '#d0f0f2',
          200: '#a1e0e5',
          300: '#5cc8d0',
          400: '#26a8b3',
          500: '#03989e',
          600: '#19aac3',
          700: '#268b97',
          800: '#034f58',
          900: '#005967',
        },
        gold: {
          50: '#fdf9f0',
          100: '#fdf2d9',
          200: '#fde298',
          300: '#e0cc80',
          400: '#c5a84a',
          500: '#a58a45',
          600: '#8a7339',
          700: '#6f5c2d',
          800: '#544521',
          900: '#3a2f15',
        },
        dark: {
          50: '#f3f4f5',
          100: '#e6e7e9',
          200: '#cfd3d8',
          300: '#b8b8b8',
          400: '#9fa7b1',
          500: '#6d6d6d',
          600: '#555555',
          700: '#363636',
          800: '#1a1a1a',
          900: '#0f1010',
        },
      },
      fontFamily: {
        display: ['"EB Garamond"', 'Georgia', 'serif'],
        body: ['"Montserrat"', '"Open Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
