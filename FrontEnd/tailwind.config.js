/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'sm':'620px',
        'md':'840px',
        'lg':'1024px',
        'xl':'1280px',
        '2xl':'1536px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}