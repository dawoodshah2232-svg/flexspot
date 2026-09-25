// Frontend client for the FlexSpot email + member APIs (/api/*).
// All calls are fire-and-forget safe: they never throw, they return
// { ok, ... } and degrade gracefully when email/KV isn't configured yet.
import { appBase } from './format';

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '';

async function post(path, body) {
  try {
    const r = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok && data.ok !== false, status: r.status, ...data };
  } catch (e) {
    return { ok: false, error: e.message || 'network error' };
  }
}

export const spotUrl = (slug) => `${appBase()}/s/${slug}`;

const firstName = (name) => String(name || 'there').trim().split(' ')[0] || 'there';

/** Fired right after a claim/boost payment proof is submitted. */
export async function notifyClaimSubmitted({ buyerName, buyerEmail, brandName, amount, network, txId, hasScreenshot, claimRef }) {
  const submittedAt = new Date().toLocaleString();
  // Boosts have no buyer email — only the admin alert fires for them.
  const buyer = buyerEmail
    ? post('/api/email', {
        template: 'payment-received',
        to: buyerEmail,
        data: { buyerName: firstName(buyerName), brandName, amount, claimRef },
      })
    : Promise.resolve({ ok: true, skipped: true });
  const admin = post('/api/email', {
    template: 'admin-payment-alert',
    data: { buyerName, buyerEmail, brandName, amount, network, txId, hasScreenshot: !!hasScreenshot, claimRef, submittedAt },
  });
  const [b, a] = await Promise.all([buyer, admin]);
  return { buyerEmailSent: !!b.ok, adminAlertSent: !!a.ok, errors: [b.error, a.error].filter(Boolean) };
}

/**
 * Called from Admin on approval. Creates the member account (email = login
 * ID, fresh password + IB number) then emails everything to the buyer.
 */
export async function approveAndNotifyMember({ email, buyerName, brandName, slug, amount, rank }) {
  const issued = await post('/api/member', {
    action: 'issue', adminPin: ADMIN_PIN, email, brandName, slug, amount,
  });
  if (!issued.ok) return { ok: false, error: issued.error || 'member issue failed', emailSent: false };
  const sent = await post('/api/email', {
    template: 'member-approved',
    adminPin: ADMIN_PIN,
    to: email,
    data: {
      buyerName: firstName(buyerName), brandName, rank, amount,
      spotUrl: spotUrl(slug), email,
      password: issued.password, ib: issued.ib,
    },
  });
  return { ok: true, ib: issued.ib, emailSent: !!sent.ok, error: sent.error };
}

/** Called from Admin on rejection. */
export async function rejectAndNotify({ email, buyerName, brandName, reason }) {
  const sent = await post('/api/email', {
    template: 'member-rejected',
    adminPin: ADMIN_PIN,
    to: email,
    data: { buyerName: firstName(buyerName), brandName, reason },
  });
  return { ok: !!sent.ok, error: sent.error };
}

/** Manual engagement sends from Admin (welcome / milestone / digest). */
export async function sendEngagement({ template, to, data }) {
  return post('/api/email', { template, adminPin: ADMIN_PIN, to, data });
}

// ── member session (Dashboard login) ──────────────────────────────────────
const LS_SESSION = 'flexspot_member_session';

export async function memberLogin(email, password) {
  const r = await post('/api/member', { action: 'login', email, password });
  if (r.ok && r.token) {
    try { localStorage.setItem(LS_SESSION, r.token); } catch {}
  }
  return r;
}

export async function memberMe() {
  let token = null;
  try { token = localStorage.getItem(LS_SESSION); } catch {}
  if (!token) return { ok: false };
  const r = await post('/api/member', { action: 'me', token });
  if (!r.ok) { try { localStorage.removeItem(LS_SESSION); } catch {} }
  return r;
}

export function memberLogout() {
  try { localStorage.removeItem(LS_SESSION); } catch {}
}

export async function listMembers() {
  return post('/api/member', { action: 'list', adminPin: ADMIN_PIN });
}

export const emailNotConfigured = (r) =>
  !!(r && r.error && /RESEND_API_KEY|ADMIN_EMAIL|not configured/i.test(r.error));

// ── central submission queue (server-side, shared buyer ↔ admin) ──────────

/** Save a claim/boost submission to the central queue (fire-and-forget). */
export async function saveSubmissionCentral(sub) {
  return post('/api/submissions', sub);
}

/** Admin: list central submissions by status. */
export async function listCentralSubmissions(status = 'pending') {
  try {
    const r = await fetch(`/api/submissions?status=${encodeURIComponent(status)}&adminPin=${encodeURIComponent(ADMIN_PIN)}`);
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok, submissions: data.submissions || [], error: data.error };
  } catch (e) {
    return { ok: false, submissions: [], error: e.message || 'network error' };
  }
}

/** Admin: record a decision on the central queue. */
export async function decideCentral(id, decision, note) {
  try {
    const r = await fetch('/api/submissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPin: ADMIN_PIN, id, decision, note }),
    });
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok, status: r.status, ...data };
  } catch (e) {
    return { ok: false, error: e.message || 'network error' };
  }
}

// ── Spotlight Auction ─────────────────────────────────────────────────────

/** Public auction state: round, slots, top bids, winners. Never throws. */
export async function auctionState() {
  try {
    const r = await fetch('/api/auction');
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok && data.ok !== false, status: r.status, ...data };
  } catch (e) {
    return { ok: false, error: e.message || 'network error' };
  }
}

/** Place a bid (public, rate-limited). */
export async function placeBid(payload) {
  return post('/api/auction', { action: 'place', ...payload });
}

/** Admin: approve / reject / settle auction bids. */
export async function auctionAdmin(action, payload = {}) {
  return post('/api/auction', { action, adminPin: ADMIN_PIN, ...payload });
}

/** Public Founding-100 list. Never throws. */
export async function foundersList() {
  try {
    const r = await fetch('/api/founders');
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok && data.ok !== false, status: r.status, ...data };
  } catch (e) {
    return { ok: false, error: e.message || 'network error' };
  }
}

// ── Spot-name reservations ("reserve now, pay later") ────────────────────

/** Hold a brand name for 24h (public, rate-limited). Never throws. */
export async function reserveSpot({ brandName, email }) {
  return post('/api/reserve', { action: 'reserve', brandName, email });
}

/** Check whether a brand name / slug is free. Never throws. */
export async function checkNameAvailable(name) {
  try {
    const r = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'check', brandName: name }),
    });
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok && data.ok !== false, ...data };
  } catch (e) {
    return { ok: false, error: e.message || 'network error' };
  }
}

/** Fetch a reservation for claim prefill. Never throws. */
export async function getReservation(id) {
  if (!id) return { ok: false, error: 'no reservation id' };
  return post('/api/reserve', { action: 'get', id });
}

/** Admin: list / release reservations. */
export async function reserveAdmin(action, payload = {}) {
  return post('/api/reserve', { action, adminPin: ADMIN_PIN, ...payload });
}
