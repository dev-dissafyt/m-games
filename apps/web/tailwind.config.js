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
          bg: '#040507',
          card: '#080a0f',
          cardHover: '#0f121a',
          border: '#161b26',
          muted: '#71717a',
        },
      },
      boxShadow: {
        // Subtle outline glow (delicate, refined)
        'subtle-cyan': '0 0 12px rgba(0, 240, 255, 0.12)',
        'subtle-pink': '0 0 12px rgba(255, 0, 127, 0.12)',
        'subtle-lime': '0 0 12px rgba(57, 255, 20, 0.12)',
        'subtle-amber': '0 0 12px rgba(255, 183, 0, 0.12)',
        'subtle-purple': '0 0 12px rgba(176, 38, 255, 0.12)',
        // Button hover glow (vibrant upon user interaction)
        'hover-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'hover-pink': '0 0 20px rgba(255, 0, 127, 0.35)',
        'hover-lime': '0 0 20px rgba(57, 255, 20, 0.35)',
        'hover-amber': '0 0 20px rgba(255, 183, 0, 0.35)',
        'hover-purple': '0 0 20px rgba(176, 38, 255, 0.35)',
        'hover-white': '0 0 20px rgba(255, 255, 255, 0.3)',
        // Backwards-compatible soft glow defaults
        'neon-cyan': '0 0 12px rgba(0, 240, 255, 0.15)',
        'neon-pink': '0 0 12px rgba(255, 0, 127, 0.15)',
        'neon-lime': '0 0 12px rgba(57, 255, 20, 0.15)',
        'neon-amber': '0 0 12px rgba(255, 183, 0, 0.15)',
        'neon-purple': '0 0 12px rgba(176, 38, 255, 0.15)',
      },
    },
  },
  plugins: [],
};
