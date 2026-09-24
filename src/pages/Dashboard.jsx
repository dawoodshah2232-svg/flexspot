// Member dashboard — the client page. Tabs: Overview, My Spot, Wallet,
// Referrals, Settings. LocalStorage-backed demo engine (member.js); the
// accounts-launch backend will swap the data layer without touching this UI.
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandAvatar } from '../components/SpotCard';
import ShareButtons from '../components/ShareButtons';
import { money, money2, compact, timeAgo, appBase } from '../lib/format';
import { displayAmount } from '../lib/display';
import {
  ensureMemberDemo, getMember, saveMember, clearMember,
  getWallet, requestWithdrawal, boostFromWallet,
  updateMemberSpot, getMemberSpot, memberReferralLink, memberReferralStats,
  getPendingClaim, SUPPORT_EMAIL, USDT_NETWORKS, MIN_WITHDRAWAL,
} from '../lib/member';
import { myReferralCode } from '../lib/store';
import { memberLogin, memberMe, memberLogout } from '../lib/emailClient';

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'spot', label: 'My Spot', icon: '🎯' },
  { id: 'wallet', label: 'Wallet', icon: '💰' },
  { id: 'referrals', label: 'Referrals', icon: '🔗' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const card = 'rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5';
const label = 'block text-xs font-bold uppercase tracking-wider text-[var(--ink-3)] mb-1.5';
const field = 'field w-full';
const h2 = 'font-display font-extrabold text-lg text-[var(--ink)]';

function Stat({ icon, label, value, sub }) {
  return (
    <div className={card + ' !p-4'}>
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[var(--ink-3)]">
        <span>{icon}</span> {label}
      </div>
      <div className="font-display font-extrabold text-2xl text-[var(--ink)] mt-1.5">{value}</div>
      {sub && <div className="text-xs text-[var(--ink-3)] mt-0.5">{sub}</div>}
    </div>
  );
}

function useMember() {
  // undefined = still loading; null = loaded, no member; object = logged in.
  const [member, setMember] = useState(undefined);
  const [wallet, setWallet] = useState(null);
  const [spot, setSpot] = useState(null);
  const refresh = () => {
    setMember(getMember());
    setWallet(getWallet());
    setSpot(getMemberSpot());
  };
  useEffect(() => { ensureMemberDemo(); refresh(); }, []);
  return { member, wallet, spot, refresh, setMember };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file'));
    if (file.size > 800 * 1024) return reject(new Error('Image must be under 800KB.'));
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error('Could not read that file.'));
    r.readAsDataURL(file);
  });
}

// Member login — for brand owners approved by the admin. The approval email
// contains the login ID (their email) and a one-time-issued password.
function MemberLoginCard({ onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !pw) { setErr('Enter your email and password.'); return; }
    setBusy(true); setErr('');
    const r = await memberLogin(email.trim(), pw);
    setBusy(false);
    if (r.ok) onLoggedIn(r.member);
    else setErr(r.error || 'Login failed — check your details and try again.');
  };
  return (
    <div className={card + ' mt-8 text-left'}>
      <div className="text-2xl mb-2">🔑</div>
      <h2 className={h2}>Member login</h2>
      <p className="text-sm text-[var(--ink-2)] mt-1 mb-4">Approved brand owners: log in with the email and password from your approval email.</p>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className={label}>Email (your login ID)</label>
          <input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" />
        </div>
        <div>
          <label className={label}>Password</label>
          <input type="password" className={field} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="XXXX-XXXX-XXXX" autoComplete="current-password" />
        </div>
        {err && <div className="text-sm font-semibold text-red-500">{err}</div>}
        <button type="submit" disabled={busy} className="btn-primary w-full py-3 disabled:opacity-60">
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </div>
  );
}

export default function Dashboard({ spots = [], onClaim }) {
  const { member, wallet, spot, refresh } = useMember();
  const [tab, setTab] = useState('overview');
  // Server-issued member session (email + password from the approval email).
  const [serverMember, setServerMember] = useState(null);
  const [serverChecked, setServerChecked] = useState(false);
  useEffect(() => {
    memberMe().then((r) => {
      if (r.ok) setServerMember(r.member);
      setServerChecked(true);
    });
  }, []);

  const rank = useMemo(() => {
    if (!member || !spots.length) return null;
    const i = spots.findIndex((s) => s.slug === member.spotSlug);
    return i === -1 ? null : i + 1;
  }, [member, spots]);

  if (member === undefined) return null; // loading
  if (!member) {
    const pending = getPendingClaim();
    // Logged in with server-issued credentials (approval email) — show the
    // member's brand panel with IB number, rank and spot URL.
    if (serverMember) {
      const i = (spots || []).findIndex((s) => s.slug === serverMember.slug);
      const r = i === -1 ? null : i + 1;
      return (
        <div className="pt-[110px] pb-20 px-4 sm:px-6 max-w-2xl mx-auto">
          <div className="card p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#7C3AED] via-[#F5C044] to-[#7C3AED]" />
            <div className="text-5xl mb-3">👑</div>
            <div className="inline-flex items-center gap-2 pill pill-gold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Member account active
            </div>
            <h1 className="font-display font-extrabold text-2xl text-[var(--ink)]">{serverMember.brandName}</h1>
            <p className="text-sm text-[var(--ink-3)] mt-1">{serverMember.email}</p>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="rounded-2xl bg-[var(--surface-2)] p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Rank</div>
                <div className="font-display font-extrabold text-2xl text-[var(--ink)]">{r ? `#${r}` : 'LIVE'}</div>
              </div>
              <div className="rounded-2xl bg-[var(--surface-2)] p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Spot value</div>
                <div className="font-display font-extrabold text-2xl text-[var(--ink)]">{money2(serverMember.amount || 0)}</div>
              </div>
              <div className="rounded-2xl bg-[var(--surface-2)] p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">IB №</div>
                <div className="font-mono font-extrabold text-lg text-[var(--gold)] mt-1">{serverMember.ib}</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to={`/s/${serverMember.slug}`} className="btn-primary px-6 py-3 text-sm flex-1">View my brand page →</Link>
              <Link to="/leaderboard" className="btn-ghost px-6 py-3 text-sm flex-1">Leaderboard</Link>
            </div>
            <button
              onClick={() => { memberLogout(); setServerMember(null); }}
              className="text-sm font-semibold text-[var(--ink-3)] hover:text-[var(--ink)] px-3 py-2.5 mt-4"
            >Log out</button>
          </div>
        </div>
      );
    }
    if (pending) {
      return (
        <div className="pt-[110px] pb-20 px-4 max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 pill pill-gold mb-5">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
            Payment under review
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[var(--ink)]">Almost there, {pending.name} ⏳</h1>
          <p className="text-[var(--ink-2)] mt-3 text-sm leading-relaxed">
            Your <b className="text-[var(--ink)]">{money2(pending.amount || 0)}</b> claim is being verified.
            Once approved, your brand goes live and your member account activates —{' '}
            {pending.email ? <>we'll email your login details to <b className="text-[var(--ink)]">{pending.email}</b>.</> : 'you’ll get your login details by email.'}
          </p>
          <Link to="/leaderboard" className="btn-ghost px-6 py-3 mt-6 inline-block text-sm">Watch the live board →</Link>
        </div>
      );
    }
    return (
      <div className="pt-[110px] pb-20 px-4 max-w-lg mx-auto text-center">
        <div className="text-5xl mb-4">👤</div>
        <h1 className="font-display font-extrabold text-2xl text-[var(--ink)]">Your FlexSpot account</h1>
        <p className="text-[var(--ink-2)] mt-3 text-sm leading-relaxed">
          No account yet? Promote your business, profile or social account for just{' '}
          <b className="text-[var(--ink)]">$1</b> — claim your spot and your member account is created{' '}
          <b className="text-[var(--ink)]">automatically</b>. Wallet, referral stats and USDT withdrawals included.
        </p>
        <button onClick={onClaim} className="btn-primary px-8 py-3 mt-6">Claim your spot — $1</button>
        <MemberLoginCard onLoggedIn={setServerMember} />
      </div>
    );
  }

  const spotValue = spot ? displayAmount(spot.amount) : 0;

  return (
    <div className="pt-[104px] pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* header */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <MemberAvatar member={member} spot={spot} size={60} />
        <div className="min-w-0 flex-1">
          <h1 className="font-display font-extrabold text-2xl text-[var(--ink)] truncate">
            {member.companyName || member.name}
          </h1>
          <p className="text-sm text-[var(--ink-3)]">
            {member.name} · member since {new Date(member.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
          </p>
        </div>
        {spot && (
          <Link to={`/s/${spot.slug}`} className="btn-ghost px-4 py-2.5 text-sm max-sm:basis-full max-sm:text-center">View public profile →</Link>
        )}
        <button
          onClick={() => { clearMember(); window.location.href = import.meta.env.BASE_URL; }}
          className="text-sm font-semibold text-[var(--ink-3)] hover:text-[var(--ink)] px-3 py-2.5"
        >
          Log out
        </button>
      </div>

      {/* tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold border transition-colors ${
              tab === t.id
                ? 'bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)]'
                : 'bg-[var(--surface)] text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink-3)]'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && <OverviewTab member={member} wallet={wallet} spot={spot} rank={rank} total={spots.length} go={setTab} />}
      {tab === 'spot' && <SpotTab member={member} spot={spot} refresh={refresh} />}
      {tab === 'wallet' && <WalletTab member={member} wallet={wallet} refresh={refresh} />}
      {tab === 'referrals' && <ReferralsTab member={member} spot={spot} />}
      {tab === 'settings' && <SettingsTab member={member} refresh={refresh} />}
    </div>
  );
}

function MemberAvatar({ member, spot, size = 60 }) {
  // What the world sees, per the member's "promote" choice.
  const src =
    member.promoteAs === 'avatar' ? member.avatarUrl :
    member.promoteAs === 'social' ? '' : (member.logoUrl || (spot && spot.logo));
  if (src) return <img src={src} alt="" style={{ width: size, height: size }} className="rounded-2xl object-cover shrink-0" />;
  if (member.promoteAs === 'avatar' && member.avatarUrl) return null;
  const fake = { ...(spot || {}), name: member.companyName || member.name, logo: member.logoUrl || (spot && spot.logo) };
  return <BrandAvatar spot={fake} size={size} />;
}

/* ------------------------------- OVERVIEW ------------------------------- */
function OverviewTab({ member, wallet, spot, rank, total, go }) {
  const ref = memberReferralStats();
  const recent = (wallet?.txns || []).slice(0, 6);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Stat icon="💰" label="Spot value" value={money(spotValueOf(spot))} sub={rank ? `Rank #${rank} of ${total}` : 'Not ranked yet'} />
        <Stat icon="👁️" label="Views" value={compact(spot?.views || 0)} sub="all time" />
        <Stat icon="💳" label="Wallet balance" value={money2(wallet?.balance || 0)} sub={`${money2(wallet?.pending || 0)} pending withdrawal`} />
        <Stat icon="🔗" label="Referral visits" value={ref.visits} sub="through your affiliate link" />
        <Stat icon="🧑‍🤝‍🧑" label="Referred members" value={(member.referrals || []).length} sub={`${money2((member.referrals || []).reduce((a, r) => a + (r.commission || 0), 0))} commission earned`} />
        <Stat icon="🏦" label="Lifetime earnings" value={money2(wallet?.lifetime || 0)} sub="wallet credits, all time" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className={card}>
          <h3 className={h2 + ' mb-3'}>Recent activity</h3>
          {recent.length === 0 && <p className="text-sm text-[var(--ink-3)]">Nothing yet — share your referral link to start earning.</p>}
          <div className="space-y-2.5">
            {recent.map((t) => (
              <div key={t.id} className="flex items-center gap-3 text-sm">
                <span className={`w-8 h-8 grid place-items-center rounded-xl shrink-0 ${t.kind === 'credit' ? 'bg-green-500/15' : 'bg-[var(--surface-2)]'}`}>
                  {t.kind === 'credit' ? '💵' : '💸'}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-[var(--ink)] truncate">{t.label}</div>
                  <div className="text-[11px] text-[var(--ink-3)]">{timeAgo(t.at)}{t.status === 'pending' ? ' · ⏳ pending' : ''}</div>
                </div>
                <div className={`font-display font-extrabold ${t.kind === 'credit' ? 'text-green-600' : 'text-[var(--ink-2)]'}`}>
                  {t.kind === 'credit' ? '+' : '−'}{money2(t.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={card}>
          <h3 className={h2 + ' mb-3'}>Quick actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { t: 'Edit my spot', d: 'Logo, photos, tagline & links', tab: 'spot', icon: '🎯' },
              { t: 'Withdraw', d: `USDT · min $${MIN_WITHDRAWAL}`, tab: 'wallet', icon: '🏦' },
              { t: 'Boost my spot', d: 'Spend wallet balance', tab: 'wallet', icon: '🚀' },
              { t: 'Invite & earn', d: '20% instant commission', tab: 'referrals', icon: '🔗' },
            ].map((a) => (
              <button key={a.t} onClick={() => go(a.tab)} className="text-left rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4 hover:border-[var(--gold)] transition-colors">
                <div className="text-2xl mb-1.5">{a.icon}</div>
                <div className="font-bold text-sm text-[var(--ink)]">{a.t}</div>
                <div className="text-xs text-[var(--ink-3)] mt-0.5">{a.d}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function spotValueOf(spot) { return spot ? displayAmount(spot.amount) : 0; }

/* ------------------------------- MY SPOT -------------------------------- */
function SpotTab({ member, spot, refresh }) {
  const [form, setForm] = useState(() => ({
    tagline: spot?.tagline || '',
    description: spot?.description || '',
    website: spot?.website || '',
    category: spot?.category || 'startups',
    x: spot?.socials?.x || '', instagram: spot?.socials?.instagram || '',
    facebook: spot?.socials?.facebook || '', linkedin: spot?.socials?.linkedin || '',
    logoUrl: member.logoUrl || '', avatarUrl: member.avatarUrl || '',
    promoteAs: member.promoteAs || 'logo',
  }));
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onFile = async (key, file) => {
    setErr('');
    try { set(key, await fileToDataUrl(file)); }
    catch (e) { setErr(e.message); }
  };

  const save = () => {
    setErr(''); setMsg('');
    const socials = {};
    ['x', 'instagram', 'facebook', 'linkedin'].forEach((k) => { if (form[k].trim()) socials[k] = form[k].trim(); });
    saveMember({ logoUrl: form.logoUrl, avatarUrl: form.avatarUrl, promoteAs: form.promoteAs });
    updateMemberSpot({
      tagline: form.tagline.trim().slice(0, 100),
      description: form.description.trim().slice(0, 1000),
      website: form.website.trim(), socials, category: form.category,
      // company logo shown on the board follows the "promote" choice
      logo: form.promoteAs === 'logo' ? form.logoUrl.trim() : (spot?.logo || null),
    });
    refresh();
    setMsg('Saved — your public spot is updated instantly. ✅');
  };

  const previewSpot = {
    ...(spot || {}),
    name: member.companyName || member.name,
    tagline: form.tagline, description: form.description,
    logo: form.promoteAs === 'logo' ? form.logoUrl : form.promoteAs === 'avatar' ? form.avatarUrl : (spot?.logo || null),
    mark: form.promoteAs === 'social' ? '📱' : (spot?.mark || '✨'),
  };

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-4 items-start">
      <div className={card + ' space-y-4'}>
        <h3 className={h2}>Brand profile</h3>

        {/* company name — LOCKED */}
        <div>
          <label className={label}>Company / brand name 🔒</label>
          <input className={field + ' opacity-60 cursor-not-allowed'} value={member.companyName || member.name} disabled />
          <p className="text-xs text-[var(--ink-3)] mt-1.5">
            Locked after submission — it stays yours forever. To change it, email{' '}
            <a className="font-bold text-[var(--ink-2)] hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Tagline</label>
            <input className={field} value={form.tagline} maxLength={100} onChange={(e) => set('tagline', e.target.value)} placeholder="One sharp line" />
          </div>
          <div>
            <label className={label}>Website</label>
            <input className={field} value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://…" />
          </div>
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea className={field} rows={3} value={form.description} maxLength={1000} onChange={(e) => set('description', e.target.value)} placeholder="What makes you great?" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[['x', '𝕏 / X'], ['instagram', '📸 Instagram'], ['facebook', '📘 Facebook'], ['linkedin', '💼 LinkedIn']].map(([k, l]) => (
            <div key={k}>
              <label className={label}>{l}</label>
              <input className={field} value={form[k]} onChange={(e) => set(k, e.target.value)} placeholder="URL" />
            </div>
          ))}
        </div>

        {/* images */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[var(--line)] p-4">
            <label className={label}>🏢 Company logo</label>
            <div className="flex items-center gap-3">
              {form.logoUrl
                ? <img src={form.logoUrl} alt="" className="w-14 h-14 rounded-xl object-cover" />
                : <div className="w-14 h-14 rounded-xl bg-[var(--surface-2)] grid place-items-center text-2xl">🏢</div>}
              <div className="flex-1 space-y-2">
                <input className={field + ' !py-2 text-xs'} value={form.logoUrl} onChange={(e) => set('logoUrl', e.target.value)} placeholder="Paste image URL…" />
                <label className="btn-ghost px-3 py-1.5 text-xs cursor-pointer inline-block">
                  Upload image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile('logoUrl', e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--line)] p-4">
            <label className={label}>🧑 Your photo</label>
            <div className="flex items-center gap-3">
              {form.avatarUrl
                ? <img src={form.avatarUrl} alt="" className="w-14 h-14 rounded-xl object-cover" />
                : <div className="w-14 h-14 rounded-xl bg-[var(--surface-2)] grid place-items-center text-2xl">🧑</div>}
              <div className="flex-1 space-y-2">
                <input className={field + ' !py-2 text-xs'} value={form.avatarUrl} onChange={(e) => set('avatarUrl', e.target.value)} placeholder="Paste image URL…" />
                <label className="btn-ghost px-3 py-1.5 text-xs cursor-pointer inline-block">
                  Upload image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile('avatarUrl', e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* what to promote */}
        <div>
          <label className={label}>What should the board promote?</label>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { id: 'logo', icon: '🏢', t: 'Company logo', d: 'Your brand front and center on the leaderboard.' },
              { id: 'avatar', icon: '🧑', t: 'My photo', d: 'Put your face on the brand — personal spotlight.' },
              { id: 'social', icon: '📱', t: 'Social profile', d: 'Push visitors to your social account.' },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => set('promoteAs', o.id)}
                className={`text-left rounded-2xl border-2 p-3.5 transition-colors ${form.promoteAs === o.id ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'border-[var(--line)] hover:border-[var(--ink-3)]'}`}
              >
                <div className="text-2xl mb-1">{o.icon}</div>
                <div className="font-bold text-sm text-[var(--ink)]">{o.t}</div>
                <div className="text-xs text-[var(--ink-3)] mt-0.5">{o.d}</div>
              </button>
            ))}
          </div>
        </div>

        {err && <p className="text-sm font-semibold text-red-500">{err}</p>}
        {msg && <p className="text-sm font-semibold text-green-600">{msg}</p>}
        <button onClick={save} className="btn-primary px-8 py-3">Save changes</button>
      </div>

      {/* live preview */}
      <div className={card + ' lg:sticky lg:top-[100px]'}>
        <h3 className={h2 + ' mb-3'}>Live preview</h3>
        <p className="text-xs text-[var(--ink-3)] mb-4">Exactly how your brand looks on the board right now.</p>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5 text-center">
          <div className="flex justify-center mb-3"><BrandAvatar spot={previewSpot} size={72} ring /></div>
          <div className="font-display font-extrabold text-lg text-[var(--ink)] truncate">{previewSpot.name}</div>
          <div className="text-sm text-[var(--ink-2)] truncate mt-0.5">{form.tagline || '—'}</div>
          {form.website && <div className="text-xs text-[var(--ink-3)] truncate mt-1">{form.website}</div>}
          <div className="flex justify-center gap-2 mt-3">
            {['x', 'instagram', 'facebook', 'linkedin'].filter((k) => form[k].trim()).map((k) => (
              <span key={k} className="text-xs font-bold bg-[var(--surface)] border border-[var(--line)] rounded-full px-2.5 py-1">{k}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- WALLET -------------------------------- */
function WalletTab({ member, wallet, refresh }) {
  const [wd, setWd] = useState({ network: member.usdt?.network || 'TRC-20', address: member.usdt?.address || '', amount: '' });
  const [boost, setBoost] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const txns = wallet?.txns || [];

  const submitWithdrawal = () => {
    setErr(''); setMsg('');
    try {
      requestWithdrawal({ amount: Number(wd.amount), network: wd.network, address: wd.address.trim() });
      setMsg(`Withdrawal of $${Number(wd.amount).toFixed(2)} requested — USDT (${wd.network}). It lands after the accounts-launch review. ✅`);
      setWd((w) => ({ ...w, amount: '' }));
      refresh();
    } catch (e) { setErr(e.message); }
  };

  const submitBoost = () => {
    setErr(''); setMsg('');
    try {
      const r = boostFromWallet(Number(boost));
      setMsg(`🚀 ${money2(r.amount)} added to your spot — you jumped up the board!`);
      setBoost('');
      refresh();
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="space-y-4">
      {/* balance hero */}
      <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg,#111827,#1f2937 60%,#0f172a)' }}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest opacity-70">Available balance</div>
            <div className="font-display font-black text-4xl mt-1">{money2(wallet?.balance || 0)}</div>
          </div>
          <div className="flex gap-6 text-sm">
            <div><div className="opacity-70 text-[11px] font-bold uppercase tracking-wider">Pending</div><div className="font-display font-extrabold text-lg">{money2(wallet?.pending || 0)}</div></div>
            <div><div className="opacity-70 text-[11px] font-bold uppercase tracking-wider">Lifetime</div><div className="font-display font-extrabold text-lg">{money2(wallet?.lifetime || 0)}</div></div>
          </div>
        </div>
        <p className="text-xs opacity-70 mt-3">Commissions land here. Spend them on boosts, or withdraw in USDT (min ${MIN_WITHDRAWAL}).</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* withdraw */}
        <div className={card}>
          <h3 className={h2 + ' mb-1'}>Withdraw</h3>
          <p className="text-xs text-[var(--ink-3)] mb-4">USDT only · minimum ${MIN_WITHDRAWAL} · ~30 seconds after approval</p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Network</label>
                <select className={field} value={wd.network} onChange={(e) => setWd({ ...wd, network: e.target.value })}>
                  {USDT_NETWORKS.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className={label}>Amount (USD)</label>
                <input className={field} type="number" min={MIN_WITHDRAWAL} step="0.01" value={wd.amount} onChange={(e) => setWd({ ...wd, amount: e.target.value })} placeholder={MIN_WITHDRAWAL.toFixed(2)} />
              </div>
            </div>
            <div>
              <label className={label}>USDT address ({wd.network})</label>
              <input className={field + ' font-mono !text-xs'} value={wd.address} onChange={(e) => setWd({ ...wd, address: e.target.value })} placeholder="Your wallet address" />
            </div>
            <button onClick={submitWithdrawal} className="btn-gold px-6 py-2.5 w-full sm:w-auto">Request withdrawal</button>
          </div>
        </div>

        {/* boost from wallet */}
        <div className={card}>
          <h3 className={h2 + ' mb-1'}>Boost my spot 🚀</h3>
          <p className="text-xs text-[var(--ink-3)] mb-4">Turn earnings into visibility — wallet funds go straight into your bid.</p>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className={label}>Amount (USD)</label>
              <input className={field} type="number" min="1" step="0.01" value={boost} onChange={(e) => setBoost(e.target.value)} placeholder="25.00" />
            </div>
            <div className="flex items-end">
              <button onClick={submitBoost} className="btn-primary px-6 py-2.5">Boost</button>
            </div>
          </div>
          <p className="text-xs text-[var(--ink-3)] mt-3">Available: {money2(wallet?.balance || 0)} · boosts settle instantly on the public board.</p>
        </div>
      </div>

      {err && <p className="text-sm font-semibold text-red-500">{err}</p>}
      {msg && <p className="text-sm font-semibold text-green-600">{msg}</p>}

      {/* ledger */}
      <div className={card}>
        <h3 className={h2 + ' mb-4'}>Transactions</h3>
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--ink-3)] border-b border-[var(--line)]">
                <th className="py-2 pr-3">Date</th><th className="py-2 pr-3">Description</th>
                <th className="py-2 pr-3">Type</th><th className="py-2 pr-3">Status</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {txns.map((t) => (
                <tr key={t.id} className="border-b border-[var(--line)]/60 last:border-0">
                  <td className="py-2.5 pr-3 text-[var(--ink-3)] whitespace-nowrap text-xs">{new Date(t.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</td>
                  <td className="py-2.5 pr-3 font-semibold text-[var(--ink)]">{t.label}</td>
                  <td className="py-2.5 pr-3 text-[var(--ink-2)] capitalize text-xs">{t.kind}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${t.status === 'pending' ? 'bg-amber-500/15 text-amber-600' : 'bg-green-500/15 text-green-600'}`}>
                      {t.status === 'pending' ? '⏳ pending' : '✓ settled'}
                    </span>
                  </td>
                  <td className={`py-2.5 text-right font-display font-extrabold ${t.kind === 'credit' ? 'text-green-600' : 'text-[var(--ink-2)]'}`}>
                    {t.kind === 'credit' ? '+' : '−'}{money2(t.amount)}
                  </td>
                </tr>
              ))}
              {txns.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-sm text-[var(--ink-3)]">No transactions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- REFERRALS ------------------------------ */
function ReferralsTab({ member, spot }) {
  const stats = memberReferralStats();
  const code = myReferralCode(spot?.slug || '');
  const link = memberReferralLink(window.location.origin + appBase());
  const referred = member.referrals || [];
  const commission = referred.reduce((a, r) => a + (r.commission || 0), 0);

  const copy = async () => {
    try { await navigator.clipboard.writeText(link); } catch {}
  };

  return (
    <div className="space-y-4">
      <div className={card}>
        <h3 className={h2 + ' mb-1'}>Your referral link 🔗</h3>
        <p className="text-xs text-[var(--ink-3)] mb-4">
          Share your personal link — when someone joins through it and pays, you earn <b className="text-[var(--ink-2)]">20% instant commission</b> on every payment, forever.
        </p>
        <div className="flex gap-2">
          <input className={field + ' font-mono !text-xs'} readOnly value={link} onFocus={(e) => e.target.select()} />
          <button onClick={copy} className="btn-primary px-5 shrink-0">Copy</button>
        </div>
        {spot && <div className="mt-4"><ShareButtons spot={spot} refCode={code} /></div>}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat icon="👣" label="Visits" value={stats.visits} sub="through your link" />
        <Stat icon="🧑‍🤝‍🧑" label="Referred members" value={referred.length} sub="joined via your link" />
        <Stat icon="📈" label="Commission" value={money2(commission)} sub="20% instant, every payment" />
      </div>

      <div className={card}>
        <h3 className={h2 + ' mb-4'}>Referred members</h3>
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--ink-3)] border-b border-[var(--line)]">
                <th className="py-2 pr-3">Member</th><th className="py-2 pr-3">Joined</th>
                <th className="py-2 pr-3 text-right">Their spend</th><th className="py-2 text-right">Your 20%</th>
              </tr>
            </thead>
            <tbody>
              {referred.map((r) => (
                <tr key={r.id} className="border-b border-[var(--line)]/60 last:border-0">
                  <td className="py-2.5 pr-3 font-semibold text-[var(--ink)]">{r.name}</td>
                  <td className="py-2.5 pr-3 text-xs text-[var(--ink-3)] whitespace-nowrap">{new Date(r.joinedAt || r.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="py-2.5 pr-3 text-right">{money2(r.spend)}</td>
                  <td className="py-2.5 text-right font-display font-extrabold text-green-600">+{money2(r.commission)}</td>
                </tr>
              ))}
              {referred.length === 0 && (
                <tr><td colSpan={4} className="py-8 text-center text-sm text-[var(--ink-3)]">Nobody yet — share your link and watch this fill up.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- SETTINGS ------------------------------- */
function SettingsTab({ member, refresh }) {
  const [form, setForm] = useState({
    name: member.name || '', email: member.email || '',
    network: member.usdt?.network || 'TRC-20', address: member.usdt?.address || '',
    notify: { payouts: true, referrals: true, boosts: true, ...(member.notify || {}) },
  });
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const saveProfile = () => {
    setErr(''); setMsg('');
    if (!form.name.trim()) { setErr('Please enter your name.'); return; }
    saveMember({
      name: form.name.trim(), email: form.email.trim(),
      usdt: { network: form.network, address: form.address.trim() },
      notify: form.notify,
    });
    refresh();
    setMsg('Settings saved. ✅');
  };

  const savePw = () => {
    setErr(''); setMsg('');
    if (!pw.current || !pw.next || !pw.confirm) { setErr('Fill in all three password fields.'); return; }
    if (pw.next.length < 8) { setErr('New password must be at least 8 characters.'); return; }
    if (pw.next !== pw.confirm) { setErr('New passwords don’t match.'); return; }
    setPw({ current: '', next: '', confirm: '' });
    setMsg('Password updated. ✅ (demo build — no real password was sent anywhere)');
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div className={card + ' space-y-3'}>
        <h3 className={h2}>Profile</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className={label}>Your name</label><input className={field} value={form.name} onChange={(e) => set('name', e.target.value)} /></div>
          <div><label className={label}>Email</label><input className={field} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} /></div>
        </div>
        <div className="grid sm:grid-cols-[140px_1fr] gap-3">
          <div><label className={label}>USDT network</label>
            <select className={field} value={form.network} onChange={(e) => set('network', e.target.value)}>
              {USDT_NETWORKS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div><label className={label}>USDT payout address</label><input className={field + ' font-mono !text-xs'} value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Saved address is used for withdrawals" /></div>
        </div>
        <button onClick={saveProfile} className="btn-primary px-6 py-2.5">Save settings</button>
      </div>

      <div className={card + ' space-y-3'}>
        <h3 className={h2}>Password & security</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <div><label className={label}>Current password</label><input type="password" className={field} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} /></div>
          <div><label className={label}>New password</label><input type="password" className={field} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} /></div>
          <div><label className={label}>Confirm new</label><input type="password" className={field} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} /></div>
        </div>
        <button onClick={savePw} className="btn-ghost px-6 py-2.5">Update password</button>
      </div>

      <div className={card}>
        <h3 className={h2 + ' mb-3'}>Notifications</h3>
        <div className="space-y-2.5">
          {[['payouts', '💸 Withdrawals & payouts'], ['referrals', '🔗 New referral visits & members'], ['boosts', '🚀 Boost & rank changes']].map(([k, l]) => (
            <label key={k} className="flex items-center justify-between gap-3 py-2 border-b border-[var(--line)]/60 last:border-0 cursor-pointer">
              <span className="text-sm font-semibold text-[var(--ink)]">{l}</span>
              <button
                role="switch" aria-checked={!!form.notify[k]}
                onClick={() => setForm((f) => ({ ...f, notify: { ...f.notify, [k]: !f.notify[k] } }))}
                className={`w-11 h-6 rounded-full transition-colors shrink-0 ${form.notify[k] ? 'bg-[var(--gold)]' : 'bg-[var(--surface-2)] border border-[var(--line)]'}`}
              >
                <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform mt-0.5 ml-0.5 ${form.notify[k] ? 'translate-x-5' : ''}`} />
              </button>
            </label>
          ))}
        </div>
        <p className="text-xs text-[var(--ink-3)] mt-3">Sent to {form.email || 'your email'} once accounts launch with real email.</p>
      </div>

      {err && <p className="text-sm font-semibold text-red-500">{err}</p>}
      {msg && <p className="text-sm font-semibold text-green-600">{msg}</p>}

      <div className={card}>
        <h3 className={h2 + ' mb-2'}>Account</h3>
        <p className="text-xs text-[var(--ink-3)] mb-4">Need to change your company name, delete your account, or have another request? Our team handles it personally.</p>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="btn-ghost px-5 py-2.5 text-sm inline-block">Email {SUPPORT_EMAIL}</a>
      </div>
    </div>
  );
}
