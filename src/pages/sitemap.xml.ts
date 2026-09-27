import type { APIRoute } from 'astro';
import { routeInventory, alternates } from '../lib/routes';
import { SITE } from '../data/site';

/** Only indexable, canonical URLs. The areas index (noindex) and preview builds are excluded. */
export const GET: APIRoute = () => {
  const entries = routeInventory().filter((e) => e.indexable);
  const urls = entries.map((e) => {
    const alts = alternates(e.route).map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`).join('\n');
    const priority = e.route === 'home' ? (e.lang === 'he' ? '1.0' : '0.8') : e.route === 'studies' || e.route === 'locality' ? '0.6' : '0.3';
    return `  <url>\n    <loc>${e.canonical}</loc>\n${alts}\n    <lastmod>${SITE.launchDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
