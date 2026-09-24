// Spotlight Auction API (Vercel KV).
//
// GET   /api/auction                                   public — round state, never bidder emails
// POST  /api/auction {action:'place', ...}              public — submit a bid (payment proof + admin approval, like claims)
// POST  /api/auction {action:'approve'|'reject', submissionId, adminPin}
// POST  /api/auction {action:'settle', slot, adminPin}
//
// Bids reuse the submissions queue (kind:'bid') so the admin sees payment
// proof in one place. /api/submissions PATCH refuses bid decisions so the
// auction state can only change here, where the top-bid invariants hold.
import { kv, json, getIp, ADMIN_PIN, APP_URL, claimRateOk, sendEmail } from './_lib/mail.js';
import {
  AUCTION_SLOTS, slotById, currentRoundId, getAuctionState, minNextBidFor,
} from './_lib/auction.js';

const newBidId = () => 'sub-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function parseBody(req) {
  try {
    return typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch { return null; }
}

const normUrl = (v) => {
  const t = String(v || '').trim();
  if (!t) return '';
  return /^https?:\/\//i.test(t) ? t.slice(0, 200) : ('https://' + t).slice(0, 200);
};

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

// Dark/gold inline HTML, consistent with the transactional templates.
function mailShell({ preheader, title, body }) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background-color:#0B0F19;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0B0F19;">
<tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#131A30;border:1px solid #26304F;border-radius:20px;">
<tr><td align="center" style="padding:30px 34px 24px;border-bottom:1px solid #26304F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<div style="font-size:28px;font-weight:800;color:#FFFFFF;">Flex<span style="color:#F5C044;">Spot</span></div>
<div style="margin-top:10px;font-size:10px;letter-spacing:4px;color:#F5C044;font-weight:700;">BID FOR ATTENTION</div></td></tr>
<tr><td style="padding:30px 34px 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">${body}</td></tr>
<tr><td align="center" style="padding:22px 34px 30px;border-top:1px solid #26304F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<div style="font-size:12px;color:#8A91B5;line-height:1.8;">You are receiving this email because of activity linked to your FlexSpot account.<br>
<a href="${APP_URL}" style="color:#F5C044;text-decoration:none;font-weight:700;">flexspot.lol</a>&nbsp;&nbsp;·&nbsp;&nbsp;Big brand visibility, from $1.</div></td></tr>
</table><div style="font-size:11px;color:#8A91B5;text-align:center;padding:16px 0 4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">© FlexSpot · flexspot.lol</div>
</td></tr></table></body></html>`;
}

const h1 = (t) => `<div style="font-size:24px;font-weight:800;color:#FFFFFF;line-height:1.25;">${esc(t)}</div>`;
const p = (t) => `<p style="font-size:15px;color:#C9CDE6;line-height:1.65;">${t}</p>`;
const btn = (label, href) =>
  `<div style="margin:26px 0;"><a href="${href}" style="display:inline-block;background:#F5C044;color:#0B0F19;font-weight:800;font-size:15px;text-decoration:none;padding:14px 30px;border-radius:12px;">${esc(label)}</a></div>`;

export default async function handler(req, res) {
  const store = await kv();
  if (!store) return json(res, 503, { ok: false, error: 'auction not connected (connect Vercel KV)' });

  // ── public state ─────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const state = await getAuctionState(store);
      return json(res, 200, { ok: true, ...state });
    } catch {
      return json(res, 500, { ok: false, error: 'auction read failed' });
    }
  }

  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'method not allowed' });
  const body = parseBody(req);
  if (!body) return json(res, 400, { ok: false, error: 'bad json' });
  const { action } = body;

  // ── public: place a bid ──────────────────────────────────────────
  if (action === 'place') {
    if (!(await claimRateOk(getIp(req)))) {
      return json(res, 429, { ok: false, error: 'too many bids, try again later' });
    }
    const slot = slotById(String(body.slot || ''));
    if (!slot) return json(res, 400, { ok: false, error: 'unknown auction slot' });
    const brandName = String(body.brandName || '').trim();
    if (brandName.length < 2 || brandName.length > 80) {
      return json(res, 400, { ok: false, error: 'brand name must be 2–80 characters' });
    }
    const email = String(body.email || '').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json(res, 400, { ok: false, error: 'a valid email is required (outbid alerts go there)' });
    }
    if (!body.hasScreenshot) {
      return json(res, 400, { ok: false, error: 'payment screenshot is required — we verify every bid by hand' });
    }
    let state;
    try { state = await getAuctionState(store); } catch {
      return json(res, 500, { ok: false, error: 'auction read failed' });
    }
    const slotState = state.slots.find((s) => s.slot === slot.slot);
    const amount = Math.round(Number(body.amount) * 100) / 100;
    if (!Number.isFinite(amount) || amount < slotState.minNextBid) {
      return json(res, 400, {
        ok: false,
        error: `bid must be at least $${slotState.minNextBid.toFixed(2)}`,
        minNextBid: slotState.minNextBid,
      });
    }
    const id = newBidId();
    const now = Date.now();
    const sub = {
      id,
      kind: 'bid',
      slot: slot.slot,
      roundId: state.roundId,
      brandName,
      slug: '',
      amount,
      email,
      name: brandName,
      tagline: String(body.tagline || '').slice(0, 140),
      website: normUrl(body.website),
      category: 'startups',
      network: String(body.network || '').slice(0, 40),
      txId: String(body.txId || '').slice(0, 120),
      hasScreenshot: true,
      status: 'pending',
      history: [{ at: now, event: 'submitted' }],
      createdAt: now,
    };
    try {
      await store.set(`sub:${id}`, sub);
      await store.zadd('subs:idx:pending', { score: now, member: id });
      await store.zadd('subs:idx:all', { score: now, member: id });
    } catch {
      return json(res, 500, { ok: false, error: 'bid queue write failed' });
    }
    return json(res, 200, { ok: true, id, status: 'pending', roundId: state.roundId });
  }

  // ── admin actions ────────────────────────────────────────────────
  if (!ADMIN_PIN || body.adminPin !== ADMIN_PIN) return json(res, 403, { ok: false, error: 'admin only' });

  if (action === 'approve') {
    const submissionId = String(body.submissionId || '');
    let sub = null;
    try { sub = submissionId ? await store.get(`sub:${submissionId}`) : null; } catch {}
    if (!sub || sub.kind !== 'bid') return json(res, 400, { ok: false, error: 'not a bid submission' });
    if (sub.status !== 'pending') return json(res, 400, { ok: false, error: `bid already ${sub.status}` });
    const roundId = currentRoundId();
    if (sub.roundId !== roundId) {
      return json(res, 400, { ok: false, error: 'bid is from a past round — ask the bidder to place a fresh bid' });
    }
    const slot = slotById(sub.slot);
    if (!slot) return json(res, 400, { ok: false, error: 'unknown auction slot' });
    const key = `auction:round:${roundId}:${slot.slot}`;
    let top = null;
    try { top = await store.get(key); } catch {}
    const min = minNextBidFor(top);
    if (!(Number(sub.amount) >= min)) {
      return json(res, 400, {
        ok: false,
        error: 'no longer highest — a bigger bid was approved first',
        minNextBid: min,
      });
    }
    const now = Date.now();
    const bid = {
      amount: Math.round(Number(sub.amount) * 100) / 100,
      brandName: sub.brandName,
      email: sub.email,
      submissionId: sub.id,
      website: sub.website || '',
      tagline: sub.tagline || '',
      roundId,
      updatedAt: now,
    };
    sub.status = 'approved';
    sub.reviewedAt = now;
    sub.decidedBy = 'admin';
    sub.history = [...(sub.history || []), { at: now, event: 'bid-approved', amount: bid.amount }];
    try {
      await store.set(key, bid);
      await store.lpush(`auction:hist:${roundId}:${slot.slot}`, bid);
      await store.ltrim(`auction:hist:${roundId}:${slot.slot}`, 0, 49);
      await store.set(`sub:${sub.id}`, sub);
      await store.zrem('subs:idx:pending', sub.id);
      await store.zadd('subs:idx:approved', { score: now, member: sub.id });
    } catch {
      return json(res, 500, { ok: false, error: 'auction write failed' });
    }
    // Outbid notice to the previous top bidder (best-effort, never blocks).
    if (top && top.email && top.email !== sub.email) {
      const first = String(top.brandName || 'there').split(' ')[0] || 'there';
      sendEmail({
        to: top.email,
        subject: `Outbid on ${slot.title} — FlexSpot Spotlight Auction`,
        html: mailShell({
          preheader: `Someone just topped your $${bid.amount} bid on ${slot.title}.`,
          title: 'Outbid on the Spotlight Auction',
          body:
            h1(`You've been outbid on ${slot.emoji} ${slot.title}`) +
            p(`Hi ${esc(first)},<br><br>Your <b style="color:#FFFFFF;">$${Number(top.amount).toFixed(2)}</b> bid was topped by <b style="color:#FFFFFF;">${esc(bid.brandName)}</b> at <b style="color:#F5C044;">$${bid.amount.toFixed(2)}</b>.`) +
            p(`The round ends Monday 00:00 UTC — raise your bid to take the spotlight back.`) +
            btn('Raise my bid →', `${APP_URL}/auction`),
        }),
      }).catch(() => {});
    }
    return json(res, 200, {
      ok: true,
      id: sub.id,
      topBid: { amount: bid.amount, brandName: bid.brandName, updatedAt: bid.updatedAt },
    });
  }

  if (action === 'reject') {
    const submissionId = String(body.submissionId || '');
    let sub = null;
    try { sub = submissionId ? await store.get(`sub:${submissionId}`) : null; } catch {}
    if (!sub || sub.kind !== 'bid') return json(res, 400, { ok: false, error: 'not a bid submission' });
    if (sub.status !== 'pending') return json(res, 400, { ok: false, error: `bid already ${sub.status}` });
    const now = Date.now();
    sub.status = 'rejected';
    sub.reviewedAt = now;
    sub.decidedBy = 'admin';
    sub.history = [...(sub.history || []), { at: now, event: 'decision', decision: 'rejected', note: String(body.note || '').slice(0, 500) }];
    try {
      await store.set(`sub:${sub.id}`, sub);
      await store.zrem('subs:idx:pending', sub.id);
      await store.zadd('subs:idx:rejected', { score: now, member: sub.id });
    } catch {
      return json(res, 500, { ok: false, error: 'queue write failed' });
    }
    return json(res, 200, { ok: true, id: sub.id, status: 'rejected' });
  }

  if (action === 'settle') {
    const slot = slotById(String(body.slot || ''));
    if (!slot) return json(res, 400, { ok: false, error: 'unknown auction slot' });
    const roundId = currentRoundId();
    const key = `auction:round:${roundId}:${slot.slot}`;
    let top = null;
    try { top = await store.get(key); } catch {}
    if (!top) return json(res, 400, { ok: false, error: 'nothing to settle — no approved bids this round' });
    const now = Date.now();
    const winner = {
      brandName: top.brandName,
      amount: Number(top.amount) || 0,
      roundId,
      website: top.website || '',
      tagline: top.tagline || '',
      settledAt: now,
    };
    try {
      await store.set(`auction:winner:${slot.slot}`, winner);
      await store.del(key);
    } catch {
      return json(res, 500, { ok: false, error: 'settle write failed' });
    }
    // Winner notice (best-effort, never blocks).
    if (top.email) {
      const first = String(top.brandName || 'there').split(' ')[0] || 'there';
      sendEmail({
        to: top.email,
        subject: `You won the ${slot.title} — FlexSpot Spotlight Auction`,
        html: mailShell({
          preheader: `Your $${winner.amount} bid won the ${slot.title}. Live on the homepage for 7 days.`,
          title: 'You won the Spotlight',
          body:
            h1(`🏆 You won the ${slot.emoji} ${slot.title}!`) +
            p(`Hi ${esc(first)},<br><br>Your <b style="color:#F5C044;">$${winner.amount.toFixed(2)}</b> bid held through the end of the round — <b style="color:#FFFFFF;">${esc(winner.brandName)}</b> is live on the FlexSpot homepage spotlight for the next 7 days.`) +
            p(`Share your moment — every visitor sees your brand first.`) +
            btn('See the spotlight →', `${APP_URL}/auction`),
        }),
      }).catch(() => {});
    }
    return json(res, 200, { ok: true, slot: slot.slot, winner });
  }

  return json(res, 400, { ok: false, error: 'unknown action' });
}

export { AUCTION_SLOTS };
