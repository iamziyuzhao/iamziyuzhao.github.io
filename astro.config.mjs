// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  markdown: {
    // light code blocks to match the page (Astro's default is github-dark)
    shikiConfig: { theme: "github-light" },
  },
});
