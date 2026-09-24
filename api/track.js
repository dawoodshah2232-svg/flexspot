// Real visitor tracking (Vercel KV) — the admin's server-side source of truth
// for site traffic. Replaces the old localStorage-only "analytics", which
// could only ever see visits in the admin's own browser.
//
// POST /api/track            public beacon — { t:'view'|'beat'|'leave'|'event',
//                             vid, page, ref, dev, ms, name }
// GET  /api/track?public=1    public — { online } live visitor count only
// GET  /api/track?days=7      admin (x-admin-pin) — aggregated traffic stats
// GET  /api/track?trail=vid  admin (x-admin-pin) — one visitor's page trail
//
// Privacy: no IP stored, no cookies — just a random visitor id in the
// visitor's own localStorage. Daily keys expire after 45 days.
import { kv, json, ADMIN_PIN } from './_lib/mail.js';

const DAY_MS = 86400000;
const ONLINE_WINDOW_MS = 90000;
const DAILY_TTL = 45 * DAY_MS / 1000;

const dayKey = (ts) => new Date(ts).toISOString().slice(0, 10);
const K = {
  pv: (d) => `trk:pv:${d}`,
  vis: (d) => `trk:vis:${d}`,
  ref: (d) => `trk:ref:${d}`,
  dev: (d) => `trk:dev:${d}`,
  ev: (d) => `trk:ev:${d}`,
  tm: (d) => `trk:tm:${d}`,
  tmc: (d) => `trk:tmc:${d}`,
  online: 'trk:online',
  trail: (vid) => `trk:trail:${vid}`,
};

function parseBody(req) {
  try {
    return typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch { return null; }
}

const cleanVid = (v) => (/^[A-Za-z0-9-]{1,44}$/.test(String(v || '')) ? String(v) : null);
const cleanPage = (p) => {
  let s = String(p || '/').slice(0, 120);
  if (!s.startsWith('/')) s = '/' + s;
  return s;
};
const cleanDev = (d) => (d === 'desktop' ? 'desktop' : 'mobile');
const refHost = (r) => {
  const s = String(r || '').slice(0, 300);
  if (!s) return 'direct';
  try {
    const u = new URL(s);
    if (u.hostname.endsWith('flexspot.lol')) return 'direct';
    return u.hostname.replace(/^www\./, '').slice(0, 80) || 'referral';
  } catch { return 'referral'; }
};

async function record(store, b) {
  const vid = cleanVid(b.vid);
  const page = cleanPage(b.page);
  if (!vid) return;
  const t = b.t === 'beat' ? 'beat' : b.t === 'leave' ? 'leave' : b.t === 'event' ? 'event' : 'view';
  const now = Date.now();
  const d = dayKey(now);
  const dev = cleanDev(b.dev);

  if (t === 'beat') {
    await store.hset(K.online, { [vid]: JSON.stringify({ ts: now, page, dev }) });
    await store.expire(K.online, 600);
    return;
  }
  if (t === 'leave') {
    const ms = Math.max(0, Math.min(1800000, Math.floor(Number(b.ms) || 0)));
    if (ms > 0) {
      await store.hincrby(K.tm(d), page, ms);
      await store.hincrby(K.tmc(d), page, 1);
      await store.expire(K.tm(d), DAILY_TTL);
      await store.expire(K.tmc(d), DAILY_TTL);
    }
    await store.hdel(K.online, vid);
    return;
  }
  if (t === 'event') {
    const name = String(b.name || '').toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 40);
    if (!name) return;
    await store.hincrby(K.ev(d), name, 1);
    await store.expire(K.ev(d), DAILY_TTL);
    await store.lpush(K.trail(vid), JSON.stringify({ t: now, k: 'e', p: name }));
    await store.ltrim(K.trail(vid), 0, 80);
    await store.expire(K.trail(vid), 7 * 86400);
    return;
  }
  // view
  const host = refHost(b.ref);
  await store.hincrby(K.pv(d), page, 1);
  await store.sadd(K.vis(d), vid);
  await store.hincrby(K.ref(d), host, 1);
  await store.hincrby(K.dev(d), dev, 1);
  await store.lpush(K.trail(vid), JSON.stringify({ t: now, k: 'p', p: page }));
  await store.ltrim(K.trail(vid), 0, 80);
  await store.expire(K.trail(vid), 7 * 86400);
  for (const key of [K.pv(d), K.vis(d), K.ref(d), K.dev(d)]) await store.expire(key, DAILY_TTL);
  // mark online too — a fresh view counts as a heartbeat
  await store.hset(K.online, { [vid]: JSON.stringify({ ts: now, page, dev }) });
  await store.expire(K.online, 600);
}

async function onlineList(store) {
  const raw = (await store.hgetall(K.online)) || {};
  const now = Date.now();
  const out = [];
  const stale = [];
  for (const [vid, s] of Object.entries(raw)) {
    try {
      const o = JSON.parse(s);
      if (now - o.ts < ONLINE_WINDOW_MS) out.push({ vid, page: o.page || '/', dev: o.dev || 'mobile', ts: o.ts });
      else stale.push(vid);
    } catch { stale.push(vid); }
  }
  if (stale.length) await store.hdel(K.online, ...stale);
  return out;
}

async function dayStats(store, d) {
  const [visitors, pv, ref, dev, ev, tm, tmc] = await Promise.all([
    store.scard(K.vis(d)),
    store.hgetall(K.pv(d)),
    store.hgetall(K.ref(d)),
    store.hgetall(K.dev(d)),
    store.hgetall(K.ev(d)),
    store.hgetall(K.tm(d)),
    store.hgetall(K.tmc(d)),
  ]);
  const views = Object.values(pv || {}).reduce((a, v) => a + Number(v || 0), 0);
  return { d, visitors: visitors || 0, views, pv: pv || {}, ref: ref || {}, dev: dev || {}, ev: ev || {}, tm: tm || {}, tmc: tmc || {} };
}

const top = (obj, n) =>
  Object.entries(obj || {})
    .map(([k, v]) => [k, Number(v) || 0])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);

export default async function handler(req, res) {
  const store = await kv();

  if (req.method === 'POST') {
    const body = parseBody(req);
    if (!body) return json(res, 400, { ok: false });
    if (!store) return json(res, 200, { ok: true }); // KV missing — never break the site
    try { await record(store, body); } catch { /* never break the site */ }
    return json(res, 200, { ok: true });
  }

  if (req.method === 'GET') {
    if (!store) return json(res, 503, { ok: false, error: 'tracking store not connected' });
    const q = req.query || {};

    if (q.public === '1') {
      const online = await onlineList(store);
      return json(res, 200, { ok: true, online: online.length });
    }

    // ---- admin ----
    const pin = String(req.headers['x-admin-pin'] || '');
    if (!ADMIN_PIN || pin !== ADMIN_PIN) return json(res, 401, { ok: false, error: 'unauthorized' });

    if (q.trail) {
      const vid = cleanVid(q.trail);
      if (!vid) return json(res, 400, { ok: false });
      const raw = await store.lrange(K.trail(vid), 0, 80);
      const trail = (raw || []).map((s) => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean);
      return json(res, 200, { ok: true, vid, trail });
    }

    const days = Math.max(1, Math.min(30, parseInt(q.days, 10) || 7));
    const now = Date.now();
    const stats = [];
    for (let i = 0; i < days; i++) stats.push(await dayStats(store, dayKey(now - i * DAY_MS)));

    const merge = (pick) => {
      const m = {};
      stats.forEach((s) => { for (const [k, v] of Object.entries(pick(s))) m[k] = (m[k] || 0) + Number(v || 0); });
      return m;
    };
    const pvAll = merge((s) => s.pv);
    const refAll = merge((s) => s.ref);
    const devAll = merge((s) => s.dev);
    const evAll = merge((s) => s.ev);
    const tmAll = merge((s) => s.tm);
    const tmcAll = merge((s) => s.tmc);

    const topPages = top(pvAll, 10).map(([p, v]) => ({
      p, v, avgMs: tmcAll[p] ? Math.round(tmAll[p] / tmcAll[p]) : 0,
    }));
    const weekVisitors = stats.reduce((a, s) => a + s.visitors, 0);
    const weekViews = stats.reduce((a, s) => a + s.views, 0);
    const online = await onlineList(store);

    return json(res, 200, {
      ok: true,
      days,
      since: '2026-09-24',
      today: { d: stats[0].d, visitors: stats[0].visitors, views: stats[0].views },
      yesterday: days > 1 ? { d: stats[1].d, visitors: stats[1].visitors, views: stats[1].views } : null,
      week: { visitors: weekVisitors, views: weekViews },
      topPages,
      topRefs: top(refAll, 8).map(([r, v]) => ({ r, v })),
      devices: { mobile: devAll.mobile || 0, desktop: devAll.desktop || 0 },
      events: top(evAll, 12).map(([n, v]) => ({ n, v })),
      online,
    });
  }

  return json(res, 405, { ok: false });
}
