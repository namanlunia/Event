import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(process.cwd(), 'qa/logo-after');
fs.mkdirSync(OUT_DIR, { recursive: true });

const SIZES = [
  { label: '1440px', width: 1440, height: 900 },
  { label: '390px', width: 390, height: 844 },
];

const NAV_CHECK_WIDTHS = [1920, 1440, 1180, 768, 390];

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Capture primary comparison screenshots
  for (const size of SIZES) {
    const context = await browser.newContext({
      viewport: { width: size.width, height: size.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // Home Top
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `home_top_${size.label}.png`) });

    // Footer
    const footer = page.locator('footer');
    if (await footer.count() > 0) {
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await footer.screenshot({ path: path.join(OUT_DIR, `footer_${size.label}.png`) });
    }

    // Dashboard
    await page.goto('http://localhost:3000/dashboard/contributor', { waitUntil: 'load' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `dashboard_${size.label}.png`) });

    // Mobile Menu
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    await page.waitForTimeout(400);
    const menuBtn = page.locator('header button[aria-label="Toggle menu"]');
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(OUT_DIR, `mobile_menu_${size.label}.png`) });
    }

    await context.close();
    console.log(`[OK] Captured logo-after screenshots for ${size.label}`);
  }

  // 2. Navbar check across 1920, 1440, 1180, 768, 390
  for (const w of NAV_CHECK_WIDTHS) {
    const context = await browser.newContext({
      viewport: { width: w, height: 800 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    await page.waitForTimeout(400);

    const header = page.locator('header');
    await header.screenshot({ path: path.join(OUT_DIR, `navbar_${w}px.png`) });
    await context.close();
    console.log(`[OK] Captured navbar check for ${w}px`);
  }

  await browser.close();
  console.log('All logo-after screenshots saved in:', OUT_DIR);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
