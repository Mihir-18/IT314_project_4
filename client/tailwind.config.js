module.exports = {
  purge: ['./src/*{.js}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        reddit_dark: {
          DEFAULT: '#030303',
          brighter: '#1a1a1a',
          brightest: '#272728',
        },
        reddit_border: {
          DEFAULT: '#343536',
        },
        reddit_text: {
          DEFAULT: '#d7dadc',
          darker: '#818384',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
