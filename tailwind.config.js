/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',        // Vite ana HTML
    './src/**/*.{js,jsx,ts,tsx}'  // Bütün React bileşenleri
  ],
  theme: {
    extend: {},             // İleride özel renk, font ekleyebilirsin
  },
  plugins: [],
}
