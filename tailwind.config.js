/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'srm-blue': '#004684',
        'srm-yellow': '#FFD200',
        'srm-red': '#8B1E0F',
        'srm-lightBlue': '#1A73E8',
      },
    },
  },
  plugins: [],
};
