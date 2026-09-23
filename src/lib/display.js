// src/lib/display.js
// PUBLIC display multipliers — what visitors SEE on the public site.
// The admin dashboard ALWAYS shows REAL numbers (labeled "Real").
// Owner policy: the public site should look alive, so displayed viewer
// counts and amounts get a tasteful lift. These functions are the ONLY
// place that lift happens — never present multiplied numbers as real.
import { useEffect, useState } from 'react';

const DISPLAY_KEY = 'flexspot_display_tuning_v1';

export function getDisplayTuning() {
  let t = null;
  try { t = JSON.parse(localStorage.getItem(DISPLAY_KEY)); } catch {}
  return {
    // online viewers
    onlineFloor: 29,            // never show fewer than this
    onlineSmallCap: 15,         // real <= this uses the "small" multiplier range
    onlineSmallMult: 5,         // x5..x8 for small real counts
    onlineSmallJitter: 3,
    onlineBigMult: 2.5,         // x2.5..x4 for larger real counts
    onlineBigJitter: 1.5,
    // amounts
    amountMult: 1.06,           // +6%
    amountAdd: 3,               // +$3 flat
    // seed when there's no real data at all (fresh browser)
    seedOnlineMin: 29,
    seedOnlineMax: 61,
    ...(t || {}),
  };
}

export function saveDisplayTuning(patch) {
  const next = { ...getDisplayTuning(), ...patch };
  try { localStorage.setItem(DISPLAY_KEY, JSON.stringify(next)); } catch {}
  return next;
}

function rand(a, b) {
  return a + Math.random() * (b - a);
}

// Compute a displayed "online now" count from the REAL count.
// Guarantees the owner-requested 29–61 style floor with natural variation:
// 29/31/32 when quiet, climbing proportionally with real traffic.
export function displayOnlineCount(real, tuning) {
  const t = tuning || getDisplayTuning();
  const r = Math.max(0, Number(real) || 0);
  let n;
  if (r <= 0) {
    n = Math.round(rand(t.seedOnlineMin, t.seedOnlineMax));
  } else if (r <= t.onlineSmallCap) {
    n = Math.round(r * rand(t.onlineSmallMult, t.onlineSmallMult + t.onlineSmallJitter));
  } else {
    n = Math.round(r * rand(t.onlineBigMult, t.onlineBigMult + t.onlineBigJitter));
  }
  return Math.max(t.onlineFloor, n);
}

// Compute a displayed amount from the REAL amount ($ spent). Gentle lift.
export function displayAmount(real, tuning) {
  const t = tuning || getDisplayTuning();
  const r = Math.max(0, Number(real) || 0);
  return Math.round((r * t.amountMult + t.amountAdd) * 100) / 100;
}

// React hook: displayed online count that re-jitters gently every 4s.
// Never jumps wildly — the jitter walks the number by ±1..3 around the
// target derived from the real count.
export function useDisplayOnline(real) {
  const [shown, setShown] = useState(() => displayOnlineCount(real));
  useEffect(() => {
    const target = displayOnlineCount(real);
    setShown((prev) => {
      if (!prev) return target;
      // walk toward the new target in small steps instead of jumping
      const diff = target - prev;
      if (Math.abs(diff) <= 3) return target;
      return prev + (diff > 0 ? 1 : -1) * Math.ceil(Math.abs(diff) / 3);
    });
    const t = setInterval(() => {
      const tgt = displayOnlineCount(real);
      setShown((prev) => {
        const diff = tgt - prev;
        if (Math.abs(diff) <= 2) return tgt;
        return Math.max(29, prev + (diff > 0 ? 1 : -1) * (1 + Math.floor(Math.random() * 3)));
      });
    }, 4000);
    return () => clearInterval(t);
  }, [real]);
  return shown;
}
