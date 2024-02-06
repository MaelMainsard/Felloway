/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors:{
      grey: {
        1:'#f7f7f7',
        2:'#d9d9d9',
        3:'#b8a7a7',
        4:'#3d4451',
        5:'#1a202c'
      },
      blue: {
        1:'#004ffe',
        2:'#074efd'
      },
      white: '#ffffff',
      black: '#000000',
      font: {
        1:'#6d7276',
        2:'#c5c5c5',
      },
      red: {
        1:'#cf3535',
      },
      green: {
        1: "#1998A5"
      },
      yellow: {
        1: "#F8AF42"
      }
    },
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes:[
      {
        light: {
          "primary": "#a991f7",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "base-100": "#ffffff"
        },
      }
    ],
    darkTheme: "light", // name of one of the included themes for dark mode

  },
}

