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
        // Crimson Elegance Footer Colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Footer specific colors
        crimson: "hsl(var(--crimson))",
        "crimson-dark": "hsl(var(--crimson-dark))",
        "crimson-light": "hsl(var(--crimson-light))",
        burgundy: "hsl(var(--burgundy))",
        "burgundy-dark": "hsl(var(--burgundy-dark))",
        wine: "hsl(var(--wine))",
        "rose-gold": "hsl(var(--rose-gold))",
        champagne: "hsl(var(--champagne))",
        "footer-primary": "hsl(var(--footer-primary))",
        "footer-secondary": "hsl(var(--footer-secondary))",
        "footer-accent": "hsl(var(--footer-accent))",
        "footer-text": "hsl(var(--footer-text))",
        "footer-text-muted": "hsl(var(--footer-text-muted))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'radial-custom': 'radial-gradient(circle, #1E526B 10%, #496573 100%)',
        'gradient-crimson': 'var(--gradient-crimson)',
        'gradient-elegant': 'var(--gradient-elegant)',
        'gradient-accent': 'var(--gradient-accent)',
      },
      boxShadow: {
        'elegant': 'var(--shadow-elegant)',
        'soft': 'var(--shadow-soft)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        'smooth': 'var(--transition-smooth)',
        'bounce': 'var(--transition-bounce)',
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
        'popper-left': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(-200px, -150px) rotate(720deg)', opacity: '0' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeInLeft: 'fadeInLeft 2s ease-in-out', 
        fadeInRight: 'fadeInRight 2s ease-in-out', 
        rotate: 'rotate 10s linear infinite',
        'popper-left': 'popper-left 1.5s ease-out forwards',
        'popper-right': 'popper-right 1.5s ease-out forwards',
        shine: 'shine 0.8s ease-in-out',
        marquee: 'marquee 40s linear infinite',
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
