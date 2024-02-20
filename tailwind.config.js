module.exports = {
  // corePlugins: {
  //   preflight: false,
  // },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Toggle dark-mode based on .dark class or data-mode="dark"
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {},
    fontFamily: {
      pretendard: ['Pretendard'],
    },
    screens: {
      // => @media (min-width: 390px)
      iphone: '390px',
      // => @media (min-width: 640px)
      sm: '640px',
      // => @media (min-width: 1024px)
      md: '1024px',
      // => @media (min-width: 1280px)
      lg: '1280px',
    },
  },
  plugins: [],
};
