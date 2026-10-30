/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#243B64',
          dark: '#162540',
          light: '#355486',
          muted: '#4F668D',
        },
        sidebar: {
          DEFAULT: '#F0F4FF',
          hover: '#E4ECFC',
          active: '#FFFFFF',
          border: '#E2E8F8',
        },
        smartie: {
          50: '#F0F4FF',
          100: '#E2E8F8',
          200: '#C8D9F8',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#243B64',
          900: '#162540',
        },
        canvas: '#F7F9FC',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'card': '0 2px 10px -2px rgba(36, 59, 100, 0.04), 0 1px 3px 0 rgba(36, 59, 100, 0.02)',
        'premium': '0 4px 20px -2px rgba(36, 59, 100, 0.05), 0 2px 6px -1px rgba(36, 59, 100, 0.02)',
        'premium-hover': '0 12px 28px -4px rgba(36, 59, 100, 0.09), 0 4px 10px -2px rgba(36, 59, 100, 0.03)',
        'ai-box': '0 8px 30px -4px rgba(36, 59, 100, 0.07), 0 2px 8px -2px rgba(36, 59, 100, 0.03)',
      }
    },
  },
  plugins: [],
}
