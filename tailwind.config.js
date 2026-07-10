/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        bounceIn: 'bounceIn 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        whizzOut: 'whizzOut 1000ms cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards',
      },
      keyframes: {
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '70%': { opacity: '1', transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        whizzOut: {
          '0%': { transform: 'scale(1)', borderRadius: '0px' },
          '40%': { transform: 'scale(0.25)', borderRadius: '50%' },
          '60%': { transform: 'scale(0.25) translateX(0)', borderRadius: '50%', opacity: '1' },
          '100%': { transform: 'scale(0.20) translateX(150vw)', borderRadius: '50%', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}