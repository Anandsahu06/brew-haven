import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        coffee: '#3B281C',
        'soft-black': '#121110',
        'warm-beige': '#EFE9E1',
        white: '#FFFFFF',
        gold: '#C59B27',
        'gold-light': '#F4E5B8',
        'gold-dark': '#A47F1D',
        // Semantic variable colors
        bg: {
          primary: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          card: 'var(--bg-card)',
          hover: 'var(--bg-card-hover)',
        },
        txt: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          subtle: 'var(--border-color)',
          accent: 'var(--border-hover)',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        serif: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
