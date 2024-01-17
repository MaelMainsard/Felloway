/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      grey: {
        1:'#f7f7f7',
        2:'#d9d9d9',
      },
      blue: {
        1:'#004ffe',
        2:'#074efd'
      },
      white: '#ffffff',
      font: {
        1:'#6d7276',
        2:'#c5c5c5',
      },
      red: {
        1:'#cf3535',
      }
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

