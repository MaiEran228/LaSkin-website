import { describe, it, expect } from 'vitest';

/** WCAG 2.x relative luminance / contrast ratio for the text/background pairs used in global.css. */
const lum = (hex: string) => {
  const c = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const PAIRS: [string, string, string, number][] = [
  ['body text on cream', '#635B4D', '#FBF8F3', 4.5],
  ['body text on cream-2', '#635B4D', '#F3ECE1', 4.5],
  ['muted text on cream', '#6F6757', '#FBF8F3', 4.5],
  ['muted text on white', '#6F6757', '#FFFFFF', 4.5],
  ['eyebrow on cream-2', '#7A5E1E', '#F3ECE1', 4.5],
  ['eyebrow on white', '#7A5E1E', '#FFFFFF', 4.5],
  ['lead text on champagne', '#584F3B', '#E3D2AF', 4.5],
  ['lead link on champagne', '#4A3E22', '#E3D2AF', 4.5],
  ['error text on champagne', '#8E2F20', '#E3D2AF', 4.5],
  ['white on WhatsApp green', '#FFFFFF', '#14803C', 4.5],
  ['white on WhatsApp green hover', '#FFFFFF', '#106A32', 4.5],
  ['cream on dark button', '#F7F2E9', '#4D473B', 4.5],
  ['dark-section body', '#D9D0BE', '#4D473B', 4.5],
  ['dark-section secondary', '#C7BDA9', '#4D473B', 4.5],
  ['pillar card body on translucent card', '#DDD3C0', '#5B554A', 4.5],
  ['dark-section eyebrow', '#DFC99A', '#4D473B', 4.5],
  ['dark-section heading', '#E3D2AF', '#4D473B', 3],
  ['footer links', '#EAE2D2', '#4D473B', 4.5],
  ['hero fine print on overlay', '#DCD3C2', '#332F27', 4.5],
  ['hero claim on overlay', '#EFE0BE', '#332F27', 4.5],
  ['nav link on header', '#635B4D', '#FBF8F3', 4.5],
  ['lang chip inactive', '#645C4D', '#FFFFFF', 4.5],
  ['focus ring vs cream', '#4D473B', '#FBF8F3', 3],
  ['focus halo vs dark', '#E3D2AF', '#4D473B', 3],
  ['focus halo vs green', '#E3D2AF', '#14803C', 3],
];

describe('colour contrast (WCAG 2.2 AA)', () => {
  for (const [name, fg, bg, min] of PAIRS) {
    it(`${name}: ${fg} on ${bg} >= ${min}:1`, () => {
      expect(ratio(fg, bg)).toBeGreaterThanOrEqual(min);
    });
  }
});
