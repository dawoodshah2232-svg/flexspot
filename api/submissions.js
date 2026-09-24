// Central claim/submission queue (Vercel KV).
//
// Why: buyers submit from their phone, Dawood reviews from his. Browser
// localStorage can't bridge devices — this is the shared server-side queue.
//
// POST   /api/submissions                       create (public, rate-limited)
// GET    /api/submissions?status=pending        list (admin PIN)
// PATCH  /api/submissions                       decide approve/reject/changes-requested (admin PIN)
import { kv, json, getIp, ADMIN_PIN, claimRateOk } from './_lib/mail.js';

const newId = () => 'sub-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function parseBody(req) {
  try {
    return typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch { return null; }
}

export default async function handler(req, res) {
  const kvs = await kv();
  if (!kvs) return json(res, 503, { ok: false, error: 'submission queue not connected (connect Vercel KV)' });

  // ── create (public) ──────────────────────────────────────────────
  if (req.method === 'POST') {
    if (!(await claimRateOk(getIp(req)))) {
      return json(res, 429, { ok: false, error: 'too many submissions, try again later' });
    }
    const b = parseBody(req);
    if (!b) return json(res, 400, { ok: false, error: 'bad json' });
    if (!b.brandName || !b.amount) return json(res, 400, { ok: false, error: 'brandName and amount required' });
    // Submission IDs are always server-generated — a client-supplied id
    // could overwrite another submission's record (untrusted storage key).
    const id = newId();
    const now = Date.now();
    const sub = {
      id,
      brandName: String(b.brandName).slice(0, 80),
      slug: String(b.slug || '').slice(0, 120),
      amount: Number(b.amount) || 0,
      email: String(b.email || '').slice(0, 120),
      name: String(b.name || '').slice(0, 80),
      tagline: String(b.tagline || '').slice(0, 140),
      website: String(b.website || '').slice(0, 200),
      category: String(b.category || 'startups').slice(0, 40),
      isBoost: !!b.isBoost,
      boostSlug: String(b.boostSlug || '').slice(0, 120),
      // Submission kind: claims and boosts approve here; auction bids are
      // created by /api/auction and decided ONLY there (see PATCH guard).
      kind: ['claim', 'boost', 'bid'].includes(b.kind) ? b.kind : (b.isBoost ? 'boost' : 'claim'),
      slot: String(b.slot || '').slice(0, 40),
      roundId: String(b.roundId || '').slice(0, 12),
      network: String(b.network || '').slice(0, 40),
      txId: String(b.txId || '').slice(0, 120),
      hasScreenshot: !!b.hasScreenshot,
      claimRef: String(b.claimRef || '').slice(0, 24),
      status: 'pending',
      history: [{ at: now, event: 'submitted' }],
      createdAt: now,
    };
    try {
      await kvs.set(`sub:${id}`, sub);
      await kvs.zadd('subs:idx:pending', { score: now, member: id });
      await kvs.zadd('subs:idx:all', { score: now, member: id });
    } catch (e) {
      return json(res, 500, { ok: false, error: 'queue write failed' });
    }
    return json(res, 200, { ok: true, id, status: 'pending' });
  }

  // ── list / decide (admin only) ───────────────────────────────────
  const body = req.method === 'GET' ? {} : parseBody(req);
  if (body === null) return json(res, 400, { ok: false, error: 'bad json' });
  const url = new URL(req.url || '/api/submissions', 'http://x');
  const pin = body.adminPin || url.searchParams.get('adminPin') || '';
  if (!ADMIN_PIN || pin !== ADMIN_PIN) return json(res, 403, { ok: false, error: 'forbidden' });

  if (req.method === 'GET') {
    const status = url.searchParams.get('status') || 'pending';
    let ids = [];
    try {
      ids = await kvs.zrange(`subs:idx:${status}`, 0, 200, { rev: true });
    } catch { return json(res, 500, { ok: false, error: 'queue read failed' }); }
    const submissions = [];
    for (const id of ids || []) {
      try {
        const s = await kvs.get(`sub:${id}`);
        if (s) submissions.push(s);
      } catch {}
    }
    return json(res, 200, { ok: true, submissions });
  }

  if (req.method === 'PATCH') {
    const b = body;
    let sub = null;
    try { sub = b && b.id ? await kvs.get(`sub:${b.id}`) : null; } catch {}
    if (!sub) return json(res, 404, { ok: false, error: 'submission not found' });
    // Auction bids carry top-bid invariants — they may only be approved or
    // rejected through /api/auction, which keeps the round state consistent.
    if (sub.kind === 'bid') {
      return json(res, 400, { ok: false, error: 'approve bids via /api/auction' });
    }
    if (!['approved', 'rejected', 'changes-requested'].includes(b.decision)) {
      return json(res, 400, { ok: false, error: 'bad decision' });
    }
    const now = Date.now();
    sub.status = b.decision;
    sub.reviewedAt = now;
    sub.decidedBy = 'admin';
    sub.history = [...(sub.history || []), { at: now, event: 'decision', decision: b.decision, note: String(b.note || '').slice(0, 500) }];
    if (b.note) sub.adminNotes = [...(sub.adminNotes || []), { at: now, text: String(b.note).slice(0, 500) }];
    try {
      await kvs.set(`sub:${sub.id}`, sub);
      await kvs.zrem('subs:idx:pending', sub.id);
      await kvs.zadd(`subs:idx:${b.decision}`, { score: now, member: sub.id });
    } catch {
      return json(res, 500, { ok: false, error: 'queue write failed' });
    }
    return json(res, 200, { ok: true, id: sub.id, status: sub.status });
  }

  return json(res, 405, { ok: false, error: 'method not allowed' });
}
