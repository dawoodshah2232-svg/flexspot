import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SpotRow, TopSpotCard } from '../components/SpotCard';
import { money } from '../lib/format';

export default function LeaderboardPage({ spots, moves, onBoost, onClaim }) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return spots;
    return spots.filter((s) => s.name.toLowerCase().includes(query) || s.tagline.toLowerCase().includes(query));
  }, [spots, q]);

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <div className="pt-[68px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-mist mb-5">
            <span className="live-dot" /> Updated live — every contribution re-ranks instantly
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-snow tracking-tight">The <span className="grad-gold">Leaderboard</span></h1>
          <p className="text-mist mt-4">The most competitive page on the internet. More support = higher spot. Where do you rank?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
            <button onClick={onClaim} className="btn-primary px-8 py-3.5">⚡ Claim Your Spot — $1</button>
          </div>
          <div className="relative max-w-md mx-auto mt-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mist">🔍</span>
            <input
              className="field pl-11 py-3.5 rounded-2xl"
              placeholder="Search brands, creators, startups…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        {/* podium */}
        {top3.length > 0 && (
          <div className="mt-12">
            <div className="grid md:grid-cols-3 gap-4 items-stretch">
              {/* order: 2, 1, 3 on desktop for podium feel */}
              <div className="md:order-2"><TopSpotCard spot={top3[0]} place={1} /></div>
              {top3[1] && <div className="md:order-1 md:pt-10"><TopSpotCard spot={top3[1]} place={2} /></div>}
              {top3[2] && <div className="md:order-3 md:pt-10"><TopSpotCard spot={top3[2]} place={3} /></div>}
            </div>
          </div>
        )}

        {/* rest of board */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-2xl text-snow">All spots <span className="text-mist text-base font-sans font-medium">({filtered.length} competing)</span></h2>
            <span className="text-xs text-mist font-semibold">Total support: <b className="text-neon">{money(spots.reduce((a, s) => a + s.amount, 0))}</b></span>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-mist">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold text-snow">No spots match "{q}"</p>
              <p className="text-sm mt-1">Be the first with that name — claim it now.</p>
              <button onClick={onClaim} className="btn-primary px-6 py-3 mt-5 text-sm">⚡ Claim "{q}"</button>
            </div>
          ) : (
            <motion.div layout className="space-y-2.5">
              {rest.map((s) => (
                <SpotRow key={s.slug} spot={s} move={moves[s.slug]} onBoost={onBoost} />
              ))}
            </motion.div>
          )}
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-br from-neon/10 to-card border border-neon/20 p-8 text-center">
          <h3 className="font-display font-bold text-2xl text-snow">Not on the board yet?</h3>
          <p className="text-mist text-sm mt-2">The top 10 gets 80% of all clicks. Your spot is one claim away.</p>
          <button onClick={onClaim} className="btn-primary px-8 py-3.5 mt-5">⚡ Claim My Spot From $1</button>
        </div>
      </div>
    </div>
  );
}
