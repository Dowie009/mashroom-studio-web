import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://walewalewa.com',
  output: 'static',
  build: {
    assets: '_assets'
  }
});
