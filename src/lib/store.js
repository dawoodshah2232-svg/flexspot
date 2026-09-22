import { DEMO_SPOTS } from './data';

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const IS_LIVE = !!(SUPA_URL && SUPA_KEY);

const LS_SPOTS = 'flexspot_local_spots_v2';
const LS_SUBMISSIONS = 'flexspot_submissions_v2';
const LS_CLICKS = 'flexspot_local_clicks';
const LS_REFS = 'flexspot_local_refs';
const LS_BOOSTS = 'flexspot_local_boosts';
const LS_RANKS = 'flexspot_rank_snapshot';
const LS_CMS = 'flexspot_cms_v2';
const LS_ANALYTICS = 'flexspot_analytics_v2';
const LS_VISITS = 'flexspot_visits_v2';

const readLS = (k, fb) => {
  try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fb; } catch { return fb; }
};
const writeLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

async function rpc(name, body) {
  const r = await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` },
    body: JSON.stringify(body || {}),
  });
  if (!r.ok) throw new Error('rpc failed');
  return r.json();
}

function mapLiveRow(row) {
  return {
    id: row.id,
    slug: row.slug || row.id,
    name: row.name,
    tagline: row.tagline || '',
    description: row.description || '',
    website: row.destination_url || '',
    socials: {},
    amount: Number(row.total_cents || 0) / 100,
    clicks: Number(row.clicks || 0),
    views: Number(row.views || 0),
    joinedAt: row.created_at || Date.now(),
    trend: [],
    live: true,
  };
}

export async function fetchLeaderboard() {
  if (IS_LIVE) {
    try {
      const data = await rpc('get_leaderboard', { p_board: 'all_time' });
      const live = (Array.isArray(data) ? data : []).map(mapLiveRow);
      if (live.length) return withMovement(rank(live));
    } catch { /* fall through to demo */ }
  }
  const local = readLS(LS_SPOTS, []).filter((s) => !s.pending);
  const boosts = readLS(LS_BOOSTS, {});
  const clicks = readLS(LS_CLICKS, {});
  const withBoosts = (s) => ({
    ...s,
    amount: s.amount + (boosts[s.slug] || 0),
    clicks: s.clicks + (clicks[s.slug] || 0),
  });
  // Every payer lands on the board immediately — even $1. Submissions that
  // are still awaiting payment review rank by their pledged amount and carry
  // a visible `pending` badge until the admin approves them.
  const seen = new Set([...DEMO_SPOTS, ...local].map((s) => s.slug));
  const pendingSubs = [];
  for (const s of readLS(LS_SUBMISSIONS, [])) {
    if (s.status !== 'pending' || s.isBoost || !s.slug || seen.has(s.slug)) continue;
    seen.add(s.slug);
    pendingSubs.push({
      id: 'pending-' + s.id,
      slug: s.slug,
      name: s.brandName,
      tagline: s.tagline || '',
      description: s.description || '',
      logo: s.logo || null,
      website: s.website || '',
      socials: s.socials || {},
      amount: Number(s.amount) || 0,
      category: s.category || 'startups',
      clicks: 0,
      views: 0,
      joinedAt: s.createdAt || Date.now(),
      trend: [Number(s.amount) || 0],
      pending: true,
    });
  }
  const merged = [...DEMO_SPOTS.map(withBoosts), ...local.map(withBoosts), ...pendingSubs];
  return withMovement(rank(merged));
}

// Pending submissions (shown on the board with a badge + queued in Admin)
export function fetchPendingSpots() {
  if (IS_LIVE) return [];
  const subs = readLS(LS_SUBMISSIONS, []);
  const pending = subs.filter((s) => s.status === 'pending');
  const legacy = readLS('flexspot_local_spots', []).filter((s) => s.pending);
  return [...pending, ...legacy];
}

// All submissions regardless of status (admin queue)
export function fetchAllSubmissions() {
  if (IS_LIVE) return [];
  return readLS(LS_SUBMISSIONS, []);
}

// --- Extended submission lifecycle ----------------------------------------
// Statuses: pending → approved | rejected | changes-requested
// A submitted claim carries payment proof, an admin note trail, and optional
// fraud flags. This mirrors what the admin queue needs to render.
export function createSubmission(payload) {
  const submission = {
    id: 'sub-' + Date.now().toString(36),
    slug: payload.slug,
    brandName: payload.name,
    tagline: payload.tagline || '',
    description: payload.description || '',
    logo: payload.logo || null, // data URL (preview) or remote URL
    website: payload.website || '',
    socials: payload.socials || {},
    email: payload.email || '',
    amount: Number(payload.amount) || 1,
    category: payload.category || 'startups',
    // Payment proof (Phase 1: manual verification)
    paymentMethod: payload.paymentMethod || '',
    paymentTxId: payload.paymentTxId || '',
    paymentScreenshot: payload.paymentScreenshot || null, // data URL preview
    // Lifecycle
    status: 'pending',
    adminNotes: [],
    fraudFlags: [],
    history: [{ at: Date.now(), event: 'submitted' }],
    createdAt: Date.now(),
    reviewedAt: null,
    // Boost submissions reference the existing spot they add to
    isBoost: !!payload.isBoost,
    boostSlug: payload.boostSlug || null,
    contributorName: payload.contributorName || '',
    contributorHandle: payload.contributorHandle || '',
  };
  const subs = readLS(LS_SUBMISSIONS, []);
  writeLS(LS_SUBMISSIONS, [submission, ...subs]);
  return submission;
}

export function getSubmission(id) {
  return readLS(LS_SUBMISSIONS, []).find((s) => s.id === id);
}

export function updateSubmission(id, patch) {
  const subs = readLS(LS_SUBMISSIONS, []);
  const next = subs.map((s) => {
    if (s.id !== id) return s;
    const { history, ...rest } = patch;
    // patch.history, when present, is the complete new history array
    // (callers build it from the existing history). Replace, don't append,
    // to avoid duplicating entries.
    return { ...s, ...rest, history: history !== undefined ? history : (s.history || []) };
  });
  writeLS(LS_SUBMISSIONS, next);
  return next.find((s) => s.id === id);
}

export function addAdminNote(id, note) {
  if (!note) return;
  const sub = getSubmission(id);
  if (!sub) return;
  updateSubmission(id, {
    adminNotes: [...(sub.adminNotes || []), { at: Date.now(), text: note }],
  });
}

export function flagSubmission(id, flag) {
  if (!flag) return;
  const sub = getSubmission(id);
  if (!sub) return;
  const fraudFlags = [...(sub.fraudFlags || [])];
  if (!fraudFlags.includes(flag)) fraudFlags.push(flag);
  updateSubmission(id, { fraudFlags });
}

export function reviewSubmission(id, decision, note) {
  // decision: 'approved' | 'rejected' | 'changes-requested'
  const sub = getSubmission(id);
  if (!sub) return null;
  const history = [
    ...(sub.history || []),
    { at: Date.now(), event: 'decision', decision, note: note || '' },
  ];
  const patch = { status: decision, reviewedAt: Date.now(), history };
  if (note) patch.adminNotes = [...(sub.adminNotes || []), { at: Date.now(), text: note }];
  const updated = updateSubmission(id, patch);
  if (decision === 'approved') {
    if (sub.isBoost && sub.boostSlug) {
      // Approved boost: add to the existing spot's total instead of a new entry.
      const boosts = readLS(LS_BOOSTS, {});
      boosts[sub.boostSlug] = (boosts[sub.boostSlug] || 0) + sub.amount;
      writeLS(LS_BOOSTS, boosts);
    } else {
      // Activating the listing: it now ranks on the leaderboard.
      const local = readLS(LS_SPOTS, []);
      const spot = {
        id: 'local-' + sub.id,
        slug: sub.slug,
        name: sub.brandName,
        tagline: sub.tagline,
        description: sub.description,
        website: sub.website,
        socials: sub.socials,
        logo: sub.logo,
        amount: sub.amount,
        category: sub.category || 'startups',
        clicks: 0,
        views: 1,
        joinedAt: Date.now(),
        trend: [sub.amount],
        pending: false,
        email: sub.email,
        approvedAt: Date.now(),
      };
      if (!local.some((s) => s.slug === sub.slug)) writeLS(LS_SPOTS, [spot, ...local]);
    }
  }
  return updated;
}

// Back-compat helpers for the older single-list flow.
export function approveLocalSpot(slug) {
  const subs = readLS(LS_SUBMISSIONS, []);
  const sub = subs.find((s) => s.slug === slug && s.status === 'pending');
  if (sub) return reviewSubmission(sub.id, 'approved', 'Approved from legacy queue');
  const local = readLS('flexspot_local_spots', []);
  const next = local.map((s) => (s.slug === slug ? { ...s, pending: false } : s));
  writeLS('flexspot_local_spots', next);
  const v2 = readLS(LS_SPOTS, []);
  const nv2 = v2.map((s) => (s.slug === slug ? { ...s, pending: false } : s));
  writeLS(LS_SPOTS, nv2);
  return next;
}

export function removeLocalSpot(slug) {
  writeLS('flexspot_local_spots', readLS('flexspot_local_spots', []).filter((s) => s.slug !== slug));
  writeLS(LS_SPOTS, readLS(LS_SPOTS, []).filter((s) => s.slug !== slug));
}

export function rank(spots) {
  // Ranking rule: highest amount wins. On equal amounts, whoever got there
  // FIRST ranks higher (joinedAt ascending). Even $0.01 more outranks.
  const sorted = [...spots].sort(
    (a, b) => b.amount - a.amount || (a.joinedAt || 0) - (b.joinedAt || 0)
  );
  return sorted.map((s, i) => ({ ...s, rank: i + 1 }));
}

// Projected rank for a boost: where `slug` would land if `addedAmount` were
// added to its total right now. Uses the exact same rule as rank(), so the
// preview always matches the real board. Returns { rank, above } where
// `above` is the brand directly ahead (null at #1).
export function projectedRank(spots, slug, addedAmount) {
  const amt = Math.max(0, Math.round(Number(addedAmount || 0) * 100) / 100);
  const list = (spots || []).map((s) =>
    s.slug === slug ? { ...s, amount: (s.amount || 0) + amt } : { ...s }
  );
  const ranked = rank(list);
  const idx = ranked.findIndex((s) => s.slug === slug);
  if (idx < 0) return { rank: ranked.length + 1, above: ranked[ranked.length - 1] || null };
  return { rank: idx + 1, above: idx > 0 ? ranked[idx - 1] : null };
}

// Admin manual entry: add a brand straight onto the leaderboard (e.g. cash
// paid off-platform). Rank is computed by the same rule as everyone else.
export function addManualSpot({ name, tagline, description, website, socials, logo, email, amount, category }) {
  const slug = slugify(name) + '-' + Math.random().toString(36).slice(2, 6);
  const spot = {
    id: 'manual-' + Date.now().toString(36),
    slug,
    name: String(name || 'Unnamed').trim().slice(0, 60),
    tagline: String(tagline || '').trim().slice(0, 100) || 'On FlexSpot.LOL',
    description: String(description || '').trim().slice(0, 1000),
    website: website || '',
    socials: socials || {},
    logo: logo || null,
    email: email || '',
    amount: Math.max(1, Math.round(Number(amount || 1) * 100) / 100),
    category: category || 'startups',
    clicks: 0,
    views: 1,
    joinedAt: Date.now(),
    trend: [Number(amount || 1)],
    pending: false,
    manual: true,
    approvedAt: Date.now(),
  };
  const local = readLS(LS_SPOTS, []);
  writeLS(LS_SPOTS, [spot, ...local]);
  return spot;
}

// True rank-movement tracking: compares current ranks against the last saved
// snapshot. Positive move = climbed (old rank - new rank). On first run, demo
// spots can seed movement via `seedMove` so the UI demonstrates the indicators.
export function withMovement(spots) {
  let snap = {};
  try { snap = JSON.parse(localStorage.getItem(LS_RANKS)) || {}; } catch {}
  const firstRun = Object.keys(snap).length === 0;
  const out = spots.map((s) => {
    let move = 0;
    if (firstRun) move = s.seedMove || 0;
    else if (snap[s.slug] !== undefined) move = snap[s.slug] - s.rank;
    return { ...s, move };
  });
  saveRankSnapshot(spots);
  return out;
}

export function saveRankSnapshot(spots) {
  try {
    const snap = {};
    spots.forEach((s) => { snap[s.slug] = s.rank; });
    localStorage.setItem(LS_RANKS, JSON.stringify(snap));
  } catch {}
}

export function getSpot(slug, spots) {
  return (spots || []).find((s) => s.slug === slug);
}

// Local (demo-mode) submission — used when Supabase isn't configured.
// When live, submissions go through the create-submission edge function.
export async function submitSpot(payload) {
  if (IS_LIVE) {
    const fn = `${SUPA_URL}/functions/v1/create-submission`;
    const r = await fetch(fn, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` },
      body: JSON.stringify({
        name: payload.name,
        tagline: payload.tagline,
        url: payload.website,
        amount: payload.amount,
        logoUrl: payload.logo || null,
      }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.error || 'Submission failed');
    return { ok: true, live: true, data };
  }
  const spot = {
    id: 'local-' + Date.now(),
    slug: payload.slug,
    name: payload.name,
    tagline: payload.tagline,
    description: payload.description,
    website: payload.website,
    socials: payload.socials,
    logo: payload.logo || null,
    amount: payload.amount,
    clicks: 0,
    views: 1,
    joinedAt: Date.now(),
    trend: [payload.amount],
    pending: !payload.autoApprove,
    email: payload.email,
    gift: payload.gift || null,
  };
  // Boosts add to an existing spot's total instead of creating a duplicate entry
  if (payload.isBoost) {
    const boosts = readLS(LS_BOOSTS, {});
    boosts[payload.slug] = (boosts[payload.slug] || 0) + payload.amount;
    writeLS(LS_BOOSTS, boosts);
    return { ok: true, live: false, boosted: true };
  }
  const local = readLS(LS_SPOTS, []);
  writeLS(LS_SPOTS, [spot, ...local]);
  return { ok: true, live: false, spot };
}

export function recordClick(slug) {
  const clicks = readLS(LS_CLICKS, {});
  clicks[slug] = (clicks[slug] || 0) + 1;
  writeLS(LS_CLICKS, clicks);
}

export function recordReferralClick(code) {
  const refs = readLS(LS_REFS, {});
  refs[code] = refs[code] || { clicks: 0, joined: 0 };
  refs[code].clicks += 1;
  writeLS(LS_REFS, refs);
}

export function recordReferralJoin(code) {
  const refs = readLS(LS_REFS, {});
  refs[code] = refs[code] || { clicks: 0, joined: 0 };
  refs[code].joined += 1;
  writeLS(LS_REFS, refs);
}

export function getReferralStats(code) {
  return readLS(LS_REFS, {})[code] || { clicks: 0, joined: 0 };
}

export function refCodeFor(slug) {
  return 'FS-' + String(slug).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
}

// --- Contributions ("Boost squad") ----------------------------------------
// Anyone can chip in $1+ on any brand. The contributor's name + handle shows
// on the brand's page instantly (the boost amount itself lands after payment
// verification). Stored per spot slug, newest first.
const LS_CONTRIB = 'flexspot_contributions_v2';

const DEMO_CONTRIBUTIONS = {
  brewline: [
    { name: 'Sara K.', handle: '@sara.brews', amount: 50, at: Date.now() - 2 * 3600e3, demo: true },
    { name: 'Caffeine Club', handle: 'caffeineclub.co', amount: 25, at: Date.now() - 26 * 3600e3, demo: true },
    { name: 'Mike D.', handle: '@mike_dxb', amount: 10, at: Date.now() - 3 * 86400e3, demo: true },
  ],
  pixelforge: [
    { name: 'Aisha R.', handle: '@aisha.plays', amount: 30, at: Date.now() - 5 * 3600e3, demo: true },
    { name: 'Retro Gamers', handle: 'discord.gg/retro', amount: 15, at: Date.now() - 2 * 86400e3, demo: true },
  ],
  lumennotes: [
    { name: 'June Rivera', handle: '@june.rivera', amount: 20, at: Date.now() - 8 * 3600e3, demo: true },
    { name: 'Note Nerds', handle: '@notenerds', amount: 5, at: Date.now() - 4 * 86400e3, demo: true },
  ],
  voltathletics: [
    { name: 'Omar F.', handle: 'RunDXB crew', amount: 12, at: Date.now() - 12 * 3600e3, demo: true },
  ],
  nomaddesk: [
    { name: 'Lena W.', handle: '@lena.works', amount: 18, at: Date.now() - 30 * 3600e3, demo: true },
    { name: 'Remote OK', handle: 'remoteok.com', amount: 8, at: Date.now() - 5 * 86400e3, demo: true },
  ],
};

function ensureContribSeed() {
  try {
    if (localStorage.getItem(LS_CONTRIB) !== null) return;
    writeLS(LS_CONTRIB, DEMO_CONTRIBUTIONS);
  } catch {}
}

export function getContributions(slug) {
  ensureContribSeed();
  const all = readLS(LS_CONTRIB, {});
  return (all[slug] || []).slice().sort((a, b) => (b.at || 0) - (a.at || 0));
}

export function addContribution(slug, { name, handle, amount }) {
  if (!slug) return null;
  ensureContribSeed();
  const all = readLS(LS_CONTRIB, {});
  const entry = {
    name: String(name || 'Anonymous booster').slice(0, 40),
    handle: String(handle || '').slice(0, 40),
    amount: Math.max(1, Math.round(Number(amount || 1) * 100) / 100),
    at: Date.now(),
  };
  all[slug] = [...(all[slug] || []), entry].slice(-60);
  writeLS(LS_CONTRIB, all);
  return entry;
}

// --- Content settings (admin-managed CMS, local preview) ------------------
const DEFAULT_CMS = {
  heroHeadline: 'BIG BRAND VISIBILITY. START FROM JUST $1.',
  heroSub: 'Claim your spotlight, climb the rankings, drive real traffic, and become part of a community that supports great brands.',
  announcement: '',
  rewardsText: '',
  minAmount: 1,
  featuredSlugs: [],
  faq: [
    { q: 'How does FlexSpot work?', a: 'Claim a spot, land on the leaderboard instantly with a pending badge, then get verified as your payment clears and climb.' },
    { q: 'How long does approval take?', a: 'Most submissions are reviewed within 24 hours.' },
  ],
};

export function getCMS() {
  return { ...DEFAULT_CMS, ...readLS(LS_CMS, {}) };
}

export function saveCMS(patch) {
  const next = { ...getCMS(), ...patch };
  writeLS(LS_CMS, next);
  return next;
}

// --- Preview analytics (clearly simulated — never presented as live) ------
// Tracks page views, clicks, sources, countries locally for the admin preview.
export function recordVisit(path, { source = 'direct', country = '—' } = {}) {
  if (typeof window === 'undefined') return;
  const visits = readLS(LS_VISITS, []);
  visits.push({ at: Date.now(), path, source, country });
  writeLS(LS_VISITS, visits.slice(-2000));
}

export function recordProfileClick(slug) {
  const a = readLS(LS_ANALYTICS, { clicksBySlug: {}, totalClicks: 0 });
  a.clicksBySlug[slug] = (a.clicksBySlug[slug] || 0) + 1;
  a.totalClicks += 1;
  writeLS(LS_ANALYTICS, a);
}

// Summary for the admin Analytics tab. Values are derived from local preview
// storage and must be labeled "preview" in the UI.
export function getAnalyticsSummary(spots) {
  const visits = readLS(LS_VISITS, []);
  const a = readLS(LS_ANALYTICS, { clicksBySlug: {}, totalClicks: 0 });
  const submissions = readLS(LS_SUBMISSIONS, []);
  const byPath = {};
  const bySource = {};
  const byCountry = {};
  visits.forEach((v) => {
    byPath[v.path] = (byPath[v.path] || 0) + 1;
    bySource[v.source] = (bySource[v.source] || 0) + 1;
    byCountry[v.country] = (byCountry[v.country] || 0) + 1;
  });
  const topBrands = [...(spots || [])]
    .sort((x, y) => (y.views || 0) - (x.views || 0))
    .slice(0, 5)
    .map((s) => ({ slug: s.slug, name: s.name, views: s.views || 0, clicks: s.clicks || 0 }));
  const top = (obj, n = 5) =>
    Object.entries(obj).sort((x, y) => y[1] - x[1]).slice(0, n).map(([k, v]) => ({ k, v }));
  return {
    preview: true,
    totalVisits: visits.length,
    totalClicks: a.totalClicks,
    claimedSpots: (spots || []).length,
    conversionRate: visits.length
      ? Math.round((submissions.length / visits.length) * 1000) / 10
      : 0,
    byPath: top(byPath),
    bySource: top(bySource),
    byCountry: top(byCountry),
    topBrands,
  };
}
