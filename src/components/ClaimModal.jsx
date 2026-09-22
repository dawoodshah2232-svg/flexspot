import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slugify, money2, copyText } from '../lib/format';
import { submitSpot, approveLocalSpot, IS_LIVE, refCodeFor, recordReferralJoin } from '../lib/store';
import ShareButtons from './ShareButtons';

const AMOUNTS = [1, 5, 10, 25, 50, 100];

export default function ClaimModal({ open, onClose, onDone, boostSpot = null, initialRef = null }) {
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    name: '', tagline: '', description: '', website: '', x: '', instagram: '', email: '', logo: '',
  });
  const [isGift, setIsGift] = useState(false);
  const [giftFrom, setGiftFrom] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const isBoost = !!boostSpot;

  const reset = () => {
    setStep(1); setError(''); setBusy(false); setResult(null); setCopied(false);
    setForm({ name: '', tagline: '', description: '', website: '', x: '', instagram: '', email: '', logo: '' });
    setIsGift(false); setGiftFrom(''); setGiftMessage('');
    setAmount(10); setCustom('');
  };

  const close = () => { reset(); onClose(); };

  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 350 * 1024) { setError('Logo must be under 350KB.'); return; }
    const r = new FileReader();
    r.onload = () => set('logo', r.result);
    r.readAsDataURL(file);
  };

  const validStep1 = () => {
    if (isBoost) return true;
    if (form.name.trim().length < 2) { setError(isGift ? 'Please enter your friend\'s name (min 2 characters).' : 'Please enter a name (min 2 characters).'); return false; }
    if (!form.website.trim()) { setError('Please add a website or social link.'); return false; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) { setError('Please enter a valid email for the management link.'); return false; }
    if (isGift && giftFrom.trim().length < 2) { setError('Please tell us your name so your friend knows who surprised them.'); return false; }
    return true;
  };

  const finalAmount = () => {
    const c = parseFloat(custom);
    if (custom !== '' && Number.isFinite(c)) return Math.max(1, Math.round(c * 2) / 2);
    return amount;
  };

  const submit = async () => {
    setError('');
    const amt = finalAmount();
    if (!(amt >= 1) || Math.round(amt * 100) % 50 !== 0) { setError('Contribution must be $1+ in $0.50 steps.'); return; }
    setBusy(true);
    try {
      const slugBase = isBoost ? boostSpot.slug : slugify(form.name);
      const slug = slugBase + (isBoost ? '' : '-' + Math.random().toString(36).slice(2, 6));
      const payload = isBoost
        ? { slug: boostSpot.slug, name: boostSpot.name, autoApprove: true, isBoost: true, amount: amt }
        : {
            slug,
            name: form.name.trim(),
            tagline: form.tagline.trim().slice(0, 100) || 'On FlexSpot.LOL',
            description: form.description.trim().slice(0, 1000),
            website: /^https?:\/\//i.test(form.website.trim()) ? form.website.trim() : 'https://' + form.website.trim(),
            socials: {
              ...(form.x.trim() ? { x: form.x.trim() } : {}),
              ...(form.instagram.trim() ? { instagram: form.instagram.trim() } : {}),
            },
            email: form.email.trim(),
            logo: form.logo || null,
            amount: amt,
            autoApprove: false,
            gift: isGift ? { from: giftFrom.trim(), message: giftMessage.trim().slice(0, 280) } : null,
          };
      const res = await submitSpot(payload);
      if (initialRef) recordReferralJoin(initialRef);
      setResult({ ...res, slug: payload.slug, amount: amt, name: payload.name });
      // Demo mode: auto-approve after a moment so the viral loop is visible
      if (!IS_LIVE && !isBoost) {
        setTimeout(() => { approveLocalSpot(payload.slug); onDone && onDone(); }, 9000);
      } else {
        onDone && onDone();
      }
      setStep(4);
    } catch (e) {
      setError(e.message || 'Something went wrong. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const copyProfile = async () => {
    const url = `${window.location.origin}/s/${result.slug}`;
    if (await copyText(url)) { setCopied(true); setTimeout(() => setCopied(false), 1800); }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="modal-backdrop" onClick={close}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-coal border border-line/10 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto no-scrollbar shadow-card"
          >
            <div className="sticky top-0 bg-coal/95 backdrop-blur border-b border-line/5 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-electric uppercase">
                  {step < 4 ? `Step ${step} of 3` : 'You\'re live-ish 🎉'}
                </div>
                <h2 className="font-display font-bold text-xl text-snow">
                  {isBoost ? `Boost ${boostSpot.name}` : step === 4 ? 'Spot claimed!' : 'Claim your spot'}
                </h2>
              </div>
              <button onClick={close} className="w-9 h-9 grid place-items-center rounded-full bg-line/5 text-mist hover:text-snow text-lg">✕</button>
            </div>

            <div className="p-6">
              {step < 4 && (
                <div className="flex gap-1.5 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-electric' : 'bg-line/10'}`} />
                  ))}
                </div>
              )}

              {error && <div className="mb-4 text-sm bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl px-4 py-3">{error}</div>}

              {/* STEP 1 — details */}
              {step === 1 && !isBoost && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2.5 p-1 rounded-2xl bg-line/5 border border-line/10">
                    <button
                      onClick={() => setIsGift(false)}
                      className={`rounded-xl py-2.5 text-sm font-bold transition-all ${!isGift ? 'bg-electric text-white shadow-glowblue' : 'text-mist hover:text-snow'}`}
                    >
                      ⚡ For myself
                    </button>
                    <button
                      onClick={() => setIsGift(true)}
                      className={`rounded-xl py-2.5 text-sm font-bold transition-all ${isGift ? 'bg-gradient-to-r from-gold to-golddeep text-[#231600]' : 'text-mist hover:text-snow'}`}
                    >
                      🎁 Surprise a friend
                    </button>
                  </div>
                  {isGift && (
                    <div className="rounded-2xl bg-gold/10 border border-gold/30 p-4 text-sm text-mist">
                      Put a friend's brand, company or profile in the spotlight — their name, picture and links go live, with your name on the surprise. 🎁
                    </div>
                  )}
                  <div>
                    <label className="lbl">{isGift ? "Friend's name / brand *" : 'Name / Brand *'}</label>
                    <input className="field" placeholder={isGift ? 'e.g. Ahmed\'s Bakery' : 'e.g. Brewline Coffee'} value={form.name} onChange={(e) => set('name', e.target.value)} maxLength={60} />
                  </div>
                  <div>
                    <label className="lbl">Tagline</label>
                    <input className="field" placeholder="One line that hooks people" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} maxLength={100} />
                  </div>
                  <div>
                    <label className="lbl">Description</label>
                    <textarea className="field min-h-[84px] resize-y" placeholder="What are you building? Why should people care?" value={form.description} onChange={(e) => set('description', e.target.value)} maxLength={1000} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="lbl">Website *</label>
                      <input className="field" placeholder="yoursite.com" value={form.website} onChange={(e) => set('website', e.target.value)} />
                    </div>
                    <div>
                      <label className="lbl">Email *</label>
                      <input className="field" placeholder="you@email.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="lbl">X / Twitter</label>
                      <input className="field" placeholder="@handle" value={form.x} onChange={(e) => set('x', e.target.value)} />
                    </div>
                    <div>
                      <label className="lbl">Instagram</label>
                      <input className="field" placeholder="@handle" value={form.instagram} onChange={(e) => set('instagram', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="lbl">Logo</label>
                    <div className="flex items-center gap-3">
                      {form.logo && <img src={form.logo} alt="" className="w-12 h-12 rounded-xl object-cover border border-line/10" />}
                      <label className="btn-ghost px-4 py-2.5 text-sm cursor-pointer">
                        {form.logo ? 'Change logo' : isGift ? 'Upload their picture' : 'Upload logo'}
                        <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
                      </label>
                      <span className="text-xs text-mist">PNG/JPG under 350KB</span>
                    </div>
                  </div>
                  {isGift && (
                    <>
                      <div>
                        <label className="lbl">Your name (shown on the surprise) *</label>
                        <input className="field" placeholder="e.g. Sara" value={giftFrom} onChange={(e) => setGiftFrom(e.target.value)} maxLength={40} />
                      </div>
                      <div>
                        <label className="lbl">Your message to them</label>
                        <textarea className="field min-h-[72px] resize-y" placeholder="e.g. Happy birthday! You deserve the #1 spot 🎉" value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} maxLength={280} />
                      </div>
                    </>
                  )}
                  <button onClick={() => { setError(''); if (validStep1()) setStep(2); }} className="btn-primary w-full py-3.5 text-[15px]">
                    Continue → Choose contribution
                  </button>
                  <p className="text-center text-xs text-mist">No signup needed. Takes under a minute.</p>
                </div>
              )}

              {/* STEP 2 — amount */}
              {step === 2 && (
                <div>
                  <p className="text-mist text-sm mb-4">
                    {isBoost
                      ? <>How much do you want to add to <b className="text-snow">{boostSpot.name}</b>'s total? Every dollar moves it up the board.</>
                      : isGift
                        ? <>Your gift contribution <b className="text-snow">is their ranking power</b>. More support = higher spot for your friend. Minimum $1.</>
                        : isGift
                        ? <>Your gift contribution <b className="text-snow">is their ranking power</b>. More support = higher spot for your friend. Minimum $1.</>
                        : isGift
                        ? <>Your gift contribution <b className="text-snow">is their ranking power</b>. More support = higher spot for your friend. Minimum $1.</>
                        : isGift
                        ? <>Your gift contribution <b className="text-snow">is their ranking power</b>. More support = higher spot for your friend. Minimum $1.</>
                        : isGift
                        ? <>Your gift contribution <b className="text-snow">is their ranking power</b>. More support = higher spot for your friend. Minimum $1.</>
                        : isGift
                        ? <>Your gift contribution <b className="text-snow">is their ranking power</b>. More support = higher spot for your friend. Minimum $1.</>
                        : <>Your contribution <b className="text-snow">is your ranking power</b>. More support = higher spot. Minimum $1.</>}
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    {AMOUNTS.map((a) => (
                      <button
                        key={a}
                        onClick={() => { setAmount(a); setCustom(''); }}
                        className={`rounded-2xl py-4 font-display font-bold text-lg border transition-all ${
                          amount === a && custom === '' ? 'bg-electric/20 border-electric text-snow shadow-glowblue' : 'bg-line/5 border-line/10 text-mist hover:border-line/25'
                        }`}
                      >
                        ${a}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="lbl">Or custom amount ($0.50 steps)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mist font-bold">$</span>
                      <input className="field pl-8" inputMode="decimal" placeholder="25.50" value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ''))} />
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl bg-neon/5 border border-neon/20 p-4 flex items-center justify-between">
                    <span className="text-sm text-mist">Your contribution</span>
                    <span className="font-display font-bold text-2xl text-neon">{money2(finalAmount())}</span>
                  </div>
                  <div className="flex gap-2.5 mt-5">
                    {!isBoost && <button onClick={() => setStep(1)} className="btn-ghost px-5 py-3.5 text-sm">← Back</button>}
                    <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3.5 text-[15px]">Continue → Payment</button>
                  </div>
                </div>
              )}

              {/* STEP 3 — payment (Phase 1: manual verification) */}
              {step === 3 && (
                <div>
                  <div className="rounded-2xl bg-card border border-line/10 p-5 mb-4">
                    <div className="flex justify-between text-sm mb-2"><span className="text-mist">{isBoost ? 'Boosting' : isGift ? 'Surprise gift for' : 'New spot'}</span><span className="font-semibold text-snow">{isBoost ? boostSpot.name : form.name}</span></div>
                    <div className="flex justify-between text-sm mb-2"><span className="text-mist">Contribution</span><span className="font-semibold text-snow">{money2(finalAmount())}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-mist">Fees</span><span className="font-semibold text-neon">$0.00</span></div>
                    <div className="border-t border-line/10 mt-3 pt-3 flex justify-between font-display font-bold text-lg"><span>Total due</span><span className="text-neon">{money2(finalAmount())}</span></div>
                  </div>
                  <div className="rounded-2xl bg-electric/10 border border-electric/30 p-5">
                    <h3 className="font-display font-bold text-snow mb-2">💳 Manual payment — Phase 1</h3>
                    <ol className="text-sm text-mist space-y-2 list-decimal list-inside">
                      <li>Tap <b className="text-snow">"I've completed payment"</b> to lock in your spot.</li>
                      <li>Send <b className="text-snow">{money2(finalAmount())}</b> to our payment handle (details arrive by email).</li>
                      <li>Our team verifies within a few hours — your spot then goes live automatically.</li>
                    </ol>
                    <p className="text-xs text-mist/70 mt-3">Automatic checkout is coming soon. Early spots get a permanent Early Adopter badge. ⚡</p>
                  </div>
                  <div className="flex gap-2.5 mt-5">
                    <button onClick={() => setStep(2)} className="btn-ghost px-5 py-3.5 text-sm">← Back</button>
                    <button onClick={submit} disabled={busy} className="btn-gold flex-1 py-3.5 text-[15px] disabled:opacity-60">
                      {busy ? 'Locking in your spot…' : `I've completed payment — ${money2(finalAmount())}`}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 — success */}
              {step === 4 && result && (
                <div className="text-center">
                  <div className="text-6xl mb-3 anim-pop">🎉</div>
                  <h3 className="font-display font-bold text-2xl text-snow mb-2">
                    {isBoost ? 'Boost locked in!' : isGift ? '🎁 Surprise gift locked in!' : IS_LIVE ? 'Spot submitted!' : 'Spot claimed!'}
                  </h3>
                  <p className="text-mist text-sm mb-5 max-w-sm mx-auto">
                    {isBoost
                      ? <>Your <b className="text-neon">{money2(result.amount)}</b> boost for <b className="text-snow">{result.name}</b> is being verified. Watch it climb.</>
                      : isGift
                        ? <>Your surprise gift for <b className="text-snow">{result.name}</b>{IS_LIVE ? ' is in review — once payment is verified it goes live' : <> is <b className="text-neon">live in this preview</b> — it'll appear on the leaderboard in a few seconds</>}. Share the link with them and watch their reaction. 🎁</>
                        : IS_LIVE
                        ? <>Your spot is in review. Once payment is verified, <b className="text-snow">{result.name}</b> goes live on the leaderboard automatically.</>
                        : <>Your spot is <b className="text-neon">live in this preview</b> — it'll appear on the leaderboard in a few seconds. Share it and start climbing.</>}
                  </p>
                  <div className="rounded-2xl bg-line/5 border border-line/10 p-4 mb-5">
                    <div className="text-[11px] uppercase tracking-widest text-mist font-bold mb-2">Your public page</div>
                    <button onClick={copyProfile} className="font-mono text-sm text-electric break-all hover:underline">
                      {window.location.origin}/s/{result.slug}
                    </button>
                    <div className="text-xs text-mist mt-2">{copied ? '✓ Link copied!' : 'Share this link — every visit counts.'}</div>
                  </div>
                  {!isBoost && (
                    <>
                      <div className="text-[11px] uppercase tracking-widest text-mist font-bold mb-3">Help {result.name} reach #1</div>
                      <div className="flex justify-center mb-5">
                        <ShareButtons spot={{ slug: result.slug, name: result.name }} compact />
                      </div>
                      <div className="rounded-2xl bg-neon/5 border border-neon/20 p-4 text-left">
                        <div className="text-sm font-bold text-snow mb-1">🔗 Your referral code: <span className="font-mono text-neon">{refCodeFor(result.slug)}</span></div>
                        <p className="text-xs text-mist">Friends who join with your code boost your referral stats and unlock rewards.</p>
                      </div>
                    </>
                  )}
                  <button onClick={close} className="btn-primary w-full py-3.5 mt-6">Done — show me the leaderboard</button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
