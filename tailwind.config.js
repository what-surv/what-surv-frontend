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
  },
  plugins: [],
};
