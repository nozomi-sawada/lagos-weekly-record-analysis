/*
 * Smoke test: drives the app end-to-end in headless Chromium.
 *
 * Covers the flow that has broken in the past:
 *   upload sample CSVs -> Start Analysis -> Geographic list ->
 *   Keyword Analysis tab -> timeline chart -> enlarged chart modal.
 *
 * Run with:  npm test
 * (CI installs the browser via `npx playwright install chromium`.
 *  To use a pre-installed browser, set CHROMIUM_PATH.)
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const PORT = 8899;

const failures = [];
function check(name, condition, detail) {
  const status = condition ? 'ok' : 'FAIL';
  console.log(`[${status}] ${name}${detail ? ' — ' + detail : ''}`);
  if (!condition) failures.push(name);
}

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.csv': 'text/csv', '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const file = path.normalize(path.join(REPO, urlPath === '/' ? 'index.html' : urlPath));
  if (!file.startsWith(REPO) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise(resolve => server.listen(PORT, resolve));

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ['--no-sandbox'],
  });
  const page = await browser.newContext({ viewport: { width: 1400, height: 900 } }).then(c => c.newPage());

  // Fail only on JavaScript exceptions; resource errors (e.g. map tiles
  // unreachable in a sandboxed network) are tolerated.
  const jsErrors = [];
  page.on('pageerror', e => jsErrors.push(e.message));

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'load' });
  check('page loads', true);
  check('PapaParse available', await page.evaluate(() => typeof window.Papa === 'object' || typeof window.Papa === 'function'));
  check('Leaflet available', await page.evaluate(() => typeof window.L === 'object'));

  // --- Upload flow ---
  await page.setInputFiles('#csv-file', path.join(REPO, 'sample_analysis.csv'));
  await page.setInputFiles('#location-csv-file', path.join(REPO, 'sample_locations.csv'));
  await page.waitForSelector('#start-analysis-container', { state: 'visible', timeout: 20000 });
  check('Start Analysis appears after both uploads', true);
  await page.click('#start-analysis-container button');

  // --- Geographic tab ---
  await page.waitForSelector('#loading', { state: 'hidden', timeout: 30000 });
  await page.waitForSelector('.location-item', { timeout: 30000 });
  const locationCount = await page.locator('.location-item').count();
  check('geographic location list populated', locationCount > 0, `${locationCount} locations`);

  // --- Keyword tab (default keyword is auto-analyzed) ---
  await page.click('.nav-tab:nth-child(2)');
  await page.waitForSelector('#timeline-chart .year-bar', { timeout: 15000 });
  const barCount = await page.locator('#timeline-chart .year-bar').count();
  check('timeline chart has bars', barCount > 0, `${barCount} bars`);

  const sidebarOverflow = await page.evaluate(() => {
    const c = document.querySelector('#timeline-chart');
    return c.scrollWidth - c.clientWidth;
  });
  check('sidebar chart has no horizontal overflow', sidebarOverflow <= 0, `overflow=${sidebarOverflow}px`);

  const tickLabels = await page.locator('#timeline-chart .year-label').count();
  check('year tick labels present', tickLabels > 0, `${tickLabels} labels`);

  // --- Enlarged chart modal ---
  await page.click('#timeline-chart');
  await page.waitForSelector('#chart-modal', { state: 'visible' });
  const modalCheck = await page.evaluate(() => {
    const chart = document.getElementById('enlarged-chart');
    const label = document.querySelector('.enlarged-year-label');
    const chartRect = chart.getBoundingClientRect();
    const labelRect = label ? label.getBoundingClientRect() : null;
    return {
      bars: document.querySelectorAll('.enlarged-year-bar').length,
      labelVisible: labelRect ? labelRect.bottom <= chartRect.bottom && labelRect.top >= chartRect.top : false,
    };
  });
  check('enlarged chart has bars', modalCheck.bars > 0, `${modalCheck.bars} bars`);
  check('enlarged year labels visible inside chart', modalCheck.labelVisible);

  await page.keyboard.press('Escape');
  check('Escape closes the modal', await page.locator('#chart-modal').isHidden());

  // --- Language switch does not throw ---
  await page.click('.lang-btn[data-lang="ja"]');
  const jaTab = await page.locator('.nav-tab').first().textContent();
  check('language switch to Japanese works', jaTab.trim() === '地理的分析', `tab="${jaTab.trim()}"`);

  check('no JavaScript errors during the whole flow', jsErrors.length === 0, jsErrors.join(' | '));

  await browser.close();
  server.close();

  if (failures.length > 0) {
    console.error(`\n${failures.length} check(s) failed: ${failures.join(', ')}`);
    process.exit(1);
  }
  console.log('\nAll smoke checks passed.');
})().catch(e => {
  console.error(e);
  process.exit(1);
});
