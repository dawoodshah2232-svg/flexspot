import { useMemo, useState } from 'react';
import { money, compact } from '../lib/format';
import { trackEvent } from '../lib/analytics';

const PRESETS = [30, 60, 150, 300];

function bracketOf(rank) {
  if (rank <= 3) return '1–3';
  if (rank <= 10) return '4–10';
  if (rank <= 30) return '11–30';
  return '31+';
}

const BRACKET_LABEL = {
  '1–3': 'the crown zone',
  '4–10': 'the spotlight zone',
  '11–30': 'the rising zone',
  '31+': 'the challenger zone',
};

const median = (arr) => {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

export default function CalculatorPage({ spots, onClaim }) {
  const [budget, setBudget] = useState(60);
  const [days, setDays] = useState(30);

  // Model: today's board medians per rank bracket — views/day and CTR.
  // Honest and transparent: medians of the actual current leaderboard.
  const model = useMemo(() => {
    const buckets = { '1–3': [], '4–10': [], '11–30': [], '31+': [] };
    for (const s of spots) {
      const d = Math.max(1, Math.round((Date.now() - new Date(s.joinedAt).getTime()) / 86400000));
      const vpd = (s.views || 0) / d;
      const ctr = s.views > 0 ? s.clicks / s.views : 0;
      buckets[bracketOf(s.rank)].push({ vpd, ctr });
    }
    const out = {};
    for (const k of Object.keys(buckets)) {
      out[k] = {
        vpd: median(buckets[k].map((b) => b.vpd)),
        ctr: median(buckets[k].map((b) => b.ctr)),
      };
    }
    return out;
  }, [spots]);

  const result = useMemo(() => {
    const b = Math.max(1, budget);
    // Where would $b land on today's board?
    const above = spots.filter((s) => (s.amount || 0) > b).length;
    const rank = Math.min(above + 1, spots.length + 1);
    const bracket = bracketOf(rank);
    const m = model[bracket] || { vpd: 0, ctr: 0 };
    const totalViews = Math.round(m.vpd * days);
    const totalClicks = Math.round(totalViews * m.ctr);
    const cpm = totalViews > 0 ? (b / totalViews) * 1000 : 0;
    return { rank, bracket, totalViews, totalClicks, cpm, behind: spots.length - Math.min(above, spots.length) };
  }, [budget, days, spots, model]);

  const slider = 'w-full accent-[#F59E0B] h-2 cursor-pointer';

  return (
    <div className="pt-[92px] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center pt-8 pb-6">
          <div className="text-4xl mb-2">🧮</div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]">Visibility Calculator</h1>
          <p className="text-[var(--ink-2)] mt-2 max-w-xl mx-auto">
            Slide your budget, see your spotlight. Estimates built from today's live board medians — not made-up numbers.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-8">
          {/* budget */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="calc-budget" className="font-semibold text-[var(--ink)]">Total budget</label>
              <span className="font-display font-extrabold text-2xl text-[var(--gold)]">{money(budget)}</span>
            </div>
            <input id="calc-budget" type="range" min={10} max={500} step={5} value={budget}
              onChange={(e) => setBudget(Number(e.target.value))} className={slider} aria-label="Total budget in dollars" />
            <div className="flex gap-2 mt-3 flex-wrap">
              {PRESETS.map((p) => (
                <button key={p} onClick={() => setBudget(p)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border min-h-[40px] ${budget === p ? 'bg-[var(--gold)]/15 border-[var(--gold)] text-[var(--gold)]' : 'border-[var(--line)] text-[var(--ink-2)]'}`}>
                  ${p}
                </button>
              ))}
            </div>
          </div>

          {/* days */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="calc-days" className="font-semibold text-[var(--ink)]">Campaign length</label>
              <span className="font-display font-extrabold text-2xl text-[var(--gold)]">{days} days</span>
            </div>
            <input id="calc-days" type="range" min={7} max={90} step={1} value={days}
              onChange={(e) => setDays(Number(e.target.value))} className={slider} aria-label="Campaign length in days" />
            <div className="flex justify-between text-xs text-[var(--ink-3)] mt-1">
              <span>7 days</span><span>30</span><span>60</span><span>90 days</span>
            </div>
          </div>
        </div>

        {/* results */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {[
            { label: 'Projected rank', value: `#${result.rank}`, sub: BRACKET_LABEL[result.bracket] },
            { label: 'Est. profile views', value: compact(result.totalViews), sub: `over ${days} days` },
            { label: 'Est. outbound clicks', value: compact(result.totalClicks), sub: 'to your site' },
            { label: 'Cost per 1k views', value: result.totalViews ? money(result.cpm) : '—', sub: 'effective CPM' },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-center">
              <div className="text-[11px] uppercase tracking-wider text-[var(--ink-3)] font-semibold">{c.label}</div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] mt-1">{c.value}</div>
              <div className="text-xs text-[var(--ink-2)] mt-0.5">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 p-5 mt-6 text-center">
          <p className="text-[var(--ink)] font-semibold">
            {money(budget)} over {days} days lands you around <b className="text-[var(--gold)]">#{result.rank}</b> — {BRACKET_LABEL[result.bracket]},
            ahead of roughly <b>{result.behind}</b> of today's {spots.length} spots.
          </p>
          <p className="text-xs text-[var(--ink-3)] mt-2">
            Estimates from today's board medians (views/day & click-through per rank bracket). Demo data — real results vary with your creative and category.
          </p>
          <button
            onClick={() => { trackEvent('calculator_cta'); onClaim(); }}
            className="btn-primary px-8 py-3.5 mt-4 min-h-[52px]"
          >
            ⚡ Claim your spot — from $1
          </button>
        </div>
      </div>
    </div>
  );
}
