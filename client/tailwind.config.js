/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#27445C",
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,

  },
}