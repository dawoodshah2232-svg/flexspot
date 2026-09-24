import { useEffect, useRef } from 'react';

// Floating emoji decorations with meme energy — now playful:
// they keep their gentle ambient float, dodge your cursor on desktop, and
// react to scrolling: each emoji drifts at its own speed/direction and tilts
// slightly as it travels through the viewport (scroll parallax). On phones
// — where there is no cursor — the scroll drift is the whole show.
// Pure decoration: pointer-events-none, aria-hidden, GPU-friendly transforms.
const FLEE_RADIUS = 120; // px — cursor influence zone
const FLEE_PUSH = 54; // px — max scamper distance
const EASE = 0.14; // smoothing — snappy flee, gentle return
const PEASE = 0.08; // smoothing — slow dreamy lag for the scroll drift

export default function Floaties({ items }) {
  const boxRef = useRef(null);
  const nodeRefs = useRef([]);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const st = { mouse: null, spots: [] };

    const measure = () => {
      const r = box.getBoundingClientRect();
      st.spots = itemsRef.current.map((f) => ({
        // base anchor in px, derived from the item's % position
        x: (parseFloat(f.left) / 100) * r.width,
        y: (parseFloat(f.top) / 100) * r.height,
        ox: 0, oy: 0,
        sx: 0, sy: 0, // smoothed scroll-parallax offsets
      }));
    };
    measure();
    window.addEventListener('resize', measure);

    // Store raw viewport coords; the box rect is re-measured every frame so
    // scrolling never desyncs the cursor mapping (stale-rect bug fix).
    const onMove = (e) => { st.mouse = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { st.mouse = null; };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const tick = () => {
      const r = box.getBoundingClientRect();
      let mx = null;
      let my = null;
      if (st.mouse) {
        const m = 90; // margin so emojis react just before the cursor enters
        const x = st.mouse.x - r.left;
        const y = st.mouse.y - r.top;
        if (x > -m && x < r.width + m && y > -m && y < r.height + m) { mx = x; my = y; }
      }
      st.spots.forEach((p, i) => {
        let tx = 0;
        let ty = 0;
        if (mx !== null) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d = Math.hypot(dx, dy) || 1;
          if (d < FLEE_RADIUS) {
            const f = (1 - d / FLEE_RADIUS) * FLEE_PUSH;
            tx = (dx / d) * f;
            ty = (dy / d) * f;
          }
        }
        p.ox += (tx - p.ox) * EASE;
        p.oy += (ty - p.oy) * EASE;
        // Scroll parallax: where is this emoji in the viewport right now?
        // prog = 0 at viewport center, ±0.5 at the edges (clamped). Each
        // emoji drifts at its own speed and direction, with a slight tilt —
        // so scrolling up/down makes them swim past at different rates.
        const vh = window.innerHeight || 1;
        const prog = Math.max(-0.75, Math.min(0.75, ((r.top + p.y) - vh / 2) / vh));
        const dir = i % 2 === 0 ? 1 : -1;
        const depth = (0.55 + (i % 3) * 0.3) * dir;
        const ptx = prog * 34 * -dir;
        const pty = prog * 84 * depth;
        p.sx += (ptx - p.sx) * PEASE;
        p.sy += (pty - p.sy) * PEASE;
        const rot = (p.sy * 0.35 * dir).toFixed(1);
        const el = nodeRefs.current[i];
        if (el) el.style.transform = `translate3d(${(p.ox + p.sx).toFixed(1)}px,${(p.oy + p.sy).toFixed(1)}px,0) rotate(${rot}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={boxRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((f, i) => (
        <span
          key={i}
          ref={(el) => { nodeRefs.current[i] = el; }}
          className={`absolute ${f.cls || ''}`}
          style={{ left: f.left, top: f.top, willChange: 'transform' }}
        >
          <span
            className="anim-floaty block"
            style={{
              fontSize: f.size || 28,
              animationDelay: f.delay || `${-i * 1.4}s`,
              opacity: f.opacity ?? 0.55,
              filter: 'saturate(1.2)',
            }}
          >
            {f.emoji}
          </span>
        </span>
      ))}
    </div>
  );
}
