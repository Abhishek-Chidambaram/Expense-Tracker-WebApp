/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#1A1A1A',
          200: '#222222',
          300: '#333333',
        }
      }
    },
  },
  plugins: [],
} 