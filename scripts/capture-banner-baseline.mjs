import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(process.cwd(), 'qa/banner-before');
fs.mkdirSync(OUT_DIR, { recursive: true });

const SIZES = [
  { label: '1440px', width: 1440, height: 900 },
  { label: '390px', width: 390, height: 844 },
];

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const s of SIZES) {
    const context = await browser.newContext({
      viewport: { width: s.width, height: s.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Full page screenshot
    await page.screenshot({
      path: path.join(OUT_DIR, `home_full_${s.label}.png`),
      fullPage: true,
    });

    // Viewport around Notice & FAQ
    const faq = page.locator('section:has-text("Frequently Asked Questions")');
    if (await faq.count() > 0) {
      await faq.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(OUT_DIR, `home_insertion_area_${s.label}.png`),
      });
    }

    await context.close();
    console.log(`[OK] Captured banner baseline screenshots for ${s.label}`);
  }

  await browser.close();
  console.log('All banner baseline screenshots saved in:', OUT_DIR);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
