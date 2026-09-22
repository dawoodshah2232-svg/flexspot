import { useEffect, useMemo, useState } from 'react';

// One-time glitter burst when a winner's page opens: glitter pops in at the
// top, falls down the screen, and disappears — then it's gone for good.
// #1 gets the full cheers, #2 less, #3 even less.
export default function CelebrationBurst({ rank }) {
  const [show, setShow] = useState(
    () => !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
  const parts = useMemo(() => {
    const n = rank === 1 ? 44 : rank === 2 ? 26 : 15;
    const glyphs = ['✨', '⭐', '🎉', '💫', '🌟', '🎊'];
    return Array.from({ length: n }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.7,
      dur: 2.2 + Math.random() * 1.8,
      size: 11 + Math.random() * (rank === 1 ? 20 : 14),
      glyph: glyphs[(Math.random() * glyphs.length) | 0],
      drift: (Math.random() - 0.5) * 260,
    }));
  }, [rank]);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 5200);
    return () => clearTimeout(t);
  }, []);
  if (!show || rank > 3) return null;
  return (
    <div aria-hidden="true">
      {parts.map((p, i) => (
        <span
          key={i}
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
