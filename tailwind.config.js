/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        smartie: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        surface: {
          light: '#f8fafc',
          card: '#ffffff',
          sidebar: '#fbfcfe',
        }
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
        'card': '0 2px 10px -2px rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'card-hover': '0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
