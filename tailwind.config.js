/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB" // Örnek olarak ekledik; kullanmak zorunda değilsiniz
      },
    },
  },
  plugins: [],
};
