import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp from '../components/CountUp';
import DramaTicker from '../components/DramaTicker';
import Podium from '../components/Podium';
import Floaties from '../components/Floaties';
import { SpotRow, BrandAvatar, useRaceCycle } from '../components/SpotCard';
import Flee from '../components/Flee';
import Sway from '../components/Sway';
import TopReferrers from '../components/TopReferrers';
import { compact, money } from '../lib/format';
import { LIVE_FEED_POOL, IS_PREVIEW_DATA } from '../lib/data';
import { IS_LIVE } from '../lib/store';

/* ---------------- Floating live-stats pill ---------------- */
// Total volume is REAL: $1,603 seed base + every actual claim/boost on the board.
// Brands live is REAL: the actual spot count. Online-now stays a simulated ambient ticker.
const VOLUME_BASE = 1603;

function LiveStatsPill({ viewers, totalVolume, brandCount }) {
  const stats = [
    { icon: '🟢', value: <CountUp to={viewers ?? 0} format={(n) => Math.round(n).toString()} />, label: 'online now' },
    { icon: '💰', value: <>{money(totalVolume)}</>, label: 'total volume' },
    { icon: '⚡', value: <CountUp to={brandCount} format={(n) => Math.round(n).toString()} />, label: 'brands live' },
  ];
  return (
    <div className="flex flex-col items-center px-4">
      <p className="text-center text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--ink-3)] mb-3">
        Real brands. Real bids. Live now.
      </p>
      <div className="inline-flex flex-wrap justify-center items-center gap-x-5 gap-y-2 sm:gap-8 bg-[var(--surface)]/90 backdrop-blur border border-[var(--line)] rounded-3xl min-[420px]:rounded-full px-4 min-[420px]:pl-5 min-[420px]:pr-6 sm:pl-6 sm:pr-8 py-2.5 shadow-[var(--shadow-card)] max-w-full">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2.5">
            {i > 0 && <span className="w-px h-6 bg-[var(--line)] -ml-2.5 sm:-ml-4" aria-hidden="true" />}
            <Flee><span className="text-base block">{s.icon}</span></Flee>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-[15px] text-[var(--ink)]">{s.value}</div>
              <div className="text-[10px] font-semibold text-[var(--ink-3)] uppercase tracking-wider">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Viral feed ticker ---------------- */
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
          className="text-[var(--ink-2)]"
        >
          <b className="text-[var(--ink)]">{name}</b> {action}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Hero right visual: the Champion's Stage ---------------- */
const HERO_KING = `${import.meta.env.BASE_URL}hero-king.jpg`;

function ChampionStage({ leader, onClaim }) {
  return (
    <div className="relative rounded-[32px] overflow-hidden champion-stage shadow-[var(--shadow-lift)]">
      {/* rotating light rays */}
      <div className="stage-rays" aria-hidden="true" />
      {/* rising gold particles */}
      <div className="stage-particles" aria-hidden="true">
        {['12%', '32%', '58%', '76%', '88%'].map((left, i) => (
          <span key={i} className="stage-particle" style={{ left, animationDelay: `${-i * 1.7}s`, animationDuration: `${5 + i}s` }} />
        ))}
      </div>

      {/* the frog king on his throne */}
      <div className="relative">
        <img
          src={HERO_KING}
          alt="The FlexSpot frog king defending his golden throne"
          className="w-full h-52 min-[420px]:h-60 sm:h-72 object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" aria-hidden="true" />
        {/* dancing hype-man cutout — top-right of the banner, next to the frog king.
            Grooves slowly (rotate + left/right sway) when the cursor comes near,
            then eases back to his exact spot. Bigger + trending sticker. */}
        <div className="hero-dancer-wrap absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 pointer-events-none flex flex-col items-center">
          <Sway>
            <span className="flex flex-col items-center">
              <span className="mb-1 inline-flex items-center gap-1 bg-[#12B76A]/25 backdrop-blur border border-[#12B76A]/50 rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-extrabold text-[#34D399] uppercase tracking-wider shadow-[0_4px_14px_-4px_rgba(18,183,106,0.8)]">
                ▲ trending now
              </span>
              <img
                src={`${import.meta.env.BASE_URL}hero-dancer.webp`}
                alt=""
                aria-hidden="true"
                className="hero-dancer w-20 min-[420px]:w-24 sm:w-28 lg:w-32 drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]"
                loading="eager"
              />
            </span>
          </Sway>
        </div>
        {/* champion ribbon — top-left of the photo */}
        <div className="absolute top-4 left-4">
          <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-md text-[#FBBF24] border border-[#F59E0B]/60 font-black text-[11px] sm:text-xs uppercase tracking-[0.2em] rounded-full px-5 py-2 shadow-[0_8px_24px_-6px_rgba(245,158,11,0.7)]">
            <span>👑</span> Reigning champion <span>👑</span>
          </div>
        </div>
        {/* floating chips over the photo */}
        <div className="absolute bottom-3.5 left-4 bg-white/10 backdrop-blur border border-white/25 rounded-2xl px-3 py-2 text-center anim-floaty">
          <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider">#1 spot</div>
          <div className="text-sm font-extrabold text-white truncate max-w-[130px]">{leader?.name ?? '—'}</div>
        </div>
        <div className="absolute bottom-3.5 right-4 bg-[#12B76A]/20 backdrop-blur border border-[#12B76A]/40 rounded-2xl px-3 py-2 text-center anim-floaty" style={{ animationDelay: '-0.6s' }}>
          <div className="text-xs font-extrabold text-[#34D399]">▲ trending</div>
          <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider">right now</div>
        </div>
      </div>

      <div className="relative p-6 sm:p-8 pt-5 pb-14 sm:pb-16">
        {/* the champion brand card */}
        {leader && (
          <Link to={`/s/${leader.slug}`} className="group relative block rounded-3xl border-2 border-[#FBBF24] bg-gradient-to-br from-[#7C3AED]/30 via-white/[0.07] to-[#F59E0B]/20 backdrop-blur-md p-4 sm:p-5 overflow-hidden hover:border-[#FCD34D] transition-colors shadow-[0_0_44px_-8px_rgba(251,191,36,0.55)]">
            <div className="podium-shine" aria-hidden="true" />
            <div className="flex items-center gap-4">
              <BrandAvatar spot={leader} size={64} ring />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FCD34D]">Champion of the internet</div>
                <div className="font-display font-extrabold text-xl sm:text-2xl text-white truncate group-hover:underline">{leader.name}</div>
                <div className="text-sm text-white/60 truncate">{leader.tagline}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-display font-black text-2xl sm:text-3xl text-[#FCD34D]">{money(leader.amount)}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">spot value</div>
                <div className="text-xs font-bold text-white/70 mt-1">👁 {compact(leader.views)} views</div>
              </div>
            </div>
          </Link>
        )}

        {/* dethrone CTA */}
        <button onClick={onClaim} className="btn-gold w-full py-4 mt-4 text-base font-extrabold">
          <span aria-hidden="true">⚔️</span> <span className="shine-text-btn">Steal the crown — from just $1</span>
        </button>
        <p className="text-center text-white/50 text-xs mt-2.5">One dollar more than the champ takes their throne.</p>
      </div>
    </div>
  );
}

/* ---------------- Hero right visual ---------------- */
function HeroVisual({ leader, onClaim }) {
  return (
    <div className="relative">
      <ChampionStage leader={leader} onClaim={onClaim} />
      {/* claim card overlapping the bottom edge */}
      <div className="relative z-10 -mt-10 mx-4 sm:mx-10 bg-[var(--surface)]/95 backdrop-blur border border-[var(--line)] rounded-3xl shadow-[var(--shadow-lift)] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink-3)]">Manual approval · crypto only</div>
            <div className="font-display font-extrabold text-lg text-[var(--ink)] mt-0.5"><span className="sheen-light">Claim Your Spot From $1</span></div>
          </div>
          <Flee><span className="text-3xl shrink-0 block">🎟️</span></Flee>
        </div>
        <ul className="text-[13px] text-[var(--ink-2)] mt-3 grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          <li className="flex items-center gap-2"><span className="text-[#12B76A]">✓</span> Name, pic & story</li>
          <li className="flex items-center gap-2"><span className="text-[#12B76A]">✓</span> USDT payment proof</li>
          <li className="flex items-center gap-2"><span className="text-[#12B76A]">✓</span> Live after approval</li>
        </ul>
        <button onClick={onClaim} className="btn-primary w-full py-3 mt-4 text-sm">
          Start From $1 →
        </button>
      </div>
    </div>
  );
}

/* ---------------- Leaderboard section (mirrors /leaderboard) ---------------- */
const TABS = [
  { id: 'all', label: 'All Brands' },
  { id: 'gainers', label: 'Top Gainers' },
  { id: 'newest', label: 'Newest' },
];

function LeaderboardSection({ spots, onBoost, onClaim }) {
  const [tab, setTab] = useState('all');
  const { race, count } = useRaceCycle();
  const ordered = useMemo(() => {
    const list = [...spots];
    if (tab === 'gainers') list.sort((a, b) => (b.move || 0) - (a.move || 0));
    else if (tab === 'newest') list.sort((a, b) => (b.joinedAt || 0) - (a.joinedAt || 0));
    else list.sort((a, b) => b.amount - a.amount || (a.joinedAt || 0) - (b.joinedAt || 0));
    return list;
  }, [spots, tab]);
  const ranked = ordered.map((s, i) => ({ ...s, rank: i + 1, displayRank: i + 1 }));

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <Floaties
        items={[
          { emoji: '🏁', left: '1%', top: '6%', size: 30, cls: 'hidden lg:block', opacity: 0.5 },
          { emoji: '🐇', left: '96%', top: '12%', size: 28, cls: 'hidden lg:block', opacity: 0.5 },
          { emoji: '🐢', left: '2%', top: '48%', size: 30, cls: 'hidden lg:block', opacity: 0.45 },
          { emoji: '⚡', left: '95%', top: '58%', size: 26, cls: 'hidden lg:block', opacity: 0.45 },
          { emoji: '🍿', left: '3%', top: '86%', size: 26, cls: 'hidden lg:block', opacity: 0.4 },
          { emoji: '🥇', left: '94%', top: '88%', size: 28, cls: 'hidden lg:block', opacity: 0.4 },
        ]}
      />
      <div className="text-center mb-8 relative">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]">🏆 Live Leaderboard</h2>
        <p className="text-[var(--ink-2)] mt-2 flex items-center justify-center gap-2 text-sm">
          <span className="live-dot" /> Updates every few seconds · highest amount wins · ties go to whoever got there first
        </p>
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                tab === t.id
                  ? 'bg-[var(--ink)] text-[var(--bg)] shadow-[var(--shadow-card)]'
                  : 'bg-[var(--surface)] text-[var(--ink-2)] border border-[var(--line)] hover:border-[var(--ink-3)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <Podium spots={ranked.slice(0, 3)} onBoost={onBoost} />

      {/* ranks 4–10 — same row design as the leaderboard page */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-display font-bold text-xl text-[var(--ink)]">🔥 The chase pack</span>
          <Link to="/leaderboard" className="text-sm font-bold text-[var(--blaze)] hover:underline">Full board →</Link>
        </div>
        <p className="hidden md:block text-[11px] text-[var(--ink-3)] px-1 mb-2" aria-hidden="true">
          🎯 Psst — the racers are shy. Try catching one with your cursor.
        </p>
        <div className="space-y-2.5">
          <AnimatePresence initial={false}>
            {ranked.slice(3, 10).map((s) => (
              <SpotRow key={s.slug} spot={s} move={s.move} onBoost={onBoost} race={race} count={count} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="text-center mt-8">
        <button onClick={onClaim} className="btn-primary px-8 py-4 text-base">
          ⚡ Only $1 away from the board — claim yours
        </button>
      </div>
    </section>
  );
}

/* ---------------- Footer statistics — reworked ---------------- */
function FooterStats() {
  const items = [
    { icon: '👥', chip: 'bg-[var(--blaze-soft)]', num: 89, suffix: 'K', decimals: 0, label: 'all-time visitors' },
    { icon: '👁️', chip: 'bg-[var(--blue-soft)]', num: 4.2, suffix: 'M', decimals: 1, label: 'profile views' },
    { icon: '⚡', chip: 'bg-[var(--gold-soft)]', num: 100, suffix: '+', decimals: 0, label: 'brands featured' },
    { icon: '🌎', chip: 'bg-[var(--green-soft)]', text: 'Global', label: 'community worldwide' },
  ];
  return (
    <section className="border-y border-[var(--line-soft)] bg-[var(--surface-2)]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((it) => (
          <div
            key={it.label}
            className="card card-lift rounded-3xl p-5 flex items-center gap-4"
          >
            <span className={`grid place-items-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl text-2xl sm:text-[28px] shrink-0 ${it.chip}`} style={{ width: 56, height: 56 }}>
              {it.icon}
            </span>
            <div className="leading-tight min-w-0">
              <div className="font-display font-black text-[26px] sm:text-3xl text-[var(--ink)] tracking-tight">
                {it.text ?? (
                  <CountUp to={it.num} format={(n) => n.toFixed(it.decimals)} />
                )}
                {!it.text && <span className="grad-text">{it.suffix}</span>}
              </div>
              <div className="text-[11px] font-bold text-[var(--ink-3)] uppercase tracking-[0.12em] mt-0.5">{it.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const BENEFITS = [
  { icon: '⚡', label: 'Live Leaderboard' },
  { icon: '👥', label: 'Real People' },
  { icon: '📊', label: 'Brand Exposure' },
  { icon: '🌎', label: 'Open To Everyone' },
];

export default function Home({ spots, onClaim, onBoost, viewers }) {
  const totalVolume = useMemo(() => VOLUME_BASE + spots.reduce((a, s) => a + s.amount, 0), [spots]);
  const leader = useMemo(() => [...spots].sort((a, b) => b.amount - a.amount || (a.joinedAt || 0) - (b.joinedAt || 0))[0], [spots]);

  return (
    <div className="pt-[92px]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Floaties
          items={[
            { emoji: '🚀', left: '2%', top: '12%', size: 30, cls: 'hidden lg:block' },
            { emoji: '💰', left: '94%', top: '8%', size: 26, cls: 'hidden lg:block', opacity: 0.45 },
            { emoji: '🔥', left: '46%', top: '4%', size: 24, opacity: 0.4 },
            { emoji: '👑', left: '90%', top: '72%', size: 30, cls: 'hidden lg:block', opacity: 0.4 },
            { emoji: '😂', left: '3%', top: '78%', size: 26, cls: 'hidden lg:block', opacity: 0.35 },
            { emoji: '💎', left: '52%', top: '88%', size: 22, opacity: 0.4 },
          ]}
        />
        <div className="blob w-[420px] h-[420px] bg-[#F59E0B]/15 -top-20 -left-32" />
        <div className="blob w-[380px] h-[380px] bg-[#F59E0B]/15 top-40 right-[-120px]" style={{ animationDelay: '-6s' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--line)] rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[var(--ink-2)] mb-5 shadow-[var(--shadow-card)]">
              <span className="live-dot" /> BRANDS COMPETE. THE INTERNET WINS.
            </div>
            <h1 className="font-display font-extrabold text-[38px] min-[400px]:text-[44px] sm:text-6xl lg:text-[72px] leading-[1.02] tracking-tight text-balance">
              <span className="block sheen-light pb-1">BIG BRAND VISIBILITY.</span>
              <span className="block grad-text-anim pb-2">START FROM JUST $1.</span>
            </h1>
            <p className="text-[var(--ink-2)] text-base sm:text-lg mt-4 max-w-lg leading-relaxed">
              Anyone can boost any brand with <b className="text-[var(--ink)]">$1</b> — your name lands on their page,
              and the highest total takes the crown. 👑
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <button onClick={onClaim} className="btn-primary px-8 py-4 text-base">
                Start From $1 →
              </button>
              <Link to="/how-it-works" className="btn-ghost px-8 py-4 text-base text-center">
                How It Works
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7 max-w-lg">
              {BENEFITS.map((b) => (
                <div key={b.label} className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--line)] rounded-2xl px-3 py-2.5 shadow-[var(--shadow-card)]">
                  <Flee><span className="text-xl block">{b.icon}</span></Flee>
                  <span className="text-xs font-bold text-[var(--ink)] leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 max-w-md space-y-3">
              <DramaTicker />
              <FeedTicker />
              {IS_PREVIEW_DATA && (
                <p className="text-[11px] text-[var(--ink-3)]">Preview data — demo brands shown for illustration only.</p>
              )}
            </div>
          </div>
          <div className="pb-2">
            <HeroVisual leader={leader} onClaim={onClaim} />
          </div>
        </div>
      </section>

      {/* live stats — between hero and leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 pb-2">
        <LiveStatsPill viewers={viewers} totalVolume={totalVolume} brandCount={spots.length} />
      </div>

      <LeaderboardSection spots={spots} onBoost={onBoost} onClaim={onClaim} />

      <TopReferrers spots={spots} />

      <FooterStats />

      {/* HOW IT WORKS TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]">
            From unknown to <span className="grad-text">unmissable.</span>
          </h2>
          <p className="text-[var(--ink-2)] mt-3 max-w-xl mx-auto">
            Anyone can claim a public spotlight on FlexSpot. Four steps and your brand is on the board.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '👁️', tint: 'from-[#7C3AED] to-[#4F46E5]', t: 'More Visibility', d: 'Your brand sits on a public leaderboard the internet actually watches.' },
            { icon: '🚀', tint: 'from-[#2E7CF6] to-[#1B5FD0]', t: 'More Traffic', d: 'Real visitors click through to your website every day.' },
            { icon: '🤝', tint: 'from-[#12B76A] to-[#0E9F5D]', t: 'Community Support', d: 'Fans and customers boost the brands they love up the ranks.' },
            { icon: '🏆', tint: 'from-[#F59E0B] to-[#D97706]', t: 'Public Recognition', d: 'Winners get the crown, the spotlight, and the bragging rights.' },
          ].map((s) => (
            <div key={s.t} className="card card-lift p-6 text-center">
              <div className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br ${s.tint} grid place-items-center text-[28px] shadow-[var(--shadow-lift)] mb-4`}>
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--ink)]">{s.t}</h3>
              <p className="text-sm text-[var(--ink-2)] mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button onClick={onClaim} className="btn-primary px-8 py-4 text-base">
            Start From $1 →
          </button>
        </div>
      </section>

      {/* CTA BAND — premium dark */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-[32px] p-8 sm:p-14 text-center text-white shadow-[var(--shadow-blaze)]"
          style={{
            background: 'radial-gradient(1200px 500px at 50% -10%, #7C3AED 0%, #4C1D95 45%, #1E1B4B 100%)',
          }}>
          <div className="absolute inset-0 opacity-[0.15]" aria-hidden="true"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
          <div className="absolute -top-24 left-1/4 w-72 h-72 bg-[#F59E0B]/25 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-[#7C3AED]/40 rounded-full blur-3xl" aria-hidden="true" />
          <div className="relative">
            <Flee className="absolute left-[8%] top-6 hidden sm:block"><span className="anim-floaty block text-4xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]">✨</span></Flee>
            <Flee className="absolute right-[10%] top-16 hidden sm:block"><span className="anim-floaty block text-4xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]" style={{ animationDelay: '-1.4s' }}>👑</span></Flee>
            <Flee className="absolute left-[14%] bottom-16 hidden sm:block"><span className="anim-floaty block text-4xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]" style={{ animationDelay: '-2.2s' }}>⚡</span></Flee>
            <Flee className="absolute right-[7%] bottom-8 hidden sm:block"><span className="anim-floaty block text-4xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]" style={{ animationDelay: '-0.8s' }}>✨</span></Flee>
            <div className="relative inline-block mb-5">
              <div className="absolute -inset-5 bg-[#F59E0B]/40 blur-2xl rounded-full" aria-hidden="true" />
              <Flee><div className="relative text-7xl sm:text-8xl anim-floaty drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">👑</div></Flee>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-[#FCD34D] mb-5">
              <span className="live-dot" /> THE #1 SPOT IS UP FOR GRABS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight">
              The crown is waiting.<br /><span className="shine-text">Take the spotlight.</span>
            </h2>
            <p className="text-white/85 mt-4 max-w-lg mx-auto">
              Every day, thousands of visitors browse the FlexSpot leaderboard. Your brand could be the one they remember.
            </p>
            <button onClick={onClaim} className="btn-gold mt-8 px-10 py-4 rounded-full text-base font-extrabold shadow-[var(--shadow-gold)] hover:-translate-y-0.5 transition-transform">
              ⚡ Claim Your Spot From $1
            </button>
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-5 text-[11px] font-bold text-white/70 uppercase tracking-wider flex-wrap">
              <span>✓ No account needed</span>
              <span>✓ USDT · from $1</span>
              <span>✓ Live after approval</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
