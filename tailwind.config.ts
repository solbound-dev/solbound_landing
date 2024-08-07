import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      'black': '#000000',
      'gray-light': '#EDEDED',
      'gray': '#C4C6CC',
      'white': '#ffffff',
    },
    extend: {
      width: {
        content: '1440px',
      },
      maxWidth: {
        content: '1440px',
      },
      zIndex: {
        '-1': '-1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
};
export default config;
