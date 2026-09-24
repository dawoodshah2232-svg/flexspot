// Founding 100 — public badge list (Vercel KV).
//
// GET /api/founders → { claimed, total:100, founders:[{slug, brandName, founderNo}] }
// No emails are ever exposed here.
import { kv, json } from './_lib/mail.js';
import { FOUNDERS_TOTAL } from './_lib/auction.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { ok: false, error: 'method not allowed' });
  const store = await kv();
  if (!store) return json(res, 503, { ok: false, error: 'member store not connected (connect Vercel KV)' });
  try {
    const emails = await store.smembers('members');
    const founders = [];
    for (const e of emails || []) {
      try {
        const m = await store.get(`member:${e}`);
        if (m && m.founderNo) {
          founders.push({
            slug: m.slug || '',
            brandName: m.brandName || 'Member',
            founderNo: m.founderNo,
          });
        }
      } catch {}
    }
    founders.sort((a, b) => a.founderNo - b.founderNo);
    const claimed = Math.min(Number(await store.get('founders:count')) || 0, FOUNDERS_TOTAL);
    return json(res, 200, { ok: true, claimed, total: FOUNDERS_TOTAL, founders });
  } catch {
    return json(res, 500, { ok: false, error: 'founders read failed' });
  }
}
