import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp from '../components/CountUp';
import DramaTicker from '../components/DramaTicker';
import Podium from '../components/Podium';
import { BrandAvatar, RankBadge, MoveIndicator } from '../components/SpotCard';
import { money, compact } from '../lib/format';
import { LIVE_FEED_POOL } from '../lib/data';
import { IS_LIVE } from '../lib/store';

function LiveStat({ icon, value, label, format }) {
  return (
    <div className="flex items-center gap-3 bg-line/5 border border-line/10 rounded-2xl px-4 py-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="font-display font-bold text-xl text-snow leading-none">
          <CountUp to={value} format={format} />
        </div>
        <div className="text-[11px] text-mist font-medium mt-1">{label}</div>
      </div>
    </div>
  );
}

function FeedTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % LIVE_FEED_POOL.length), 4000);
    return () => clearInterval(t);
  }, []);
  const [name, action] = LIVE_FEED_POOL[idx];
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span className="live-dot shrink-0" />
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-mist"
        >
          <b className="text-snow">{name}</b> {action}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Home({ spots, onClaim, onBoost, viewers }) {
  const totalRaised = useMemo(() => spots.reduce((a, s) => a + s.amount, 0), [spots]);
  const stats = [
    { icon: '🟢', value: viewers ?? 0, label: 'people here now', format: (n) => Math.round(n).toString() },
    { icon: '🔥', value: 5240 + spots.filter((s) => s.id?.startsWith('local-')).length, label: 'spots claimed', format: (n) => Math.round(n).toLocaleString() },
    { icon: '👀', value: 89000 + spots.reduce((a, s) => a + (s.views || 0), 0), label: 'visitors this month', format: (n) => compact(n) },
    { icon: '⚡', value: totalRaised, label: 'support contributed', format: (n) => '$' + compact(n) },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-[68px]">
        <div className="blob w-[420px] h-[420px] bg-electric/40 -top-20 -left-32" />
        <div className="blob w-[380px] h-[380px] bg-neon/20 top-40 right-[-120px]" style={{ animationDelay: '-6s' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-14 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-line/5 border border-line/10 rounded-full px-4 py-1.5 text-xs font-semibold text-mist mb-6">
              <span className="live-dot" /> The internet's public spotlight marketplace
            </div>
            <h1 className="font-display font-bold text-[42px] sm:text-6xl lg:text-[68px] leading-[1.02] tracking-tight text-snow">
              Claim Your Spot<br />On The <span className="grad-text">Internet.</span>
            </h1>
            <p className="text-mist text-base sm:text-lg mt-5 max-w-lg leading-relaxed">
              Starting from just <b className="text-snow">$1</b>, get discovered, climb the leaderboard, and show the world what you're building.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button onClick={onClaim} className="btn-primary px-8 py-4 text-base">
                ⚡ Claim My Spot From $1
              </button>
              <Link to="/leaderboard" className="btn-ghost px-8 py-4 text-base text-center">
                Explore Leaderboard
              </Link>
            </div>
            <div className="mt-8 max-w-md space-y-3">
              <DramaTicker />
              <FeedTicker />
            </div>
          </div>
          <div>
            <Podium spots={spots.slice(0, 3)} onBoost={onBoost} />
            {/* ranks 4–10 */}
            <div className="mt-4 rounded-3xl bg-card border border-line/5 p-3">
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="font-display font-bold text-sm text-snow">🔥 Top 10 — the chase pack</span>
                <Link to="/leaderboard" className="text-[11px] font-semibold text-electric hover:underline">Full board →</Link>
              </div>
              <div className="space-y-1">
                <AnimatePresence initial={false}>
                  {spots.slice(3, 10).map((s) => (
                    <motion.div
                      key={s.slug}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <Link to={`/s/${s.slug}`} className="flex items-center gap-3 rounded-2xl p-2 hover:bg-line/5 transition-colors">
                        <RankBadge rank={s.rank} />
                        <BrandAvatar spot={s} size={34} />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-snow truncate">{s.name}</div>
                          <div className="text-[11px] text-mist truncate">{s.tagline}</div>
                        </div>
                        <MoveIndicator move={s.move} />
                        <div className="font-display font-bold text-neon text-sm">{money(s.amount)}</div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* live stats band */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((s) => <LiveStat key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="border-y border-line/5 bg-coal/50 py-4 overflow-hidden">
        <div className="marquee-track gap-10 text-sm font-semibold text-mist">
          {[...spots.slice(0, 8), ...spots.slice(0, 8)].map((s, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-gold">#{s.rank}</span> {s.name} <span className="text-neon font-bold">{money(s.amount)}</span> <span className="text-line/20">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* leaderboard preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-snow">🏆 The Leaderboard</h2>
            <p className="text-mist mt-2">Live rankings. More support = higher spot. Beat your competitors.</p>
          </div>
          <Link to="/leaderboard" className="btn-ghost px-5 py-2.5 text-sm hidden sm:block">View all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spots.slice(0, 4).map((s) => (
            <Link key={s.slug} to={`/s/${s.slug}`} className={`card-lift rounded-3xl p-5 border ${s.rank === 1 ? 'bg-gold/[0.07] border-gold/40' : 'bg-card border-line/5'}`}>
              <div className="flex items-center justify-between mb-4">
                <RankBadge rank={s.rank} />
                {s.rank === 1 && <span className="text-2xl crown-bob">👑</span>}
              </div>
              <BrandAvatar spot={s} size={52} />
              <h3 className="font-display font-bold text-lg text-snow mt-3 truncate">{s.name}</h3>
              <p className="text-mist text-xs truncate">{s.tagline}</p>
              <div className="font-display font-bold text-2xl text-neon mt-3">{money(s.amount)}</div>
            </Link>
          ))}
        </div>
        <Link to="/leaderboard" className="btn-ghost w-full py-3.5 text-sm mt-6 sm:hidden text-center block">View full leaderboard →</Link>
      </section>

      {/* how it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-snow text-center">From invisible to <span className="grad-text">unmissable</span> in 3 steps</h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {[
            { n: '1', icon: '⚡', t: 'Claim your spot', d: 'Add your name, logo, link and story. No signup, under a minute, from $1.' },
            { n: '2', icon: '🚀', t: 'Climb the board', d: 'Every dollar of support pushes you higher. Boost yourself or get friends to back you.' },
            { n: '3', icon: '👑', t: 'Own the spotlight', d: 'Hit #1 and take the crown. Share your rank everywhere and watch the clicks roll in.' },
          ].map((s) => (
            <div key={s.n} className="card-lift bg-card border border-line/5 rounded-3xl p-6 relative overflow-hidden">
              <div className="text-5xl mb-4">{s.icon}</div>
              <div className="absolute top-4 right-5 font-display font-bold text-6xl text-line/5">{s.n}</div>
              <h3 className="font-display font-bold text-xl text-snow mb-2">{s.t}</h3>
              <p className="text-mist text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/how-it-works" className="text-electric text-sm font-semibold hover:underline">Learn more about how it works →</Link>
        </div>
      </section>

      {/* why brands flex here */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-snow text-center">Why brands <span className="grad-text">flex here</span></h2>
        <p className="text-mist text-center mt-3 max-w-xl mx-auto">Traditional ads cost thousands and get ignored. A FlexSpot puts you in front of everyone — and every dollar works twice: as promotion and as ranking power.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {[
            { icon: '👁️', t: 'Public visibility', d: 'Your brand on a page people check daily — not buried in an ad auction.' },
            { icon: '🤝', t: 'Social proof', d: 'A live support total next to your name beats any testimonial.' },
            { icon: '🌐', t: 'Website traffic', d: 'Every spot links straight to you. Clicks are the whole point.' },
            { icon: '🔍', t: 'Brand discovery', d: 'Get discovered beside bigger names by thousands of curious visitors.' },
            { icon: '⚡', t: 'Community support', d: 'Fans, friends and customers can boost you up the board in real time.' },
          ].map((b) => (
            <div key={b.t} className="card-lift bg-card border border-line/5 rounded-3xl p-5">
              <div className="text-4xl mb-3">{b.icon}</div>
              <h3 className="font-display font-bold text-snow mb-1.5">{b.t}</h3>
              <p className="text-mist text-xs leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* viral CTA band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <div className="spotlight relative overflow-hidden rounded-[32px] bg-gradient-to-br from-electric/25 via-card to-card border border-electric/30 p-8 sm:p-14 text-center">
          <div className="text-5xl mb-4 anim-floaty">👀</div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-snow max-w-2xl mx-auto leading-tight">
            Your competitors are already <span className="grad-gold">on the board.</span>
          </h2>
          <p className="text-mist mt-4 max-w-xl mx-auto">Every minute you wait, someone else takes the spotlight. Claim your spot now — from just $1.</p>
          <button onClick={onClaim} className="btn-gold px-10 py-4 text-base mt-8">⚡ Claim My Spot — $1</button>
          <p className="text-xs text-mist mt-4">Join 5,240+ brands, creators & startups already competing</p>
        </div>
      </section>

      {/* rewards teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-snow">🎖️ Rewards worth fighting for</h2>
            <p className="text-mist mt-2">Badges, titles and glory for the boldest competitors.</p>
          </div>
          <Link to="/rewards" className="btn-ghost px-5 py-2.5 text-sm hidden sm:block">All rewards →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '👑', t: 'Top Spot Holder', d: 'Rule the #1 position' },
            { icon: '🏆', t: 'Weekly Champion', d: 'Top earner of the week' },
            { icon: '🚀', t: 'Fastest Climber', d: 'Biggest rank jump in 24h' },
            { icon: '📣', t: 'Most Shared', d: 'Referral machine' },
            { icon: '❤️', t: 'Community Favorite', d: 'Most loved this week' },
            { icon: '⚡', t: 'Early Adopter', d: 'First 100 spots ever' },
          ].map((r) => (
            <div key={r.t} className="card-lift bg-card border border-line/5 rounded-3xl p-5 flex items-center gap-4">
              <span className="text-4xl">{r.icon}</span>
              <div><h3 className="font-display font-bold text-snow">{r.t}</h3><p className="text-mist text-xs">{r.d}</p></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
