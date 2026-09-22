import { NavLink } from 'react-router-dom';

const ITEMS = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/leaderboard', label: 'Ranks', icon: '🏆' },
  { to: '/rewards', label: 'Rewards', icon: '🎖️' },
  { to: '/faq', label: 'FAQ', icon: '❓' },
];

export default function MobileNav({ onClaim }) {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 pb-safe">
      <div className="mx-3 mb-3 rounded-3xl glass border border-white/10 shadow-card overflow-hidden">
        <div className="grid grid-cols-5 items-stretch">
          {ITEMS.slice(0, 2).map((i) => (
            <NavLink key={i.to} to={i.to} end={i.to === '/'}
              className={({ isActive }) => `flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold ${isActive ? 'text-electric' : 'text-mist'}`}>
              <span className="text-xl">{i.icon}</span>{i.label}
            </NavLink>
          ))}
          <button onClick={onClaim} className="flex flex-col items-center justify-center gap-0.5 -my-1">
            <span className="w-14 h-14 -mt-5 rounded-2xl bg-gradient-to-br from-electric to-[#7A4DFF] shadow-glowblue grid place-items-center text-2xl text-white border-4 border-ink">⚡</span>
            <span className="text-[10px] font-bold text-snow">Claim</span>
          </button>
          {ITEMS.slice(2).map((i) => (
            <NavLink key={i.to} to={i.to}
              className={({ isActive }) => `flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold ${isActive ? 'text-electric' : 'text-mist'}`}>
              <span className="text-xl">{i.icon}</span>{i.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
