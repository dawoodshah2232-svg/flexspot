# TASKS — FlexSpot

Sequenced tasks derived from repo state + recent git log. Small steps; unknowns are TODO, not guesses.

## In progress
- [ ] AdSense approval — account shows "Getting ready"; verification snippet + CSP allowlist already live (`18b27e8`, `a286368`). NEXT: wait for Google's decision; do not re-submit.
- [ ] Verify production env vars on Vercel: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PIN` (admin functions degrade without them — `IS_LIVE` flag in `src/lib/store.js`). TODO: confirm with owner before touching envs.
- [ ] Google Search Console (owner actions in the GSC UI — repo side is done: verification file `public/google2e9a100400119f3a.html` live, sitemap + spots-sitemap referenced in robots.txt): submit `https://www.flexspot.lol/sitemap.xml` and `/sitemap-spots.xml` under Sitemaps, then "Request indexing" on the homepage + a few key pages (/leaderboard, /claim, /blog). Never ask the owner to do repo-side work for this.

## Backlink strategy (content-earned only — never buy, never spam)
- Earn links by publishing link-worthy assets on the blog (original data from the live leaderboard, "state of brand attention" roundups, the visibility calculator as an embeddable tool).
- Pitch the leaderboard itself to startup directories/communities where a public ranking is genuinely useful; no link farms, no paid placements, no comment spam.
- Monitor new referring domains; disavow only if a clear spam attack appears (owner decision).
- Never promise rankings, traffic, or AdSense approval from any of this.

## Next
- [ ] Confirm boost pricing / payment provider details (currently TODO — do not invent).
- [ ] Confirm reserve + auction economics details (currently TODO).
- [ ] Decide on typography: repo uses Bricolage Grotesk + Inter (Google Fonts); owner standard is the Apple font stack. TODO: owner decision before any migration.
- [ ] Keep blog cadence consistent with the 117-post archive (no earnings promises, no fabricated stats — per standing blog rules).
- [ ] Resolve Tailwind legacy dark tokens (`electric`/`neon` in tailwind.config.js) vs the light-first CSS-var system; new UI uses CSS vars only (ongoing).
- [ ] Watch Vercel deploy health after pushes; rerun `scripts/prerender-seo.mjs` output if SEO pages change.

## Done (recent, from git log)
- [x] 10-tool SEO sweep merged: 41 prerendered pages, canonical/H1/JSON-LD, Vercel noindex headers (`4271ab2`, `2596976`).
- [x] Live spot sitemap from KV (`66b5453`, `b20c2ec`, `62f5b55`) + homepage structured data fix (`9989fb8`).
- [x] IndexNow key file for instant Bing indexing (`75b1f8a`).
- [x] AEO: key takeaways on all 109 blog posts, `dateModified` in BlogPosting JSON-LD, `llms.txt` (`7d0ec02`).
- [x] AdSense verification snippet + CSP allowlist for ad scripts/frames (`18b27e8`, `a286368`).
- [x] Brand-name invisible-on-mobile bug fixed (`.btn-primary` display override) (`1e7cc81`).
- [x] QA/compliance pass: honeypot spam traps, image compression, About CTA (`96f3b1c`).
- [x] Route-level code splitting (all pages lazy via `lazyRetry`) with stale-chunk reload.
- [x] Weekly digest cron (Mon 09:00 UTC) + reserve sweep cron (daily 08:00 UTC) in `vercel.json`.
- [x] docs/: PRD/ARCHITECTURE/RULES/DESIGN/TASKS/MEMORY added (this commit).
