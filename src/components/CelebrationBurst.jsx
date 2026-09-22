import { useEffect, useMemo, useState } from 'react';

// Glitter rain on a winner's page: sparkles fall from the top, fade out, and
// the whole burst replays every 8 seconds — forever, on desktop and mobile.
// Fully decorative: pointer-events-none, so it never blocks taps or clicks.
// #1 gets double the cheers, #2 less, #3 even less.
const REPLAY_MS = 8000;

export default function CelebrationBurst({ rank }) {
  const reduce = useMemo(
    () => (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches),
    []
  );
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setCycle((c) => c + 1), REPLAY_MS);
    return () => clearInterval(t);
  }, [reduce]);
  const parts = useMemo(() => {
    const n = rank === 1 ? 88 : rank === 2 ? 26 : 15;
    const glyphs = ['✨', '⭐', '🎉', '💫', '🌟', '🎊'];
    return Array.from({ length: n }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.7,
      dur: 2.2 + Math.random() * 1.8,
      size: 11 + Math.random() * (rank === 1 ? 22 : 14),
      glyph: glyphs[(Math.random() * glyphs.length) | 0],
      drift: (Math.random() - 0.5) * 260,
    }));
  }, [rank, cycle]);
  if (reduce || rank > 3) return null;
  return (
    <div aria-hidden="true">
      {parts.map((p, i) => (
        <span
          key={`${cycle}-${i}`}
          className="celebrate-particle"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            '--drift': `${p.drift}px`,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}
