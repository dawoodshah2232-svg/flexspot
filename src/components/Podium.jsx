import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrandAvatar, MoveIndicator } from './SpotCard';
import Flee from './Flee';
import { money, compact } from '../lib/format';
import { displayAmount } from '../lib/display';

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
        // Champion is scaled up with its base anchored, so it reads clearly
        // bigger; #2/#3 keep identical sizing so they sit perfectly level.
        className={`relative flex flex-col ${orderCls} ${isFirst ? 'sm:scale-[1.07] sm:origin-bottom z-10' : ''}`}
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
          {/* rank header: champion keeps its badge; #2/#3 get one big metallic
              medal banner — a single numeral, no more 2-2-2 repetition */}
          {isFirst ? (
            <div className="flex items-center justify-center mb-3">
              <span className="text-xs sm:text-sm uppercase tracking-[0.22em] font-black px-5 py-2 rounded-full bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/40">
                {label}
              </span>
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div className={`rank-medal ${rank === 2 ? 'rank-medal-silver' : 'rank-medal-bronze'}`}>
                <span className="rank-medal-num">{rank}</span>
                <span className="rank-medal-text">
                  <span className="rank-medal-word">{rank === 2 ? 'SECOND' : 'THIRD'}</span>
                  <span className="rank-medal-sub">{rank === 2 ? 'SILVER' : 'BRONZE'}</span>
                </span>
              </div>
            </div>
          )}

          <Link to={`/s/${s.slug}`} className="block group">
            <div className="flex justify-center">
              <div className={isFirst ? 'relative' : ''}>
                {isFirst && <div className="absolute -inset-2 rounded-full bg-[#F59E0B]/30 blur-lg" aria-hidden="true" />}
                <BrandAvatar spot={s} size={isFirst ? 84 : 68} ring={isFirst} />
              </div>
            </div>
            <div className={`font-display font-extrabold mt-3 truncate group-hover:underline ${isFirst ? 'text-2xl text-white' : 'text-xl text-[var(--ink)]'}`}>
              {s.name}
            </div>
            <p className={`text-sm mt-0.5 truncate font-medium ${isFirst ? 'text-[#FCD34D]' : 'text-[var(--ink-2)]'}`}>{s.tagline}</p>
            {s.pending && (
              <span className="inline-block mt-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/40 rounded-full px-2.5 py-0.5" title="Payment under review">
                ⏳ Pending review
              </span>
            )}
            {/* fixed two-line description slot so #2/#3 always measure identically */}
            <p className={`text-xs mt-2 leading-relaxed line-clamp-2 max-w-[26rem] mx-auto min-h-[2.5rem] ${isFirst ? 'text-white/60' : 'text-[var(--ink-3)]'}`}>
              {s.description || '\u00A0'}
            </p>
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
                {money(displayAmount(s.amount))}
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

        {/* the physical 3D step: champion stands tallest; #2/#3 are identical
            height so they sit perfectly level with each other */}
        <div className="relative mx-8 sm:mx-10" style={{ height: isFirst ? 112 : 56 }} aria-hidden="true">
          {/* top face */}
          <div className={`absolute -top-2 left-2 right-2 h-2 rounded-t-md ${stepTopClass(rank)}`} />
          {/* front face */}
          <div className={`absolute inset-0 rounded-b-2xl border-x border-b overflow-hidden ${stepFrontClass(rank)}`}>
            <div className="absolute top-0 inset-x-0 h-1 bg-white/50" />
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/25 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-white/25 to-transparent" />
          </div>
          {/* award medallion pinned on the step: laurel + crown + rank */}
          <div className="absolute inset-0 flex items-center justify-center">
            <StepMedal rank={rank} />
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
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[300px] sm:w-[560px] h-[280px] bg-[var(--gold)]/15 blur-[100px] rounded-full" />
      </div>
      {/* Mobile: the throne + the challengers — compact but unmissable */}
      <div className="relative sm:hidden max-w-4xl mx-auto">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] px-5 py-2 rounded-full bg-[#F59E0B]/15 text-[#B45309] dark:text-[#FCD34D] border border-[#F59E0B]/40">
            👑 Top 3 this week
          </span>
        </div>

        {/* #1 — the throne: dark, gold, unmissable */}
        {first && (
          <div className="relative mt-8">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 text-5xl crown-bob drop-shadow-[0_6px_16px_rgba(245,158,11,0.9)] pointer-events-none" aria-hidden="true">👑</div>
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#FBBF24] podium-champion shadow-[0_0_44px_-8px_rgba(251,191,36,0.55)]">
              <div className="podium-shine" aria-hidden="true" />
              <Link to={`/s/${first.slug}`} className="block px-5 pt-6 pb-4 text-center">
                <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#FCD34D]">Reigning champion</div>
                <div className="flex justify-center mt-3">
                  <BrandAvatar spot={first} size={72} ring />
                </div>
                <div className="font-display font-extrabold text-2xl text-white mt-2 truncate">{first.name}</div>
                <div className="text-sm text-[#FCD34D] truncate">{first.tagline}</div>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <div>
                    <div className="font-display font-black text-3xl text-[#FCD34D]">{money(displayAmount(first.amount))}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">spot value</div>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div>
                    <div className="font-display font-black text-3xl text-white">{compact(first.views)}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">views</div>
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-5">
                <button onClick={() => onBoost(first)} className="btn-gold w-full py-3.5 text-sm font-extrabold">
                  ⚡ Defend the crown
                </button>
              </div>
            </div>
          </div>
        )}

        {/* #2 / #3 — the challengers, coming for the throne */}
        <div className="flex items-center gap-2 mt-6 mb-3 px-1">
          <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--ink-3)]">⚔️ The challengers</span>
          <span className="flex-1 h-px bg-[var(--line)]" aria-hidden="true" />
        </div>
        <div className="space-y-2.5">
          {[second, third].map((s, idx) => s && (
            <Link key={s.slug} to={`/s/${s.slug}`} className="card card-lift flex items-center gap-3 p-3">
              <span className={`grid place-items-center w-9 h-9 rounded-full font-display font-black text-sm shrink-0 shadow ${medalCls(idx + 2)}`}>
                {idx + 2}
              </span>
              <BrandAvatar spot={s} size={44} />
              <div className="min-w-0 flex-1">
                <div className="font-display font-bold text-[15px] text-[var(--ink)] truncate">{s.name}</div>
                <div className="text-xs text-[var(--ink-3)] truncate">{money(displayAmount(s.amount))} · 👁 {compact(s.views)} views</div>
              </div>
              <span className="shrink-0 text-[11px] font-extrabold text-[var(--blaze)] border border-[var(--blaze)]/40 rounded-full px-3 py-1.5">⚔️ Challenge</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop / tablet: the full dramatic podium */}
      <div className="relative hidden sm:grid sm:grid-cols-3 gap-5 items-end max-w-4xl mx-auto pt-14">
        {step(second, 2, '2nd · Silver', 'order-2 sm:order-1')}
        {step(first, 1, 'Champion', 'order-1 sm:order-2')}
        {step(third, 3, '3rd · Bronze', 'order-3 sm:order-3')}
      </div>
      <p className="text-center text-xs text-[var(--ink-3)] mt-6">
        One dollar more than your rival steals their step. Ties go to whoever got there first.
      </p>
    </div>
  );
}

// Award medallion pinned on each podium step: a laurel wreath in the step's
// metal (gold / silver / bronze) flanking the rank, a little crown on top —
// a proper award-badge look instead of a plain number.
function StepMedal({ rank }) {
  const metal = rank === 1 ? 'gold' : rank === 2 ? 'silver' : 'bronze';
  const size = rank === 1 ? 92 : rank === 2 ? 68 : 58;
  const gid = `sml-${metal}`;
  const tones = {
    gold: { stops: ['#FFF7D6', '#FCD34D', '#D97706'], stem: '#B45309', num: '#7C2D12', sub: '#A16207' },
    silver: { stops: ['#FFFFFF', '#CBD5E1', '#64748B'], stem: '#64748B', num: '#334155', sub: '#64748B' },
    bronze: { stops: ['#FDEBD3', '#DE9A52', '#8A5A2B'], stem: '#8A5A2B', num: '#57300C', sub: '#8A5A2B' },
  }[metal];

  const cx = 60, cy = 62, rx = 37, ry = 39;
  const pt = (deg) => {
    const a = (deg * Math.PI) / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  };
  // right branch sweeps 82° → -40° (bottom up to upper-right),
  // left branch mirrors 98° → 220°
  const branches = [
    { from: 82, to: -40, sweep: 0 },
    { from: 98, to: 220, sweep: 1 },
  ];
  const N = 8;
  const leaves = [];
  branches.forEach(({ from, to }) => {
    const dirSign = Math.sign(to - from);
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const deg = from + (to - from) * t;
      const a = (deg * Math.PI) / 180;
      const [x, y] = pt(deg);
      // leaf points along the branch toward the tip, splayed alternately
      const dx = dirSign * -rx * Math.sin(a);
      const dy = dirSign * ry * Math.cos(a);
      const tipAng = (Math.atan2(dy, dx) * 180) / Math.PI;
      const rot = tipAng + (i % 2 === 0 ? 34 : -34);
      const s = 1 - 0.32 * t; // taper toward the tip
      const ox = x + 5.5 * Math.cos((rot * Math.PI) / 180);
      const oy = y + 5.5 * Math.sin((rot * Math.PI) / 180);
      leaves.push(
        <ellipse key={`${from}-${i}`} cx={ox} cy={oy} rx={8 * s} ry={3.1 * s}
          transform={`rotate(${rot.toFixed(1)} ${ox.toFixed(1)} ${oy.toFixed(1)})`}
          fill={`url(#${gid})`} opacity={0.95} />
      );
    }
  });

  return (
    <svg width={size} height={size * 0.92} viewBox="0 0 120 110"
      style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.35))' }} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tones.stops[0]} />
          <stop offset="48%" stopColor={tones.stops[1]} />
          <stop offset="100%" stopColor={tones.stops[2]} />
        </linearGradient>
      </defs>
      {/* stems */}
      {branches.map(({ from, to, sweep }) => {
        const [x1, y1] = pt(from);
        const [x2, y2] = pt(to);
        return (
          <path key={from} d={`M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${rx} ${ry} 0 0 ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
            fill="none" stroke={tones.stem} strokeWidth={2.5} strokeLinecap="round" opacity={0.85} />
        );
      })}
      {leaves}
      {/* knot where the branches meet */}
      <circle cx={60} cy={100} r={3.6} fill={`url(#${gid})`} stroke={tones.stem} strokeWidth={1} />
      {/* crown */}
      <g>
        <polygon points="47,30 47,19 54,25 60,14 66,25 73,19 73,30"
          fill={`url(#${gid})`} stroke={tones.stem} strokeWidth={1} strokeLinejoin="round" />
        <circle cx={47} cy={17.5} r={2.1} fill={tones.stops[0]} stroke={tones.stem} strokeWidth={0.8} />
        <circle cx={60} cy={12.5} r={2.4} fill={tones.stops[0]} stroke={tones.stem} strokeWidth={0.8} />
        <circle cx={73} cy={17.5} r={2.1} fill={tones.stops[0]} stroke={tones.stem} strokeWidth={0.8} />
      </g>
      {/* rank */}
      <text x={60} y={52} textAnchor="middle" fontSize={8.5} fontWeight={800}
        letterSpacing={2.5} fill={tones.sub} fontFamily="'Inter', system-ui, sans-serif">RANK</text>
      <text x={60} y={82} textAnchor="middle" fontSize={37} fontWeight={900}
        fill={tones.num} fontFamily="'Bricolage Grotesque', 'Inter', system-ui, sans-serif">{rank}</text>
    </svg>
  );
}

// Medal badge colors for the compact mobile top-3 list.
function medalCls(rank) {
  if (rank === 1) return 'bg-gradient-to-br from-[#FCD34D] to-[#B45309] text-white';
  if (rank === 2) return 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-700';
  return 'bg-gradient-to-br from-[#EFB27A] to-[#8A5A24] text-white';
}

function stepFrontClass(rank) {
  if (rank === 1)
    return 'bg-gradient-to-b from-[#FCD34D] via-[#F59E0B] to-[#B45309] border-[#92400E]/40 shadow-[0_18px_40px_-12px_rgba(245,158,11,0.55)]';
  if (rank === 2)
    return 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-slate-400/50 shadow-[0_14px_30px_-12px_rgba(100,116,139,0.5)]';
  return 'bg-gradient-to-b from-[#EFB27A] via-[#C47F3D] to-[#8A5A24] border-[#6B4218]/50 shadow-[0_14px_30px_-12px_rgba(180,120,50,0.5)]';
}

function stepTopClass(rank) {
  if (rank === 1) return 'bg-[#FDE68A] border border-[#92400E]/30';
  if (rank === 2) return 'bg-slate-100 border border-slate-400/40';
  return 'bg-[#F2C894] border border-[#6B4218]/40';
}
