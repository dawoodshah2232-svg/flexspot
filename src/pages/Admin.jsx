import { useEffect, useMemo, useState } from 'react';
import { BrandAvatar, RankBadge } from '../components/SpotCard';
import { money, compact, timeAgo } from '../lib/format';
import { useLiveViewers } from '../lib/theme';
import {
  IS_LIVE,
  fetchAllSubmissions,
  reviewSubmission,
  addAdminNote,
  flagSubmission,
  getCMS,
  saveCMS,
  getAnalyticsSummary,
  addManualSpot,
  rank,
} from '../lib/store';
import { CATEGORIES } from '../lib/data';

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '1234';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'submissions', label: 'Submissions' },
  { id: 'payments', label: 'Payments' },
  { id: 'manual', label: 'Manual entry' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'content', label: 'Content' },
  { id: 'fraud', label: 'Fraud' },
];

function StatusPill({ status }) {
  const map = {
    pending: { bg: '#FEF3C7', fg: '#92400E', bd: '#FCD34D', t: 'Pending' },
    approved: { bg: '#D1FAE5', fg: '#065F46', bd: '#6EE7B7', t: 'Approved' },
    rejected: { bg: '#FEE2E2', fg: '#991B1B', bd: '#FCA5A5', t: 'Rejected' },
    'changes-requested': { bg: '#DBEAFE', fg: '#1E40AF', bd: '#93C5FD', t: 'Changes requested' },
  };
  const s = map[status] || map.pending;
  return (
    <span className="text-[10px] font-bold rounded-full px-2.5 py-1 whitespace-nowrap"
      style={{ background: s.bg, color: s.fg, border: `1px solid ${s.bd}` }}>{s.t}</span>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="card p-5">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-display font-bold text-2xl text-[var(--ink)]">{value}</div>
      <div className="text-[11px] text-[var(--ink-3)] uppercase tracking-wider font-semibold mt-1">{label}</div>
      {sub && <div className="text-[11px] text-[var(--ink-3)] mt-1">{sub}</div>}
    </div>
  );
}

function Empty({ icon, text }) {
  return (
    <div className="text-center py-14 text-[var(--ink-2)] card">
      <div className="text-5xl mb-3">{icon}</div><p className="text-sm">{text}</p>
    </div>
  );
}

function CopyBtn({ text, label }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {} }}
      className="text-[11px] font-bold text-[var(--ink-2)] hover:text-[var(--ink)] underline underline-offset-2"
    >{ok ? 'Copied ✓' : (label || 'Copy')}</button>
  );
}

export default function Admin({ spots, refresh }) {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState('overview');
  const [msg, setMsg] = useState('');
  const [subs, setSubs] = useState([]);
  const [notes, setNotes] = useState({});
  const [shotView, setShotView] = useState(null);
  const [cms, setCms] = useState(null);
  const [cmsMsg, setCmsMsg] = useState('');
  const viewers = useLiveViewers();

  const reload = () => setSubs(fetchAllSubmissions());
  useEffect(() => { reload(); }, []);

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const pendingSubs = useMemo(() => subs.filter((s) => s.status === 'pending'), [subs]);
  const decidedSubs = useMemo(() => subs.filter((s) => s.status !== 'pending'), [subs]);

  const decide = (id, decision) => {
    const note = (notes[id] || '').trim();
    if (decision !== 'approved' && !note) { flash('Add a note explaining the decision first.'); return; }
    if (decision === 'rejected' && !confirm('Reject this submission?')) return;
    reviewSubmission(id, decision, note);
    setNotes((n) => ({ ...n, [id]: '' }));
    reload(); refresh && refresh();
    flash(decision === 'approved' ? '✓ Approved — spot is now live on the leaderboard.'
      : decision === 'rejected' ? 'Submission rejected.'
      : 'Changes requested — submitter notified (preview).');
  };

  const addNote = (id) => {
    const t = (notes[id] || '').trim();
    if (!t) return;
    addAdminNote(id, t);
    setNotes((n) => ({ ...n, [id]: '' }));
    reload(); flash('Note saved.');
  };

  const analytics = useMemo(() => getAnalyticsSummary(spots), [spots, subs]);

  const fraudFlags = useMemo(() => {
    const flags = [];
    const seenUrl = {}, seenName = {};
    const all = [...(spots || []), ...subs.map((s) => ({ slug: s.slug, name: s.brandName, website: s.website }))];
    all.forEach((s) => {
      const u = (s.website || '').toLowerCase().replace(/\/$/, '');
      if (u) {
        if (seenUrl[u]) flags.push({ type: 'Duplicate URL', detail: `"${s.name}" shares a link with "${seenUrl[u]}"`, id: s.id });
        else seenUrl[u] = s.name;
      }
      const n = (s.name || '').toLowerCase().trim();
      if (n) {
        if (seenName[n]) flags.push({ type: 'Duplicate name', detail: `"${s.name}" appears more than once`, id: s.id });
        else seenName[n] = true;
      }
    });
    subs.filter((s) => s.status === 'pending').forEach((s) => {
      if (!s.paymentScreenshot) flags.push({ type: 'Missing payment screenshot', detail: `${s.brandName} — no screenshot uploaded`, id: s.id });
      if (s.amount >= 500) flags.push({ type: 'High-value claim', detail: `${s.brandName} — ${money(s.amount)} deserves a manual check`, id: s.id });
    });
    return flags;
  }, [spots, subs]);

  useEffect(() => { if (tab === 'content' && !cms) setCms(getCMS()); }, [tab, cms]);
  const saveContent = () => { saveCMS(cms); setCmsMsg('Saved — applies to this preview.'); setTimeout(() => setCmsMsg(''), 2500); };

  if (!authed) {
    return (
      <div className="pt-[92px] min-h-screen grid place-items-center px-4">
        <div className="w-full max-w-sm card p-8 text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="font-display font-bold text-2xl text-[var(--ink)] mb-2">Admin access</h1>
          <p className="text-[var(--ink-2)] text-sm mb-6">Enter the admin PIN to manage FlexSpot.</p>
          <input
            type="password" inputMode="numeric" maxLength={12}
            className="field text-center text-2xl tracking-[0.4em] mb-4"
            placeholder="••••" value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (pin === ADMIN_PIN ? setAuthed(true) : flash('Wrong PIN.'))}
          />
          <button onClick={() => (pin === ADMIN_PIN ? setAuthed(true) : flash('Wrong PIN.'))} className="btn-primary w-full py-3">Unlock dashboard</button>
          {msg && <p className="text-red-500 text-sm mt-3">{msg}</p>}
          <p className="text-[11px] text-[var(--ink-3)] mt-4">Preview PIN: 1234 — client-side only, not real authentication. Set VITE_ADMIN_PIN before any production use.</p>
        </div>
      </div>
    );
  }

  const live = (spots || []).filter((s) => !s.pending);
  // Preview revenue = sum of approved manual payments only. Approved normal
  // submissions also create leaderboard spots, so summing spot amounts too
  // would double-count. Demo/preview totals are never "verified" revenue.
  const revenue = subs.filter((s) => s.status === 'approved').reduce((a, s) => a + (Number(s.amount) || 0), 0);

  return (
    <div className="pt-[92px] pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <div>
            <h1 className="font-display font-bold text-3xl text-[var(--ink)]">Admin dashboard</h1>
            <p className="text-[var(--ink-2)] text-sm mt-1">{IS_LIVE ? 'Connected to live backend 🟢' : 'Preview mode — local demo data 🟡'}</p>
          </div>
          <button onClick={() => { reload(); refresh && refresh(); flash('Refreshed.'); }} className="btn-ghost px-4 py-2 text-sm">↻ Refresh</button>
        </div>
        <p className="text-[11px] text-[var(--ink-3)] mb-8">Admin auth is a client-side preview PIN. Analytics, viewer counts and emails are simulated/preview-only.</p>

        {msg && <div className="mb-5 text-sm rounded-xl px-4 py-3 border" style={{ background: '#D1FAE5', borderColor: '#6EE7B7', color: '#065F46' }}>{msg}</div>}

        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${tab === t.id ? 'btn-primary' : 'btn-ghost'}`}>
              {t.label}{t.id === 'submissions' && pendingSubs.length > 0 && ` (${pendingSubs.length})`}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              <StatCard icon="👁️" label="Visitors online" value={viewers} sub="Simulated — preview only" />
              <StatCard icon="📈" label="Total visitors" value={compact(analytics.totalVisits)} sub="Preview analytics" />
              <StatCard icon="⚡" label="Claimed spots" value={live.length} />
              <StatCard icon="📥" label="Pending approvals" value={pendingSubs.length} />
              <StatCard icon="✅" label="Approved listings" value={subs.filter((s) => s.status === 'approved').length} />
              <StatCard icon="💰" label="Revenue (preview)" value={money(revenue)} sub="Manual USDT — preview only, not verified" />
            </div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-4">Top brands right now</h2>
            <div className="space-y-2">
              {live.slice(0, 5).map((s) => (
                <div key={s.slug} className="flex items-center gap-3 card p-3">
                  <RankBadge rank={s.rank} />
                  <BrandAvatar spot={s} size={38} />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[var(--ink)] text-sm truncate">{s.name}</div>
                    <div className="text-xs text-[var(--ink-3)]">{compact(s.views)} views · {compact(s.clicks)} clicks</div>
                  </div>
                  <div className="font-display font-bold text-[var(--ink)]">{money(s.amount)}</div>
                </div>
              ))}
            </div>
            <div className="card p-5 mt-8">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-[var(--ink)]">📧 Email confirmations</h3>
                <span className="pill-gray text-[10px] font-bold px-2 py-0.5 rounded-full">PREVIEW ONLY</span>
              </div>
              <p className="text-sm text-[var(--ink-2)]">No email provider is connected, so no emails are actually sent. When a provider is added, approved submitters will receive:</p>
              <div className="mt-3 rounded-xl border border-[var(--line)] p-4 text-sm text-[var(--ink-2)] bg-[var(--surface-2)]">
                <b className="text-[var(--ink)]">Subject:</b> Your FlexSpot is live! 🎉<br />
                <span className="text-[var(--ink-3)]">Hi {'{brand}'}, your spot is approved and ranking on the FlexSpot leaderboard…</span>
              </div>
            </div>
          </div>
        )}

        {tab === 'submissions' && (
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-4">Pending review ({pendingSubs.length})</h2>
            {pendingSubs.length === 0 ? <Empty icon="✅" text="All clear — no submissions waiting." /> : (
              <div className="space-y-4">
                {pendingSubs.map((s) => (
                  <SubmissionCard key={s.id} s={s} notes={notes} setNotes={setNotes}
                    onDecide={decide} onAddNote={addNote} setShotView={setShotView} />
                ))}
              </div>
            )}
            {decidedSubs.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-4">Decided ({decidedSubs.length})</h2>
                <div className="space-y-2">
                  {decidedSubs.map((s) => (
                    <div key={s.id} className="card p-4 flex items-center gap-3">
                      <BrandAvatar spot={{ name: s.brandName, logo: s.logo }} size={36} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[var(--ink)] text-sm truncate">{s.brandName}</div>
                        <div className="text-xs text-[var(--ink-3)]">{money(s.amount)} · {s.paymentMethod || '—'} · {timeAgo(s.reviewedAt || s.createdAt)}</div>
                      </div>
                      <StatusPill status={s.status} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'payments' && (
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Payment verification</h2>
            <p className="text-[var(--ink-2)] text-sm mb-5">Phase 1: manual USDT verification. Confirm each payment arrived in the wallet before approving the spot.</p>
            {pendingSubs.length === 0 ? <Empty icon="💳" text="No payments awaiting verification." /> : (
              <div className="space-y-4">
                {pendingSubs.map((s) => (
                  <div key={s.id} className="card p-5">
                    <div className="flex items-start gap-4 flex-wrap">
                      <BrandAvatar spot={{ name: s.brandName, logo: s.logo }} size={48} />
                      <div className="flex-1 min-w-[220px]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-[var(--ink)]">{s.brandName}</h3>
                          <StatusPill status={s.status} />
                        </div>
                        <div className="text-xs text-[var(--ink-2)] mt-1">👤 {s.email || 'no email'}</div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
                          <div><div className="label !mb-1">Amount</div><div className="font-bold text-[var(--ink)] text-sm">{money(s.amount)}</div></div>
                          <div><div className="label !mb-1">Network</div><div className="font-bold text-[var(--ink)] text-sm">{s.paymentMethod || '—'}</div></div>
                          <div><div className="label !mb-1">Submitted</div><div className="text-[var(--ink-2)]">{timeAgo(s.createdAt)}</div></div>
                          <div><div className="label !mb-1">Type</div><div className="text-[var(--ink-2)]">{s.isBoost ? `Boost → ${s.boostSlug}` : 'New spot'}</div></div>
                        </div>
                        <div className="mt-3">
                          <div className="label !mb-1">Transaction ID</div>
                          {s.paymentTxId ? (
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-2 py-1 break-all text-[var(--ink)]">{s.paymentTxId}</code>
                              <CopyBtn text={s.paymentTxId} />
                            </div>
                          ) : <span className="text-xs text-red-500 font-bold">Missing — flag before approving</span>}
                        </div>
                      </div>
                      {s.paymentScreenshot && (
                        <button onClick={() => setShotView(s.paymentScreenshot)} className="shrink-0">
                          <img src={s.paymentScreenshot} alt="Payment proof" className="w-28 h-28 object-cover rounded-xl border border-[var(--line)] hover:opacity-90" />
                          <div className="text-[11px] text-[var(--ink-3)] mt-1 text-center">Tap to enlarge</div>
                        </button>
                      )}
                    </div>
                    <textarea className="field mt-4 text-sm" rows={2} placeholder="Admin note (required to reject or request changes)…"
                      value={notes[s.id] || ''} onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))} />
                    <AICheck sub={s} allSubs={subs} />
                    <div className="flex gap-2.5 mt-3 flex-wrap">
                      <button onClick={() => decide(s.id, 'approved')} className="btn-primary px-5 py-2.5 text-sm">✓ Verify & approve</button>
                      <button onClick={() => decide(s.id, 'changes-requested')} className="btn-ghost px-5 py-2.5 text-sm">✎ Request changes</button>
                      <button onClick={() => decide(s.id, 'rejected')} className="px-5 py-2.5 text-sm rounded-[14px] border border-red-400/60 text-red-600 hover:bg-red-500/10 font-bold">✕ Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'manual' && (
          <ManualEntry spots={spots} onAdded={() => { reload(); refresh && refresh(); }} />
        )}

        {tab === 'analytics' && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-display font-bold text-xl text-[var(--ink)]">Analytics</h2>
              <span className="pill-gray text-[10px] font-bold px-2 py-0.5 rounded-full">PREVIEW DATA — SIMULATED</span>
            </div>
            <p className="text-[var(--ink-2)] text-sm mb-5">Local preview storage only. Never presented as live traffic.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              <StatCard icon="📈" label="Total visitors" value={compact(analytics.totalVisits)} />
              <StatCard icon="🖱️" label="Total clicks" value={compact(analytics.totalClicks)} />
              <StatCard icon="🎯" label="Conversion rate" value={`${analytics.conversionRate}%`} sub="visits → claims" />
              <StatCard icon="⚡" label="Claimed spots" value={analytics.claimedSpots} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <AnalyticsList title="Top pages" rows={analytics.byPath} />
              <AnalyticsList title="Top sources" rows={analytics.bySource} />
              <AnalyticsList title="Countries" rows={analytics.byCountry} />
              <div className="card p-5">
                <h3 className="font-bold text-[var(--ink)] mb-3">Top brands by views</h3>
                <div className="space-y-2">
                  {analytics.topBrands.map((b) => (
                    <div key={b.slug} className="flex items-center justify-between text-sm">
                      <span className="text-[var(--ink)] font-semibold truncate">{b.name}</span>
                      <span className="text-[var(--ink-3)] text-xs">{compact(b.views)} views · {compact(b.clicks)} clicks</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'content' && cms && (
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Content</h2>
            <p className="text-[var(--ink-2)] text-sm mb-5">Edits apply to this local preview. Connect the CMS backend before production.</p>
            <div className="card p-5 space-y-4 mb-4">
              <div><label className="label">Homepage headline</label><input className="field" value={cms.heroHeadline} onChange={(e) => setCms({ ...cms, heroHeadline: e.target.value })} /></div>
              <div><label className="label">Homepage subheadline</label><textarea className="field" rows={2} value={cms.heroSub} onChange={(e) => setCms({ ...cms, heroSub: e.target.value })} /></div>
              <div><label className="label">Announcement banner (empty = hidden)</label><input className="field" value={cms.announcement} onChange={(e) => setCms({ ...cms, announcement: e.target.value })} /></div>
              <div><label className="label">Rewards page text</label><textarea className="field" rows={2} value={cms.rewardsText} onChange={(e) => setCms({ ...cms, rewardsText: e.target.value })} /></div>
            </div>
            <div className="card p-5 mb-4">
              <h3 className="font-bold text-[var(--ink)] mb-3">FAQ</h3>
              <div className="space-y-3">
                {cms.faq.map((f, i) => (
                  <div key={i} className="rounded-xl border border-[var(--line)] p-3 space-y-2">
                    <input className="field text-sm font-bold" value={f.q} onChange={(e) => { const faq = [...cms.faq]; faq[i] = { ...faq[i], q: e.target.value }; setCms({ ...cms, faq }); }} placeholder="Question" />
                    <textarea className="field text-sm" rows={2} value={f.a} onChange={(e) => { const faq = [...cms.faq]; faq[i] = { ...faq[i], a: e.target.value }; setCms({ ...cms, faq }); }} placeholder="Answer" />
                    <button onClick={() => setCms({ ...cms, faq: cms.faq.filter((_, j) => j !== i) })} className="text-xs text-red-600 font-bold">Remove</button>
                  </div>
                ))}
              </div>
              <button onClick={() => setCms({ ...cms, faq: [...cms.faq, { q: '', a: '' }] })} className="btn-ghost px-4 py-2 text-sm mt-3">+ Add FAQ</button>
            </div>
            <button onClick={saveContent} className="btn-primary px-6 py-3 text-sm">Save content</button>
            {cmsMsg && <span className="ml-3 text-sm text-green-700 font-semibold">{cmsMsg}</span>}
          </div>
        )}

        {tab === 'fraud' && (
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Fraud monitoring</h2>
            <p className="text-[var(--ink-2)] text-sm mb-5">Preview-only heuristics: duplicates, missing payment proof, high-value claims. Spam protection ships with the production backend.</p>
            {fraudFlags.length === 0 ? <Empty icon="🛡️" text="No flags. The board looks clean." /> : (
              <div className="space-y-3">
                {fraudFlags.map((f, i) => (
                  <div key={i} className="fraud-card flex items-center gap-4 rounded-2xl p-4">
                    <span className="text-2xl">⚠️</span>
                    <div className="flex-1">
                      <div className="font-bold text-[var(--ink)] text-sm">{f.type}</div>
                      <div className="text-xs text-[var(--ink-2)]">{f.detail}</div>
                    </div>
                    {f.id && <button onClick={() => { flagSubmission(f.id, f.type); reload(); flash('Flagged for review.'); }} className="px-4 py-2 text-xs rounded-xl border border-red-400/60 text-red-600 hover:bg-red-500/10 font-bold">Flag</button>}
                  </div>
                ))}
              </div>
            )}
            <h3 className="font-bold text-[var(--ink)] mt-8 mb-3">Admin notes</h3>
            {subs.filter((s) => (s.adminNotes || []).length > 0).length === 0 ? (
              <p className="text-sm text-[var(--ink-3)]">No notes yet.</p>
            ) : (
              <div className="space-y-2">
                {subs.filter((s) => (s.adminNotes || []).length > 0).map((s) => (
                  <div key={s.id} className="card p-4">
                    <div className="font-bold text-sm text-[var(--ink)] mb-2">{s.brandName}</div>
                    {(s.adminNotes || []).map((n, j) => (
                      <div key={j} className="text-xs text-[var(--ink-2)] border-l-2 border-[var(--line)] pl-3 py-1 mb-1">
                        {n.text} <span className="text-[var(--ink-3)]">· {timeAgo(n.at)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {shotView && (
        <div className="fixed inset-0 z-[100] bg-black/70 grid place-items-center p-4" onClick={() => setShotView(null)}>
          <img src={shotView} alt="Payment proof full size" className="max-w-full max-h-[90vh] rounded-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

function SubmissionCard({ s, notes, setNotes, onDecide, onAddNote, setShotView }) {
  return (
    <div className="card p-5 border-l-4" style={{ borderLeftColor: '#F59E0B' }}>
      <div className="flex items-start gap-4">
        <BrandAvatar spot={{ name: s.brandName, logo: s.logo }} size={52} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-bold text-lg text-[var(--ink)]">{s.brandName}</h3>
            <StatusPill status={s.status} />
            {s.isBoost && <span className="pill-blue text-[10px] font-bold px-2 py-0.5 rounded-full">BOOST → {s.boostSlug}</span>}
          </div>
          {s.tagline && <p className="text-[var(--ink-2)] text-sm mt-1">{s.tagline}</p>}
          {s.description && <p className="text-[var(--ink-3)] text-xs mt-1">{s.description}</p>}
          <div className="flex gap-4 mt-2 text-xs text-[var(--ink-2)] flex-wrap">
            {s.website && <span>🌐 {s.website}</span>}
            <span>💰 {money(s.amount)}</span>
            <span>💳 {s.paymentMethod || '—'}</span>
            <span>🕐 {timeAgo(s.createdAt)}</span>
          </div>
          {s.email && <div className="text-xs text-[var(--ink-2)] mt-1">✉️ {s.email}</div>}
          {s.paymentTxId && <div className="text-xs mt-1 flex items-center gap-2"><span className="text-[var(--ink-3)]">TxID:</span><code className="bg-[var(--surface-2)] border border-[var(--line)] rounded px-1.5 py-0.5 break-all">{s.paymentTxId}</code><CopyBtn text={s.paymentTxId} /></div>}
          <div className="flex gap-2 mt-2 items-center">
            {s.paymentScreenshot && (
              <button onClick={() => setShotView(s.paymentScreenshot)}>
                <img src={s.paymentScreenshot} alt="proof" className="w-16 h-16 object-cover rounded-lg border border-[var(--line)]" />
              </button>
            )}
            {(s.fraudFlags || []).length > 0 && (
              <span className="text-[11px] font-bold text-red-600">⚠️ {s.fraudFlags.join(', ')}</span>
            )}
          </div>
          {(s.history || []).length > 0 && (
            <div className="mt-2 text-[11px] text-[var(--ink-3)]">
              {s.history.map((h, i) => <div key={i}>· {h.event}{h.decision ? `: ${h.decision}` : ''} — {timeAgo(h.at)}</div>)}
            </div>
          )}
        </div>
      </div>
      <textarea className="field mt-4 text-sm" rows={2} placeholder="Admin note (required to reject or request changes)…"
        value={notes[s.id] || ''} onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))} />
      <div className="flex gap-2.5 mt-3 flex-wrap">
        <button onClick={() => onDecide(s.id, 'approved')} className="btn-primary px-5 py-2.5 text-sm">✓ Approve & publish</button>
        <button onClick={() => onDecide(s.id, 'changes-requested')} className="btn-ghost px-5 py-2.5 text-sm">✎ Request changes</button>
        <button onClick={() => onDecide(s.id, 'rejected')} className="px-5 py-2.5 text-sm rounded-[14px] border border-red-400/60 text-red-600 hover:bg-red-500/10 font-bold">✕ Reject</button>
        <button onClick={() => onAddNote(s.id)} className="px-4 py-2.5 text-xs text-[var(--ink-3)] hover:text-[var(--ink)] font-bold">+ Save note only</button>
      </div>
    </div>
  );
}

function AnalyticsList({ title, rows }) {
  return (
    <div className="card p-5">
      <h3 className="font-bold text-[var(--ink)] mb-3">{title}</h3>
      {rows.length === 0 ? <p className="text-xs text-[var(--ink-3)]">No data yet.</p> : (
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.k} className="flex items-center justify-between text-sm">
              <span className="text-[var(--ink-2)] truncate">{r.k}</span>
              <span className="font-bold text-[var(--ink)]">{r.v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- AI cross-check (heuristic pre-check) ---------------- */
function runAICheck(sub, allSubs) {
  const checks = [];
  const ok = (label, pass, detail) => checks.push({ label, pass, detail });
  ok('Payment screenshot uploaded', !!sub.paymentScreenshot, sub.paymentScreenshot ? 'Image present — review it visually' : 'Missing — cannot verify payment');
  ok('Transaction ID plausible', !sub.paymentTxId || sub.paymentTxId.trim().length >= 6, sub.paymentTxId ? `"${sub.paymentTxId.slice(0, 24)}${sub.paymentTxId.length > 24 ? '…' : ''}"` : 'Not provided (optional)');
  ok('Amount sane', Number(sub.amount) >= 1, `${money(sub.amount)} claimed`);
  const dupTx = sub.paymentTxId && allSubs.some((o) => o.id !== sub.id && o.paymentTxId && o.paymentTxId.trim() === sub.paymentTxId.trim());
  ok('Transaction ID unique', !dupTx, dupTx ? 'Same TxID used on another submission!' : 'No reuse detected');
  const dupName = allSubs.some((o) => o.id !== sub.id && (o.brandName || '').toLowerCase().trim() === (sub.brandName || '').toLowerCase().trim());
  ok('Brand name unique', !dupName, dupName ? 'Same brand name submitted before' : 'No duplicate brand');
  ok('High-value manual review', Number(sub.amount) < 500, Number(sub.amount) >= 500 ? `${money(sub.amount)} — verify carefully` : 'Below manual-review threshold');
  return checks;
}

function AICheck({ sub, allSubs }) {
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const run = () => {
    setBusy(true);
    setTimeout(() => { setResult(runAICheck(sub, allSubs)); setBusy(false); }, 900);
  };
  const passed = result && result.every((c) => c.pass);
  return (
    <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm font-bold text-[var(--ink)]">🤖 AI cross-check</div>
        <button onClick={run} disabled={busy} className="btn-ghost px-4 py-2 text-xs disabled:opacity-60">
          {busy ? 'Checking…' : result ? 'Re-run check' : 'Run check'}
        </button>
      </div>
      {result && (
        <div className="mt-3 space-y-1.5">
          {result.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className={c.pass ? 'text-green-600' : 'text-red-500'}>{c.pass ? '✓' : '✕'}</span>
              <span className="font-semibold text-[var(--ink)]">{c.label}</span>
              <span className="text-[var(--ink-3)]">— {c.detail}</span>
            </div>
          ))}
          <div className={`text-xs font-bold mt-2 ${passed ? 'text-green-700' : 'text-amber-700'}`}>
            {passed ? '✓ Looks clean — still verify the screenshot before approving.' : '⚠️ Needs attention — review the flagged items.'}
          </div>
          <p className="text-[10px] text-[var(--ink-3)]">Heuristic pre-check (preview). Real on-chain verification ships with the production backend.</p>
        </div>
      )}
    </div>
  );
}

/* ---------------- Manual entry ---------------- */
function ManualEntry({ spots, onAdded }) {
  const [f, setF] = useState({ name: '', tagline: '', description: '', website: '', email: '', x: '', instagram: '', facebook: '', linkedin: '', logo: '', category: 'startups', amount: '10' });
  const [msg, setMsg] = useState('');
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const projectedRank = useMemo(() => {
    const amt = Math.max(1, Math.round((parseFloat(f.amount) || 1) * 100) / 100);
    const ranked = rank([...(spots || []), { slug: '__new__', amount: amt, joinedAt: Date.now() }]);
    return ranked.findIndex((s) => s.slug === '__new__') + 1;
  }, [f.amount, spots]);

  const handleLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 350 * 1024) { setMsg('Logo must be under 350KB.'); return; }
    const r = new FileReader();
    r.onload = () => set('logo', r.result);
    r.readAsDataURL(file);
  };

  const add = () => {
    setMsg('');
    if (f.name.trim().length < 2) { setMsg('Enter a brand name.'); return; }
    const amt = parseFloat(f.amount);
    if (!Number.isFinite(amt) || amt < 1) { setMsg('Amount must be at least $1.'); return; }
    const socials = {};
    if (f.x.trim()) socials.x = f.x.trim();
    if (f.instagram.trim()) socials.instagram = f.instagram.trim();
    if (f.facebook.trim()) socials.facebook = f.facebook.trim();
    if (f.linkedin.trim()) socials.linkedin = f.linkedin.trim();
    const spot = addManualSpot({
      name: f.name.trim(),
      tagline: f.tagline.trim(),
      description: f.description.trim(),
      website: f.website.trim(),
      email: f.email.trim(),
      socials,
      logo: f.logo || null,
      category: f.category,
      amount: amt,
    });
    setF({ name: '', tagline: '', description: '', website: '', email: '', x: '', instagram: '', facebook: '', linkedin: '', logo: '', category: 'startups', amount: '10' });
    setMsg(`✓ "${spot.name}" added — projected rank #${projectedRank}.`);
    onAdded && onAdded();
  };

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Manual entry</h2>
      <p className="text-[var(--ink-2)] text-sm mb-5">Add a brand directly to the leaderboard — e.g. someone paid you cash off-platform. Rank is computed by the same rule as everyone else.</p>
      <div className="card p-6 sm:p-8 space-y-5 max-w-2xl">
        {msg && <div className="text-sm rounded-xl px-4 py-3 border" style={{ background: '#D1FAE5', borderColor: '#6EE7B7', color: '#065F46' }}>{msg}</div>}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Brand name *</label>
            <input className="field" value={f.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Ahmed's Bakery" maxLength={60} />
          </div>
          <div>
            <label className="label">Amount (USD) *</label>
            <input className="field" inputMode="decimal" value={f.amount} onChange={(e) => set('amount', e.target.value.replace(/[^0-9.]/g, ''))} placeholder="10" />
          </div>
        </div>
        <div className="rounded-2xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 p-4 text-sm">
          <span className="text-[var(--ink-2)]">Projected rank with </span>
          <b className="text-[var(--ink)]">${f.amount || '0'}</b>
          <span className="text-[var(--ink-2)]"> → </span>
          <b className="text-[var(--gold-deep)] font-display text-lg">#{projectedRank}</b>
        </div>
        <div>
          <label className="label">Tagline</label>
          <input className="field" value={f.tagline} onChange={(e) => set('tagline', e.target.value)} placeholder="One line that hooks people" maxLength={100} />
        </div>
        <div>
          <label className="label">Category</label>
          <select className="field" value={f.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Short description</label>
          <textarea className="field" rows={3} value={f.description} onChange={(e) => set('description', e.target.value)} placeholder="What is this brand about?" maxLength={1000} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Website</label>
            <input className="field" value={f.website} onChange={(e) => set('website', e.target.value)} placeholder="yoursite.com" />
          </div>
          <div>
            <label className="label">Email (optional)</label>
            <input className="field" value={f.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
          </div>
        </div>
        <div>
          <label className="label">Social profiles (optional)</label>
          <div className="grid grid-cols-2 gap-3">
            <input className="field" placeholder="𝕏  @handle or link" value={f.x} onChange={(e) => set('x', e.target.value)} />
            <input className="field" placeholder="📸  Instagram" value={f.instagram} onChange={(e) => set('instagram', e.target.value)} />
            <input className="field" placeholder="📘  Facebook" value={f.facebook} onChange={(e) => set('facebook', e.target.value)} />
            <input className="field" placeholder="💼  LinkedIn" value={f.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="label">Logo / picture (optional)</label>
          <div className="flex items-center gap-3">
            {f.logo && <img src={f.logo} alt="" className="w-14 h-14 rounded-2xl object-cover border border-[var(--line)]" />}
            <label className="btn-ghost px-5 py-2.5 text-sm cursor-pointer">
              {f.logo ? 'Change picture' : 'Upload picture'}
              <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
            </label>
          </div>
        </div>
        <button onClick={add} className="btn-primary w-full py-3.5 text-[15px]">➕ Add to leaderboard</button>
      </div>
    </div>
  );
}
