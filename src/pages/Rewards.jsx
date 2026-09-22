import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrandAvatar } from '../components/SpotCard';
import { REWARDS } from '../lib/data';
import Flee from '../components/Flee';

const S_TIER = new Set(['top-spot', 'weekly-champion', 'diamond-hands']);

const PERKS = [
  { icon: '🖼️', name: 'Custom icon frame', desc: 'A gold or animated border wrapped around your avatar, everywhere you appear.', price: 'from $5' },
  { icon: '✨', name: 'Animated avatar glow', desc: 'Make your logo pulse, shimmer and steal every eye on the leaderboard.', price: 'from $8' },
  { icon: '🚩', name: 'Spotlight banner', desc: 'A full-width banner pinned across the top of your public profile.', price: 'from $10' },
  { icon: '🎭', name: 'Custom emoji mark', desc: 'Swap the default avatar for your own emoji — your vibe, your mark.', price: 'from $5' },
  { icon: '💫', name: 'Name flair', desc: 'Sparkles, gradients and animated effects on your brand name on the board.', price: 'from $7' },
];

const STEPS = [
  { n: 1, icon: '🎯', t: 'Claim your spot', d: 'Grab a place on the board from just $1. One cent more overtakes your rival.' },
  { n: 2, icon: '📈', t: 'Climb & get seen', d: 'Boost your amount, stack views and referral visits. Rankings update live.' },
  { n: 3, icon: '🔗', t: 'Refer & earn $1', d: 'Share your personal link anywhere — every visit through it adds $1 to the brand and your name hits the Top Referrers board.' },
  { n: 4, icon: '🏅', t: 'Earn badges', d: 'Hit the criteria and the badge lands on your profile, the homepage and share cards.' },
  { n: 5, icon: '🛡️', t: 'Defend the crown', d: 'Badges are re-evaluated weekly — keep your rank or watch someone steal it.' },
];

function HolderRow({ holder, compact = false }) {
  if (!holder) {
    return (
      <div className={`text-xs font-bold text-[var(--ink-3)] bg-[var(--surface-2)] rounded-2xl ${compact ? 'p-2.5' : 'p-3'}`}>
        ⏳ Awaiting first champion
      </div>
    );
  }
  return (
    <Link
      to={`/s/${holder.slug}`}
      className={`flex items-center gap-3 bg-[var(--surface-2)] border border-[var(--line)] rounded-2xl ${compact ? 'p-2.5' : 'p-3'} hover:border-[var(--gold)] transition-colors group`}
    >
      <BrandAvatar spot={holder} size={compact ? 34 : 40} />
      <div className="min-w-0 text-left">
        <div className="text-[10px] uppercase tracking-widest text-[var(--gold-deep)] font-bold">Current holder</div>
        <div className="font-bold text-[var(--ink)] text-sm truncate group-hover:text-[var(--blaze)] transition-colors">
          {holder.name} <span className="text-[var(--ink-3)] font-medium">#{holder.rank}</span>
        </div>
      </div>
    </Link>
  );
}

function Shine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
      initial={{ x: '-150%' }}
      animate={{ x: '350%' }}
      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.4, ease: 'easeInOut' }}
      style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)' }}
    />
  );
}

function TierBadge({ tier }) {
  if (tier === 'S') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-[#3A2200] bg-gradient-to-r from-[#FFD97A] via-[#F5B301] to-[#FFD97A] shadow-[0_4px_14px_-4px_rgba(245,158,11,0.7)]">
        ★ S-tier
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-[11px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/25">
      A-tier
    </span>
  );
}

export default function Rewards({ spots, onClaim }) {
  const holders = Object.fromEntries(
    REWARDS.map((r) => {
      try { return [r.slug, spots.find((s) => s.slug === r.check(spots))]; }
      catch { return [r.slug, null]; }
    })
  );

  const sTier = REWARDS.filter((r) => S_TIER.has(r.slug));
  const aTier = REWARDS.filter((r) => !S_TIER.has(r.slug));

  return (
    <div className="pt-[92px]">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--gold-deep)] bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-full px-4 py-1.5">
            🏆 {REWARDS.length} badges live
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-[var(--ink)] tracking-tight mt-4">
            Rewards worth <span className="grad-gold">fighting for</span>
          </h1>
          <p className="text-[var(--ink-2)] mt-4 max-w-xl mx-auto">
            Badges, titles and eternal glory. Earned on the leaderboard — shown off everywhere.
          </p>
          <button onClick={onClaim} className="btn-gold px-8 py-3.5 mt-7">⚡ Start earning — claim your spot</button>
        </motion.div>
      </div>

      {/* ── S-tier spotlight ─────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-14">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display font-bold text-2xl text-[var(--ink)]">The crown jewels</h2>
          <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-[#3A2200] bg-gradient-to-r from-[#FFD97A] via-[#F5B301] to-[#FFD97A]">
            S-tier
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--gold)]/60 to-transparent" />
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {sTier.map((r, i) => (
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative rounded-[28px] p-[2px] bg-gradient-to-br from-[#FFE9A8] via-[#F5B301] to-[#B87700] shadow-[0_16px_48px_-16px_rgba(245,158,11,0.55)]"
            >
              <div className="card-lift relative overflow-hidden rounded-[26px] bg-[var(--surface)] p-7 h-full">
                <Shine />
                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--gold)]/15 blur-3xl rounded-full" />
                <div className="flex items-start justify-between">
                  <Flee>
                  <motion.div
                    className="text-7xl drop-shadow-lg"
                    animate={{ y: [0, -8, 0], rotate: [0, -4, 4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                  >
                    {r.icon}
                  </motion.div>
                  </Flee>
                  <TierBadge tier="S" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[var(--ink)] mt-5">{r.name}</h3>
                <p className="text-[var(--ink-2)] text-sm mt-2 mb-6">{r.desc}</p>
                <HolderRow holder={holders[r.slug]} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── A-tier grid ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-14">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display font-bold text-2xl text-[var(--ink)]">Battle honors</h2>
          <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/25">
            A-tier
          </span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aTier.map((r, i) => (
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              className="card-lift relative overflow-hidden rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <Flee><div className="text-5xl">{r.icon}</div></Flee>
                <TierBadge tier="A" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--ink)]">{r.name}</h3>
              <p className="text-[var(--ink-2)] text-sm mt-1 mb-4">{r.desc}</p>
              <HolderRow holder={holders[r.slug]} compact />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Spot perks (coming soon) ─────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <div className="relative overflow-hidden rounded-[32px] border border-[var(--blaze)]/30 bg-gradient-to-br from-[var(--blaze)]/[0.07] via-[var(--surface)] to-[var(--surface)] p-8 sm:p-10">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-[var(--blaze)]/15 blur-3xl rounded-full" />
          <div className="text-center relative">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/25 rounded-full px-4 py-1.5">
              🔜 Coming soon
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mt-3">Spot Perks</h2>
            <p className="text-[var(--ink-2)] mt-2 max-w-lg mx-auto">
              Purchasable upgrades to make your spot impossible to ignore. We're building the shop — get notified when it drops.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 relative">
            {PERKS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="card-lift relative overflow-hidden rounded-3xl bg-[var(--surface-2)] border border-[var(--line)] p-6 flex flex-col"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--blaze)]/10 blur-2xl rounded-full" />
                <div className="flex items-start justify-between">
                  <Flee><div className="text-5xl">{p.icon}</div></Flee>
                  <span className="text-xs font-bold text-[var(--ink-3)] bg-[var(--surface)] border border-[var(--line)] rounded-full px-3 py-1">
                    {p.price}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--ink)] mt-4">{p.name}</h3>
                <p className="text-[var(--ink-2)] text-sm mt-1.5 mb-5 flex-1">{p.desc}</p>
                <button
                  onClick={onClaim}
                  className="w-full py-2.5 rounded-2xl font-bold text-sm text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/30 hover:bg-[var(--blaze)]/20 transition-colors"
                >
                  🔔 Notify me
                </button>
              </motion.div>
            ))}
            <div className="rounded-3xl border-2 border-dashed border-[var(--line)] p-6 flex flex-col items-center justify-center text-center min-h-[220px]">
              <div className="text-4xl mb-3">🤫</div>
              <h3 className="font-display font-bold text-lg text-[var(--ink)]">More perks brewing</h3>
              <p className="text-[var(--ink-3)] text-sm mt-1.5">Secret upgrades the community votes for.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── How rewards unlock ───────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-14 mb-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] text-center">How rewards unlock</h2>
        <p className="text-[var(--ink-2)] text-center mt-2 mb-8">Four steps between you and eternal glory.</p>
        <div className="relative">
          <div className="absolute left-[27px] sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[var(--gold)] via-[var(--blaze)] to-[var(--green)] opacity-40 sm:-translate-x-1/2" aria-hidden />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, x: i % 2 ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              className={`relative flex gap-5 mb-6 last:mb-0 sm:w-1/2 ${i % 2 ? 'sm:ml-auto sm:pl-10' : 'sm:pr-10 sm:flex-row-reverse sm:text-right'}`}
            >
              <div className="relative z-10 shrink-0 w-14 h-14 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-[var(--shadow-card)] flex items-center justify-center text-2xl">
                {s.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-deep)] text-white text-[11px] font-black flex items-center justify-center">
                  {s.n}
                </span>
              </div>
              <div className={`bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 shadow-[var(--shadow-card)] flex-1 ${i % 2 ? '' : 'sm:text-right'}`}>
                <h3 className="font-display font-bold text-[var(--ink)] mb-1">{s.t}</h3>
                <p className="text-[var(--ink-2)] text-sm">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={onClaim} className="btn-gold px-8 py-3.5">⚡ Claim your spot — from $1</button>
        </div>
      </div>
    </div>
  );
}
