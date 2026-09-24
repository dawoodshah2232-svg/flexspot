import { useEffect, useRef } from 'react';

// Flee — wraps any decorative content (usually an emoji) so it playfully
// scampers away from the cursor when it comes near, then drifts back home
// at a relaxed pace. Pure decoration: pointer-events-none, GPU transforms,
// ambient motion of the child is untouched.
const RADIUS = 110; // px — cursor influence zone
const PUSH = 48; // px — max scamper distance
const EASE = 0.14; // smoothing — snappy flee, gentle return

export default function Flee({ children, className = '', style, radius = RADIUS, push = PUSH, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let ox = 0;
    let oy = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const d = Math.hypot(dx, dy) || 1;
      if (d < radius) {
        const f = (1 - d / radius) * push;
        tx = (dx / d) * f;
        ty = (dy / d) * f;
      } else {
        tx = 0;
        ty = 0;
      }
    };
    const tick = () => {
      ox += (tx - ox) * EASE;
      oy += (ty - oy) * EASE;
      if (Math.abs(ox) > 0.05 || Math.abs(oy) > 0.05 || tx !== 0 || ty !== 0) {
        el.style.transform = `translate3d(${ox.toFixed(1)}px,${oy.toFixed(1)}px,0)`;
      } else if (el.style.transform) {
        el.style.transform = '';
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    // touch taps fire one synthetic mousemove and then go quiet — without a
    // reset the emoji would stay pushed forever. Same on scroll.
    const reset = () => { tx = 0; ty = 0; };
    window.addEventListener('touchend', reset, { passive: true });
    window.addEventListener('scroll', reset, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchend', reset);
      window.removeEventListener('scroll', reset);
      cancelAnimationFrame(raf);
    };
  }, [radius, push]);

  return (
    <span
      ref={ref}
      className={`pointer-events-none inline-block will-change-transform ${className}`}
      style={style}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {children}
    </span>
  );
}
