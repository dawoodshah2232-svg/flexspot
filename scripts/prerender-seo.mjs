// Build-time SEO/GEO prerender for FlexSpot.
// Why: AI/search crawlers (e.g. OpenAI's OAI-SearchBot) fetch pages WITHOUT
// executing JavaScript. This SPA renders everything client-side, so without
// this script those crawlers see an empty <div id="root"> — no headlines, no
// copy, no FAQ answers. This script writes one static HTML file per public
// route containing the answer-first headline, key facts, full FAQ Q&A and
// internal links, while keeping every <script>/<link> tag intact so the React
// app still boots and takes over for real visitors (createRoot replaces the
// static content on load).
// Runs in `postbuild`, AFTER the dist/404.html copy (404 stays the SPA shell).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GEO_FAQS } from '../src/lib/geoFaqs.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://www.flexspot.lol';

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Per-route meta (mirrors src/lib/pageMeta.js) + answer-first prerender copy.
// H1 rule (tested tactic): the headline IS the answer to the buyer's question.
// Sub-rule: lead with uncommon, specific claims competitors don't make.
const META = {
  '/': {
    title: 'FlexSpot.LOL — Bid for Attention | Live Brand Leaderboard',
    description:
      "FlexSpot.LOL — the internet's live spotlight competition. Claim a public leaderboard spot from just $1, pay in USDT crypto, and outbid rivals to take the crown.",
    h1: 'Big brand visibility. Start from just $1.',
    lede: [
      'FlexSpot is a live public leaderboard where brands, creators and meme pages compete for attention. Claim a spot from $1 — no account needed — and the highest bidder takes the crown.',
      'Ranking is fully transparent: spots are ordered by total verified boosts, so every rank on the board was paid for. A real human verifies every payment before it goes live.',
      'Referrers earn a 20% commission on every payment made by someone who joined through their referral link — paid in USDT.',
    ],
    faqKey: '/',
  },
  '/how-it-works': {
    title: 'How It Works — Claim, Boost, Win | FlexSpot.LOL',
    description:
      'How FlexSpot works: claim a public spot from $1, get boosted by fans and referrals, and climb the live leaderboard to take the crown.',
    h1: 'How FlexSpot works: claim a spot from $1 and outrank everyone.',
    lede: [
      'Five steps to internet fame. No ads account, no marketing degree — just $1, a little nerve, and the guts to outrank everyone else.',
      'Claim your spot in under a minute with no signup, fuel it with USDT on BSC, Solana or Tron, and climb: the highest total boost takes the crown, live, in front of everyone.',
    ],
    faqKey: '/how-it-works',
  },
  '/claim': {
    title: 'Claim Your Spot — From Just $1 | FlexSpot.LOL',
    description:
      'Claim your public FlexSpot leaderboard spot in under a minute. Enter your brand details, boost from $1, and start climbing to #1.',
    h1: 'Claim your FlexSpot spot from $1 — no account needed.',
    lede: [
      'Claiming takes under a minute: enter your brand details, choose a boost starting at $1, and complete payment. Your spot gets a public shareable page the moment it is approved.',
      'Payments are verified by a real human, usually within a few hours. USDT is accepted on TRC-20, BEP-20 and Solana.',
    ],
    faqKey: '/claim',
  },
  '/rewards': {
    title: 'Rewards — Boosts, Referrals & Crowns | FlexSpot.LOL',
    description:
      'FlexSpot rewards: earn your place with boosts, 20% instant affiliate commissions, and crown perks for leaderboard champions.',
    h1: 'FlexSpot rewards: what you unlock by climbing the leaderboard.',
    lede: [
      'Climbing the FlexSpot leaderboard unlocks rewards: crown perks for champions, referral commissions, and spotlight features for the most-boosted spots.',
      'The headline reward: referrers earn 20% commission on every payment made by someone who joined through their referral link.',
    ],
    faqKey: '/rewards',
  },
  '/leaderboard': {
    title: 'Live Leaderboard — Who Rules the Spotlight | FlexSpot.LOL',
    description:
      'The live FlexSpot leaderboard: brands, creators, and meme pages ranked by verified boosts. See who rules the spotlight right now.',
    h1: 'The live FlexSpot leaderboard: every rank was paid for.',
    lede: [
      'This is the internet\u2019s public spotlight competition, ranked live. Spots are ordered by total verified boosts — when you pass someone, you take their rank in front of everyone.',
      'The #1 spot gets the golden spotlight card, the homepage feature, and the most-clicked position on the page. But a challenger can take it at any moment.',
    ],
    faqKey: '/leaderboard',
  },
  '/explore': {
    title: 'Explore All Categories | FlexSpot.LOL',
    description:
      'Browse FlexSpot spots by category — startups, creators, gaming, food & drink, and more. Find brands competing for attention.',
    h1: 'Explore FlexSpot spots by category.',
    lede: [
      'Browse every FlexSpot spot by category: startups, creators, gaming, food & drink, memes and more.',
      'Each spot is a public page with its rank, boosts, and links — claim your own from $1 and start climbing.',
    ],
    faqKey: '/explore',
  },
  '/trending': {
    title: 'Trending — What\u2019s Hot Right Now | FlexSpot.LOL',
    description:
      'Trending on FlexSpot: the spots getting the most attention right now. See what the internet is boosting today.',
    h1: 'Trending on FlexSpot: the spots winning attention right now.',
    lede: [
      'These are the FlexSpot spots getting the most attention right now — the pages the internet is boosting, sharing and fighting over today.',
    ],
    faqKey: '/explore',
  },
  '/rising': {
    title: 'Rising Stars — Fastest Climbers | FlexSpot.LOL',
    description:
      'The fastest-climbing FlexSpot spots. These brands are gaining momentum — watch them rise or boost your own past them.',
    h1: 'Rising fast: the fastest climbers on the FlexSpot leaderboard.',
    lede: [
      'The fastest-climbing FlexSpot spots. These brands are gaining momentum — catch them now, before they take the crown.',
    ],
    faqKey: '/explore',
  },
  '/winners': {
    title: 'Winners — Hall of Fame | FlexSpot.LOL',
    description:
      'The FlexSpot hall of fame: past and present champions who held the crown. See what it takes to win the spotlight.',
    h1: 'FlexSpot winners: the brands that took the crown.',
    lede: [
      'The FlexSpot hall of fame — past and present champions who climbed to #1 and held the golden spotlight.',
      'Winning takes the highest total verified boost. Claim a spot from $1 and take your shot.',
    ],
    faqKey: '/explore',
  },
  '/new': {
    title: 'Newest Spots — Fresh Claims | FlexSpot.LOL',
    description:
      'The freshest FlexSpot claims. Be the first to boost a brand-new spot and help it climb the leaderboard.',
    h1: 'New on FlexSpot: the latest spots claimed.',
    lede: [
      'The freshest FlexSpot claims — brand-new spots entering the competition. Boost one early and ride it to the top.',
    ],
    faqKey: '/explore',
  },
  '/compare': {
    title: 'Spot vs Spot — Compare Brands Head-to-Head | FlexSpot.LOL',
    description:
      'Compare any FlexSpot spots side by side: rank, boosts, views, clicks and links. Settle the debate with real numbers.',
    h1: 'Compare FlexSpot spots head to head, with real numbers.',
    lede: [
      'Pick any two FlexSpot spots and compare them side by side: rank, total boosts, views, clicks and links.',
      'No vanity metrics — every number on the comparison comes from verified boosts and real traffic.',
    ],
    faqKey: '/compare',
  },
  '/calculator': {
    title: 'Visibility Calculator — What Your Budget Buys | FlexSpot.LOL',
    description:
      'Estimate your FlexSpot spotlight: slide your budget and campaign length to see what visibility your money buys.',
    h1: 'How much spotlight does your budget buy? Do the maths.',
    lede: [
      'Slide your budget and see what it buys on the FlexSpot leaderboard: projected rank, estimated views, and how far past your rivals it takes you.',
      'Spots start from $1 and every dollar of verified boost moves you up the live ranking.',
    ],
    faqKey: '/calculator',
  },
  '/top-referrers': {
    title: 'Top Referrers — The People Behind the Traffic | FlexSpot.LOL',
    description:
      'Meet FlexSpot\u2019s top referrers: members who earn 20% instant commission on every payment from people they invited.',
    h1: 'Top referrers earn 20% of every payment their invites make.',
    lede: [
      'These are the FlexSpot members driving the most traffic. Every referrer earns a 20% commission on every payment made by someone who joined through their referral link.',
      'Share your link anywhere — when your invites claim spots and boost, you earn in USDT.',
    ],
    faqKey: '/top-referrers',
  },
  '/faq': {
    title: 'FAQ — Frequently Asked Questions | FlexSpot.LOL',
    description:
      'Everything about FlexSpot: how ranking works, what you can promote, payments, referrals, and whether there are any fees.',
    h1: 'FlexSpot questions, answered straight.',
    lede: [
      'Straight answers, no jargon. How ranking works, what you can promote, how payments and the 20% referral commission work, and what it costs.',
    ],
    faqKey: '/',
  },
  '/blog': {
    title: 'The Spotlight Blog — Visibility Guides & Bidding Tactics | FlexSpot.LOL',
    description:
      'The FlexSpot blog: guides on brand visibility, bidding strategy, small-budget promotion, and winning the internet\u2019s attention.',
    h1: 'The FlexSpot blog: notes on winning the internet\u2019s attention.',
    lede: [
      'Practical guides on brand visibility, bidding strategy, and small-budget promotion — written from the live FlexSpot leaderboard, not theory.',
    ],
    faqKey: '/',
  },
  '/auction': {
    title: 'Spotlight Auction \u2014 Own the Homepage | FlexSpot.LOL',
    description:
      'Bid for a FlexSpot homepage spotlight: weekly auctions, $25 reserve, $5 minimum raise. Highest bidder holds the spotlight for 7 days.',
    h1: 'Own the homepage for 7 days: outbid everyone in the Spotlight Auction.',
    lede: [
      'Three homepage spotlight placements go to the highest bidder every week. Rounds run Monday 00:00 to Monday 00:00 UTC.',
      'Each slot opens at a $25 reserve and every new bid must beat the top by at least $5. Bids carry payment proof and are verified by a real person before they count \u2014 no bots, no auto-approvals.',
      'The top bidder when the round ends holds the homepage spotlight \u2014 the most-viewed placement on FlexSpot \u2014 for a full 7 days.',
    ],
    faqKey: '/auction',
  },
};

// Internal links: crawlers walk these to discover and re-read pages.
const NAV_LINKS = [
  ['/', 'Home'],
  ['/how-it-works', 'How it works'],
  ['/claim', 'Claim your spot'],
  ['/leaderboard', 'Leaderboard'],
  ['/explore', 'Explore'],
  ['/rewards', 'Rewards'],
  ['/compare', 'Compare spots'],
  ['/calculator', 'Calculator'],
  ['/top-referrers', 'Top referrers'],
  ['/auction', 'Spotlight auction'],
  ['/faq', 'FAQ'],
  ['/blog', 'Blog'],
];

function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function staticBody(path, meta) {
  const faqs = GEO_FAQS[meta.faqKey] || [];
  const faqHtml = faqs
    .map(
      (f) => `<section class="pr-faq-item">
<h3>${esc(f.q)}</h3>
<p>${esc(f.a)}</p>
</section>`,
    )
    .join('\n');
  const ledeHtml = meta.lede.map((p) => `<p>${esc(p)}</p>`).join('\n');
  const navHtml = NAV_LINKS.map(([href, label]) =>
    href === path
      ? `<span aria-current="page">${esc(label)}</span>`
      : `<a href="${esc(href)}">${esc(label)}</a>`,
  ).join(' · ');
  return `<div class="pr-wrap">
<header class="pr-header"><a class="pr-brand" href="/">👑 FlexSpot.LOL</a><span class="pr-tag">Bid for Attention — the live brand leaderboard</span></header>
<main class="pr-main">
<nav class="pr-nav" aria-label="Site">${navHtml}</nav>
<h1>${esc(meta.h1)}</h1>
${ledeHtml}
<div class="pr-cta"><a href="/claim">Claim your spot from $1 →</a><a href="/how-it-works">How it works</a></div>
<h2>Questions, answered straight.</h2>
${faqHtml}
<nav class="pr-nav pr-nav-bottom" aria-label="Site">${navHtml}</nav>
</main>
<footer class="pr-footer"><p>FlexSpot.LOL — the internet's live spotlight competition. Claim a public leaderboard spot from $1. Referrers earn 20% commission on every payment from their invites.</p></footer>
</div>`;
}

const PR_CSS = `<style>
.pr-wrap{max-width:760px;margin:0 auto;padding:24px 20px 48px;font-family:system-ui,-apple-system,sans-serif;color:#1a1a1a;line-height:1.65}
.pr-header{display:flex;align-items:center;gap:12px;flex-wrap:wrap;border-bottom:2px solid #f59e0b;padding-bottom:16px;margin-bottom:8px}
.pr-brand{font-weight:800;font-size:20px;color:#111;text-decoration:none}
.pr-tag{font-size:13px;color:#666}
.pr-nav{font-size:14px;padding:14px 0;color:#666}
.pr-nav a{color:#b45309;text-decoration:none}
.pr-nav a:hover{text-decoration:underline}
.pr-nav-bottom{border-top:1px solid #eee;margin-top:32px}
.pr-main h1{font-size:32px;line-height:1.2;margin:18px 0 12px;letter-spacing:-0.01em}
.pr-main h2{font-size:22px;margin:30px 0 8px}
.pr-main h3{font-size:17px;margin:20px 0 4px}
.pr-main p{margin:10px 0;color:#333}
.pr-faq-item{border-bottom:1px solid #f0f0f0;padding-bottom:6px}
.pr-cta{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}
.pr-cta a{display:inline-block;background:#f59e0b;color:#111;font-weight:700;padding:10px 22px;border-radius:999px;text-decoration:none}
.pr-cta a:last-child{background:#111;color:#fff}
.pr-footer{margin-top:24px;font-size:13px;color:#888;border-top:1px solid #eee;padding-top:16px}
</style>`;

function buildPage(template, path, meta) {
  const faqs = GEO_FAQS[meta.faqKey] || [];
  let html = template;
  // Head: title / description / canonical (answer-first, crawler-readable).
  html = html.replace(/<title>.*?<\/title>/s, `<title>${esc(meta.title)}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${esc(meta.description)}" />`,
  );
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${SITE}${path === '/' ? '/' : path}" />`,
  );
  // OG tags for scrapers.
  const og = `<meta property="og:title" content="${esc(meta.title)}" />
<meta property="og:description" content="${esc(meta.description)}" />
<meta property="og:url" content="${SITE}${path === '/' ? '/' : path}" />
<meta property="og:type" content="website" />`;
  html = html.replace('</head>', `${og}\n</head>`);
  // Structured data in the initial HTML (not JS-injected).
  const jsonLd = [faqJsonLd(faqs)]
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join('\n');
  html = html.replace('</head>', `${PR_CSS}\n${jsonLd}\n</head>`);
  // Body: static answer-first content inside #root (React replaces it on boot).
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${staticBody(path, meta)}</div>`,
  );
  return html;
}

function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('prerender-seo: dist/index.html not found — run after `vite build`.');
    process.exit(1);
  }
  // Read the pristine SPA shell ONCE — the loop overwrites dist/index.html
  // with the home page, so re-reading it per route would leak home content
  // into every other route.
  const template = readFileSync(join(DIST, 'index.html'), 'utf8');
  let count = 0;
  for (const [path, meta] of Object.entries(META)) {
    const html = buildPage(template, path, meta);
    const outPath =
      path === '/' ? join(DIST, 'index.html') : join(DIST, path.slice(1), 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    count++;
  }
  console.log(`prerender-seo: wrote ${count} static route pages (FAQ answers in initial HTML).`);
}

main();
