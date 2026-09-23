import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { money, money2, compact, gradientFor, initials } from '../lib/format';
import { displayAmount } from '../lib/display';
import Flee from './Flee';

export function BrandAvatar({ spot, size = 44, ring = false }) {
  const [g1, g2] = gradientFor(spot.slug || spot.name);
  return (
    <span
      className={`relative grid place-items-center rounded-2xl font-display font-bold text-white shrink-0 overflow-hidden ${ring ? 'ring-2 ring-[var(--gold)]' : ''}`}
      style={{ width: size, height: size, fontSize: spot.mark ? size * 0.52 : size * 0.38, background: `linear-gradient(135deg, ${g1}, ${g2})` }}
    >
      {spot.logo ? (
        <img src={spot.logo} alt="" className="w-full h-full object-cover" />
      ) : spot.mark ? (
        <span aria-hidden="true" style={{ transform: 'translateY(-2%)' }}>{spot.mark}</span>
      ) : (
        initials(spot.name)
      )}
    </span>
  );
}

export function RankBadge({ rank, size = 'md' }) {
  const styles = {
    1: 'bg-gradient-to-br from-[var(--gold)] to-[var(--gold-deep)] text-white shadow-[var(--shadow-gold)]',
    2: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900',
    3: 'bg-gradient-to-br from-amber-500 to-amber-700 text-white',
  };
  const cls = styles[rank] || 'bg-[var(--surface-2)] text-[var(--ink-2)] border border-[var(--line)]';
  const sz = size === 'lg' ? 'w-12 h-12 text-xl' : 'w-9 h-9 text-sm';
  return (
    <span className={`grid place-items-center rounded-xl font-display font-bold ${sz} ${cls}`}>
      {rank}
    </span>
  );
}

export function MoveIndicator({ move }) {
  if (!move) return <span className="text-[var(--ink-3)] text-xs font-semibold">–</span>;
  if (move > 0) return <span className="text-[#0A8A4E] dark:text-[#34D399] text-xs font-bold">▲ {move}</span>;
  return <span className="text-[var(--blaze)] text-xs font-bold">▼ {Math.abs(move)}</span>;
}

// Proper race lanes: ranks 4–10 line up at the start gate (right), sprint
// LEFT toward the finish gate when the countdown hits GO, and STOP there.
// Speed is strictly rank-ordered and matched to the emoji: the 🚀 rocket is
// the fastest machine on the track so it runs #4, down to #10 the 🐌 snail.
// (🐇 rabbit and 🐢 turtle are reserved for podium #2 and #3.)
export const RACE_RUNNERS = {
  4: { emoji: '🚀', title: 'Rocket blasting off the line' },
  5: { emoji: '🐆', title: 'Leopard chasing the rocket' },
  6: { emoji: '🦊', title: 'Fox dashing up' },
  7: { emoji: '🏎️', title: 'Race car speeding up' },
  8: { emoji: '🛹', title: 'Skater rolling toward the top' },
  9: { emoji: '🐝', title: 'Bee buzzing up the ranks' },
  10: { emoji: '🐌', title: 'Snail… still trying' },
};
// Sprint time per rank: #4 → 2.20s (first across the line) … #10 → 5.50s.
export const raceDuration = (rank) => `${(2.2 + (rank - 4) * 0.55).toFixed(2)}s`;
// Shared race clock: 3 · 2 · 1 · GO! → runners sprint → pause at the
// finish line → countdown again. Every lane using the same { race, count }
// stays perfectly in sync like a real race.
export function useRaceCycle() {
  const [race, setRace] = useState({ key: 0, running: false });
  const [count, setCount] = useState(null);
  useEffect(() => {
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const GO_AT = 2300; // 3·2·1 at 750ms each, then GO
    const RACE_MS = 6400; // slower than the slowest runner (5.5s)
    const REST_MS = 1800; // everyone catches their breath at the finish
    const cycle = () => {
      setCount(3);
      later(() => setCount(2), 750);
      later(() => setCount(1), 1500);
      later(() => {
        setCount('GO');
        // remount runners at the start gate (fresh element = no transition)…
        setRace((r) => ({ key: r.key + 1, running: false }));
        // …then release them one paint later so the sprint animates.
        later(() => setRace((r) => ({ ...r, running: true })), 60);
      }, GO_AT);
      later(() => setCount(null), GO_AT + 800);
      later(cycle, GO_AT + RACE_MS + REST_MS);
    };
    cycle();
    return () => timers.forEach(clearTimeout);
  }, []);
  return { race, count };
}
const RACE_IDLE = { key: 0, running: false };

export function SpotRow({ spot, move, onBoost, highlight, race, count = null, overtake }) {
  const racer = RACE_RUNNERS[spot.rank];
  const r = race || RACE_IDLE;
  // Overtake meter (leaderboard only): progress toward the rank directly above.
  // overtake === undefined → feature off; null → last row (underdog line).
  const showOvertake = overtake !== undefined;
  const overtakeDiff = overtake ? overtake.amount - spot.amount : null;
  const overtakePct = overtake && overtake.amount > 0
    ? Math.min(100, Math.max(4, (spot.amount / overtake.amount) * 100))
    : 0;
  // Ties are broken by seniority, so overtaking needs (diff + $0.01); money2
  // keeps cent-level gaps honest instead of displaying "Only $0".
  const overtakeNeeded = overtake ? Math.max(0.01, overtake.amount - spot.amount + 0.01) : null;
  const overtakeText = !overtake
    ? '🌱 The underdog slot — every giant started at $1'
    : overtakeDiff > 0
      ? `Only ${money2(overtakeNeeded)} to steal #${overtake.rank}`
      : `Neck-and-neck with #${overtake.rank} — one boost takes it!`;
  const overtakeTextShort = !overtake
    ? '🌱 Every giant started at $1'
    : overtakeDiff > 0
      ? `Only ${money2(overtakeNeeded)} to #${overtake.rank}`
      : `Tied with #${overtake.rank} — one boost!`;
  const bob = `${(parseFloat(raceDuration(spot.rank)) / 5).toFixed(2)}s`;
  // The position pill (P4 … P10) pops in at the finish gate the moment
  // this runner crosses it, and stays visible until the next race starts.
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    setFinished(false);
    if (!r.running) return;
    const t = setTimeout(() => setFinished(true), parseFloat(raceDuration(spot.rank)) * 1000);
    return () => clearTimeout(t);
  }, [r.key, r.running, spot.rank]);
  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className={highlight ? (move > 0 ? 'flash-up rounded-2xl' : move < 0 ? 'flash-down rounded-2xl' : '') : ''}
    >
      <Link
        to={`/s/${spot.slug}`}
        className="card card-lift flex items-center gap-3 sm:gap-4 p-3 sm:p-4"
      >
        <RankBadge rank={spot.rank} />
        <BrandAvatar spot={spot} />
        <div className="min-w-0 flex-1 lg:flex-none lg:w-60 xl:w-72">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-[var(--ink)] truncate text-[15px]">{spot.name}</h3>
            {spot.rank === 1 && <span className="text-sm">👑</span>}
            {spot.pending && (
              <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-500/15 border border-amber-500/40 rounded-full px-2 py-0.5" title="Payment under review">
                ⏳ Pending
              </span>
            )}
            {spot.gift && <span className="text-sm" title={`Surprised by ${spot.gift.from}`}>🎁</span>}
          </div>
          <p className="text-[var(--ink-2)] text-xs truncate">{spot.gift ? `🎁 Surprised by ${spot.gift.from}` : spot.tagline}</p>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-[var(--ink-3)]">
            <span>👁 {compact(spot.views)}</span>
            <span>🖱 {compact(spot.clicks)}</span>
            <span className="hidden sm:inline"><MoveIndicator move={move} /></span>
          </div>
          {/* compact overtake meter for small screens — bar + one short line */}
          {showOvertake && (
            <div className="md:hidden mt-1.5">
              {overtake ? (
                <>
                  <div className="h-1 rounded-full bg-[var(--line)] overflow-hidden max-w-[220px]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#B45309] via-[#F59E0B] to-[#FCD34D]" style={{ width: `${overtakePct}%` }} />
                  </div>
                  <div className="text-[10px] text-[var(--ink-3)] font-semibold mt-1 truncate">{overtakeTextShort}</div>
                </>
              ) : (
                <div className="text-[10px] text-[var(--ink-3)] font-semibold truncate">{overtakeTextShort}</div>
              )}
            </div>
          )}
        </div>
        {racer && (
          <div className="race-lane hidden md:block" title={racer.title} aria-hidden="true">
            <span className="race-gate race-gate-finish" />
            <span className="race-dashes" />
            {/* race-control countdown parked in the center of the road */}
            {count !== null && (
              <span className="race-count">
                <span key={`c-${r.key}-${count}`} className="countdown-pop">
                  {count === 'GO' ? 'GO!' : count}
                </span>
              </span>
            )}
            <span className="race-gate race-gate-start" />
            {finished && <span className="race-pos">P{spot.rank}</span>}
            <span
              key={r.key}
              className="race-runner"
              style={{
                left: r.running ? '52px' : '94%',
                transitionDuration: raceDuration(spot.rank),
              }}
            >
              {/* racers playfully dodge the cursor — Flee's transform is on its
                  own wrapper, so the race positioning + bob animation are untouched */}
              <Flee>
                <span className="race-bob" style={{ animationDuration: bob }}>
                  {racer.emoji}
                </span>
              </Flee>
            </span>
          </div>
        )}
        {/* overtake meter — fills the dead center for rows without a race lane */}
        {showOvertake && !racer && (
          <div className="hidden md:flex flex-1 min-w-0 max-w-[260px] mx-auto flex-col justify-center px-2">
            {overtake && (
              <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#B45309] via-[#F59E0B] to-[#FCD34D] shadow-[0_0_10px_rgba(245,158,11,0.45)]"
                  style={{ width: `${overtakePct}%` }}
                />
              </div>
            )}
            <div className={`text-[11px] text-[var(--ink-3)] font-semibold truncate text-center ${overtake ? 'mt-1.5' : ''}`}>
              {overtakeText}
            </div>
          </div>
        )}
        <div className="text-right shrink-0">
          {/* the amount they paid to hold this rank — given pride of place */}
          <div className="font-display font-black text-[var(--blaze-deep)] dark:text-[#FF8A66] text-xl sm:text-2xl tracking-tight whitespace-nowrap">🏆 {money(displayAmount(spot.amount))}</div>
          <div className="text-[10px] text-[var(--ink-3)] uppercase tracking-wider font-semibold">spot value</div>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onBoost && onBoost(spot); }}
          className="btn-primary hidden sm:inline-flex px-4 py-2 text-xs shrink-0"
        >
          Boost ⚡
        </button>
        <button
          onClick={(e) => { e.preventDefault(); onBoost && onBoost(spot); }}
          aria-label={`Boost ${spot.name}`}
          title={`Boost ${spot.name}`}
          className="sm:hidden grid place-items-center w-11 h-11 rounded-2xl text-white text-lg shrink-0 active:scale-95 transition-transform bg-gradient-to-br from-[var(--blaze)] to-[#4F46E5] shadow-[var(--shadow-blaze)]"
        >
          ⚡
        </button>
      </Link>
    </motion.div>
  );
}

export function TopSpotCard({ spot, place }) {
  const isFirst = place === 1;
  return (
    <motion.div layout transition={{ type: 'spring', stiffness: 260, damping: 30 }} className={isFirst ? 'sm:col-span-1' : ''}>
      <Link
        to={`/s/${spot.slug}`}
        className={`card card-lift relative block rounded-3xl p-5 sm:p-6 overflow-hidden ${
          isFirst ? 'border-2 border-[var(--gold)]' : ''
        }`}
      >
        {isFirst && (
          <div className="absolute top-3 right-4 text-4xl crown-bob">👑</div>
        )}
        <div className="flex items-center gap-2 mb-4">
          <RankBadge rank={place} size="lg" />
          <div>
            <div className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isFirst ? 'text-[var(--gold-deep)] dark:text-[var(--gold)]' : 'text-[var(--ink-3)]'}`}>
              {isFirst ? 'Internet Spotlight Winner' : `Rank #${place}`}
            </div>
            {isFirst && <div className="shine-text font-display font-bold text-sm">Holding the crown</div>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BrandAvatar spot={spot} size={64} ring={isFirst} />
          <div className="min-w-0">
            <h3 className="font-display font-bold text-xl text-[var(--ink)] truncate">{spot.name}</h3>
            <p className="text-[var(--ink-2)] text-sm truncate">{spot.tagline}</p>
          </div>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <div className={`font-display font-bold text-3xl ${isFirst ? 'text-[var(--gold-deep)] dark:text-[var(--gold)]' : 'text-[var(--ink)]'}`}>{money(displayAmount(spot.amount))}</div>
            <div className="text-[11px] text-[var(--ink-3)] uppercase tracking-wider font-semibold">spot value</div>
          </div>
          <div className="text-right text-xs text-[var(--ink-2)] space-y-1">
            <div>👁 {compact(spot.views)} views</div>
            <div>🖱 {compact(spot.clicks)} clicks</div>
          </div>
        </div>
        {isFirst && (
          <div className="mt-4 rounded-xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 px-4 py-2.5 text-center text-sm font-semibold text-[var(--gold-deep)] dark:text-[var(--gold)]">
            👑 The most visible spot on the internet right now
          </div>
        )}
      </Link>
    </motion.div>
  );
}
