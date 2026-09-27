import { test, expect } from '@playwright/test';

/**
 * Accessibility-tree checks: what a screen reader receives (names, roles, landmarks, states).
 * This is not a substitute for testing with NVDA/VoiceOver, which must be done manually.
 */
test('landmarks and names on the Hebrew home page', async ({ page }) => {
  await page.goto('/he/');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'ניווט ראשי' }).first()).toBeAttached();
  await expect(page.getByRole('navigation', { name: 'בחירת שפה' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'עברית (HE)' })).toHaveAttribute('aria-current', 'true');
  await expect(page.getByRole('link', { name: 'English (EN)' })).toHaveAttribute('href', '/en/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('הסרת שיער בלייזר במכשיר המתקדם בעולם');
  await expect(page.getByRole('img', { name: 'דירוג 5 מתוך 5' })).toHaveCount(3);
  await expect(page.getByRole('region', { name: /הודעות שקיבלנו מלקוחות/ })).toBeAttached();
  await expect(page.getByRole('link', { name: 'פתיחת שיחת וואטסאפ עם La Skin' })).toBeAttached();
  await expect(page.locator('button.burger')).toHaveAttribute('aria-label', 'פתיחת תפריט הניווט');
  await expect(page.getByRole('form', { name: 'טופס השארת פרטים' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /שם מלא/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /טלפון/ })).toBeVisible();
  // Screenshot images carry transcripts, not generic alts.
  const alts = await page.locator('#wa-strip img').evaluateAll((els) => els.map((e) => e.getAttribute('alt') ?? ''));
  expect(alts.length).toBe(11);
  for (const a of alts) expect(a.length).toBeGreaterThan(40);
});

test('heading hierarchy has no skipped levels', async ({ page }) => {
  for (const path of ['/he/', '/en/clinical-studies/', '/ar/areas/mevaseret-zion/', '/en/accessibility/']) {
    await page.goto(path);
    const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `${path} heading jump at index ${i}`).toBeLessThanOrEqual(1);
  }
});

test('Arabic and English pages expose translated names to assistive tech', async ({ page }) => {
  await page.goto('/ar/');
  await expect(page.getByRole('navigation', { name: 'اختيار اللغة' })).toBeVisible();
  await expect(page.locator('button.burger')).toHaveAttribute('aria-label', 'فتح قائمة التنقل');
  await page.goto('/en/');
  await expect(page.getByRole('navigation', { name: 'Language selection' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open a WhatsApp chat with La Skin' })).toBeAttached();
});
