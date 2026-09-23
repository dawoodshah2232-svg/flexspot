// src/lib/analytics.js
// Local-first visitor analytics. Every number here is REAL (this browser's
// data) — the admin always shows these un-multiplied. The public site shows
// display.js-multiplied values. Local-first by design; Supabase wiring later.
import { useEffect, useState, useMemo } from 'react';

const LS_VID = 'flexspot_vid';
const LS_HEARTBEATS = 'flexspot_heartbeats_v1'; // [{ vid, ts, path, device, ref, entryPath }]
const LS_PAGEVIEWS = 'flexspot_pageviews_v1';  // [{ vid, sid, at, path, title, ref }]
const LS_EVENTS = 'flexspot_events_v1';         // [{ vid, sid, at, name, props }]
const MAX_EVENTS = 3000;
const ONLINE_WINDOW_MS = 90 * 1000;

const readLS = (k, fb) => {
  try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fb; } catch { return fb; }
};
const writeLS = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; }
};

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

let sessionId = null;
export function getSessionId() {
  if (typeof window === 'undefined') return 's0';
  if (!sessionId) {
    try { sessionId = sessionStorage.getItem('flexspot_sid'); } catch {}
    if (!sessionId) {
      sessionId = 's-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      try { sessionStorage.setItem('flexspot_sid', sessionId); } catch {}
    }
  }
  return sessionId;
}

export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
}

// --- recording ------------------------------------------------------------

export function trackPageView(path, title) {
  if (typeof window === 'undefined') return;
  const vid = getVisitorId(), sid = getSessionId();
  const pv = readLS(LS_PAGEVIEWS, []);
  pv.push({ vid, sid, at: Date.now(), path, title: title || '', ref: document.referrer || '' });
  writeLS(LS_PAGEVIEWS, pv.slice(-MAX_EVENTS));
  writeHeartbeat(path);
}

export function trackEvent(name, props = {}) {
  if (typeof window === 'undefined') return;
  const ev = readLS(LS_EVENTS, []);
  ev.push({ vid: getVisitorId(), sid: getSessionId(), at: Date.now(), name, props });
  writeLS(LS_EVENTS, ev.slice(-MAX_EVENTS));
}

export function writeHeartbeat(path) {
  if (typeof window === 'undefined') return;
  const beats = readLS(LS_HEARTBEATS, []);
  const vid = getVisitorId();
  const now = Date.now();
  const entry = {
    vid,
    sid: getSessionId(),
    ts: now,
    path: path || (window.location ? window.location.pathname + window.location.search : '/'),
    device: isMobileDevice() ? 'mobile' : 'desktop',
    ref: document.referrer || '',
    ua: (navigator.userAgent || '').slice(0, 120),
  };
  const others = beats.filter((b) => b.vid !== vid);
  // Keep history lean: drop heartbeats older than 15 minutes.
  const fresh = others.filter((b) => now - b.ts < 15 * 60 * 1000);
  writeLS(LS_HEARTBEATS, [...fresh, entry].slice(-500));
}

// --- reading (admin, always REAL) -----------------------------------------

export function getOnlineVisitors() {
  const beats = readLS(LS_HEARTBEATS, []);
  const now = Date.now();
  return beats
    .filter((b) => now - b.ts < ONLINE_WINDOW_MS)
    .map((b) => ({ ...b, dwellSec: Math.round((now - b.ts) / 1000) }));
}

export function getOnlineCount() {
  return getOnlineVisitors().length;
}

function startOfDay(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function getAnalyticsSummary() {
  const pvs = readLS(LS_PAGEVIEWS, []);
  const evs = readLS(LS_EVENTS, []);
  const now = Date.now();
  const todayStart = startOfDay(now);
  const yesterdayStart = todayStart - 24 * 3600 * 1000;

  const inToday = (v) => v.at >= todayStart;
  const inYesterday = (v) => v.at >= yesterdayStart && v.at < todayStart;

  const uniqVids = (list) => new Set(list.map((v) => v.vid)).size;

  const todayPV = pvs.filter(inToday);
  const ydayPV = pvs.filter(inYesterday);

  const byPath = {};
  const byDevice = { mobile: 0, desktop: 0 };
  pvs.forEach((v) => {
    byPath[v.path] = (byPath[v.path] || 0) + 1;
  });
  const beats = readLS(LS_HEARTBEATS, []);
  beats.forEach((b) => {
    if (b.device === 'mobile') byDevice.mobile += 1; else byDevice.desktop += 1;
  });

  const topPages = Object.entries(byPath)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([k, v]) => ({ k, v }));

  const bySource = {};
  pvs.forEach((v) => {
    let src = 'direct';
    try {
      if (v.ref) src = new URL(v.ref).hostname || 'referral';
    } catch { src = 'referral'; }
    bySource[src] = (bySource[src] || 0) + 1;
  });
  const topSources = Object.entries(bySource)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k, v]) => ({ k, v }));

  const eventsByName = {};
  evs.forEach((e) => { eventsByName[e.name] = (eventsByName[e.name] || 0) + 1; });

  return {
    real: true,
    onlineNow: getOnlineCount(),
    visitsToday: todayPV.length,
    visitsYesterday: ydayPV.length,
    visitorsToday: uniqVids(todayPV),
    visitorsYesterday: uniqVids(ydayPV),
    visitorsAllTime: uniqVids(pvs),
    pageViewsAllTime: pvs.length,
    topPages,
    topSources,
    deviceSplit: byDevice,
    eventsByName,
    // avg dwell: mean gap between consecutive pageviews in a session (approx)
    events: evs.slice(-200).reverse(),
  };
}

export function getVisitorTrail(vid) {
  const pvs = readLS(LS_PAGEVIEWS, []).filter((v) => v.vid === vid);
  const evs = readLS(LS_EVENTS, []).filter((v) => v.vid === vid);
  const trail = [
    ...pvs.map((v) => ({ at: v.at, kind: 'page', label: v.path, title: v.title })),
    ...evs.map((e) => ({ at: e.at, kind: 'event', label: e.name, props: e.props })),
  ];
  return trail.sort((a, b) => a.at - b.at);
}

// React hook: live online list refreshing on an interval.
export function useLiveOnline(pollMs = 1000) {
  const [online, setOnline] = useState(() => getOnlineVisitors());
  useEffect(() => {
    setOnline(getOnlineVisitors());
    const t = setInterval(() => setOnline(getOnlineVisitors()), pollMs);
    return () => clearInterval(t);
  }, [pollMs]);
  return online;
}

// --- privacy-respecting cleanup -------------------------------------------
// Wipes every local analytics key (used by admin "reset demo data").
export function clearAnalyticsData() {
  [LS_HEARTBEATS, LS_PAGEVIEWS, LS_EVENTS].forEach((k) => {
    try { localStorage.removeItem(k); } catch {}
  });
}
