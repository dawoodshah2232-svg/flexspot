// src/lib/referral.js
// The public Top Referrers board. A curated demo board (versioned, so old
// browsers migrate automatically) enriched with REAL tracked referral visits
// from this browser's event ledger, matched by referrer name.
import { readLS } from './store';

const BOARD_KEY = 'flexspot_referrer_board_v2';
const BOARD_VERSION = 2;

// Curated demo board — visits/earned are display seeds. Umar sits at #7 per
// the owner's request (ranks 7–10 zone).
const SEED = [
  { name: 'Ahmed R.', visits: 14, earned: 14 },
  { name: 'CryptoMama', visits: 11, earned: 11 },
  { name: 'DXB Hustle', visits: 9, earned: 9 },
  { name: 'Lena W.', visits: 7, earned: 7 },
  { name: 'Sara K.', visits: 6, earned: 6 },
  { name: 'Omar F.', visits: 5, earned: 5 },
  { name: 'Umar', visits: 4, earned: 4 },
  { name: 'Fatima A.', visits: 4, earned: 4 },
  { name: 'Raj P.', visits: 3, earned: 3 },
  { name: 'Nina S.', visits: 3, earned: 3 },
  { name: 'Khalid M.', visits: 2, earned: 2 },
  { name: 'Zoe T.', visits: 2, earned: 2 },
];

const LS_REF_ID = 'flexspot_ref_identities_v1';
const LS_REF_STATS = 'flexspot_ref_stats_v1';

function loadBoard() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(BOARD_KEY)); } catch {}
  if (!saved || saved.version !== BOARD_VERSION || !Array.isArray(saved.rows)) {
    saved = { version: BOARD_VERSION, rows: SEED.map((r) => ({ ...r })) };
    try { localStorage.setItem(BOARD_KEY, JSON.stringify(saved)); } catch {}
  }
  return saved.rows;
}

// Merge real tracked visits (by referrer name) on top of the board.
function withRealStats(rows) {
  const byName = new Map(rows.map((r) => [r.name.trim().toLowerCase(), r]));
  let ids = {}, stats = {};
  try {
    ids = readLS(LS_REF_ID, {});
    stats = readLS(LS_REF_STATS, {});
  } catch {}
  for (const code of Object.keys(stats)) {
    const id = ids[String(code).toUpperCase()];
    if (!id || !id.name) continue;
    const key = id.name.trim().toLowerCase();
    const s = stats[code] || {};
    const v = Number(s.visits) || 0, e = Number(s.earned) || 0;
    if (byName.has(key)) {
      const row = byName.get(key);
      row.visits += v; row.earned += e;
    } else if (v > 0 || e > 0) {
      byName.set(key, { name: id.name.trim(), visits: v, earned: e });
    }
  }
  return [...byName.values()]
    .sort((a, b) => b.earned - a.earned || b.visits - a.visits || a.name.localeCompare(b.name))
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

export function topReferrers() {
  try { return withRealStats(loadBoard()); } catch { return SEED.map((r, i) => ({ ...r, rank: i + 1 })); }
}
