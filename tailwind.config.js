const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
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
