/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing:{
        "18":"150px"
      },
      colors:{
        background: "#FFFAF5",
        OrangeButton: "#0D47A1",
        TextColor: "#241400",
        FooterBackground: "#E3F2FD"
      }
    },
  },
  plugins: [],
}

