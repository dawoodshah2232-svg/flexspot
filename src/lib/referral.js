// src/lib/referral.js
// The public Top Referrers board: ranks referrers by affiliate performance —
// members referred and 20% instant commission earned on their payments.
// There is no per-visit reward. Curated demo board (versioned, so old
// browsers migrate automatically) enriched with the current member's REAL
// affiliate stats, matched by member name.
import { getMember } from './member';

const BOARD_KEY = 'flexspot_referrer_board_v4';
const BOARD_VERSION = 4;

// Curated demo board — 8 referrers with small, credible 20%-of-payment
// commissions (e.g. $5.00 = 20% of $25 in referred payments). Umar sits at #7
// per the owner's request.
const SEED = [
  { name: 'Ahmed R.', members: 4, commission: 5.0 },
  { name: 'CryptoMama', members: 3, commission: 4.2 },
  { name: 'DXB Hustle', members: 3, commission: 3.6 },
  { name: 'Lena W.', members: 3, commission: 3.0 },
  { name: 'Sara K.', members: 2, commission: 2.4 },
  { name: 'Omar F.', members: 2, commission: 1.8 },
  { name: 'Umar', members: 2, commission: 1.2 },
  { name: 'Fatima A.', members: 1, commission: 0.6 },
];

function loadBoard() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(BOARD_KEY)); } catch {}
  if (!saved || saved.version !== BOARD_VERSION || !Array.isArray(saved.rows)) {
    saved = { version: BOARD_VERSION, rows: SEED.map((r) => ({ ...r })) };
    try { localStorage.setItem(BOARD_KEY, JSON.stringify(saved)); } catch {}
  }
  return saved.rows;
}

// Merge the current member's real affiliate performance (by member name) on
// top of the board.
function withRealStats(rows) {
  const byName = new Map(rows.map((r) => [r.name.trim().toLowerCase(), r]));
  try {
    const m = getMember();
    if (m && m.name) {
      const key = m.name.trim().toLowerCase();
      const refs = m.referrals || [];
      const members = refs.length;
      const commission = refs.reduce((a, r) => a + (Number(r.commission) || 0), 0);
      if (members > 0 || commission > 0) {
        if (byName.has(key)) {
          const row = byName.get(key);
          row.members += members;
          row.commission = Math.round((row.commission + commission) * 100) / 100;
        } else {
          byName.set(key, { name: m.name.trim(), members, commission });
        }
      }
    }
  } catch {}
  return [...byName.values()]
    .sort((a, b) => b.commission - a.commission || b.members - a.members || a.name.localeCompare(b.name))
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

export function topReferrers() {
  try { return withRealStats(loadBoard()); } catch { return SEED.map((r, i) => ({ ...r, rank: i + 1 })); }
}
