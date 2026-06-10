// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://logan-castro.github.io',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
