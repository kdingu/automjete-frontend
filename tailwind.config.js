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
        teal: {
          DEFAULT: "#2ABFB1",
          100: "#eaf9f7",
          200: "#aae5e0",
          300: "#6ad2c8",
          400: "#2ABFB1",
          500: "#22998e",
          600: "#19736a",
          700: "#114c47",
          800: "#082623"
        },
        darkBlue: {
          DEFAULT: "#0a1026",
          100: "#e7e7e9",
          200: "#9d9fa8",
          300: "#545867",
          400: "#0a1026",
          500: "#080d1e",
          600: "#060a17",
          700: "#04060f",
          800: "#020308"
        },
        neon: {
          DEFAULT: "#dbf22c",
          100: "#fbfeea",
          200: "#f1faab",
          300: "#e6f66b",
          400: "#dbf22c",
          500: "#afc223",
          600: "#83911a",
          700: "#586112",
          800: "#2c3009"
        },
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
