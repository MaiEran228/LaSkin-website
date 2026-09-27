import { test, expect } from '@playwright/test';

const LANGS = ['he', 'ar', 'en'] as const;
const DIR: Record<string, string> = { he: 'rtl', ar: 'rtl', en: 'ltr' };
const ROUTES: { path: string; indexable: boolean }[] = [
  { path: '', indexable: true },
  { path: 'clinical-studies/', indexable: true },
  { path: 'areas/', indexable: false },
  { path: 'areas/mevaseret-zion/', indexable: true },
  { path: 'privacy/', indexable: true },
  { path: 'accessibility/', indexable: true },
];

for (const lang of LANGS) {
  for (const r of ROUTES) {
    test(`metadata on /${lang}/${r.path}`, async ({ page }) => {
      await page.goto(`/${lang}/${r.path}`);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('html')).toHaveAttribute('dir', DIR[lang]);
      expect((await page.title()).length).toBeGreaterThan(10);
      expect((await page.locator('meta[name="description"]').getAttribute('content'))?.length).toBeGreaterThan(40);
      expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe(`https://laskin.co.il/${lang}/${r.path}`);
      const alts = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) => els.map((e) => [e.getAttribute('hreflang'), e.getAttribute('href')]));
      expect(alts).toEqual([
        ['he', `https://laskin.co.il/he/${r.path}`],
        ['ar', `https://laskin.co.il/ar/${r.path}`],
        ['en', `https://laskin.co.il/en/${r.path}`],
        ['x-default', `https://laskin.co.il/he/${r.path}`],
      ]);
      expect(await page.locator('meta[name="robots"]').getAttribute('content')).toBe(r.indexable ? 'index,follow' : 'noindex,follow');
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.locator('meta[property="og:title"]').count()).toBe(1);
      const ld = await page.locator('script[type="application/ld+json"]').textContent();
      const parsed = JSON.parse(ld ?? 'null');
      const business = Array.isArray(parsed) ? parsed[0] : parsed;
      expect(business['@type']).toBe('HealthAndBeautyBusiness');
      expect(business.telephone).toBe('+972-58-570-0051');
      expect(business.address.addressLocality).toBe('Har Adar');
      // No placeholder links or unpublished-content markers may reach production.
      expect(await page.locator('a[href="#"]').count()).toBe(0);
      const html = await page.content();
      expect(html).not.toMatch(/CONTENT_REQUIRED|REVIEW_PENDING|AUTHORITY_REQUIRED|TODO/);
      // Every image has an alt attribute (decorative ones use alt="").
      expect(await page.locator('img:not([alt])').count()).toBe(0);
    });
  }
}

test('WhatsApp links use the clinic number and the language-specific message', async ({ page }) => {
  await page.goto('/he/');
  const hrefs = await page.locator('a[data-wa]').evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));
  expect(hrefs.length).toBeGreaterThan(3);
  for (const h of hrefs) {
    expect(h).toContain('972585700051');
    expect(decodeURIComponent(h)).toContain('הגעתי מאתר La Skin');
  }
  await page.goto('/he/areas/mevaseret-zion/');
  const loc = await page.locator('.loc-hero a[data-wa]').first().evaluate((e) => (e as HTMLAnchorElement).href);
  expect(decodeURIComponent(loc)).toContain('אני ממבשרת ציון');
});

test('sitemap lists only indexable canonical URLs and robots.txt allows crawling', async ({ request }) => {
  const sm = await (await request.get('/sitemap.xml')).text();
  expect(sm).toContain('<loc>https://laskin.co.il/he/</loc>');
  expect(sm).toContain('<loc>https://laskin.co.il/en/clinical-studies/</loc>');
  expect(sm).toContain('<loc>https://laskin.co.il/ar/areas/mevaseret-zion/</loc>');
  expect(sm).not.toContain('/areas/</loc>');
  expect(sm).toContain('hreflang="x-default"');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Allow: /');
  expect(robots).toContain('Sitemap: https://laskin.co.il/sitemap.xml');
});

test('root redirects to /he/ and unknown paths get the 404 page', async ({ page }) => {
  await page.goto('/');
  await page.waitForURL(/\/he\/$/);
  const res = await page.goto('/he/does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText(/העמוד לא נמצא/);
});
