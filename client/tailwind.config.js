/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blues: {
          // Headings
          50: '#5054aa',
          // Titles
          100: '#132090',
          // Michelin blue
          200: '#27509b',

          300: '#1d4089',

        },
        ok: {
          // Ok/Save button
          50: '#88c188',
          100: '#74a374'
        },
        cancel: {
          // Cancel button
          50: '#ee7470',
          100: '#d16460'
        },
        trademark: {
          // Michelin yellow
          50: '#fce500'
        },
        general: {
          // Gray
          50: '#e3e3e3',
          100: '#c2c0c0'
        }
      }
    }
  },
  plugins: [Myclass]
}
