// src/lib/blogParse.js — node-safe pure helpers shared by the blog engine
// (Vite/browser) and build-time scripts (plain node). No import.meta.glob,
// no browser APIs, no Vite-only syntax. Single source of truth for
// frontmatter parsing + markdown rendering.

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
// NOTE: esc() runs on the raw line BEFORE the link/image regexes below, so
// quotes in URLs arrive here as &quot; / &#39; — safe inside attributes.
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Only these URL shapes may become real links/images. Everything else
// (javascript:, data:, vbscript:, backslash tricks, whitespace smuggling)
// collapses to "#" so a hostile/typo'd markdown URL can never execute.
const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/|#)/i;
const safeUrl = (u) => {
  const t = String(u || '').trim();
  if (!t || /[\s"'<>\\]/.test(t)) return '#';
  return SAFE_URL.test(t) ? t : '#';
};

function inline(md) {
  let s = esc(md);
  const stash = [];
  // stash fenced/inline code first so inner chars aren't touched
  s = s.replace(/`([^`]+)`/g, (_, c) => {
    stash.push(`<code>${c}</code>`);
    return `\u0000${stash.length - 1}\u0000`;
  });
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) =>
    `<img src="${safeUrl(url)}" alt="${alt}" loading="lazy" class="blog-img" />`);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) =>
    `<a href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`);
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
