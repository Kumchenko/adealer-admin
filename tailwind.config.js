/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'light-gradient': "linear-gradient(95deg, rgba(196,181,253,1) 0%, rgba(245,208,254,1) 100%)"
      }
    }
  },
  plugins: [],
}
