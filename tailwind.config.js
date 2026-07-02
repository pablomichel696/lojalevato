/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F7EAF5',
          100: '#EFD3EB',
          200: '#DDA7D6',
          300: '#C97CC0',
          400: '#A8509F',
          500: '#833480',
          600: '#611263',
          700: '#4E0F50',
          800: '#3B0B3D',
          900: '#2A082B',
          DEFAULT: '#4E0F50',
        },
        cream: {
          50: '#FFFEFB',
          100: '#FBF7EE',
          200: '#F6EFDF',
          300: '#EFE4CA',
          400: '#E6D6AF',
          DEFAULT: '#FBF7EE',
        },
        gold: {
          400: '#EFC161',
          500: '#E2A73C',
          600: '#C88A24',
          700: '#A66E19',
          DEFAULT: '#E2A73C',
        },
        leaf: {
          400: '#7DAE7E',
          500: '#5C9060',
          600: '#457348',
          DEFAULT: '#5C9060',
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(46, 10, 48, 0.12)',
        card: '0 2px 12px -2px rgba(46, 10, 48, 0.10)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
