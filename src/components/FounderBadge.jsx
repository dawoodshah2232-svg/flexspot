// 🏅 Founding-100 badge: tiny gold badge shown next to a brand name when its
// spot slug belongs to a founding member. The /api/founders list is fetched
// once per page load and cached in module scope, so leaderboard rows don't
// each fire a request.
import { useEffect, useState } from 'react';

let cache = null;
let inflight = null;

function loadFounders() {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch('/api/founders')
      .then((r) => r.json())
      .then((d) => {
        const map = {};
        if (d && d.ok && Array.isArray(d.founders)) {
          for (const f of d.founders) {
            if (f.slug) map[f.slug] = f.founderNo;
          }
        }
        cache = map;
        return map;
      })
      .catch(() => {
        cache = {};
        return cache;
      })
      .finally(() => { inflight = null; });
  }
  return inflight;
}

export default function FounderBadge({ slug, n: directN }) {
  const [map, setMap] = useState(cache);
  useEffect(() => {
    if (!cache) loadFounders().then(setMap);
  }, []);
  const n = directN || (slug && map ? map[slug] : null);
  if (!n) return null;
  return (
    <span
      className="shrink-0 inline-flex items-center gap-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#92600A] dark:text-[#FCD34D] bg-[#FEF3C7] dark:bg-[#F59E0B]/15 border border-[#F59E0B]/50 rounded-full px-2 py-0.5"
      title={`Founding member #${n} — one of the first 100 brands on FlexSpot`}
    >
      🏅 #{n}
    </span>
  );
}

/** Hook for components that need the raw founders list (e.g. count displays). */
export function useFounders() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch('/api/founders')
      .then((r) => r.json())
      .then((d) => { if (alive && d && d.ok) setData(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  return data;
}
