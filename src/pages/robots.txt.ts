import type { APIRoute } from 'astro';
import { IS_PREVIEW, ORIGIN, withBase } from '../lib/routes';

export const GET: APIRoute = () => {
  const body = IS_PREVIEW
    ? `# Preview deployment — not for indexing\nUser-agent: *\nDisallow: /\n`
    : `# La Skin — laskin.co.il\nUser-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}${withBase('/sitemap.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
