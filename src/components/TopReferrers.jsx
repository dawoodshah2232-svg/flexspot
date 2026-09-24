import { Link } from 'react-router-dom';
import { topReferrers } from '../lib/referral';
import { money2 } from '../lib/format';

// Homepage Top Referrers — ranked by affiliate performance: members referred
// and 20% instant commission earned on their payments.
// #1 gets a premium VIP row, #2/#3 get elite top-referrer cards, #4–#10 stay
// compact. "See more" opens the full /top-referrers board.
export default function TopReferrers() {
  const leaders = topReferrers().slice(0, 10);
  if (!leaders.length) return null;
  const [first, second, third, ...rest] = leaders;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="text-center mb-6">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)]">
          🏆 Top referrers
        </h2>
        <p className="text-[var(--ink-2)] mt-2 text-sm max-w-xl mx-auto">
          They bring the people — every member who joins through their link earns{' '}
          them <b className="text-[var(--ink)]">20% instant commission</b> on every payment.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {/* #1 — VIP featured row */}
        <div className="relative rounded-2xl p-[2px]" style={{ background: 'linear-gradient(135deg,#FDE68A,#F59E0B,#B45309)' }}>
          <div className="rounded-[calc(1rem-2px)] bg-[var(--surface)] flex items-center gap-3.5 px-4 py-3.5 sm:px-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FCD34D] to-[#B45309] grid place-items-center text-2xl shrink-0 shadow-[0_6px_18px_rgba(245,158,11,0.4)]">
              👑
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-extrabold text-lg text-[var(--ink)] truncate">{first.name}</span>
                <span className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#F59E0B] to-[#B45309] text-white px-2.5 py-0.5 rounded-full">
                  👑 VIP · #1 referrer
                </span>
              </div>
              <div className="text-[11px] text-[var(--ink-3)] truncate">Most trusted traffic source on FlexSpot</div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display font-black text-xl text-[#B45309]">+{money2(first.commission)}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">{first.members} members</div>
            </div>
          </div>
        </div>

        {/* #2 / #3 — elite cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[second, third].filter(Boolean).map((r, i) => (
            <div key={r.name} className="rounded-2xl border-2 border-[var(--line)] bg-[var(--surface)] flex items-center gap-3 px-4 py-3">
              <div className={`grid place-items-center w-9 h-9 rounded-xl font-black text-sm shrink-0 ${
                i === 0 ? 'bg-slate-300/30 text-slate-500 border border-slate-400/40' : 'bg-[#C47F3D]/20 text-[#9A5B22] border border-[#C47F3D]/50'
              }`}>
                {i + 2}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-[var(--ink)] truncate">{r.name}</div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-[var(--surface-2)] border border-[var(--line)] text-[var(--ink-2)] px-2 py-0.5 rounded-full">
                  ⭐ Top referrer
                </span>
              </div>
              <div className="text-right shrink-0">
                <div className="font-display font-black text-[#B45309]">+{money2(r.commission)}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">{r.members} members</div>
              </div>
            </div>
          ))}
        </div>

        {/* #4–#10 — compact list */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)]/60 overflow-hidden">
          {rest.map((r) => (
            <div key={r.name} className="flex items-center gap-3 px-4 py-2.5">
              <span className="font-display font-black text-[var(--ink-3)] w-7 text-center shrink-0 text-sm">#{r.rank}</span>
              <span className="font-bold text-sm text-[var(--ink)] flex-1 truncate">{r.name}</span>
              <span className="text-[11px] font-bold text-[var(--ink-3)] shrink-0">{r.members} members</span>
              <span className="font-display font-black text-sm text-[#B45309] shrink-0 w-20 text-right">+{money2(r.commission)}</span>
            </div>
          ))}
        </div>

        <div className="text-center pt-1">
          <Link
            to="/top-referrers"
            className="inline-block text-sm font-bold text-[var(--ink)] border border-[var(--line)] bg-[var(--surface)] rounded-full px-6 py-2.5 hover:border-[var(--gold)] transition-colors"
          >
            See all top referrers →
          </Link>
        </div>
      </div>
    </section>
  );
}
