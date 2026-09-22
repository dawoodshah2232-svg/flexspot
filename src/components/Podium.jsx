import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrandAvatar, RankBadge, MoveIndicator } from './SpotCard';
import { money, compact } from '../lib/format';

// Top-3 podium: #1 big on top center with crown + spotlight glow,
// #2 and #3 below, left and right. Matches the founder vision layout.
export default function Podium({ spots, onBoost }) {
  const [first, second, third] = spots;
  if (!first) return null;

  return (
    <div className="relative">
      {/* #1 — the crown spot */}
      <motion.div layout className="relative z-10 max-w-md mx-auto">
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-6xl crown-bob z-20 pointer-events-none">👑</div>
        <div className="spotlight rounded-[28px]">
          <div className="rounded-[28px] bg-gradient-to-b from-gold/25 via-card to-card border-2 border-gold/60 shadow-glowgold p-6 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 bg-gold/20 border border-gold/50 rounded-full px-3.5 py-1 text-[11px] font-bold text-gold uppercase tracking-widest mb-4">
              ✨ Current internet spotlight
            </div>
            <Link to={`/s/${first.slug}`} className="block group">
              <div className="flex justify-center"><BrandAvatar spot={first} size={88} ring /></div>
              <div className="flex items-center justify-center gap-2 mt-3">
                <RankBadge rank={1} size="lg" />
                <span className="font-display font-bold text-2xl text-snow group-hover:underline truncate">{first.name}</span>
              </div>
              <p className="text-mist text-sm mt-1 truncate">{first.tagline}</p>
            </Link>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div>
                <div className="font-display font-bold text-3xl text-neon">{money(first.amount)}</div>
                <div className="text-[10px] uppercase tracking-widest text-mist font-bold">total support</div>
              </div>
              <div className="w-px h-10 bg-line/10" />
              <div>
                <div className="font-display font-bold text-3xl text-snow">{compact(first.views)}</div>
                <div className="text-[10px] uppercase tracking-widest text-mist font-bold">views</div>
              </div>
              {first.move ? (
                <>
                  <div className="w-px h-10 bg-line/10" />
                  <div>
                    <div className="font-display font-bold text-2xl"><MoveIndicator move={first.move} /></div>
                    <div className="text-[10px] uppercase tracking-widest text-mist font-bold">today</div>
                  </div>
                </>
              ) : null}
            </div>
            <button onClick={() => onBoost(first)} className="btn-gold w-full py-3 mt-5 text-sm">
              ⚡ Defend the crown — boost {first.name.split(' ')[0]}
            </button>
          </div>
        </div>
      </motion.div>

      {/* #2 and #3 — below, left and right */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
        {[
          { s: second, accent: 'slate-300', label: 'Runner-up', border: 'border-slate-300/30', glow: '' },
          { s: third, accent: 'amber-600', label: 'Chasing', border: 'border-amber-600/40', glow: '' },
        ].map(({ s, label, border }) => (
          s ? (
            <motion.div layout key={s.slug} className={`rounded-3xl bg-card border ${border} p-4 sm:p-5 text-center card-lift`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <RankBadge rank={s.rank} />
                <span className="text-[10px] uppercase tracking-widest text-mist font-bold">{label}</span>
              </div>
              <Link to={`/s/${s.slug}`} className="block group">
                <div className="flex justify-center"><BrandAvatar spot={s} size={56} /></div>
                <div className="font-display font-bold text-snow mt-2 truncate group-hover:underline">{s.name}</div>
                <p className="text-mist text-xs truncate">{s.tagline}</p>
              </Link>
              <div className="font-display font-bold text-xl text-neon mt-2">{money(s.amount)}</div>
              {s.move ? <div className="mt-1"><MoveIndicator move={s.move} /></div> : null}
              <button onClick={() => onBoost(s)} className="btn-ghost w-full py-2 mt-3 text-xs">
                ⚡ Boost to #{s.rank - 1 > 0 ? s.rank - 1 : 1}
              </button>
            </motion.div>
          ) : null
        ))}
      </div>
    </div>
  );
}
