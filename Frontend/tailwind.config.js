module.exports = {
  content: ['./src/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey0: '#ebdcdc',
        grey1: '#c9bebe',
        orange1: '#ff7800',
        red1: '#b41d1d',
        green1: '#00cc00',
      },
      screens: {
        xs: '480px',
        xshort: {
          raw: '(max-height: 480px)',
        },
        short: {
          raw: '(max-height: 640px)',
        },
        medium: {
          raw: '(max-height: 768px)',
        },
      },
    },
  },
  plugins: [],
}
