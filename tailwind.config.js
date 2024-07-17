/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
    spacing: {
      '128': '32rem',
      '144': '36rem',
      '500' : '500',
    },
    borderRadius: {
      '4xl': '2rem',
    }
  }
}