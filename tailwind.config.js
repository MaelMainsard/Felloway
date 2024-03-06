/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
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
    extend: {
      fontFamily: {
        'bree': ['"Bree Serif"', ...defaultTheme.fontFamily.serif],
        'montserrat': ['"Montserrat"', ...defaultTheme.fontFamily.sans]
      },
    },
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

