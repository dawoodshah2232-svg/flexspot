// src/lib/spotApi.js
// Client for the central spot manager (/api/spots, Vercel KV).
// Public reads are cached (memory + localStorage) so the site still renders
// when the API is unreachable; admin writes bust the cache immediately.
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '';
const LS_CACHE = 'flexspot_managed_spots_v2';
const CACHE_TTL = 60 * 1000;

let mem = null; // { at, spots, hidden }

async function req(method, body) {
  const r = await fetch('/api/spots', {
    method,
    headers: { 'Content-Type': 'application/json', 'x-admin-pin': ADMIN_PIN },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.ok === false) throw new Error(j.error || `spot ${method} failed (${r.status})`);
  return j;
}

function readCache() {
  if (mem && Date.now() - mem.at < CACHE_TTL) return mem;
  try {
    const c = JSON.parse(localStorage.getItem(LS_CACHE) || 'null');
    if (c && Array.isArray(c.spots)) {
      mem = { hidden: [], ...c };
      if (Date.now() - mem.at < CACHE_TTL) return mem;
    }
  } catch {}
  return null;
}

function stale() {
  try {
    const c = JSON.parse(localStorage.getItem(LS_CACHE) || 'null');
    if (c && Array.isArray(c.spots)) { mem = { hidden: [], ...c }; return mem; }
  } catch {}
  return null;
}

/** Shared loader — returns { spots, hidden }. Never throws. */
async function loadManaged(includeHidden = false) {
  const warm = readCache();
  if (warm && !includeHidden) return warm;
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 8000);
    const url = includeHidden ? '/api/spots?includeHidden=1' : '/api/spots';
    const opts = includeHidden ? { headers: { 'x-admin-pin': ADMIN_PIN } } : {};
    const r = await fetch(url, { signal: ctl.signal, ...opts });
    clearTimeout(t);
    const j = await r.json().catch(() => ({}));
    const spots = r.ok && j.ok && Array.isArray(j.spots) ? j.spots : [];
    const hidden = r.ok && j.ok && Array.isArray(j.hidden) ? j.hidden : [];
    const data = { at: Date.now(), spots, hidden };
    if (!includeHidden) {
      mem = data;
      try { localStorage.setItem(LS_CACHE, JSON.stringify(mem)); } catch {}
    }
    return data;
  } catch {
    // offline / KV not connected — fall back to stale cache, then empty
    const c = stale();
    if (c) return c;
    return { at: 0, spots: [], hidden: [] };
  }
}

/** Public list of admin-managed spots. Never throws — returns [] when unavailable. */
export async function fetchManagedSpots() {
  return (await loadManaged(false)).spots;
}

/** Slugs the admin has hidden (tombstoned). Never throws — returns [] when unavailable. */
export async function fetchManagedHidden() {
  return (await loadManaged(false)).hidden;
}

/** Admin-only full listing incl. hidden records (for the restore UI). Always fresh. */
export async function adminListAllSpots() {
  bustManagedCache();
  const d = await loadManaged(true);
  return d.spots;
}

/** Restore a hidden spot (un-hide). */
export const adminRestoreSpot = (slug) => withBust(req('PATCH', { adminPin: ADMIN_PIN, slug, hidden: false }));

/** Force the next fetchManagedSpots() to hit the network (after admin edits). */
export function bustManagedCache() {
  mem = null;
  try { localStorage.removeItem(LS_CACHE); } catch {}
}

const withBust = async (p) => {
  const r = await p;
  bustManagedCache();
  return r;
};

export const adminCreateSpot = (spot) => withBust(req('POST', { adminPin: ADMIN_PIN, ...spot }));
export const adminUpdateSpot = (slug, patch) => withBust(req('PATCH', { adminPin: ADMIN_PIN, slug, ...patch }));
export const adminDeleteSpot = (slug) => withBust(req('DELETE', { adminPin: ADMIN_PIN, slug }));

/** Downscale an image file to a data URL (max dimension + JPEG quality), or null. */
export function fileToDataUrl(file, maxDim = 512, quality = 0.82) {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        try {
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          URL.revokeObjectURL(url);
          let q = quality;
          let out = c.toDataURL('image/jpeg', q);
          while (out.length > 600000 && q > 0.4) {
            q -= 0.15;
            out = c.toDataURL('image/jpeg', q);
          }
          resolve(out.length > 640000 ? null : out);
        } catch { URL.revokeObjectURL(url); resolve(null); }
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    } catch { resolve(null); }
  });
}
