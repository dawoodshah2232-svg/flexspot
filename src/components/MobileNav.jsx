import { NavLink } from 'react-router-dom';

const ITEMS = [
  {
    to: '/',
    label: 'Home',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" />
      </svg>
    ),
  },
  {
    to: '/leaderboard',
    label: 'Ranks',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4a1 1 0 0 0-1 1c0 2 1.5 3.5 4 3.5" /><path d="M17 6h3a1 1 0 0 1 1 1c0 2-1.5 3.5-4 3.5" />
      </svg>
    ),
  },
  {
    to: '/explore',
    label: 'Explore',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </svg>
    ),
  },
  {
    to: '/winners',
    label: 'Winners',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" />
      </svg>
    ),
  },
];

export default function MobileNav({ onClaim }) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] backdrop-blur-xl border-t border-[var(--line-soft)] pb-safe"
      aria-label="Mobile"
    >
      <div className="grid grid-cols-5 items-end px-2 pt-1.5 pb-2">
        {ITEMS.slice(0, 2).map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1.5 text-[10px] font-bold transition-colors ${
                isActive ? 'text-[var(--blaze)]' : 'text-[var(--ink-3)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {it.icon(isActive)}
                {it.label}
              </>
            )}
          </NavLink>
        ))}
        <button
          onClick={onClaim}
          className="flex flex-col items-center gap-1 -mt-6"
          aria-label="Claim your spot"
        >
          <span className="grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-[var(--blaze)] to-[var(--gold)] text-white shadow-[var(--shadow-blaze)] border-4 border-[var(--bg)] active:scale-95 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" fill="#fff" />
            </svg>
          </span>
          <span className="text-[10px] font-bold text-[var(--blaze)]">Start $1</span>
        </button>
        {ITEMS.slice(2).map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1.5 text-[10px] font-bold transition-colors ${
                isActive ? 'text-[var(--blaze)]' : 'text-[var(--ink-3)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {it.icon(isActive)}
                {it.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
