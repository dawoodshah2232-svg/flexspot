// Spotlight Auction — weekly homepage spotlight auctions.
// 3 slots, 7-day rounds, $25 reserve, $5 minimum raise. Bids carry payment
// proof and are approved by hand — exactly like claims. Never any fake bids:
// every figure on this page comes from /api/auction or an honest empty state.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { USDT_NETWORKS } from '../lib/payments';
import { auctionState, placeBid } from '../lib/emailClient';
import { money2 } from '../lib/format';
import { useUnofficialHost } from '../components/SecurityGuard';
import { currentHost } from '../lib/security';
import FaqSection from '../components/FaqSection';
import { GEO_FAQS } from '../lib/geoFaqs';

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

function pad(n) { return String(n).padStart(2, '0'); }

function countdownParts(endsAt, now) {
  const ms = Math.max(0, endsAt - now);
  const d = Math.floor(ms / 864e5);
  const h = Math.floor((ms % 864e5) / 36e5);
  const m = Math.floor((ms % 36e5) / 6e4);
  const s = Math.floor((ms % 6e4) / 1000);
  return { d, h, m, s, over: ms <= 0 };
}

function Countdown({ endsAt, now, big }) {
  const { d, h, m, s, over } = countdownParts(endsAt, now);
  if (over) return <span className="text-sm font-bold text-[var(--ink-2)]">Round closing…</span>;
  const cell = (v, l) => (
    <span className={`inline-flex flex-col items-center rounded-xl bg-[var(--surface-2)] border border-[var(--line)] ${big ? 'px-3 py-2 min-w-[64px]' : 'px-2 py-1.5 min-w-[52px]'}`}>
      <span className={`font-display font-black text-[var(--ink)] ${big ? 'text-2xl' : 'text-lg'}`}>{pad(v)}</span>
      <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--ink-3)]">{l}</span>
    </span>
  );
  return (
    <div className="flex items-center gap-1.5">
      {cell(d, 'days')}{cell(h, 'hrs')}{cell(m, 'min')}{cell(s, 'sec')}
    </div>
  );
}

const HOW = [
  { icon: '🔨', t: 'Bid from $25', d: 'Each slot opens at a $25 reserve. Every new bid must beat the top by at least $5.' },
  { icon: '🧾', t: 'Pay + prove it', d: 'Send USDT and upload your payment screenshot — same as claiming a spot.' },
  { icon: '🛡️', t: 'Verified by hand', d: 'A real person checks every bid before it counts. No bots, no auto-approvals.' },
  { icon: '👑', t: 'Win 7 days of fame', d: 'The top bid when the round ends owns the homepage spotlight for a full week.' },
];

function SlotCard({ slot, onBid, now }) {
  const top = slot.topBid;
  return (
    <div className="card p-5 sm:p-6 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <div className="font-display font-extrabold text-lg text-[var(--ink)]">{slot.emoji} {slot.title}</div>
      </div>
      {top ? (
        <>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display font-black text-3xl text-[var(--gold-deep)]">${Number(top.amount).toFixed(2)}</span>
            <span className="text-xs font-bold text-[var(--ink-3)] uppercase tracking-wider">top bid</span>
          </div>
          <div className="text-sm font-bold text-[var(--ink)] truncate mt-1">{top.brandName}</div>
          <div className="text-[11px] text-[var(--ink-3)] mt-1">
            Next bid must be at least <b className="text-[var(--ink)]">${Number(slot.minNextBid).toFixed(2)}</b>
          </div>
        </>
      ) : (
        <>
          <div className="font-display font-black text-3xl text-[var(--ink-3)] mt-2">$25.00</div>
          <div className="text-sm text-[var(--ink-2)] mt-1">No bids yet — the slot opens at the $25 reserve.</div>
          <div className="text-[11px] text-[var(--ink-3)] mt-1">Be first and it only costs you $25.</div>
        </>
      )}
      <button onClick={() => onBid(slot)} className="btn-gold w-full py-3 mt-4 text-sm font-extrabold">
        Place a bid →
      </button>
    </div>
  );
}

export default function AuctionPage() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [now, setNow] = useState(Date.now());
  // bid form
  const [bidding, setBidding] = useState(false);
  const [slotId, setSlotId] = useState('spotlight-1');
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [tagline, setTagline] = useState('');
  const [amount, setAmount] = useState('');
  const [network, setNetwork] = useState(USDT_NETWORKS[0].id);
  const [txId, setTxId] = useState('');
  const [screenshot, setScreenshot] = useState('');
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);
  const unofficialHost = useUnofficialHost();
  const activeNetwork = USDT_NETWORKS.find((n) => n.id === network) || USDT_NETWORKS[0];

  const load = useCallback(async () => {
    const r = await auctionState();
    if (r.ok) { setData(r); setFailed(false); }
    else setFailed(true);
  }, []);

  useEffect(() => {
    load();
    const iv = setInterval(load, 30000); // poll every 30s
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => { clearInterval(iv); clearInterval(tick); };
  }, [load]);

  const activeSlot = useMemo(
    () => (data?.slots || []).find((s) => s.slot === slotId) || (data?.slots || [])[0],
    [data, slotId]
  );

  const startBid = (slot) => {
    setSlotId(slot.slot);
    setAmount(slot.minNextBid.toFixed(2));
    setStep(1);
    setError('');
    setDone(null);
    setBidding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pickSlot = (id) => {
    setSlotId(id);
    const s = (data?.slots || []).find((x) => x.slot === id);
    if (s) setAmount(s.minNextBid.toFixed(2));
    setError('');
  };

  const validStep1 = () => {
    if (!activeSlot) { setError('Auction data is still loading.'); return false; }
    if (brandName.trim().length < 2) { setError('Enter your brand name (min 2 characters).'); return false; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) { setError('Enter a valid email — outbid alerts go there.'); return false; }
    const a = Math.round(parseFloat(amount) * 100) / 100;
    if (!Number.isFinite(a) || a < activeSlot.minNextBid) {
      setError(`Your bid must be at least $${activeSlot.minNextBid.toFixed(2)} on this slot.`);
      return false;
    }
    return true;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(activeNetwork.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError('Image must be under 2MB.'); return; }
    setError('');
    try { setScreenshot(await fileToDataUrl(file)); } catch { setError('Could not read that image — try a different file.'); }
  };

  const submit = async () => {
    setError('');
    if (!validStep1()) { setStep(1); return; }
    if (!screenshot) { setError('Upload a screenshot of the payment — we can\'t verify without it.'); return; }
    setBusy(true);
    try {
      const r = await placeBid({
        slot: activeSlot.slot,
        brandName: brandName.trim(),
        email: email.trim(),
        website: website.trim(),
        tagline: tagline.trim(),
        amount: Math.round(parseFloat(amount) * 100) / 100,
        network: activeNetwork.name,
        txId: txId.trim(),
        hasScreenshot: true,
      });
      if (r.ok) {
        setDone({ brand: brandName.trim(), amount: parseFloat(amount), slot: activeSlot.title });
        setBidding(false);
        load();
      } else {
        // Server re-validates the minimum — surface its number if we raced.
        if (r.minNextBid) setAmount(Number(r.minNextBid).toFixed(2));
        setError(r.error || 'Bid failed — try again.');
      }
    } catch {
      setError('Network error — try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pt-[92px] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* header */}
        <div className="text-center mb-8">
          <div className="text-[10px] font-bold tracking-[0.2em] text-[var(--blaze)] uppercase mb-2">
            🔨 Spotlight Auction
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--ink)]">
            Own the homepage. <span className="grad-text">Outbid everyone.</span>
          </h1>
          <p className="text-[var(--ink-2)] text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Three homepage spotlights go to the highest bidder every week. Real bids, verified by hand — the winner holds the spotlight for 7 days.
          </p>
          {data && (
            <div className="mt-5 flex flex-col items-center gap-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-3)]">
                Round {data.roundId} ends in
              </div>
              <Countdown endsAt={data.endsAt} now={now} big />
            </div>
          )}
        </div>

        {/* bid form */}
        {bidding && activeSlot && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6 sm:p-8 max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-extrabold text-xl text-[var(--ink)]">
                {step === 1 ? 'Your bid' : 'Payment proof'}
              </h2>
              <button onClick={() => setBidding(false)} className="text-sm font-bold text-[var(--ink-3)] hover:text-[var(--ink)]">✕ Close</button>
            </div>
            {error && <div className="mb-5 text-sm bg-red-500/10 border border-red-500/30 text-red-600 rounded-2xl px-4 py-3">{error}</div>}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="label">Slot *</label>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {(data?.slots || []).map((s) => (
                      <button
                        key={s.slot}
                        type="button"
                        onClick={() => pickSlot(s.slot)}
                        className={`rounded-2xl border p-3 text-left transition-all ${slotId === s.slot ? 'border-[var(--gold)] bg-[var(--gold-soft)]' : 'border-[var(--line)] bg-[var(--surface)] hover:border-[var(--ink-3)]'}`}
                      >
                        <div className="text-sm font-bold text-[var(--ink)]">{s.emoji} {s.title}</div>
                        <div className="text-xs text-[var(--ink-2)] mt-1">
                          {s.topBid ? <>Top: <b className="text-[var(--ink)]">${Number(s.topBid.amount).toFixed(2)}</b></> : 'No bids yet'}
                        </div>
                        <div className="text-[11px] text-[var(--ink-3)]">Min: ${Number(s.minNextBid).toFixed(2)}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Brand name *</label>
                    <input className="field" placeholder="e.g. Brewline Coffee" value={brandName} onChange={(e) => setBrandName(e.target.value)} maxLength={80} />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input className="field" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p className="text-[11px] text-[var(--ink-3)] mt-1">Outbid alerts go here.</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Website</label>
                    <input className="field" placeholder="yoursite.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Tagline</label>
                    <input className="field" placeholder="One line that hooks" value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={140} />
                  </div>
                </div>
                <div>
                  <label className="label">Your bid (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)] font-bold">$</span>
                    <input className="field" style={{ paddingLeft: '2.25rem' }} inputMode="decimal" placeholder={activeSlot.minNextBid.toFixed(2)} value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))} />
                  </div>
                  <p className="text-[11px] text-[var(--ink-3)] mt-1">
                    Minimum on this slot: <b className="text-[var(--ink)]">${activeSlot.minNextBid.toFixed(2)}</b>
                    {activeSlot.topBid && <> — current top bid by <b className="text-[var(--ink)]">{activeSlot.topBid.brandName}</b></>}
                  </p>
                </div>
                <button onClick={() => { setError(''); if (validStep1()) setStep(2); }} className="btn-primary w-full py-3.5 text-[15px]">
                  Continue → Payment proof
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-5">
                <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--line)] p-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[var(--ink-2)]">Bidding on</span>
                    <span className="font-semibold text-[var(--ink)]">{activeSlot.emoji} {activeSlot.title}</span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-lg">
                    <span>Your bid</span>
                    <span className="text-[var(--blaze)]">${(Math.round(parseFloat(amount) * 100) / 100).toFixed(2)}</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-[var(--blue-soft)] border border-[var(--blue)]/30 p-5">
                  <h3 className="font-display font-bold text-[var(--ink)] mb-2">💳 Pay with crypto — USDT only</h3>
                  <ol className="text-sm text-[var(--ink-2)] space-y-2 list-decimal list-inside">
                    <li>Send <b className="text-[var(--ink)]">${(Math.round(parseFloat(amount) * 100) / 100).toFixed(2)}</b> USDT to the address below.</li>
                    <li>Upload a screenshot of the completed payment <b className="text-[var(--ink)]">(required)</b>.</li>
                    <li>Paste the transaction ID if you have it (optional).</li>
                    <li>We verify by hand — then your bid goes live. 🚀</li>
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
                        This page is not running on the official FlexSpot domain, so payment details are hidden to protect you. Please continue only at <b className="text-[var(--ink)]">flexspot.lol</b>.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-500 mb-3">
                        <span>🔒 You're on <b>{currentHost()}</b> — always confirm the address bar before sending</span>
                      </div>
                      <div className="inline-block bg-white p-3 rounded-2xl border border-[var(--line)]">
                        <QRCodeSVG value={activeNetwork.address} size={180} level="M" />
                      </div>
                      <div className="mt-4">
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
                  <label className="label">Transaction ID <span className="font-normal text-[var(--ink-3)]">(optional)</span></label>
                  <input className="field font-mono" placeholder="Paste it if you have it" value={txId} onChange={(e) => setTxId(e.target.value)} />
                </div>
                <div>
                  <label className="label">Payment screenshot * <span className="font-normal text-[var(--ink-3)]">(required)</span></label>
                  <div className="rounded-2xl border-2 border-dashed border-[var(--line)] p-6 text-center">
                    {screenshot ? (
                      <div>
                        <img src={screenshot} alt="Payment proof" className="max-h-48 mx-auto rounded-xl border border-[var(--line)] mb-3" />
                        <label className="btn-ghost px-4 py-2 text-xs cursor-pointer">
                          Replace screenshot
                          <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                        </label>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <div className="text-4xl mb-2">🧾</div>
                        <div className="font-semibold text-sm text-[var(--ink)]">Upload payment screenshot</div>
                        <div className="text-xs text-[var(--ink-3)] mt-1">PNG/JPG under 2MB — must show the amount and date</div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                      </label>
                    )}
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <button onClick={() => { setError(''); setStep(1); }} className="btn-ghost px-5 py-3.5 text-sm">← Back</button>
                  <button onClick={submit} disabled={busy} className="btn-gold flex-1 py-3.5 text-[15px]">
                    {busy ? 'Submitting…' : 'Submit bid for review'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* bid submitted */}
        {done && (
          <div className="card p-8 max-w-lg mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 pill pill-gold mb-5">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" /> Pending Approval
            </div>
            <div className="text-6xl mb-4">🔨</div>
            <h2 className="font-display font-extrabold text-2xl text-[var(--ink)] mb-3">Bid received</h2>
            <p className="text-[var(--ink-2)] text-sm leading-relaxed mb-6">
              <b className="text-[var(--ink)]">{done.brand}</b> · <b className="text-[var(--ink)]">${Number(done.amount).toFixed(2)}</b> · {done.slot}
              <br />
              Our team is reviewing your payment proof. Once approved, your bid goes live on this page — and if you're outbid later, we'll email you.
            </p>
            <button onClick={() => setDone(null)} className="btn-primary px-6 py-3 text-sm">Back to the auction →</button>
          </div>
        )}

        {/* slots */}
        {!failed && data && (
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {data.slots.map((s) => <SlotCard key={s.slot} slot={s} onBid={startBid} now={now} />)}
          </div>
        )}
        {failed && (
          <div className="card p-10 text-center mb-12">
            <div className="text-5xl mb-3">🛠️</div>
            <p className="text-[var(--ink-2)] text-sm">The auction feed isn't reachable right now — check back in a bit.</p>
          </div>
        )}

        {/* how it works */}
        <div className="mb-12">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] text-center mb-6">How the auction works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW.map((h, i) => (
              <div key={h.t} className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-[var(--blaze-soft)] text-[var(--blaze-deep)] text-sm font-extrabold shrink-0">{i + 1}</span>
                  <span className="text-2xl">{h.icon}</span>
                </div>
                <div className="font-bold text-[var(--ink)] text-sm mb-1">{h.t}</div>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">{h.d}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-[var(--ink-3)] mt-4">
            Reserve $25 · minimum raise $5 · rounds run Monday 00:00 → Monday 00:00 UTC · crypto transfers are final once sent.
          </p>
        </div>

        {/* past winners */}
        <div className="mb-12">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] text-center mb-6">🏆 Past winners</h2>
          {data && data.winners.length > 0 ? (
            <div className="grid sm:grid-cols-3 gap-4">
              {data.winners.map((w) => (
                <div key={w.slot} className="card p-5 text-center">
                  <div className="text-4xl mb-2">{w.emoji}</div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-3)]">{w.title}</div>
                  <div className="font-display font-extrabold text-lg text-[var(--ink)] mt-1 truncate">{w.brandName}</div>
                  <div className="font-display font-black text-2xl text-[var(--gold-deep)] mt-1">${Number(w.amount).toFixed(2)}</div>
                  <div className="text-[11px] text-[var(--ink-3)] mt-1">Round {w.roundId}</div>
                  {w.website && (
                    <a href={w.website} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[var(--blaze)] hover:underline mt-2 inline-block">
                      Visit →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <div className="text-4xl mb-2">👑</div>
              <p className="text-sm text-[var(--ink-2)]">No winners yet — the first auction round is still open. Your brand could be the first crown.</p>
            </div>
          )}
        </div>

        <FaqSection faqs={GEO_FAQS['/auction']} />
      </div>
    </div>
  );
}
