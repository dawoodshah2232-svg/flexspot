// src/lib/siteSettings.js
// Admin-driven site content (CMS). Every homepage/champion/dancer/ticker
// string and image is editable in the admin "Site Content" tab and applies
// INSTANTLY site-wide — no reload, no rebuild. Persisted to localStorage so
// the owner's edits survive refreshes. On a real backend this moves server-side.
import React, { createContext, useContext, useEffect, useState } from 'react';

const LS_SETTINGS = 'flexspot_site_settings_v1';
const BASE = (import.meta.env.BASE_URL || '/') ;

export const DEFAULT_SETTINGS = {
  hero: {
    eyebrow: 'BRANDS COMPETE. THE INTERNET WINS.',
    titleA: 'BIG BRAND VISIBILITY.',
    titleB: 'START FROM JUST $1.',
    subtitle:
      'Anyone can boost any brand with $1 — your name lands on their page, and the highest total takes the crown. 👑',
    ctaPrimary: 'Start From $1 →',
    ctaSecondary: 'How It Works',
    // Champion stage image (the big photo on the right of the hero)
    heroImage: `${BASE}hero-king.jpg`,
    heroImageAlt: 'The FlexSpot frog king defending his golden throne',
  },
  dancer: {
    enabled: true,
    image: `${BASE}hero-dancer.webp`,
    showSticker: true,
    stickerText: '▲ trending now',
    // px width at desktop; mobile renders ~80px, tablet ~96, desktop ~128
    size: 128,
  },
  champion: {
    // the small "champion brand card" under the champion photo
    showLeaderCard: true,
    ctaLabel: '⚔️ Steal the crown — from just $1',
    caption: 'One dollar more than the champ takes their throne.',
  },
  announcement: {
    enabled: false,
    text: '🔥 Double boost weekend — every $1 counts as $2 toward your rank!',
    link: '',
  },
  ticker: {
    enabled: true,
  },
  claimCard: {
    title: 'Claim Your Spot From $1',
    tagline: 'Manual approval · crypto only',
    ctaLabel: 'Start From $1 →',
  },
  ctaBand: {
    eyebrow: 'THE #1 SPOT IS UP FOR GRABS',
    title: 'The crown is waiting. Take the spotlight.',
    subtitle: 'Every day, thousands of visitors browse the FlexSpot leaderboard. Your brand could be the one they remember.',
    ctaLabel: '⚡ Claim Your Spot From $1',
  },
  footer: {
    tagline: 'The internet\u2019s live spotlight competition.',
  },
};

// Recommended resolutions shown next to each image field in admin.
export const IMAGE_HINTS = {
  heroImage: 'Recommended: 1200 × 800 JPG/WebP (landscape, the frog stage photo). Keep under 400KB for fast mobile load.',
  dancerImage: 'Recommended: transparent WebP/PNG, ≤ 480px wide, under 200KB (the dancing hype-man cutout).',
  logoImage: 'Recommended: square PNG 512 × 512 with padding (brand logo, shows in cards).',
};

function readSettings() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_SETTINGS));
    if (!raw || typeof raw !== 'object') return { ...DEFAULT_SETTINGS };
    // deep-merge one level so new keys get defaults on upgrades
    const merged = { ...DEFAULT_SETTINGS };
    for (const k of Object.keys(DEFAULT_SETTINGS)) {
      merged[k] = { ...DEFAULT_SETTINGS[k], ...(raw[k] || {}) };
    }
    return merged;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

const SettingsCtx = createContext(null);

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(readSettings);

  useEffect(() => {
    try { localStorage.setItem(LS_SETTINGS, JSON.stringify(settings)); } catch {}
  }, [settings]);

  // Cross-tab / same-window instant updates: the "storage" event fires in
  // other tabs; a custom event handles same-tab admin edits.
  useEffect(() => {
    const onStorage = (e) => { if (e.key === LS_SETTINGS) setSettings(readSettings()); };
    const onLocal = () => setSettings(readSettings());
    window.addEventListener('storage', onStorage);
    window.addEventListener('flexspot:settings', onLocal);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('flexspot:settings', onLocal);
    };
  }, []);

  const update = (patch) => {
    const next = { ...readSettings(), ...patch };
    try {
      localStorage.setItem(LS_SETTINGS, JSON.stringify(next));
      window.dispatchEvent(new Event('flexspot:settings'));
    } catch {}
  };
  const updateSection = (section, patch) =>
    update({ [section]: { ...(readSettings()[section] || {}), ...patch } });
  const reset = () => {
    try {
      localStorage.removeItem(LS_SETTINGS);
      window.dispatchEvent(new Event('flexspot:settings'));
    } catch {}
    setSettings({ ...DEFAULT_SETTINGS });
  };

  return (
    <SettingsCtx.Provider value={{ settings, update, updateSection, reset }}>
      {children}
    </SettingsCtx.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SettingsCtx);
  if (!ctx) return { settings: DEFAULT_SETTINGS, update: () => {}, updateSection: () => {}, reset: () => {} };
  return ctx;
}
