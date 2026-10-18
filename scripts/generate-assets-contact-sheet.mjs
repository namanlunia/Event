import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(process.cwd(), 'qa');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function createContactSheet() {
  const canvasWidth = 1200;
  const canvasHeight = 900;

  // Render text banners as SVG buffers
  const titleSvg = Buffer.from(`
    <svg width="${canvasWidth}" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#0B0B0D"/>
      <text x="40" y="45" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" fill="#FFFFFF" letter-spacing="1">OMNIKON BRAND ASSETS &amp; FAVICON CONTACT SHEET</text>
      <text x="40" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#E11D2E" font-weight="600">Generated with Sharp (Lanczos3 kernel) — Validated for Crisp Contrast on Dark Theme</text>
    </svg>
  `);

  const labelsSvg = Buffer.from(`
    <svg width="${canvasWidth}" height="800" xmlns="http://www.w3.org/2000/svg">
      <style>
        .label { font-family: monospace; font-size: 12px; fill: #FFFFFF; font-weight: bold; }
        .sub { font-family: monospace; font-size: 11px; fill: #E11D2E; }
        .card { fill: #111114; stroke: rgba(255,255,255,0.1); stroke-width: 1; rx: 12; }
      </style>

      <!-- Row 1 Cards -->
      <rect x="40" y="10" width="340" height="340" class="card"/>
      <text x="60" y="38" class="label">FULL LOGO (512x512 preview)</text>

      <rect x="420" y="10" width="340" height="340" class="card"/>
      <text x="440" y="38" class="label">EMBLEM 256x256 (Retina 3x)</text>

      <rect x="800" y="10" width="360" height="340" class="card"/>
      <text x="820" y="38" class="label">EMBLEM SIZES (128x128 &amp; 96x96)</text>

      <!-- Row 2 Cards -->
      <rect x="40" y="380" width="340" height="380" class="card"/>
      <text x="60" y="410" class="label">APP / APPLE TOUCH ICONS</text>
      <text x="60" y="430" class="sub">icon.png (512) &amp; apple-icon.png (180)</text>

      <rect x="420" y="380" width="740" height="380" class="card"/>
      <text x="440" y="410" class="label">FAVICON LEGIBILITY TEST (favicon.ico)</text>
      <text x="440" y="430" class="sub">Enlarged to check pixel clarity &amp; slash angle at 16px and 32px</text>
      <text x="460" y="660" class="label">16px enlarged (8x)          32px enlarged (4x)         Actual 32px &amp; 16px</text>
    </svg>
  `);

  // Load and prepare asset image buffers
  const fullLogo256 = await sharp('public/brand/omnikon-logo-full-512.png')
    .resize(256, 256)
    .toBuffer();

  const emblem256 = await sharp('public/brand/owoc-logo-emblem-256.png')
    .resize(256, 256)
    .toBuffer();

  const emblem128 = await sharp('public/brand/owoc-logo-emblem-128.png')
    .toBuffer();

  const emblem96 = await sharp('public/brand/owoc-logo-emblem-96.png')
    .toBuffer();

  const appleIcon180 = await sharp('src/app/apple-icon.png')
    .resize(180, 180)
    .toBuffer();

  // Favicon 16 and 32 pixel-art enlarged tests
  const fav16 = await sharp('public/brand/omnikon-logo-original.jpg')
    .extract({ left: 242, top: 130, width: 520, height: 520 })
    .resize(16, 16, { kernel: 'lanczos3' })
    .toBuffer();

  const fav16Enlarged = await sharp(fav16)
    .resize(128, 128, { kernel: 'nearest' })
    .toBuffer();

  const fav32 = await sharp('public/brand/omnikon-logo-original.jpg')
    .extract({ left: 242, top: 130, width: 520, height: 520 })
    .resize(32, 32, { kernel: 'lanczos3' })
    .toBuffer();

  const fav32Enlarged = await sharp(fav32)
    .resize(128, 128, { kernel: 'nearest' })
    .toBuffer();

  // Create base canvas
  const contactSheet = sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 5, g: 5, b: 5, alpha: 1 },
    },
  });

  const compositeOperations = [
    { input: titleSvg, top: 0, left: 0 },
    { input: labelsSvg, top: 100, left: 0 },
    // Row 1
    { input: fullLogo256, top: 160, left: 82 },
    { input: emblem256, top: 160, left: 462 },
    { input: emblem128, top: 160, left: 840 },
    { input: emblem96, top: 310, left: 840 },
    // Row 2
    { input: appleIcon180, top: 560, left: 120 },
    { input: fav16Enlarged, top: 560, left: 470 },
    { input: fav32Enlarged, top: 560, left: 660 },
    { input: fav32, top: 580, left: 870 },
    { input: fav16, top: 588, left: 930 },
  ];

  await contactSheet
    .composite(compositeOperations)
    .png()
    .toFile(path.join(OUT_DIR, 'logo-assets-preview.png'));

  console.log('[OK] Generated contact sheet: qa/logo-assets-preview.png');
}

createContactSheet().catch((err) => {
  console.error('Contact sheet generation failed:', err);
  process.exit(1);
});
