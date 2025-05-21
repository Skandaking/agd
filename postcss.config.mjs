/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    // You might not need autoprefixer with Tailwind CSS v4 and modern browsers
    // 'autoprefixer': {},
  },
};

export default config;
