const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
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
        cyan: {
          950: '#083444',
        },
        zinc: {
          950: '#0f0f11',
        },
        purple: {
          950: '#32104c',
        },
        fairyfloss: {
          DEFAULT: 'hsl(251, 16%, 24%)',
          dark: 'hsl(251, 16%, 14%)',
          bright: 'hsl(251, 30%, 40%)',
        }
      },
      fontFamily: {
        sans: [
          'InterVariable',
          ...fontFamily.sans,
        ],
        display: [
          'Yusei Magic',
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
