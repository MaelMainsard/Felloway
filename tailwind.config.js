/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      grey_1: '#f7f7f7',
      grey_2: '#d9d9d9',
      blue_1: '#004ffe',
      white: '#ffffff',
      font_1: '#6d7276',
      font_2: '#c5c5c5',
      red_1:  '#cf3535',
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

