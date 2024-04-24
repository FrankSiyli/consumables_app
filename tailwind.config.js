/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontSize: {
        s: "0.7rem",
        xs: "0.5rem",
      },
      colors: {
        appOrange: "#f29106",
        appBlue: "#0f1648",
        appGrey: "#dadada",
      },
      boxShadow: {
        "bottom-shadow": "inset 0 -20px 20px -2px white",
        "bottom-shadow-dark": "inset 0 -20px 20px -2px #121212",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
  corePlugins: {},
};
