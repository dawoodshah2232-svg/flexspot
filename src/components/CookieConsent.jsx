import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GA_ENABLED, readConsent, grantConsent, denyConsent } from '../lib/ga';

// Cookie-consent notice for Google Analytics. Rendered only when a GA4
// measurement ID is configured (VITE_GA_MEASUREMENT_ID) — with no ID there
// is nothing to consent to, so the banner never appears.
// Bottom offset clears the mobile bottom nav (bottom-20 on small screens).
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_ENABLED || readConsent()) return;
    const t = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const choose = (fn) => () => {
    fn();
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed z-[150] left-4 right-4 bottom-24 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-card)] p-5"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">🍪</span>
        <div className="min-w-0">
          <p className="font-display font-bold text-[15px] text-[var(--ink)]">Cookies & analytics</p>
          <p className="text-[13px] text-[var(--ink-2)] leading-relaxed mt-1">
            We use Google Analytics to measure traffic (IP addresses are anonymized by Google)
            and local storage to remember your preferences. Accept for analytics, or decline —
            the site works the same either way.{' '}
            <Link to="/privacy" className="underline font-semibold text-[var(--ink)]">Privacy policy</Link>
          </p>
          <div className="flex gap-2 mt-3.5">
            <button
              onClick={choose(denyConsent)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--line)] text-sm font-bold text-[var(--ink-2)] min-h-[44px]"
            >
              Decline
            </button>
            <button
              onClick={choose(grantConsent)}
              className="btn-primary flex-1 px-4 py-2.5 rounded-xl text-sm min-h-[44px]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
