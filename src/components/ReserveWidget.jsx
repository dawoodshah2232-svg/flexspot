// Reserve-now-pay-later widget: hold a spot name for 24h with just a name +
// email. Lives on the homepage near the claim CTA — the lowest-friction
// entry point into the funnel. Never shows fake state: availability comes
// from /api/reserve, and the widget hides if the feed is unreachable.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { reserveSpot, checkNameAvailable } from '../lib/emailClient';

function pad(n) { return String(n).padStart(2, '0'); }

function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!target) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  if (!target) return null;
  const ms = Math.max(0, target - now);
  return `${pad(Math.floor(ms / 36e5))}:${pad(Math.floor((ms % 36e5) / 6e4))}:${pad(Math.floor((ms % 6e4) / 1e3))}`;
}

export default function ReserveWidget() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avail, setAvail] = useState(null); // null | true | false
  const [checking, setChecking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [held, setHeld] = useState(null); // {id, slug, brandName, expiresAt}
  const timer = useRef(null);
  const left = useCountdown(held?.expiresAt);

  // Debounced availability check as they type the brand name.
  useEffect(() => {
    const q = name.trim();
    if (q.length < 2) { setAvail(null); return; }
    setChecking(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const r = await checkNameAvailable(q);
      setChecking(false);
      if (r.ok) setAvail(r.available);
      else setAvail(null);
    }, 500);
    return () => clearTimeout(timer.current);
  }, [name]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) { setError('Enter your brand name first.'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) { setError('Enter a valid email — your hold confirmation goes there.'); return; }
    setBusy(true);
    const r = await reserveSpot({ brandName: name.trim(), email: email.trim() });
    setBusy(false);
    if (r.ok) setHeld(r);
    else setError(r.error || 'Could not hold that name — try again.');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10" aria-label="Reserve your spot name">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-gradient-to-br from-[#171226] via-[var(--surface)] to-[var(--surface)] p-6 sm:p-10 shadow-[var(--shadow-card)]">
        <div className="blob w-[300px] h-[300px] bg-[#F5C044]/10 -top-24 -right-24" />
        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-[var(--gold)] uppercase mb-3">🔒 Free 24-hour hold</div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">Not ready to pay? Hold your name anyway.</h2>
            <p className="text-[var(--ink-2)] mt-3 leading-relaxed">
              Drop your brand name and email — we hold your spot name for <b className="text-[var(--ink)]">24 hours, free</b>. Nobody else can take it while you decide. Complete your claim whenever you're ready.
            </p>
          </div>
          <div>
            {held ? (
              <div className="rounded-2xl border border-[var(--gold)]/40 bg-[var(--gold)]/5 p-6 text-center">
                <div className="text-3xl mb-2">🎉</div>
                <div className="font-extrabold text-lg">“{held.brandName}” is yours for now</div>
                <p className="text-sm text-[var(--ink-2)] mt-2">
                  Hold expires in <span className="font-mono font-extrabold text-[var(--gold)]">{left || '—'}</span>.
                  We emailed your confirmation — complete the claim to lock it in forever.
                </p>
                <Link to={`/claim?rsv=${held.id}`} className="btn-gold px-8 py-3.5 mt-5 inline-block font-extrabold">
                  Complete my claim →
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6 shadow-[var(--shadow-card)]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-2)] mb-1.5">Brand name</label>
                <input
                  value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Neon Noodles"
                  maxLength={60}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3 font-semibold outline-none focus:border-[var(--gold)]"
                />
                <div className="h-6 mt-1 text-xs font-semibold">
                  {checking && <span className="text-[var(--ink-3)]">Checking…</span>}
                  {!checking && avail === true && name.trim().length >= 2 && <span className="text-emerald-500">✓ “{name.trim()}” is available</span>}
                  {!checking && avail === false && <span className="text-red-500">✕ Taken — try a variation</span>}
                </div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-2)] mb-1.5">Email</label>
                <input
                  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@brand.com"
                  type="email" maxLength={120}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3 font-semibold outline-none focus:border-[var(--gold)]"
                />
                {error && <div className="text-sm font-semibold text-red-500 mt-3">{error}</div>}
                <button type="submit" disabled={busy} className="btn-gold w-full mt-4 py-3.5 font-extrabold disabled:opacity-60">
                  {busy ? 'Holding…' : 'Hold my name for 24h — free'}
                </button>
                <p className="text-[11px] text-[var(--ink-3)] mt-3 text-center">No payment. No commitment. Just your name, held.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
