/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'rgb(var(--bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
          card: 'rgb(var(--bg-card) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover) / <alpha-value>)',
        },
        ink: {
          primary: 'rgb(var(--ink-primary) / <alpha-value>)',
          secondary: 'rgb(var(--ink-secondary) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        imageReveal: {
          '0%': { opacity: '0', transform: 'scale(1.12)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseBar: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        },
        countPulse: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '1' },
        },
        underline: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-down': 'fadeDown 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-left': 'slideLeft 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-right': 'slideRight 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scaleIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'image-reveal': 'imageReveal 1.4s cubic-bezier(0.16,1,0.3,1) forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
        'pulse-bar': 'pulseBar 1.1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
