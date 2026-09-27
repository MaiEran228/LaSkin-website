import { test, expect } from '@playwright/test';

const WIDTHS = [360, 390, 768, 1024, 1440];
const LANGS = ['he', 'ar', 'en'] as const;
const ROUTES = ['', 'clinical-studies/', 'areas/', 'areas/mevaseret-zion/', 'privacy/', 'accessibility/'];

for (const width of WIDTHS) {
  for (const lang of LANGS) {
    test(`no horizontal overflow at ${width}px on every /${lang}/ page`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ROUTES) {
        await page.goto(`/${lang}/${route}`);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `/${lang}/${route} at ${width}px`).toBeLessThanOrEqual(0);
      }
    });
  }
}

test('200% zoom equivalent (720px CSS viewport) reflows without overflow or clipped hero text', async ({ page }) => {
  await page.setViewportSize({ width: 720, height: 600 });
  for (const lang of LANGS) {
    await page.goto(`/${lang}/`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    const clipped = await h1.evaluate((el) => el.scrollWidth > el.clientWidth + 1);
    expect(clipped).toBe(false);
  }
});

test('sticky WhatsApp bar on mobile, floating button on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/he/');
  await expect(page.locator('.sticky-bar')).toBeVisible();
  await expect(page.locator('.float-wa')).toBeHidden();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('.sticky-bar')).toBeHidden();
  await expect(page.locator('.float-wa')).toBeVisible();
});

test('touch targets of interactive controls are at least 44x44 CSS px on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/he/');
  const small = await page.evaluate(() => {
    const out: string[] = [];
    document.querySelectorAll<HTMLElement>('a, button, input').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return; // hidden (incl. the visually-hidden skip link)
      if (el.closest('.crumbs, .footer__bottom, .lead__privacy')) return; // inline text links (exempt per WCAG 2.5.8 inline exception)
      if (r.height < 44 && r.width < 44) out.push(`${el.tagName} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
    });
    return out;
  });
  expect(small).toEqual([]);
});
