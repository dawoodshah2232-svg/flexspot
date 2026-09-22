import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../lib/theme';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/rewards', label: 'Rewards' },
  { to: '/faq', label: 'FAQ' },
];

const LOGO_URL = `${import.meta.env.BASE_URL}logo-crown-180.png`;

export function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="FlexSpot home">
      <img
        src={LOGO_URL}
        alt="FlexSpot crown logo"
        width={44}
        height={44}
        className="w-11 h-11 rounded-[14px] object-cover shadow-[0_6px_16px_rgba(124,58,237,0.45)] ring-1 ring-white/20 group-hover:scale-[1.06] group-hover:rotate-[-3deg] transition-transform duration-300"
      />
      {!compact && (
        <span className="leading-none hidden min-[380px]:block">
          <span className="block font-display font-extrabold text-[22px] tracking-tight text-[var(--ink)]">
            Flex<span className="grad-text">Spot</span><span className="lol-sticker" aria-hidden="true"><span className="lol-dot">.</span><span className="lol-l">L</span><span className="lol-l">O</span><span className="lol-l">L</span></span>
          </span>
        </span>
      )}
    </Link>
  );
}

export default function Header({ onClaim }) {
  const loc = useLocation();
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <header className="fixed top-3 inset-x-3 sm:inset-x-6 z-40">
      <div className="header-glass max-w-7xl mx-auto bg-[var(--surface)]/80 backdrop-blur-2xl border border-[var(--line)] rounded-2xl shadow-[var(--shadow-lift)]">
        <div className="px-4 sm:px-5 h-[68px] flex items-center justify-between gap-3">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[var(--ink)] bg-[var(--surface-2)]'
                      : 'text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--surface-2)]'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/leaderboard"
              className="hidden sm:grid place-items-center w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-2)] hover:text-[var(--ink)] hover:border-[var(--ink-3)] transition-colors"
              title="Search brands"
              aria-label="Search brands"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </Link>
            <button
              onClick={toggle}
              className="grid place-items-center w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-2)] hover:text-[var(--ink)] hover:border-[var(--ink-3)] transition-colors"
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 13.5A8.5 8.5 0 0 1 10.5 4 8.5 8.5 0 1 0 20 13.5Z" />
                </svg>
              )}
            </button>
            <Link
              to="/admin"
              className="hidden sm:grid place-items-center w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-2)] hover:text-[var(--ink)] hover:border-[var(--ink-3)] transition-colors"
              title="Profile / admin"
              aria-label="Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
              </svg>
            </Link>
            <button onClick={onClaim} className="btn-primary whitespace-nowrap px-4 sm:px-6 py-2.5 text-sm shrink-0">
              <span className="hidden min-[420px]:inline">Claim Your Spot From $1</span>
              <span className="min-[420px]:hidden">Claim $1</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
