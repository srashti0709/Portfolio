/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#050505",
        bgSecondary: "#0A0A0A",
        bgCard: "#121212",
        //
        purplePrimary: "#A855F7",
        purpleGlow: "#D946EF",
        purpleAccent: "#C026D3",
        purpleSoft: "#E879F9",
        textWhite: "#FFFFFF",
        textSecondary: "#D1D5DB",
        textMuted: "#9CA3AF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s infinite alternate',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-medium': 'float-medium 4s ease-in-out infinite',
        'float-fast': 'float-fast 2.5s ease-in-out infinite',
        'border-pulse': 'border-pulse 4s linear infinite',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
        'grid-slide': 'grid-slide 20s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.4), 0 0 10px rgba(168, 85, 247, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(217, 70, 239, 0.8), 0 0 35px rgba(217, 70, 239, 0.4)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(3px, -5px)' },
        },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(168, 85, 247, 0.3)' },
          '50%': { borderColor: 'rgba(217, 70, 239, 0.8)' },
        },
        'text-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'grid-slide': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
