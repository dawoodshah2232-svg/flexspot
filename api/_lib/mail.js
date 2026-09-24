// Shared server-side helpers for FlexSpot email + member APIs.
// Runs on Vercel serverless (Node runtime). Zero extra deps besides @vercel/kv.
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const KV_OK = !!process.env.KV_REST_API_URL;
let _kv = null;
export async function kv() {
  if (!KV_OK) return null;
  if (!_kv) {
    const mod = await import('@vercel/kv');
    _kv = mod.kv;
  }
  return _kv;
}

export const APP_URL = (process.env.VITE_APP_URL || 'https://www.flexspot.lol').replace(/\/$/, '');
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
export const EMAIL_FROM = process.env.EMAIL_FROM || 'FlexSpot <onboarding@resend.dev>';
// Light admin gate for server actions — same trust level as the client-side
// VITE_ADMIN_PIN gate (baked into the bundle). Real auth is a later phase.
export const ADMIN_PIN = process.env.VITE_ADMIN_PIN || '';
const MEMBER_SECRET = process.env.MEMBER_SECRET || '';

// Max password length accepted for hashing (reel check #3 — long-password DoS).
const MAX_PASSWORD_LEN = 128;

const UNAMBIGUOUS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function randChars(n) {
  const buf = randomBytes(n);
  let s = '';
  for (let i = 0; i < n; i++) s += UNAMBIGUOUS[buf[i] % UNAMBIGUOUS.length];
  return s;
}

/** Login password issued on approval: memorable, e.g. K7M2-9X4P-Q2DA */
export function genPassword() {
  return `${randChars(4)}-${randChars(4)}-${randChars(4)}`;
}

/** IB / member number, e.g. FS-8K2N4X */
export function genIB() {
  return `FS-${randChars(6)}`;
}

/** scrypt password hash: "scrypt$<saltHex>$<hashHex>" */
export function hashPassword(pw) {
  if (typeof pw !== 'string' || pw.length === 0 || pw.length > MAX_PASSWORD_LEN) {
    throw new Error('password length invalid');
  }
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(pw, salt, 64, { N: 16384, r: 8, p: 1 }).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(pw, stored) {
  try {
    // Long-password DoS guard (reel check #3): scrypt is CPU-hard, so an
    // unbounded password on the public login endpoint burns server CPU.
    // Genuine passwords are issued at 14 chars; 128 is generous headroom.
    if (typeof pw !== 'string' || pw.length === 0 || pw.length > MAX_PASSWORD_LEN) return false;
    const [, salt, hash] = String(stored).split('$');
    if (!salt || !hash) return false;
    const check = scryptSync(pw, salt, 64, { N: 16384, r: 8, p: 1 });
    const want = Buffer.from(hash, 'hex');
    return check.length === want.length && timingSafeEqual(check, want);
  } catch { return false; }
}

/** Signed session token: b64(email).b64(exp).b64(epoch).b64(sig) — 30 days.
 *  The epoch ties the token to the member record's sessEpoch: re-issuing a
 *  password bumps the epoch, which instantly invalidates all older tokens
 *  (reel check #7 — login replay after credential change). */
export function signSession(email, epoch = 0) {
  if (!MEMBER_SECRET) throw new Error('MEMBER_SECRET not configured');
  const exp = Date.now() + 30 * 864e5;
  const a = Buffer.from(String(email).toLowerCase()).toString('base64url');
  const b = Buffer.from(String(exp)).toString('base64url');
  const c = Buffer.from(String(Number(epoch) || 0)).toString('base64url');
  const sig = createHmac('sha256', MEMBER_SECRET).update(`${a}.${b}.${c}`).digest('base64url');
  return `${a}.${b}.${c}.${sig}`;
}

/** Returns { email, epoch } or null. Pre-epoch 3-part tokens are rejected. */
export function verifySession(token) {
  try {
    if (!MEMBER_SECRET) return null;
    const [a, b, c, sig] = String(token).split('.');
    if (!a || !b || !c || !sig) return null;
    const want = createHmac('sha256', MEMBER_SECRET).update(`${a}.${b}.${c}`).digest('base64url');
    const sigBuf = Buffer.from(sig, 'base64url');
    const wantBuf = Buffer.from(want, 'base64url');
    if (sigBuf.length !== wantBuf.length || !timingSafeEqual(sigBuf, wantBuf)) return null;
    const exp = Number(Buffer.from(b, 'base64url').toString());
    if (!exp || exp < Date.now()) return null;
    const epoch = Number(Buffer.from(c, 'base64url').toString());
    if (!Number.isFinite(epoch)) return null;
    return { email: Buffer.from(a, 'base64url').toString().toLowerCase(), epoch };
  } catch { return null; }
}

/** Best-effort rate limit for the public claim-notification flow. */
export async function claimRateOk(ip) {
  try {
    const store = await kv();
    if (!store) return true; // no KV → allow, logged
    const key = `rl:claim:${ip}`;
    const n = await store.incr(key);
    if (n === 1) await store.expire(key, 3600);
    return n <= 8;
  } catch { return true; }
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  return (typeof fwd === 'string' ? fwd.split(',')[0] : req.socket?.remoteAddress || 'unknown').trim();
}

/** Send one email through Resend. Returns { ok, id } or { ok:false, error }. */
export async function sendEmail({ to, subject, html }) {
  const key = process.env.RESEND_API_KEY || '';
  if (!key) return { ok: false, error: 'RESEND_API_KEY not configured' };
  if (!to) return { ok: false, error: 'missing recipient' };
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: EMAIL_FROM, to: [to], subject, html }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: data?.message || `resend ${r.status}` };
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e.message || 'send failed' };
  }
}

export function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export function getIp(req) { return clientIp(req); }
