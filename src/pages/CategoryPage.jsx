import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATEGORIES, categoryOf, IS_PREVIEW_DATA } from '../lib/data';
import { SpotRow } from '../components/SpotCard';
import NotFound from './NotFound';

// Category page — /explore/:category
export default function CategoryPage({ spots, moves, onBoost, onClaim }) {
  const { category } = useParams();
  const meta = useMemo(() => CATEGORIES.find((c) => c.slug === category), [category]);
  const list = useMemo(
    () => (spots || []).filter((s) => categoryOf(s) === category),
    [spots, category],
  );

  useEffect(() => {
    if (meta) document.title = `${meta.name} — FlexSpot.LOL`;
    return () => { document.title = 'FlexSpot.LOL — Claim Your Spot On The Internet'; };
  }, [meta]);

  // Unknown category → dedicated 404 (never a bare list).
  if (!meta) return <NotFound onClaim={onClaim} />;

  const others = CATEGORIES.filter((c) => c.slug !== category);

  return (
    <div className="pt-[92px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <Link to="/explore" className="text-sm text-[var(--ink-2)] hover:text-[var(--ink)]">
          ← All categories
        </Link>
        <div className="text-5xl mt-6 mb-3">{meta.icon}</div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--ink)]">
          {meta.name}
        </h1>
        <p className="text-[var(--ink-2)] mt-3 max-w-xl leading-relaxed">{meta.blurb}</p>
        {IS_PREVIEW_DATA && (
          <p className="text-xs text-[var(--ink-3)] mt-2">Preview data — live spots appear after approval.</p>
        )}

        <div className="mt-8 space-y-2">
          {list.map((s) => (
            <SpotRow key={s.slug} spot={s} move={moves[s.slug] ?? s.move} onBoost={onBoost} highlight />
          ))}
          {list.length === 0 && (
            <div className="card p-10 text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">
                No spots in {meta.name} yet
              </h2>
              <p className="text-sm text-[var(--ink-2)] mb-5">
                Be the first to claim this category — and own the spotlight.
              </p>
              <button onClick={onClaim} className="btn-primary px-8 py-3 text-sm">
                ⚡ Claim a {meta.name} spot — $1
              </button>
            </div>
          )}
        </div>

        <h2 className="font-display font-bold text-xl text-[var(--ink)] mt-12 mb-4">
          Other categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {others.slice(0, 4).map((c) => (
            <Link key={c.slug} to={`/explore/${c.slug}`} className="card p-4 text-center hover:-translate-y-1 transition-transform">
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="font-bold text-[var(--ink)] text-sm">{c.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
