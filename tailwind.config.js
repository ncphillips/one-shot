/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        inset:
          'inset 0.5px 2px 6px 0px rgba(44, 32, 80, 0.04), inset 0px 1px 2px 0px rgba(46, 36, 81, 0.03)',
      }
    }
  },
  plugins: [],
}

