import postcssImport from 'postcss-import';
import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcssImport,
    tailwind,
    autoprefixer,
  ]
};