import postcssLit from 'rollup-plugin-postcss-lit';
import tailwindcss from 'tailwindcss';
import shopify from 'vite-plugin-shopify';

import type { UserConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default {
  build: {
    minify: false,
    rollupOptions: {
      plugins: [postcssLit()],
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [shopify()],
} satisfies UserConfig;
