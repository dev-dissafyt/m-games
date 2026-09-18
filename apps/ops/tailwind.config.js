/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#16a34a',
          dark: '#09090b',
        },
        neon: {
          cyan: '#00f0ff',
          pink: '#ff007f',
          magenta: '#e00085',
          lime: '#39ff14',
          amber: '#ffb700',
          purple: '#b026ff',
        },
        arcade: {
          bg: '#040507',
          card: '#080a0f',
          cardHover: '#0f121a',
          border: '#161b26',
        },
      },
      boxShadow: {
        'subtle-cyan': '0 0 12px rgba(0, 240, 255, 0.12)',
        'subtle-pink': '0 0 12px rgba(255, 0, 127, 0.12)',
        'subtle-lime': '0 0 12px rgba(57, 255, 20, 0.12)',
        'subtle-amber': '0 0 12px rgba(255, 183, 0, 0.12)',
        'hover-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'hover-lime': '0 0 20px rgba(57, 255, 20, 0.35)',
      },
    },
  },
  plugins: [],
};
