# PRD — FlexSpot (flexspot.lol)

## What it is
FlexSpot is "The internet's live spotlight competition" — a public social-trading / brand-spotlight web app at **https://www.flexspot.lol** (Vercel). Anyone can claim a "spot" (their brand, project, or social profile), boost it to climb rankings, and earn rewards; the site presents a live leaderboard, discovery feeds, and spot profile pages.

## Product goal
Grow a public, self-serve spotlight marketplace where brands/creators claim spots and pay to boost them, monetized by boosts plus AdSense display ads. Positioning is playful and competitive ("claim your spotlight").

## Users
- **Spot owners** — claim a spot (brand/project), boost it up the rankings, track it in a dashboard.
- **Referrers** — invite others, earn 20% instant commission on every payment (see TopReferrers page).
- **Visitors** — browse explore/leaderboard/discovery feeds, compare spots, use the boost calculator.
- **Admin (owner)** — manage spots, submissions, founders, and content behind a PIN-gated dashboard.

## Features (from the code, routes in `src/App.jsx`)
- **Claim flow** — `/claim`: submit a spot claim for approval.
- **Boost flow** — `/claim?boost=<slug>`: pay to boost an existing spot.
- **Leaderboard** — `/leaderboard`: ranked spots with move indicators.
- **Discovery feeds** — `/explore`, `/explore/:category`, `/trending`, `/rising`, `/winners`, `/new`.
- **Spot profiles** — `/s/:slug` and catch-all `/:slug`.
- **Compare** — `/compare`: side-by-side spot comparison.
- **Calculator** — `/calculator`: boost calculator.
- **Rewards** — `/rewards`; **How it works** — `/how-it-works`; **FAQ** — `/faq`.
- **Blog** — `/blog` + `/blog/:slug` (117 posts in `src/content/blog/`, markdown).
- **Dashboard** — `/dashboard` (spot-owner view, noindexed).
- **Admin** — `/admin` (PIN-gated, noindexed): manage spots/submissions.
- **Auction** — `/auction`; **Top referrers** — `/top-referrers`.
- **Crons** — weekly digest email (Mon 9:00 UTC), reserve sweep (daily 8:00 UTC).

## Business model
- Boost payments (spot owners pay to climb rankings).
- Referral program: 20% instant commission to referrers.
- AdSense display ads (account review status: **"Getting ready"** — pending Google).

## SEO/AEO status
- Prerendered SEO (41 pages), canonical/H1/JSON-LD, live spot sitemap (`/sitemap-spots.xml` via KV), IndexNow instant indexing, `llms.txt`, `ads.txt`, key takeaways on all blog posts, BlogPosting `dateModified`.

## TODO (unknowns, not guesses)
- Live-vs-demo data on production: verify `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` envs are set on Vercel (`IS_LIVE` flag in `src/lib/store.js`).
- AdSense approval outcome — currently "Getting ready".
- Actual boost pricing/payment provider — TODO (not found in repo constants seen).
- Reserve/auction economics details — TODO.
