import { Link } from 'react-router-dom';
import { getTopReferrers } from '../lib/store';
import { money } from '../lib/format';

// Global Top Referrers board — the names behind the visits. Every visit
// through a referral link adds $1 to the backed spot's total.
export default function TopReferrers({ spots }) {
  const leaders = getTopReferrers(8);
  if (!leaders.length) return null;
  const spotBySlug = Object.fromEntries((spots || []).map((s) => [s.slug, s]));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="text-center mb-8">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]">
          🏆 Top referrers
        </h2>
        <p className="text-[var(--ink-2)] mt-2 text-sm max-w-xl mx-auto">
          They bring the crowd — every visit through their link adds{' '}
          <b className="text-[var(--ink)]">$1</b> to the brand they back. No signup needed, just a visit.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaders.map((r, i) => {
          const spot = spotBySlug[r.spotSlug];
          return (
            <div key={r.code} className="card card-lift rounded-3xl p-5 relative overflow-hidden">
              {i === 0 && <div className="podium-shine" aria-hidden="true" />}
              <div className="flex items-center gap-3">
                <div className={`grid place-items-center w-10 h-10 rounded-2xl font-black text-sm shrink-0 ${
                  i === 0 ? 'bg-[#F59E0B]/20 text-[#B45309] border border-[#F59E0B]/50'
                  : i === 1 ? 'bg-slate-400/20 text-slate-500 border border-slate-400/40'
                  : i === 2 ? 'bg-[#C47F3D]/20 text-[#9A5B22] border border-[#C47F3D]/50'
                  : 'bg-[var(--surface-2)] text-[var(--ink-2)] border border-[var(--line)]'
                }`}>
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold text-[var(--ink)] truncate">{r.name}</div>
                  <div className="text-xs text-[var(--ink-3)] truncate">
                    backing {spot ? (
                      <Link to={`/s/${spot.slug}`} className="font-bold text-[var(--ink-2)] hover:underline">{spot.name}</Link>
                    ) : r.spotSlug}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--line-soft)]">
                <div className="text-center">
                  <div className="font-display font-black text-lg text-[var(--ink)]">{r.visits}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">visits</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-black text-lg text-[#B45309]">+{money(r.earned)}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">earned</div>
                </div>
                <div className="text-2xl" aria-hidden="true">💸</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
