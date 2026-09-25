// GET /api/cron/reserve-sweep — Vercel Cron (daily).
// Sends "expiring soon" reminders for reservations ending within 24h,
// then releases holds that have fully expired. Lazy expiry on the site
// itself already treats expired holds as available; this handles email
// and bookkeeping.
import { kv, json, sendEmail } from '../_lib/mail.js';
import { TEMPLATES } from '../_lib/templates.js';

export default async function handler(req, res) {
  const auth = req.headers.authorization || '';
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return json(res, 401, { ok: false, error: 'unauthorized' });
  }
  const store = await kv();
  if (!store) {
    console.log('[reserve-sweep] skipped: KV not connected');
    return json(res, 200, { ok: true, skipped: 'KV not connected' });
  }
  const now = Date.now();
  let reminded = 0, expired = 0;
  try {
    const ids = (await store.smembers('rsv:active')) || [];
    for (const id of ids) {
      let r = null;
      try { r = await store.get(`rsv:${id}`); } catch { continue; }
      if (!r || r.status !== 'held') {
        try { await store.srem('rsv:active', id); } catch {}
        continue;
      }
      const msLeft = r.expiresAt - now;
      if (msLeft <= 0) {
        try {
          await store.set(`rsv:${id}`, { ...r, status: 'expired', expiredAt: now });
          await store.srem('rsv:active', id);
          expired++;
        } catch {}
        continue;
      }
      if (msLeft <= 24 * 3600e3 && !r.reminded && r.email) {
        try {
          const t = TEMPLATES['reserve-reminder']({
            buyerName: String(r.brandName || '').split(' ')[0] || r.brandName,
            brandName: r.brandName,
            rsvId: r.id,
            expiresAt: new Date(r.expiresAt).toLocaleString(),
          });
          const sent = await sendEmail({ to: r.email, subject: t.subject, html: t.html });
          if (sent.ok) {
            await store.set(`rsv:${id}`, { ...r, reminded: true });
            reminded++;
          }
        } catch {}
      }
    }
  } catch (e) {
    console.log('[reserve-sweep] error:', e.message);
    return json(res, 500, { ok: false, error: 'sweep failed' });
  }
  console.log(`[reserve-sweep] done: ${reminded} reminded, ${expired} expired`);
  return json(res, 200, { ok: true, reminded, expired });
}
