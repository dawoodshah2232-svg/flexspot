// Shared server-side helpers for FlexSpot email + member APIs.
// Runs on Vercel serverless (Node runtime). Zero extra deps besides @vercel/kv.
import { createHmac, randomBytes, scryptSync } from 'node:crypto';

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
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(pw, salt, 64, { N: 16384, r: 8, p: 1 }).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(pw, stored) {
  try {
    const [, salt, hash] = String(stored).split('$');
    const check = scryptSync(pw, salt, 64, { N: 16384, r: 8, p: 1 }).toString('hex');
    return check.length === hash.length && createHmac('sha256', 'x').update(check).digest('hex') ===
      createHmac('sha256', 'x').update(hash).digest('hex');
  } catch { return false; }
}

/** Signed session token: b64(email).b64(exp).b64(sig) — 30 days. */
export function signSession(email) {
  if (!MEMBER_SECRET) throw new Error('MEMBER_SECRET not configured');
  const exp = Date.now() + 30 * 864e5;
  const a = Buffer.from(String(email).toLowerCase()).toString('base64url');
  const b = Buffer.from(String(exp)).toString('base64url');
  const sig = createHmac('sha256', MEMBER_SECRET).update(`${a}.${b}`).digest('base64url');
  return `${a}.${b}.${sig}`;
}

export function verifySession(token) {
  try {
    if (!MEMBER_SECRET) return null;
    const [a, b, sig] = String(token).split('.');
    const want = createHmac('sha256', MEMBER_SECRET).update(`${a}.${b}`).digest('base64url');
    if (sig !== want) return null;
    const exp = Number(Buffer.from(b, 'base64url').toString());
    if (!exp || exp < Date.now()) return null;
    return Buffer.from(a, 'base64url').toString().toLowerCase();
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
