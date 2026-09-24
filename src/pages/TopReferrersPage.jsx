// Top Referrers — full rankings page. Homepage shows the top 10; this page
// shows the whole board with the premium VIP treatment for the leaders.
// Ranked by affiliate performance: members referred + 20% commission earned.
import { Link } from 'react-router-dom';
import { topReferrers } from '../lib/referral';
import { money2 } from '../lib/format';

const EXTRA = [
  ['Mariam H.', 1, 2.4], ['Vikram S.', 1, 2.0], ['Dana K.', 1, 1.8], ['Igor V.', 1, 1.5],
  ['Aisha B.', 1, 1.2], ['Leo M.', 1, 1.0], ['Nadia R.', 1, 0.8], ['Chris D.', 1, 0.6],
  ['Yasmin T.', 1, 0.4], ['Tom E.', 1, 0.2],
];

const MEDAL = [
  'bg-gradient-to-br from-[#FFF6D9] via-[#FDE68A] to-[#EAB308]',
  'bg-gradient-to-br from-[#F8FAFC] via-[#E2E8F0] to-[#94A3B8]',
  'bg-gradient-to-br from-[#FFF1E3] via-[#FDBA74] to-[#B45309]',
];

export default function TopReferrersPage() {
  const all = topReferrers();
  const leaders = all.slice(0, 3);
  const mid = all.slice(3, 10);
  const rest = [...all.slice(10), ...EXTRA.map(([name, members, commission], i) => ({
    name, members, commission, rank: all.length + i + 1,
  }))];

  return (
    <div className="pt-[104px] pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">🏆</div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[var(--ink)]">
          Top <span className="grad-text">Referrers</span>
        </h1>
        <p className="text-[var(--ink-2)] mt-3 max-w-xl mx-auto text-sm sm:text-base">
          The people growing FlexSpot. Every member who joins through a personal link
          earns the referrer <b className="text-[var(--ink)]">20% instant commission</b> on every payment.
        </p>
        <Link to="/claim" className="btn-gold px-6 py-2.5 mt-5 inline-block text-sm">Get your referral link</Link>
      </div>

      {/* #1 — VIP */}
      {leaders[0] && (
        <div className="relative rounded-3xl p-[2px] mb-6" style={{ background: 'linear-gradient(135deg,#FDE68A,#F59E0B,#FDE68A)' }}>
          <div className="rounded-[calc(1.5rem-2px)] bg-[var(--surface)] p-6 sm:p-8 flex flex-wrap items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FCD34D] to-[#B45309] grid place-items-center text-4xl shadow-[0_8px_24px_rgba(245,158,11,0.45)]">
                👑
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] font-black bg-[var(--ink)] text-white px-2.5 py-0.5 rounded-full">#1</span>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-display font-extrabold text-[var(--ink)]">{leaders[0].name}</span>
                <span className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#F59E0B] to-[#B45309] text-white px-2.5 py-1 rounded-full">👑 VIP · Top Referrer</span>
              </div>
              <p className="text-xs text-[var(--ink-3)] mt-1.5">The highest-earning affiliate on FlexSpot — {leaders[0].members} members referred.</p>
            </div>
            <div className="text-right">
              <div className="font-display font-black text-3xl text-[var(--ink)]">{leaders[0].members}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-3)]">members</div>
              <div className="font-display font-extrabold text-lg text-green-600 mt-1">+{money2(leaders[0].commission)}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-3)]">commission</div>
            </div>
          </div>
        </div>
      )}

      {/* #2 / #3 — elite */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {leaders.slice(1).map((r, i) => (
          <div key={r.name} className="rounded-3xl border-2 border-[var(--line)] bg-[var(--surface)] p-5 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${MEDAL[i + 1]} grid place-items-center text-3xl font-black text-[#111827]`}>
              {i + 2}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-extrabold text-lg text-[var(--ink)] truncate">{r.name}</div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-[var(--surface-2)] border border-[var(--line)] text-[var(--ink-2)] px-2.5 py-1 rounded-full">
                ⭐ Top referrer
              </span>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display font-extrabold text-2xl text-[var(--ink)]">{r.members}</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-3)]">members</div>
              <div className="text-sm font-bold text-green-600">+{money2(r.commission)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* #4–10 — compact */}
      <h2 className="font-display font-extrabold text-lg text-[var(--ink)] mb-3">Rising referrers</h2>
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)]/60 mb-8 overflow-hidden">
        {mid.map((r) => (
          <div key={r.name} className="flex items-center gap-4 px-5 py-3.5">
            <span className="font-display font-black text-[var(--ink-3)] w-8 text-center shrink-0">#{r.rank}</span>
            <span className="font-bold text-[var(--ink)] flex-1 truncate">{r.name}</span>
            <span className="text-sm text-[var(--ink-2)] whitespace-nowrap">{r.members} members</span>
            <span className="text-sm font-bold text-green-600 whitespace-nowrap w-20 text-right">+{money2(r.commission)}</span>
          </div>
        ))}
      </div>

      {/* 11+ */}
      {rest.length > 0 && (
        <>
          <h2 className="font-display font-extrabold text-lg text-[var(--ink)] mb-3">On the climb</h2>
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)]/60 overflow-hidden">
            {rest.map((r) => (
              <div key={r.name} className="flex items-center gap-4 px-5 py-3">
                <span className="font-display font-bold text-[var(--ink-3)] w-8 text-center shrink-0 text-sm">#{r.rank}</span>
                <span className="font-semibold text-sm text-[var(--ink)] flex-1 truncate">{r.name}</span>
                <span className="text-xs text-[var(--ink-3)] whitespace-nowrap">{r.members} members</span>
                <span className="text-xs font-bold text-green-600 whitespace-nowrap w-20 text-right">+{money2(r.commission)}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-center text-[11px] text-[var(--ink-3)] mt-8">Demo rankings while the live backend ships — your referrals count for real.</p>
    </div>
  );
}
