// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.phpizza.com',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: {
    prefetchAll: true
  },

  adapter: netlify(),
  experimental: {
    clientPrerender: true,
  },
});
