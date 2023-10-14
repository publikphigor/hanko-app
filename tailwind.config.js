/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
      colors: {
        'light-bg': '#fafafa',
        'dark-bg': '#111111',
        'light-text': '#f2f4f7',
        'dark-text': '#1d2939',
      },
    },
  },
  plugins: [],
};
