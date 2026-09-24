// POST /api/email — send a templated FlexSpot email via Resend.
//
// Public templates (no PIN, rate-limited): payment-received, admin-payment-alert
//   — these fire from the claim flow itself.
// Admin templates (require adminPin): member-approved, member-rejected,
//   welcome, rank-milestone, weekly-digest.
//
// Body: { template, to?, data?, adminPin? }
import { TEMPLATES } from './_lib/templates.js';
import { sendEmail, json, kv, getIp, ADMIN_EMAIL, ADMIN_PIN, claimRateOk } from './_lib/mail.js';

const PUBLIC_TEMPLATES = new Set(['payment-received', 'admin-payment-alert']);

async function recipientRateOk(email) {
  try {
    const store = await kv();
    if (!store) return true;
    const key = `rl:rcpt:${String(email).toLowerCase()}`;
    const n = await store.incr(key);
    if (n === 1) await store.expire(key, 86400);
    return n <= 3;
  } catch { return true; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'POST only' });
  let body = {};
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); }
  catch { return json(res, 400, { ok: false, error: 'bad json' }); }

  const { template, to, data = {}, adminPin } = body;
  if (!template || !TEMPLATES[template]) return json(res, 400, { ok: false, error: 'unknown template' });

  const isPublic = PUBLIC_TEMPLATES.has(template);
  if (!isPublic) {
    if (!ADMIN_PIN || adminPin !== ADMIN_PIN) return json(res, 403, { ok: false, error: 'admin only' });
  } else {
    const ip = getIp(req);
    if (!(await claimRateOk(ip))) return json(res, 429, { ok: false, error: 'rate limited, try later' });
  }

  // Recipient: admin alerts always go to the configured admin inbox.
  const recipient = template === 'admin-payment-alert' ? ADMIN_EMAIL : to;
  if (!recipient) return json(res, 400, { ok: false, error: 'missing recipient' });
  if (template === 'admin-payment-alert' && !ADMIN_EMAIL) {
    return json(res, 503, { ok: false, error: 'ADMIN_EMAIL not configured' });
  }
  if (!(await recipientRateOk(recipient))) return json(res, 429, { ok: false, error: 'rate limited, try later' });

  let rendered;
  try {
    rendered = TEMPLATES[template](data);
  } catch (e) {
    return json(res, 400, { ok: false, error: 'template render failed' });
  }

  const result = await sendEmail({ to: recipient, subject: rendered.subject, html: rendered.html });
  if (!result.ok) return json(res, 502, { ok: false, error: result.error });
  return json(res, 200, { ok: true, id: result.id });
}
