# DESIGN — FlexSpot UI system

## Brand
- Name: **FlexSpot** · tagline in code: "The internet's live spotlight competition."
- Logo: `public/logo-crown.png` (+ `-180` variant, icons). Used **raw** — never on a card, box, or background behind it.
- Tone: playful competition / spotlight show; **emoji are allowed in UI content** (FlexSpot is the one project where this is permitted — e.g. SpotCard speed icons 🚀🐆). Icons are still Heroicons-style inline SVG (stroke, `strokeWidth=2`, round caps/joins).

## Theme: light-first
CSS variables in `src/index.css`:
| token | value | use |
|---|---|---|
| `--bg` / `--surface` | `#FAFAF8` / `#FFFFFF` | page / cards |
| `--ink` / `--ink-2` / `--ink-3` | `#101828` / `#475467` / `#98A2B3` | text tiers |
| `--line` | `#E8E9EB` | borders |
| `--blaze` (brand) | `#7C3AED` (deep `#5B21B6`, soft `#F1EAFE`) | primary actions, highlights |
| `--gold` | `#F59E0B` (deep `#D97706`, soft `#FFF8E8`) | rankings, premium |
| `--green` | `#12B76A` | success |
| `--blue` | `#2E7CF6` | links/info |
| `--shadow-card` | `0 1px 2px rgba(16,24,40,.05), 0 8px 24px -12px rgba(16,24,40,.12)` | card depth |

Legacy dark-theme Tailwind tokens (`tailwind.config.js`, still used by older classes): `electric #2E7CF6`, `neon #2BFF88`, `gold #FFC93C`, with `glowblue/glowgreen/glowgold` shadows — do not reintroduce; new UI uses the CSS-var light system.

## Typography
- Display: `'Bricolage Grotesk'` (Google Fonts, `.font-display`) for headings, rank numbers.
- Body: `'Inter'`, system-ui fallback (`font-family: 'Inter', system-ui, -apple-system, sans-serif`).
- ⚠️ Owner standard is the Apple font stack; this repo deviates (Google Fonts). Migration is an open TODO (see TASKS.md).

## Buttons (`src/index.css`)
- `.btn-primary` (blaze), `.btn-gold`, `.btn-dark`, `.btn-ghost`. Pill shape `border-radius: 999px`, `font-weight: 700`.
- Motion: hover `translateY(-1px)` + slight brighten; active `scale(0.98)`; disabled `opacity: 0.55`.
- Never combine `.btn-*` with `hidden` + responsive show without the breakpoint-scoped override rule (index.css lines ~118–131) — past bug made brand names invisible on mobile.

## Spacing & layout
- Card radius `12px` for blocks; pills for buttons/tags; generous mobile-first padding (`0.6–1.1rem` tap-friendly).
- Bottom mobile nav (`MobileNav`), sticky claim strips, floating decorative elements (`Floaties`, `Sway`, `CelebrationBurst`).
- Motion: apple-design + web-animations standards — `cubic-bezier(.22,1,.36,1)` easing, transform/opacity only, `prefers-reduced-motion` respected, press feedback `scale(0.97–0.98)`.

## Images/media
- Hero assets in `public/` (WebP preferred; image compression pass done). Faces/photos must stay fully visible; no AI-looking renders.
