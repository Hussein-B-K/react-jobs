/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       colors: {
      drift: {
        bg: "#121317",
        surface: "#1C1D24",
        border: "#2E3040",
        accent: "#7476F0",
        text: "#E6E7F0",
        textMuted: "#A7A9BF",
      },
    },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  plugins: [],
};
