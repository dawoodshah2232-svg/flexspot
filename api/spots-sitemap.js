// Dynamic sitemap for live FlexSpot profiles stored in Vercel KV.
// Keeps newly approved spots discoverable without waiting for another deploy.
import { kv } from './_lib/mail.js';

const SITE_URL = (process.env.VITE_SITE_URL || process.env.VITE_APP_URL || 'https://www.flexspot.lol').replace(/\/+$/, '');

function xmlEscape(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function isoDate(value) {
  const n = Number(value);
  const d = Number.isFinite(n) && n > 0 ? new Date(n) : new Date();
  return Number.isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method not allowed');
  }

  try {
    const store = await kv();
    const urls = [];

    if (store) {
      const slugs = await store.zrange('spots:idx', 0, 1000, { rev: true });
      for (const slug of slugs || []) {
        try {
          const spot = await store.get(`spot:${slug}`);
          if (!spot || spot.hidden || !spot.slug || !spot.name) continue;
          urls.push(
            `  <url><loc>${xmlEscape(`${SITE_URL}/s/${spot.slug}`)}</loc><lastmod>${isoDate(spot.updatedAt || spot.createdAt)}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`
          );
        } catch {}
      }
    }

    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    return res.status(200).send(body);
  } catch {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=60');
    return res.status(200).send('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n');
  }
}
