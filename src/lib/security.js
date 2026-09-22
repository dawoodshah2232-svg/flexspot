// FlexSpot anti-phishing / anti-tamper guards.
//
// Threat model: the payment addresses on the Claim page are public by design
// (people must send USDT *to* them). The realistic attack is a CLONED copy of
// this site with the attacker's own addresses swapped in. These guards make
// clones obvious and unusable for stealing payments:
//   1. Frame-busting — the real site refuses to run inside an attacker's iframe.
//   2. Official-host check — on any unknown domain the payment step is disabled
//      and a warning banner tells the visitor to use only the official domain.

export const OFFICIAL_HOSTS = [
  'flexspot.lol',
  'www.flexspot.lol',
  // official preview mirror
  'dawoodshah2232-svg.github.io',
];

const DEV_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

export function currentHost() {
  try {
    return window.location.hostname.toLowerCase();
  } catch {
    return '';
  }
}

/** True on flexspot.lol, the official preview, or local dev. */
export function isOfficialHost(host = currentHost()) {
  if (!host) return true; // non-browser render (SSR/prerender) — don't false-positive
  if (DEV_HOSTS.has(host)) return true;
  return OFFICIAL_HOSTS.some((h) => host === h || host.endsWith('.' + h));
}

/**
 * Frame-buster: refuse to be embedded in another site (clickjacking /
 * "invisible overlay swaps the QR code" attacks). If we can't navigate the
 * top frame away (sandboxed attacker iframe), blank our own document instead
 * so nothing interactive — and no payment address — is usable.
 */
export function breakOutOfFrames() {
  try {
    if (window.top !== window.self) {
      try {
        window.top.location.href = window.self.location.href;
      } catch {
        // Cross-origin / sandboxed: make this frame useless to the attacker.
        document.documentElement.style.display = 'none';
      }
    }
  } catch {
    /* never break the app over the guard itself */
  }
}
