const { fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./content/blog/**/*.md", 'node_modules/react-instantsearch-dom/dist/cjs/widgets/*.js'],
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
      purpleGray: {
        950: 'hsl(273, 20%, 20%)',
      },

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
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '.dark &': {
              color: colors.trueGray[50],
            },
            a: {
              color: colors.purple[500],
              '.dark &': {
                color: colors.purple[400],
              },
            },
            code: {
              '.dark &': {
                color: colors.trueGray[50],
              },
            },
            h2: {
              '.dark &': {
                color: colors.trueGray[50],
              },
            },
            h3: {
              '.dark &': {
                color: colors.trueGray[50],
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
    container: {
      center: true,
      padding: "1rem",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")({
    modifiers: ['lg', 'xl'],
  })],
}
