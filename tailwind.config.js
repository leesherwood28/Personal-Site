const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
    },
    extend: {
      transitionProperty: {
        'width': 'width',
        'left': 'left',
        'height': 'height'
      },
      spacing: {
        '22': '5.5rem',
      },
      animation: {
        wordRotate: 'wordRotate 9s linear infinite 0s'
      },
      keyframes: {
        wordRotate: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: 0,
            'animation-timing-function': 'ease-in',
          },
          '8%': {
            transform: 'translateY(0%)',
            opacity: 1
          },
          '19%': {
            transform: 'translateY(0%)',
            opacity: 1
          },
          '25%': {
            transform: 'translateY(100%)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: 0
          }
        }
       }
    },
  },
  variants: {
    extend: {
      width: ['hover'],
      display: ['group-hover'],
      rotate: ['group-hover'],
      translate: ['group-hover'],
      transform: ['group-hover'],
      inset: ['group-hover']
    },
  },
  plugins: [],
}
