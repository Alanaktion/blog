const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Inter var',
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
        "JetBrains Mono",
        "Fira Code",
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
          a: {
            color: "#5a67d8",
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
  plugins: [require("@tailwindcss/typography")],
}
