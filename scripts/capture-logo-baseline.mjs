import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(process.cwd(), 'qa/logo-before');
fs.mkdirSync(OUT_DIR, { recursive: true });

const SIZES = [
  { label: '1440px', width: 1440, height: 900 },
  { label: '390px', width: 390, height: 844 },
];

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const size of SIZES) {
    const context = await browser.newContext({
      viewport: { width: size.width, height: size.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // 1. Home Top
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `home_top_${size.label}.png`) });

    // 2. Footer
    const footer = page.locator('footer');
    if (await footer.count() > 0) {
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await footer.screenshot({ path: path.join(OUT_DIR, `footer_${size.label}.png`) });
    }

    // 3. Dashboard Page
    await page.goto('http://localhost:3000/dashboard/contributor', { waitUntil: 'load' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `dashboard_${size.label}.png`) });

    // 4. Mobile Menu Drawer (especially at 390px)
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    await page.waitForTimeout(400);
    const menuBtn = page.locator('header button[aria-label="Toggle menu"]');
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(OUT_DIR, `mobile_menu_${size.label}.png`) });
    }

    await context.close();
    console.log(`[OK] Captured logo baseline screenshots for ${size.label}`);
  }

  await browser.close();
  console.log('All logo baseline screenshots saved in:', OUT_DIR);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
