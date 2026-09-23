import { Link } from 'react-router-dom';
import { formatBlogDate } from '../lib/blog';

// Shared blog post card — used by /blog index, home "From the blog", explore strip.
export default function BlogCard({ post }) {
  return (
    <Link
      to={post.url}
      className="card card-lift p-6 flex flex-col gap-3 group h-full"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--blaze)] bg-[var(--blaze)]/10 border border-[var(--blaze)]/25 rounded-full px-3 py-1">
          {post.category}
        </span>
        {post.pillar && (
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/25 rounded-full px-3 py-1">
            📌 Pillar guide
          </span>
        )}
        {post.sample && (
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--ink-3)] bg-[var(--surface-2)] border border-[var(--line)] rounded-full px-3 py-1">
            Sample
          </span>
        )}
      </div>
      <h3 className="font-display font-bold text-lg text-[var(--ink)] leading-snug group-hover:text-[var(--blaze)] transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-[var(--ink-2)] leading-relaxed line-clamp-3 flex-1">
        {post.description}
      </p>
      <div className="flex items-center gap-3 text-xs text-[var(--ink-3)] font-semibold">
        <span>{formatBlogDate(post.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min read</span>
        <span aria-hidden="true">·</span>
        <span className="truncate">{post.author}</span>
      </div>
    </Link>
  );
}
