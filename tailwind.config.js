const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./pages/**/*.js", "./components/**/*.js", "./layouts/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        ibm: ["IBM Plex Sans", fontFamily.sans],
      },
      colors: {},
    },
  },
  variants: {
    extend: {
      gradientColorStops: ["group-hover"],
      transitionDuration: ["group-hover"],
    },
  },
  plugins: [],
};
