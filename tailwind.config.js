const { nextui } = require("@nextui-org/react")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': 'Vollkorn',
      'serif': 'Vollkorn',
      'mono': 'Fira Code'
    }
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          primary: {
            DEFAULT: "#2dd4bf",
            foreground: "#000000",
          }
        }
      }
    }
  })]
}