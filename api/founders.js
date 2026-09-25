// Founding 100 — public badge list (Vercel KV).
//
// GET /api/founders → { claimed, total:100, founders:[{slug, brandName, founderNo}] }
// No emails are ever exposed here.
//
// Founders come from two places:
//  1. member records with founderNo (paid claims during the founding window), and
//  2. managed spots carrying foundingNo (seeded founding spots).
// "claimed" counts founding spots whose brand has taken ownership
// (spot.unclaimed !== true), plus member-based founders.
import { kv, json } from './_lib/mail.js';
import { FOUNDERS_TOTAL } from './_lib/auction.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { ok: false, error: 'method not allowed' });
  const store = await kv();
  if (!store) return json(res, 503, { ok: false, error: 'member store not connected (connect Vercel KV)' });
  try {
    const founders = [];
    const seen = new Set();
    let claimed = 0;
    // 1. member-based founders (paid path)
    try {
      const emails = await store.smembers('members');
      for (const e of emails || []) {
        try {
          const m = await store.get(`member:${e}`);
          if (m && m.founderNo) {
            claimed += 1;
            if (m.slug && !seen.has(m.slug)) {
              seen.add(m.slug);
              founders.push({ slug: m.slug, brandName: m.brandName || 'Member', founderNo: m.founderNo });
            }
          }
        } catch {}
      }
    } catch {}
    // 2. spot-based founding spots (seeded by FlexSpot)
    try {
      const slugs = await store.zrange('spots:idx', 0, 500);
      for (const slug of slugs || []) {
        try {
          const s = await store.get(`spot:${slug}`);
          if (s && !s.hidden && s.foundingNo >= 1 && s.foundingNo <= FOUNDERS_TOTAL) {
            if (!seen.has(s.slug)) {
              seen.add(s.slug);
              founders.push({ slug: s.slug, brandName: s.name || s.slug, founderNo: s.foundingNo });
            }
            if (!s.unclaimed) claimed += 1;
          }
        } catch {}
      }
    } catch {}
    founders.sort((a, b) => a.founderNo - b.founderNo);
    claimed = Math.min(claimed, FOUNDERS_TOTAL);
    return json(res, 200, { ok: true, claimed, total: FOUNDERS_TOTAL, founders });
  } catch {
    return json(res, 500, { ok: false, error: 'founders read failed' });
  }
}
