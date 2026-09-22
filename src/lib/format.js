export const money = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0);

export const money2 = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0);

export const compact = (n) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n || 0);

export const timeAgo = (ts) => {
  const s = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

export const slugify = (v) =>
  String(v || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);

const GRADIENTS = [
  ['#2E7CF6', '#7A4DFF'],
  ['#00C48C', '#2E7CF6'],
  ['#FF8A3D', '#FF3D68'],
  ['#FFC93C', '#FF7A3D'],
  ['#2BFF88', '#00C48C'],
  ['#7A4DFF', '#FF3DC8'],
  ['#3DC8FF', '#2E7CF6'],
  ['#FFD23F', '#E8A90C'],
];

export const gradientFor = (seed) => {
  let h = 0;
  for (let i = 0; i < String(seed).length; i++) h = (h * 31 + String(seed).charCodeAt(i)) % 997;
  return GRADIENTS[h % GRADIENTS.length];
};

export const initials = (name) =>
  String(name || '?')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

// Base path of the deployed app ("/flexspot/" on GitHub Pages preview, "/" on production).
// Share/referral URLs must include it, otherwise they 404 on the preview domain.
export const appBase = () => {
  const b = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  return b === '' ? '' : b;
};

export const spotPath = (slug, refCode) =>
  `${appBase()}/s/${slug}${refCode ? `?ref=${encodeURIComponent(refCode)}` : ''}`;

export const shareLinks = (spot, origin, refCode) => {
  const url = `${origin}${spotPath(spot.slug, refCode)}`;
  const text = `Help ${spot.name} reach #1 on FlexSpot 🏆`;
  return {
    url,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  };
};

export const copyText = async (t) => {
  try {
    await navigator.clipboard.writeText(t);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = t;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); return true; } catch { return false; }
    finally { ta.remove(); }
  }
};
