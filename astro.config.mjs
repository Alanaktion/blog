// @ts-check
import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"

import netlify from "@astrojs/netlify"
import { cacheNetlify } from "@astrojs/netlify/cache"

// https://astro.build/config
export default defineConfig({
  site: "https://blog.phpizza.com",
  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: {
    prefetchAll: true,
  },

  adapter: netlify(),
  cache: {
    provider: cacheNetlify(),
  },

  experimental: {
    clientPrerender: true,
  },
})
