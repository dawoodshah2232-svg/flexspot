import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SpotRow, useRaceCycle } from '../components/SpotCard';
import Flee from '../components/Flee';
import Podium from '../components/Podium';
import DramaTicker from '../components/DramaTicker';
import ClaimStrip from '../components/ClaimStrip';
import { money, compact } from '../lib/format';

const PAGE = 20;

export default function LeaderboardPage({ spots, moves, onBoost, onClaim }) {
  const [q, setQ] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE);
  const [showJump, setShowJump] = useState(false);
  const [jumpPending, setJumpPending] = useState(false);
  const sentinelRef = useRef(null);
  const bottomRef = useRef(null);
  const { race, count } = useRaceCycle();
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return spots;
    return spots.filter((s) => s.name.toLowerCase().includes(query) || s.tagline.toLowerCase().includes(query));
  }, [spots, q]);

  const top3 = filtered.slice(0, 3).map((s) => ({ ...s, move: moves[s.slug] ?? s.move }));
  const rest = filtered.slice(3);
  const visibleRows = rest.slice(0, visibleCount);

  // infinite scroll: reset to the first page when the search query changes
  useEffect(() => { setVisibleCount(PAGE); }, [q]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || rest.length === 0) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((c) => (c < rest.length ? Math.min(c + PAGE, rest.length) : c));
        }
      },
      { rootMargin: '500px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rest.length]);

  // jump-to-bottom button visibility
  useEffect(() => {
    const onScroll = () => setShowJump(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jumpToBottom = () => {
    setVisibleCount(rest.length);
    setJumpPending(true);
  };
  useEffect(() => {
    if (!jumpPending) return;
    const raf = requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
    setJumpPending(false);
    return () => cancelAnimationFrame(raf);
  }, [jumpPending, visibleCount]);

  // rows interleaved with a claim strip after every 30th row
  const cells = [];
  visibleRows.forEach((s, i) => {
    const above = i === 0 ? top3[top3.length - 1] : visibleRows[i - 1];
    cells.push(
      <SpotRow
        key={s.slug}
        spot={s}
        move={moves[s.slug] ?? s.move}
        highlight
        onBoost={onBoost}
        race={race}
        count={count}
        overtake={above ? { amount: above.amount, rank: above.rank } : null}
      />
    );
    if ((i + 1) % 30 === 0) cells.push(<ClaimStrip key={`claim-${s.slug}`} onClaim={onClaim} />);
  });

  return (
    <div className="pt-[92px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--line)] rounded-full px-4 py-1.5 text-xs font-bold text-[var(--ink-2)] mb-5 shadow-[var(--shadow-card)]">
            <span className="live-dot" /> Updated live — every boost re-ranks instantly
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[var(--ink)] tracking-tight">The <span className="grad-gold">Leaderboard</span></h1>
          <p className="text-[var(--ink-2)] mt-4">The most competitive page on the internet. More buzz = higher spot. Where do you rank?</p>
          <div className="flex justify-center mt-4 max-w-md mx-auto"><DramaTicker className="w-full" /></div>
          {/* live stat strip */}
          <div className="grid grid-cols-3 gap-2.5 mt-6 max-w-md mx-auto">
            {[
              { icon: '💰', v: money(spots.reduce((a, s) => a + s.amount, 0)), l: 'total buzz' },
              { icon: '⚡', v: String(spots.length), l: 'spots competing' },
              { icon: '👁️', v: compact(spots.reduce((a, s) => a + (s.views || 0), 0)), l: 'profile views' },
            ].map((st) => (
              <div key={st.l} className="rounded-2xl bg-[var(--surface)] border border-[var(--line)] px-3 py-3 shadow-[var(--shadow-card)]">
                <Flee><div className="text-lg leading-none mb-1">{st.icon}</div></Flee>
                <div className="font-display font-extrabold text-base sm:text-lg text-[var(--ink)] leading-tight truncate">{st.v}</div>
                <div className="text-[10px] font-bold text-[var(--ink-3)] uppercase tracking-wider">{st.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
            <button onClick={onClaim} className="btn-primary px-8 py-3.5">⚡ Claim Your Spot — $1</button>
          </div>
          <div className="relative max-w-md mx-auto mt-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mist">🔍</span>
            <input
              className="field py-3.5 rounded-2xl"
              style={{ paddingLeft: '2.75rem' }}
              placeholder="Search brands, creators, startups…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        {/* podium */}
        {top3.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-2">
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--gold-deep)] bg-[var(--gold-soft)] border border-[var(--gold)]/30 rounded-full px-4 py-1.5">
                👑 The podium — top 3 take the glory
              </span>
            </div>
            <Podium spots={top3} onBoost={onBoost} />
          </div>
        )}

        {/* rest of board */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-2xl text-snow">All spots <span className="text-mist text-base font-sans font-medium">({filtered.length} competing)</span></h2>
            <span className="text-xs text-mist font-semibold">Total buzz: <b className="text-[var(--blaze)]">{money(spots.reduce((a, s) => a + s.amount, 0))}</b></span>
          </div>
          <p className="hidden md:block text-[11px] text-mist mt-1 mb-2" aria-hidden="true">
            🎯 Psst — the racers are shy. Try catching one with your cursor.
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-mist">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold text-snow">No spots match "{q}"</p>
              <p className="text-sm mt-1">Be the first with that name — claim it now.</p>
              <button onClick={onClaim} className="btn-primary px-6 py-3 mt-5 text-sm">⚡ Claim "{q}"</button>
            </div>
          ) : (
            <motion.div layout className="space-y-2.5">
              {cells}
              {visibleCount < rest.length && (
                <div className="card p-4 flex items-center gap-3 animate-pulse" aria-hidden="true">
                  <div className="w-9 h-9 rounded-xl bg-[var(--line)] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="h-3 rounded-full bg-[var(--line)] w-1/3 mb-2" />
                    <div className="h-2 rounded-full bg-[var(--line)] w-1/2" />
                  </div>
                  <div className="text-xs font-bold text-[var(--ink-3)] whitespace-nowrap">✨ Loading more spots…</div>
                </div>
              )}
              <div ref={sentinelRef} aria-hidden="true" />
              <div ref={bottomRef} aria-hidden="true" />
            </motion.div>
          )}
        </div>

        <div className="mt-12 relative overflow-hidden rounded-[32px] p-8 sm:p-10 text-center text-white shadow-[var(--shadow-blaze)]"
          style={{ background: 'radial-gradient(900px 380px at 50% -10%, #7C3AED 0%, #4C1D95 50%, #1E1B4B 100%)' }}>
          <div className="absolute -top-16 left-1/4 w-64 h-64 bg-[#F59E0B]/25 rounded-full blur-3xl" aria-hidden="true" />
          <div className="relative">
            <Flee><div className="text-5xl mb-3 anim-floaty">👑</div></Flee>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl">Not on the board yet?</h3>
            <p className="text-white/80 text-sm mt-2 max-w-md mx-auto">The top 10 gets 80% of all clicks. Your spot is one claim away — from just $1.</p>
            <button onClick={onClaim} className="btn-gold px-8 py-3.5 mt-6 font-extrabold">⚡ Claim My Spot From $1</button>
          </div>
        </div>

        {/* jump to the last spot */}
        <button
          onClick={jumpToBottom}
          aria-label="Jump to the last spot"
          title="Jump to the last spot"
          className={`fixed z-50 bottom-20 sm:bottom-8 right-4 sm:right-6 rounded-full pl-4 pr-5 py-3 font-display font-extrabold text-sm text-[var(--gold-deep)] dark:text-[#FCD34D] bg-[var(--surface)]/90 backdrop-blur-xl border border-[var(--gold)]/50 shadow-[0_8px_30px_rgba(245,158,11,0.25)] transition-all duration-300 hover:border-[var(--gold)] active:scale-95 ${showJump ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
          ↓ {filtered.length}
        </button>
      </div>
    </div>
  );
}
