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
// visitor's own localStorage. We read the 2-letter country code Vercel
// already derives from the request (x-vercel-ip-country) so the admin can
// see *where* visitors come from; the IP itself is never stored.
// Daily keys expire after 45 days.
import { kv, json, ADMIN_PIN } from './_lib/mail.js';

const DAY_MS = 86400000;
const ONLINE_WINDOW_MS = 90000;
const DAILY_TTL = 45 * DAY_MS / 1000;

// Verification/test traffic — never counted in analytics. Keeps the admin
// dashboard honest: only real visitors appear.
const TEST_VIDS = new Set(['v-test-abc123']);
const isTestVid = (vid) => TEST_VIDS.has(vid) || /^v-test-/i.test(String(vid || ''));
const isTestPage = (page) => page === '/test-page' || String(page || '').startsWith('/test-page?') || String(page || '').startsWith('/test/');
const isTestRef = (host) => /test/i.test(String(host || ''));

// Bot/crawler traffic — never counted. Search engines execute the tracking JS
// while crawling (Googlebot/Bingbot run headless Chrome), so without this
// filter every sitemap submission shows up as a wave of fake "visitors".
const BOT_UA = /bot|crawl|spider|slurp|mediapartners|baidu|yandex|sogou|exabot|facebot|ia_archiver|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|ccbot|anthropic|cohere|diffbot|headless|phantom|selenium|puppeteer|playwright|lighthouse|pagespeed|pingdom|uptimerobot|screaming/i;
const isBot = (ua) => BOT_UA.test(String(ua || ''));

// 2-letter country code from Vercel's geo header ('' when unavailable).
// The IP itself is never read or stored — only this code.
const countryOf = (req) => {
  const c = String(req.headers['x-vercel-ip-country'] || '').toUpperCase();
  return /^[A-Z]{2}$/.test(c) ? c : '';
};

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
  ctry: (d) => `trk:ctry:${d}`,       // unique visitors per country per day
  vmeta: (vid) => `trk:vmeta:${vid}`, // per-visitor profile: country/device/first/last/pages/events
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

async function record(store, b, req) {
  const vid = cleanVid(b.vid);
  const page = cleanPage(b.page);
  if (!vid || isTestVid(vid) || isTestPage(page)) return; // test traffic: never recorded
  const t = b.t === 'beat' ? 'beat' : b.t === 'leave' ? 'leave' : b.t === 'event' ? 'event' : 'view';
  const now = Date.now();
  const d = dayKey(now);
  const dev = cleanDev(b.dev);
  const ctry = countryOf(req || {});
  const metaKey = K.vmeta(vid);
  const VMETA_TTL = 7 * 86400;

  // Fields refreshed on every touch: last seen, device, country (when known).
  const touch = { l: now, d: dev };
  if (ctry) touch.c = ctry;
  const touchMeta = async (extra) => {
    await store.hset(metaKey, { ...touch, ...(extra || {}) });
    await store.expire(metaKey, VMETA_TTL);
  };

  if (t === 'beat') {
    await store.hset(K.online, { [vid]: JSON.stringify({ ts: now, page, dev, c: ctry }) });
    await store.expire(K.online, 600);
    await touchMeta();
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
    await touchMeta();
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
    await store.hincrby(metaKey, 'e', 1);
    await touchMeta();
    return;
  }
  // view
  const host = refHost(b.ref);
  await store.hincrby(K.pv(d), page, 1);
  const added = Number(await store.sadd(K.vis(d), vid)) || 0;
  const extra = {};
  if (added > 0) {
    if (ctry) { // unique visitor per country per day
      await store.hincrby(K.ctry(d), ctry, 1);
      await store.expire(K.ctry(d), DAILY_TTL);
    }
    if (!(await store.exists(metaKey))) extra.f = now; // first seen ever (within retention)
  }
  await store.hincrby(metaKey, 'p', 1);
  await touchMeta(extra);
  if (!isTestRef(host)) await store.hincrby(K.ref(d), host, 1); // test referrers: never counted
  await store.hincrby(K.dev(d), dev, 1);
  await store.lpush(K.trail(vid), JSON.stringify({ t: now, k: 'p', p: page }));
  await store.ltrim(K.trail(vid), 0, 80);
  await store.expire(K.trail(vid), 7 * 86400);
  for (const key of [K.pv(d), K.vis(d), K.ref(d), K.dev(d)]) await store.expire(key, DAILY_TTL);
  // mark online too — a fresh view counts as a heartbeat
  await store.hset(K.online, { [vid]: JSON.stringify({ ts: now, page, dev, c: ctry }) });
  await store.expire(K.online, 600);
}

async function onlineList(store) {
  const raw = (await store.hgetall(K.online)) || {};
  const now = Date.now();
  const out = [];
  const stale = [];
  for (const [vid, s] of Object.entries(raw)) {
    if (isTestVid(vid)) { stale.push(vid); continue; } // purge test visitors from online
    try {
      // @vercel/kv auto-deserializes JSON values — handle both shapes
      const o = typeof s === 'string' ? JSON.parse(s) : s;
      if (now - o.ts < ONLINE_WINDOW_MS) out.push({ vid, page: o.page || '/', dev: o.dev || 'mobile', ts: o.ts, ctry: o.c || '' });
      else stale.push(vid);
    } catch { stale.push(vid); }
  }
  if (stale.length) await store.hdel(K.online, ...stale);
  return out;
}

async function dayStats(store, d) {
  const [members, pv, ref, dev, ev, tm, tmc, ctry] = await Promise.all([
    store.smembers(K.vis(d)),
    store.hgetall(K.pv(d)),
    store.hgetall(K.ref(d)),
    store.hgetall(K.dev(d)),
    store.hgetall(K.ev(d)),
    store.hgetall(K.tm(d)),
    store.hgetall(K.tmc(d)),
    store.hgetall(K.ctry(d)),
  ]);
  // Visitor count excludes test ids (recorded before the ingest filter existed).
  const visitors = (members || []).filter((v) => !isTestVid(typeof v === 'string' ? v : String(v))).length;
  const views = Object.values(pv || {}).reduce((a, v) => a + Number(v || 0), 0);
  return { d, visitors: visitors || 0, views, pv: pv || {}, ref: ref || {}, dev: dev || {}, ev: ev || {}, tm: tm || {}, tmc: tmc || {}, countries: ctry || {} };
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
    if (isBot(req.headers['user-agent'])) return json(res, 200, { ok: true }); // bots: never counted
    if (!store) return json(res, 200, { ok: true }); // KV missing — never break the site
    try { await record(store, body, req); } catch { /* never break the site */ }
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
      if (isTestVid(vid)) return json(res, 200, { ok: true, vid, trail: [] }); // test visitors: no trail
      const raw = await store.lrange(K.trail(vid), 0, 80);
      const trail = (raw || []).map((s) => {
        try { return typeof s === 'string' ? JSON.parse(s) : s; } catch { return null; }
      }).filter(Boolean);
      return json(res, 200, { ok: true, vid, trail });
    }

    // ---- admin: wipe every recorded traffic key (fresh start) ----
    if (q.reset === '1') {
      let deleted = 0;
      try {
        for await (const key of store.scanIterator({ match: 'trk:*' })) {
          await store.del(key);
          deleted++;
        }
      } catch { /* best effort */ }
      return json(res, 200, { ok: true, deleted });
    }

    const days = Math.max(1, Math.min(30, parseInt(q.days, 10) || 7));
    const now = Date.now();

    // ---- admin: recent visitors with country/device/activity ----
    if (q.visitors === '1') {
      const seen = new Set();
      for (let i = 0; i < days; i++) {
        const members = await store.smembers(K.vis(dayKey(now - i * DAY_MS)));
        for (const m of members || []) seen.add(String(m));
        if (seen.size > 500) break;
      }
      const list = [];
      for (const vid of seen) {
        if (isTestVid(vid)) continue;
        let m = null;
        try { m = await store.hgetall(K.vmeta(vid)); } catch { m = null; }
        list.push({
          vid,
          ctry: (m && m.c) || '',
          dev: (m && m.d) || 'desktop',
          first: Number((m && m.f) || 0),
          last: Number((m && m.l) || 0),
          pages: Number((m && m.p) || 0),
          events: Number((m && m.e) || 0),
        });
        if (list.length >= 300) break;
      }
      list.sort((a, b) => b.last - a.last);
      return json(res, 200, { ok: true, visitors: list });
    }

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
    const ctryAll = merge((s) => s.countries);

    const topPages = top(pvAll, 10)
      .filter(([p]) => !isTestPage(p)) // hide test pages recorded before the filter
      .map(([p, v]) => ({
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
      topRefs: top(refAll, 8).filter(([r]) => !isTestRef(r)).map(([r, v]) => ({ r, v })),
      topCountries: top(ctryAll, 8).map(([c, v]) => ({ c, v })),
      devices: { mobile: devAll.mobile || 0, desktop: devAll.desktop || 0 },
      events: top(evAll, 12).map(([n, v]) => ({ n, v })),
      online,
    });
  }

  return json(res, 405, { ok: false });
}
