/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './index.html',
    "./src/**/*.{js,jsx,ts,tsx}", // Scans these files for Tailwind classes
  ],
  theme: {
    extend: {
      colors:{
        primaryRed: "#C13B44",
      },
      backgroundImage: {
        'radial-custom': 'radial-gradient(circle, #1E526B 10%, #496573 100%)',
      },
      fontFamily: {
        abril: ['"Abril Fatface"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(10)' },
          '100%': { transform: 'rotate(-360deg) scale(10)' },
        },
      },
      animation: {
        fadeInLeft: 'fadeInLeft 2s ease-in-out', 
        fadeInRight: 'fadeInRight 2s ease-in-out', 
        rotate: 'rotate 10s linear infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
       ".mask-hole": {
          "mask-image": "radial-gradient(circle, transparent 25%, black 26%)",
          "-webkit-mask-image": "radial-gradient(circle, transparent 25%, black 26%)",
          "background-color": "transparent",
        },
      });
    },
  ],
};


// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'popper-left': 'popper-left 1.5s ease-out forwards',
        'popper-right': 'popper-right 1.5s ease-out forwards',
      },
      keyframes: {
        'popper-left': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(-200px, -150px) rotate(720deg)', opacity: '0' },
        },
        'popper-right': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(200px, -150px) rotate(720deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
