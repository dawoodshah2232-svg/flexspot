import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { META, SITE_URL, OG_IMAGE, metaForPath, metaUrls } from '../lib/pageMeta';
import { categoryMeta as categoryBySlug } from '../lib/data';

// <PageHead/> — single client-side SEO hook for the SPA.
// On every route change it rewrites document.title, meta description,
// OG/Twitter tags, canonical, robots, and a per-route JSON-LD block.
// index.html carries the default (home) tags; this component overrides
// them for every other route and restores/keeps them on /.
function setTag(selector, attr, value, parent = document.head) {
  let el = parent.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const m = selector.match(/\[(name|property)="([^"]+)"\]/);
    el.setAttribute(m[1], m[2]);
    parent.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export default function PageHead({ spots = [] }) {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname, { spots, categoryOf: categoryBySlug });
    const { pageUrl, canonicalUrl } = metaUrls(meta.path, meta.canonicalPath);
    const jsonLdData = typeof meta.jsonLd === 'function' ? meta.jsonLd(meta.path) : null;
    const ogImage = meta.ogImage || OG_IMAGE;

    document.title = meta.title;
    setTag('meta[name="description"]', 'content', meta.description);
    setTag('meta[property="og:title"]', 'content', meta.title);
    setTag('meta[property="og:description"]', 'content', meta.description);
    setTag('meta[property="og:url"]', 'content', pageUrl);
    setTag('meta[property="og:image"]', 'content', ogImage);
    setTag('meta[name="twitter:title"]', 'content', meta.title);
    setTag('meta[name="twitter:description"]', 'content', meta.description);
    setTag('meta[name="twitter:image"]', 'content', ogImage);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // Robots: only set when a route demands noindex; otherwise remove the
    // tag so the default index.html "index, follow" applies.
    const robotsTag = document.querySelector('meta[name="robots"]');
    if (meta.robots) {
      setTag('meta[name="robots"]', 'content', meta.robots);
    } else if (robotsTag) {
      robotsTag.setAttribute('content', 'index, follow, max-image-preview:large');
    }

    // Per-route JSON-LD (replaces the single managed block each navigation).
    // The static WebSite + Organization blocks in index.html always stay.
    const old = document.getElementById('page-jsonld');
    if (old) old.remove();
    if (jsonLdData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-jsonld';
      script.textContent = JSON.stringify(jsonLdData);
      document.head.appendChild(script);
    }
  }, [pathname, search, spots]);

  return null;
}

// Re-export the static map + helpers for tests / sitemap tooling.
export { META, SITE_URL, OG_IMAGE };
