# La Skin — website (laskin.co.il)

Trilingual (Hebrew · Arabic · English) static website for La Skin, a laser hair removal clinic in Har Adar.
Built with [Astro 5](https://astro.build) + TypeScript (strict), no UI framework, ~4 KB of client JavaScript.
The site is fully static: it has **no backend, no database, no API keys and no dependency on any AI service**.
It runs on any static host (GitHub Pages, Cloudflare Pages, Netlify, cPanel/Apache).

## Commands

| Command | What it does |
| --- | --- |
| `npm ci` | install dependencies (Node 22) |
| `npm run dev` | dev server at http://localhost:4321/he/ |
| `npm run build` | production build into `dist/` (URLs for https://laskin.co.il) |
| `npm run build:preview` | preview build for the GitHub Pages sub-path (noindex) |
| `npm run preview` | serve `dist/` locally |
| `npm run check` | Astro/TypeScript type check |
| `npm test` | unit tests (Vitest): business facts, translations, contrast |
| `npm run test:e2e` | Playwright: axe-core WCAG 2.2 AA scans, keyboard, form, responsive, SEO (needs `npm run build` first; uses the locally installed Chrome and Edge) |
| `npm run test:all` | check + build + unit + e2e |
| `npm run prepare-images -- <design/img>` | regenerate `src/assets/img` from the design export (crops, logo mask, favicons, OG image) |

## Project layout

```
src/
  i18n/            he.ts · ar.ts · en.ts — every visible string, per language (typed by types.ts)
  data/            site.ts (business facts, WhatsApp messages) · localities.ts · studies.ts · waShots.ts
  lib/routes.ts    route inventory, canonical / hreflang / base-path helpers, indexing policy
  layouts/Base.astro   <head> metadata, JSON-LD, CSP, header/footer/sticky bar
  components/      Header · Footer · StickyBar · WaButton · Breadcrumb · LegalPage · Icons
  pages/[lang]/    index (home) · clinical-studies · areas · areas/mevaseret-zion · privacy · accessibility
  pages/           index (root → /he/ redirect) · 404 · sitemap.xml · robots.txt
  scripts/main.ts  menu, FAQ, strip, lead form, analytics abstraction, WhatsApp desktop links
  styles/global.css  design tokens + all styles (self-hosted fonts)
  assets/          images (AVIF/WebP derivatives generated at build) · fonts
public/            favicons, OG image, _headers/_redirects (Cloudflare/Netlify), .htaccess (Apache), .nojekyll
tests/unit         Vitest
tests/e2e          Playwright + axe
docs/              content guide (Hebrew), routes, analytics
scripts/           prepare-images.mjs
```

## Editing content

All text lives in `src/i18n/{he,ar,en}.ts`. Change a string, run `npm run build`, deploy `dist/`.
See `docs/CONTENT-GUIDE-HE.md` (Hebrew) for a section-by-section guide.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys to
GitHub Pages **only when the repository variable `DEPLOY_ENABLED` is `true`**; until then pushes do nothing.
