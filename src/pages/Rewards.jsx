import { Link } from 'react-router-dom';
import { BrandAvatar } from '../components/SpotCard';
import { REWARDS } from '../lib/data';

export default function Rewards({ spots, onClaim }) {
  const holders = Object.fromEntries(
    REWARDS.map((r) => {
      try { return [r.slug, spots.find((s) => s.slug === r.check(spots))]; }
      catch { return [r.slug, null]; }
    })
  );

  return (
    <div className="pt-[68px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 text-center">
        <h1 className="font-display font-bold text-4xl sm:text-6xl text-snow tracking-tight">Rewards worth <span className="grad-gold">fighting for</span></h1>
        <p className="text-mist mt-4 max-w-xl mx-auto">Badges, titles and eternal glory. Earned on the leaderboard — shown off everywhere.</p>
        <button onClick={onClaim} className="btn-gold px-8 py-3.5 mt-7">⚡ Start earning — claim your spot</button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REWARDS.map((r, i) => {
          const holder = holders[r.slug];
          return (
            <div key={r.slug} className="card-lift relative overflow-hidden rounded-3xl bg-card border border-line/5 p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full" />
              <div className="text-5xl mb-4">{r.icon}</div>
              <h3 className="font-display font-bold text-xl text-snow">{r.name}</h3>
              <p className="text-mist text-sm mt-1.5 mb-5">{r.desc}</p>
              {holder ? (
                <Link to={`/s/${holder.slug}`} className="flex items-center gap-3 bg-line/5 border border-line/10 rounded-2xl p-3 hover:border-gold/40 transition-colors">
                  <BrandAvatar spot={holder} size={40} />
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-gold font-bold">Current holder</div>
                    <div className="font-bold text-snow text-sm truncate">{holder.name} <span className="text-mist font-medium">#{holder.rank}</span></div>
                  </div>
                </Link>
              ) : (
                <div className="text-xs font-bold text-mist bg-line/5 rounded-2xl p-3">⏳ Awaiting first champion</div>
              )}
              <div className="mt-4 text-[11px] font-bold text-mist/60 uppercase tracking-widest">Reward #{String(i + 1).padStart(2, '0')}</div>
            </div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-14 rounded-[32px] bg-gradient-to-br from-electric/20 via-card to-card border border-electric/25 p-8 sm:p-10 text-center">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-snow">How rewards unlock</h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-6 text-left">
          {[
            { t: 'Compete', d: 'Claim a spot and climb. Rankings update live with every contribution.' },
            { t: 'Get noticed', d: 'Holders are featured on this page, the homepage, and share cards.' },
            { t: 'Defend', d: 'Rewards are re-evaluated weekly. Keep your rank or lose the badge.' },
          ].map((s) => (
            <div key={s.t} className="bg-ink/50 rounded-2xl p-5">
              <h3 className="font-display font-bold text-snow mb-1.5">{s.t}</h3>
              <p className="text-mist text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
