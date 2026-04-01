import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#f2f8f4',
          100: '#dcece1',
          200: '#b8d7c4',
          300: '#8fc09f',
          400: '#5ea777',
          500: '#43895c',
          600: '#356d49',
          700: '#2b563b',
          800: '#21412f',
          900: '#183026'
        },
        walnut: '#7b4b2a',
        sand: '#f4efe7'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(20, 34, 22, 0.12)'
      }
    },
  },
  plugins: [],
};

export default config;
