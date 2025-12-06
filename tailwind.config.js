/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1e3a8a', // Reliable Blue
          orange: '#f97316', // Creative Orange
          light: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Heebo', 'Assistant', 'Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [],
}