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
  dogedeals: 'meme',
};

export const categoryOf = (spot) =>
  spot?.category || CATEGORY_BY_SLUG[spot?.slug] || 'startups';

export const categoryMeta = (slug) =>
  CATEGORIES.find((c) => c.slug === slug) || { slug, name: 'Startups', icon: '🚀', blurb: '' };


export const DEMO_SPOTS = [
  { slug: 'brewline', seedMove: 0, mark: '☕', name: 'Brewline Coffee', tagline: 'Specialty coffee, roasted weekly.', description: 'Small-batch specialty coffee roasted every week and shipped fresh. Built by two baristas who got tired of stale beans.', website: 'https://brewline.co', socials: { x: 'https://x.com/brewline', instagram: 'https://instagram.com/brewline' }, amount: 1240, clicks: 8214, views: 48210, joinedAt: now - 21 * D, trend: [820, 880, 940, 1010, 1090, 1150, 1240] },
  { slug: 'pixelforge', seedMove: 3, mark: '🎮', name: 'PixelForge', tagline: 'Indie games with soul.', description: 'A three-person indie game studio crafting pixel-art adventures. Our next release drops this winter.', website: 'https://pixelforge.gg', socials: { x: 'https://x.com/pixelforge', instagram: 'https://instagram.com/pixelforge' }, amount: 980, clicks: 6930, views: 39180, joinedAt: now - 19 * D, trend: [700, 760, 810, 860, 910, 950, 980] },
  { slug: 'nomaddesk', seedMove: -1, mark: '💼', name: 'Nomad Desk', tagline: 'Gear for remote workers.', description: 'Ergonomic, packable desk gear designed for people who work from anywhere. 40,000+ happy nomads.', website: 'https://nomaddesk.co', socials: { x: 'https://x.com/nomaddesk', instagram: 'https://instagram.com/nomaddesk' }, amount: 862, clicks: 5418, views: 31240, joinedAt: now - 17 * D, trend: [520, 600, 660, 720, 780, 830, 862] },
  { slug: 'lumennotes', seedMove: 2, mark: '📝', name: 'Lumen Notes', tagline: 'Your second brain, minus the chaos.', description: 'An AI note-taking app that organizes itself. Capture everything, find anything, in milliseconds.', website: 'https://lumennotes.app', socials: { x: 'https://x.com/lumennotes' }, amount: 718, clicks: 4980, views: 28930, joinedAt: now - 15 * D, trend: [380, 450, 510, 580, 640, 690, 718] },
  { slug: 'voltathletics', seedMove: 5, mark: '⚡', name: 'Volt Athletics', tagline: 'Run club energy, daily.', description: 'A run club app with live leaderboards, city chapters, and races that actually feel electric.', website: 'https://voltathletics.com', socials: { instagram: 'https://instagram.com/voltathletics' }, amount: 644, clicks: 4210, views: 24680, joinedAt: now - 14 * D, trend: [410, 460, 510, 560, 600, 625, 644] },
  { slug: 'casaverde', seedMove: -2, mark: '🌿', name: 'Casa Verde', tagline: 'Plants, delivered thriving.', description: 'Rare and easy-care plants delivered to your door with care guides that keep them alive.', website: 'https://casaverde.shop', socials: { instagram: 'https://instagram.com/casaverde' }, amount: 522, clicks: 3860, views: 21340, joinedAt: now - 12 * D, trend: [300, 350, 400, 450, 480, 505, 522] },
  { slug: 'orbitpay', seedMove: 1, mark: '💳', name: 'Orbit Pay', tagline: 'Invoices freelancers love.', description: 'Send beautiful invoices and get paid 2x faster. Built for freelancers, by freelancers.', website: 'https://orbitpay.io', socials: { x: 'https://x.com/orbitpay' }, amount: 481, clicks: 3420, views: 19870, joinedAt: now - 11 * D, trend: [260, 310, 360, 410, 440, 465, 481] },
  { slug: 'fernandfable', seedMove: 4, mark: '📚', name: 'Fern & Fable', tagline: 'An indie bookstore for dreamers.', description: 'Curated indie bookstore with monthly book boxes and a community of 12,000 readers.', website: 'https://fernandfable.com', socials: { instagram: 'https://instagram.com/fernandfable' }, amount: 409, clicks: 2980, views: 17420, joinedAt: now - 10 * D, trend: [220, 260, 300, 340, 370, 395, 409] },
  { slug: 'snapchef', seedMove: -3, mark: '🍳', name: 'Snapchef', tagline: 'Meal plans in 30 seconds.', description: 'Snap a photo of your fridge, get a week of meals. AI planning that respects your taste.', website: 'https://snapchef.app', socials: { x: 'https://x.com/snapchef' }, amount: 377, clicks: 2640, views: 15230, joinedAt: now - 9 * D, trend: [180, 220, 260, 300, 330, 360, 377] },
  { slug: 'driftaudio', seedMove: 2, mark: '🎧', name: 'Drift Audio', tagline: 'Lo-fi label, global community.', description: 'Independent lo-fi label with 200+ artists. Beats to build, study, and drift to.', website: 'https://driftaudio.fm', socials: { x: 'https://x.com/driftaudio', instagram: 'https://instagram.com/driftaudio' }, amount: 341, clicks: 2310, views: 13980, joinedAt: now - 8 * D, trend: [150, 190, 230, 270, 300, 325, 341] },
  { slug: 'terratrails', seedMove: 0, mark: '🥾', name: 'Terra Trails', tagline: 'Find your next trail.', description: 'A hiking community mapping 50,000+ trails with real photos and difficulty ratings.', website: 'https://terratrails.org', socials: { instagram: 'https://instagram.com/terratrails' }, amount: 292, clicks: 1980, views: 11540, joinedAt: now - 7 * D, trend: [120, 150, 190, 230, 255, 278, 292] },
  { slug: 'bloombox', seedMove: 1, mark: '💄', name: 'Bloombox', tagline: 'Skincare that keeps it simple.', description: 'Five products. Zero fluff. Dermatologist-approved skincare shipped monthly.', website: 'https://bloombox.skin', socials: { instagram: 'https://instagram.com/bloombox' }, amount: 251, clicks: 1740, views: 10230, joinedAt: now - 6 * D, trend: [90, 120, 150, 190, 215, 238, 251] },
  { slug: 'kernelpanic', seedMove: -2, mark: '🎙️', name: 'Kernel Panic', tagline: 'A dev podcast with teeth.', description: 'Weekly deep-dives into software engineering, startups, and the occasional rant.', website: 'https://kernelpanic.fm', socials: { x: 'https://x.com/kernelpanicfm' }, amount: 214, clicks: 1420, views: 8640, joinedAt: now - 5 * D, trend: [70, 100, 130, 160, 185, 200, 214] },
  { slug: 'wanderlens', seedMove: 3, mark: '📷', name: 'Wander Lens', tagline: 'Travel stories, shot on film.', description: 'A travel creator documenting hidden places across 40 countries — all on film.', website: 'https://wanderlens.co', socials: { x: 'https://x.com/wanderlens', instagram: 'https://instagram.com/wanderlens' }, amount: 183, clicks: 1210, views: 7320, joinedAt: now - 4 * D, trend: [50, 80, 110, 140, 160, 175, 183] },
  { slug: 'motomoto', seedMove: 0, mark: '🚲', name: 'Moto Moto', tagline: 'E-bikes for the city.', description: 'Affordable e-bike rentals in 12 cities. Grab, ride, return — no strings attached.', website: 'https://motomoto.bike', socials: { instagram: 'https://instagram.com/motomoto' }, amount: 152, clicks: 980, views: 5980, joinedAt: now - 3 * D, trend: [40, 65, 90, 115, 130, 145, 152] },
  { slug: 'sipsociety', seedMove: 1, mark: '🍸', name: 'Sip Society', tagline: 'Mocktails worth talking about.', description: 'A zero-proof bar crafting mocktails that rival any cocktail. Now bottling for home.', website: 'https://sipsociety.bar', socials: { instagram: 'https://instagram.com/sipsociety' }, amount: 118, clicks: 760, views: 4210, joinedAt: now - 2 * D, trend: [25, 45, 65, 85, 100, 110, 118] },
  { slug: 'neonnoodles', seedMove: 4, mark: '🍜', name: 'Neon Noodles', tagline: 'Ramen at 2am, delivered loud.', description: 'A late-night ramen spot with a cult following. Bold broth, neon vibes, zero regrets.', website: 'https://neonnoodles.shop', socials: { instagram: 'https://instagram.com/neonnoodles' }, amount: 106, clicks: 690, views: 3890, joinedAt: now - 36 * H, trend: [20, 38, 55, 72, 88, 98, 106] },
  { slug: 'pixelpaws', seedMove: 6, mark: '🐾', name: 'Pixel Paws', tagline: 'Pet portraits, pixelated.', description: 'We turn your pets into glorious pixel art. 20,000+ portraits and counting.', website: 'https://pixelpaws.art', socials: { x: 'https://x.com/pixelpaws', instagram: 'https://instagram.com/pixelpaws' }, amount: 95, clicks: 640, views: 3540, joinedAt: now - 30 * H, trend: [15, 30, 48, 62, 76, 88, 95] },
  { slug: 'hustlehoney', seedMove: -1, mark: '🍯', name: 'Hustle Honey', tagline: 'Raw honey, real hustle.', description: 'Small-batch raw honey from urban rooftops. Sweet, sustainable, and straight from the hive.', website: 'https://hustlehoney.co', socials: { instagram: 'https://instagram.com/hustlehoney' }, amount: 84, clicks: 580, views: 3120, joinedAt: now - 26 * H, trend: [30, 42, 55, 64, 72, 79, 84] },
  { slug: 'codechai', seedMove: 3, mark: '☕', name: 'Code & Chai', tagline: 'A dev newsletter with flavor.', description: 'Weekly coding wisdom served with desi chai energy. Read by 45,000 developers.', website: 'https://codechai.dev', socials: { x: 'https://x.com/codechai' }, amount: 73, clicks: 510, views: 2870, joinedAt: now - 22 * H, trend: [12, 25, 38, 50, 60, 68, 73] },
  { slug: 'gymbroskis', seedMove: 2, mark: '💪', name: 'Gym Broskis', tagline: 'Lift heavy, laugh harder.', description: 'A fitness meme page turned coaching brand. 500K followers strong and growing.', website: 'https://gymbroskis.fit', socials: { instagram: 'https://instagram.com/gymbroskis' }, amount: 66, clicks: 460, views: 2540, joinedAt: now - 20 * H, trend: [10, 22, 34, 46, 55, 61, 66] },
  { slug: 'memevault', seedMove: 5, mark: '🗿', name: 'Meme Vault', tagline: 'Certified dank, daily.', description: 'The internet\u2019s freshest meme vault. New drops every day, zero stale memes.', website: 'https://memevault.lol', socials: { x: 'https://x.com/memevault', instagram: 'https://instagram.com/memevault' }, amount: 58, clicks: 410, views: 2280, joinedAt: now - 18 * H, trend: [8, 18, 28, 38, 47, 53, 58] },
  { slug: 'swiftship', seedMove: 1, mark: '📦', name: 'SwiftShip', tagline: 'Ship it before lunch.', description: 'Launch your MVP in a weekend with our starter kits. Loved by indie hackers.', website: 'https://swiftship.dev', socials: { x: 'https://x.com/swiftship' }, amount: 51, clicks: 370, views: 2010, joinedAt: now - 16 * H, trend: [10, 18, 27, 35, 42, 47, 51] },
  { slug: 'auraaesthetics', seedMove: 0, mark: '✨', name: 'Aura Aesthetics', tagline: 'Glow up, scientifically.', description: 'Skin science made simple. Personalized routines backed by dermatologists.', website: 'https://auraaesthetics.skin', socials: { instagram: 'https://instagram.com/auraaesthetics' }, amount: 43, clicks: 320, views: 1780, joinedAt: now - 14 * H, trend: [6, 14, 22, 30, 36, 40, 43] },
  { slug: 'podsquad', seedMove: 2, mark: '🎙️', name: 'PodSquad', tagline: 'Podcasts for the group chat.', description: 'Three friends, one mic, zero filter. Weekly episodes on culture and chaos.', website: 'https://podsquad.fm', socials: { x: 'https://x.com/podsquad', instagram: 'https://instagram.com/podsquad' }, amount: 35, clicks: 280, views: 1520, joinedAt: now - 12 * H, trend: [5, 11, 17, 24, 29, 32, 35] },
  { slug: 'fitfuel', seedMove: -2, mark: '🥤', name: 'FitFuel', tagline: 'Fuel your grind.', description: 'Clean pre-workout without the jitters. Natural caffeine, real fruit flavors.', website: 'https://fitfuel.nutrition', socials: { instagram: 'https://instagram.com/fitfuel' }, amount: 27, clicks: 230, views: 1240, joinedAt: now - 10 * H, trend: [4, 9, 14, 19, 23, 25, 27] },
  { slug: 'clipcraft', seedMove: 3, mark: '🎬', name: 'ClipCraft', tagline: 'Viral clips in one tap.', description: 'Turn long videos into viral shorts automatically. Creators grow 10x faster.', website: 'https://clipcraft.ai', socials: { x: 'https://x.com/clipcraft', instagram: 'https://instagram.com/clipcraft' }, amount: 18, clicks: 180, views: 960, joinedAt: now - 8 * H, trend: [2, 6, 10, 13, 15, 17, 18] },
  { slug: 'dogedeals', seedMove: 7, mark: '🐶', name: 'Doge Deals', tagline: 'Much deals. Very wow.', description: 'The meme-iest deals page on the internet. Discounts so good they should be illegal.', website: 'https://dogedeals.lol', socials: { x: 'https://x.com/dogedeals' }, amount: 9, clicks: 140, views: 720, joinedAt: now - 5 * H, trend: [1, 2, 4, 6, 7, 8, 9] },
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
  { q: 'What is FlexSpot.LOL?', a: 'FlexSpot is the internet\'s public spotlight competition. Anyone can claim a public spot starting from $1, get a shareable profile page, and climb a live leaderboard. The more buzz your spot gets, the higher it ranks — and the more eyes land on you.' },
  { q: 'How does ranking work?', a: 'Ranking is simple and transparent: spots are ordered by total verified boosts. Every dollar of buzz moves you up. When you pass someone, you take their rank — live, in front of everyone.' },
  { q: 'What can I promote?', a: 'Almost anything: your personal brand, company, website, social profile, startup, creator page, product, event, or community. If it has a link, it can have a spot.' },
  { q: 'Do I need an account to claim a spot?', a: 'No. Claiming takes under a minute: enter your details, choose your boost starting at $1, and complete payment. To update your spot details later, contact our team at support@flexspot.lol.' },
  { q: 'How do payments work right now?', a: 'We\'re in Phase 1: after claiming, you complete payment manually and our team verifies it — usually within a few hours. Automatic payment processing is coming soon.' },
  { q: 'How do referrals work?', a: 'Every spot has a personal referral link (flexspot.lol/s/your-brand?ref=YOUR-CODE) — create yours with just your name, no signup. Share it anywhere: Facebook, Telegram, WhatsApp. Every visit through your link automatically adds $1 to that brand\u2019s total (counted once per friend per day), and your name climbs the Top Referrers board and the brand\u2019s Top Supporters list.' },
  { q: 'Can I boost a spot I like?', a: 'Yes! Anyone can contribute to any spot to push it higher. It\'s the fastest way to help a friend — or a brand you love — reach #1.' },
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
