import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { slugify, money2 } from '../lib/format';
import { createSubmission, submitSpot, getSpot, IS_LIVE, addContribution, projectedRank, rank } from '../lib/store';
import { USDT_NETWORKS, MIN_SPOT_AMOUNT } from '../lib/payments';
import { CATEGORIES } from '../lib/data';
import Celebration from '../components/Celebration';
import Flee from '../components/Flee';
import { useUnofficialHost } from '../components/SecurityGuard';
import { currentHost } from '../lib/security';
import { trackEvent } from '../lib/analytics';
import { stagePendingClaim } from '../lib/member';
import { notifyClaimSubmitted, saveSubmissionCentral } from '../lib/emailClient';

const AMOUNTS = [1, 5, 10, 25, 50, 100];

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

const normUrl = (v) => {
  const t = (v || '').trim();
  if (!t) return '';
  return /^https?:\/\//i.test(t) ? t : 'https://' + t;
};

// Social fields accept "@handle" or a link. Handles become real profile URLs
// so the profile page's Visit buttons always open a working destination.
const SOCIAL_BASE = {
  x: 'https://x.com/',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  linkedin: 'https://linkedin.com/in/',
};
const normSocial = (platform, v) => {
  const t = (v || '').trim();
  if (!t) return '';
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith('@')) return SOCIAL_BASE[platform] + encodeURIComponent(t.slice(1));
  return 'https://' + t;
};

// Strict custom-amount parse: up to 2 decimals, nothing else. Returns
// null when empty (falls back to the quick-pick) or NaN when malformed.
const parseCustomAmount = (custom) => {
  if (custom === '') return null;
  if (!/^\d+(\.\d{1,2})?$/.test(custom.trim())) return NaN;
  return Math.round(parseFloat(custom) * 100) / 100;
};

// Claim page: Details → Amount → Crypto payment proof → Pending Approval.
// Screenshot of the payment is REQUIRED. Transaction ID is optional.
// Email is optional. Website OR a social link is required (one of them).
export default function ClaimPage({ spots, onSubmitted }) {
  const [params] = useSearchParams();
  const boostSlug = params.get('boost');
  const boostSpot = boostSlug ? getSpot(boostSlug, spots) : null;
  const isBoost = !!boostSpot;
  // Boost mode skips the brand-details step: 1 = Amount, 2 = Payment, 3 = Done.
  // Claim mode: 1 = Brand, 2 = Amount, 3 = Payment, 4 = Done.
  const amountStep = isBoost ? 1 : 2;
  const payStep = isBoost ? 2 : 3;
  const doneStep = isBoost ? 3 : 4;

  const [step, setStep] = useState(1);
  useEffect(() => {
    trackEvent(isBoost ? 'boost_open' : 'claim_open', isBoost ? { boost: boostSlug } : {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    name: '', tagline: '', description: '', website: '', socialLink: '',
    x: '', instagram: '', facebook: '', linkedin: '',
    email: '', logo: '', category: 'startups',
  });
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState('');
  const [network, setNetwork] = useState(USDT_NETWORKS[0].id);
  const [copied, setCopied] = useState(false);
  // Anti-phishing: on cloned copies the payment block is replaced by a warning.
  const unofficialHost = useUnofficialHost();
  const [txId, setTxId] = useState('');
  const [screenshot, setScreenshot] = useState('');
  const [showExtras, setShowExtras] = useState(false);
  // Boost contributor shout-out — shown on the brand's page.
  const [contribName, setContribName] = useState('');
  const [contribHandle, setContribHandle] = useState('');

  const activeNetwork = USDT_NETWORKS.find((n) => n.id === network) || USDT_NETWORKS[0];

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(activeNetwork.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const finalAmount = () => {
    const c = parseCustomAmount(custom);
    if (c === null) return amount;          // no custom entered → quick-pick amount
    return Number.isFinite(c) ? c : NaN;    // malformed custom → fails validation, never silently clamped
  };

  // Projected rank: where this amount would land right now (same rule as the board).
  const projection = useMemo(() => {
    if (!spots.length) return null;
    const amt = finalAmount();
    if (!Number.isFinite(amt) || amt < MIN_SPOT_AMOUNT) return null;
    if (isBoost && boostSpot) return projectedRank(spots, boostSpot.slug, amt);
    // Claim mode: brand-new spot joining the board with joinedAt = now.
    const ranked = rank([...spots, { slug: '__new__', amount: amt, joinedAt: Date.now() }]);
    const idx = ranked.findIndex((s) => s.slug === '__new__');
    return { rank: idx + 1, above: idx > 0 ? ranked[idx - 1] : null };
  }, [spots, amount, custom, isBoost, boostSpot]);

  // Projected rank for every quick amount (boost mode) — shown right on the buttons.
  const quickRanks = useMemo(() => {
    if (!isBoost || !boostSpot || !spots.length) return {};
    const map = {};
    for (const a of AMOUNTS) map[a] = projectedRank(spots, boostSpot.slug, a).rank;
    return map;
  }, [spots, isBoost, boostSpot]);

  // Projected rank for the custom amount (boost mode), live as they type.
  const customRank = useMemo(() => {
    if (!isBoost || !boostSpot || custom === '') return null;
    const c = parseCustomAmount(custom);
    if (!Number.isFinite(c) || c < MIN_SPOT_AMOUNT) return null;
    return projectedRank(spots, boostSpot.slug, Math.round(c * 100) / 100).rank;
  }, [spots, isBoost, boostSpot, custom]);

  const validStep1 = () => {
    if (isBoost) return true;
    if (form.name.trim().length < 2) { setError('Please enter a brand name (min 2 characters).'); return false; }
    if (form.description.trim().length < 10) { setError('Please add a short description (min 10 characters) — it shows on your rank and profile.'); return false; }
    if (!form.website.trim() && !form.socialLink.trim()) { setError('Please add a website OR a social media link — one of them is required.'); return false; }
    if (form.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) { setError('That email doesn\'t look valid — fix it or leave it empty.'); return false; }
    return true;
  };

  const validStep3 = () => {
    // Screenshot is the verification anchor — required. TxID is optional.
    if (!screenshot) { setError('Please upload a screenshot of the payment — we can\'t verify without it.'); return false; }
    return true;
  };

  const handleImage = (setter, maxKb) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxKb * 1024) { setError(`Image must be under ${maxKb >= 1024 ? `${maxKb / 1024}MB` : `${maxKb}KB`}.`); return; }
    setError('');
    try {
      setter(await fileToDataUrl(file));
    } catch {
      setError('Could not read that image — try a different file.');
    }
  };

  const isValidAmount = (v) =>
    Number.isFinite(v) && v >= MIN_SPOT_AMOUNT && Math.abs(v * 100 - Math.round(v * 100)) < 1e-6;

  const submit = async () => {
    setError('');
    const amt = finalAmount();
    if (!isValidAmount(amt)) { setError(`Amount must be at least $${MIN_SPOT_AMOUNT}, with up to two decimal places.`); return; }
    if (!validStep3()) return;
    setBusy(true);
    try {
      // slugify('—') etc. can return '' — never ship a degenerate slug.
      const slug = isBoost
        ? boostSpot.slug
        : (slugify(form.name) || 'spot') + '-' + Math.random().toString(36).slice(2, 6);
      const link = normUrl(form.website) || normUrl(form.socialLink);
      const name = isBoost ? boostSpot.name : form.name.trim();
      const payload = {
        slug,
        name,
        tagline: isBoost ? boostSpot.tagline : form.tagline.trim().slice(0, 100) || 'On FlexSpot.LOL',
        description: isBoost ? boostSpot.description : form.description.trim().slice(0, 1000),
        website: isBoost ? boostSpot.website : link,
        socials: isBoost
          ? boostSpot.socials
          : {
              ...(form.x.trim() ? { x: normSocial('x', form.x) } : {}),
              ...(form.instagram.trim() ? { instagram: normSocial('instagram', form.instagram) } : {}),
              ...(form.facebook.trim() ? { facebook: normSocial('facebook', form.facebook) } : {}),
              ...(form.linkedin.trim() ? { linkedin: normSocial('linkedin', form.linkedin) } : {}),
            },
        email: isBoost ? '' : form.email.trim(),
        logo: isBoost ? boostSpot.logo : form.logo || null,
        amount: amt,
        category: isBoost ? (boostSpot.category || 'startups') : form.category,
        paymentMethod: `USDT (${activeNetwork.name})`,
        paymentTxId: txId.trim(),
        paymentScreenshot: screenshot,
        ...(isBoost ? { isBoost: true, boostSlug: boostSpot.slug, contributorName: contribName.trim(), contributorHandle: contribHandle.trim() } : {}),
      };
      let submission;
      if (IS_LIVE) {
        // Live path: the edge function owns the record. createSubmission is
        // localStorage-only and the admin queue reads nothing in live mode —
        // using it here would make the claim silently disappear.
        const liveRes = await submitSpot(payload);
        submission = { id: (liveRes && liveRes.data && liveRes.data.id) || 'live-' + Date.now().toString(36), slug, live: true };
      } else {
        submission = createSubmission(payload);
      }
      if (isBoost && !IS_LIVE) {
        // Your name goes on their page the moment you chip in — the boost
        // amount itself lands after payment verification. (Demo-mode ledger
        // only; in live mode the backend owns contribution records.)
        addContribution(boostSpot.slug, {
          name: contribName.trim() || 'Anonymous booster',
          handle: contribHandle.trim(),
          amount: amt,
        });
      }
      setResult({ submission, amount: amt, name });
      trackEvent('deposit_submit', { amount: amt, isBoost, spotSlug: slug });
      // Email notifications (fire-and-forget — never blocks the UX):
      // buyer gets "payment received, pending verification", Dawood gets an
      // admin alert with the proof details. Works in demo + live mode.
      try {
        const claimRef = 'FS-' + Date.now().toString(36).toUpperCase();
        // Central queue (server-side, shared with the admin across devices).
        saveSubmissionCentral({
          id: submission.id,
          brandName: name,
          slug,
          amount: amt,
          email: isBoost ? '' : form.email.trim(),
          name: isBoost ? (contribName.trim() || 'Booster') : form.name.trim(),
          tagline: submission.tagline,
          website: submission.website,
          category: submission.category,
          isBoost,
          boostSlug: isBoost ? boostSpot.slug : '',
          network: activeNetwork.name,
          txId: txId.trim(),
          hasScreenshot: !!screenshot,
          claimRef,
        }).then((r) => { if (!r.ok) console.warn('[queue] central save failed', r.error); });
        notifyClaimSubmitted({
          buyerName: isBoost ? (contribName.trim() || 'Booster') : form.name.trim(),
          buyerEmail: isBoost ? '' : form.email.trim(),
          brandName: name,
          amount: amt,
          network: activeNetwork.name,
          txId: txId.trim(),
          hasScreenshot: !!screenshot,
          claimRef,
        }).then((r) => {
          if (!r.adminAlertSent) console.warn('[email] admin alert not sent', r.errors);
        });
      } catch (e) { console.warn('[email] notify failed', e); }
      if (!isBoost) {
        // Stage the account: payment under review → member access activates
        // after admin approval. The dashboard gate shows this two-step state.
        stagePendingClaim({ name, email: form.email.trim(), amount: amt, slug });
      }
      setStep(doneStep);
      onSubmitted && onSubmitted();
    } catch (e) {
      setError(e.message || 'Something went wrong. Try again.');
    } finally {
      setBusy(false);
    }
  };

  if (boostSlug && !boostSpot) {
    return (
      <div className="pt-[92px] min-h-screen grid place-items-center px-4">
        <div className="card p-10 text-center max-w-sm">
          <Flee><div className="text-5xl mb-4">🔍</div></Flee>
          <h1 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Spot not found</h1>
          <p className="text-sm text-[var(--ink-2)] mb-6">The brand you're trying to boost isn't on the board anymore.</p>
          <Link to="/leaderboard" className="btn-primary px-6 py-3 text-sm">Back to leaderboard</Link>
        </div>
      </div>
    );
  }

  // STEP 4 — Pending Approval (terminal, honest)
  if (step === doneStep && result) {
    return (
      <div className="pt-[92px] min-h-screen px-4">
        <Celebration />
        <div className="max-w-lg mx-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 sm:p-10 text-center"
          >
            <div className="inline-flex items-center gap-2 pill pill-gold mb-5">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              Pending Approval
            </div>
            <Flee><div className="text-6xl mb-4">🎉</div></Flee>
            <h1 className="font-display font-extrabold text-3xl text-[var(--ink)] mb-3">
              {isBoost ? 'Boost received' : 'Spot submitted'}
            </h1>
            <p className="text-[var(--ink-2)] text-sm leading-relaxed mb-6">
              <b className="text-[var(--ink)]">{result.name}</b> · {money2(result.amount)} ·{' '}
              {isBoost ? 'boost' : 'new spot'}
              <br />
              {isBoost
                ? (IS_LIVE
                    ? 'Your boost is received — it lands on the board once we verify your payment.'
                    : 'Your name is already showing in their Boost squad. The boost amount lands on the board once we verify your payment.')
                : 'Our team is reviewing your payment proof. Most submissions are reviewed within 24 hours.'}
              {!IS_LIVE && !isBoost && ' This is preview mode — approve it in the admin dashboard to see it go live.'}
            </p>
            <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-5 text-left space-y-3 mb-6">
              {[
                ['Submitted', '✓ Just now'],
                ['Payment method', `USDT (${activeNetwork.name})`],
                ['Screenshot', '✓ Received'],
                ['Transaction ID', txId || '—'],
                ['Review status', 'Awaiting review'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-[var(--ink-2)]">{k}</span>
                  <span className="font-semibold text-[var(--ink)] font-mono text-[13px]">{v}</span>
                </div>
              ))}
            </div>
            <Link to="/leaderboard" className="btn-gold w-full py-3.5 text-sm font-extrabold">
              Watch the leaderboard →
            </Link>
            <p className="text-[11px] text-[var(--ink-3)] mt-5">
              You're already on the leaderboard — marked pending until we verify your payment.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[92px] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <div className="text-[10px] font-bold tracking-[0.2em] text-[var(--blaze)] uppercase mb-2">
            {isBoost ? 'Boost a brand' : 'Claim your spot'}
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)]">
            {isBoost ? <>Boost <span className="grad-text">{boostSpot.name}</span></> : <>Your brand deserves <span className="grad-text">a spot.</span></>}
          </h1>
          <p className="text-[var(--ink-2)] text-sm mt-3 max-w-md mx-auto">
            {isBoost
              ? 'Chip in $1+ to push them up the board — your name shows on their page instantly. 🚀'
              : 'Submit your brand, verify payment, and get approved onto the live leaderboard.'}
          </p>
        </div>

        {/* progress — labeled steps */}
        <div className="flex gap-1.5 mb-2">
          {(isBoost ? [1, 2] : [1, 2, 3]).map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-[var(--blaze)]' : 'bg-[var(--line)]'}`} />
          ))}
        </div>
        <div className="flex mb-8 text-[11px] font-bold uppercase tracking-wider">
          {(isBoost ? ['💰 Amount', '💳 Payment'] : ['🎯 Your brand', '💰 Amount', '💳 Payment']).map((l, i) => (
            <div key={l} className={`flex-1 text-center ${i + 1 <= step ? 'text-[var(--blaze)]' : 'text-[var(--ink-3)]'}`}>{l}</div>
          ))}
        </div>

        {error && (
          <div className="mb-5 text-sm bg-red-500/10 border border-red-500/30 text-red-600 rounded-2xl px-4 py-3">{error}</div>
        )}

        {/* STEP 1 — brand essentials */}
        {step === 1 && !isBoost && (
          <div className="card p-6 sm:p-8 space-y-5">
            <div>
              <label className="label">Brand name / your name *</label>
              <input className="field" placeholder="e.g. Brewline Coffee" value={form.name} onChange={(e) => set('name', e.target.value)} maxLength={60} />
            </div>
            <div>
              <label className="label">What is it? *</label>
              <textarea className="field" rows={3} placeholder="One or two sentences — who is it for and why it's great. Shows under your name on the board." value={form.description} onChange={(e) => set('description', e.target.value)} maxLength={1000} />
            </div>
            <div>
              <label className="label">Category *</label>
              <select className="field" value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Logo / profile picture <span className="font-normal text-[var(--ink-3)]">(optional — makes you stand out)</span></label>
              <div className="flex items-center gap-3">
                {form.logo && <img src={form.logo} alt="" className="w-14 h-14 rounded-2xl object-cover border border-[var(--line)]" />}
                <label className="btn-ghost px-5 py-2.5 text-sm cursor-pointer">
                  {form.logo ? 'Change picture' : 'Upload picture'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImage((v) => set('logo', v), 5120)} />
                </label>
                {!form.logo && <span className="text-xs text-[var(--ink-3)]">Any image up to 5MB</span>}
              </div>
            </div>
            <div>
              <label className="label">Where can people find you? *</label>
              <div className="grid sm:grid-cols-2 gap-3">
                <input className="field" placeholder="🌐  yoursite.com" value={form.website} onChange={(e) => set('website', e.target.value)} />
                <input className="field" placeholder="📱  instagram.com/you" value={form.socialLink} onChange={(e) => set('socialLink', e.target.value)} />
              </div>
              <p className="text-xs text-[var(--ink-3)] mt-1.5">Website <b>or</b> a social link — at least one is required.</p>
            </div>

            {/* optional extras */}
            <div className="rounded-2xl border border-[var(--line)] overflow-hidden">
              <button
                type="button"
                onClick={() => setShowExtras((v) => !v)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-bold text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
              >
                <span>✨ Extras <span className="font-medium text-[var(--ink-3)]">(optional — tagline, email, socials)</span></span>
                <span className={`transition-transform ${showExtras ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {showExtras && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-[var(--line)]">
                  <div>
                    <label className="label">Tagline</label>
                    <input className="field" placeholder="One line that hooks people" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} maxLength={100} />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input className="field" placeholder="you@email.com — only if you want updates" value={form.email} onChange={(e) => set('email', e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Social profiles <span className="font-normal text-[var(--ink-3)]">(shown as icons on your page)</span></label>
                    <div className="grid grid-cols-2 gap-3">
                      <input className="field" placeholder="𝕏  @handle or link" value={form.x} onChange={(e) => set('x', e.target.value)} />
                      <input className="field" placeholder="📸  Instagram" value={form.instagram} onChange={(e) => set('instagram', e.target.value)} />
                      <input className="field" placeholder="📘  Facebook" value={form.facebook} onChange={(e) => set('facebook', e.target.value)} />
                      <input className="field" placeholder="💼  LinkedIn" value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => { setError(''); if (validStep1()) setStep(amountStep); }} className="btn-primary w-full py-3.5 text-[15px]">
              Continue → Choose amount
            </button>
            <p className="text-center text-xs text-[var(--ink-3)]">No account needed. Takes under a minute.</p>
          </div>
        )}

        {/* STEP — amount */}
        {step === amountStep && (
          <div className="card p-6 sm:p-8">
            {isBoost ? (
              <>
                {/* Current standing: how much is already paid + current rank */}
                <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-4 mb-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-bold text-[var(--ink)] truncate">{boostSpot.name}</div>
                    <div className="text-sm text-[var(--ink-2)]">💰 {money2(boostSpot.amount)} already boosted</div>
                  </div>
                  <div className="text-right shrink-0 pl-3">
                    <div className="text-[11px] uppercase tracking-wide text-[var(--ink-3)]">Rank</div>
                    <div className="font-display font-black text-2xl text-[var(--gold-deep)]">#{boostSpot.rank}</div>
                  </div>
                </div>
                <p className="text-[var(--ink-2)] text-sm mb-4">
                  Tap an amount to see which place it takes <b className="text-[var(--ink)]">{boostSpot.name}</b> to.
                </p>
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => { setAmount(a); setCustom(''); }}
                      className={`rounded-2xl py-3 border transition-all flex flex-col items-center gap-0.5 ${
                        amount === a && custom === ''
                          ? 'bg-[var(--blaze-soft)] border-[var(--blaze)] text-[var(--blaze-deep)] shadow-[var(--shadow-blaze)]'
                          : 'bg-[var(--surface)] border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--ink-3)]'
                      }`}
                    >
                      <span className="font-display font-bold text-lg">${a}</span>
                      <span className={`text-[11px] font-semibold ${amount === a && custom === '' ? '' : 'text-[var(--ink-3)]'}`}>
                        → #{quickRanks[a] ?? '–'}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="label">Or custom amount (min $1)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)] font-bold">$</span>
                    <input className="field" style={{ paddingLeft: '2.25rem' }} inputMode="decimal" placeholder="25.50" value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ''))} />
                    {customRank && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--gold-deep)]">→ #{customRank}</span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-[var(--ink-2)] text-sm mb-5">
                  Your amount <b className="text-[var(--ink)]">is your ranking power</b>. More = higher on the board. Minimum $1 — no fees, what you pay is what counts.
                </p>
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => { setAmount(a); setCustom(''); }}
                      className={`rounded-2xl py-4 font-display font-bold text-lg border transition-all ${
                        amount === a && custom === ''
                          ? 'bg-[var(--blaze-soft)] border-[var(--blaze)] text-[var(--blaze-deep)] shadow-[var(--shadow-blaze)]'
                          : 'bg-[var(--surface)] border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--ink-3)]'
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="label">Or custom amount (min $1)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)] font-bold">$</span>
                    <input className="field" style={{ paddingLeft: '2.25rem' }} inputMode="decimal" placeholder="25.50" value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ''))} />
                  </div>
                </div>
              </>
            )}
            <div className="rounded-2xl bg-[var(--green-soft)] border border-[var(--green)]/25 p-4 flex items-center justify-between mb-4">
              <span className="text-sm text-[var(--ink-2)]">Your amount — no fees</span>
              <span className="font-display font-bold text-2xl text-[#0A8A4E]">{money2(finalAmount())}</span>
            </div>
            {projection && (
              <div className="rounded-2xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 p-4 text-sm mb-6">
                {isBoost ? (
                  <>
                    <div className="font-bold text-[var(--ink)]">
                      ⚡ Your {money2(finalAmount())} → {boostSpot.name} lands at{' '}
                      <span className="text-[var(--gold-deep)]">#{projection.rank}</span>.
                    </div>
                    <div className="text-[var(--ink-2)] text-xs mt-1">
                      The full {money2(finalAmount())} goes to the brand — more dollars, higher place.
                    </div>
                    {projection.above && projection.rank > 1 && (
                      <div className="text-[var(--ink-2)] text-xs mt-1">
                        Just <b className="text-[var(--ink)]">{money2(Math.max(0.01, Math.round((projection.above.amount - (boostSpot.amount + finalAmount()) + 0.01) * 100) / 100))}</b> more to pass{' '}
                        <b className="text-[var(--ink)]">{projection.above.name}</b> at #{projection.rank - 1}. 😬
                      </div>
                    )}
                    {projection.rank === 1 && (
                      <div className="text-[var(--ink-2)] text-xs mt-1">The crown would be {boostSpot.name}'s. 👑</div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="font-bold text-[var(--ink)]">
                      💪 {money2(finalAmount())} would land you at{' '}
                      <span className="text-[var(--gold-deep)]">#{projection.rank}</span> right now.
                    </div>
                    {projection.above && projection.rank > 1 && (
                      <div className="text-[var(--ink-2)] text-xs mt-1">
                        Just <b className="text-[var(--ink)]">{money2(Math.max(0.01, Math.round((projection.above.amount - finalAmount() + 0.01) * 100) / 100))}</b> more to pass{' '}
                        <b className="text-[var(--ink)]">{projection.above.name}</b> at #{projection.rank - 1}. 😬
                      </div>
                    )}
                    {projection.rank === 1 && (
                      <div className="text-[var(--ink-2)] text-xs mt-1">The crown would be yours. 👑 Defend it well.</div>
                    )}
                  </>
                )}
              </div>
            )}
            <div className="flex gap-2.5">
              {!isBoost && <button onClick={() => { setError(''); setStep(1); }} className="btn-ghost px-5 py-3.5 text-sm">← Back</button>}
              <button onClick={() => { if (isValidAmount(finalAmount())) { setError(''); setStep(payStep); } else { setError(`Amount must be at least $${MIN_SPOT_AMOUNT}, with up to two decimal places.`); } }} className="btn-primary flex-1 py-3.5 text-[15px]">Continue → Payment proof</button>
            </div>
          </div>
        )}

        {/* STEP — crypto payment proof */}
        {step === payStep && (
          <div className="card p-6 sm:p-8 space-y-5">
            {isBoost && (
              <div className="rounded-2xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 p-5">
                <h3 className="font-display font-bold text-[var(--ink)] mb-1">📣 Get your name on their page</h3>
                <p className="text-xs text-[var(--ink-2)] mb-4">Everyone who chips in shows up in {boostSpot.name}'s <b>Boost squad</b> — like a public high-five. 💪</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="label">Your name</label>
                    <input className="field" placeholder="e.g. Sara K." value={contribName} onChange={(e) => setContribName(e.target.value)} maxLength={40} />
                  </div>
                  <div>
                    <label className="label">Handle / company / ID <span className="font-normal text-[var(--ink-3)]">(optional)</span></label>
                    <input className="field" placeholder="@instagram or company" value={contribHandle} onChange={(e) => setContribHandle(e.target.value)} maxLength={40} />
                  </div>
                </div>
              </div>
            )}
            <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--ink-2)]">{isBoost ? 'Boosting' : 'New spot'}</span>
                <span className="font-semibold text-[var(--ink)]">{isBoost ? boostSpot.name : form.name}</span>
              </div>
              <div className="flex justify-between font-display font-bold text-lg">
                <span>Total due</span>
                <span className="text-[var(--blaze)]">{money2(finalAmount())}</span>
              </div>
              <div className="text-[11px] text-[var(--ink-3)] mt-1">Crypto only · no fees · what you send is what counts</div>
            </div>

            <div className="rounded-2xl bg-[var(--blue-soft)] border border-[var(--blue)]/30 p-5">
              <h3 className="font-display font-bold text-[var(--ink)] mb-2">💳 Pay with crypto — USDT only</h3>
              <ol className="text-sm text-[var(--ink-2)] space-y-2 list-decimal list-inside">
                <li>Send <b className="text-[var(--ink)]">{money2(finalAmount())}</b> USDT to the address below.</li>
                <li>Upload a screenshot of the completed payment <b className="text-[var(--ink)]">(required)</b>.</li>
                <li>Paste the transaction ID if you have it (optional).</li>
                <li>Our team verifies — then your spot goes live. 🚀</li>
              </ol>
            </div>

            <div>
              <label className="label">Choose network *</label>
              <div className="chip-row">
                {USDT_NETWORKS.map((n) => (
                  <button key={n.id} type="button" onClick={() => setNetwork(n.id)} className={`chip ${network === n.id ? 'active' : ''}`}>
                    {n.label} · {n.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-5 text-center">
              {unofficialHost ? (
                <div className="py-6">
                  <div className="text-4xl mb-3">🛡️</div>
                  <div className="font-display font-bold text-red-500 text-lg mb-2">Payments disabled on this copy</div>
                  <p className="text-sm text-[var(--ink-2)] max-w-sm mx-auto">
                    This page is not running on the official FlexSpot domain, so payment details
                    are hidden to protect you. Please continue only at <b className="text-[var(--ink)]">flexspot.lol</b>.
                  </p>
                </div>
              ) : (
              <>
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-500 mb-3">
                <span>🔒 You're on <b>{currentHost()}</b> — always confirm the address bar before sending</span>
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-3">
                Scan to pay {money2(finalAmount())} USDT ({activeNetwork.name})
              </div>
              <div className="inline-block bg-white p-3 rounded-2xl border border-[var(--line)]">
                <QRCodeSVG value={activeNetwork.address} size={200} level="M" />
              </div>
              <div className="mt-4">
                <div className="text-xs text-[var(--ink-3)] mb-1.5">Deposit address — tap to copy · verify the first &amp; last characters</div>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="w-full font-mono text-[13px] break-all bg-[#101223] rounded-xl px-4 py-3.5 border border-[#2A2D4A] hover:border-[var(--blaze)] transition-colors"
                  title="Tap to copy"
                >
                  <span className="text-white font-bold">{activeNetwork.address.slice(0, 10)}</span><span className="text-white/45">{activeNetwork.address.slice(10, -10)}</span><span className="text-white font-bold">{activeNetwork.address.slice(-10)}</span>
                </button>
                <button type="button" onClick={copyAddress} className="btn-primary px-5 py-2.5 text-xs mt-3">
                  {copied ? '✓ Copied!' : '⧉ Copy address'}
                </button>
              </div>
              <p className="text-xs text-[var(--ink-3)] mt-3">⚠️ {activeNetwork.note}</p>
              </>
              )}
            </div>

            <div>
              <label className="label">Transaction ID / payment reference <span className="font-normal text-[var(--ink-3)]">(optional)</span></label>
              <input className="field font-mono" placeholder="Paste it if you have it" value={txId} onChange={(e) => setTxId(e.target.value)} />
            </div>

            <div>
              <label className="label">Payment screenshot * <span className="font-normal text-[var(--ink-3)]">(required — this is how we verify you)</span></label>
              <div className="rounded-2xl border-2 border-dashed border-[var(--line)] p-6 text-center">
                {screenshot ? (
                  <div>
                    <img src={screenshot} alt="Payment proof" className="max-h-48 mx-auto rounded-xl border border-[var(--line)] mb-3" />
                    <label className="btn-ghost px-4 py-2 text-xs cursor-pointer">
                      Replace screenshot
                      <input type="file" accept="image/*" className="hidden" onChange={handleImage(setScreenshot, 2000)} />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="text-4xl mb-2">🧾</div>
                    <div className="font-semibold text-sm text-[var(--ink)]">Upload payment screenshot</div>
                    <div className="text-xs text-[var(--ink-3)] mt-1">PNG/JPG under 2MB — must show the amount and date</div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImage(setScreenshot, 2000)} />
                  </label>
                )}
              </div>
            </div>

            <p className="text-xs text-[var(--ink-3)] leading-relaxed text-center">
              ⚠️ By submitting, you agree to our{' '}
              <Link to="/terms" className="text-[var(--blaze)] hover:underline font-semibold">Terms of Service</Link>{' '}
              and <Link to="/disclaimers" className="text-[var(--blaze)] hover:underline font-semibold">Disclaimers</Link>.
              All sales are final once published. Crypto transfers are irreversible — double-check the
              wallet address and network before sending.
            </p>

            <div className="flex gap-2.5">
              <button onClick={() => { setError(''); setStep(amountStep); }} className="btn-ghost px-5 py-3.5 text-sm">← Back</button>
              <button onClick={submit} disabled={busy} className="btn-gold flex-1 py-3.5 text-[15px]">
                {busy ? 'Submitting…' : `Submit for review — ${money2(finalAmount())}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
