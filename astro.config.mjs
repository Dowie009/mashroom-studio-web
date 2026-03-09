import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mashroom-studio-web.vercel.app',
  output: 'static',
  integrations: [sitemap()],
  build: {
    assets: '_assets'
  }
});
