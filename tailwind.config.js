const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#2C7ED8",
          50: "#f3f7fc",
          100: "#C4C8D6",
          200: "#A8AFCA",
          300: "#8C94BE",
          400: "#1e63ff",
          500: "#4050a9",
          600: "#1D244F",
          700: "#181A3F",
          800: "#12132F",
        },
      },
      transitionProperty: {
        "height": "height",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
