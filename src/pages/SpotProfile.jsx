import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { BrandAvatar, RankBadge } from '../components/SpotCard';
import ShareButtons from '../components/ShareButtons';
import CountUp from '../components/CountUp';
import { money, compact, timeAgo, copyText } from '../lib/format';
import { REWARDS } from '../lib/data';
import { recordClick, recordReferralClick, getReferralStats, refCodeFor } from '../lib/store';

function Sparkline({ data }) {
  if (!data || data.length < 2) return null;
  const w = 220, h = 56, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 6 - ((v - min) / (max - min || 1)) * (h - 12);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2BFF88" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2BFF88" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#spark)" />
      <polyline points={pts} fill="none" stroke="#2BFF88" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function SpotProfile({ spots, onClaim, onBoost }) {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const [copiedRef, setCopiedRef] = useState(false);
  const spot = spots.find((s) => s.slug === slug);

  useEffect(() => {
    const ref = params.get('ref');
    if (ref) recordReferralClick(ref);
  }, [params]);

  useEffect(() => {
    if (spot) document.title = `${spot.name} — #${spot.rank} on FlexSpot.LOL`;
    return () => { document.title = 'FlexSpot.LOL — Claim Your Spot On The Internet'; };
  }, [spot]);

  const myRef = useMemo(() => (spot ? refCodeFor(spot.slug) : ''), [spot]);
  const refStats = useMemo(() => getReferralStats(myRef), [myRef, spots]);
  const badges = useMemo(() => REWARDS.filter((r) => { try { return r.check(spots) === spot?.slug; } catch { return false; } }), [spots, spot]);
  const neighbors = useMemo(() => {
    if (!spot) return [];
    return spots.filter((s) => s.slug !== spot.slug).slice(0, 4);
  }, [spots, spot]);

  if (!spot) {
    return (
      <div className="pt-[68px] max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🕳️</div>
        <h1 className="font-display font-bold text-3xl text-snow">This spot is unclaimed</h1>
        <p className="text-mist mt-3">Nobody owns <b className="text-snow">/{slug}</b> yet. Take it before someone else does.</p>
        <button onClick={onClaim} className="btn-primary px-8 py-3.5 mt-6">⚡ Claim this spot — $1</button>
      </div>
    );
  }

  const visit = (url) => { recordClick(spot.slug); window.open(url, '_blank', 'noopener'); };
  const copyRef = async () => {
    const ok = await copyText(`${window.location.origin}/s/${spot.slug}?ref=${myRef}`);
    if (ok) { setCopiedRef(true); setTimeout(() => setCopiedRef(false), 1800); }
  };

  return (
    <div className="pt-[68px]">
      {/* cover */}
      <div className="relative overflow-hidden">
        <div className="blob w-[500px] h-[280px] bg-electric/30 -top-24 left-1/3" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8 relative">
          <Link to="/leaderboard" className="text-mist text-sm hover:text-snow">← Back to leaderboard</Link>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mt-6">
            <BrandAvatar spot={spot} size={96} ring={spot.rank === 1} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <RankBadge rank={spot.rank} size="lg" />
                <h1 className="font-display font-bold text-3xl sm:text-4xl text-snow">{spot.name}</h1>
                {spot.rank === 1 && <span className="text-3xl crown-bob">👑</span>}
              </div>
              <p className="text-mist mt-1.5 text-[15px]">{spot.tagline}</p>
              {badges.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {badges.map((b) => (
                    <span key={b.slug} className="text-xs font-bold bg-gold/15 border border-gold/40 text-gold rounded-full px-3 py-1">{b.icon} {b.name}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex sm:flex-col gap-2.5">
              <button onClick={() => onBoost(spot)} className="btn-primary px-6 py-3 text-sm flex-1 sm:flex-none">⚡ Boost this spot</button>
              {spot.website && <button onClick={() => visit(spot.website)} className="btn-ghost px-6 py-3 text-sm flex-1 sm:flex-none">Visit ↗</button>}
            </div>
          </div>
          {spot.gift?.from && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/40 p-4 sm:p-5 flex items-start gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <div className="font-bold text-snow text-sm">Surprise gift from {spot.gift.from}</div>
                {spot.gift.message && <p className="text-mist text-sm mt-1 leading-relaxed">“{spot.gift.message}”</p>}
              </div>
            </motion.div>
          )}
          {(spot.move || 0) > 0 && (
            <div className="mt-4 rounded-2xl bg-neon/10 border border-neon/30 p-4 flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <p className="text-sm text-snow font-semibold">
                Climbed {spot.move} spot{spot.move > 1 ? 's' : ''} recently — momentum is on your side. Keep it going.
              </p>
            </div>
          )}
          {(spot.move || 0) < 0 && (
            <div className="mt-4 rounded-2xl bg-red-500/10 border border-red-500/30 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">😬</span>
                <p className="text-sm text-snow font-semibold">
                  Someone just passed you — slipped {Math.abs(spot.move)} spot{spot.move < -1 ? 's' : ''}. A small boost takes it back.
                </p>
              </div>
              <button onClick={() => onBoost(spot)} className="btn-primary px-4 py-2 text-xs shrink-0">⚡ Fight back</button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-5 pb-4">
        {/* main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: 'Total support', v: money(spot.amount), c: 'text-neon' },
              { l: 'Views', v: compact(spot.views), c: 'text-snow' },
              { l: 'Outbound clicks', v: compact(spot.clicks), c: 'text-snow' },
              { l: 'Claimed', v: timeAgo(spot.joinedAt), c: 'text-snow' },
            ].map((s) => (
              <div key={s.l} className="bg-card border border-line/5 rounded-2xl p-4">
                <div className={`font-display font-bold text-xl ${s.c}`}><CountUp to={parseFloat(String(s.v).replace(/[^0-9.]/g, '')) || 0} format={() => s.v} /></div>
                <div className="text-[11px] text-mist uppercase tracking-wider font-semibold mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-line/5 rounded-3xl p-6">
            <h2 className="font-display font-bold text-lg text-snow mb-2">About</h2>
            <p className="text-mist text-sm leading-relaxed">{spot.description || spot.tagline}</p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {spot.website && <button onClick={() => visit(spot.website)} className="btn-ghost px-4 py-2 text-xs">🌐 Website</button>}
              {spot.socials?.x && <button onClick={() => visit(spot.socials.x)} className="btn-ghost px-4 py-2 text-xs">𝕏 Twitter</button>}
              {spot.socials?.instagram && <button onClick={() => visit(spot.socials.instagram)} className="btn-ghost px-4 py-2 text-xs">📸 Instagram</button>}
            </div>
          </div>

          <div className="bg-card border border-line/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-bold text-lg text-snow">Support momentum</h2>
              <span className="text-xs font-bold text-neon">▲ climbing</span>
            </div>
            <Sparkline data={spot.trend && spot.trend.length > 1 ? spot.trend : [spot.amount * 0.6, spot.amount * 0.8, spot.amount]} />
            <p className="text-xs text-mist mt-2">Last 7 days of verified support for this spot.</p>
          </div>

          <div className="bg-card border border-line/5 rounded-3xl p-6">
            <h2 className="font-display font-bold text-lg text-snow mb-1">📣 Help {spot.name} reach #1</h2>
            <p className="text-mist text-sm mb-4">Share this page — every visit and boost pushes them higher.</p>
            <ShareButtons spot={spot} />
          </div>

          {/* referral */}
          <div className="rounded-3xl bg-gradient-to-br from-electric/15 to-card border border-electric/25 p-6">
            <h2 className="font-display font-bold text-lg text-snow mb-1">🔗 Your referral hub</h2>
            <p className="text-mist text-sm mb-4">Invite friends with your link. Joins through your code grow your referral stats and unlock rewards.</p>
            <button onClick={copyRef} className="w-full font-mono text-sm bg-ink/60 border border-line/10 rounded-xl px-4 py-3 text-electric hover:border-electric/50 transition-colors break-all">
              {window.location.origin}/s/{spot.slug}?ref={myRef}
            </button>
            <div className="text-xs text-mist mt-2 mb-4">{copiedRef ? '✓ Referral link copied!' : 'Tap to copy your referral link'}</div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: 'Link clicks', v: refStats.clicks },
                { l: 'Friends joined', v: refStats.joined },
                { l: 'Rank right now', v: '#' + spot.rank },
              ].map((s) => (
                <div key={s.l} className="bg-ink/50 rounded-2xl p-3 text-center">
                  <div className="font-display font-bold text-xl text-snow">{s.v}</div>
                  <div className="text-[10px] text-mist uppercase tracking-wider font-semibold mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* side */}
        <div className="space-y-5">
          <div className="rounded-3xl bg-gold/[0.06] border border-gold/25 p-6 text-center">
            <div className="text-4xl mb-2">👑</div>
            <h3 className="font-display font-bold text-snow">Want the crown?</h3>
            <p className="text-mist text-sm mt-1 mb-4">Claim your own spot and challenge #{spot.rank}.</p>
            <button onClick={onClaim} className="btn-gold w-full py-3 text-sm">⚡ Claim your spot</button>
          </div>
          <div className="bg-card border border-line/5 rounded-3xl p-5">
            <h3 className="font-display font-bold text-snow mb-3">🔥 Also trending</h3>
            <div className="space-y-2">
              {neighbors.map((n) => (
                <Link key={n.slug} to={`/s/${n.slug}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-line/5 transition-colors">
                  <RankBadge rank={n.rank} />
                  <BrandAvatar spot={n} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-snow truncate">{n.name}</div>
                    <div className="text-[11px] text-mist">{money(n.amount)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
