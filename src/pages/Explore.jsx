import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, categoryOf, IS_PREVIEW_DATA } from '../lib/data';
import { SpotRow } from '../components/SpotCard';
import Flee from '../components/Flee';

// Explore — category index + discovery links. /explore
export default function Explore({ spots, onBoost, onClaim }) {
  const counts = useMemo(() => {
    const c = {};
    (spots || []).forEach((s) => { const k = categoryOf(s); c[k] = (c[k] || 0) + 1; });
    return c;
  }, [spots]);

  const hot = useMemo(
    () => [...(spots || [])].sort((a, b) => (b.views + b.clicks * 12) - (a.views + a.clicks * 12)).slice(0, 5),
    [spots],
  );

  useEffect(() => {
    document.title = 'Explore — FlexSpot.LOL';
    return () => { document.title = 'FlexSpot.LOL — Claim Your Spot On The Internet'; };
  }, []);

  return (
    <div className="pt-[92px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <Flee><div className="text-5xl mb-3">🧭</div></Flee>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--ink)]">
          Explore the spotlight
        </h1>
        <p className="text-[var(--ink-2)] mt-3 max-w-xl leading-relaxed">
          Browse brands by category, or chase the lists everyone's watching.
          {IS_PREVIEW_DATA ? ' Preview data shown.' : ''}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {[
            { to: '/trending', icon: '🔥', label: 'Trending' },
            { to: '/rising', icon: '🚀', label: 'Rising fast' },
            { to: '/winners', icon: '🏆', label: 'Winners' },
            { to: '/new', icon: '✨', label: 'New to watch' },
          ].map((d) => (
            <Link key={d.to} to={d.to} className="card p-5 text-center hover:-translate-y-1 transition-transform">
              <div className="text-3xl mb-2">{d.icon}</div>
              <div className="font-bold text-[var(--ink)] text-sm">{d.label}</div>
            </Link>
          ))}
        </div>

        <h2 className="font-display font-bold text-2xl text-[var(--ink)] mt-12 mb-4">
          Browse by category
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/explore/${c.slug}`}
              className="card p-5 hover:-translate-y-1 transition-transform group"
            >
              <div className="text-3xl mb-2">{c.icon}</div>
              <div className="font-bold text-[var(--ink)] group-hover:text-[var(--blaze)] transition-colors">
                {c.name}
              </div>
              <p className="text-xs text-[var(--ink-2)] mt-1 leading-relaxed">{c.blurb}</p>
              <div className="mt-3 text-xs font-bold text-[var(--ink-3)]">
                {counts[c.slug] || 0} spot{(counts[c.slug] || 0) === 1 ? '' : 's'}
              </div>
            </Link>
          ))}
        </div>

        <h2 className="font-display font-bold text-2xl text-[var(--ink)] mt-12 mb-4">
          🔥 Hot right now
        </h2>
        <div className="space-y-2">
          {hot.map((s) => (
            <SpotRow key={s.slug} spot={s} move={s.move} onBoost={onBoost} highlight />
          ))}
        </div>

        <div className="card mt-10 p-8 text-center">
          <div className="text-4xl mb-3"><Flee><span className="inline-block">⚡</span></Flee></div>
          <h2 className="font-display font-bold text-2xl text-[var(--ink)]">
            Your brand belongs on this list.
          </h2>
          <p className="text-[var(--ink-2)] text-sm mt-2">
            Claim your spot from $1 and start climbing.
          </p>
          <button onClick={onClaim} className="btn-primary px-8 py-3.5 mt-5">
            Claim my spot — $1
          </button>
        </div>
      </div>
    </div>
  );
}
