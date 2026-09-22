import { DEMO_SPOTS } from './data';

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const IS_LIVE = !!(SUPA_URL && SUPA_KEY);

const LS_SPOTS = 'flexspot_local_spots';
const LS_CLICKS = 'flexspot_local_clicks';
const LS_REFS = 'flexspot_local_refs';
const LS_BOOSTS = 'flexspot_local_boosts';

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
      if (live.length) return rank(live);
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
  const merged = [...DEMO_SPOTS.map(withBoosts), ...local.map(withBoosts)];
  return rank(merged);
}

// Pending submissions (visible in Admin only)
export function fetchPendingSpots() {
  if (IS_LIVE) return [];
  return readLS(LS_SPOTS, []).filter((s) => s.pending);
}

export function rank(spots) {
  const sorted = [...spots].sort((a, b) => b.amount - a.amount);
  return sorted.map((s, i) => ({ ...s, rank: i + 1 }));
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

export function approveLocalSpot(slug) {
  const local = readLS(LS_SPOTS, []);
  const next = local.map((s) => (s.slug === slug ? { ...s, pending: false } : s));
  writeLS(LS_SPOTS, next);
  return next;
}

export function removeLocalSpot(slug) {
  writeLS(LS_SPOTS, readLS(LS_SPOTS, []).filter((s) => s.slug !== slug));
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
