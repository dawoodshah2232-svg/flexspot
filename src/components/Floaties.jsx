import { useEffect, useRef } from 'react';

// Floating emoji decorations with meme energy — now playful:
// they keep their gentle ambient float, but when your cursor comes near,
// each emoji scampers a little away from it, then drifts back home at a
// relaxed pace once the cursor leaves. Pure decoration: pointer-events-none,
// aria-hidden, GPU-friendly transforms.
const FLEE_RADIUS = 120; // px — cursor influence zone
const FLEE_PUSH = 54; // px — max scamper distance
const EASE = 0.14; // smoothing — snappy flee, gentle return

export default function Floaties({ items }) {
  const boxRef = useRef(null);
  const nodeRefs = useRef([]);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const st = { rect: null, mouse: null, spots: [] };

    const measure = () => {
      const r = box.getBoundingClientRect();
      st.rect = r;
      st.spots = itemsRef.current.map((f) => ({
        // base anchor in px, derived from the item's % position
        x: (parseFloat(f.left) / 100) * r.width,
        y: (parseFloat(f.top) / 100) * r.height,
        ox: 0, oy: 0,
      }));
    };
    measure();
    window.addEventListener('resize', measure);

    const onMove = (e) => {
      if (!st.rect) return;
      const x = e.clientX - st.rect.left;
      const y = e.clientY - st.rect.top;
      const m = 90; // margin so emojis react just before the cursor enters
      st.mouse =
        x > -m && x < st.rect.width + m && y > -m && y < st.rect.height + m
          ? { x, y }
          : null;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      st.spots.forEach((p, i) => {
        let tx = 0;
        let ty = 0;
        if (st.mouse) {
          const dx = p.x - st.mouse.x;
          const dy = p.y - st.mouse.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < FLEE_RADIUS) {
            const f = (1 - d / FLEE_RADIUS) * FLEE_PUSH;
            tx = (dx / d) * f;
            ty = (dy / d) * f;
          }
        }
        p.ox += (tx - p.ox) * EASE;
        p.oy += (ty - p.oy) * EASE;
        const el = nodeRefs.current[i];
        if (el) el.style.transform = `translate3d(${p.ox.toFixed(1)}px,${p.oy.toFixed(1)}px,0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      window.removeEventListener('mousemove', onMove);
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
