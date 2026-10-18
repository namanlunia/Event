import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const SRC_IMAGE = path.join(ROOT_DIR, 'public/brand/omnikon-logo-original.jpg');

const BRAND_DIR = path.join(ROOT_DIR, 'public/brand');
const ICONS_DIR = path.join(ROOT_DIR, 'public/icons');
const APP_DIR = path.join(ROOT_DIR, 'src/app');

fs.mkdirSync(BRAND_DIR, { recursive: true });
fs.mkdirSync(ICONS_DIR, { recursive: true });
fs.mkdirSync(APP_DIR, { recursive: true });

// A) Square crop configurations:
// Standard crop (540x540) for high-res emblem displays:
const EMBLEM_CROP = { left: 231, top: 105, width: 540, height: 540 };
// Tighter crop (520x520) for small favicon sizes so emblem reads with maximum clarity:
const FAVICON_CROP = { left: 242, top: 130, width: 520, height: 520 };

function createIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // number of images

  let offset = 6 + count * 16;
  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // no palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // 32 bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((img) => img.buffer)]);
}

async function generateAssets() {
  console.log('Generating brand assets from:', SRC_IMAGE);

  if (!fs.existsSync(SRC_IMAGE)) {
    throw new Error(`Source master image not found at ${SRC_IMAGE}`);
  }

  // B) Navbar and footer brand icons (PNG format with lanczos3 downsampling)
  const brandSizes = [96, 128, 256];
  for (const size of brandSizes) {
    const outPath = path.join(BRAND_DIR, `owoc-logo-emblem-${size}.png`);
    await sharp(SRC_IMAGE)
      .extract(EMBLEM_CROP)
      .resize(size, size, { kernel: 'lanczos3' })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    console.log(`[OK] Generated: public/brand/owoc-logo-emblem-${size}.png (${size}x${size})`);
  }

  // D) Full logo (emblem + wordmark) resized to 512x512
  const fullLogoPath = path.join(BRAND_DIR, 'omnikon-logo-full-512.png');
  await sharp(SRC_IMAGE)
    .resize(512, 512, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(fullLogoPath);
  console.log(`[OK] Generated: public/brand/omnikon-logo-full-512.png (512x512)`);

  // C) Favicon set & App Router conventions
  // 1. Multi-resolution favicon.ico (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const icoImages = [];
  for (const size of icoSizes) {
    const buf = await sharp(SRC_IMAGE)
      .extract(FAVICON_CROP)
      .resize(size, size, { kernel: 'lanczos3' })
      .png({ compressionLevel: 9 })
      .toBuffer();
    icoImages.push({ width: size, height: size, buffer: buf });
  }
  const icoBuffer = createIco(icoImages);
  fs.writeFileSync(path.join(APP_DIR, 'favicon.ico'), icoBuffer);
  console.log(`[OK] Generated: src/app/favicon.ico (16x16, 32x32, 48x48)`);

  // 2. Next.js App Router standard icon: src/app/icon.png (512x512)
  await sharp(SRC_IMAGE)
    .extract(EMBLEM_CROP)
    .resize(512, 512, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(APP_DIR, 'icon.png'));
  console.log(`[OK] Generated: src/app/icon.png (512x512)`);

  // 3. Next.js App Router Apple touch icon: src/app/apple-icon.png (180x180)
  await sharp(SRC_IMAGE)
    .extract(EMBLEM_CROP)
    .resize(180, 180, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(APP_DIR, 'apple-icon.png'));
  console.log(`[OK] Generated: src/app/apple-icon.png (180x180)`);

  // 4. Future PWA icons: public/icons/icon-192.png & public/icons/icon-512.png
  await sharp(SRC_IMAGE)
    .extract(EMBLEM_CROP)
    .resize(192, 192, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(ICONS_DIR, 'icon-192.png'));
  console.log(`[OK] Generated: public/icons/icon-192.png (192x192)`);

  await sharp(SRC_IMAGE)
    .extract(EMBLEM_CROP)
    .resize(512, 512, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(ICONS_DIR, 'icon-512.png'));
  console.log(`[OK] Generated: public/icons/icon-512.png (512x512)`);

  console.log('\nAll brand assets successfully generated!');
}

generateAssets().catch((err) => {
  console.error('Failed to generate brand assets:', err);
  process.exit(1);
});
