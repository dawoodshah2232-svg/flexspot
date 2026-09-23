# FlexSpot Blog — Post Format Contract

Posts live in `src/content/blog/*.md`. **Filename (kebab-case) = slug**, e.g. `how-boosts-work.md` → `/blog/how-boosts-work`.
`README.md` in this folder is the contract doc — the engine excludes it from posts.

## Frontmatter (required, YAML between the `---` fences)

```yaml
---
title: "Your Post Title (50–60 chars ideal)"
description: "150–160 characters. This becomes the meta description and the card blurb."
date: 2026-09-23          # YYYY-MM-DD, used for sorting (newest first)
author: "FlexSpot Team"    # or the author's name
category: "Getting Started" # ONE of the categories below
keywords:                 # YAML list, used by on-site search
  - flexspot
  - brand visibility
pillar: false             # true = pillar guide (long, hub page), false = cluster post
related:                  # optional: slugs of posts this one links to
  - getting-started-with-flexspot
sample: false             # content team: leave false. Posts with `sample: true`
                          # are engine demos — visible in the index but excluded
                          # from related-post picks and the sitemap.
image: "/og-cover.png"    # optional: social/OG image path
---
```

### Allowed categories (exact spelling)

- `Visibility Guides`
- `Small Business Marketing`
- `Viral Marketing`
- `UAE & Dubai`
- `Bidding Strategy`
- `Getting Started`

## Body format (required)

1. **First block** MUST be a Key Takeaways callout, as a blockquote:
   ```md
   > **Key takeaways:**
   > - First takeaway…
   > - Second takeaway…
   ```
   3–5 bullets. The engine renders this as a styled callout box.

2. Then standard markdown: `##` and `###` headings, paragraphs, `-` lists,
   `1.` numbered lists, `**bold**`, `*italic*`, `` `inline code` ``, fenced
   code blocks, `[links](https://…)`, and `![images](…)`.

3. `##` headings become the article's table of contents (auto-linked by slug).

## Content rules

- **Original, substantive prose.** Write like a human expert, not filler.
- **No fake claims or stats.** Never invent numbers ("10,000 brands"), rankings,
  study results, or quotes. Only state what is verifiably true about FlexSpot.
- Pillars (`pillar: true`) are the hub guides: long, evergreen, link out to
  cluster posts via `related`. Clusters are shorter and link back to their pillar.
- Internal links: prefer relative `/blog/<slug>` links so they stay correct on
  preview and production.

## How the engine consumes posts

- `src/lib/blog.js` parses frontmatter with a tiny zero-dependency parser and
  loads every post at build time via Vite's `import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true })`.
- Exposed helpers: `allPosts`, `getPost(slug)`, `postsByCategory`, `relatedPosts`,
  `searchPosts`, `paginate`, `publicPosts` (samples excluded — for sitemap/related).
- Routes: `/blog` (paginated index, 12/page, `?cat=` filter, search) and
  `/blog/:slug` (article with TOC, share buttons, related, prev/next).
- SEO: per-post title/meta/OG/Twitter/canonical + `BlogPosting` and
  `BreadcrumbList` JSON-LD, wired through the existing `pageMeta.js` /
  `<PageHead/>` system. Sample posts are excluded from sitemap tooling.
