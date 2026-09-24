// Member accounts (client dashboard) — localStorage-backed demo engine.
// The backend (accounts launch) will replace these functions with API calls;
// the Dashboard UI stays the same.
//
// Rules enforced here:
// - Company name is LOCKED once the spot is submitted. It can never be edited
//   in the dashboard — changing it requires emailing hello@flexspot.lol.
// - Everything else (logo, personal photo, tagline, description, website,
//   socials, what-to-promote) is editable by the member and goes live instantly.

import {
  readLS, writeLS, LS_SPOTS, LS_BOOSTS,
  createReferralIdentity, myReferralCode,
} from './store';

export const LS_MEMBER = 'flexspot_member_v1';
export const LS_WALLET = 'flexspot_wallet_v1';
const LS_MEMBER_SEED = 'flexspot_member_seed_v1';
const LS_PENDING_CLAIM = 'flexspot_pending_claim_v1';
// referral stats live under this key in store.js (not exported there)
const LS_REF_STATS = 'flexspot_ref_stats_v1';

export const SUPPORT_EMAIL = 'hello@flexspot.lol';
export const USDT_NETWORKS = ['TRC-20', 'BEP-20', 'Solana'];
export const MIN_WITHDRAWAL = 20;

// --- Session ---------------------------------------------------------------
export function getMember() {
  try { return readLS(LS_MEMBER, null); } catch { return null; }
}
export function memberLoggedIn() { return !!getMember(); }
export function saveMember(patch) {
  const m = { ...(getMember() || {}), ...patch, updatedAt: Date.now() };
  writeLS(LS_MEMBER, m);
  return m;
}
export function clearMember() {
  try { localStorage.removeItem(LS_MEMBER); } catch {}
}

// --- Wallet ----------------------------------------------------------------
// Wallet holds commission + referral earnings. Balance can be withdrawn
// (USDT, min $20) or spent on boosts for the member's own spot.
export function getWallet() {
  return readLS(LS_WALLET, { balance: 0, pending: 0, lifetime: 0, txns: [] });
}
function putWallet(w) { writeLS(LS_WALLET, w); return w; }

export function addTxn({ kind, label, amount, status = 'done' }) {
  const w = getWallet();
  const txn = {
    id: 'tx-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    at: Date.now(), kind, label,
    amount: Math.round(Number(amount) * 100) / 100,
    status,
  };
  w.txns = [txn, ...w.txns].slice(0, 200);
  if (status === 'done') {
    if (kind === 'credit') { w.balance += txn.amount; w.lifetime += txn.amount; }
    else { w.balance = Math.max(0, w.balance - txn.amount); }
  } else {
    if (kind === 'debit') { w.balance = Math.max(0, w.balance - txn.amount); w.pending += txn.amount; }
  }
  return { txn, wallet: putWallet(w) };
}

export function requestWithdrawal({ network, address, amount }) {
  const amt = Math.round(Number(amount) * 100) / 100;
  const w = getWallet();
  if (!network || !address || !address.trim()) throw new Error('Add your USDT address first.');
  if (!(amt >= MIN_WITHDRAWAL)) throw new Error(`Minimum withdrawal is $${MIN_WITHDRAWAL}.`);
  if (amt > w.balance) throw new Error('Amount is more than your available balance.');
  return addTxn({ kind: 'debit', label: `Withdrawal — USDT (${network})`, amount: amt, status: 'pending' });
}

// Spend wallet balance on a boost for the member's own spot. Works exactly
// like a cash boost: the amount lands on the board immediately.
export function boostFromWallet(amount, spotSlug) {
  const amt = Math.round(Number(amount) * 100) / 100;
  const m = getMember();
  const slug = spotSlug || (m && m.spotSlug);
  if (!slug) throw new Error('No spot to boost.');
  const w = getWallet();
  if (!(amt >= 1)) throw new Error('Minimum boost is $1.');
  if (amt > w.balance) throw new Error('Not enough balance — top up with referral earnings first.');
  const boosts = readLS(LS_BOOSTS, {});
  boosts[slug] = (boosts[slug] || 0) + amt;
  writeLS(LS_BOOSTS, boosts);
  return addTxn({ kind: 'debit', label: 'Boost — own spot', amount: amt });
}

// --- Member spot (brand profile) -------------------------------------------
// Editable fields sync straight into the member's live spot. `name` is
// deliberately ignored here — the company name is locked.
const EDITABLE_SPOT_FIELDS = ['tagline', 'description', 'website', 'socials', 'logo', 'category'];

export function updateMemberSpot(patch) {
  const m = getMember();
  if (!m || !m.spotSlug) return null;
  const clean = {};
  EDITABLE_SPOT_FIELDS.forEach((f) => { if (patch[f] !== undefined) clean[f] = patch[f]; });
  const local = readLS(LS_SPOTS, []);
  const i = local.findIndex((s) => s.slug === m.spotSlug);
  if (i === -1) return null;
  local[i] = { ...local[i], ...clean };
  writeLS(LS_SPOTS, local);
  return local[i];
}

export function getMemberSpot() {
  const m = getMember();
  if (!m || !m.spotSlug) return null;
  return readLS(LS_SPOTS, []).find((s) => s.slug === m.spotSlug) || null;
}

// --- Referrals -------------------------------------------------------------
// Personal affiliate link for the member's spot. No per-visit reward — the
// only earning is 20% instant commission on every payment made by a member
// who joined through the referrer's link, credited to the wallet.
export function memberReferralLink(origin) {
  const m = getMember();
  if (!m || !m.spotSlug) return '';
  let code = myReferralCode(m.spotSlug);
  if (!code) code = createReferralIdentity(m.spotSlug, m.name || 'Member');
  const base = (origin || '').replace(/\/$/, '');
  return `${base}/s/${m.spotSlug}?ref=${code}`;
}

export function memberReferralStats() {
  const m = getMember();
  if (!m || !m.spotSlug) return { visits: 0, earned: 0 };
  const code = myReferralCode(m.spotSlug);
  if (!code) return { visits: 0, earned: 0 };
  const s = readLS(LS_REF_STATS, {})[code] || {};
  return { visits: Number(s.visits) || 0 };
}

// --- Pending claim ---------------------------------------------------------
// A fresh claim stages here: payment under review, account activates after
// admin approval. The dashboard gate shows this two-step state honestly.
export function stagePendingClaim(c) {
  try { localStorage.setItem(LS_PENDING_CLAIM, JSON.stringify({ ...c, at: Date.now() })); } catch {}
}
export function getPendingClaim() {
  try { return JSON.parse(localStorage.getItem(LS_PENDING_CLAIM)); } catch { return null; }
}
export function clearPendingClaim() {
  try { localStorage.removeItem(LS_PENDING_CLAIM); } catch {}
}

// --- Demo seed -------------------------------------------------------------
// Seeds a demo member + their spot + wallet history so the dashboard preview
// is fully explorable. Cleared by the admin "reset demo data".
function seedWalletTxns() {
  const D = 86400e3, now = Date.now();
  // Chronological seed (oldest first); the loop derives balance/lifetime.
  const seed = [
    { at: now - 10 * D, kind: 'credit', label: '20% commission — Omar F. claimed $50', amount: 10 },
    { at: now - 9 * D, kind: 'debit', label: 'Withdrawal — USDT (TRC-20)', amount: 25, status: 'done' },
    { at: now - 8 * D, kind: 'credit', label: '20% commission — Leo M. claimed $5', amount: 1 },
    { at: now - 5 * D, kind: 'debit', label: 'Boost — own spot', amount: 10 },
    { at: now - 4 * D, kind: 'credit', label: '20% commission — Priya S. boosted $15', amount: 3 },
    { at: now - 2 * D, kind: 'credit', label: '20% commission — Sana R. boosted $40', amount: 8 },
  ];
  let balance = 0, lifetime = 0, pending = 0;
  const chronological = seed.map((t, i) => {
    const amount = Math.round(t.amount * 100) / 100;
    if (t.status === 'pending') { balance -= amount; pending += amount; }
    else if (t.kind === 'credit') { balance += amount; lifetime += amount; }
    else { balance -= amount; }
    return { id: 'tx-demo-' + i, at: t.at, kind: t.kind, label: t.label, amount, status: t.status || 'done' };
  });
  balance = Math.round(balance * 100) / 100;
  lifetime = Math.round(lifetime * 100) / 100;
  pending = Math.round(pending * 100) / 100;
  return { balance: Math.max(0, balance), pending, lifetime, txns: chronological.reverse() };
}

export function ensureMemberDemo() {
  try {
    // Production must show the REAL member flow (login with issued
    // credentials), never the demo account. Set VITE_DEMO_SEED=off in the
    // production env to disable demo seeding.
    if (import.meta.env.VITE_DEMO_SEED === 'off') return getMember();
    if (localStorage.getItem(LS_MEMBER_SEED) !== null) return getMember();
    // A real pending claim takes precedence over the demo member.
    if (getPendingClaim()) return null;
    const slug = 'pixelpaws-studio';
    const local = readLS(LS_SPOTS, []);
    if (!local.some((s) => s.slug === slug)) {
      local.unshift({
        id: 'manual-demomember', slug, name: 'PixelPaws Studio',
        tagline: 'Playful branding for bold startups.',
        description: 'A tiny branding studio making loud identities for early-stage startups. Logos, mascots and memes that people remember.',
        website: 'https://pixelpaws.studio', socials: { instagram: 'https://instagram.com/pixelpaws' },
        logo: null, mark: '🐾', email: 'amira@pixelpaws.studio',
        amount: 34, category: 'startups', clicks: 212, views: 1840,
        joinedAt: Date.now() - 20 * 86400e3, trend: [12, 18, 22, 27, 34],
        pending: false, manual: true, approvedAt: Date.now() - 20 * 86400e3,
      });
      writeLS(LS_SPOTS, local);
    }
    const member = {
      name: 'Amira K.', email: 'amira@pixelpaws.studio', spotSlug: slug,
      companyName: 'PixelPaws Studio', avatarUrl: '', logoUrl: '', promoteAs: 'logo',
      usdt: { network: 'TRC-20', address: 'TJk8vQm2xR4pL9nW3sDf6hJz1cVb5N' },
      notify: { payouts: true, rankAlerts: true, referrals: true },
      referrals: [
        { id: 'ref-jon', name: 'Jon D.', at: Date.now() - 3 * 86400e3, spend: 5, commission: 1 },
        { id: 'ref-priya', name: 'Priya S.', at: Date.now() - 4 * 86400e3, spend: 15, commission: 3 },
        { id: 'ref-leo', name: 'Leo M.', at: Date.now() - 8 * 86400e3, spend: 5, commission: 1 },
      ],
      createdAt: Date.now() - 20 * 86400e3, demo: true,
    };
    writeLS(LS_MEMBER, member);
    writeLS(LS_WALLET, seedWalletTxns());
    try { createReferralIdentity(slug, 'Amira K.'); } catch {}
    localStorage.setItem(LS_MEMBER_SEED, '1');
    return member;
  } catch { return getMember(); }
}
