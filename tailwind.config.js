/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bio: {
          dark: '#060b18',
          surface: '#0c162e',
          card: '#122042',
          border: 'rgba(255, 255, 255, 0.08)',
          emerald: '#10b981',
          teal: '#0d9488',
          cyan: '#06b6d4',
          indigo: '#6366f1',
          amber: '#f59e0b',
          rose: '#f43f5e',
          glow: '#34d399',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-bio': '0 0 25px -5px rgba(16, 185, 129, 0.45)',
        'neon-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.45)',
        'neon-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.45)',
      }
    },
  },
  plugins: [],
}
