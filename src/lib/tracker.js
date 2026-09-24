// Client-side tracker — sends anonymous visit beacons to /api/track (KV).
// No IP, no cookies: just a random visitor id in localStorage. Admin pages
// (/admin) are never tracked, so Dawood's own browsing never pollutes stats.
import { useEffect, useState } from 'react';

const LS_VID = 'flexspot_vid';
const SS_SID = 'flexspot_sid';
const BEAT_MS = 20000;

export function getVisitorId() {
  if (typeof window === 'undefined') return 'anon';
  let id = null;
  try { id = localStorage.getItem(LS_VID); } catch {}
  if (!id) {
    id = 'v-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    try { localStorage.setItem(LS_VID, id); } catch {}
  }
  return id;
}

export function getSessionId() {
  if (typeof window === 'undefined') return 's0';
  let sid = null;
  try { sid = sessionStorage.getItem(SS_SID); } catch {}
  if (!sid) {
    sid = 's-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    try { sessionStorage.setItem(SS_SID, sid); } catch {}
  }
  return sid;
}

export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
}

function send(payload) {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
    } else {
      fetch('/api/track', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body }).catch(() => {});
    }
  } catch {}
}

const base = () => ({
  vid: getVisitorId(),
  sid: getSessionId(),
  dev: isMobileDevice() ? 'mobile' : 'desktop',
});

export function trackView(page) {
  if (typeof window === 'undefined') return;
  send({ ...base(), t: 'view', page, ref: document.referrer || '' });
}

export function trackEvent(name, props = {}) {
  if (typeof window === 'undefined') return;
  const n = String(name || '').slice(0, 40);
  if (!n) return;
  send({ ...base(), t: 'event', name: n, page: window.location.pathname });
}

function beat(page) {
  send({ ...base(), t: 'beat', page });
}

/** Send one heartbeat immediately (compat wrapper). */
export function beatNow(page) {
  if (typeof window === 'undefined') return;
  beat(page || window.location.pathname);
}

let timer = null;
let curPage = '/';
let pageStart = 0;

function onHide() {
  try {
    send({ ...base(), t: 'leave', page: curPage, ms: Date.now() - pageStart });
  } catch {}
}

/** Start view + heartbeat loop for a page. Call on every SPA navigation. */
export function startTracking(page) {
  if (typeof window === 'undefined') return;
  stopTracking();
  curPage = page;
  pageStart = Date.now();
  trackView(page);
  beat(page);
  timer = setInterval(() => {
    if (document.visibilityState === 'visible') beat(curPage);
  }, BEAT_MS);
  window.addEventListener('pagehide', onHide);
}

export function stopTracking() {
  if (timer) clearInterval(timer);
  timer = null;
  if (typeof window !== 'undefined') window.removeEventListener('pagehide', onHide);
}

/** Live online-visitor list from the server (public count endpoint). */
export function useServerOnline(pollMs = 10000) {
  const [online, setOnline] = useState([]);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch('/api/track?public=1', { cache: 'no-store' });
        const j = await r.json();
        if (alive && j && j.ok) setOnline(new Array(j.online).fill(0).map((_, i) => ({ vid: 'live-' + i })));
      } catch {}
    };
    load();
    const t = setInterval(load, pollMs);
    return () => { alive = false; clearInterval(t); };
  }, [pollMs]);
  return online;
}

/** Admin: full traffic stats (needs PIN). */
export async function fetchTrafficStats(pin, days = 7) {
  const r = await fetch(`/api/track?days=${days}`, { headers: { 'x-admin-pin': pin }, cache: 'no-store' });
  const j = await r.json();
  if (!j || !j.ok) throw new Error(j?.error || 'traffic unavailable');
  return j;
}

/** Admin: one visitor's page trail (needs PIN). */
export async function fetchVisitorTrail(pin, vid) {
  const r = await fetch(`/api/track?trail=${encodeURIComponent(vid)}`, { headers: { 'x-admin-pin': pin }, cache: 'no-store' });
  const j = await r.json();
  if (!j || !j.ok) throw new Error('trail unavailable');
  return j.trail || [];
}
