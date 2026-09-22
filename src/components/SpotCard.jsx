import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { money, compact, gradientFor, initials } from '../lib/format';

export function BrandAvatar({ spot, size = 44, ring = false }) {
  const [g1, g2] = gradientFor(spot.slug || spot.name);
  return (
    <span
      className={`relative grid place-items-center rounded-2xl font-display font-bold text-white shrink-0 overflow-hidden ${ring ? 'ring-2 ring-gold/70' : ''}`}
      style={{ width: size, height: size, fontSize: size * 0.38, background: `linear-gradient(135deg, ${g1}, ${g2})` }}
    >
      {spot.logo ? (
        <img src={spot.logo} alt="" className="w-full h-full object-cover" />
      ) : (
        initials(spot.name)
      )}
    </span>
  );
}

export function RankBadge({ rank, size = 'md' }) {
  const styles = {
    1: 'bg-gradient-to-br from-gold to-golddeep text-[#231600] shadow-glowgold',
    2: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900',
    3: 'bg-gradient-to-br from-amber-600 to-amber-800 text-white',
  };
  const cls = styles[rank] || 'bg-line/10 text-mist border border-line/10';
  const sz = size === 'lg' ? 'w-12 h-12 text-xl' : 'w-9 h-9 text-sm';
  return (
    <span className={`grid place-items-center rounded-xl font-display font-bold ${sz} ${cls}`}>
      {rank}
    </span>
  );
}

export function MoveIndicator({ move }) {
  if (!move) return <span className="text-mist/50 text-xs font-semibold">–</span>;
  if (move > 0) return <span className="text-neon text-xs font-bold">▲ {move}</span>;
  return <span className="text-red-400 text-xs font-bold">▼ {Math.abs(move)}</span>;
}

export function SpotRow({ spot, move, onBoost, highlight }) {
  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className={highlight ? (move > 0 ? 'flash-up rounded-2xl' : move < 0 ? 'flash-down rounded-2xl' : '') : ''}
    >
      <Link
        to={`/s/${spot.slug}`}
        className="card-lift flex items-center gap-3 sm:gap-4 bg-card border border-line/5 rounded-2xl p-3 sm:p-4"
      >
        <RankBadge rank={spot.rank} />
        <BrandAvatar spot={spot} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-snow truncate text-[15px]">{spot.name}</h3>
            {spot.rank === 1 && <span className="text-sm">👑</span>}
            {spot.gift && <span className="text-sm" title={`Surprised by ${spot.gift.from}`}>🎁</span>}
          </div>
          <p className="text-mist text-xs truncate">{spot.gift ? `🎁 Surprised by ${spot.gift.from}` : spot.tagline}</p>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-mist/80">
            <span>👁 {compact(spot.views)}</span>
            <span>🖱 {compact(spot.clicks)}</span>
            <span className="hidden sm:inline"><MoveIndicator move={move} /></span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display font-bold text-neon text-lg">{money(spot.amount)}</div>
          <div className="text-[10px] text-mist uppercase tracking-wider font-semibold">raised</div>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onBoost && onBoost(spot); }}
          className="btn-primary hidden sm:block px-4 py-2 text-xs shrink-0"
        >
          Boost ⚡
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
        className={`spotlight card-lift relative block rounded-3xl p-5 sm:p-6 border overflow-hidden ${
          isFirst
            ? 'gold-card bg-gradient-to-b from-[#2A2113] to-card border-gold/50'
            : 'bg-card border-line/10'
        }`}
      >
        {isFirst && (
          <div className="absolute top-3 right-4 text-4xl crown-bob">👑</div>
        )}
        <div className="flex items-center gap-2 mb-4">
          <RankBadge rank={place} size="lg" />
          <div>
            <div className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isFirst ? 'text-gold' : 'text-mist'}`}>
              {isFirst ? 'Internet Spotlight Winner' : `Rank #${place}`}
            </div>
            {isFirst && <div className="shine-text font-display font-bold text-sm">Holding the crown</div>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BrandAvatar spot={spot} size={64} ring={isFirst} />
          <div className="min-w-0">
            <h3 className="font-display font-bold text-xl text-snow truncate">{spot.name}</h3>
            <p className="text-mist text-sm truncate">{spot.tagline}</p>
          </div>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <div className={`font-display font-bold text-3xl ${isFirst ? 'text-gold' : 'text-snow'}`}>{money(spot.amount)}</div>
            <div className="text-[11px] text-mist uppercase tracking-wider font-semibold">total support</div>
          </div>
          <div className="text-right text-xs text-mist space-y-1">
            <div>👁 {compact(spot.views)} views</div>
            <div>🖱 {compact(spot.clicks)} clicks</div>
          </div>
        </div>
        {isFirst && (
          <div className="mt-4 rounded-xl bg-gold/10 border border-gold/30 px-4 py-2.5 text-center text-sm font-semibold text-gold">
            👑 The most visible spot on the internet right now
          </div>
        )}
      </Link>
    </motion.div>
  );
}
