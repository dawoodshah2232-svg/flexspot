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

// ---- Tiny frontmatter parser (YAML-lite, zero deps) ------------------------
function parseScalar(v) {
  const t = v.trim();
  if (/^(true|false)$/i.test(t)) return t.toLowerCase() === 'true';
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t; // keep dates as strings
  if (!isNaN(Number(t)) && t !== '') return Number(t);
  return t.replace(/^["'](.*)["']$/, '$1');
}

export function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  let key = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (/^\s*-\s+/.test(line) && key) {
      (data[key] = data[key] || []).push(parseScalar(line.replace(/^\s*-\s+/, '')));
    } else if (/^[\w-]+:/.test(line)) {
      const i = line.indexOf(':');
      key = line.slice(0, i).trim();
      const rest = line.slice(i + 1).trim();
      data[key] = rest === '' ? [] : parseScalar(rest);
    }
  }
  return { data, body: m[2] };
}

// ---- Minimal markdown renderer (posts only need the basics) ---------------
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function inline(md) {
  let s = esc(md);
  const stash = [];
  // stash fenced/inline code first so inner chars aren't touched
  s = s.replace(/`([^`]+)`/g, (_, c) => {
    stash.push(`<code>${c}</code>`);
    return `\u0000${stash.length - 1}\u0000`;
  });
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" class="blog-img" />');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => stash[Number(i)]);
  return s;
}

export const headingId = (text) =>
  String(text)
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function extractHeadings(markdown) {
  const out = [];
  for (const line of String(markdown).split('\n')) {
    const m = line.match(/^(#{2,3})\s+(.*)$/);
    if (m) out.push({ level: m[1].length, text: m[2].trim(), id: headingId(m[2].trim()) });
  }
  return out;
}

// Key-takeaways blockquote -> styled callout. All other blockquotes -> <blockquote>.
function renderQuote(lines) {
  const text = lines.map((l) => l.replace(/^>\s?/, '')).join('\n');
  const parts = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const titleLine = parts[0] || '';
  const rest = parts.slice(1);
  const isTakeaways = /key takeaways/i.test(titleLine);
  const bullets = rest.filter((l) => l.startsWith('- ')).map((l) => `<li>${inline(l.slice(2))}</li>`);
  const paras = rest.filter((l) => !l.startsWith('- ')).map((l) => `<p>${inline(l)}</p>`);
  const body = (bullets.length ? `<ul>${bullets.join('')}</ul>` : '') + paras.join('');
  const label = isTakeaways ? '✅ Key takeaways' : '💡 Note';
  return isTakeaways
    ? `<aside class="blog-takeaways"><p class="blog-takeaways-title">${label}</p>${body}</aside>`
    : `<blockquote>${body}</blockquote>`;
}

export function renderMarkdown(markdown) {
  const lines = String(markdown).replace(/\r\n?/g, '\n').split('\n');
  const html = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // fenced code
    if (/^```/.test(line)) {
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      html.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }
    // blockquote
    if (/^>/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++]);
      html.push(renderQuote(buf));
      continue;
    }
    // headings
    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      const tag = h[1].length === 2 ? 'h2' : 'h3';
      html.push(`<${tag} id="${headingId(h[2])}">${inline(h[2])}</${tag}>`);
      i++;
      continue;
    }
    // lists
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''))}</li>`);
        i++;
      }
      html.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }
    if (/^\s*$/.test(line)) { i++; continue; }
    // paragraph (join wrapped lines)
    const buf = [line];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{2,3}\s|>\s?```|[-*]\s|\d+\.\s)/.test(lines[i])) {
      buf.push(lines[i++]);
    }
    html.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return html.join('\n');
}

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
