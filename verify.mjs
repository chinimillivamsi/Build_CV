import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

const SS_DIR = 'c:\\vamsi\\Build_CV\\screenshots';
mkdirSync(SS_DIR, { recursive: true });

const ss = (page, name) => page.screenshot({ path: `${SS_DIR}\\${name}.png`, fullPage: false });

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();
  page.setViewportSize({ width: 1400, height: 900 });

  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));

  console.log('\n=== STEP 1: Load Template Gallery ===');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const title = await page.title();
  console.log(`Page title: ${title}`);

  // Check all 3 templates are visible
  const templateCards = await page.locator('text=Minimalist, text=Creative, text=Corporate').all();
  const minimalist = await page.locator('text=Minimalist').first().isVisible();
  const creative   = await page.locator('text=Creative').first().isVisible();
  const corporate  = await page.locator('text=Corporate').first().isVisible();
  console.log(`Templates visible — Minimalist: ${minimalist}, Creative: ${creative}, Corporate: ${corporate}`);
  await ss(page, '1_template_gallery');

  console.log('\n=== STEP 2: Select Minimalist & click Use Template ===');
  await page.locator('text=Minimalist').first().click();
  await page.waitForTimeout(400);
  const useBtn = page.locator('button', { hasText: /Use.*Template/i });
  const useBtnText = await useBtn.innerText();
  console.log(`Use button text: "${useBtnText.trim()}"`);
  await ss(page, '2_template_selected');
  await useBtn.click();
  await page.waitForTimeout(600);

  console.log('\n=== STEP 3: Verify Form (Step 2) ===');
  const formHeading = await page.locator('text=Build Your Resume').isVisible();
  console.log(`Form heading visible: ${formHeading}`);

  const tabs = ['Personal Info', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications'];
  for (const tab of tabs) {
    const visible = await page.locator(`text=${tab}`).first().isVisible();
    console.log(`  Tab "${tab}": ${visible ? '✅' : '❌'}`);
  }
  await ss(page, '3_form_personal_tab');

  console.log('\n=== STEP 4: Fill Personal Info & check live preview ===');
  await page.locator('input[placeholder="Alex Johnson"]').fill('Jane Smith');
  await page.locator('input[type="email"]').fill('jane@example.com');
  await page.locator('input[placeholder="+1 (555) 123-4567"]').fill('+1 (555) 987-6543');
  await page.locator('input[placeholder="San Francisco, CA"]').fill('New York, NY');
  await page.locator('textarea').fill('Senior Product Manager with 8+ years experience driving 0-to-1 products. Led teams of 12 engineers to ship features used by 5M+ users. Increased retention by 35%.');
  await page.waitForTimeout(800);
  await ss(page, '4_form_filled_with_preview');

  // Check live preview shows the name
  const previewHasName = await page.locator('#resume-live').filter({ hasText: 'Jane Smith' }).isVisible().catch(() => false);
  console.log(`Live preview reflects name "Jane Smith": ${previewHasName ? '✅' : '⚠️ (may be scaled/hidden on this viewport)'}`);

  console.log('\n=== STEP 5: Fill Experience tab ===');
  await page.locator('button', { hasText: 'Experience' }).click();
  await page.waitForTimeout(400);
  await page.locator('input[placeholder="Senior Engineer"]').fill('Senior Product Manager');
  await page.locator('input[placeholder="TechCorp Inc."]').fill('Acme Corp');
  await page.locator('input[placeholder="Jan 2021"]').fill('Mar 2019');
  await page.locator('label', { hasText: 'Current role' }).click();
  await page.locator('textarea').fill('- Launched 3 major product features\n- Reduced churn by 28%\n- Managed cross-functional team of 12');
  await page.waitForTimeout(400);
  await ss(page, '5_experience_tab');

  console.log('\n=== STEP 6: Fill Skills tab ===');
  await page.locator('button', { hasText: 'Skills' }).click();
  await page.waitForTimeout(300);
  const skillInputs = page.locator('input[placeholder="React, Python, AWS..."]');
  if (await skillInputs.count() > 0) {
    await skillInputs.first().fill('Product Strategy');
    await page.keyboard.press('Enter');
    await skillInputs.first().fill('Agile');
    await page.keyboard.press('Enter');
    await skillInputs.first().fill('Data Analysis');
    await page.keyboard.press('Enter');
  }
  await ss(page, '6_skills_tab');

  console.log('\n=== STEP 7: Navigate to Preview & Analyze (Step 3) ===');
  // Click through remaining tabs: skills → projects → certifications → Preview & Analyze
  // Currently on Skills tab (index 3). Need to advance through Projects, Certifications, then final step.
  for (let i = 0; i < 2; i++) {
    await page.locator('button', { hasText: /Next →/ }).click();
    await page.waitForTimeout(400);
  }
  // Final tab button says "Preview & Analyze →"
  await page.locator('button', { hasText: /Preview & Analyze/ }).click();
  await page.waitForTimeout(800);
  await ss(page, '7_step3_preview_analyze');

  const previewSection  = await page.locator('text=Resume Preview').isVisible();
  const atsPanel        = await page.locator('text=ATS Score').isVisible();
  const suggestionsPanel= await page.locator('text=Improvement Suggestions').isVisible().catch(() =>
                          page.locator('text=Improvement').isVisible());
  const exportPanel     = await page.locator('text=Export Resume').isVisible();

  console.log(`Resume Preview visible: ${previewSection ? '✅' : '❌'}`);
  console.log(`ATS Score panel visible: ${atsPanel ? '✅' : '❌'}`);
  console.log(`Suggestions panel visible: ${suggestionsPanel ? '✅' : '❌'}`);
  console.log(`Export options visible: ${exportPanel ? '✅' : '❌'}`);

  // Get the ATS score number
  try {
    const scoreEl = page.locator('.score-circle-fill').first();
    const scoreText = await page.locator('text=/^\\d+$/').first().innerText().catch(() => 'N/A');
    console.log(`ATS Score displayed: ${scoreText}`);
  } catch {}

  await ss(page, '8_final_state');

  console.log('\n=== STEP 8: Test Creative template via Change Template ===');
  await page.locator('button', { hasText: 'Change Template' }).click();
  await page.waitForTimeout(500);
  await page.locator('text=Creative').first().click();
  await page.waitForTimeout(300);
  const useCreative = page.locator('button', { hasText: /Use.*Template/i });
  await useCreative.click();
  await page.waitForTimeout(600);
  // Now on form step — navigate straight to the last tab and preview
  // Go to certifications tab directly and hit Preview
  await page.locator('button', { hasText: 'Certifications' }).click();
  await page.waitForTimeout(300);
  await page.locator('button', { hasText: /Preview & Analyze/ }).click();
  await page.waitForTimeout(800);
  await ss(page, '9_creative_template_preview');

  console.log('\n=== Console errors collected ===');
  if (errors.length === 0) {
    console.log('No console errors ✅');
  } else {
    console.log('Console errors found:');
    errors.forEach(e => console.log('  ❌', e));
  }

  console.log('\nScreenshots saved to:', SS_DIR);
  await browser.close();
})();
