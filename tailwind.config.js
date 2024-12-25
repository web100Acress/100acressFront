/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans these files for Tailwind classes
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-custom': 'radial-gradient(circle, #1E526B 10%, #496573 100%)',
      },
      fontFamily: {
        abril: ['"Abril Fatface"', 'serif'],
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
        fadeInRight: 'fadeInRight 1s ease-in-out', 
        rotate: 'rotate 10s linear infinite',
      },
    },
  },
  plugins: [],
};
