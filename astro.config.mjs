// @ts-check
import { defineConfig } from 'astro/config';

/**
 * DEPLOY_TARGET
 *  - "production" (default): served at https://laskin.co.il/ (site root). Indexable.
 *  - "preview": GitHub Pages project URL https://maieran228.github.io/LaSkin-website/ (sub-path).
 *    Every page is noindex and robots.txt disallows crawling, so the preview never competes with production.
 */
const TARGET = process.env.DEPLOY_TARGET === 'preview' ? 'preview' : 'production';
const SITE = TARGET === 'preview' ? 'https://maieran228.github.io' : 'https://laskin.co.il';
const BASE = TARGET === 'preview' ? '/LaSkin-website' : '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Keep CSS/JS external so the Content-Security-Policy can stay strict (no 'unsafe-inline').
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
    define: { 'import.meta.env.DEPLOY_TARGET': JSON.stringify(TARGET) },
  },
  image: {
    // sharp is used for AVIF/WebP derivatives at build time
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  devToolbar: { enabled: false },
});
