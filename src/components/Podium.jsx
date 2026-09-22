import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrandAvatar, RankBadge, MoveIndicator } from './SpotCard';
import Flee from './Flee';
import { money, compact } from '../lib/format';

// Royal Podium — a literal winner's podium, now extra premium.
// #1: dark champion card, glowing bobbing crown, gold shine sweep, twinkling
// sparkles, "defending the throne" pulse, and a tall 3D gold step.
// #2 / #3: theme-aware cards with a cartoon runner "charging for #1"
// animation filling the empty space, on 3D silver/bronze steps.
// Every card links to the brand's full profile page.
export default function Podium({ spots, onBoost }) {
  const [first, second, third] = spots;
  if (!first) return null;

  const step = (s, rank, label, orderCls = '') => {
    if (!s) return null;
    const isFirst = rank === 1;
    return (
      <motion.div
        layout
        key={s.slug}
        className={`relative flex flex-col ${orderCls}`}
      >
        {/* crown for the champion — with a little rocket hovering by, ready to launch */}
        {isFirst && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 blur-xl bg-[#F59E0B]/60 rounded-full scale-110" />
            <Flee><div className="relative text-6xl sm:text-7xl crown-bob drop-shadow-[0_6px_16px_rgba(245,158,11,0.9)]">👑</div></Flee>
            <span className="rocket-launch absolute -right-9 top-2 text-3xl">🚀</span>
          </div>
        )}

        {/* brand card */}
        <div
          className={`relative rounded-3xl p-5 sm:p-6 text-center overflow-hidden border-2 transition-transform duration-300 hover:-translate-y-1.5 ${
            isFirst
              ? 'border-[#FBBF24] podium-champion champion-aura'
              : `bg-[var(--surface)] border-[var(--line)] ${rank === 2 ? 'podium-glow-2' : 'podium-glow-3'}`
          }`}
        >
          {isFirst && <div className="podium-shine" aria-hidden="true" />}
          {isFirst && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <span className="twinkle absolute top-4 left-5 text-sm">✨</span>
              <span className="twinkle absolute top-10 right-6 text-xs" style={{ animationDelay: '-0.9s' }}>✨</span>
              <span className="twinkle absolute bottom-24 left-8 text-xs" style={{ animationDelay: '-1.7s' }}>✨</span>
              <span className="twinkle absolute bottom-32 right-8 text-sm" style={{ animationDelay: '-2.3s' }}>✨</span>
              {/* flipping gold coins around the champion — they dodge your cursor too */}
              <span className="absolute" style={{ top: '16%', left: '7%' }}><Flee><span className="coin-flip !static text-2xl">🪙</span></Flee></span>
              <span className="absolute" style={{ top: '7%', right: '11%' }}><Flee><span className="coin-flip !static text-xl" style={{ animationDelay: '-1.2s' }}>🪙</span></Flee></span>
              <span className="absolute" style={{ bottom: '36%', right: '6%' }}><Flee><span className="coin-flip !static text-lg" style={{ animationDelay: '-2.3s' }}>🪙</span></Flee></span>
            </div>
          )}
          <div className="flex items-center justify-center gap-2 mb-3">
            <RankBadge rank={rank} size={isFirst ? 'lg' : 'md'} />
            {!isFirst && (
              <span className={`medal-coin ${rank === 2 ? 'medal-silver' : 'medal-bronze'}`} aria-hidden="true">{rank}</span>
            )}
            <span className={`text-[10px] uppercase tracking-[0.18em] font-extrabold px-2.5 py-1 rounded-full ${isFirst ? 'bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/40' : 'text-[var(--ink-3)]'}`}>
              {label}
            </span>
          </div>

          <Link to={`/s/${s.slug}`} className="block group">
            <div className="flex justify-center">
              <div className={isFirst ? 'relative' : ''}>
                {isFirst && <div className="absolute -inset-2 rounded-full bg-[#F59E0B]/30 blur-lg" aria-hidden="true" />}
                <BrandAvatar spot={s} size={isFirst ? 84 : 60} ring={isFirst} />
              </div>
            </div>
            <div className={`font-display font-extrabold mt-3 truncate group-hover:underline ${isFirst ? 'text-2xl text-white' : 'text-lg text-[var(--ink)]'}`}>
              {s.name}
            </div>
            <p className={`text-sm mt-0.5 truncate font-medium ${isFirst ? 'text-[#FCD34D]' : 'text-[var(--ink-2)]'}`}>{s.tagline}</p>
            {s.pending && (
              <span className="inline-block mt-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/40 rounded-full px-2.5 py-0.5" title="Payment under review">
                ⏳ Pending review
              </span>
            )}
            {s.description && (
              <p className={`text-xs mt-2 leading-relaxed line-clamp-2 max-w-[26rem] mx-auto ${isFirst ? 'text-white/60' : 'text-[var(--ink-3)]'}`}>
                {s.description}
              </p>
            )}
          </Link>

          {/* animated flourish fills the middle space */}
          {isFirst ? (
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FBBF24]" />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#FCD34D]">🛡️ Defending the throne</span>
            </div>
          ) : (
            <div className="mt-4 rounded-xl bg-[var(--surface-2)] border border-[var(--line)] overflow-hidden">
              {/* winner's victory lane: same road design, rabbit/turtle runs in place
                  (road dashes scroll beneath) and dodges your cursor */}
              <div className="race-lane podium-lane" aria-hidden="true">
                <span className="race-gate race-gate-finish" />
                <span className="race-dashes" />
                <span className="race-gate race-gate-start" />
                <span className="podium-runner">
                  <Flee>
                    <span className="race-bob" style={{ animationDuration: rank === 2 ? '0.4s' : '0.7s' }}>
                      {rank === 2 ? '🐇' : '🐢'}
                    </span>
                  </Flee>
                </span>
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--ink-3)] py-1.5">
                {rank === 2 ? '🐇 sprinting for #1' : '🐢 crawling for #2'}
              </div>
            </div>
          )}

          <div className={`flex items-center justify-center gap-3 sm:gap-4 mt-4 ${isFirst ? 'text-white' : ''}`}>
            <div>
              <div className={`font-display font-extrabold ${isFirst ? 'text-3xl text-[#FCD34D]' : 'text-2xl text-[var(--blaze)]'}`}>
                {money(s.amount)}
              </div>
              <div className={`text-[10px] uppercase tracking-widest font-bold ${isFirst ? 'text-white/60' : 'text-[var(--ink-3)]'}`}>spot value</div>
            </div>
            <div className={`w-px h-10 ${isFirst ? 'bg-white/20' : 'bg-[var(--line)]'}`} />
            <div>
              <div className={`font-display font-extrabold ${isFirst ? 'text-3xl' : 'text-2xl'}`}>{compact(s.views)}</div>
              <div className={`text-[10px] uppercase tracking-widest font-bold ${isFirst ? 'text-white/60' : 'text-[var(--ink-3)]'}`}>views</div>
            </div>
            {s.move ? (
              <>
                <div className={`w-px h-10 ${isFirst ? 'bg-white/20' : 'bg-[var(--line)]'}`} />
                <div>
                  <div className="font-display font-extrabold text-xl"><MoveIndicator move={s.move} /></div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold ${isFirst ? 'text-white/60' : 'text-[var(--ink-3)]'}`}>today</div>
                </div>
              </>
            ) : null}
          </div>
          <button
            onClick={() => onBoost(s)}
            className={`${isFirst ? 'btn-gold' : 'btn-ghost'} w-full py-3 mt-5 text-sm`}
          >
            {isFirst ? `⚡ Defend the crown` : `⚔️ Challenge for #${rank - 1}`}
          </button>
        </div>

        {/* the physical 3D step */}
        <div className="relative mx-8 sm:mx-10" style={{ height: isFirst ? 96 : rank === 2 ? 62 : 46 }} aria-hidden="true">
          {/* top face */}
          <div className={`absolute -top-2 left-2 right-2 h-2 rounded-t-md ${stepTopClass(rank)}`} />
          {/* front face */}
          <div className={`absolute inset-0 rounded-b-2xl border-x border-b overflow-hidden ${stepFrontClass(rank)}`}>
            <div className="absolute top-0 inset-x-0 h-1 bg-white/50" />
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/25 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-white/25 to-transparent" />
            <div className="relative h-full flex items-start justify-center pt-2">
              <span className={`font-display font-black ${isFirst ? 'text-5xl text-[#7C2D12]/45' : 'text-4xl text-black/25'}`}>
                {rank}
              </span>
            </div>
          </div>
          {/* ground shadow */}
          <div className="absolute -bottom-3 left-4 right-4 h-3 bg-black/20 blur-md rounded-full" />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      {/* arena glow behind the podium */}
      <div className="absolute inset-x-0 -top-8 bottom-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[560px] h-[280px] bg-[var(--gold)]/15 blur-[100px] rounded-full" />
      </div>
      <div className="relative grid sm:grid-cols-3 gap-4 sm:gap-5 items-end max-w-4xl mx-auto pt-10">
        {step(second, 2, '2nd · Silver', 'order-2 sm:order-1')}
        {step(first, 1, '👑 Champion', 'order-1 sm:order-2')}
        {step(third, 3, '3rd · Bronze', 'order-3 sm:order-3')}
      </div>
      <p className="text-center text-xs text-[var(--ink-3)] mt-6">
        One dollar more than your rival steals their step. Ties go to whoever got there first.
      </p>
    </div>
  );
}

function stepFrontClass(rank) {
  if (rank === 1)
    return 'bg-gradient-to-b from-[#FCD34D] via-[#F59E0B] to-[#B45309] border-[#92400E]/40 shadow-[0_18px_40px_-12px_rgba(245,158,11,0.55)]';
  if (rank === 2)
    return 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-slate-400/50 shadow-[0_14px_30px_-12px_rgba(100,116,139,0.5)]';
  return 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 border-amber-700/50 shadow-[0_14px_30px_-12px_rgba(180,83,9,0.5)]';
}

function stepTopClass(rank) {
  if (rank === 1) return 'bg-[#FDE68A] border border-[#92400E]/30';
  if (rank === 2) return 'bg-slate-100 border border-slate-400/40';
  return 'bg-amber-300 border border-amber-700/40';
}
