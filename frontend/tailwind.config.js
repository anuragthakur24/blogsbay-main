/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1.5s ease-in-out infinite', // Slower, smooth bounce
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)', // No movement at the start or end
          },
          '50%': {
            transform: 'translateY(-2px)', // Subtle, small movement up
          },
        },
      },
    },
  },
  plugins: [],
}

