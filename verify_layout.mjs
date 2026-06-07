import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('c:\\vamsi\\Build_CV\\screenshots', { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });

  // Go straight to the preview step with pre-filled data by simulating the flow fast
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Step 1: select template
  await page.locator('text=Minimalist').first().click();
  await page.locator('button', { hasText: /Use.*Template/i }).click();
  await page.waitForTimeout(400);

  // Fill minimal personal info to get a real preview
  await page.locator('input[placeholder="Alex Johnson"]').fill('Vamsi Krishna');
  await page.locator('input[type="email"]').fill('vamsi@example.com');
  await page.locator('input[placeholder="+1 (555) 123-4567"]').fill('+91 98765 43210');
  await page.locator('input[placeholder="San Francisco, CA"]').fill('Hyderabad, India');
  await page.locator('textarea').fill('Full Stack Developer with 5+ years building scalable React and Node.js applications. Delivered 10+ production features with 99.9% uptime. Increased user engagement by 45%.');
  await page.waitForTimeout(300);

  // Skills tab
  await page.locator('button', { hasText: 'Skills' }).click();
  const si = page.locator('input[placeholder="React, Python, AWS..."]');
  for (const skill of ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL']) {
    await si.first().fill(skill);
    await page.keyboard.press('Enter');
  }
  await page.waitForTimeout(200);

  // Jump to certifications → Preview & Analyze
  await page.locator('button', { hasText: 'Certifications' }).click();
  await page.waitForTimeout(200);
  await page.locator('button', { hasText: /Preview & Analyze/ }).click();
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'c:\\vamsi\\Build_CV\\screenshots\\layout_fixed.png', fullPage: false });
  console.log('Screenshot saved: layout_fixed.png');

  await browser.close();
})();
