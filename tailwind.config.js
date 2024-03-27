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
      // => @media (min-width: 280px)
      fold: '280px',
      // => @media (min-width: 390px)
      iphone: '390px',
      // => 모바일
      mb: '490px',
      // => @media (min-width: 640px)
      sm: '640px',
      // => @media (min-width: 1024px)
      md: '1024px',
      // => @media (min-width: 1280px)
      lg: '1280px',
      // @media screen and (max-width: 1280px) { }
    },
  },
  plugins: [],
};
