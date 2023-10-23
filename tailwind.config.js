// eslint-disable-next-line no-undef
const withMT = require("@material-tailwind/react/utils/withMT");
// eslint-disable-next-line no-undef
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // sans: ["Open Sans", "sans-serif"],
      sans: ["IBM Plex Sans Thai", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
});

