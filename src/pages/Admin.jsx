// Admin dashboard — the single control room for FlexSpot.
// EVERYTHING here is REAL: real visitors, real page views, real deposits,
// real referrals. The public site shows tasteful display-lifted numbers
// (see src/lib/display.js); this dashboard never does.
import { useEffect, useMemo, useState } from 'react';
import { BrandAvatar, RankBadge } from '../components/SpotCard';
import { money, compact, timeAgo } from '../lib/format';
import {
  IS_LIVE,
  fetchAllSubmissions,
  reviewSubmission,
  addAdminNote,
  flagSubmission,
  getCMS,
  saveCMS,
  addManualSpot,
  rank,
  getAllReferrals,
  resetDemoData,
} from '../lib/store';
import { CATEGORIES } from '../lib/data';
import { useLiveOnline, getAnalyticsSummary, getVisitorTrail, clearAnalyticsData } from '../lib/analytics';
import { getDisplayTuning, saveDisplayTuning, displayOnlineCount, displayAmount } from '../lib/display';
import { useSiteSettings, IMAGE_HINTS } from '../lib/siteSettings.jsx';
import { getPendingClaim, clearPendingClaim, saveMember } from '../lib/member';
import { approveAndNotifyMember, rejectAndNotify, emailNotConfigured, listMembers, sendEngagement, spotUrl, listCentralSubmissions, decideCentral } from '../lib/emailClient';
import { projectedRank, importSubmissions } from '../lib/store';

// Fail closed: a static SPA cannot hold a real secret, and silently falling
// back to '1234' would ship an open admin gate. No PIN configured → the
// unlock form refuses to render (see the gate below).
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '';

const TABS = [
  { id: 'overview', label: '📊 Overview' },
  { id: 'live', label: '🟢 Live visitors' },
  { id: 'deposits', label: '💳 Deposits & receipts' },
  { id: 'members', label: '👥 Members' },
  { id: 'referrals', label: '🔗 Referrals' },
  { id: 'content', label: '🎨 Site Content' },
  { id: 'settings', label: '⚙️ Settings' },
];

const REAL = (
  <span className="text-[9px] font-extrabold tracking-widest bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 rounded-full px-2 py-0.5 align-middle ml-1.5">REAL</span>
);

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

function StatCard({ icon, label, value, sub, real }) {
  return (
    <div className="card p-4 sm:p-5">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-display font-bold text-2xl text-[var(--ink)]">{value}</div>
      <div className="text-[11px] text-[var(--ink-3)] uppercase tracking-wider font-semibold mt-1">
        {label}{real && REAL}
      </div>
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

/* ============================= MAIN ============================= */

// Login accounts (server-issued member logins) + engagement emails.
// Members are created automatically when a claim is approved: the buyer gets
// an email with their login (email = ID), password and IB number.
function LoginAccounts({ spots, flash }) {
  const [accounts, setAccounts] = useState(null);
  const [err, setErr] = useState('');
  const [sending, setSending] = useState('');
  const load = async () => {
    setErr('');
    const r = await listMembers();
    if (r.ok) setAccounts(r.members || []);
    else { setAccounts([]); setErr(r.error || 'could not load'); }
  };
  useEffect(() => { load(); }, []);
  const rankOf = (slug) => {
    const i = (spots || []).findIndex((s) => s.slug === slug);
    return i === -1 ? null : i + 1;
  };
  const send = async (m, template) => {
    const key = m.email + ':' + template;
    setSending(key);
    try {
      const name = String(m.brandName || '').split(' ')[0] || 'there';
      const url = spotUrl(m.slug);
      const data = template === 'welcome'
        ? { buyerName: name, brandName: m.brandName, spotUrl: url, ib: m.ib }
        : template === 'rank-milestone'
          ? { buyerName: name, brandName: m.brandName, rank: rankOf(m.slug) || '—', amount: m.amount || 0, spotUrl: url }
          : { buyerName: name, brandName: m.brandName, rank: rankOf(m.slug), amount: m.amount || 0, views: '—', spotUrl: url };
      const r = await sendEngagement({ template, to: m.email, data });
      flash(r.ok ? `✓ "${template}" sent to ${m.email}` : `Email failed: ${r.error || 'not configured'}`);
    } finally { setSending(''); }
  };
  return (
    <div className="card p-5 mt-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display font-bold text-base text-[var(--ink)]">🔑 Login accounts</h3>
        <button onClick={load} className="btn-ghost px-3 py-1.5 text-xs">↻ Refresh</button>
      </div>
      <p className="text-xs text-[var(--ink-2)] mb-4">Issued automatically on approval. Email = login ID · password + IB number sent in the approval email.</p>
      {accounts === null && <div className="text-sm text-[var(--ink-3)]">Loading…</div>}
      {accounts !== null && accounts.length === 0 && (
        <div className="text-sm text-[var(--ink-3)]">
          {err === 'member store not connected (connect Vercel KV)' || /not connected/i.test(err)
            ? 'Member store not connected yet — connect Vercel KV to enable logins (approval emails still work once RESEND_API_KEY is set).'
            : err ? `Couldn't load accounts: ${err}` : 'No login accounts yet — approve a claim to create the first one.'}
        </div>
      )}
      {accounts !== null && accounts.length > 0 && (
        <div className="space-y-2">
          {accounts.map((m) => (
            <div key={m.email} className="rounded-xl border border-[var(--line)] p-3 flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[180px]">
                <div className="font-bold text-sm text-[var(--ink)] truncate">{m.brandName}</div>
                <div className="text-xs text-[var(--ink-3)] truncate">{m.email} · <span className="font-mono font-bold text-[var(--ink-2)]">{m.ib}</span></div>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {[['welcome', '👋 Welcome'], ['rank-milestone', '🏆 Milestone'], ['weekly-digest', '📊 Digest']].map(([t, label]) => (
                  <button
                    key={t}
                    disabled={sending === m.email + ':' + t}
                    onClick={() => send(m, t)}
                    className="btn-ghost px-2.5 py-1.5 text-[11px] font-bold disabled:opacity-50"
                  >{sending === m.email + ':' + t ? '…' : label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Admin({ spots, refresh }) {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem('flexspot_admin_authed') === '1'; } catch { return false; }
  });
  const unlock = () => {
    try { sessionStorage.setItem('flexspot_admin_authed', '1'); } catch {}
    setAuthed(true);
  };
  const [tab, setTab] = useState('overview');
  const [msg, setMsg] = useState('');
  const [subs, setSubs] = useState([]);
  const [notes, setNotes] = useState({});
  const [queueNote, setQueueNote] = useState('');
  const [shotView, setShotView] = useState(null);
  const [cms, setCms] = useState(null);
  const [cmsMsg, setCmsMsg] = useState('');
  const [trailVid, setTrailVid] = useState(null);
  const online = useLiveOnline(1000);

  const reload = () => {
    setSubs(fetchAllSubmissions());
    // Pull the central queue (submissions from buyer devices) and merge it
    // into the local admin queue. Silent when offline / not configured.
    (async () => {
      try {
        const lists = await Promise.all([
          listCentralSubmissions('pending'),
          listCentralSubmissions('approved'),
          listCentralSubmissions('rejected'),
          listCentralSubmissions('changes-requested'),
        ]);
        const all = [];
        lists.forEach((x) => { if (x && x.ok) all.push(...x.submissions); });
        if (all.length > 0) {
          const n = importSubmissions(all);
          if (n > 0) {
            setSubs(fetchAllSubmissions());
            setQueueNote(`⤵ Synced ${n} submission${n > 1 ? 's' : ''} from buyer devices`);
            setTimeout(() => setQueueNote(''), 5000);
          }
        }
      } catch { /* local queue still works */ }
    })();
  };
  useEffect(() => { reload(); }, []);

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3200); };

  const pendingSubs = useMemo(() => subs.filter((s) => s.status === 'pending'), [subs]);
  const decidedSubs = useMemo(() => subs.filter((s) => s.status !== 'pending'), [subs]);

  const decide = (id, decision) => {
    const note = (notes[id] || '').trim();
    if (decision !== 'approved' && !note) { flash('Add a note explaining the decision first.'); return; }
    if (decision === 'rejected' && !confirm('Reject this submission?')) return;
    const updated = reviewSubmission(id, decision, note);
    // Mirror the decision to the central queue (buyer devices / audit trail).
    // Fire-and-forget: the local decision above is the source of truth here.
    try { decideCentral(id, decision, note); } catch {}
    let emailHandled = false;
    if (decision === 'approved' && updated && !updated.isBoost) {
      // Close the two-step member loop: the dashboard was showing
      // "Payment under review" from the staged pending claim — clear it now
      // and activate the member account so the member dashboard appears.
      const pc = getPendingClaim();
      if (pc && pc.slug === updated.slug) clearPendingClaim();
      saveMember({ name: updated.brandName, email: updated.email || '', spotSlug: updated.slug, createdAt: Date.now() });
      // Email: issue the member's login credentials + IB number, then send
      // the "you're live" email (rank, spot URL, credentials). Async — the
      // approval itself is already saved above.
      if (updated.email) {
        emailHandled = true;
        (async () => {
          try {
            const withNew = [...(spots || []), { slug: updated.slug, amount: updated.amount, joinedAt: updated.createdAt }];
            const { rank: newRank } = projectedRank(withNew, updated.slug, 0);
            const r = await approveAndNotifyMember({
              email: updated.email, buyerName: updated.brandName, brandName: updated.brandName,
              slug: updated.slug, amount: updated.amount, rank: newRank,
            });
            if (r.ok && r.emailSent) flash(`✓ Approved — live at #${newRank}. Login email sent to buyer (IB ${r.ib}).`);
            else if (r.ok) flash(`✓ Approved — live at #${newRank}. Member created (IB ${r.ib}) but email failed: ${r.error || 'email not configured'}.`);
            else if (emailNotConfigured(r)) flash(`✓ Approved — live at #${newRank}. Email not configured yet (add RESEND_API_KEY).`);
            else flash(`✓ Approved — live at #${newRank}. Member email failed: ${r.error || 'unknown'}.`);
          } catch (e) { flash('✓ Approved — but the login email failed to send.'); }
        })();
      }
    } else if (decision === 'rejected' && updated && updated.email) {
      emailHandled = true;
      (async () => {
        try {
          const r = await rejectAndNotify({ email: updated.email, buyerName: updated.brandName, brandName: updated.brandName, reason: note });
          flash(r.ok ? 'Submission rejected — buyer notified by email.' : `Rejected. (Email failed: ${r.error || 'not configured'})`);
        } catch (e) { flash('Rejected. (Email failed to send.)'); }
      })();
    }
    setNotes((n) => ({ ...n, [id]: '' }));
    reload(); refresh && refresh();
    if (!emailHandled) flash(decision === 'approved' ? '✓ Approved — spot is now live on the leaderboard.'
      : decision === 'rejected' ? 'Submission rejected.'
      : 'Changes requested — saved on this submission (no email sent in preview).');
  };

  const addNote = (id) => {
    const t = (notes[id] || '').trim();
    if (!t) return;
    addAdminNote(id, t);
    setNotes((n) => ({ ...n, [id]: '' }));
    reload(); flash('Note saved.');
  };

  const analytics = useMemo(() => getAnalyticsSummary(), [tab, subs, online.length]);

  const referrals = useMemo(() => (tab === 'referrals' ? getAllReferrals() : []), [tab, subs]);

  const members = useMemo(() => {
    // Members = everyone who ever submitted a claim/deposit, grouped by email or brand.
    const map = {};
    subs.forEach((s) => {
      const key = (s.email || '').trim().toLowerCase() || 'brand:' + (s.brandName || '').toLowerCase();
      if (!map[key]) map[key] = { key, name: s.brandName, email: s.email, spent: 0, deposits: 0, joinedAt: s.createdAt, approved: 0, pending: 0 };
      const m = map[key];
      m.deposits += 1;
      if (s.status === 'approved') { m.spent += Number(s.amount) || 0; m.approved += 1; }
      if (s.status === 'pending') m.pending += 1;
      if (s.createdAt < m.joinedAt) m.joinedAt = s.createdAt;
      if (!m.email && s.email) m.email = s.email;
    });
    return Object.values(map).sort((a, b) => b.spent - a.spent);
  }, [subs]);

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
      // Central-queue submissions keep the screenshot on the buyer's device;
      // the flag + transaction ID is the verifiable proof there.
      if (!s.paymentScreenshot && !s.hasRemoteScreenshot) flags.push({ type: 'Missing payment screenshot', detail: `${s.brandName} — no screenshot uploaded`, id: s.id });
      if (s.amount >= 500) flags.push({ type: 'High-value claim', detail: `${s.brandName} — ${money(s.amount)} deserves a manual check`, id: s.id });
    });
    return flags;
  }, [spots, subs]);

  useEffect(() => { if (tab === 'content' && !cms) setCms(getCMS()); }, [tab, cms]);
  const saveContent = () => { saveCMS(cms); setCmsMsg('Saved — applies to this browser\'s preview.'); setTimeout(() => setCmsMsg(''), 2500); };

  if (!authed) {
    return (
      <div className="pt-[92px] min-h-screen grid place-items-center px-4">
        <div className="w-full max-w-sm card p-8 text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="font-display font-bold text-2xl text-[var(--ink)] mb-2">Admin access</h1>
          {!ADMIN_PIN ? (
            <p className="text-[var(--ink-2)] text-sm leading-relaxed">
              Admin access isn't configured for this build — no PIN was set at build time.
              Rebuild with <span className="font-mono">VITE_ADMIN_PIN</span> to enable it.
            </p>
          ) : (
            <>
              <p className="text-[var(--ink-2)] text-sm mb-6">Enter the admin PIN to manage FlexSpot.</p>
              <input
                type="password" maxLength={64} autoComplete="current-password"
                className="field text-center text-2xl tracking-[0.4em] mb-4"
                placeholder="••••" value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (pin === ADMIN_PIN ? unlock() : flash('Wrong PIN.'))}
              />
              <button onClick={() => (pin === ADMIN_PIN ? unlock() : flash('Wrong PIN.'))} className="btn-primary w-full py-3">Unlock dashboard</button>
              {msg && <p className="text-red-500 text-sm mt-3">{msg}</p>}
            </>
          )}
          <p className="text-[11px] text-[var(--ink-3)] mt-4">Client-side gate only — not real authentication. Set VITE_ADMIN_PIN before any production use.</p>
        </div>
      </div>
    );
  }

  const live = (spots || []).filter((s) => !s.pending);
  const approvedSubs = subs.filter((s) => s.status === 'approved');
  const revenue = approvedSubs.reduce((a, s) => a + (Number(s.amount) || 0), 0);
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const depositsToday = subs.filter((s) => s.createdAt >= todayStart.getTime()).length;
  const fakeReceipts = subs.filter((s) => (s.fraudFlags || []).length > 0).length;

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
        <p className="text-[11px] text-[var(--ink-3)] mb-8">Every number on this page is <b className="text-emerald-600 dark:text-emerald-400">REAL</b> (this browser's actual data). The public site shows display-lifted numbers — tune them in ⚙️ Settings.</p>

        {msg && <div className="mb-5 text-sm rounded-xl px-4 py-3 border" style={{ background: '#D1FAE5', borderColor: '#6EE7B7', color: '#065F46' }}>{msg}</div>}

        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors min-h-[44px] ${tab === t.id ? 'btn-primary' : 'btn-ghost'}`}>
              {t.label}{t.id === 'deposits' && pendingSubs.length > 0 && ` (${pendingSubs.length})`}
              {t.id === 'live' && online.length > 0 && ` (${online.length})`}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <OverviewTab
            online={online} analytics={analytics} live={live} spots={spots}
            subs={subs} pendingSubs={pendingSubs} revenue={revenue}
            depositsToday={depositsToday} fakeReceipts={fakeReceipts}
            fraudFlags={fraudFlags} refresh={() => { reload(); refresh && refresh(); }}
          />
        )}

        {tab === 'live' && (
          <LiveTab online={online} onTrail={setTrailVid} />
        )}

        {tab === 'deposits' && (
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Deposits & receipts{REAL}</h2>
            <p className="text-[var(--ink-2)] text-sm mb-1">Every claim/boost submission with its payment receipt. Approve → the amount credits the leaderboard automatically. Reject → marked and out of the queue.</p>
            {queueNote && <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-4">{queueNote}</p>}
            {!queueNote && <div className="mb-4" />}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              <StatCard icon="⏳" label="Awaiting review" value={pendingSubs.length} real />
              <StatCard icon="✅" label="Approved" value={approvedSubs.length} real />
              <StatCard icon="💰" label="Deposits today" value={depositsToday} real />
              <StatCard icon="⚠️" label="Flagged receipts" value={fakeReceipts} sub="Marked suspicious — check below" real />
            </div>
            <h3 className="font-bold text-[var(--ink)] mb-3">Pending review ({pendingSubs.length})</h3>
            {pendingSubs.length === 0 ? <Empty icon="✅" text="All clear — no deposits waiting." /> : (
              <div className="space-y-4 mb-10">
                {pendingSubs.map((s) => (
                  <SubmissionCard key={s.id} s={s} notes={notes} setNotes={setNotes}
                    onDecide={decide} onAddNote={addNote} setShotView={setShotView} allSubs={subs} />
                ))}
              </div>
            )}
            {fraudFlags.length > 0 && (
              <div className="mb-10">
                <h3 className="font-bold text-[var(--ink)] mb-3">🚩 Fraud flags</h3>
                <div className="space-y-2">
                  {fraudFlags.map((f, i) => (
                    <div key={i} className="fraud-card flex items-center gap-3 rounded-2xl p-3.5">
                      <span className="text-xl">⚠️</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[var(--ink)] text-sm">{f.type}</div>
                        <div className="text-xs text-[var(--ink-2)] truncate">{f.detail}</div>
                      </div>
                      {f.id && <button onClick={() => { flagSubmission(f.id, f.type); reload(); flash('Flagged for review.'); }} className="px-4 py-2.5 text-xs rounded-xl border border-red-400/60 text-red-600 hover:bg-red-500/10 font-bold min-h-[44px]">Flag</button>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {decidedSubs.length > 0 && (
              <div>
                <h3 className="font-bold text-[var(--ink)] mb-3">Decided ({decidedSubs.length})</h3>
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

        {tab === 'members' && (
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Members{REAL}</h2>
            <p className="text-[var(--ink-2)] text-sm mb-5">Everyone who ever submitted a claim or deposit — real accounts, real spend. {members.length} total.</p>
            {members.length === 0 ? <Empty icon="👥" text="No members yet — the first claim will create the first member." /> : (
              <div className="space-y-2">
                {members.map((m) => (
                  <div key={m.key} className="card p-4 flex items-center gap-3">
                    <BrandAvatar spot={{ name: m.name }} size={40} />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[var(--ink)] text-sm truncate">{m.name}</div>
                      <div className="text-xs text-[var(--ink-3)]">{m.email || 'no email'} · joined {timeAgo(m.joinedAt)}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display font-bold text-[var(--ink)]">{money(m.spent)}</div>
                      <div className="text-[10px] text-[var(--ink-3)] uppercase tracking-wider">{m.deposits} deposits · {m.approved} approved{m.pending > 0 && ` · ${m.pending} pending`}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <LoginAccounts spots={spots} flash={flash} />
          </div>
        )}

        {tab === 'referrals' && (
          <ReferralsTab referrals={referrals} />
        )}

        {tab === 'content' && (
          <SiteContentTab cms={cms} setCms={setCms} onSave={saveContent} cmsMsg={cmsMsg} />
        )}

        {tab === 'settings' && (
          <SettingsTab flash={flash} reload={reload} refresh={refresh} />
        )}
      </div>

      {shotView && (
        <div className="fixed inset-0 z-[100] bg-black/70 grid place-items-center p-4" onClick={() => setShotView(null)}>
          <img src={shotView} alt="Payment proof full size" className="max-w-full max-h-[90vh] rounded-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {trailVid && (
        <VisitorTrailModal vid={trailVid} onClose={() => setTrailVid(null)} />
      )}
    </div>
  );
}

/* ============================= OVERVIEW ============================= */

function OverviewTab({ online, analytics, live, spots, subs, pendingSubs, revenue, depositsToday, fakeReceipts, fraudFlags, refresh }) {
  const [showManual, setShowManual] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard icon="🟢" label="Online now" value={online.length} sub={`Public shows ≈${displayOnlineCount(online.length)}`} real />
        <StatCard icon="📅" label="Visits today" value={compact(analytics.visitsToday)} sub={`${analytics.visitorsToday} unique`} real />
        <StatCard icon="🗓️" label="Visits yesterday" value={compact(analytics.visitsYesterday)} sub={`${analytics.visitorsYesterday} unique`} real />
        <StatCard icon="🌍" label="All-time visitors" value={compact(analytics.visitorsAllTime)} sub={`${compact(analytics.pageViewsAllTime)} page views`} real />
        <StatCard icon="💰" label="Revenue (approved)" value={money(revenue)} sub="Manual USDT — verify on-chain" real />
        <StatCard icon="💳" label="Deposits today" value={depositsToday} real />
        <StatCard icon="⚠️" label="Flagged receipts" value={fakeReceipts} real />
        <StatCard icon="⏳" label="Pending approvals" value={pendingSubs.length} real />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="card p-5">
          <h3 className="font-bold text-[var(--ink)] mb-1">📄 Top pages{REAL}</h3>
          <p className="text-[11px] text-[var(--ink-3)] mb-3">Where visitors spend their time</p>
          {analytics.topPages.length === 0 ? <p className="text-xs text-[var(--ink-3)]">No page views recorded yet.</p> : (
            <div className="space-y-2">
              {analytics.topPages.map((r) => (
                <div key={r.k} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[var(--ink-2)] truncate font-mono text-xs">{r.k}</span>
                  <span className="font-bold text-[var(--ink)] shrink-0">{compact(r.v)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-[var(--ink)] mb-1">📱 Device split{REAL}</h3>
          <p className="text-[11px] text-[var(--ink-3)] mb-3">Mobile vs desktop visitors</p>
          <DeviceBar analytics={analytics} />
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-[var(--ink)] mb-1">🔗 Traffic sources{REAL}</h3>
          <p className="text-[11px] text-[var(--ink-3)] mb-3">Where visitors come from</p>
          {analytics.topSources.length === 0 ? <p className="text-xs text-[var(--ink-3)]">No data yet.</p> : (
            <div className="space-y-2">
              {analytics.topSources.map((r) => (
                <div key={r.k} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[var(--ink-2)] truncate">{r.k}</span>
                  <span className="font-bold text-[var(--ink)] shrink-0">{compact(r.v)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-[var(--ink)] mb-1">🎯 Funnel events{REAL}</h3>
          <p className="text-[11px] text-[var(--ink-3)] mb-3">What visitors actually do</p>
          <Funnel analytics={analytics} />
        </div>
      </div>

      <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-4">Top brands right now</h2>
      <div className="space-y-2 mb-8">
        {live.slice(0, 5).map((s) => (
          <div key={s.slug} className="flex items-center gap-3 card p-3">
            <RankBadge rank={s.rank} />
            <BrandAvatar spot={s} size={38} />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[var(--ink)] text-sm truncate">{s.name}</div>
              <div className="text-xs text-[var(--ink-3)]">{compact(s.views)} views · {compact(s.clicks)} clicks</div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display font-bold text-[var(--ink)]">{money(s.amount)}</div>
              <div className="text-[10px] text-[var(--ink-3)]">public ≈{money(displayAmount(s.amount))}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <button onClick={() => setShowManual((v) => !v)} className="w-full flex items-center justify-between min-h-[44px]">
          <span className="font-bold text-[var(--ink)]">➕ Manual entry <span className="text-xs font-normal text-[var(--ink-3)]">(cash paid off-platform)</span></span>
          <span className={`transition-transform ${showManual ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {showManual && <div className="pt-4 border-t border-[var(--line)] mt-2"><ManualEntry spots={spots} onAdded={() => { refresh(); }} /></div>}
      </div>
    </div>
  );
}

function DeviceBar({ analytics }) {
  const { mobile, desktop } = analytics.deviceSplit;
  const total = mobile + desktop;
  if (!total) return <p className="text-xs text-[var(--ink-3)]">No data yet.</p>;
  const mp = Math.round((mobile / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs font-bold mb-2">
        <span className="text-[var(--ink)]">📱 Mobile {mp}%</span>
        <span className="text-[var(--ink)]">🖥️ Desktop {100 - mp}%</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${mp}%` }} />
      </div>
      <div className="text-[11px] text-[var(--ink-3)] mt-2">{compact(mobile)} mobile · {compact(desktop)} desktop heartbeats</div>
    </div>
  );
}

const FUNNEL_LABELS = {
  claim_open: '👀 Opened claim page',
  boost_open: '⚡ Opened boost page',
  deposit_submit: '💳 Submitted payment',
  share: '🔗 Shared a brand',
  referral_created: '🤝 Created referral link',
};

function Funnel({ analytics }) {
  const rows = Object.entries(FUNNEL_LABELS).map(([k, label]) => ({ k, label, v: analytics.eventsByName[k] || 0 }));
  const max = Math.max(1, ...rows.map((r) => r.v));
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.k}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--ink-2)] font-semibold">{r.label}</span>
            <span className="font-bold text-[var(--ink)]">{r.v}</span>
          </div>
          <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.max(3, (r.v / max) * 100)}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

/* ============================= LIVE ============================= */

function LiveTab({ online, onTrail }) {
  if (!online.length) {
    return (
      <div>
        <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Live visitors{REAL}</h2>
        <Empty icon="🟢" text="Nobody online right now — open the site in another tab and you'll appear here within 10 seconds." />
      </div>
    );
  }
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Live visitors ({online.length}){REAL}</h2>
      <p className="text-[var(--ink-2)] text-sm mb-5">Refreshing every second. Tap a visitor to see their full trail.</p>
      <div className="space-y-2">
        {online.map((v) => (
          <button key={v.vid} onClick={() => onTrail(v.vid)}
            className="w-full card p-4 flex items-center gap-3 text-left hover:border-[var(--blaze)] transition-colors min-h-[64px]">
            <span className="live-dot shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs font-bold text-[var(--ink)] truncate">{v.path}</div>
              <div className="text-[11px] text-[var(--ink-3)] truncate">
                {v.device === 'mobile' ? '📱' : '🖥️'} {v.device} · here {v.dwellSec < 5 ? 'just arrived' : `${v.dwellSec}s`} · {v.ref ? `from ${(() => { try { return new URL(v.ref).hostname; } catch { return 'referral'; } })()}` : 'direct'}
              </div>
            </div>
            <span className="text-xs font-bold text-[var(--blaze)] shrink-0">Trail →</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function VisitorTrailModal({ vid, onClose }) {
  const trail = useMemo(() => getVisitorTrail(vid), [vid]);
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 grid place-items-center p-4" onClick={onClose}>
      <div className="card max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-[var(--ink)]">Visitor trail{REAL}</h3>
          <button onClick={onClose} className="btn-ghost w-11 h-11 rounded-full">✕</button>
        </div>
        <div className="font-mono text-[11px] text-[var(--ink-3)] break-all mb-4">{vid}</div>
        {trail.length === 0 ? <p className="text-sm text-[var(--ink-3)]">No trail yet.</p> : (
          <div className="space-y-1.5">
            {trail.map((t, i) => (
              <div key={i} className="flex items-start gap-3 text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--line)] px-3.5 py-2.5">
                <span className="text-base shrink-0">{t.kind === 'page' ? '📄' : '⚡'}</span>
                <div className="min-w-0">
                  <div className="font-semibold text-[var(--ink)] text-[13px] break-all">{t.kind === 'page' ? t.label : t.label}</div>
                  {t.props && <div className="text-[11px] text-[var(--ink-3)] font-mono break-all">{JSON.stringify(t.props)}</div>}
                  <div className="text-[11px] text-[var(--ink-3)]">{timeAgo(t.at)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================= REFERRALS ============================= */

function ReferralsTab({ referrals }) {
  const totals = useMemo(() => ({
    codes: referrals.length,
    visits: referrals.reduce((a, r) => a + (r.visits || 0), 0),
  }), [referrals]);
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Referrals{REAL}</h2>
      <p className="text-[var(--ink-2)] text-sm mb-5">Every referral code and the visits it brought.</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard icon="🔗" label="Codes" value={totals.codes} real />
        <StatCard icon="👁️" label="Referral visits" value={compact(totals.visits)} real />
      </div>
      {referrals.length === 0 ? <Empty icon="🔗" text="No referral codes created yet." /> : (
        <div className="space-y-2">
          {referrals.map((r) => (
            <div key={r.code} className="card p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[var(--ink)] text-sm">{r.name}</span>
                  <code className="text-[11px] bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-2 py-0.5 text-[var(--ink-2)]">{r.code}</code>
                  {r.demo && <span className="text-[9px] font-bold text-[var(--ink-3)] uppercase tracking-wider">demo</span>}
                </div>
                <div className="text-xs text-[var(--ink-3)] mt-0.5">→ {r.spotSlug} · created {timeAgo(r.createdAt)}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-[var(--ink)] text-sm">{r.visits} visits</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================= SITE CONTENT (CMS) ============================= */

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

function ImageField({ label, hint, value, onChange, onMsg }) {
  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 400 * 1024) {
      onMsg(`⚠️ "${file.name}" is ${Math.round(file.size / 1024)}KB — over 400KB. It will slow mobile loading; compress it first (e.g. squoosh.app).`);
    } else {
      onMsg('');
    }
    onChange(await fileToDataUrl(file));
  };
  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex items-center gap-3 flex-wrap">
        {value && <img src={value} alt="" className="w-16 h-16 rounded-2xl object-cover border border-[var(--line)] bg-[var(--surface-2)]" />}
        <div className="flex-1 min-w-[200px] space-y-2">
          <input className="field text-sm" placeholder="https://… image URL" value={value?.startsWith('data:') ? '' : (value || '')} onChange={(e) => onChange(e.target.value)} />
          <label className="btn-ghost px-4 py-2 text-xs cursor-pointer inline-block min-h-[44px] leading-[28px]">
            📤 Upload image
            <input type="file" accept="image/*" className="hidden" onChange={pick} />
          </label>
        </div>
      </div>
      <p className="text-[11px] text-[var(--ink-3)] mt-1.5">📐 {hint}</p>
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-left min-h-[56px]">
      <span>
        <span className="block text-sm font-bold text-[var(--ink)]">{label}</span>
        {desc && <span className="block text-[11px] text-[var(--ink-3)] mt-0.5">{desc}</span>}
      </span>
      <span className={`shrink-0 w-12 h-7 rounded-full transition-colors relative ${checked ? 'bg-[var(--green)]' : 'bg-[var(--line)]'}`}>
        <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${checked ? 'left-6' : 'left-1'}`} />
      </span>
    </button>
  );
}

function SiteContentTab({ cms, setCms, onSave, cmsMsg }) {
  const { settings, updateSection, reset } = useSiteSettings();
  const [msg, setMsg] = useState('');
  const [section, setSection] = useState('hero');
  if (!cms) return null;

  const flashLocal = (m) => { setMsg(m); setTimeout(() => setMsg(''), 4000); };
  const setS = (sec, k, v) => updateSection(sec, { [k]: v });

  const SECTIONS = [
    { id: 'hero', label: '🦸 Hero' },
    { id: 'dancer', label: '🕺 Dancer' },
    { id: 'champion', label: '👑 Champion card' },
    { id: 'announce', label: '📣 Announcement' },
    { id: 'cta', label: '🎯 CTAs' },
    { id: 'faq', label: '❓ FAQ & text' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
        <h2 className="font-display font-bold text-xl text-[var(--ink)]">Site Content</h2>
        <button
          onClick={() => { if (confirm('Reset ALL site content to defaults? Your text and image changes will be lost.')) { reset(); flashLocal('✓ Reset to defaults.'); } }}
          className="btn-ghost px-4 py-2 text-xs min-h-[44px]"
        >↺ Reset to defaults</button>
      </div>
      <p className="text-[var(--ink-2)] text-sm mb-5">Changes apply <b className="text-[var(--ink)]">instantly</b> — no reload, no rebuild. Text fields update the live site the moment you type.</p>
      {(msg || cmsMsg) && <div className="mb-5 text-sm rounded-xl px-4 py-3 border" style={{ background: '#D1FAE5', borderColor: '#6EE7B7', color: '#065F46' }}>{msg || cmsMsg}</div>}

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap min-h-[44px] ${section === s.id ? 'btn-primary' : 'btn-ghost'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {section === 'hero' && (
        <div className="card p-5 sm:p-6 space-y-4">
          <div><label className="label">Eyebrow (small badge above headline)</label><input className="field" value={settings.hero.eyebrow} onChange={(e) => setS('hero', 'eyebrow', e.target.value)} /></div>
          <div><label className="label">Headline — line 1</label><input className="field" value={settings.hero.titleA} onChange={(e) => setS('hero', 'titleA', e.target.value)} /></div>
          <div><label className="label">Headline — line 2</label><input className="field" value={settings.hero.titleB} onChange={(e) => setS('hero', 'titleB', e.target.value)} /></div>
          <div><label className="label">Subheadline</label><textarea className="field" rows={3} value={settings.hero.subtitle} onChange={(e) => setS('hero', 'subtitle', e.target.value)} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label">Primary button text</label><input className="field" value={settings.hero.ctaPrimary} onChange={(e) => setS('hero', 'ctaPrimary', e.target.value)} /></div>
            <div><label className="label">Secondary button text</label><input className="field" value={settings.hero.ctaSecondary} onChange={(e) => setS('hero', 'ctaSecondary', e.target.value)} /></div>
          </div>
          <ImageField label="Hero champion photo" hint={IMAGE_HINTS.heroImage} value={settings.hero.heroImage} onChange={(v) => setS('hero', 'heroImage', v)} onMsg={flashLocal} />
          <div><label className="label">Photo alt text (SEO)</label><input className="field" value={settings.hero.heroImageAlt} onChange={(e) => setS('hero', 'heroImageAlt', e.target.value)} /></div>
        </div>
      )}

      {section === 'dancer' && (
        <div className="card p-5 sm:p-6 space-y-4">
          <Toggle label="🕺 Show the dancing hype-man" desc="The dancing character next to the champion photo. Turn off to remove it from the site instantly."
            checked={settings.dancer.enabled} onChange={(v) => setS('dancer', 'enabled', v)} />
          <ImageField label="Dancer image" hint={IMAGE_HINTS.dancerImage} value={settings.dancer.image} onChange={(v) => setS('dancer', 'image', v)} onMsg={flashLocal} />
          <Toggle label="Show “trending” sticker" desc="The little green badge above the dancer."
            checked={settings.dancer.showSticker} onChange={(v) => setS('dancer', 'showSticker', v)} />
          <div><label className="label">Sticker text</label><input className="field" value={settings.dancer.stickerText} onChange={(e) => setS('dancer', 'stickerText', e.target.value)} /></div>
          <div>
            <label className="label">Dancer size (desktop px, 64–160)</label>
            <input type="range" min={64} max={160} step={4} value={settings.dancer.size || 128}
              onChange={(e) => setS('dancer', 'size', Number(e.target.value))} className="w-full accent-[#7C3AED]" />
            <div className="text-xs text-[var(--ink-3)] mt-1">Current: {settings.dancer.size || 128}px desktop · mobile auto-scales (~80px)</div>
          </div>
        </div>
      )}

      {section === 'champion' && (
        <div className="card p-5 sm:p-6 space-y-4">
          <Toggle label="Show champion brand card" desc="The glass card with the #1 brand under the champion photo."
            checked={settings.champion.showLeaderCard} onChange={(v) => setS('champion', 'showLeaderCard', v)} />
          <div><label className="label">Dethrone button text</label><input className="field" value={settings.champion.ctaLabel} onChange={(e) => setS('champion', 'ctaLabel', e.target.value)} /></div>
          <div><label className="label">Caption under the button</label><input className="field" value={settings.champion.caption} onChange={(e) => setS('champion', 'caption', e.target.value)} /></div>
        </div>
      )}

      {section === 'announce' && (
        <div className="card p-5 sm:p-6 space-y-4">
          <Toggle label="📣 Show announcement bar" desc="A banner across the top of the homepage — promos, events, anything."
            checked={settings.announcement.enabled} onChange={(v) => setS('announcement', 'enabled', v)} />
          <div><label className="label">Announcement text</label><input className="field" value={settings.announcement.text} onChange={(e) => setS('announcement', 'text', e.target.value)} placeholder="🔥 Double boost weekend…" /></div>
          <div><label className="label">Link (optional, e.g. /leaderboard)</label><input className="field" value={settings.announcement.link} onChange={(e) => setS('announcement', 'link', e.target.value)} placeholder="/claim" /></div>
        </div>
      )}

      {section === 'cta' && (
        <div className="card p-5 sm:p-6 space-y-4">
          <h3 className="font-bold text-[var(--ink)]">Claim card (overlapping the champion photo)</h3>
          <div><label className="label">Title</label><input className="field" value={settings.claimCard.title} onChange={(e) => setS('claimCard', 'title', e.target.value)} /></div>
          <div><label className="label">Tagline</label><input className="field" value={settings.claimCard.tagline} onChange={(e) => setS('claimCard', 'tagline', e.target.value)} /></div>
          <div><label className="label">Button text</label><input className="field" value={settings.claimCard.ctaLabel} onChange={(e) => setS('claimCard', 'ctaLabel', e.target.value)} /></div>
          <h3 className="font-bold text-[var(--ink)] pt-2">Bottom CTA band (dark section)</h3>
          <div><label className="label">Eyebrow badge</label><input className="field" value={settings.ctaBand.eyebrow} onChange={(e) => setS('ctaBand', 'eyebrow', e.target.value)} /></div>
          <div><label className="label">Title</label><input className="field" value={settings.ctaBand.title} onChange={(e) => setS('ctaBand', 'title', e.target.value)} /></div>
          <div><label className="label">Subtitle</label><textarea className="field" rows={2} value={settings.ctaBand.subtitle} onChange={(e) => setS('ctaBand', 'subtitle', e.target.value)} /></div>
          <div><label className="label">Button text</label><input className="field" value={settings.ctaBand.ctaLabel} onChange={(e) => setS('ctaBand', 'ctaLabel', e.target.value)} /></div>
        </div>
      )}

      {section === 'faq' && (
        <div>
          <div className="card p-5 sm:p-6 space-y-4 mb-4">
            <div><label className="label">Announcement banner (legacy field)</label><input className="field" value={cms.announcement} onChange={(e) => setCms({ ...cms, announcement: e.target.value })} /></div>
            <div><label className="label">Rewards page text</label><textarea className="field" rows={2} value={cms.rewardsText} onChange={(e) => setCms({ ...cms, rewardsText: e.target.value })} /></div>
          </div>
          <div className="card p-5 sm:p-6 mb-4">
            <h3 className="font-bold text-[var(--ink)] mb-3">FAQ</h3>
            <div className="space-y-3">
              {cms.faq.map((f, i) => (
                <div key={i} className="rounded-xl border border-[var(--line)] p-3 space-y-2">
                  <input className="field text-sm font-bold" value={f.q} onChange={(e) => { const faq = [...cms.faq]; faq[i] = { ...faq[i], q: e.target.value }; setCms({ ...cms, faq }); }} placeholder="Question" />
                  <textarea className="field text-sm" rows={2} value={f.a} onChange={(e) => { const faq = [...cms.faq]; faq[i] = { ...faq[i], a: e.target.value }; setCms({ ...cms, faq }); }} placeholder="Answer" />
                  <button onClick={() => setCms({ ...cms, faq: cms.faq.filter((_, j) => j !== i) })} className="text-xs text-red-600 font-bold min-h-[44px]">Remove</button>
                </div>
              ))}
            </div>
            <button onClick={() => setCms({ ...cms, faq: [...cms.faq, { q: '', a: '' }] })} className="btn-ghost px-4 py-2 text-sm mt-3 min-h-[44px]">+ Add FAQ</button>
          </div>
          <button onClick={onSave} className="btn-primary px-6 py-3 text-sm min-h-[48px]">Save text content</button>
          {cmsMsg && <span className="ml-3 text-sm text-green-700 font-semibold">{cmsMsg}</span>}
        </div>
      )}
    </div>
  );
}

/* ============================= SETTINGS ============================= */

function SettingsTab({ flash, reload, refresh }) {
  const [tuning, setTuning] = useState(getDisplayTuning);
  const save = (patch) => setTuning(saveDisplayTuning(patch));
  const num = (v, fb) => { const n = parseFloat(v); return Number.isFinite(n) ? n : fb; };

  const wipe = (what) => {
    if (what === 'analytics') {
      if (!confirm('Clear all analytics (page views, events, heartbeats)? The site starts counting fresh.')) return;
      clearAnalyticsData(); flash('✓ Analytics cleared.');
    } else {
      if (!confirm('Reset ALL demo data (spots, deposits, boosts, referrals, analytics)? Your site content text is kept.')) return;
      resetDemoData(); reload(); refresh && refresh(); flash('✓ Demo data reset — reload the page to see a fresh board.');
    }
  };

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Settings</h2>
      <p className="text-[var(--ink-2)] text-sm mb-5">Tune what the <b className="text-[var(--ink)]">public</b> sees. This dashboard always shows real numbers.</p>

      <div className="card p-5 sm:p-6 mb-4">
        <h3 className="font-bold text-[var(--ink)] mb-1">👁️ Public "online now" display</h3>
        <p className="text-[11px] text-[var(--ink-3)] mb-4">Real count → displayed count. Currently: real 10 → shows ≈{displayOnlineCount(10, tuning)}.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label">Minimum shown (floor)</label><input className="field" inputMode="numeric" value={tuning.onlineFloor} onChange={(e) => save({ onlineFloor: Math.max(0, num(e.target.value, 29)) })} /></div>
          <div><label className="label">Seed range when 0 real (max)</label><input className="field" inputMode="numeric" value={tuning.seedOnlineMax} onChange={(e) => save({ seedOnlineMax: num(e.target.value, 61) })} /></div>
          <div><label className="label">Small-traffic multiplier (×)</label><input className="field" inputMode="decimal" value={tuning.onlineSmallMult} onChange={(e) => save({ onlineSmallMult: num(e.target.value, 5) })} /></div>
          <div><label className="label">Big-traffic multiplier (×)</label><input className="field" inputMode="decimal" value={tuning.onlineBigMult} onChange={(e) => save({ onlineBigMult: num(e.target.value, 2.5) })} /></div>
        </div>
      </div>

      <div className="card p-5 sm:p-6 mb-4">
        <h3 className="font-bold text-[var(--ink)] mb-1">💰 Public amount display</h3>
        <p className="text-[11px] text-[var(--ink-3)] mb-4">Shown = real × {tuning.amountMult} + ${tuning.amountAdd}. Currently: real $100 → shows ${money(displayAmount(100, tuning))}.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label">Multiplier (×)</label><input className="field" inputMode="decimal" value={tuning.amountMult} onChange={(e) => save({ amountMult: num(e.target.value, 1.06) })} /></div>
          <div><label className="label">Flat add ($)</label><input className="field" inputMode="decimal" value={tuning.amountAdd} onChange={(e) => save({ amountAdd: num(e.target.value, 3) })} /></div>
        </div>
      </div>

      <div className="card p-5 sm:p-6">
        <h3 className="font-bold text-[var(--ink)] mb-1">🧹 Danger zone</h3>
        <p className="text-[11px] text-[var(--ink-3)] mb-4">Irreversible on this browser. Site content text is never touched by these.</p>
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => wipe('analytics')} className="btn-ghost px-5 py-3 text-sm min-h-[48px]">Clear analytics</button>
          <button onClick={() => wipe('demo')} className="px-5 py-3 text-sm rounded-[14px] border border-red-400/60 text-red-600 hover:bg-red-500/10 font-bold min-h-[48px]">Reset all demo data</button>
        </div>
      </div>
    </div>
  );
}

/* ============================= SUBMISSION CARDS ============================= */

function SubmissionCard({ s, notes, setNotes, onDecide, onAddNote, setShotView, allSubs }) {
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
              <button onClick={() => setShotView(s.paymentScreenshot)} className="min-h-[44px]">
                <img src={s.paymentScreenshot} alt="proof" className="w-16 h-16 object-cover rounded-lg border border-[var(--line)]" />
              </button>
            )}
            {!s.paymentScreenshot && s.hasRemoteScreenshot && (
              <span className="text-[11px] font-semibold text-[var(--ink-2)] bg-[var(--surface-2)] border border-[var(--line)] rounded-lg px-2 py-1">🧾 Screenshot on buyer's device — verify via TxID</span>
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
      <AICheck sub={s} allSubs={allSubs} />
      <div className="flex gap-2.5 mt-3 flex-wrap">
        <button onClick={() => onDecide(s.id, 'approved')} className="btn-primary px-5 py-3 text-sm min-h-[48px]">✓ Verify & approve</button>
        <button onClick={() => onDecide(s.id, 'changes-requested')} className="btn-ghost px-5 py-3 text-sm min-h-[48px]">✎ Request changes</button>
        <button onClick={() => onDecide(s.id, 'rejected')} className="px-5 py-3 text-sm rounded-[14px] border border-red-400/60 text-red-600 hover:bg-red-500/10 font-bold min-h-[48px]">✕ Reject</button>
        <button onClick={() => onAddNote(s.id)} className="px-4 py-3 text-xs text-[var(--ink-3)] hover:text-[var(--ink)] font-bold min-h-[48px]">+ Save note only</button>
      </div>
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
    setTimeout(() => { setResult(runAICheck(sub, allSubs || [])); setBusy(false); }, 900);
  };
  const passed = result && result.every((c) => c.pass);
  return (
    <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm font-bold text-[var(--ink)]">🤖 AI cross-check</div>
        <button onClick={run} disabled={busy} className="btn-ghost px-4 py-2.5 text-xs disabled:opacity-60 min-h-[44px]">
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
      <p className="text-[var(--ink-2)] text-sm mb-5">Add a brand directly to the leaderboard — e.g. someone paid you cash off-platform. Rank is computed by the same rule as everyone else.</p>
      <div className="space-y-5 max-w-2xl">
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
            <label className="btn-ghost px-5 py-2.5 text-sm cursor-pointer min-h-[44px] leading-[28px]">
              {f.logo ? 'Change picture' : 'Upload picture'}
              <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
            </label>
          </div>
        </div>
        <button onClick={add} className="btn-primary w-full py-3.5 text-[15px] min-h-[52px]">➕ Add to leaderboard</button>
      </div>
    </div>
  );
}
