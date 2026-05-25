/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        cream: '#F4EFE6',
        navy: {
          DEFAULT: '#0F1B3D',
          dark: '#060C1F',
          soft: '#1E2A52',
        },
        sakura: {
          DEFAULT: '#F2C6D1',
          deep: '#E5879D',
          soft: '#FCE9EE',
        },
        coral: {
          DEFAULT: '#D9594C',
          soft: '#E68B82',
        },
        stone: '#E8E4DE',
        sand: '#E6D7C3',
        gold: {
          DEFAULT: '#B89456',
          soft: '#D9C29A',
        },
        ink: '#1A1A1A',
        muted: '#5B6478',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        'soft': '0 4px 24px -8px rgba(15, 27, 61, 0.08)',
        'card': '0 12px 40px -16px rgba(15, 27, 61, 0.12)',
        'premium': '0 24px 60px -20px rgba(15, 27, 61, 0.18)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'sakura-float': 'sakuraFloat 14s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        sakuraFloat: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(110vh) translateX(40px) rotate(360deg)', opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
