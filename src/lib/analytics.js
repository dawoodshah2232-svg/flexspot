// src/lib/analytics.js
// Server-backed visitor analytics. Previously this file recorded everything
// into the admin's own browser localStorage — which meant the admin could
// only ever see ITS OWN visits, never real site traffic. Now every call below
// goes to /api/track (Vercel KV), so the numbers are genuinely site-wide.
//
// The export API is unchanged, so existing call sites keep working.
export {
  getVisitorId,
  getSessionId,
  isMobileDevice,
  trackEvent,
  startTracking,
  stopTracking,
  beatNow,
  fetchTrafficStats,
  fetchVisitorTrail,
  useServerOnline as useLiveOnline,
} from './tracker.js';

import { trackView, beatNow as beat } from './tracker.js';

/** Record a page view (server beacon). */
export function trackPageView(path) {
  trackView(path || (typeof window !== 'undefined' ? window.location.pathname : '/'));
}

/** Manual heartbeat (the tracker also runs its own 20s loop). */
export function writeHeartbeat(path) {
  beat(path);
}

/** Legacy localStorage keys from the old local-only analytics — safe to wipe. */
export function clearAnalyticsData() {
  ['flexspot_heartbeats_v1', 'flexspot_pageviews_v1', 'flexspot_events_v1'].forEach((k) => {
    try { localStorage.removeItem(k); } catch {}
  });
}
