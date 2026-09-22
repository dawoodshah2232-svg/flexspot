import { Link, NavLink, useLocation } from 'react-router-dom';

export function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="relative grid place-items-center w-10 h-10 rounded-2xl bg-gradient-to-br from-electric to-[#7A4DFF] shadow-glowblue group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
          <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2z" />
        </svg>
        <span className="absolute -top-1.5 -right-1.5 text-sm crown-bob">👑</span>
      </span>
      {!compact && (
        <span className="font-display leading-none">
          <span className="block text-[19px] font-bold tracking-tight text-snow">FlexSpot<span className="text-electric">.LOL</span></span>
          <span className="block text-[9px] font-semibold tracking-[0.22em] text-mist uppercase mt-0.5">Claim your spot</span>
        </span>
      )}
    </Link>
  );
}

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/rewards', label: 'Rewards' },
  { to: '/faq', label: 'FAQ' },
];

export default function Navbar({ onClaim, theme, onToggleTheme, viewers }) {
  const { pathname } = useLocation();
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-line/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive || (l.to === '/' && pathname === '/') ? 'text-snow bg-line/10' : 'text-mist hover:text-snow hover:bg-line/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <span className="hidden md:flex items-center gap-2 text-xs font-semibold text-mist bg-line/5 border border-line/10 rounded-full px-3 py-1.5" title="People browsing right now">
            <span className="live-dot" /> {viewers} here now
          </span>
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 grid place-items-center rounded-xl border border-line/10 bg-line/5 text-snow hover:bg-line/10 transition-colors text-lg"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button onClick={onClaim} className="btn-primary px-4 sm:px-5 py-2.5 text-sm">
            ⚡ Claim Your Spot
          </button>
        </div>
      </div>
    </header>
  );
}
