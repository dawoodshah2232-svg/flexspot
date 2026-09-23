import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BrandAvatar, RankBadge } from '../components/SpotCard';
import { money, compact } from '../lib/format';
import { displayAmount } from '../lib/display';
import { categoryOf, categoryMeta } from '../lib/data';
import { trackEvent } from '../lib/analytics';

const LS_COMPARE = 'flexspot_compare_v1';
const MAX_COMPARE = 3;

function Sparkline({ data, slug }) {
  if (!data || data.length < 2) return <div className="h-14 grid place-items-center text-[11px] text-[var(--ink-3)]">no trend data</div>;
  const w = 220, h = 56, max = Math.max(...data), min = Math.min(...data);
  const gid = `cspark-${slug}`;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 6 - ((v - min) / (max - min || 1)) * (h - 12);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14" role="img" aria-label="7-day trend">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2BFF88" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2BFF88" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${gid})`} />
      <polyline points={pts} fill="none" stroke="#2BFF88" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const metrics = (spot) => {
  const trend = spot.trend || [];
  const momentum = trend.length >= 2 && trend[0] > 0
    ? ((trend[trend.length - 1] - trend[0]) / trend[0]) * 100
    : 0;
  const days = Math.max(1, Math.round((Date.now() - new Date(spot.joinedAt).getTime()) / 86400000));
  const ctr = spot.views > 0 ? (spot.clicks / spot.views) * 100 : 0;
  return { momentum, days, ctr };
};

// metric key -> { label, format(spot), wins: 'high'|'low'|null }
const METRICS = [
  { key: 'rank', label: 'Leaderboard rank', fmt: (s) => `#${s.rank}`, wins: 'low' },
  { key: 'amount', label: 'Total boosts', fmt: (s) => money(displayAmount(s)), wins: 'high' },
  { key: 'views', label: 'Profile views', fmt: (s) => compact(s.views || 0), wins: 'high' },
  { key: 'clicks', label: 'Outbound clicks', fmt: (s) => compact(s.clicks || 0), wins: 'high' },
  { key: 'ctr', label: 'Click-through rate', fmt: (s) => `${metrics(s).ctr.toFixed(1)}%`, wins: 'high' },
  { key: 'momentum', label: '7-day momentum', fmt: (s) => `${metrics(s).momentum >= 0 ? '+' : ''}${metrics(s).momentum.toFixed(0)}%`, wins: 'high' },
  { key: 'days', label: 'Days on the board', fmt: (s) => `${metrics(s).days}d`, wins: null },
  { key: 'category', label: 'Category', fmt: (s) => `${categoryMeta(categoryOf(s)).icon} ${categoryMeta(categoryOf(s)).name}`, wins: null },
];

const metricValue = (key, s) => {
  switch (key) {
    case 'rank': return s.rank;
    case 'amount': return s.amount || 0;
    case 'views': return s.views || 0;
    case 'clicks': return s.clicks || 0;
    case 'ctr': return metrics(s).ctr;
    case 'momentum': return metrics(s).momentum;
    default: return 0;
  }
};

export default function ComparePage({ spots }) {
  const [params, setParams] = useSearchParams();
  const [pickerQ, setPickerQ] = useState('');
  const [copied, setCopied] = useState(false);

  // URL is the source of truth when present; otherwise restore last session.
  const selected = useMemo(() => {
    const fromUrl = (params.get('spots') || '').split(',').map((s) => s.trim()).filter(Boolean);
    if (fromUrl.length) return fromUrl.slice(0, MAX_COMPARE);
    try {
      const saved = JSON.parse(localStorage.getItem(LS_COMPARE) || '[]');
      return Array.isArray(saved) ? saved.filter((s) => typeof s === 'string').slice(0, MAX_COMPARE) : [];
    } catch { return []; }
  }, [params]);

  const compared = useMemo(
    () => selected.map((slug) => spots.find((s) => s.slug === slug)).filter(Boolean),
    [selected, spots]
  );

  useEffect(() => {
    try { localStorage.setItem(LS_COMPARE, JSON.stringify(selected)); } catch { /* ignore */ }
  }, [selected]);

  const setSelected = (slugs) => {
    const clean = slugs.filter(Boolean).slice(0, MAX_COMPARE);
    setParams(clean.length ? { spots: clean.join(',') } : {}, { replace: true });
    trackEvent('compare_changed', { count: clean.length });
  };
  const addSpot = (slug) => { if (!selected.includes(slug) && selected.length < MAX_COMPARE) setSelected([...selected, slug]); };
  const removeSpot = (slug) => setSelected(selected.filter((s) => s !== slug));

  const pickerResults = useMemo(() => {
    const q = pickerQ.trim().toLowerCase();
    const pool = spots.filter((s) => !selected.includes(s.slug));
    if (!q) return pool.slice(0, 12);
    return pool.filter((s) => s.name.toLowerCase().includes(q) || (s.tagline || '').toLowerCase().includes(q)).slice(0, 12);
  }, [spots, selected, pickerQ]);

  // per-metric winners + overall verdict
  const winners = useMemo(() => {
    const w = {};
    for (const m of METRICS) {
      if (!m.wins || compared.length < 2) continue;
      let best = null;
      for (const s of compared) {
        const v = metricValue(m.key, s);
        if (best === null || (m.wins === 'high' ? v > best : v < best)) best = v;
      }
      // ties: everyone with the best value wins
      w[m.key] = compared.filter((s) => metricValue(m.key, s) === best).map((s) => s.slug);
    }
    return w;
  }, [compared]);

  const verdict = useMemo(() => {
    if (compared.length < 2) return null;
    const wins = compared.map((s) => ({
      spot: s,
      count: Object.values(winners).filter((slugs) => slugs.includes(s.slug)).length,
    }));
    wins.sort((a, b) => b.count - a.count);
    return wins;
  }, [compared, winners]);

  const shareUrl = `${window.location.origin}${window.location.pathname}?spots=${selected.join(',')}`;
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      trackEvent('compare_shared', { count: selected.length });
    } catch { /* clipboard unavailable */ }
  };

  const quickPick = (slugs) => setSelected(slugs);

  return (
    <div className="pt-[92px] pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center pt-8 pb-6">
          <div className="text-4xl mb-2">⚔️</div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]">Spot vs Spot</h1>
          <p className="text-[var(--ink-2)] mt-2 max-w-xl mx-auto">
            Pick up to {MAX_COMPARE} spots and settle it: rank, boosts, views, clicks and momentum — side by side, live numbers.
          </p>
        </div>

        {/* picker */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {selected.map((slug) => {
              const s = spots.find((x) => x.slug === slug);
              return (
                <button
                  key={slug}
                  onClick={() => removeSpot(slug)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--bg)] border border-[var(--line)] pl-1.5 pr-3 py-1.5 text-sm font-semibold text-[var(--ink)] min-h-[40px]"
                  title="Remove from comparison"
                >
                  {s && <BrandAvatar spot={s} size={28} />}
                  <span className="max-w-[140px] truncate">{s ? s.name : slug}</span>
                  <span className="text-[var(--ink-3)]">✕</span>
                </button>
              );
            })}
            {selected.length === 0 && (
              <span className="text-sm text-[var(--ink-3)]">No spots selected yet — search below or try a quick pick.</span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={pickerQ}
              onChange={(e) => setPickerQ(e.target.value)}
              placeholder="Search spots to add…"
              className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-3)] min-h-[48px]"
              aria-label="Search spots to compare"
            />
            <div className="flex gap-2">
              <button onClick={() => quickPick(spots.slice(0, 3).map((s) => s.slug))} className="px-4 py-3 rounded-xl border border-[var(--line)] text-sm font-semibold text-[var(--ink-2)] hover:text-[var(--ink)] min-h-[48px]">Top 3</button>
              <button
                onClick={() => {
                  const pool = [...spots].sort(() => Math.random() - 0.5);
                  quickPick(pool.slice(0, 3).map((s) => s.slug));
                }}
                className="px-4 py-3 rounded-xl border border-[var(--line)] text-sm font-semibold text-[var(--ink-2)] hover:text-[var(--ink)] min-h-[48px]"
              >🎲 Random 3</button>
            </div>
          </div>
          {(pickerQ.trim() || selected.length < MAX_COMPARE) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3 max-h-64 overflow-y-auto">
              {pickerResults.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => addSpot(s.slug)}
                  disabled={selected.length >= MAX_COMPARE}
                  className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 text-left hover:border-[var(--gold)] transition-colors disabled:opacity-40 min-h-[56px]"
                >
                  <BrandAvatar spot={s} size={36} />
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-sm text-[var(--ink)] truncate">{s.name}</span>
                    <span className="block text-xs text-[var(--ink-3)]">#{s.rank} · {money(displayAmount(s))}</span>
                  </span>
                  <span className="text-xl text-[var(--gold)] font-bold">＋</span>
                </button>
              ))}
              {pickerResults.length === 0 && (
                <p className="text-sm text-[var(--ink-3)] col-span-full py-4 text-center">No spots match “{pickerQ}”.</p>
              )}
            </div>
          )}
        </div>

        {compared.length >= 2 ? (
          <>
            {/* verdict */}
            {verdict && verdict[0].count > 0 && (
              <div className="rounded-2xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 p-4 sm:p-5 mb-6 text-center">
                <div className="font-display font-bold text-lg text-[var(--ink)]">
                  👑 {verdict[0].spot.name} leads the pack
                </div>
                <p className="text-sm text-[var(--ink-2)] mt-1">
                  Winning {verdict[0].count} of {Object.keys(winners).length} contested metrics
                  {verdict[1] && verdict[1].count > 0 && (
                    <> — {verdict[1].spot.name} takes {verdict[1].count}</>
                  )}.
                  <button onClick={copyLink} className="ml-2 underline font-semibold text-[var(--gold)]">
                    {copied ? '✓ Link copied!' : 'Share this showdown'}
                  </button>
                </p>
              </div>
            )}

            {/* comparison cards: side-by-side on desktop, stacked on mobile */}
            <div className={`grid gap-4 ${compared.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {compared.map((s) => (
                <div key={s.slug} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
                  <div className="p-4 sm:p-5 border-b border-[var(--line)] bg-[var(--bg)]/60">
                    <div className="flex items-center gap-3">
                      <BrandAvatar spot={s} size={52} ring={s.rank <= 3} />
                      <div className="min-w-0 flex-1">
                        <Link to={`/s/${s.slug}`} className="font-display font-bold text-lg text-[var(--ink)] hover:text-[var(--gold)] truncate block">
                          {s.name}
                        </Link>
                        <div className="text-xs text-[var(--ink-3)] truncate">{s.tagline}</div>
                      </div>
                      <RankBadge rank={s.rank} />
                    </div>
                    <div className="mt-3"><Sparkline data={s.trend} slug={s.slug} /></div>
                  </div>
                  <dl>
                    {METRICS.map((m, i) => {
                      const isWin = (winners[m.key] || []).includes(s.slug);
                      return (
                        <div key={m.key} className={`flex items-center justify-between px-4 sm:px-5 py-2.5 ${i % 2 ? 'bg-[var(--bg)]/40' : ''}`}>
                          <dt className="text-[13px] text-[var(--ink-2)]">{m.label}</dt>
                          <dd className={`font-bold text-[15px] ${isWin ? 'text-[var(--gold)]' : 'text-[var(--ink)]'}`}>
                            {isWin && '👑 '}{m.fmt(s)}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                  <div className="p-4 border-t border-[var(--line)]">
                    <p className="text-[13px] text-[var(--ink-2)] line-clamp-3 mb-3">{s.description}</p>
                    <Link to={`/s/${s.slug}`} className="btn-primary w-full py-2.5 text-sm text-center block">View profile</Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--line)] p-10 text-center">
            <div className="text-5xl mb-3">🥊</div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)]">Pick at least 2 spots to start the showdown</h2>
            <p className="text-sm text-[var(--ink-2)] mt-2 max-w-md mx-auto">
              Compare rivals head-to-head on the numbers that matter — or jump straight in with the current top 3.
            </p>
            <button onClick={() => quickPick(spots.slice(0, 3).map((s) => s.slug))} className="btn-primary px-6 py-3 mt-5">
              ⚔️ Compare the top 3
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
