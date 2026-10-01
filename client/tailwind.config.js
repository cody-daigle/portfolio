/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4338ca",
        },
      },
    },
  },
  plugins: [],
};
