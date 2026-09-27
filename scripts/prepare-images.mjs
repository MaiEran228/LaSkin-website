// One-off asset preparation: copies the approved design images into src/assets,
// removes the WhatsApp chat headers (profile photos / names) for privacy,
// cleans the circular logo mark, and generates favicon + Open Graph images.
// Usage: node scripts/prepare-images.mjs <path-to-design-img-folder>
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2];
if (!SRC) { console.error('usage: node scripts/prepare-images.mjs <design/img>'); process.exit(1); }
const OUT = 'src/assets/img';
await mkdir(`${OUT}/wa`, { recursive: true });
await mkdir('public', { recursive: true });

// 1. Photos used by the design (copied as-is; Astro generates AVIF/WebP derivatives at build time)
const copies = ['waiting-room.png','lobby-glass.png','soprano.jpeg','goggles.jpeg','waiting-chairs.jpeg',
  'waiting-logo.jpeg','logo-wall.jpeg','details.jpeg','laser-face.png','entrance.png'];
for (const f of copies) await copyFile(path.join(SRC, f), path.join(OUT, f));

// 2. Logo mark: enforce a clean circular alpha mask (removes the white crescent at the bottom of the source PNG)
const logo = sharp(path.join(SRC, 'logo-mark.png'));
const { width, height } = await logo.metadata();
const r = Math.min(width, height) / 2 - 3;
const mask = Buffer.from(`<svg width="${width}" height="${height}"><circle cx="${width/2}" cy="${height/2}" r="${r}" fill="#fff"/></svg>`);
await logo.composite([{ input: mask, blend: 'dest-in' }]).png().toFile(path.join(OUT, 'logo-mark.png'));

// 3. WhatsApp screenshots: crop the chat header (contact photo/name) and any photo-roll strips.
const wa = {
  'wa-01': null, 'wa-02': { top: 42 }, 'wa-03': { top: 42 }, 'wa-04': { top: 42 }, 'wa-05': { bottom: 790 },
  'wa-06': { top: 48 }, 'wa-07': null, 'wa-09': { top: 42 }, 'wa-10': null, 'wa-11': { top: 42 }, 'wa-12': { top: 42 }, 'wa-card': null,
};
for (const [name, crop] of Object.entries(wa)) {
  const img = sharp(path.join(SRC, 'wa', `${name}.jpeg`));
  const m = await img.metadata();
  let pipeline = img;
  if (crop?.top) pipeline = pipeline.extract({ left: 0, top: crop.top, width: m.width, height: m.height - crop.top });
  if (crop?.bottom) pipeline = pipeline.extract({ left: 0, top: 0, width: m.width, height: crop.bottom });
  await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, 'wa', `${name}.jpeg`));
}

// 4. Favicons + Apple touch icon from the cleaned logo mark
const cleaned = path.join(OUT, 'logo-mark.png');
await sharp(cleaned).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(cleaned).resize(64, 64).png().toFile('public/favicon-64.png');
await sharp(cleaned).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(cleaned).resize(512, 512).png().toFile('public/icon-512.png');

// 5. Open Graph share image 1200x630: clinic photo, dark overlay, logo mark
const photo = await sharp(path.join(SRC, 'lobby-glass.png')).resize(1200, 630, { fit: 'cover', position: 'centre' }).toBuffer();
const overlay = Buffer.from(`<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f2b24" stop-opacity=".55"/><stop offset="1" stop-color="#2f2b24" stop-opacity=".92"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`);
const logoBig = await sharp(cleaned).resize(260, 260).png().toBuffer();
await sharp(photo).composite([{ input: overlay }, { input: logoBig, left: 470, top: 185 }]).jpeg({ quality: 85 }).toFile('public/og-image.jpg');
console.log('done');
