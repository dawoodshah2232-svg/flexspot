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
    // online viewers — owner wants a LIVELY number that visibly moves up and
    // down every few seconds (e.g. 21, 28, 35…), not one stuck value.
    onlineFloor: 21,            // it may dip this low, then climbs again
    onlineSmallCap: 15,         // real <= this uses the "small" multiplier range
    onlineSmallMult: 5,         // x5..x8 for small real counts
    onlineSmallJitter: 3,
    onlineBigMult: 2.5,         // x2.5..x4 for larger real counts
    onlineBigJitter: 1.5,
    // amounts — default is NO lift: what visitors see equals the real
    // amount, so a small launch board reads honestly small. The owner can
    // still tune this in ⚙️ Settings (stored in localStorage).
    amountMult: 1,              // x1.0
    amountAdd: 0,               // +$0 flat
    // seed when there's no real data at all (fresh browser)
    seedOnlineMin: 21,
    seedOnlineMax: 44,
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
// Rolls a lively 21–44 style number that drifts up and down, climbing
// proportionally when real traffic grows.
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

// Compute a displayed amount from the REAL amount ($ spent). No lift by
// default — the owner can add one in ⚙️ Settings.
export function displayAmount(real, tuning) {
  const t = tuning || getDisplayTuning();
  const r = Math.max(0, Number(real) || 0);
  return Math.round((r * t.amountMult + t.amountAdd) * 100) / 100;
}

// React hook: displayed online count that visibly drifts up and down every
// ~3s, so the site feels alive (21, 28, 35…). Walks in small steps toward a
// freshly rolled target — never jumps wildly, never sits still.
export function useDisplayOnline(real) {
  const [shown, setShown] = useState(() => displayOnlineCount(real));
  useEffect(() => {
    const tick = () => {
      const tgt = displayOnlineCount(real);
      setShown((prev) => {
        if (!prev) return tgt;
        const diff = tgt - prev;
        if (Math.abs(diff) <= 4) return tgt;
        const step = 1 + Math.floor(Math.random() * 4); // 1..4
        return Math.max(21, prev + (diff > 0 ? step : -step));
      });
    };
    tick();
    const t = setInterval(tick, 3000);
    return () => clearInterval(t);
  }, [real]);
  return shown;
}
