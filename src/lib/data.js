// Preview dataset — replaced by live Supabase leaderboard when configured.
const now = Date.now();
const H = 3600e3;
const D = 24 * H;

export const DEMO_SPOTS = [
  { slug: 'brewline', seedMove: 0, name: 'Brewline Coffee', tagline: 'Specialty coffee, roasted weekly.', description: 'Small-batch specialty coffee roasted every week and shipped fresh. Built by two baristas who got tired of stale beans.', website: 'https://brewline.co', socials: { x: 'https://x.com/brewline', instagram: 'https://instagram.com/brewline' }, amount: 1240, clicks: 8214, views: 48210, joinedAt: now - 21 * D, trend: [820, 880, 940, 1010, 1090, 1150, 1240] },
  { slug: 'pixelforge', seedMove: 3, name: 'PixelForge', tagline: 'Indie games with soul.', description: 'A three-person indie game studio crafting pixel-art adventures. Our next release drops this winter.', website: 'https://pixelforge.gg', socials: { x: 'https://x.com/pixelforge', instagram: 'https://instagram.com/pixelforge' }, amount: 980, clicks: 6930, views: 39180, joinedAt: now - 19 * D, trend: [700, 760, 810, 860, 910, 950, 980] },
  { slug: 'nomaddesk', seedMove: -1, name: 'Nomad Desk', tagline: 'Gear for remote workers.', description: 'Ergonomic, packable desk gear designed for people who work from anywhere. 40,000+ happy nomads.', website: 'https://nomaddesk.co', socials: { x: 'https://x.com/nomaddesk', instagram: 'https://instagram.com/nomaddesk' }, amount: 862, clicks: 5418, views: 31240, joinedAt: now - 17 * D, trend: [520, 600, 660, 720, 780, 830, 862] },
  { slug: 'lumennotes', seedMove: 2, name: 'Lumen Notes', tagline: 'Your second brain, minus the chaos.', description: 'An AI note-taking app that organizes itself. Capture everything, find anything, in milliseconds.', website: 'https://lumennotes.app', socials: { x: 'https://x.com/lumennotes' }, amount: 718, clicks: 4980, views: 28930, joinedAt: now - 15 * D, trend: [380, 450, 510, 580, 640, 690, 718] },
  { slug: 'voltathletics', seedMove: 5, name: 'Volt Athletics', tagline: 'Run club energy, daily.', description: 'A run club app with live leaderboards, city chapters, and races that actually feel electric.', website: 'https://voltathletics.com', socials: { instagram: 'https://instagram.com/voltathletics' }, amount: 644, clicks: 4210, views: 24680, joinedAt: now - 14 * D, trend: [410, 460, 510, 560, 600, 625, 644] },
  { slug: 'casaverde', seedMove: -2, name: 'Casa Verde', tagline: 'Plants, delivered thriving.', description: 'Rare and easy-care plants delivered to your door with care guides that keep them alive.', website: 'https://casaverde.shop', socials: { instagram: 'https://instagram.com/casaverde' }, amount: 522, clicks: 3860, views: 21340, joinedAt: now - 12 * D, trend: [300, 350, 400, 450, 480, 505, 522] },
  { slug: 'orbitpay', seedMove: 1, name: 'Orbit Pay', tagline: 'Invoices freelancers love.', description: 'Send beautiful invoices and get paid 2x faster. Built for freelancers, by freelancers.', website: 'https://orbitpay.io', socials: { x: 'https://x.com/orbitpay' }, amount: 481, clicks: 3420, views: 19870, joinedAt: now - 11 * D, trend: [260, 310, 360, 410, 440, 465, 481] },
  { slug: 'fernandfable', seedMove: 4, name: 'Fern & Fable', tagline: 'An indie bookstore for dreamers.', description: 'Curated indie bookstore with monthly book boxes and a community of 12,000 readers.', website: 'https://fernandfable.com', socials: { instagram: 'https://instagram.com/fernandfable' }, amount: 409, clicks: 2980, views: 17420, joinedAt: now - 10 * D, trend: [220, 260, 300, 340, 370, 395, 409] },
  { slug: 'snapchef', seedMove: -3, name: 'Snapchef', tagline: 'Meal plans in 30 seconds.', description: 'Snap a photo of your fridge, get a week of meals. AI planning that respects your taste.', website: 'https://snapchef.app', socials: { x: 'https://x.com/snapchef' }, amount: 377, clicks: 2640, views: 15230, joinedAt: now - 9 * D, trend: [180, 220, 260, 300, 330, 360, 377] },
  { slug: 'driftaudio', seedMove: 2, name: 'Drift Audio', tagline: 'Lo-fi label, global community.', description: 'Independent lo-fi label with 200+ artists. Beats to build, study, and drift to.', website: 'https://driftaudio.fm', socials: { x: 'https://x.com/driftaudio', instagram: 'https://instagram.com/driftaudio' }, amount: 341, clicks: 2310, views: 13980, joinedAt: now - 8 * D, trend: [150, 190, 230, 270, 300, 325, 341] },
  { slug: 'terratrails', seedMove: 0, name: 'Terra Trails', tagline: 'Find your next trail.', description: 'A hiking community mapping 50,000+ trails with real photos and difficulty ratings.', website: 'https://terratrails.org', socials: { instagram: 'https://instagram.com/terratrails' }, amount: 292, clicks: 1980, views: 11540, joinedAt: now - 7 * D, trend: [120, 150, 190, 230, 255, 278, 292] },
  { slug: 'bloombox', seedMove: 1, name: 'Bloombox', tagline: 'Skincare that keeps it simple.', description: 'Five products. Zero fluff. Dermatologist-approved skincare shipped monthly.', website: 'https://bloombox.skin', socials: { instagram: 'https://instagram.com/bloombox' }, amount: 251, clicks: 1740, views: 10230, joinedAt: now - 6 * D, trend: [90, 120, 150, 190, 215, 238, 251] },
  { slug: 'kernelpanic', seedMove: -2, name: 'Kernel Panic', tagline: 'A dev podcast with teeth.', description: 'Weekly deep-dives into software engineering, startups, and the occasional rant.', website: 'https://kernelpanic.fm', socials: { x: 'https://x.com/kernelpanicfm' }, amount: 214, clicks: 1420, views: 8640, joinedAt: now - 5 * D, trend: [70, 100, 130, 160, 185, 200, 214] },
  { slug: 'wanderlens', seedMove: 3, name: 'Wander Lens', tagline: 'Travel stories, shot on film.', description: 'A travel creator documenting hidden places across 40 countries — all on film.', website: 'https://wanderlens.co', socials: { x: 'https://x.com/wanderlens', instagram: 'https://instagram.com/wanderlens' }, amount: 183, clicks: 1210, views: 7320, joinedAt: now - 4 * D, trend: [50, 80, 110, 140, 160, 175, 183] },
  { slug: 'motomoto', seedMove: 0, name: 'Moto Moto', tagline: 'E-bikes for the city.', description: 'Affordable e-bike rentals in 12 cities. Grab, ride, return — no strings attached.', website: 'https://motomoto.bike', socials: { instagram: 'https://instagram.com/motomoto' }, amount: 152, clicks: 980, views: 5980, joinedAt: now - 3 * D, trend: [40, 65, 90, 115, 130, 145, 152] },
  { slug: 'sipsociety', seedMove: 1, name: 'Sip Society', tagline: 'Mocktails worth talking about.', description: 'A zero-proof bar crafting mocktails that rival any cocktail. Now bottling for home.', website: 'https://sipsociety.bar', socials: { instagram: 'https://instagram.com/sipsociety' }, amount: 118, clicks: 760, views: 4210, joinedAt: now - 2 * D, trend: [25, 45, 65, 85, 100, 110, 118] },
];

export const REWARDS = [
  { slug: 'top-spot', name: 'Top Spot Holder', desc: 'Currently sitting at #1 on the leaderboard.', icon: '👑', check: (spots) => spots[0]?.slug },
  { slug: 'weekly-champion', name: 'Weekly Champion', desc: 'Highest earner over the last 7 days.', icon: '🏆', check: (spots) => spots[0]?.slug },
  { slug: 'fastest-climber', name: 'Fastest Climber', desc: 'Biggest rank jump in the last 24 hours.', icon: '🚀', check: (spots) => spots[3]?.slug },
  { slug: 'most-shared', name: 'Most Shared', desc: 'Most referral clicks this week.', icon: '📣', check: (spots) => spots[1]?.slug },
  { slug: 'community-favorite', name: 'Community Favorite', desc: 'Most profile views in the last 7 days.', icon: '❤️', check: (spots) => spots[2]?.slug },
  { slug: 'early-adopter', name: 'Early Adopter', desc: 'One of the first 100 spots ever claimed.', icon: '⚡', check: () => 'brewline' },
];

export const FAQS = [
  { q: 'What is FlexSpot.LOL?', a: 'FlexSpot is the internet\'s public spotlight marketplace. Anyone can claim a public spot starting from $1, get a shareable profile page, and climb a live leaderboard. The more support your spot receives, the higher it ranks — and the more eyes land on you.' },
  { q: 'How does ranking work?', a: 'Ranking is simple and transparent: spots are ordered by total verified contributions. Every dollar of support moves you up. When you pass someone, you take their rank — live, in front of everyone.' },
  { q: 'What can I promote?', a: 'Almost anything: your personal brand, company, website, social profile, startup, creator page, product, event, or community. If it has a link, it can have a spot.' },
  { q: 'Do I need an account to claim a spot?', a: 'No. Claiming takes under a minute: enter your details, choose your contribution starting at $1, and complete payment. You\'ll get a management link by email to edit your spot later.' },
  { q: 'How do payments work right now?', a: 'We\'re in Phase 1: after claiming, you complete payment manually and our team verifies it — usually within a few hours. Automatic payment processing is coming soon.' },
  { q: 'How do referrals work?', a: 'Every spot gets a unique referral link (flexspot.lol/s/your-name?ref=CODE). When friends join through your link, your referral stats grow — and referral milestones unlock rewards and ranking boosts.' },
  { q: 'Can I boost a spot I like?', a: 'Yes! Anyone can contribute to any spot to push it higher. It\'s the fastest way to help a friend — or a brand you love — reach #1.' },
  { q: 'Is there a fee?', a: 'Claiming starts at $1 and 100% of your contribution counts toward your ranking. There are no hidden fees to join or appear on the leaderboard.' },
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
