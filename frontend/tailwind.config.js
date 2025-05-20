/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        quill: "#d8d8d7",
        tuatara: "#30302f",
        stardust: "#969692",
        graybase: "#8c8c8c",
        jet:'#313130'
        
      },
    },
  },
  plugins: [],
};
