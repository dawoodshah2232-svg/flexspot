import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  allPosts,
  BLOG_CATEGORIES,
  categorySlug,
  paginate,
  searchPosts,
} from '../lib/blog';
import BlogCard from '../components/BlogCard';

const PER_PAGE = 12;

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get('cat') || '';
  const [query, setQuery] = useState(params.get('q') || '');
  const page = parseInt(params.get('page') || '1', 10) || 1;

  const filtered = useMemo(() => {
    let posts = searchPosts(query);
    if (activeCat) posts = posts.filter((p) => categorySlug(p.category) === activeCat);
    return posts;
  }, [query, activeCat]);

  const { items, totalPages, hasPrev, hasNext, total } = paginate(filtered, page, PER_PAGE);

  const setParam = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    setParams(next, { replace: true });
  };

  return (
    <div className="pt-[92px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-20">
        {/* Header */}
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--ink-3)] font-semibold mb-4">
          <Link to="/" className="hover:text-[var(--ink)]">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-[var(--ink-2)]">Blog</span>
        </nav>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight">
          The <span className="grad-text">Spotlight</span> Blog
        </h1>
        <p className="text-[var(--ink-2)] mt-3 max-w-2xl leading-relaxed">
          Guides, tactics, and playbooks for getting seen — bidding strategy, small-business
          marketing, viral growth, and winning on FlexSpot.
        </p>

        {/* Search */}
        <div className="mt-8 max-w-xl">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <div className="relative">
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setParam({ q: e.target.value, page: '' }); }}
              placeholder="Search articles… (e.g. bidding, referrals, Dubai)"
              className="w-full rounded-2xl bg-[var(--surface)] border border-[var(--line)] px-5 py-3.5 pl-12 text-sm text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[var(--blaze)] transition-colors"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button
            onClick={() => setParam({ cat: '', page: '' })}
            className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
              !activeCat
                ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                : 'bg-[var(--surface)] text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink-3)]'
            }`}
          >
            All
          </button>
          {BLOG_CATEGORIES.map((c) => {
            const slug = categorySlug(c);
            const active = activeCat === slug;
            return (
              <button
                key={c}
                onClick={() => setParam({ cat: active ? '' : slug, page: '' })}
                aria-pressed={active}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                  active
                    ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                    : 'bg-[var(--surface)] text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink-3)]'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Results */}
        <p className="mt-8 text-sm text-[var(--ink-3)] font-semibold" role="status">
          {total} article{total === 1 ? '' : 's'}
          {(() => { const catName = activeCat ? BLOG_CATEGORIES.find((c) => categorySlug(c) === activeCat) : null; return catName ? ` in ${catName}` : ''; })()}
          {query ? ` matching “${query}”` : ''}
        </p>

        {items.length ? (
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        ) : (
          <div className="mt-4 card p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)]">No articles found</h2>
            <p className="text-sm text-[var(--ink-2)] mt-2">Try a different search or category.</p>
            <button
              onClick={() => { setQuery(''); setParam({ q: '', cat: '', page: '' }); }}
              className="btn-ghost px-6 py-2.5 mt-5 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Blog pages">
            <button
              disabled={!hasPrev}
              onClick={() => setParam({ page: String(page - 1) })}
              className="px-4 py-2 rounded-full text-sm font-bold border border-[var(--line)] text-[var(--ink-2)] disabled:opacity-40 hover:border-[var(--ink-3)] transition-colors"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setParam({ page: String(n) })}
                aria-current={n === page ? 'page' : undefined}
                className={`w-10 h-10 rounded-full text-sm font-bold border transition-colors ${
                  n === page
                    ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                    : 'border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--ink-3)]'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              disabled={!hasNext}
              onClick={() => setParam({ page: String(page + 1) })}
              className="px-4 py-2 rounded-full text-sm font-bold border border-[var(--line)] text-[var(--ink-2)] disabled:opacity-40 hover:border-[var(--ink-3)] transition-colors"
            >
              Next →
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
