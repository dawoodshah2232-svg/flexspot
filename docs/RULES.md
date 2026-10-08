# RULES — FlexSpot (coding standards)

## Stack rules
- Frontend: React 18 + Vite 5 + Tailwind CSS 3. All new code in `src/` as JSX components; one component per file under `src/components/`, one page per file under `src/pages/`.
- API: Node serverless functions in `api/` only. New backend work must stay on the existing Vercel functions + KV/Supabase. (Owner standing rule: any brand-new backend is MySQL + PHP for cPanel — do not migrate this app off Vercel.)
- Data layer lives in `src/lib/store.js` + `src/lib/spotApi.js`; never hardcode spot data in pages.

## Conventions (from the repo)
- **Routing:** route paths in `src/App.jsx`; every page lazy-loaded via `lazyRetry` (route-level code splitting — keep it that way; never import a page statically).
- **Auth:** admin calls send `x-admin-pin: VITE_ADMIN_PIN` (`src/lib/spotApi.js`). Never hardcode the PIN; never log it.
- **Storage fallback:** localStorage keys are namespaced `flexspot_*`; user-critical writes (claims) must use the throwing variant (`writeLSOrThrow`) — never silently report success when nothing persisted.
- **Errors:** show the real underlying error in user-facing messages (owner rule: never a generic "Server Error" red box); empty result sets get a friendly designed message, never an error state. No fake success states.
- **SEO:** keep PRD's SEO contract intact — prerender script, sitemap generation, JSON-LD, canonicals, one H1/page, `/admin` and `/dashboard` always noindexed, `/sitemap-spots.xml` rewrite, `ads.txt`, `llms.txt`, IndexNow key file.
- **Security:** CSP in `vercel.json` stays tight (AdSense/GTag allowlisted only); `/admin` is noindex via headers; `SecurityGuard` + `Honeypot` traps stay enabled.
- **CSS:** design tokens in `src/index.css` (`--blaze`, `--gold`, …); component button classes `.btn-primary`, `.btn-gold`, `.btn-dark`, `.btn-ghost`. Plain CSS in `index.css` is unlayered — never combine a custom display-setting class (`.btn-*`) with `hidden` + a responsive show class unless the breakpoint-scoped override rule exists (see the `/* Visibility utilities must win */` comment in index.css).
- **Icons:** Heroicons-style inline SVG (stroke, round caps) — never emoji as UI icons. (Exception: FlexSpot is the ONE project where emoji are allowed in UI content, e.g. meme-type spot-speed icons in `SpotCard`.)
- **Logos:** `public/logo-crown*.png` used raw, never on cards/boxes behind them.
- **Content honesty:** never invent stats, testimonials, or rankings; 20% referral commission is the stated figure — do not change it without the owner.

## Design/UX standards
- Load the workspace `apple-design` skill for all UI work (Apple motion principles + blocking-issues audit) and `web-animations` alongside it for website builds/upgrades. House easing `cubic-bezier(.22,1,.36,1)`; `prefers-reduced-motion` respected; animate transform/opacity only.
- Typography standard: Apple's font stack `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif` — never Roboto/Titillium/Montserrat as primary. NOTE: the repo currently uses Google Fonts **Bricolage Grotesque** (display) + **Inter** (body) — see DESIGN.md; migration is a TODO, not a given.

## Git / deploy
- `git fetch origin` + pull latest `main` before ANY work or push. Never force-push. Never `git reset --hard` without his explicit authorization.
- Frontend deploys via Vercel (auto-deploy on push to main). Backend = never auto-deployed without his review; for this repo API functions ship with the frontend but any payment/auth change still goes through his manual security review first.
- After each push, verify the Vercel deploy succeeded before pushing again.
