/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f0ff',
          pink: '#ff007f',
          magenta: '#e00085',
          lime: '#39ff14',
          amber: '#ffb700',
          purple: '#b026ff',
          blue: '#1f51ff',
        },
        arcade: {
          bg: '#05060a',
          card: '#0a0d18',
          cardHover: '#111627',
          border: '#1a2236',
          muted: '#64748b',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)',
        'neon-pink': '0 0 15px rgba(255, 0, 127, 0.5), 0 0 30px rgba(255, 0, 127, 0.2)',
        'neon-lime': '0 0 15px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.2)',
        'neon-amber': '0 0 15px rgba(255, 183, 0, 0.5), 0 0 30px rgba(255, 183, 0, 0.2)',
        'neon-purple': '0 0 15px rgba(176, 38, 255, 0.5), 0 0 30px rgba(176, 38, 255, 0.2)',
        'tube-cyan': '0 0 6px #00f0ff, 0 0 16px rgba(0, 240, 255, 0.4)',
        'tube-pink': '0 0 6px #ff007f, 0 0 16px rgba(255, 0, 127, 0.4)',
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 3s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '1',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
          },
        },
      },
    },
  },
  plugins: [],
};
