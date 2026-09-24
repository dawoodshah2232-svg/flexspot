// src/lib/referral.js
// The public Top Referrers board: ranks referrers by affiliate performance —
// members referred and 20% instant commission earned on their payments.
// There is no per-visit reward. Curated demo board (versioned, so old
// browsers migrate automatically) enriched with the current member's REAL
// affiliate stats, matched by member name.
import { getMember } from './member';

const BOARD_KEY = 'flexspot_referrer_board_v3';
const BOARD_VERSION = 3;

// Curated demo board — members/commission are display seeds. Umar sits at #7
// per the owner's request (ranks 7–10 zone).
const SEED = [
  { name: 'Ahmed R.', members: 6, commission: 48.0 },
  { name: 'CryptoMama', members: 5, commission: 41.5 },
  { name: 'DXB Hustle', members: 5, commission: 36.0 },
  { name: 'Lena W.', members: 4, commission: 29.2 },
  { name: 'Sara K.', members: 4, commission: 24.0 },
  { name: 'Omar F.', members: 3, commission: 19.8 },
  { name: 'Umar', members: 3, commission: 15.0 },
  { name: 'Fatima A.', members: 2, commission: 12.4 },
  { name: 'Raj P.', members: 2, commission: 9.0 },
  { name: 'Nina S.', members: 2, commission: 7.2 },
  { name: 'Khalid M.', members: 1, commission: 5.0 },
  { name: 'Zoe T.', members: 1, commission: 3.4 },
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
