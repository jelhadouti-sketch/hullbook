import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A1628',
          soft: '#1B2E47',
          mute: '#4A5F7D',
        },
        sea: {
          DEFAULT: '#0E3B5C',
          deep: '#082944',
        },
        paper: {
          DEFAULT: '#F5F1EA',
          cream: '#FAF7F1',
          fog: '#E8EEF3',
        },
        brass: '#B8812E',
        coral: '#C14B3A',
        wave: '#2C6E8F',
      },
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
