// Shared Spotlight Auction helpers (Vercel serverless, @vercel/kv).
// One 7-day round per ISO week; each round has 3 homepage spotlight slots.
// Bids follow the manual-verification model: a bid submission carries payment
// proof, an admin approves it, and only then does it become the top bid.
//
// KV keys:
//   auction:round:<roundId>:<slot>  current highest bid {amount, brandName, email, submissionId, website, tagline, roundId, updatedAt}
//   auction:hist:<roundId>:<slot>   bid history list (newest first, capped at 50)
//   auction:winner:<slot>           last settled winner {brandName, amount, roundId, website, tagline, settledAt}

export const AUCTION_SLOTS = [
  { slot: 'spotlight-1', title: 'Champion Spotlight', emoji: '🥇' },
  { slot: 'spotlight-2', title: 'Runner-up Spotlight', emoji: '🥈' },
  { slot: 'spotlight-3', title: 'Rising Spotlight', emoji: '🥉' },
];

export const AUCTION_RESERVE = 25;        // opening bid per slot, USD
export const AUCTION_MIN_INCREMENT = 5;    // minimum raise over the top bid, USD
export const FOUNDERS_TOTAL = 100;        // Founding 100 member badges

export function slotById(slot) {
  return AUCTION_SLOTS.find((s) => s.slot === slot) || null;
}

/** ISO week id, e.g. "2026-W39", computed in UTC. */
export function currentRoundId(now = Date.now()) {
  const d = new Date(now);
  const utc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const day = (new Date(utc).getUTCDay() + 6) % 7; // Monday = 0
  const thursday = utc - day * 864e5 + 3 * 864e5;
  const y = new Date(thursday).getUTCFullYear();
  const jan4 = Date.UTC(y, 0, 4);
  const jan4day = (new Date(jan4).getUTCDay() + 6) % 7;
  const firstThursday = jan4 - jan4day * 864e5 + 3 * 864e5;
  const week = 1 + Math.round((thursday - firstThursday) / (7 * 864e5));
  return `${y}-W${String(week).padStart(2, '0')}`;
}

/** Round ends Monday 00:00 UTC (start of the next ISO week). */
export function roundEndsAt(now = Date.now()) {
  const d = new Date(now);
  const day = (d.getUTCDay() + 6) % 7; // Monday = 0
  const monday = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - day * 864e5;
  return monday + 7 * 864e5;
}

export function minNextBidFor(top) {
  if (!top || !Number.isFinite(Number(top.amount))) return AUCTION_RESERVE;
  return Math.round((Number(top.amount) + AUCTION_MIN_INCREMENT) * 100) / 100;
}

/** Public auction state — bidder emails are NEVER included. */
export async function getAuctionState(store) {
  const roundId = currentRoundId();
  const endsAt = roundEndsAt();
  const slots = [];
  for (const { slot, title, emoji } of AUCTION_SLOTS) {
    let top = null;
    try { top = await store.get(`auction:round:${roundId}:${slot}`); } catch {}
    slots.push({
      slot,
      title,
      emoji,
      topBid: top
        ? { amount: Number(top.amount) || 0, brandName: top.brandName || 'Anonymous', updatedAt: top.updatedAt || 0 }
        : null,
      minNextBid: minNextBidFor(top),
    });
  }
  const winners = [];
  for (const { slot, title, emoji } of AUCTION_SLOTS) {
    let w = null;
    try { w = await store.get(`auction:winner:${slot}`); } catch {}
    if (w) {
      winners.push({
        slot,
        title,
        emoji,
        brandName: w.brandName || 'Anonymous',
        amount: Number(w.amount) || 0,
        roundId: w.roundId || '',
        website: w.website || '',
        settledAt: w.settledAt || 0,
      });
    }
  }
  return { roundId, endsAt, reserve: AUCTION_RESERVE, minIncrement: AUCTION_MIN_INCREMENT, slots, winners };
}
