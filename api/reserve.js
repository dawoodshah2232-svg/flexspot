// Spot-name reservations — "reserve now, pay later" (Vercel KV).
//
// A visitor holds a brand slug for 24h with just a name + email (no payment).
// The claim flow then prefills from the reservation (?rsv=<id>), and approval
// releases the hold. Holds are advisory: a live spot or an approved claim
// always wins over a reservation.
//
// POST /api/reserve {action:'reserve', brandName, email}
// POST /api/reserve {action:'check', slug}            → {available}
// POST /api/reserve {action:'get', id}                → reservation (for claim prefill)
// POST /api/reserve {action:'list'|'release', adminPin, ...}   (admin)
//
// KV: rsv:<id> {id, brandName, slug, email, createdAt, expiresAt, status, reminded}
//     rsv:active = set of live reservation ids
import { kv, json, getIp, ADMIN_PIN, APP_URL, claimRateOk, sendEmail } from './_lib/mail.js';
import { TEMPLATES } from './_lib/templates.js';

export const RSV_TTL_MS = 24 * 3600e3;

const slugify = (s) =>
  String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

const newRsvId = () => 'rsv-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const emailOk = (e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(e || '').trim());

function parseBody(req) {
  try {
    return typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch { return null; }
}

/** true when the slug is free: no live spot, no unexpired hold. Lazy-expires stale holds. */
async function slugAvailable(store, slug) {
  if (!slug) return false;
  try {
    const spot = await store.get(`spot:${slug}`);
    if (spot && !spot.hidden) return false;
  } catch {}
  try {
    const ids = (await store.smembers('rsv:active')) || [];
    const now = Date.now();
    for (const id of ids) {
      let r = null;
      try { r = await store.get(`rsv:${id}`); } catch {}
      if (!r) { try { await store.srem('rsv:active', id); } catch {} continue; }
      if (r.slug === slug && r.status === 'held') {
        if (r.expiresAt > now) return false;
        // Lazily release expired holds on read.
        try { await store.srem('rsv:active', id); await store.set(`rsv:${id}`, { ...r, status: 'expired' }); } catch {}
      }
    }
  } catch {}
  return true;
}

async function releaseReservation(store, id) {
  try {
    const r = id ? await store.get(`rsv:${id}`) : null;
    if (!r) return false;
    await store.set(`rsv:${id}`, { ...r, status: 'released', releasedAt: Date.now() });
    await store.srem('rsv:active', id);
    return true;
  } catch { return false; }
}

export { slugAvailable, releaseReservation };

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'POST only' });
  const body = parseBody(req);
  if (!body) return json(res, 400, { ok: false, error: 'bad json' });
  const store = await kv();
  if (!store) return json(res, 503, { ok: false, error: 'reservations not connected (connect Vercel KV)' });

  const { action } = body;

  // ── public: hold a name ──────────────────────────────────────────
  if (action === 'reserve') {
    if (!(await claimRateOk(getIp(req)))) {
      return json(res, 429, { ok: false, error: 'too many requests, try again later' });
    }
    const brandName = String(body.brandName || '').trim().slice(0, 60);
    if (brandName.length < 2) return json(res, 400, { ok: false, error: 'brand name must be at least 2 characters' });
    const email = String(body.email || '').trim().toLowerCase().slice(0, 120);
    if (!emailOk(email)) return json(res, 400, { ok: false, error: 'a valid email is required — your hold confirmation goes there' });
    const slug = slugify(brandName);
    if (!slug) return json(res, 400, { ok: false, error: 'could not make a URL name from that brand' });
    if (!(await slugAvailable(store, slug))) {
      return json(res, 409, { ok: false, error: 'that name is already taken — try a variation' });
    }
    const now = Date.now();
    const rsv = {
      id: newRsvId(),
      brandName,
      slug,
      email,
      createdAt: now,
      expiresAt: now + RSV_TTL_MS,
      status: 'held',
      reminded: false,
    };
    try {
      await store.set(`rsv:${rsv.id}`, rsv);
      await store.sadd('rsv:active', rsv.id);
    } catch {
      return json(res, 500, { ok: false, error: 'reservation write failed' });
    }
    // Confirmation email (best-effort — the hold itself already succeeded).
    try {
      const t = TEMPLATES['reserve-held']({
        buyerName: brandName.split(' ')[0] || brandName,
        brandName,
        slug,
        rsvId: rsv.id,
        expiresAt: new Date(rsv.expiresAt).toLocaleString(),
      });
      if (t) await sendEmail({ to: email, subject: t.subject, html: t.html });
    } catch {}
    return json(res, 200, { ok: true, id: rsv.id, slug, brandName, expiresAt: rsv.expiresAt });
  }

  // ── public: is this slug free? ───────────────────────────────────
  if (action === 'check') {
    const slug = slugify(body.slug || body.brandName || '');
    if (!slug) return json(res, 400, { ok: false, error: 'no name given' });
    const available = await slugAvailable(store, slug);
    return json(res, 200, { ok: true, slug, available });
  }

  // ── public: fetch a reservation for claim prefill (id is unguessable) ──
  if (action === 'get') {
    let r = null;
    try { r = body.id ? await store.get(`rsv:${body.id}`) : null; } catch {}
    if (!r || r.status !== 'held' || r.expiresAt <= Date.now()) {
      return json(res, 404, { ok: false, error: 'reservation not found or expired' });
    }
    return json(res, 200, {
      ok: true,
      reservation: { id: r.id, brandName: r.brandName, slug: r.slug, email: r.email, expiresAt: r.expiresAt },
    });
  }

  // ── admin ────────────────────────────────────────────────────────
  if (!ADMIN_PIN || body.adminPin !== ADMIN_PIN) return json(res, 403, { ok: false, error: 'admin only' });

  if (action === 'list') {
    const now = Date.now();
    const out = [];
    try {
      const ids = (await store.smembers('rsv:active')) || [];
      for (const id of ids) {
        try {
          const r = await store.get(`rsv:${id}`);
          if (r && r.status === 'held') out.push({ ...r, expired: r.expiresAt <= now });
        } catch {}
      }
    } catch {
      return json(res, 500, { ok: false, error: 'reservation read failed' });
    }
    out.sort((a, b) => a.expiresAt - b.expiresAt);
    return json(res, 200, { ok: true, reservations: out });
  }

  if (action === 'release') {
    const done = await releaseReservation(store, String(body.id || ''));
    return json(res, 200, { ok: true, released: done });
  }

  return json(res, 400, { ok: false, error: 'unknown action' });
}
