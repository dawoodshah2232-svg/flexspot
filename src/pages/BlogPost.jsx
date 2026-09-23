import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { allPosts, getPost, relatedPosts, formatBlogDate } from '../lib/blog';
import { appBase, copyText } from '../lib/format';
import BlogCard from '../components/BlogCard';

function ShareRow({ post }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}${appBase()}${post.url}`;
  const text = `${post.title} — FlexSpot Blog`;
  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  };
  const doCopy = async () => {
    if (await copyText(url)) { setCopied(true); setTimeout(() => setCopied(false), 1800); }
  };
  const btn = 'flex items-center justify-center gap-2 rounded-xl font-semibold transition-all hover:-translate-y-0.5 text-sm px-4 py-2.5';
  return (
    <div className="flex flex-wrap gap-2">
      <a href={links.facebook} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#1877F2]/15 text-[#5b9dff] border border-[#1877F2]/30 hover:bg-[#1877F2]/25`}><span>📘</span> Facebook</a>
      <a href={links.x} target="_blank" rel="noopener noreferrer" className={`${btn} bg-line/10 text-snow border border-line/15 hover:bg-line/15`}><span>𝕏</span> Post</a>
      <a href={links.telegram} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#229ED9]/15 text-[#5cc8f5] border border-[#229ED9]/30 hover:bg-[#229ED9]/25`}><span>✈️</span> Telegram</a>
      <button onClick={doCopy} className={`${btn} ${copied ? 'bg-[var(--green-soft)] text-[var(--green)] border border-[var(--green)]' : 'bg-line/5 text-mist border border-line/10 hover:text-snow'}`}>
        {copied ? '✓ Copied!' : '🔗 Copy link'}
      </button>
    </div>
  );
}

function Toc({ headings }) {
  if (!headings.length) return null;
  return (
    <nav aria-label="Table of contents">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--ink-3)] mb-3">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              className="text-sm text-[var(--ink-2)] hover:text-[var(--blaze)] transition-colors leading-snug block"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  const { related, newer, older } = useMemo(() => {
    if (!post) return { related: [], newer: null, older: null };
    const idx = allPosts.findIndex((p) => p.slug === post.slug);
    return {
      related: relatedPosts(post, 3),
      newer: idx > 0 ? allPosts[idx - 1] : null, // allPosts sorted date desc
      older: idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
    };
  }, [post]);

  if (!post) {
    return (
      <div className="pt-[92px]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-24 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h1 className="font-display font-extrabold text-3xl text-[var(--ink)]">Article not found</h1>
          <p className="text-[var(--ink-2)] mt-3">That post doesn't exist (or hasn't been published yet).</p>
          <Link to="/blog" className="btn-primary px-8 py-3 mt-6 inline-block">Browse the blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[92px]">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--ink-3)] font-semibold mb-6">
          <Link to="/" className="hover:text-[var(--ink)]">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link to="/blog" className="hover:text-[var(--ink)]">Blog</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-[var(--ink-2)] truncate">{post.title}</span>
        </nav>

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <Link
              to={`/blog?cat=${post.category.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')}`}
              className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/25 rounded-full px-3 py-1 hover:bg-[var(--blaze)]/20 transition-colors"
            >
              {post.category}
            </Link>
            {post.pillar && (
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/25 rounded-full px-3 py-1">
                📌 Pillar guide
              </span>
            )}
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-[44px] leading-[1.12] text-[var(--ink)] tracking-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-[var(--ink-2)] font-semibold flex-wrap">
            <span className="text-[var(--ink)]">{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <div className="mt-6">
            <ShareRow post={post} />
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_260px] gap-10 items-start">
          {/* Body */}
          <div className="max-w-3xl min-w-0">
            {/* Mobile TOC */}
            <details className="lg:hidden card p-5 mb-8">
              <summary className="font-display font-bold text-[var(--ink)] cursor-pointer">
                📑 Table of contents
              </summary>
              <div className="mt-3"><Toc headings={post.headings} /></div>
            </details>
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="mt-12 pt-8 border-t border-[var(--line-soft)]">
              <p className="font-display font-bold text-lg text-[var(--ink)] mb-4">Share this article</p>
              <ShareRow post={post} />
            </div>
          </div>
          {/* Desktop sticky TOC */}
          <aside className="hidden lg:block sticky top-28 card p-6">
            <Toc headings={post.headings} />
            <div className="mt-6 pt-6 border-t border-[var(--line-soft)]">
              <p className="text-sm font-bold text-[var(--ink)] mb-2">Want the spotlight?</p>
              <p className="text-xs text-[var(--ink-2)] leading-relaxed mb-4">
                Claim your public leaderboard spot from $1.
              </p>
              <Link to="/claim" className="btn-primary px-5 py-2.5 text-sm w-full text-center block">
                ⚡ Claim $1 spot
              </Link>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 max-w-5xl">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] mb-6">
              Keep <span className="grad-text">reading</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
          </section>
        )}

        {/* Prev / next */}
        <nav className="mt-12 max-w-5xl grid sm:grid-cols-2 gap-4" aria-label="More articles">
          {newer ? (
            <Link to={newer.url} className="card p-5 hover:border-[var(--ink-3)] transition-colors group">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--ink-3)] mb-1">← Newer</p>
              <p className="font-display font-bold text-[var(--ink)] group-hover:text-[var(--blaze)] transition-colors leading-snug">{newer.title}</p>
            </Link>
          ) : <span />}
          {older ? (
            <Link to={older.url} className="card p-5 hover:border-[var(--ink-3)] transition-colors group sm:text-right">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--ink-3)] mb-1">Older →</p>
              <p className="font-display font-bold text-[var(--ink)] group-hover:text-[var(--blaze)] transition-colors leading-snug">{older.title}</p>
            </Link>
          ) : <span />}
        </nav>
      </article>
    </div>
  );
}
