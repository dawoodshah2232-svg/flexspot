import { CATEGORIES, FAQS } from './data';
import { GEO_FAQS } from './geoFaqs';
import { getPost, publicPosts } from './blog';

// Central route -> SEO/GEO metadata map. One source of truth, applied
// client-side by <PageHead/> in App.jsx's Shell (useLocation-driven).
// Dynamic routes (/explore/:category, /s/:slug, /:slug) are resolved by
// metaForPath() below using live data.

// Canonical production URL. Overridden at build time by VITE_SITE_URL
// (preview builds point at the GitHub Pages URL).
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.flexspot.lol').replace(/\/+$/, '');
export const OG_IMAGE = `${SITE_URL}/og-cover.png`;

const url = (path) => `${SITE_URL}${path}`;
const abs = (path) => url(path);

// Static route entries: { title, description, robots? , jsonLd?: (path) => object|null }
export const META = {
  '/': {
    faqs: GEO_FAQS['/'],
    title: 'FlexSpot.LOL — Bid for Attention | Live Brand Leaderboard',
    description:
      "FlexSpot.LOL — the internet's live spotlight competition. Claim a public leaderboard spot from just $1, pay in USDT crypto, and outbid rivals to take the crown.",
  },
  '/claim': {
    faqs: GEO_FAQS['/claim'],
    title: 'Claim Your Spot — From Just $1 | FlexSpot.LOL',
    description:
      'Claim your public FlexSpot leaderboard spot in under a minute. Enter your brand details, boost from $1, and start climbing to #1.',
  },
  '/leaderboard': {
    faqs: GEO_FAQS['/leaderboard'],
    title: 'Live Leaderboard — Who Rules the Spotlight | FlexSpot.LOL',
    description:
      'The live FlexSpot leaderboard: brands, creators, and meme pages ranked by total boosts. Watch the battle in real time and boost your favorite.',
  },
  '/explore': {
    faqs: GEO_FAQS['/explore'],
    title: 'Explore All Categories | FlexSpot.LOL',
    description:
      'Browse FlexSpot spots by category — startups, creators, gaming, food & drink, fintech, memes, and more. Find a brand to boost or a niche to conquer.',
  },
  '/trending': {
    faqs: GEO_FAQS['/leaderboard'],
    title: 'Trending Spots Right Now | FlexSpot.LOL',
    description:
      'Trending on FlexSpot right now: the leaderboard spots getting the most boosts, buzz and attention today. See what the internet is backing.',
  },
  '/rising': {
    faqs: GEO_FAQS['/leaderboard'],
    title: 'Rising Stars — Fastest Climbers | FlexSpot.LOL',
    description:
      'The fastest-climbing FlexSpot spots right now. These brands are gaining serious momentum — watch them rise, or boost your own spot past them.',
  },
  '/winners': {
    faqs: GEO_FAQS['/leaderboard'],
    title: 'Winners — Hall of Fame | FlexSpot.LOL',
    description:
      'The FlexSpot hall of fame: past and present champions who climbed to #1 and held the golden crown. See what it takes to win the spotlight.',
  },
  '/new': {
    faqs: GEO_FAQS['/leaderboard'],
    title: 'Newest Spots — Fresh Claims | FlexSpot.LOL',
    description:
      'The freshest FlexSpot claims, updated live. Be the first to boost a brand-new spot and help it climb the leaderboard from just $1.',
  },
  '/how-it-works': {
    faqs: GEO_FAQS['/how-it-works'],
    title: 'How It Works — Claim, Boost, Win | FlexSpot.LOL',
    description:
      'How FlexSpot works: claim a public spot from $1, get boosted by fans and referrals, and climb the live leaderboard to take the crown.',
  },
  '/rewards': {
    faqs: GEO_FAQS['/rewards'],
    title: 'Rewards — Boosts, Referrals & Crowns | FlexSpot.LOL',
    description:
      'FlexSpot rewards: earn your place with boosts, 20% instant affiliate commission on referred payments, and the champion crown for the top spot.',
  },
  '/auction': {
    faqs: GEO_FAQS['/auction'],
    title: 'Spotlight Auction — Own the Homepage | FlexSpot.LOL',
    description:
      'Bid for a FlexSpot homepage spotlight: weekly auctions, $25 reserve, $5 minimum raise. Highest bidder holds the spotlight for 7 days.',
  },
  '/compare': {
    faqs: GEO_FAQS['/compare'],
    title: 'Spot vs Spot — Compare Brands Head-to-Head | FlexSpot.LOL',
    description:
      'Compare any two FlexSpot spots side by side: rank, verified boosts, views, clicks and links. Settle the debate with real numbers, not opinions.',
  },
  '/calculator': {
    faqs: GEO_FAQS['/calculator'],
    title: 'Visibility Calculator — Budget to Spotlight | FlexSpot.LOL',
    description:
      'FlexSpot visibility calculator: slide your budget and campaign length to see exactly what spotlight your money buys. Start from just $1.',
  },
  '/top-referrers': {
    faqs: GEO_FAQS['/top-referrers'],
    title: 'Top Referrers — The People Behind the Traffic | FlexSpot.LOL',
    description:
      'Meet FlexSpot’s top referrers: the members earning 20% instant commission on every payment made by people they invited. Join them.',
  },
  '/dashboard': {
    title: 'Member Dashboard — Wallet, Referrals & Spot | FlexSpot.LOL',
    description:
      'Your FlexSpot member dashboard: wallet balance and USDT withdrawals, referral earnings, and full control of your public spot.',
    // Member-only page behind login — keep it out of the index.
    robots: 'noindex, nofollow',
  },
  '/faq': {
    title: 'FAQ — Frequently Asked Questions | FlexSpot.LOL',
    description:
      'FlexSpot FAQ: how the live ranking works, what you can promote, how USDT payments and the 20% referral commission work, and what it costs.',
    jsonLd: () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }),
  },
  '/blog': {
    title: 'The Spotlight Blog — Visibility Guides | FlexSpot.LOL',
    description:
      'The FlexSpot blog: guides on brand visibility, bidding strategy, small-business marketing, viral growth, and winning the spotlight — from $1.',
    jsonLd: (path) => breadcrumb([{ name: 'Home', path: '/' }, { name: 'Blog', path }]),
  },
  '/privacy': {
    title: 'Privacy Policy | FlexSpot.LOL',
    description:
      'How FlexSpot.LOL collects, uses, and protects your data. Plain-language privacy policy: what we store, what we never sell, and your rights.',
  },
  '/disclaimers': {
    title: 'Disclaimers | FlexSpot.LOL',
    description:
      'Honest disclaimers for FlexSpot.LOL: what paying for a leaderboard spot guarantees (placement) and what it doesn’t (traffic, sales, rankings elsewhere).',
  },
  '/about': {
    title: 'About FlexSpot — The Live Internet Spotlight | FlexSpot.LOL',
    description:
      'About FlexSpot.LOL: a leaderboard where brands claim a spot from $1 and outbid rivals for attention. Transparent, human-verified, launched September 2026.',
  },
  '/contact': {
    title: 'Contact FlexSpot — We Read Every Message | FlexSpot.LOL',
    description:
      'Get in touch with the FlexSpot team: support@flexspot.lol. Questions, feedback, press, or partnership ideas — every message gets read.',
  },
  '/terms': {
    title: 'Terms of Service | FlexSpot.LOL',
    description:
      'The rules of the FlexSpot.LOL spotlight: claims, boosts, payments, referrals, and acceptable use. Read before claiming a spot.',
  },
  '/admin': {
    title: 'Admin | FlexSpot.LOL',
    description: 'FlexSpot admin dashboard.',
    robots: 'noindex, nofollow',
  },
};

// Breadcrumb JSON-LD shared by all inner pages (helps AI search + rich results)
function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

// Static pages that must NOT get an auto breadcrumb: home (it's the trail
// root), and the login-walled/PIN-gated pages that stay out of the index.
// '/blog' already ships its own BreadcrumbList, so it is skipped too.
const NO_AUTO_BREADCRUMB = new Set(['/', '/admin', '/dashboard', '/blog']);

// Attach a Home > Page BreadcrumbList to a static META entry's JSON-LD.
// The crumb name is the page title minus the site suffix. Entries that
// already return their own JSON-LD keep it — the breadcrumb is appended,
// never replacing existing structured data.
function withBreadcrumb(entry, path) {
  if (NO_AUTO_BREADCRUMB.has(path)) return entry;
  const name = String(entry.title).split(' | FlexSpot.LOL')[0];
  const bc = () => breadcrumb([{ name: 'Home', path: '/' }, { name, path }]);
  const prev = entry.jsonLd;
  return {
    ...entry,
    jsonLd: prev
      ? (p) => {
          const r = prev(p);
          return (Array.isArray(r) ? r : [r]).concat(bc());
        }
      : bc,
  };
}

function categoryMeta(cat) {
  const name = cat?.name || 'Category';
  const blurb = cat?.blurb || `Explore ${name} spots on FlexSpot.`;
  return {
    title: fitTitle(`${name} Spots — Explore ${name} | FlexSpot.LOL`),
    description: fitDescription(`${name} on FlexSpot: ${blurb} Browse every ${name.toLowerCase()} spot on the live leaderboard, or claim your own from $1 and climb to the top.`),
    jsonLd: (path) => breadcrumb([{ name: 'Home', path: '/' }, { name: 'Explore', path: '/explore' }, { name, path }]),
  };
}

function spotDescription(spot) {
  const head = `${spot.name} — ${spot.tagline || ''}.`;
  const tail = ' Boost it from $1 on FlexSpot and push it toward the crown.';
  const budget = 160 - head.length - 1 - tail.length;
  let mid = spot.description || spot.tagline || '';
  if (mid.length > budget) mid = `${mid.slice(0, Math.max(0, budget - 1)).trimEnd()}…`;
  return `${head} ${mid}${tail}`;
}

function spotMeta(spot, path) {
  const name = spot?.name || 'Spot';
  const tagline = spot?.tagline || '';
  const desc = spot?.description || tagline;
  const title = fitTitle(tagline ? `${name} — ${tagline} | FlexSpot.LOL` : `${name} | FlexSpot.LOL`);
  return {
    title,
    description: spotDescription({ name, tagline, description: desc }),
    canonicalPath: `/s/${spot.slug}`,
    jsonLd: () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      name: title,
      description: desc,
      url: url(`/s/${spot.slug}`),
      mainEntity: {
        '@type': 'Product',
        name,
        description: desc,
        url: url(`/s/${spot.slug}`),
        category: spot?.category || undefined,
      },
      breadcrumb: breadcrumb([{ name: 'Home', path: '/' }, { name: 'Leaderboard', path: '/leaderboard' }, { name, path: `/s/${spot.slug}` }]),
    }),
  };
}

function fitTitle(t, max = 60) {
  return t.length <= max ? t : `${t.slice(0, max - 1).trimEnd()}…`;
}
function fitDescription(d, max = 160) {
  return (d || '').length <= max ? d || '' : `${d.slice(0, max - 1).trimEnd()}…`;
}

function blogPostMeta(post) {
  const path = `/blog/${post.slug}`;
  const img = post.image ? url(post.image.startsWith('/') ? post.image : `/${post.image}`) : OG_IMAGE;
  return {
    title: fitTitle(`${post.title} | FlexSpot.LOL Blog`),
    description: fitDescription(post.description),
    canonicalPath: path,
    ogImage: img,
    // Sample posts are engine demos — keep them out of the index.
    robots: post.sample ? 'noindex, follow' : undefined,
    jsonLd: () => [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        // No post has been updated since publication (no `updated` frontmatter
        // anywhere), so dateModified truthfully equals datePublished.
        dateModified: post.date,
        author: { '@type': 'Person', name: post.author },
        image: img,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url(path) },
        publisher: {
          '@type': 'Organization',
          name: 'FlexSpot.LOL',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-crown-180.png` },
        },
      },
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path },
      ]),
    ],
  };
}

// Resolve meta for any pathname. Returns { title, description, path, robots?, canonicalPath?, ogImage?, jsonLd? }
// `spots` is the loaded leaderboard; `categoryOf` resolves /explore/:category.
// `categoryOf` resolves /explore/:category slugs -> { name, icon, blurb }
// (data.js `categoryMeta` fits: (slug) => category object)
export function metaForPath(pathname, { spots = [], categoryOf } = {}) {
  const path = pathname.split('?')[0].replace(/\/+$/, '') || '/';
  if (META[path]) return { ...withBreadcrumb(META[path], path), path };

  // Blog article pages must resolve before the generic /:slug spot lookup.
  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const post = getPost(blogMatch[1]);
    if (post) return { ...blogPostMeta(post), path };
  }

  const exploreMatch = path.match(/^\/explore\/([^/]+)$/);
  if (exploreMatch && categoryOf) {
    const cat = categoryOf(exploreMatch[1]);
    if (cat) return { ...categoryMeta(cat), path };
  }

  const sMatch = path.match(/^\/s\/([^/]+)$/);
  const rootMatch = path.match(/^\/([^/]+)$/);
  const slug = sMatch ? sMatch[1] : rootMatch ? rootMatch[1] : null;
  if (slug) {
    const spot = spots.find((s) => s.slug === slug);
    if (spot) {
      const meta = spotMeta(spot, sMatch ? path : `/s/${spot.slug}`);
      return { ...meta, path: sMatch ? path : `/s/${spot.slug}` };
    }
  }

  // Unknown path -> 404
  return {
    title: 'Page Not Found | FlexSpot.LOL',
    description: "This page doesn't exist on FlexSpot.LOL. Head back to the live leaderboard or claim your own spot from $1.",
    path,
    robots: 'noindex, follow',
  };
}

// Absolute OG/canonical helpers for PageHead
export const metaUrls = (path, canonicalPath) => ({
  pageUrl: url(path || '/'),
  canonicalUrl: url(canonicalPath || path || '/'),
});
