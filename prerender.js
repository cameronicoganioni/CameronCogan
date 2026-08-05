const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const http = require('http');

// Direct distribution path (multi-project/i18n logic removed)
const DIST_DIR = path.join(__dirname, 'dist/Cameronsite/browser');
const ROUTES_FILE = path.join(__dirname, 'src/routes.txt');

// MIME types for the local server
const MIME_TYPES = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml'
};

async function runPrerender() {
  // Clean route parsing:
  // - skip empty lines
  // - skip comments starting with #
  // - take only the path before any " - description"
  const routes = fs.readFileSync(ROUTES_FILE, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split(/\s+[-–—]\s+/)[0].trim())
    .filter(Boolean);

  if (routes.length === 0) {
    console.error('❌ No valid routes found in', ROUTES_FILE);
    process.exit(1);
  }

  console.log('Routes to prerender:', routes);

  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
  const PORT = 4210;

  const server = http.createServer((req, res) => {
    const reqPath = req.url.split('?')[0];
    let filePath = path.join(DIST_DIR, reqPath);

    // Try fallback to basename if nested asset directory path isn't found directly
    if (path.extname(reqPath) && !fs.existsSync(filePath)) {
      filePath = path.join(DIST_DIR, path.basename(reqPath));
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      return fs.createReadStream(filePath).pipe(res);
    }

    // Return proper 404 for missing static asset files instead of serving SPA index.html
    if (path.extname(reqPath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    // SPA fallback for HTML routes
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
  });

  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`\n🚀 Local server running on http://localhost:${PORT}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  // Enable request interception to block fonts and non-local requests
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    const url = req.url();

    if (
      resourceType === 'font' ||
      url.endsWith('.woff') ||
      url.endsWith('.woff2') ||
      url.endsWith('.ttf')
    ) {
      return req.abort();
    } else if (!url.startsWith(`http://localhost:${PORT}`)) {
      return req.abort();
    } else {
      req.continue();
    }
  });

  // Console logging for debugging (ignore blocked resource noise)
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('net::ERR_FAILED')) return;
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[BROWSER ${msg.type().toUpperCase()}]: ${text}`);
    }
  });

  page.on('pageerror', err => {
    console.error(`[PAGE ERROR]: ${err.message}`);
  });

  const results = [];

  for (const route of routes) {
    const targetUrl = `http://localhost:${PORT}${route}`;
    console.log(`\n────────────────────────────────────────`);
    console.log(`Capturing: ${route}`);
    console.log(`URL: ${targetUrl}`);

    try {
      // 1. Wait for network requests to settle
      await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });

      // 2. Wait for Angular stability + real content + splash screen gone
      await page.waitForFunction(
        () => {
          const isStable = window.getAllAngularTestabilities
            ? window.getAllAngularTestabilities().every(t => t.isStable())
            : true;

          const appRoot = document.querySelector('app-root');
          const hasContent = appRoot && appRoot.children.length > 0;

          // Splash screen must be gone (or at least not covering the page)
          const splash = document.querySelector('app-splash-screen');
          const splashGone = !splash ||
            splash.children.length === 0 ||
            getComputedStyle(splash).display === 'none' ||
            getComputedStyle(splash).visibility === 'hidden' ||
            getComputedStyle(splash).opacity === '0';

          return isStable && hasContent && splashGone;
        },
        { timeout: 25000 }
      );

      // Small extra delay for any final animations / removals
      await new Promise(resolve => setTimeout(resolve, 600));

      // 3. Extract final HTML and strip splash as a safety net
      let html = await page.content();
      // After stripping the splash screen
      html = html.replace(/<app-splash-screen[\s\S]*?<\/app-splash-screen>/gi, '');
      // Optional: hide cookie banner so it doesn't appear in the static snapshot
      html = html.replace(
        /id="cookie-banner"[^>]*class="([^"]*)"/,
        'id="cookie-banner" class="$1 hidden"'
      );
      // or more aggressively remove it:
      // html = html.replace(/<div[^>]*id="cookie-banner"[\s\S]*?<\/div>\s*(?=<footer|<\/app-home)/i, '');

      // ─── Verification checks ───────────────────────────────────
      const checks = {
        hasAppRoot: html.includes('<app-root'),
        hasAboutSection: html.includes('id="about"') || html.includes("id='about'"),
        hasProjectsSection: html.includes('id="projects"') || html.includes("id='projects'"),
        hasServicesSection: html.includes('id="services"') || html.includes("id='services'"),
        hasExperienceSection: html.includes('id="experience"') || html.includes("id='experience'"),
        hasContactSection: html.includes('id="contact"') || html.includes("id='contact'"),
        hasRealContent: html.length > 15000,
        noSplash: !html.includes('app-splash-screen')
      };

      // Get a short preview of the actual rendered text for debugging
      const textPreview = await page.evaluate(() => {
        const root = document.querySelector('app-root');
        return root ? root.innerText.slice(0, 300).replace(/\s+/g, ' ').trim() : 'NO APP-ROOT';
      });

      const allPassed = Object.values(checks).every(Boolean);

      console.log(`\n📊 Verification for ${route}:`);
      console.log(`   HTML length        : ${html.length.toLocaleString()} chars`);
      console.log(`   has <app-root>     : ${checks.hasAppRoot ? '✅' : '❌'}`);
      console.log(`   has #about         : ${checks.hasAboutSection ? '✅' : '❌'}`);
      console.log(`   has #projects      : ${checks.hasProjectsSection ? '✅' : '❌'}`);
      console.log(`   has #services      : ${checks.hasServicesSection ? '✅' : '❌'}`);
      console.log(`   has #experience    : ${checks.hasExperienceSection ? '✅' : '❌'}`);
      console.log(`   has #contact       : ${checks.hasContactSection ? '✅' : '❌'}`);
      console.log(`   substantial size   : ${checks.hasRealContent ? '✅' : '❌'}`);
      console.log(`   splash removed     : ${checks.noSplash ? '✅' : '❌'}`);
      console.log(`   Text preview       : "${textPreview}..."`);

      if (!allPassed) {
        console.error(`\n❌ FAILED verification for ${route}`);
        results.push({ route, success: false, reason: 'Content verification failed' });
        continue;
      }

      // 4. Write the file
      const targetDir = route === '/' ? DIST_DIR : path.join(DIST_DIR, route);
      await fs.ensureDir(targetDir);
      const outputPath = path.join(targetDir, 'index.html');
      await fs.writeFile(outputPath, html);

      console.log(`\n✅ SUCCESS – Saved: ${outputPath}`);
      results.push({ route, success: true, size: html.length });

    } catch (err) {
      console.error(`\n❌ FAILED to capture route ${route}`);
      console.error(`   Error: ${err.message}`);
      results.push({ route, success: false, reason: err.message });
    }
  }

  await browser.close();
  server.close();

  // ─── Final summary ───────────────────────────────────────────
  console.log(`\n\n════════════════════════════════════════`);
  console.log(`PRERENDER SUMMARY`);
  console.log(`════════════════════════════════════════`);

  const successes = results.filter(r => r.success);
  const failures = results.filter(r => !r.success);

  console.log(`\n✅ Successful (${successes.length}):`);
  successes.forEach(r => {
    console.log(`   ${r.route.padEnd(20)} ${r.size?.toLocaleString()} chars`);
  });

  if (failures.length > 0) {
    console.log(`\n❌ Failed (${failures.length}):`);
    failures.forEach(r => {
      console.log(`   ${r.route.padEnd(20)} → ${r.reason}`);
    });
    console.log(`\n💥 Prerender finished with errors.\n`);
    process.exit(1);
  } else {
    console.log(`\n🎉 All routes prerendered successfully!\n`);
  }
}

runPrerender().catch(err => {
  console.error(err);
  process.exit(1);
});