const defaultTheme = require("tailwindcss/defaultTheme");
const uicolors = require("@tailwindcss/ui/colors");

module.exports = {
  theme: {
    colors: {
      ...uicolors,
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/ui")],
};
