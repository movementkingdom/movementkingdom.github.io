/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/pages/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "color-change": {
          "0%": { "background-color": "rgb(243 244 246 / var(--tw-bg-opacity))" },
          "50%": { "background-color": "rgb(249 250 251 / var(--tw-bg-opacity))" },
          "100%": { "background-color": "rgb(255 255 255 / var(--tw-bg-opacity))" },
        },
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        "focus-fade-out": "color-change 2s linear",
        "waving-hand": "wave 2s linear infinite",
      },
    },

    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["'Roboto Slab'", "serif"],
      mono: ["'Roboto Mono'", "Roboto", "Lato", "sans-serif"],
    },
  },
  plugins: [],
};
