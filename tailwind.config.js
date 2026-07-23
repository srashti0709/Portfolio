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
        // Cooler, more saturated "neon violet" palette.
        // Shifted blue-ward from the old #A855F7 family so wide-gamut
        // (Display P3) phone screens don't push it toward pink/magenta.
        purplePrimary: "#8B5CF6",
        purpleGlow: "#A78BFA",
        purpleAccent: "#6D28D9",
        purpleSoft: "#8B5CF6",
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
          // Stronger, wider bloom at both ends of the pulse
          '0%': { boxShadow: '0 0 8px rgba(157, 78, 221, 0.55), 0 0 18px rgba(157, 78, 221, 0.3)' },
          '100%': { boxShadow: '0 0 28px rgba(199, 125, 255, 0.95), 0 0 55px rgba(199, 125, 255, 0.55)' },
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
          '0%, 100%': { borderColor: 'rgba(157, 78, 221, 0.35)' },
          '50%': { borderColor: 'rgba(199, 125, 255, 0.9)' },
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