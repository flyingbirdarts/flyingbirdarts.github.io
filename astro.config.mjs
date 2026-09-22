// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://paulalexandrejohn.com',
  // Match the Jekyll site's `permalink: pretty` URLs (/gallery/mountains/).
  trailingSlash: 'always',
});
