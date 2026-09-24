// GET /api/cron/weekly-digest — Vercel Cron (Mondays 09:00).
// Sends every active member their weekly engagement digest.
// No-op with a clear log line when email/KV isn't configured yet.
import { kv, json, sendEmail, APP_URL } from '../_lib/mail.js';
import { TEMPLATES } from '../_lib/templates.js';

export default async function handler(req, res) {
  // Vercel Cron signs requests with CRON_SECRET automatically.
  const auth = req.headers.authorization || '';
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return json(res, 401, { ok: false, error: 'unauthorized' });
  }
  if (!process.env.RESEND_API_KEY) {
    console.log('[weekly-digest] skipped: RESEND_API_KEY not configured');
    return json(res, 200, { ok: true, skipped: 'email not configured' });
  }
  const store = await kv();
  if (!store) {
    console.log('[weekly-digest] skipped: KV not connected');
    return json(res, 200, { ok: true, skipped: 'member store not connected' });
  }
  const emails = (await store.smembers('members')) || [];
  let sent = 0, failed = 0;
  for (const e of emails) {
    const m = await store.get(`member:${e}`);
    if (!m || m.status !== 'active') continue;
    const firstName = String(m.brandName || '').split(' ')[0] || 'there';
    const rendered = TEMPLATES['weekly-digest']({
      buyerName: firstName,
      brandName: m.brandName,
      rank: null, // server doesn't track live rank in demo mode — template shows LIVE
      amount: m.amount || 0,
      views: '—',
      spotUrl: `${APP_URL}/s/${m.slug}`,
    });
    const r = await sendEmail({ to: m.email, subject: rendered.subject, html: rendered.html });
    if (r.ok) sent++; else failed++;
  }
  console.log(`[weekly-digest] sent=${sent} failed=${failed}`);
  return json(res, 200, { ok: true, sent, failed });
}
