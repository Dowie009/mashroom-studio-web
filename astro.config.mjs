import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://xn--3-sj5c.jp',
  output: 'static',
  build: {
    assets: '_assets'
  }
});
