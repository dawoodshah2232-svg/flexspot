// Central spot manager (Vercel KV) — the admin's server-side source of truth
// for every record shown on the public site. Browser localStorage can't bridge
// devices; this is the shared store Dawood edits from his phone.
//
// GET    /api/spots                   public — list of admin-managed spots (503 when KV missing)
//                                        hidden (deleted) spots are never listed publicly; their
//                                        slugs are returned separately so clients can suppress
//                                        matching demo/local records.
// GET    /api/spots?includeHidden=1    admin (x-admin-pin header) — full list incl. hidden
// POST   /api/spots     create (admin PIN via x-admin-pin header or body.adminPin)
// PATCH  /api/spots     update by slug (admin); set hidden:false to restore a deleted spot
// DELETE /api/spots     hide by slug (admin) — writes a tombstone {hidden:true} so a deleted
//                       demo override does NOT let the underlying demo record reappear.
//                       Nothing is physically erased; restore with PATCH {hidden:false}.
//
// Record fields: slug, name, tagline, description, mark (emoji), logo (image
// URL or data URL, ~650KB cap), amount, clicks, views, website, socials
// {x,instagram,facebook,linkedin}, category, hidden, createdAt, updatedAt.
import { kv, json, ADMIN_PIN } from './_lib/mail.js';

const LOGO_CAP = 650000; // chars — keeps KV values small; larger uploads are downscaled client-side

function parseBody(req) {
  try {
    return typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch { return null; }
}

function adminOk(req, body) {
  if (!ADMIN_PIN) return false;
  const pin = String(req.headers['x-admin-pin'] || (body && body.adminPin) || '');
  return pin.length > 0 && pin === ADMIN_PIN;
}

const slugify = (s) =>
  String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

const str = (v, n) => String(v ?? '').slice(0, n);
const num = (v) => { const n = Number(v); return Number.isFinite(n) && n >= 0 ? n : 0; };

function cleanSpot(b, isNew) {
  const s = {};
  if (isNew || b.slug !== undefined) {
    const slug = slugify(b.slug || b.name);
    if (!slug) return { error: 'name/slug required' };
    s.slug = slug;
  }
  if (b.name !== undefined) s.name = str(b.name, 80);
  if (b.tagline !== undefined) s.tagline = str(b.tagline, 140);
  if (b.description !== undefined) s.description = str(b.description, 2000);
  if (b.mark !== undefined) s.mark = str(b.mark, 8);
  if (b.logo !== undefined) {
    const logo = str(b.logo, LOGO_CAP + 100);
    if (logo.length > LOGO_CAP) return { error: 'image too large — use a smaller file or an image URL' };
    s.logo = logo;
  }
  if (b.amount !== undefined) s.amount = num(b.amount);
  if (b.clicks !== undefined) s.clicks = Math.floor(num(b.clicks));
  if (b.views !== undefined) s.views = Math.floor(num(b.views));
  if (b.website !== undefined) s.website = str(b.website, 300);
  if (b.socials !== undefined && b.socials && typeof b.socials === 'object') {
    s.socials = {};
    for (const k of ['x', 'instagram', 'facebook', 'linkedin']) {
      if (b.socials[k] !== undefined) s.socials[k] = str(b.socials[k], 300);
    }
  }
  if (b.category !== undefined) s.category = str(b.category, 40) || 'startups';
  if (b.hidden !== undefined) s.hidden = b.hidden === true || b.hidden === 1 || b.hidden === 'true';
  return { spot: s };
}

export default async function handler(req, res) {
  const kvs = await kv();
  if (!kvs) return json(res, 503, { ok: false, error: 'spot store not connected (connect Vercel KV)' });

  // ── public list ──────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const url = new URL(req.url || '/', 'http://local');
      const includeHidden = url.searchParams.get('includeHidden') === '1';
      if (includeHidden) {
        // Admin-only listing: hidden (deleted) records must not leak publicly.
        // PIN travels via x-admin-pin header only — never in the query string.
        const pin = String(req.headers['x-admin-pin'] || '');
        if (!ADMIN_PIN || pin !== ADMIN_PIN) return json(res, 403, { ok: false, error: 'forbidden' });
      }
      const slugs = await kvs.zrange('spots:idx', 0, 500, { rev: true });
      const spots = [];
      const hidden = [];
      for (const slug of slugs || []) {
        try {
          const s = await kvs.get(`spot:${slug}`);
          if (!s) continue;
          if (s.hidden) {
            hidden.push(s.slug);
            if (includeHidden) spots.push(s);
          } else {
            spots.push(s);
          }
        } catch {}
      }
      return json(res, 200, { ok: true, spots, hidden, count: spots.length });
    } catch {
      return json(res, 500, { ok: false, error: 'spot read failed' });
    }
  }

  const body = parseBody(req);
  if (body === null) return json(res, 400, { ok: false, error: 'bad json' });
  if (!adminOk(req, body)) return json(res, 403, { ok: false, error: 'forbidden' });

  // ── create ───────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { spot, error } = cleanSpot(body, true);
    if (error) return json(res, 400, { ok: false, error });
    if (!spot.name) return json(res, 400, { ok: false, error: 'name required' });
    const now = Date.now();
    const rec = {
      tagline: '', description: '', mark: '✨', logo: '', amount: 0, clicks: 0,
      views: 0, website: '', socials: {}, category: 'startups',
      ...spot, createdAt: now, updatedAt: now,
    };
    try {
      const exists = await kvs.get(`spot:${rec.slug}`);
      // A bare tombstone (hidden demo with no managed data) is free to
      // reclaim — a real managed record must be restored, not overwritten.
      const tombstoneOnly = exists && exists.hidden && !exists.name;
      if (exists && !tombstoneOnly) return json(res, 409, { ok: false, error: 'a spot with this slug already exists' });
      await kvs.set(`spot:${rec.slug}`, rec);
      await kvs.zadd('spots:idx', { score: now, member: rec.slug });
    } catch {
      return json(res, 500, { ok: false, error: 'spot write failed' });
    }
    return json(res, 200, { ok: true, spot: rec });
  }

  // ── update ───────────────────────────────────────────────────────
  if (req.method === 'PATCH') {
    const slug = slugify(body.slug);
    if (!slug) return json(res, 400, { ok: false, error: 'slug required' });
    const { spot, error } = cleanSpot(body, false);
    if (error) return json(res, 400, { ok: false, error });
    delete spot.slug; // slug is immutable after creation
    try {
      const cur = await kvs.get(`spot:${slug}`);
      if (!cur) return json(res, 404, { ok: false, error: 'spot not found' });
      const rec = { ...cur, ...spot, updatedAt: Date.now() };
      await kvs.set(`spot:${slug}`, rec);
      await kvs.zadd('spots:idx', { score: rec.updatedAt, member: slug });
      return json(res, 200, { ok: true, spot: rec });
    } catch {
      return json(res, 500, { ok: false, error: 'spot write failed' });
    }
  }

  // ── delete → tombstone (true delete from public display) ─────────
  // Deleting a managed override used to erase the KV record, which let the
  // underlying demo entry reappear. Now DELETE writes {hidden:true}: the
  // record (and any demo/local entry with the same slug) stays off the
  // public site until restored with PATCH {hidden:false}.
  if (req.method === 'DELETE') {
    const slug = slugify(body.slug);
    if (!slug) return json(res, 400, { ok: false, error: 'slug required' });
    try {
      const cur = await kvs.get(`spot:${slug}`);
      const now = Date.now();
      const tomb = cur
        ? { ...cur, hidden: true, deletedAt: now, updatedAt: now }
        : { slug, hidden: true, createdAt: now, updatedAt: now, deletedAt: now };
      await kvs.set(`spot:${slug}`, tomb);
      await kvs.zadd('spots:idx', { score: tomb.updatedAt, member: slug });
      return json(res, 200, { ok: true, slug, hidden: true });
    } catch {
      return json(res, 500, { ok: false, error: 'spot delete failed' });
    }
  }

  return json(res, 405, { ok: false, error: 'method not allowed' });
}
