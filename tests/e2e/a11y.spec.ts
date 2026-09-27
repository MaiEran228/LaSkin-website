import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const LANGS = ['he', 'ar', 'en'] as const;
const ROUTES = ['', 'clinical-studies/', 'areas/', 'areas/mevaseret-zion/', 'privacy/', 'accessibility/'] as const;
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

for (const lang of LANGS) {
  for (const route of ROUTES) {
    test(`axe: /${lang}/${route} has no WCAG 2.2 AA violations (desktop)`, async ({ page }) => {
      await page.goto(`/${lang}/${route}`);
      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  }
  test(`axe: /${lang}/ mobile viewport with the menu open`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${lang}/`);
    await page.getByRole('button', { expanded: false }).first().click();
    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test('404 page has no violations', async ({ page }) => {
  await page.goto('/404.html');
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});
