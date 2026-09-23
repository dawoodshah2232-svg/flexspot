// scripts/generate-sitemap.mjs
// Build-time sitemap (+ robots.txt) generator for FlexSpot.
// Runs automatically on every build via the "prebuild" npm script, so
// newly added routes and blog posts appear with zero manual steps.
//
// Sources:
//   1. Static routes parsed from src/App.jsx (<Route path="...">)
//      - dynamic (:param), wildcard (*) and /admin are excluded
//      - /explore/:category is expanded from CATEGORIES in src/lib/data.js
//   2. Spot profile pages parsed from DEMO_SPOTS in src/lib/data.js (/s/:slug)
//   3. Blog posts scanned from src/content/blog/*.md frontmatter
//      - posts with `sample: true` are EXCLUDED
//      - slug = filename (per blog-engine convention), lastmod = post date
//
// Canonical URL convention: VITE_SITE_URL at build time (required). When it
// is unset the script exits without writing, so local builds never clobber
// the committed sitemap/robots.txt with a fallback domain.
// Do NOT hardcode a different domain here.

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Only write when the canonical site URL is explicitly provided. A local
// `npm run build` (no env) must NOT rewrite the committed sitemap/robots.txt
// with the fallback domain — that dirties the diff on every local build.
const ENV_SITE_URL = (process.env.VITE_SITE_URL || process.env.VITE_APP_URL || '').replace(/\/+$/, '');
if (!ENV_SITE_URL) {
  console.log('[sitemap] VITE_SITE_URL not set — skipping sitemap/robots.txt rewrite (committed files left untouched).');
  process.exit(0);
}
const SITE_URL = ENV_SITE_URL;
const TODAY = new Date().toISOString().slice(0, 10);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------------------------------------------- routes
const appJsx = readFileSync(join(root, 'src', 'App.jsx'), 'utf8');
const routePaths = [...appJsx.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);

const dataJs = readFileSync(join(root, 'src', 'lib', 'data.js'), 'utf8');
// Category slugs come ONLY from the CATEGORIES array block. A naive
// /\{ slug: '…', name:/ regex also matches the BADGES array (badges render
// the 404 page under /explore/<badge>), feeding search engines soft-404s.
const categoriesBlock = (dataJs.match(/export const CATEGORIES = \[([\s\S]*?)\];/) || [])[1] || '';
const categorySlugs = [...categoriesBlock.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1]);
// Spot slugs come ONLY from the DEMO_SPOTS array block — never from BADGES
// or any other slug-bearing array in data.js.
const spotsBlock = (dataJs.match(/export const DEMO_SPOTS = \[([\s\S]*?)\];/) || [])[1] || '';
const spotSlugs = [...new Set([...spotsBlock.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1]))];

// changefreq/priority defaults per static route (tuned for a live leaderboard)
const ROUTE_META = {
  '/':            ['hourly', '1.0'],
  '/leaderboard':['hourly', '0.9'],
  '/trending':   ['hourly', '0.8'],
  '/rising':     ['hourly', '0.8'],
  '/winners':    ['daily',  '0.8'],
  '/new':        ['daily',  '0.7'],
  '/explore':    ['daily',  '0.7'],
  '/how-it-works':['weekly','0.7'],
  '/rewards':    ['daily',  '0.7'],
  '/compare':    ['daily',  '0.7'],
  '/calculator': ['daily',  '0.7'],
  '/top-referrers':['daily','0.6'],
  '/faq':        ['weekly', '0.6'],
  '/claim':      ['weekly', '0.6'],
  '/privacy':    ['monthly','0.3'],
  '/terms':      ['monthly','0.3'],
  '/disclaimers':['monthly','0.3'],
};

const urls = new Map(); // path -> [lastmod, changefreq, priority]
const add = (path, lastmod, cf, pr) => { if (!urls.has(path)) urls.set(path, [lastmod, cf, pr]); };

for (const p of routePaths) {
  // dynamic, wildcard, admin, and the login-walled member dashboard are excluded
  if (p.includes(':') || p.includes('*') || p === '/admin' || p === '/dashboard') continue;
  const [cf, pr] = ROUTE_META[p] || ['weekly', '0.5'];
  add(p, TODAY, cf, pr);
}
// Expand category landing pages
for (const slug of categorySlugs) add(`/explore/${slug}`, TODAY, 'daily', '0.6');
// Spot profile pages
for (const slug of spotSlugs) add(`/s/${slug}`, TODAY, 'daily', '0.8');

// ---------------------------------------------------------------- blog posts
const blogDir = join(root, 'src', 'content', 'blog');
const blogPosts = [];
if (existsSync(blogDir)) {
  for (const file of readdirSync(blogDir).filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')) {
    const slug = file.replace(/\.md$/, '');
    const raw = readFileSync(join(blogDir, file), 'utf8');
    const fm = (raw.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
    const get = (k) => (fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm')) || [])[1]?.trim().replace(/^['"]|['"]$/g, '');
    if (!get('title')) continue; // not a post (e.g. README.md)
    if (/^true$/i.test(get('sample') || '')) continue; // sample posts stay out of the sitemap
    const date = get('date');
    const lastmod = date && /^\d{4}-\d{2}-\d{2}/.test(date) ? date.slice(0, 10) : TODAY;
    blogPosts.push([`/blog/${slug}`, lastmod, 'monthly', '0.7']);
  }
  if (blogPosts.length) {
    add('/blog', TODAY, 'weekly', '0.7');
    for (const [p, lm, cf, pr] of blogPosts) add(p, lm, cf, pr);
  }
}

// ---------------------------------------------------------------- write files
const entries = [...urls.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([p, [lm, cf, pr]]) =>
    `  <url><loc>${esc(SITE_URL + p)}</loc><lastmod>${lm}</lastmod><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`)
  .join('\n');

writeFileSync(
  join(root, 'public', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
);

writeFileSync(
  join(root, 'public', 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

console.log(`[sitemap] ${urls.size} URLs -> public/sitemap.xml (${SITE_URL})`);
console.log(`[sitemap] robots.txt -> Sitemap: ${SITE_URL}/sitemap.xml`);
