# Route inventory

Production origin: `https://laskin.co.il`. Every page has a self-referencing canonical and reciprocal
`hreflang` links for `he`, `ar`, `en` and `x-default` (→ Hebrew). Generated from `src/lib/routes.ts`.

| Route (per language: `/he/`, `/ar/`, `/en/`) | Page type | Indexable | In sitemap |
| --- | --- | --- | --- |
| `/{lang}/` | Home | yes | yes |
| `/{lang}/clinical-studies/` | Clinical studies | yes | yes |
| `/{lang}/areas/` | Service-area list (no unique local content) | **no** (`noindex,follow`) | no |
| `/{lang}/areas/mevaseret-zion/` | Locality page with verified distance/route data | yes | yes |
| `/{lang}/privacy/` | Privacy policy | yes | yes |
| `/{lang}/accessibility/` | Accessibility statement | yes | yes |
| `/` | Redirect to `/he/` (meta refresh; 301 on hosts with `_redirects`/`.htaccess`) | no | no |
| `/404.html` | Not found (all three languages) | no | no |
| `/sitemap.xml`, `/robots.txt` | generated at build | — | — |

Total: 18 language pages + root redirect + 404 = 20 HTML documents.

## Locality pages policy

The owner supplied 77 localities. Only **Mevaseret Zion** has a dedicated page, because it is the only one
with verified unique content (straight-line distance from OpenStreetMap coordinates, driving distance and
time from an OSRM route, road numbers, local FAQ, localized WhatsApp message). The other 76 are listed as
plain text on `/areas/` and are **not** generated as pages, to avoid thin doorway pages. To add a locality
page: verify its facts, add a dictionary block like `loc` in `src/i18n/*.ts`, add a page under
`src/pages/[lang]/areas/<slug>/`, set `page: '<slug>'` in `src/data/localities.ts`, and add the route key to
`src/lib/routes.ts` (indexable) so it enters the sitemap and hreflang cluster.

## Preview builds

`DEPLOY_TARGET=preview` builds for `https://maieran228.github.io/LaSkin-website/`: base path
`/LaSkin-website/`, every page `noindex`, `robots.txt` disallows all, sitemap empty.
