const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './content/blog/**/*.md',
    './content/*.js',
    'node_modules/react-instantsearch-dom/dist/cjs/widgets/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zinc: {
          950: '#0f0f11',
        },
        purple: {
          950: '#32104c',
        },
      },
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
