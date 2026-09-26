// Blog engine — zero-dependency frontmatter parser, markdown renderer, and
// post helpers. Posts live in src/content/blog/*.md (see README.md there).

// ---- Categories -----------------------------------------------------------
export const BLOG_CATEGORIES = [
  'Visibility Guides',
  'Small Business Marketing',
  'Viral Marketing',
  'UAE & Dubai',
  'Bidding Strategy',
  'Getting Started',
];

export const categorySlug = (c) =>
  String(c || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Pure frontmatter/markdown helpers live in blogParse.js (node-safe) so
// build-time scripts can share them. Re-exported here for existing importers.
import { parseFrontmatter, renderMarkdown, headingId, extractHeadings } from './blogParse.js';
export { parseFrontmatter, renderMarkdown, headingId, extractHeadings };

// ---- Load all posts --------------------------------------------------------
const modules = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export const readingTime = (markdown) => {
  const words = String(markdown).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const formatBlogDate = (dateStr) => {
  const d = new Date(`${dateStr}T12:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

function buildPost(slug, raw) {
  const { data, body } = parseFrontmatter(raw);
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || '1970-01-01',
    author: data.author || 'FlexSpot Team',
    category: data.category || 'Getting Started',
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    pillar: data.pillar === true,
    related: Array.isArray(data.related) ? data.related : [],
    sample: data.sample === true,
    image: data.image || null,
    body: body.trim(),
    html: renderMarkdown(body),
    headings: extractHeadings(body),
    readingTime: readingTime(body),
    url: `/blog/${slug}`,
  };
}

export const allPosts = Object.entries(modules)
  .filter(([path]) => !/\/readme\.md$/i.test(path)) // contract doc, not a post
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    return buildPost(slug, raw);
  })
  .sort((a, b) => (b.date < a.date ? -1 : b.date > a.date ? 1 : 0));

// Posts the engine treats as real content (sitemap, related picks, etc.)
export const publicPosts = allPosts.filter((p) => !p.sample);

export const getPost = (slug) => allPosts.find((p) => p.slug === slug) || null;

export const postsByCategory = (category) =>
  allPosts.filter((p) => p.category === category);

// Related: explicit `related` slugs first, then same-category newest,
// then keyword overlap. Samples never appear as related picks.
export function relatedPosts(post, n = 3) {
  const picked = [];
  const seen = new Set([post.slug]);
  const pool = publicPosts.filter((p) => p.slug !== post.slug);
  for (const slug of post.related || []) {
    const hit = pool.find((p) => p.slug === slug);
    if (hit && !seen.has(hit.slug)) { picked.push(hit); seen.add(hit.slug); }
  }
  for (const cand of pool) {
    if (picked.length >= n) break;
    if (!seen.has(cand.slug) && cand.category === post.category) {
      picked.push(cand); seen.add(cand.slug);
    }
  }
  const kw = new Set((post.keywords || []).map((k) => String(k).toLowerCase()));
  for (const cand of pool) {
    if (picked.length >= n) break;
    if (seen.has(cand.slug)) continue;
    const overlap = (cand.keywords || []).some((k) => kw.has(String(k).toLowerCase()));
    if (overlap) { picked.push(cand); seen.add(cand.slug); }
  }
  for (const cand of pool) {
    if (picked.length >= n) break;
    if (!seen.has(cand.slug)) { picked.push(cand); seen.add(cand.slug); }
  }
  return picked.slice(0, n);
}

export function searchPosts(q) {
  const needle = String(q || '').trim().toLowerCase();
  if (!needle) return allPosts;
  return allPosts.filter((p) =>
    [p.title, p.description, p.category, p.author, ...(p.keywords || [])]
      .join(' ')
      .toLowerCase()
      .includes(needle),
  );
}

export function paginate(posts, page = 1, perPage = 12) {
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safe = Math.min(Math.max(1, page), totalPages);
  const start = (safe - 1) * perPage;
  return {
    items: posts.slice(start, start + perPage),
    page: safe,
    totalPages,
    total,
    hasPrev: safe > 1,
    hasNext: safe < totalPages,
  };
}

// Sitemap-safe URL list (samples excluded) for the QA/deploy workstream.
export const blogSitemapUrls = () =>
  publicPosts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.date, changefreq: 'weekly', priority: 0.6 }));
