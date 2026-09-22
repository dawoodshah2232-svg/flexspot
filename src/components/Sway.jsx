import { useEffect, useRef } from 'react';

// Sway — wraps a decorative element (here: the hero dancer cutout) so that
// when the cursor comes near it slowly rotates left/right and sways a little,
// like it's vibing to the cursor. When the cursor leaves it eases back to its
// exact home spot and stays stuck there. Pure decoration: pointer-events-none,
// GPU transforms, respects prefers-reduced-motion.
export default function Sway({
  children,
  className = '',
  style,
  radius = 130, // px — cursor influence zone
  maxRotate = 14, // deg — max tilt left/right
  swayPx = 10, // px — max horizontal drift
  speed = 0.0011, // rad/ms — slow groove (~5.7s per cycle)
  label,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let near = false;
    let amt = 0; // 0 = at rest, 1 = fully grooving
    let raf = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      near = Math.hypot(cx - e.clientX, cy - e.clientY) < radius;
    };
    const tick = (t) => {
      amt += ((near ? 1 : 0) - amt) * 0.06; // gentle in, gentle out
      if (amt > 0.01) {
        const ph = t * speed;
        const rot = Math.sin(ph) * maxRotate * amt;
        const x = Math.sin(ph * 0.7 + 1) * swayPx * amt;
        el.style.transform = `translate3d(${x.toFixed(2)}px,0,0) rotate(${rot.toFixed(2)}deg)`;
      } else if (el.style.transform) {
        el.style.transform = '';
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [radius, maxRotate, swayPx, speed]);

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
