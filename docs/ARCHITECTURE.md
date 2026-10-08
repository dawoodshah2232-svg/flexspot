# ARCHITECTURE — FlexSpot

## Stack
- **Frontend:** React 18 + Vite 5 (`flexspot-lol`), `react-router-dom` 7, Tailwind CSS 3, framer-motion 13, qrcode.react 4, `@vercel/analytics`.
- **Backend:** Vercel serverless functions in `api/` (Node).
- **Data stores:** Vercel KV (central spot manager, `/api/spots`), Supabase (optional live layer — `IS_LIVE` when `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are set), localStorage fallback (demo data `DEMO_SPOTS`, keys `flexspot_*` in `src/lib/store.js`).
- **Hosting:** Vercel (`vercel.json`), deploy target `www.flexspot.lol`.

## Folder map
```
src/
  App.jsx            # routes, lazy-split pages, claim/boost modals, analytics init
  main.jsx / index.css
  pages/             # 24 pages (Home, ClaimPage, LeaderboardPage, SpotProfile,
                     # Explore, DiscoveryPage, CategoryPage, ComparePage,
                     # CalculatorPage, Rewards, Dashboard, Admin, AuctionPage,
                     # Blog, BlogPost, About, Contact, FAQ, Privacy, Terms,
                     # Disclaimers, HowItWorks, TopReferrersPage, NotFound)
  components/        # Header, MobileNav, Footer, SpotCard, ClaimStrip,
                     # Celebration/CelebrationBurst, Floaties, Flee, Sway,
                     # DramaTicker, CountUp, RankPredictor, Podium,
                     # SecurityGuard, Honeypot, CookieConsent, OnboardingTour,
                     # ShareButtons, TopReferrers, ExpertVoices, FounderBadge,
                     # FounderNote, ReserveWidget, RootProfile, PageHead, Navbar,
                     # FaqSection, ErrorBoundary, BlogCard
  lib/               # store.js (data layer + localStorage), spotApi.js (Vercel API
                     # client, x-admin-pin auth), referral.js, payments.js,
                     # member.js, analytics.js, ga.js, tracker.js, security.js,
                     # siteSettings.jsx, pageMeta.js, theme.js, display.js,
                     # format.js, blog.js/blogParse.js, geoFaqs.js,
                     # authorBios.js, emailClient.js
  content/blog/      # 117 markdown blog posts (source for /blog)
api/
  spots.js           # central spot manager (Vercel KV)
  spots-sitemap.js   # /sitemap-spots.xml rewrite target
  submissions.js     # claim submissions
  auction.js / reserve.js / founders.js / member.js / track.js / email.js
  cron/weekly-digest.js (Mon 09:00 UTC) / cron/reserve-sweep.js (daily 08:00 UTC)
  _lib/auction.js / _lib/mail.js / _lib/templates.js
supabase/            # functions/ + migrations/ (optional live layer)
scripts/             # generate-sitemap.mjs (prebuild), prerender-seo.mjs (postbuild:
                     # 41 prerendered pages)
public/              # logos, hero assets, ads.txt, llms.txt, sitemap.xml, IndexNow
                     # + Google verification files, manifest.webmanifest
```

## Data flow
1. **Read:** Pages call `src/lib/store.js` → if `IS_LIVE`, Supabase; spots served by `/api/spots` (Vercel KV); offline/stale → cached localStorage → `DEMO_SPOTS` in `src/lib/data.js`.
2. **Write:** claim/boost submissions → `api/submissions.js`, `api/reserve.js`; admin mutations → `api/spots.js` with `x-admin-pin` header (`VITE_ADMIN_PIN`, see `src/lib/spotApi.js`).
3. **Analytics:** `lib/analytics.js` (visitor ID, live-online counter, tracking) + GA (`lib/ga.js`) + `@vercel/analytics`.
4. **Build:** `prebuild` generates sitemap → `vite build` → `postbuild` copies `index.html`→`404.html` and prerenders SEO pages; every page is a route-level lazy chunk (`lazyRetry` in App.jsx reloads once on stale chunk 404).

## Routing details (`vercel.json`)
- `/api/:path*` → serverless; `/sitemap-spots.xml` → `/api/spots-sitemap`; everything else → `/index.html` (SPA). Catch-all `/:slug` route serves root-level spot profiles.
- Security headers: strict CSP (AdSense/GTag allowlisted), `X-Frame-Options: DENY`, HSTS, `/admin` + `/dashboard` noindexed.

## Reliability patterns in the code
- `ErrorBoundary` + chunk-retry: any render crash shows a reload card, never a dead screen.
- `writeLSOrThrow`: user-critical saves (claim submissions) throw a real error message instead of silent success on storage failure.
