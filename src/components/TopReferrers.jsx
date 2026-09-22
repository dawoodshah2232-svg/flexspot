import { Link } from 'react-router-dom';
import { getTopReferrers } from '../lib/store';
import { money } from '../lib/format';

// Global Top Referrers board — the names behind the visits. Every visit
// through a referral link adds $1 to the backed spot's total.
// Layout: #1 gets a full-width featured row, #2–#5 pair up two-per-row,
// everyone else lands in a compact scoreboard list. Names stay small and
// left-aligned; the only numbers shown are visits and earnings.
function medal(i) {
  return i === 0
    ? 'bg-[#F59E0B]/20 text-[#B45309] border-[#F59E0B]/50'
    : i === 1
      ? 'bg-slate-400/20 text-slate-500 border-slate-400/40'
      : i === 2
        ? 'bg-[#C47F3D]/20 text-[#9A5B22] border-[#C47F3D]/50'
        : 'bg-[var(--surface-2)] text-[var(--ink-2)] border-[var(--line)]';
}

function ReferrerRow({ r, rank, spot, featured }) {
  return (
    <div className={`rounded-2xl border border-[var(--line)] bg-[var(--surface)] flex items-center gap-3 text-left ${featured ? 'px-4 py-3.5 sm:px-5' : 'px-3.5 py-2.5'}`}>
      <div className={`grid place-items-center w-8 h-8 rounded-xl font-black text-xs shrink-0 border ${medal(rank)}`}>
        {rank + 1}
      </div>
      <div className="min-w-0 flex-1">
        <div className={`font-extrabold text-[var(--ink)] truncate ${featured ? 'text-lg' : 'text-sm'}`}>{r.name}</div>
        <div className="text-[11px] text-[var(--ink-3)] truncate">
          backing {spot ? (
            <Link to={`/s/${spot.slug}`} className="font-bold text-[var(--ink-2)] hover:underline">{spot.name}</Link>
          ) : r.spotSlug}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className={`font-display font-black text-[#B45309] ${featured ? 'text-xl' : 'text-sm'}`}>+{money(r.earned)}</div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">{r.visits} visits</div>
      </div>
    </div>
  );
}

export default function TopReferrers({ spots }) {
  const leaders = getTopReferrers(10);
  if (!leaders.length) return null;
  const spotBySlug = Object.fromEntries((spots || []).map((s) => [s.slug, s]));
  const [first, ...rest] = leaders;
  const pairRows = [rest.slice(0, 2), rest.slice(2, 4)].filter((p) => p.length);
  const board = rest.slice(4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="text-center mb-6">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)]">
          🏆 Top referrers
        </h2>
        <p className="text-[var(--ink-2)] mt-2 text-sm max-w-xl mx-auto">
          They bring the crowd — every visit through their link adds{' '}
          <b className="text-[var(--ink)]">$1</b> to the brand they back. No signup needed, just a visit.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {/* #1 — full-width featured row */}
        <ReferrerRow r={first} rank={0} spot={spotBySlug[first.spotSlug]} featured />

        {/* #2–#5 — two per row */}
        {pairRows.map((pair, pi) => (
          <div key={pi} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pair.map((r, i) => (
              <ReferrerRow key={r.code} r={r} rank={1 + pi * 2 + i} spot={spotBySlug[r.spotSlug]} />
            ))}
          </div>
        ))}

        {/* #6+ — compact scoreboard list */}
        {board.length > 0 && (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line-soft)] overflow-hidden">
            {board.map((r, i) => {
              const spot = spotBySlug[r.spotSlug];
              const rank = 5 + i;
              return (
                <div key={r.code} className="flex items-center gap-3 px-3.5 py-2 text-left">
                  <div className={`grid place-items-center w-7 h-7 rounded-lg font-black text-[11px] shrink-0 border ${medal(rank)}`}>
                    {rank + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[13px] text-[var(--ink)] truncate">{r.name}</span>
                    <span className="text-[11px] text-[var(--ink-3)] truncate">
                      {' '}· backing {spot ? (
                        <Link to={`/s/${spot.slug}`} className="font-bold text-[var(--ink-2)] hover:underline">{spot.name}</Link>
                      ) : r.spotSlug}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-[var(--ink-3)] shrink-0">{r.visits} visits</div>
                  <div className="font-display font-black text-[13px] text-[#B45309] shrink-0 w-16 text-right">+{money(r.earned)}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
