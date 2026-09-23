// Google Analytics 4 via gtag.js — with Consent Mode v2 defaults.
//
// Activation is exactly one step: set VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
// at build time. No measurement ID → this module is a complete no-op:
// no scripts are loaded, no cookies are set, no banner is shown.
//
// Privacy design:
//  - Consent defaults to DENIED for everything (ad_storage, analytics_storage,
//    ad_user_data, ad_personalization) before gtag.js even loads.
//  - The <CookieConsent/> banner asks once; only an explicit Accept flips
//    analytics_storage to granted. Decline keeps GA fully off.
//  - Ads stay denied unconditionally — FlexSpot serves no ads.
//  - GA4 anonymizes IP addresses by default (Google drops the last octet;
//    there is no opt-out of that on Google's side), so no extra flag is set.
export const GA_ID = String(import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
export const GA_ENABLED = /^G-[A-Z0-9]{4,}$/i.test(GA_ID);

const LS_CONSENT = 'flexspot_consent_v1';

function gtag(...args) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

let inited = false;

/** Load gtag.js and configure the property. Safe to call once at startup. */
export function initGA() {
  if (!GA_ENABLED || inited) return;
  inited = true;
  // Consent Mode v2 defaults — deny everything until the visitor chooses.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
  gtag('js', new Date());
  // send_page_view: false — this is an SPA; we fire page_view manually on
  // every React Router location change (see gaPageView) to avoid double counts.
  gtag('config', GA_ID, { send_page_view: false });
  if (readConsent() === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
}

/** Fire a page_view for an SPA route change. No-op when GA is off/undecided. */
export function gaPageView(path) {
  if (!GA_ENABLED || !inited) return;
  try {
    gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  } catch {
    /* analytics must never break the app */
  }
}

/** Optional custom events (kept minimal; page_views carry the signal). */
export function gaEvent(name, params = {}) {
  if (!GA_ENABLED || !inited) return;
  try {
    gtag('event', name, params);
  } catch {
    /* ignore */
  }
}

export function readConsent() {
  try {
    return window.localStorage.getItem(LS_CONSENT);
  } catch {
    return null;
  }
}

export function grantConsent() {
  try {
    window.localStorage.setItem(LS_CONSENT, 'granted');
  } catch {
    /* ignore */
  }
  gtag('consent', 'update', { analytics_storage: 'granted' });
}

export function denyConsent() {
  try {
    window.localStorage.setItem(LS_CONSENT, 'denied');
  } catch {
    /* ignore */
  }
  gtag('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
}
