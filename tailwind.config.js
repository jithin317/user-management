/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fdfdfd",
        dark: "#101828",
        dark_hover: "#192f3e",
        dark_blue: "#6941c6",
        light_gray: "#475467",
        dark_gray: "#344054",
        green: "#366169",
        red: "#f44336",
        primary: "#3bafbf",
      },
    },
  },
  plugins: [],
};
