import { useMemo, useState } from 'react';
import { BrandAvatar, RankBadge } from '../components/SpotCard';
import { money, compact, timeAgo } from '../lib/format';
import { approveLocalSpot, removeLocalSpot, IS_LIVE } from '../lib/store';

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '1234';

const TABS = [
  { id: 'overview', label: '📊 Overview' },
  { id: 'submissions', label: '📥 Submissions' },
  { id: 'payments', label: '💳 Payments' },
  { id: 'fraud', label: '🛡️ Fraud' },
];

export default function Admin({ spots, pending = [], refresh }) {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState('overview');
  const [msg, setMsg] = useState('');

  const live = useMemo(() => spots.filter((s) => !s.pending), [spots]);

  const fraudFlags = useMemo(() => {
    const flags = [];
    const seenUrl = {};
    const seenName = {};
    live.forEach((s) => {
      const u = (s.website || '').toLowerCase();
      if (u) {
        if (seenUrl[u]) flags.push({ type: 'Duplicate URL', detail: `"${s.name}" shares a link with "${seenUrl[u]}"`, spot: s });
        else seenUrl[u] = s.name;
      }
      const n = s.name.toLowerCase();
      if (seenName[n]) flags.push({ type: 'Duplicate name', detail: `"${s.name}" appears twice`, spot: s });
      else seenName[n] = true;
      if (s.amount >= 500 && (s.views || 0) < 50) flags.push({ type: 'High value, low traffic', detail: `${s.name} — ${money(s.amount)} with ${s.views} views`, spot: s });
    });
    return flags;
  }, [live]);

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 2500); };

  const approve = (slug) => {
    if (IS_LIVE) { flash('Live mode: approve from Supabase dashboard.'); return; }
    approveLocalSpot(slug); refresh(); flash('✓ Spot approved and live.');
  };
  const reject = (slug) => {
    if (IS_LIVE) { flash('Live mode: reject from Supabase dashboard.'); return; }
    if (confirm('Reject and remove this submission?')) { removeLocalSpot(slug); refresh(); flash('Submission removed.'); }
  };

  if (!authed) {
    return (
      <div className="pt-[68px] min-h-screen grid place-items-center px-4">
        <div className="w-full max-w-sm bg-card border border-white/10 rounded-3xl p-8 text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="font-display font-bold text-2xl text-snow mb-2">Admin access</h1>
          <p className="text-mist text-sm mb-6">Enter the admin PIN to manage FlexSpot.</p>
          <input
            type="password" inputMode="numeric" maxLength={12}
            className="field text-center text-2xl tracking-[0.4em] mb-4"
            placeholder="••••" value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (pin === ADMIN_PIN ? setAuthed(true) : flash('Wrong PIN.'))}
          />
          <button onClick={() => (pin === ADMIN_PIN ? setAuthed(true) : flash('Wrong PIN.'))} className="btn-primary w-full py-3">Unlock dashboard</button>
          {msg && <p className="text-red-300 text-sm mt-3">{msg}</p>}
          <p className="text-[11px] text-mist/60 mt-4">Preview PIN: 1234 — change via VITE_ADMIN_PIN in production.</p>
        </div>
      </div>
    );
  }

  const stats = [
    { l: 'Live spots', v: live.length, icon: '⚡' },
    { l: 'Pending review', v: pending.length, icon: '📥' },
    { l: 'Total support', v: money(spots.reduce((a, s) => a + s.amount, 0)), icon: '💰' },
    { l: 'Total views', v: compact(spots.reduce((a, s) => a + (s.views || 0), 0)), icon: '👁' },
  ];

  return (
    <div className="pt-[68px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-snow">Admin dashboard</h1>
            <p className="text-mist text-sm mt-1">{IS_LIVE ? 'Connected to live Supabase 🟢' : 'Preview mode — demo data 🟡'}</p>
          </div>
          <button onClick={refresh} className="btn-ghost px-4 py-2 text-sm">↻ Refresh</button>
        </div>

        {msg && <div className="mb-5 text-sm bg-neon/10 border border-neon/30 text-neon rounded-xl px-4 py-3">{msg}</div>}

        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${tab === t.id ? 'bg-electric text-white' : 'bg-white/5 text-mist hover:text-snow'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {stats.map((s) => (
                <div key={s.l} className="bg-card border border-white/5 rounded-2xl p-5">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="font-display font-bold text-2xl text-snow">{s.v}</div>
                  <div className="text-[11px] text-mist uppercase tracking-wider font-semibold mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <h2 className="font-display font-bold text-xl text-snow mb-4">Top 5 right now</h2>
            <div className="space-y-2">
              {live.slice(0, 5).map((s) => (
                <div key={s.slug} className="flex items-center gap-3 bg-card border border-white/5 rounded-2xl p-3">
                  <RankBadge rank={s.rank} />
                  <BrandAvatar spot={s} size={38} />
                  <div className="flex-1 min-w-0"><div className="font-bold text-snow text-sm truncate">{s.name}</div><div className="text-xs text-mist">{compact(s.views)} views · {compact(s.clicks)} clicks</div></div>
                  <div className="font-display font-bold text-neon">{money(s.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'submissions' && (
          <div>
            <h2 className="font-display font-bold text-xl text-snow mb-4">Pending review ({pending.length})</h2>
            {pending.length === 0 ? (
              <div className="text-center py-14 text-mist bg-card border border-white/5 rounded-3xl">
                <div className="text-5xl mb-3">✅</div><p>All clear — no submissions waiting.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pending.map((s) => (
                  <div key={s.slug} className="bg-card border border-gold/25 rounded-3xl p-5">
                    <div className="flex items-start gap-4">
                      <BrandAvatar spot={s} size={52} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold text-lg text-snow">{s.name}</h3>
                          <span className="text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 rounded-full px-2.5 py-0.5">PENDING</span>
                        </div>
                        <p className="text-mist text-sm">{s.tagline}</p>
                        <p className="text-mist/70 text-xs mt-1">{s.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-mist">
                          <span>🌐 {s.website}</span><span>💰 {money(s.amount)}</span><span>🕐 {timeAgo(s.joinedAt)}</span>
                        </div>
                        {s.email && <div className="text-xs text-mist mt-1">✉️ {s.email}</div>}
                      </div>
                    </div>
                    <div className="flex gap-2.5 mt-4">
                      <button onClick={() => approve(s.slug)} className="btn-primary px-6 py-2.5 text-sm flex-1">✓ Approve & publish</button>
                      <button onClick={() => reject(s.slug)} className="px-6 py-2.5 text-sm rounded-[14px] border border-red-500/40 text-red-300 hover:bg-red-500/10">✕ Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'payments' && (
          <div>
            <h2 className="font-display font-bold text-xl text-snow mb-2">Payment verification</h2>
            <p className="text-mist text-sm mb-5">Phase 1: manual verification. Confirm each payment arrived before approving the spot.</p>
            {pending.length === 0 ? (
              <div className="text-center py-14 text-mist bg-card border border-white/5 rounded-3xl">
                <div className="text-5xl mb-3">💳</div><p>No payments awaiting verification.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pending.map((s) => (
                  <div key={s.slug} className="flex items-center gap-4 bg-card border border-white/5 rounded-2xl p-4">
                    <BrandAvatar spot={s} size={44} />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-snow truncate">{s.name}</div>
                      <div className="text-xs text-mist">Expected {money(s.amount)} · submitted {timeAgo(s.joinedAt)}</div>
                    </div>
                    <span className="text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 rounded-full px-3 py-1">AWAITING PAYMENT</span>
                    <button onClick={() => approve(s.slug)} className="btn-primary px-5 py-2 text-xs">✓ Verify</button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 rounded-2xl bg-electric/10 border border-electric/25 p-5 text-sm text-mist">
              <b className="text-snow">Coming soon:</b> automatic payment gateway with instant verification and webhook-driven ledger entries.
            </div>
          </div>
        )}

        {tab === 'fraud' && (
          <div>
            <h2 className="font-display font-bold text-xl text-snow mb-2">Fraud monitoring</h2>
            <p className="text-mist text-sm mb-5">Automated flags: duplicate URLs/names, high-value spots with no traffic.</p>
            {fraudFlags.length === 0 ? (
              <div className="text-center py-14 text-mist bg-card border border-white/5 rounded-3xl">
                <div className="text-5xl mb-3">🛡️</div><p>No flags. The board looks clean.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {fraudFlags.map((f, i) => (
                  <div key={i} className="flex items-center gap-4 bg-red-500/[0.06] border border-red-500/25 rounded-2xl p-4">
                    <span className="text-2xl">⚠️</span>
                    <div className="flex-1">
                      <div className="font-bold text-snow text-sm">{f.type}</div>
                      <div className="text-xs text-mist">{f.detail}</div>
                    </div>
                    <button onClick={() => reject(f.spot.slug)} className="px-4 py-2 text-xs rounded-xl border border-red-500/40 text-red-300 hover:bg-red-500/10">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
