/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  theme: {
    extend: {
      colors:{
        'green':'rgba(0,220,130,1)',
      },
      fontFamily:{
        'serif':['"DM Serif Display"']
      }
    },
  },
  plugins: [],
}
