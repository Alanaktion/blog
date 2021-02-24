const { fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx", "./content/blog/**/*.md"],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      // TODO: consider proper wide screen support...
      // '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#000',
      white: '#fff',

      gray: colors.trueGray,
      coolGray: colors.coolGray,
      tealGray: {
        50: '#f9fbfb',
        100: '#f3f6f6',
        200: '#e5ebeb',
        300: '#d1dbdb',
        400: '#9cafaf',
        500: '#6b8080',
        600: '#4b6361',
        700: '#375150',
        800: '#1f3735',
        900: '#112627',
      },

      teal: colors.teal,

      red: colors.red,
      orange: colors.orange,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.purple,
    },
    fontFamily: {
      sans: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Inter var"',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      mono: [
        '"JetBrains Mono"',
        '"Fira Code"',
        ...fontFamily.mono,
      ],
    },
    extend: {},
    container: {
      center: true,
      padding: "1rem",
    },
    typography: {
      default: {
        css: {
          '.dark &': {
            color: '#f5f5f5',
          },
          a: {
            color: "#5a67d8",
            '.dark &': {
              color: 'rgb(13, 148, 136)',
            },
          },
          code: {
            '.dark &': {
              color: 'rgb(242, 242, 242)',
            },
          },
          h2: {
            '.dark &': {
              color: 'rgb(242, 242, 242)',
            },
          },
          h3: {
            '.dark &': {
              color: 'rgb(242, 242, 242)',
            },
          },
          "code::before": {
            content: "",
          },
          "code::after": {
            content: "",
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")({
    modifiers: ['lg', 'xl'],
  })],
}
