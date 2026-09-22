import { useEffect, useRef } from 'react';

const COLORS = ['#F59E0B', '#FBBF24', '#FCD34D', '#FFFFFF', '#34D399', '#F472B6'];

// Lightweight canvas fireworks + confetti burst. Mount it on a success
// screen, it plays for `duration` ms, then cleans itself up.
// Respects prefers-reduced-motion (renders nothing).
export default function Celebration({ duration = 3500 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let raf = 0;
    const parts = [];
    const rand = (a, b) => a + Math.random() * (b - a);
    const t0 = Date.now();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Falling confetti from the top.
    for (let i = 0; i < 110; i++) {
      parts.push({
        type: 'confetti',
        x: rand(0, w),
        y: rand(-h, 0),
        vx: rand(-1, 1),
        vy: rand(2, 5),
        s: rand(4, 8),
        r: rand(0, Math.PI * 2),
        vr: rand(-0.2, 0.2),
        c: COLORS[i % COLORS.length],
      });
    }

    const explode = (x, y, c) => {
      for (let i = 0; i < 42; i++) {
        const a = rand(0, Math.PI * 2);
        const sp = rand(1.5, 5.5);
        parts.push({
          type: 'spark', x, y,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          life: 1, decay: rand(0.012, 0.028),
          s: rand(1.5, 3.5), c,
        });
      }
    };

    const launch = () => {
      const x = rand(w * 0.12, w * 0.88);
      parts.push({
        type: 'rocket', x, y: h + 10,
        vy: rand(-11.5, -8.5),
        target: rand(h * 0.12, h * 0.42),
        c: COLORS[Math.floor(rand(0, COLORS.length))],
      });
      if (Date.now() - t0 < duration) setTimeout(launch, rand(280, 750));
    };
    launch();

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        if (p.type === 'confetti') {
          p.x += p.vx + Math.sin(p.y / 30);
          p.y += p.vy;
          p.r += p.vr;
          if (p.y > h + 20) { parts.splice(i, 1); continue; }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.r);
          ctx.fillStyle = p.c;
          ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
          ctx.restore();
        } else if (p.type === 'rocket') {
          p.y += p.vy;
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          if (p.y <= p.target) { explode(p.x, p.y, p.c); parts.splice(i, 1); }
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05;
          p.vx *= 0.99;
          p.life -= p.decay;
          if (p.life <= 0) { parts.splice(i, 1); continue; }
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      if (Date.now() - t0 < duration + 2500 && parts.length) {
        raf = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [duration]);

  return <canvas ref={ref} className="fixed inset-0 z-[90] pointer-events-none" aria-hidden="true" />;
}
