/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F3',
          100: '#F7F3EA', // Primary background
          200: '#EFE8DC', // Soft surface
          300: '#E4DDD0',
          400: '#D5CCBD',
          500: '#B8AD9C',
        },
        charcoal: {
          DEFAULT: '#202020',
          50: '#F5F5F5',
          100: '#E5E5E5',
          300: '#A3A3A3',
          500: '#525252',
          700: '#2A2A2A',
          800: '#202020',
          900: '#151515', // Dark mode background
        },
        terracotta: {
          light: '#DE835F',
          DEFAULT: '#C66A45', // Primary accent
          dark: '#A65230',
        },
        olive: {
          light: '#94997A',
          DEFAULT: '#7B8062', // Muted accent
          dark: '#62664D',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(32, 32, 32, 0.06)',
        'medium': '0 8px 30px -4px rgba(32, 32, 32, 0.10)',
        'elevated': '0 12px 40px -6px rgba(32, 32, 32, 0.14)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
