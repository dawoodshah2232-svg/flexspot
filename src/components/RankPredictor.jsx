// Rank predictor — "see where you'd rank" widget for the homepage.
// Type a brand name, pick an amount: shows the exact debut rank using the
// same ranking rule as the real board (rank() from lib/store). Pure
// curiosity fuel → CTA straight into /claim.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { rank } from '../lib/store';
import { money2 } from '../lib/format';

const QUICK = [1, 5, 10, 25, 50, 100];

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function RankPredictor({ spots }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState('');

  const effective = useMemo(() => {
    const c = parseFloat(custom);
    if (custom !== '' && Number.isFinite(c) && c > 0) return Math.round(c * 100) / 100;
    return amount;
  }, [amount, custom]);

  const prediction = useMemo(() => {
    const list = [...(spots || []), { slug: '__you__', name: name.trim() || 'Your brand', amount: effective, joinedAt: Date.now() }];
    const ranked = rank(list);
    const idx = ranked.findIndex((s) => s.slug === '__you__');
    return { rank: idx + 1, total: ranked.length, above: idx > 0 ? ranked[idx - 1] : null };
  }, [spots, name, effective]);

  const label = name.trim() || 'Your brand';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10" aria-label="Predict your rank">
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10 shadow-[var(--shadow-card)] text-center relative overflow-hidden">
        <div className="blob w-[280px] h-[280px] bg-[#7C3AED]/10 -bottom-24 -left-24" />
        <div className="relative max-w-2xl mx-auto">
          <div className="text-[10px] font-bold tracking-[0.2em] text-[#7C3AED] uppercase mb-3">🔮 Rank predictor</div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">Where would <span className="grad-text-anim">{label}</span> rank?</h2>
          <p className="text-[var(--ink-2)] mt-3">Type your brand, pick a boost — see your exact debut rank on the live board.</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <input
              value={name} onChange={(e) => setName(e.target.value)} placeholder="Your brand name"
              maxLength={60}
              className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3 font-semibold outline-none focus:border-[#7C3AED]"
            />
            <input
              value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ''))} placeholder={`$${amount} custom`}
              inputMode="decimal"
              className="sm:w-36 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3 font-semibold outline-none focus:border-[#7C3AED]"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => { setAmount(q); setCustom(''); }}
                className={`px-4 py-2 rounded-full text-sm font-extrabold border transition ${
                  effective === q && custom === ''
                    ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                    : 'border-[var(--line)] text-[var(--ink-2)] hover:border-[#7C3AED]'
                }`}
              >
                ${q}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ink-3)]">With {money2(effective)}, {label} would debut at</div>
            <div className="font-display font-extrabold text-6xl grad-text-anim mt-2">{ordinal(prediction.rank)}</div>
            <div className="text-sm text-[var(--ink-2)] mt-2">
              of {prediction.total} brands
              {prediction.above ? (
                <> — just below <b className="text-[var(--ink)]">{prediction.above.name}</b> ({money2(prediction.above.amount || 0)})</>
              ) : (
                <> — <b className="text-[var(--ink)]">straight to the top 👑</b></>
              )}
            </div>
          </div>

          <Link to="/claim" className="btn-primary px-10 py-4 mt-6 inline-block font-extrabold">
            Claim {ordinal(prediction.rank)} now →
          </Link>
          <p className="text-[11px] text-[var(--ink-3)] mt-3">Live board math — the same rule that ranks everyone else.</p>
        </div>
      </div>
    </section>
  );
}
