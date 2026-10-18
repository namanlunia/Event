import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(process.cwd(), 'qa/nav-before');
fs.mkdirSync(OUT_DIR, { recursive: true });

const WIDTHS = [
  { label: '1920', width: 1920, height: 1080 },
  { label: '1440', width: 1440, height: 900 },
  { label: '1100', width: 1100, height: 800 },
  { label: '768', width: 768, height: 1024 },
  { label: '390', width: 390, height: 844 },
];

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const w of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width: w.width, height: w.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // 1. Home Top
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `home_top_${w.label}px.png`) });

    // 2. Home Footer
    const footer = page.locator('footer');
    if (await footer.count() > 0) {
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await footer.screenshot({ path: path.join(OUT_DIR, `home_footer_${w.label}px.png`) });
    }

    // 3. Content Page (Projects)
    await page.goto('http://localhost:3000/projects', { waitUntil: 'load' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `projects_${w.label}px.png`), fullPage: false });

    // 4. Dashboard Page (Contributor)
    await page.goto('http://localhost:3000/dashboard/contributor', { waitUntil: 'load' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `dashboard_${w.label}px.png`), fullPage: false });

    await context.close();
    console.log(`[OK] Captured screenshots for width ${w.label}px`);
  }

  await browser.close();
  console.log('All baseline screenshots captured in', OUT_DIR);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
