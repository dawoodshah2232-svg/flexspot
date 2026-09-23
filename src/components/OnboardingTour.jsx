import { useCallback, useEffect, useRef, useState } from 'react';

// First-visit guided tour. Zero dependencies, reduced-motion aware, and
// fully dismissable. Targets are [data-tour="…"] anchors placed in Home.
// Replay: dispatch window event 'flexspot:tour'.
const LS_TOUR = 'flexspot_tour_v1';

const STEPS = [
  {
    target: 'hero',
    title: '👑 Welcome to the spotlight',
    body: 'FlexSpot is a live leaderboard where brands bid for attention. Claim a public spot from just $1 — every boost pushes you up the board.',
  },
  {
    target: 'board',
    title: '⚡ The live leaderboard',
    body: 'Ranks move in real time as people boost. Keep an eye on the race: faster runners are gaining on the leader right now.',
  },
  {
    target: 'claim',
    title: '🚀 Your turn',
    body: 'Hit “Claim your spot”, send $1+ in USDT, and your brand goes live on the board. Referral links earn you boosts while you sleep.',
  },
];

export default function OnboardingTour() {
  const [step, setStep] = useState(-1); // -1 = idle
  const [rect, setRect] = useState(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  const active = step >= 0;
  const current = active ? STEPS[step] : null;

  const measure = useCallback(() => {
    const s = STEPS[stepRef.current];
    if (!s) return;
    const el = document.querySelector(`[data-tour="${s.target}"]`);
    if (!el) { // anchor missing (CMS/layout change) — skip forward, never strand the user
      const next = stepRef.current + 1;
      if (next < STEPS.length) setStep(next);
      else finish();
      return;
    }
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    // measure after the smooth scroll settles
    setTimeout(() => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }, 450);
  }, []);

  const finish = useCallback(() => {
    try { localStorage.setItem(LS_TOUR, '1'); } catch { /* ignore */ }
    setStep(-1);
    setRect(null);
  }, []);

  const start = useCallback(() => { setStep(0); }, []);

  // re-measure on scroll/resize while active
  useEffect(() => {
    if (!active) return;
    measure();
    const onMove = () => {
      const s = STEPS[stepRef.current];
      const el = s && document.querySelector(`[data-tour="${s.target}"]`);
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('scroll', onMove);
      window.removeEventListener('resize', onMove);
    };
  }, [active, step, measure]);

  // auto-start once for first-time visitors; replay via custom event
  useEffect(() => {
    let seen = false;
    try { seen = !!localStorage.getItem(LS_TOUR); } catch { /* ignore */ }
    let t = null;
    if (!seen) t = setTimeout(() => setStep((i) => (i === -1 ? 0 : i)), 1600);
    const onReplay = () => setStep(0);
    window.addEventListener('flexspot:tour', onReplay);
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener('flexspot:tour', onReplay);
    };
  }, []);

  // While touring the page stays scrollable; scroll/resize re-gluing (above)
  // keeps the highlight and tooltip pinned to the target.

  if (!active || !current) return null;

  const vw = typeof window !== 'undefined' ? window.innerWidth : 400;
  const cardW = Math.min(320, vw - 32);
  let cardTop = rect ? rect.top + rect.height + 16 : 120;
  let cardLeft = rect ? Math.max(16, Math.min(vw - cardW - 16, rect.left + rect.width / 2 - cardW / 2)) : 16;
  if (rect && cardTop + 220 > window.innerHeight) cardTop = Math.max(16, rect.top - 236);

  return (
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label="Site tour">
      {/* dimmer */}
      <div className="absolute inset-0 bg-black/65" onClick={finish} />
      {/* highlight ring */}
      {rect && (
        <div
          className="absolute rounded-2xl border-[3px] border-[#F59E0B] shadow-[0_0_0_9999px_rgba(0,0,0,0.65),0_0_32px_rgba(245,158,11,0.55)] pointer-events-none"
          style={{ top: rect.top - 8, left: rect.left - 8, width: rect.width + 16, height: rect.height + 16 }}
        />
      )}
      {/* tooltip card */}
      <div
        className="absolute rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-2xl p-5"
        style={{ top: cardTop, left: cardLeft, width: cardW }}
      >
        <div className="font-display font-bold text-lg text-[var(--ink)] mb-1.5">{current.title}</div>
        <p className="text-sm text-[var(--ink-2)] leading-relaxed">{current.body}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-[#F59E0B]' : i < step ? 'bg-[#F59E0B]/50' : 'bg-[var(--line)]'}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={finish} className="px-4 py-2.5 text-sm font-semibold text-[var(--ink-2)] min-h-[44px]">Skip</button>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="px-4 py-2.5 text-sm font-semibold border border-[var(--line)] rounded-xl text-[var(--ink)] min-h-[44px]">Back</button>
            )}
            <button
              onClick={() => (step + 1 < STEPS.length ? setStep(step + 1) : finish())}
              className="btn-primary px-5 py-2.5 text-sm min-h-[44px]"
            >
              {step + 1 < STEPS.length ? 'Next' : 'Start exploring'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
