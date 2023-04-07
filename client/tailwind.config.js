/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blues: {
          //Headings
          50: "#5054aa",
          //Titles
          100: "#132090",
          //Michelin blue
          200: "#27509b"

        },
        ok: {
          //Ok/Save button
          50: "#88c188",
          100: "#74a374"
        },
        cancel: {
          //Cancel button
          50: "#ee7470",
          100: "#d16460"
        },
        trademark: {
          //Michelin yellow
          50: "#fce500"
        },
        general: {
          //Gray
          50: "#e3e3e3",
          100: "#c2c0c0"
        }
      }
    },
  },
  plugins: [],
}

