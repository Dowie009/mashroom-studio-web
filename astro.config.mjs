import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mashroom-studio-web.vercel.app',
  output: 'static',
  build: {
    assets: '_assets'
  }
});
