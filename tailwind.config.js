const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif']
    },
    extend: {
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  variants: {
    extend: {
      width: ['hover'],
      display: ['group-hover']
    },
  },
  plugins: [],
}
