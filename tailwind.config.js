/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offWhite: 'var(--off-white)',
        lightGrey: 'var(--light-grey)',
        smokeyGrey: 'var(--smokey-grey)',
        offBlack: 'var(--off-black)',
        purple: 'var(--purple)',
        lightRed: 'var(--light-Red)'
      },
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}