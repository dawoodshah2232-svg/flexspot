// POST /api/member — FlexSpot member accounts (email = login ID).
// Backed by Vercel KV. Gracefully reports when KV isn't connected yet.
//
// Actions:
//   issue  (adminPin) — create member on approval; returns one-time password + IB
//   login  (public)   — { email, password } → session token
//   me     (public)   — { token } → member profile
//   list   (adminPin) — all members (admin panel / engagement sends)
import {
  kv, json, getIp, ADMIN_PIN, APP_URL,
  genPassword, genIB, hashPassword, verifyPassword, signSession, verifySession,
} from './_lib/mail.js';

async function loginRateOk(ip) {
  try {
    const store = await kv();
    if (!store) return true;
    const key = `rl:login:${ip}`;
    const n = await store.incr(key);
    if (n === 1) await store.expire(key, 300);
    return n <= 20;
  } catch { return true; }
}

function publicMember(m) {
  return {
    email: m.email, ib: m.ib, brandName: m.brandName, slug: m.slug,
    amount: m.amount, createdAt: m.createdAt, status: m.status,
    spotUrl: `${APP_URL}/s/${m.slug}`,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'POST only' });
  let body = {};
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); }
  catch { return json(res, 400, { ok: false, error: 'bad json' }); }

  const store = await kv();
  if (!store) return json(res, 503, { ok: false, error: 'member store not connected (connect Vercel KV)' });

  const { action } = body;

  // ── issue: admin creates the member when payment is approved ──────────
  if (action === 'issue') {
    if (!ADMIN_PIN || body.adminPin !== ADMIN_PIN) return json(res, 403, { ok: false, error: 'admin only' });
    const email = String(body.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) return json(res, 400, { ok: false, error: 'valid email required' });
    const key = `member:${email}`;
    const existing = await store.get(key);
    const password = genPassword();
    const member = {
      email,
      passHash: hashPassword(password),
      ib: (existing && existing.ib) || genIB(),
      brandName: String(body.brandName || 'Your brand').slice(0, 80),
      slug: String(body.slug || ''),
      amount: Number(body.amount) || 0,
      createdAt: (existing && existing.createdAt) || Date.now(),
      status: 'active',
    };
    await store.set(key, member);
    await store.sadd('members', email);
    return json(res, 200, { ok: true, password, ib: member.ib, email });
  }

  // ── login ─────────────────────────────────────────────────────────────
  if (action === 'login') {
    const ip = getIp(req);
    if (!(await loginRateOk(ip))) return json(res, 429, { ok: false, error: 'too many attempts, try later' });
    const email = String(body.email || '').trim().toLowerCase();
    const member = email ? await store.get(`member:${email}`) : null;
    if (!member || member.status !== 'active' || !verifyPassword(String(body.password || ''), member.passHash)) {
      return json(res, 401, { ok: false, error: 'Invalid email or password.' });
    }
    let token;
    try { token = signSession(email); }
    catch { return json(res, 503, { ok: false, error: 'sessions not configured (MEMBER_SECRET)' }); }
    return json(res, 200, { ok: true, token, member: publicMember(member) });
  }

  // ── me ────────────────────────────────────────────────────────────────
  if (action === 'me') {
    const email = verifySession(body.token || '');
    if (!email) return json(res, 401, { ok: false, error: 'session expired' });
    const member = await store.get(`member:${email}`);
    if (!member || member.status !== 'active') return json(res, 401, { ok: false, error: 'account not found' });
    return json(res, 200, { ok: true, member: publicMember(member) });
  }

  // ── list (admin) ──────────────────────────────────────────────────────
  if (action === 'list') {
    if (!ADMIN_PIN || body.adminPin !== ADMIN_PIN) return json(res, 403, { ok: false, error: 'admin only' });
    const emails = await store.smembers('members');
    const members = [];
    for (const e of emails || []) {
      const m = await store.get(`member:${e}`);
      if (m) members.push(publicMember(m));
    }
    members.sort((a, b) => b.createdAt - a.createdAt);
    return json(res, 200, { ok: true, members });
  }

  return json(res, 400, { ok: false, error: 'unknown action' });
}
