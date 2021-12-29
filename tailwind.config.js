const { fontFamily } = require("tailwindcss/defaultTheme")
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './content/blog/**/*.md',
    'node_modules/react-instantsearch-dom/dist/cjs/widgets/*.js',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      gray: {
        ...colors.zinc,
        950: '#0f0f11',
      },
      teal: colors.teal,
      cyan: colors.cyan,
      purple: {
        ...colors.purple,
        950: '#32104c',
      },
    },
    extend: {
      fontFamily: {
        sans: [
          'Inter var',
          ...fontFamily.sans,
        ],
        display: [
          'Nunito',
          ...fontFamily.sans,
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          ...fontFamily.mono,
        ],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
