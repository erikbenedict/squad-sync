import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin,
  ],
};
