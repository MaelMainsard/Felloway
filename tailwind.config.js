/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'bree': ['"Bree Serif"', 'serif']
    },
    extend: {
      fontFamily: {
        'bree': ['"Bree Serif"', ...defaultTheme.fontFamily.serif],
        'montserrat': ['"Montserrat"', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [],
}

