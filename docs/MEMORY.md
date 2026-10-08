# MEMORY — FlexSpot progress log

Updated 2026-10-08. Source: git log on `main` (latest: `20b0e50` "blog: election ad flood …") + repo inspection.

## Done
- **SEO infrastructure complete:** 10-tool audit sweep merged (`seo/10-tools-sweep`) — 41 pages prerendered via `scripts/prerender-seo.mjs`, canonical tags, one H1/page, JSON-LD, noindex headers for `/admin` and `/dashboard` (`4271ab2`, `2596976`).
- **Live spot sitemap:** `/sitemap-spots.xml` served from Vercel KV via `api/spots-sitemap.js` (`66b5453`, `b20c2ec`, `62f5b55`); homepage structured data corrected (`9989fb8`).
- **Indexing:** IndexNow key file live for instant Bing indexing (`75b1f8a`); `sitemap.xml` generated at prebuild.
- **AEO:** key takeaways on all 109 blog posts, `dateModified` in BlogPosting JSON-LD, `llms.txt` with payment-network accuracy (`7d0ec02`).
- **AdSense:** verification snippet installed; CSP in `vercel.json` allowlists ad scripts/frames (was blocking ads) (`18b27e8`, `a286368`). Status: "Getting ready".
- **Mobile bug fixed:** brand names invisible on mobile because `.btn-primary`'s `display:inline-flex` beat Tailwind `hidden` (`1e7cc81`); breakpoint-scoped override rule added in `index.css`.
- **QA/compliance:** honeypot spam traps, image compression, About CTA (`96f3b1c`).
- **Content:** 117 blog posts in `src/content/blog/` (latest batch: ad-tech / election-spend playbooks, `9e1bc7d`, `20b0e50`).
- **Reliability:** route-level code splitting with `lazyRetry` (stale-chunk auto-reload), `ErrorBoundary` reload card, throwing localStorage writes for claim submissions.
- **Crons:** `/api/cron/weekly-digest` (Mon 09:00 UTC), `/api/cron/reserve-sweep` (daily 08:00 UTC).
- **AI context docs:** `docs/` (PRD/ARCHITECTURE/RULES/DESIGN/TASKS/MEMORY) added 2026-10-08 — read before writing code; keep TASKS/MEMORY current.
- **20-fix SEO sweep (2026-10-08):** full audit then fixes, all verified with a production build + prerender:
  - Crawlability: sitemap.xml valid (174 URLs, no dupes, noindexed routes excluded, all blog files exist); fixed `generate-sitemap.mjs` which rewrote robots.txt on Vercel builds WITHOUT the `/sitemap-spots.xml` line (it would have dropped the live spots sitemap from robots); robots.txt has both sitemaps.
  - Canonicals: fixed `vite.config.js` fallback default `https://flexspot.lol` → `https://www.flexspot.lol` (bare domain disagreed with every canonical/OG/JSON-LD URL on the site); %VITE_SITE_URL% placeholders always resolved.
  - On-page: all 23 static titles unique and ≤60 chars (trimmed /dashboard 61→58); all descriptions in 120–160 (trimmed /about 161→154); every public page renders exactly one H1 (ClaimPage's 6 H1s are mutually-exclusive form states — verified); alt text on every meaningful `<img>` (decorative ones correctly `alt=""`); fixed logo-preview `alt=""` on ClaimPage → "Logo preview".
  - Schema: BreadcrumbList JSON-LD now on EVERY inner page — client-side via `pageMeta.js` `withBreadcrumb()` (appends, never replaces existing FAQ/BlogPosting data) and in the prerendered static HTML for routes + blog articles (which previously had none).
  - OG: prerendered route/article pages now ship og:image (+2192×1152 dims for og-cover), Twitter summary_large_image tags, canonical — no longer reliant on JS for scrapers.
  - Performance: `public/hero-king.jpg` (189KB) → `hero-king.webp` (103KB, 960w); Google Fonts now non-blocking (preload + media-print swap, display=swap kept).
  - Mobile/a11y: `overflow-x: clip` + 16px input floor + `.touch-44`/`min-h-[44px]` already in place; added `:focus-visible` 3px outline site-wide. Viewport, manifest icons, noscript nav all verified.
  - Trust: zero `http://` (non-schema.org) asset/link references in src/public/blog; GSC verification file live; owner GSC-UI actions (sitemap submit, request indexing) filed as TASKS.md TODOs.
  - Growth: backlink strategy note in TASKS.md (earn via content/directories only — never buy/spam); no rankings/traffic promises made.
  - Left as-is (verified compliant already): 22 blog frontmatter descriptions >160 chars — the build pipeline clips served meta to ≤160 (prerender build-guard fails the build otherwise), so output is correct; not rewritten to avoid churn.

## In progress
- AdSense review — "Getting ready"; nothing to do until Google decides.
- Production env verification (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PIN`) — unconfirmed.

## Next
- AdSense approval → respond to any required fixes.
- Confirm boost pricing/payment provider and reserve/auction economics (currently TODO, not in repo).
- Typography decision: Bricolage Grotesk + Inter (current) vs owner Apple font stack (standing rule).
- Keep blog quality bar (no fabricated stats/earnings promises).
- Next agents: read `docs/` first; update TASKS.md/MEMORY.md as work completes.
