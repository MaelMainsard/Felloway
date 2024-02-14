/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {   
          "primary": "#1997A4",
          "secondary": "#F7AD41",
          "accent": "#FF879E",
          "neutral": "#ffffff",
          "base-100": "#ffffff",
          "info": "#823A8C",
          "success": "#4DAD41",        
          "warning": "#ffffff",
          "error": "#CD422C",
        },
      },
    ],
  },
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

