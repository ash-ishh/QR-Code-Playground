import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        panel: '#0f172a',
        panelSoft: '#111827',
        accent: '#8b5cf6',
      },
      boxShadow: {
        glow: '0 20px 80px rgba(139, 92, 246, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
