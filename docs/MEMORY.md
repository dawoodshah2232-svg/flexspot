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

## In progress
- AdSense review — "Getting ready"; nothing to do until Google decides.
- Production env verification (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PIN`) — unconfirmed.

## Next
- AdSense approval → respond to any required fixes.
- Confirm boost pricing/payment provider and reserve/auction economics (currently TODO, not in repo).
- Typography decision: Bricolage Grotesk + Inter (current) vs owner Apple font stack (standing rule).
- Keep blog quality bar (no fabricated stats/earnings promises).
- Next agents: read `docs/` first; update TASKS.md/MEMORY.md as work completes.
