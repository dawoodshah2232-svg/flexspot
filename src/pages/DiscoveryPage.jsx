import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SpotRow } from '../components/SpotCard';
import DramaTicker from '../components/DramaTicker';
import Podium from '../components/Podium';
import Flee from '../components/Flee';

// SEO discovery pages: /trending /rising /winners /new
// Each is a crawlable list with its own title + description.
const MODES = {
  trending: {
    title: 'Trending now',
    seoTitle: 'Trending Brands & Creators — FlexSpot.LOL',
    desc: 'The spots getting the most eyeballs right now. Attention is moving — follow it.',
    icon: '🔥',
    pick: (spots) => [...spots].sort((a, b) => (b.views + b.clicks * 12) - (a.views + a.clicks * 12)).slice(0, 12),
  },
  rising: {
    title: 'Rising fast',
    seoTitle: 'Fastest Rising Brands & Creators — FlexSpot.LOL',
    desc: 'The biggest climbers on the board. These names are moving up — hype them before they blow up.',
    icon: '🚀',
    pick: (spots) => {
      const climbers = [...spots].filter((s) => (s.move || 0) > 0).sort((a, b) => (b.move || 0) - (a.move || 0));
      const rest = [...spots].filter((s) => !((s.move || 0) > 0)).slice(0, Math.max(0, 12 - climbers.length));
      return [...climbers, ...rest].slice(0, 12);
    },
  },
  winners: {
    title: "This week's winners",
    seoTitle: "This Week's Winners — FlexSpot.LOL",
    desc: 'The current kings of the spotlight. 👑 Who will steal the crown next?',
    icon: '🏆',
    hero: true,
    pick: (spots) => spots.slice(0, 12),
  },
  new: {
    title: 'New to watch',
    seoTitle: 'New Brands & Creators to Watch — FlexSpot.LOL',
    desc: 'Fresh spots that just entered the battlefield. Early movers take the spotlight.',
    icon: '✨',
    pick: (spots) => [...spots].sort((a, b) => (b.joinedAt || 0) - (a.joinedAt || 0)).slice(0, 12),
  },
};

export default function DiscoveryPage({ mode, spots, moves, onBoost, onClaim }) {
  const cfg = MODES[mode] || MODES.trending;
  const list = useMemo(() => cfg.pick(spots || []), [spots, mode]);

  useEffect(() => {
    document.title = cfg.seoTitle;
    return () => { document.title = 'FlexSpot.LOL — Claim Your Spot On The Internet'; };
  }, [cfg.seoTitle]);

  return (
    <div className="pt-[92px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <Link to="/leaderboard" className="text-mist text-sm hover:text-snow">← Back to leaderboard</Link>
        <Flee><div className="text-5xl mt-6 mb-3">{cfg.icon}</div></Flee>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-snow">{cfg.title}</h1>
        <p className="text-mist mt-3 max-w-xl leading-relaxed">{cfg.desc}</p>
        <div className="mt-4 max-w-md"><DramaTicker /></div>

        {cfg.hero && list.length >= 3 && (
          <div className="mt-10">
            <Podium spots={list.slice(0, 3)} onBoost={onBoost} />
          </div>
        )}

        <div className="mt-8 space-y-2">
          <AnimatePresence initial={false}>
            {(cfg.hero ? list.slice(3) : list).map((s) => (
              <SpotRow key={s.slug} spot={s} move={moves[s.slug] ?? s.move} onBoost={onBoost} highlight />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-br from-[var(--blaze-soft)] via-card to-card border border-[var(--blaze)] p-8 text-center">
          <div className="text-4xl mb-3"><Flee><span className="inline-block">⚡</span></Flee></div>
          <h2 className="font-display font-bold text-2xl text-snow">Your brand belongs on this list.</h2>
          <p className="text-mist text-sm mt-2">Claim your spot from $1 and start climbing.</p>
          <button onClick={onClaim} className="btn-primary px-8 py-3.5 mt-5">Claim my spot — $1</button>
        </div>
      </div>
    </div>
  );
}
