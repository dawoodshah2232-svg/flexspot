// Preview dataset — replaced by live Supabase leaderboard when configured.
const now = Date.now();
const H = 3600e3;
const D = 24 * H;

// True when the app is showing demo/preview data instead of the live backend.
// (Computed independently from store.js's IS_LIVE to avoid a circular import.)
export const IS_PREVIEW_DATA = !(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

// Category taxonomy for Explore / category pages. Demo spots below carry an
// explicit `category` field; user submissions capture one at claim time.
export const CATEGORIES = [
  { slug: 'startups', name: 'Startups', icon: '🚀', blurb: 'New companies racing for attention.' },
  { slug: 'business', name: 'Business', icon: '🏢', blurb: 'Companies and local businesses.' },
  { slug: 'creators', name: 'Creators', icon: '🎨', blurb: 'Independent artists, labels and storytellers.' },
  { slug: 'social', name: 'Social Media Account', icon: '📱', blurb: 'Instagram, TikTok, X pages and channels.' },
  { slug: 'personal', name: 'Personal Brand', icon: '🧑‍🎤', blurb: 'Your name, your face, your spotlight.' },
  { slug: 'meme', name: 'Meme / Fun', icon: '🤣', blurb: 'Jokes, memes and glorious nonsense.' },
  { slug: 'food-drink', name: 'Food & Drink', icon: '🍵', blurb: 'Coffee, snacks and sips worth discovering.' },
  { slug: 'gaming', name: 'Gaming', icon: '🎮', blurb: 'Indie studios and play-driven brands.' },
  { slug: 'productivity', name: 'Productivity', icon: '🛠️', blurb: 'Tools that make work and life click.' },
  { slug: 'lifestyle', name: 'Lifestyle', icon: '🌿', blurb: 'Home, beauty, fitness and everyday upgrades.' },
  { slug: 'fintech', name: 'Fintech', icon: '💸', blurb: 'Money tools people actually enjoy.' },
  { slug: 'media', name: 'Media', icon: '🎙️', blurb: 'Podcasts, books and communities of readers.' },
];

// Back-fill map for preview spots (user submissions carry their own category).
const CATEGORY_BY_SLUG = {
  brewline: 'food-drink', pixelforge: 'gaming', nomaddesk: 'productivity',
  lumennotes: 'productivity', voltathletics: 'lifestyle', casaverde: 'lifestyle',
  orbitpay: 'fintech', fernandfable: 'media', snapchef: 'food-drink',
  driftaudio: 'creators', terratrails: 'lifestyle', bloombox: 'lifestyle',
  kernelpanic: 'media', wanderlens: 'creators', motomoto: 'lifestyle',
  sipsociety: 'food-drink', neonnoodles: 'food-drink', pixelpaws: 'creators',
  hustlehoney: 'business', codechai: 'media', gymbroskis: 'lifestyle',
  memevault: 'meme', swiftship: 'startups', auraaesthetics: 'lifestyle',
  podsquad: 'media', fitfuel: 'lifestyle', clipcraft: 'creators',
  dogedeals: 'meme', looploom: 'lifestyle',
};

export const categoryOf = (spot) =>
  spot?.category || CATEGORY_BY_SLUG[spot?.slug] || 'startups';

export const categoryMeta = (slug) =>
  CATEGORIES.find((c) => c.slug === slug) || { slug, name: 'Startups', icon: '🚀', blurb: '' };


// Launch showcase: 29 fictional demo brands with small, gradual amounts
// ($1–$29) and believable descending clicks. Amounts/clicks are sample
// figures, disclosed in the UI as preview data; replaced automatically by
// real member data as brands claim spots. Demo website links resolve to each
// brand's own live FlexSpot page — socials stay empty until real brands claim.
// Descriptions are plain flavor text: no follower counts, customer counts,
// performance claims, or payment implications — nothing presented as real.
export const DEMO_SPOTS = [
  { slug: 'sipsociety', seedMove: 1, mark: '🍸', name: 'Sip Society', tagline: 'Mocktails worth talking about.', description: 'A zero-proof bar crafting mocktails that rival any cocktail. Now bottling for home.', website: 'https://www.flexspot.lol/s/sipsociety', amount: 29, clicks: 102, views: 714, joinedAt: now - 26 * D, trend: [10.1, 13.6, 16.8, 19.7, 22.6, 25.8, 29.0] },
  { slug: 'neonnoodles', seedMove: 4, mark: '🍜', name: 'Neon Noodles', tagline: 'Ramen at 2am, delivered loud.', description: 'A late-night ramen concept built around bold broth and neon vibes.', website: 'https://www.flexspot.lol/s/neonnoodles', amount: 28, clicks: 70, views: 490, joinedAt: now - 25 * D, trend: [9.8, 13.2, 16.2, 19.0, 21.8, 24.9, 28.0] },
  { slug: 'pixelpaws', seedMove: 6, mark: '🐾', name: 'Pixel Paws', tagline: 'Pet portraits, pixelated.', description: 'Pixel-art portraits of pets, made to order.', website: 'https://www.flexspot.lol/s/pixelpaws', amount: 27, clicks: 65, views: 455, joinedAt: now - 24 * D, trend: [9.5, 12.7, 15.7, 18.4, 21.1, 24.0, 27.0] },
  { slug: 'hustlehoney', seedMove: -1, mark: '🍯', name: 'Hustle Honey', tagline: 'Raw honey, real hustle.', description: 'Small-batch raw honey from urban rooftops. Sweet, sustainable, and straight from the hive.', website: 'https://www.flexspot.lol/s/hustlehoney', amount: 26, clicks: 62, views: 434, joinedAt: now - 23 * D, trend: [9.1, 12.2, 15.1, 17.7, 20.3, 23.1, 26.0] },
  { slug: 'codechai', seedMove: 3, mark: '☕', name: 'Code & Chai', tagline: 'A dev newsletter with flavor.', description: 'Weekly coding notes served with desi chai energy.', website: 'https://www.flexspot.lol/s/codechai', amount: 25, clicks: 58, views: 406, joinedAt: now - 22 * D, trend: [8.8, 11.8, 14.5, 17.0, 19.5, 22.3, 25.0] },
  { slug: 'gymbroskis', seedMove: 2, mark: '💪', name: 'Gym Broskis', tagline: 'Lift heavy, laugh harder.', description: 'A fitness meme page turned coaching brand.', website: 'https://www.flexspot.lol/s/gymbroskis', amount: 24, clicks: 55, views: 385, joinedAt: now - 21 * D, trend: [8.4, 11.3, 13.9, 16.3, 18.7, 21.4, 24.0] },
  { slug: 'memevault', seedMove: 5, mark: '🗿', name: 'Meme Vault', tagline: 'Certified dank, daily.', description: 'A daily stash of certified-dank memes.', website: 'https://www.flexspot.lol/s/memevault', amount: 23, clicks: 52, views: 364, joinedAt: now - 20 * D, trend: [8.0, 10.8, 13.3, 15.6, 17.9, 20.5, 23.0] },
  { slug: 'swiftship', seedMove: 1, mark: '📦', name: 'SwiftShip', tagline: 'Ship it before lunch.', description: 'Starter kits to launch your MVP in a weekend.', website: 'https://www.flexspot.lol/s/swiftship', amount: 22, clicks: 49, views: 343, joinedAt: now - 19 * D, trend: [7.7, 10.3, 12.8, 15.0, 17.2, 19.6, 22.0] },
  { slug: 'auraaesthetics', seedMove: 0, mark: '✨', name: 'Aura Aesthetics', tagline: 'Glow up, scientifically.', description: 'Skin science made simple, with personalized routines.', website: 'https://www.flexspot.lol/s/auraaesthetics', amount: 21, clicks: 46, views: 322, joinedAt: now - 18 * D, trend: [7.4, 9.9, 12.2, 14.3, 16.4, 18.7, 21.0] },
  { slug: 'podsquad', seedMove: 2, mark: '🎙️', name: 'PodSquad', tagline: 'Podcasts for the group chat.', description: 'Three friends, one mic, zero filter. Weekly episodes on culture and chaos.', website: 'https://www.flexspot.lol/s/podsquad', amount: 20, clicks: 44, views: 308, joinedAt: now - 17 * D, trend: [7.0, 9.4, 11.6, 13.6, 15.6, 17.8, 20.0] },
  { slug: 'fitfuel', seedMove: -2, mark: '🥤', name: 'FitFuel', tagline: 'Fuel your grind.', description: 'Clean pre-workout without the jitters. Natural caffeine, real fruit flavors.', website: 'https://www.flexspot.lol/s/fitfuel', amount: 19, clicks: 42, views: 294, joinedAt: now - 16 * D, trend: [6.7, 8.9, 11.0, 12.9, 14.8, 16.9, 19.0] },
  { slug: 'clipcraft', seedMove: 3, mark: '🎬', name: 'ClipCraft', tagline: 'Viral clips in one tap.', description: 'Turn long videos into shareable shorts automatically.', website: 'https://www.flexspot.lol/s/clipcraft', amount: 18, clicks: 40, views: 280, joinedAt: now - 15 * D, trend: [6.3, 8.5, 10.4, 12.2, 14.0, 16.0, 18.0] },
  { slug: 'dogedeals', seedMove: 7, mark: '🐶', name: 'Doge Deals', tagline: 'Much deals. Very wow.', description: 'The meme-iest deals page on the internet. Discounts so good they should be illegal.', website: 'https://www.flexspot.lol/s/dogedeals', amount: 17, clicks: 38, views: 266, joinedAt: now - 14 * D, trend: [5.9, 8.0, 9.9, 11.6, 13.3, 15.1, 17.0] },
  { slug: 'brewline', seedMove: 0, mark: '☕', name: 'Brewline Coffee', tagline: 'Specialty coffee, roasted weekly.', description: 'Small-batch specialty coffee roasted every week and shipped fresh. Built by two baristas who got tired of stale beans.', website: 'https://www.flexspot.lol/s/brewline', amount: 16, clicks: 36, views: 252, joinedAt: now - 13 * D, trend: [5.6, 7.5, 9.3, 10.9, 12.5, 14.2, 16.0] },
  { slug: 'pixelforge', seedMove: 3, mark: '🎮', name: 'PixelForge', tagline: 'Indie games with soul.', description: 'A three-person indie game studio crafting pixel-art adventures.', website: 'https://www.flexspot.lol/s/pixelforge', amount: 15, clicks: 34, views: 238, joinedAt: now - 12 * D, trend: [5.3, 7.1, 8.7, 10.2, 11.7, 13.4, 15.0] },
  { slug: 'nomaddesk', seedMove: -1, mark: '💼', name: 'Nomad Desk', tagline: 'Gear for remote workers.', description: 'Ergonomic, packable desk gear designed for people who work from anywhere.', website: 'https://www.flexspot.lol/s/nomaddesk', amount: 14, clicks: 32, views: 224, joinedAt: now - 11 * D, trend: [4.9, 6.6, 8.1, 9.5, 10.9, 12.5, 14.0] },
  { slug: 'lumennotes', seedMove: 2, mark: '📝', name: 'Lumen Notes', tagline: 'Your second brain, minus the chaos.', description: 'An AI note-taking app that organizes itself. Capture everything, find anything, in milliseconds.', website: 'https://www.flexspot.lol/s/lumennotes', amount: 13, clicks: 30, views: 210, joinedAt: now - 10 * D, trend: [4.6, 6.1, 7.5, 8.8, 10.1, 11.6, 13.0] },
  { slug: 'voltathletics', seedMove: 5, mark: '⚡', name: 'Volt Athletics', tagline: 'Run club energy, daily.', description: 'A run club app with live leaderboards, city chapters, and races that actually feel electric.', website: 'https://www.flexspot.lol/s/voltathletics', amount: 12, clicks: 28, views: 196, joinedAt: now - 9 * D, trend: [4.2, 5.6, 7.0, 8.2, 9.4, 10.7, 12.0] },
  { slug: 'casaverde', seedMove: -2, mark: '🌿', name: 'Casa Verde', tagline: 'Plants, delivered thriving.', description: 'Rare and easy-care plants delivered to your door with care guides that keep them alive.', website: 'https://www.flexspot.lol/s/casaverde', amount: 11, clicks: 26, views: 182, joinedAt: now - 8 * D, trend: [3.9, 5.2, 6.4, 7.5, 8.6, 9.8, 11.0] },
  { slug: 'orbitpay', seedMove: 1, mark: '💳', name: 'Orbit Pay', tagline: 'Invoices freelancers love.', description: 'Beautiful invoices built for freelancers.', website: 'https://www.flexspot.lol/s/orbitpay', amount: 10, clicks: 24, views: 168, joinedAt: now - 7 * D, trend: [3.5, 4.7, 5.8, 6.8, 7.8, 8.9, 10.0] },
  { slug: 'fernandfable', seedMove: 4, mark: '📚', name: 'Fern & Fable', tagline: 'An indie bookstore for dreamers.', description: 'A curated indie bookstore with monthly book boxes.', website: 'https://www.flexspot.lol/s/fernandfable', amount: 9, clicks: 22, views: 154, joinedAt: now - 6 * D, trend: [3.2, 4.2, 5.2, 6.1, 7.0, 8.0, 9.0] },
  { slug: 'snapchef', seedMove: -3, mark: '🍳', name: 'Snapchef', tagline: 'Meal plans in 30 seconds.', description: 'Snap a photo of your fridge, get a week of meals. AI planning that respects your taste.', website: 'https://www.flexspot.lol/s/snapchef', amount: 8, clicks: 20, views: 140, joinedAt: now - 5 * D, trend: [2.8, 3.8, 4.6, 5.4, 6.2, 7.1, 8.0] },
  { slug: 'driftaudio', seedMove: 2, mark: '🎧', name: 'Drift Audio', tagline: 'Lo-fi label, global community.', description: 'An independent lo-fi label. Beats to build, study, and drift to.', website: 'https://www.flexspot.lol/s/driftaudio', amount: 7, clicks: 18, views: 126, joinedAt: now - 4 * D, trend: [2.4, 3.3, 4.1, 4.8, 5.5, 6.2, 7.0] },
  { slug: 'terratrails', seedMove: 0, mark: '🥾', name: 'Terra Trails', tagline: 'Find your next trail.', description: 'A hiking community sharing trails with real photos and difficulty ratings.', website: 'https://www.flexspot.lol/s/terratrails', amount: 6, clicks: 16, views: 112, joinedAt: now - 3 * D, trend: [2.1, 2.8, 3.5, 4.1, 4.7, 5.3, 6.0] },
  { slug: 'bloombox', seedMove: 1, mark: '💄', name: 'Bloombox', tagline: 'Skincare that keeps it simple.', description: 'Five products. Zero fluff. Dermatologist-approved skincare shipped monthly.', website: 'https://www.flexspot.lol/s/bloombox', amount: 5, clicks: 15, views: 105, joinedAt: now - 6 * H, trend: [1.8, 2.3, 2.9, 3.4, 3.9, 4.5, 5.0] },
  { slug: 'kernelpanic', seedMove: -2, mark: '🎙️', name: 'Kernel Panic', tagline: 'A dev podcast with teeth.', description: 'Weekly deep-dives into software engineering, startups, and the occasional rant.', website: 'https://www.flexspot.lol/s/kernelpanic', amount: 4, clicks: 14, views: 98, joinedAt: now - 4 * H, trend: [1.4, 1.9, 2.3, 2.7, 3.1, 3.6, 4.0] },
  { slug: 'wanderlens', seedMove: 3, mark: '📷', name: 'Wander Lens', tagline: 'Travel stories, shot on film.', description: 'A travel creator documenting hidden places — all on film.', website: 'https://www.flexspot.lol/s/wanderlens', amount: 3, clicks: 12, views: 84, joinedAt: now - 4 * H, trend: [1.0, 1.4, 1.7, 2.0, 2.3, 2.7, 3.0] },
  { slug: 'motomoto', seedMove: 0, mark: '🚲', name: 'Moto Moto', tagline: 'E-bikes for the city.', description: 'Affordable e-bike rentals. Grab, ride, return — no strings attached.', website: 'https://www.flexspot.lol/s/motomoto', amount: 2, clicks: 10, views: 70, joinedAt: now - 4 * H, trend: [0.7, 0.9, 1.2, 1.4, 1.6, 1.8, 2.0] },
  { slug: 'looploom', seedMove: 2, mark: '🧶', name: 'Loop & Loom', tagline: 'Slow fashion, hand-knit.', description: 'Hand-knit slow fashion made in small batches. Every piece signed by its maker.', website: 'https://www.flexspot.lol/s/looploom', amount: 1, clicks: 8, views: 56, joinedAt: now - 4 * H, trend: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] },
];

export const REWARDS = [
  { slug: 'top-spot', name: 'Top Spot Holder', desc: 'Currently sitting at #1 on the leaderboard.', icon: '👑', check: (spots) => spots[0]?.slug },
  { slug: 'weekly-champion', name: 'Weekly Champion', desc: 'Top-ranked spot over the last 7 days.', icon: '🏆', check: (spots) => spots[0]?.slug },
  { slug: 'fastest-climber', name: 'Fastest Climber', desc: 'Biggest rank jump in the last 24 hours.', icon: '🚀', check: (spots) => spots[3]?.slug },
  { slug: 'most-shared', name: 'Most Shared', desc: 'Most referral clicks this week.', icon: '📣', check: (spots) => spots[1]?.slug },
  { slug: 'community-favorite', name: 'Community Favorite', desc: 'Most profile views in the last 7 days.', icon: '❤️', check: (spots) => spots[2]?.slug },
  { slug: 'early-adopter', name: 'Early Adopter', desc: 'One of the first 100 spots ever claimed.', icon: '⚡', check: () => 'brewline' },
  { slug: 'meme-lord', name: 'Meme Lord', desc: 'The funniest spot on the board — crowned by the community.', icon: '😂', check: (spots) => spots[4]?.slug },
  { slug: 'comeback-king', name: 'Comeback King', desc: 'Stormed back into the top 10 after dropping out.', icon: '🔥', check: (spots) => spots[5]?.slug },
  { slug: 'crowd-puller', name: 'Crowd Puller', desc: 'Pulled the most new visitors in the last 24 hours.', icon: '👀', check: (spots) => spots[6]?.slug },
  { slug: 'diamond-hands', name: 'Diamond Hands', desc: 'Held a top-3 rank for 7 days straight. Unshakeable.', icon: '💎', check: (spots) => spots[1]?.slug },
  { slug: 'night-owl', name: 'Night Owl', desc: 'Biggest overnight climb while everyone was sleeping.', icon: '🦉', check: (spots) => spots[7]?.slug },
];

export const FAQS = [
  { q: 'What is FlexSpot.LOL?', blog: 'what-is-bid-for-attention-marketing', a: 'FlexSpot is the internet\'s public spotlight competition. Anyone can claim a public spot starting from $1, get a shareable profile page, and climb a live leaderboard. The more buzz your spot gets, the higher it ranks — and the more eyes land on you.' },
  { q: 'How does ranking work?', blog: 'how-boosting-moves-you-up-the-leaderboard', a: 'Ranking is simple and transparent: spots are ordered by total verified boosts. Every dollar of buzz moves you up. When you pass someone, you take their rank — live, in front of everyone.' },
  { q: 'What can I promote?', a: 'Almost anything: your personal brand, company, website, social profile, startup, creator page, product, event, or community. If it has a link, it can have a spot.' },
  { q: 'Do I need an account to claim a spot?', blog: 'how-to-claim-your-flexspot-spot', a: 'No. Claiming takes under a minute: enter your details, choose your boost starting at $1, and complete payment. To update your spot details later, contact our team at support@flexspot.lol.' },
  { q: 'How do payments work right now?', a: 'We\'re in Phase 1: after claiming, you complete payment manually and our team verifies it — usually within a few hours. Automatic payment processing is coming soon.' },
  { q: 'Can I pay with crypto or USDT?', blog: 'usdt-vs-card-fees-for-advertising', a: 'Yes. FlexSpot accepts USDT (TRC-20, BEP-20, or Solana) for bids starting from $1 \u2014 handy if you don\'t have a card or you\'re paying cross-border. Crypto payments are final once sent, so double-check the network and address before transferring.' },
  { q: 'How do referrals work?', blog: 'referral-marketing', a: 'Every spot has a personal referral link (flexspot.lol/s/your-brand?ref=YOUR-CODE) — create yours with just your name, no signup. Share it anywhere: Facebook, Telegram, WhatsApp. Every visit through your link automatically adds $1 to that brand\u2019s total (counted once per friend per day), and your name climbs the Top Referrers board and the brand\u2019s Top Supporters list.' },
  { q: 'Can I boost a spot I like?', blog: 'how-boosting-moves-you-up-the-leaderboard', a: 'Yes! Anyone can contribute to any spot to push it higher. It\'s the fastest way to help a friend — or a brand you love — reach #1.' },
  { q: 'Can I compare two spots before boosting?', a: 'Yes — open any spot profile and hit "⚔️ Compare", or go straight to flexspot.lol/compare. Pick up to 3 spots and see rank, total boosts, views, clicks, click-through rate and 7-day momentum side by side, with a live verdict on who leads.' },
  { q: 'How much visibility will my budget get me?', a: 'Try the visibility calculator at flexspot.lol/calculator: slide your budget and campaign length to project your rank, profile views, clicks and cost per 1,000 views, estimated from today\'s live board medians. Estimates only — real results vary.' },
  { q: 'Is there a fee?', a: 'Claiming starts at $1 and 100% of your boost counts toward your ranking. There are no hidden fees to join or appear on the leaderboard.' },
];

export const LIVE_FEED_POOL = [
  ['Nova Studio', 'just claimed a spot'],
  ['Atlas Coffee', 'boosted to #4'],
  ['Pixel Press', 'just claimed a spot'],
  ['June Rivera', 'boosted to #7'],
  ['Orbit Labs', 'just claimed a spot'],
  ['Mango & Co', 'boosted to #3'],
  ['Theo Marchetti', 'just claimed a spot'],
  ['Lumen Studio', 'boosted to #9'],
];
