import React, { useMemo, useState } from 'react';

const demoEntries = [
  { id: 1, name: 'Pixel Potato', tagline: 'Small tools. Serious usefulness.', url: 'https://example.com', logo: 'PP', amount: 125, clicks: 1200, movement: 3 },
  { id: 2, name: 'Cloud Burrito', tagline: 'Wrap your workflow in the cloud.', url: 'https://example.com', logo: 'CB', amount: 98, clicks: 842, movement: 1 },
  { id: 3, name: 'Spreadsheet Goblin', tagline: 'Making cells behave since Tuesday.', url: 'https://example.com', logo: 'SG', amount: 76, clicks: 620, movement: 0 },
  { id: 4, name: 'Tiny Rocket Studio', tagline: 'Launch faster. Look sharper.', url: 'https://example.com', logo: 'TR', amount: 54, clicks: 540, movement: 2 },
  { id: 5, name: 'Monday Escape', tagline: 'Tools for people allergic to busywork.', url: 'https://example.com', logo: 'ME', amount: 43, clicks: 430, movement: -1 },
  { id: 6, name: 'Inbox Ninja', tagline: 'Less email. More actual work.', url: 'https://example.com', logo: 'IN', amount: 37, clicks: 311, movement: 4 },
  { id: 7, name: 'No-Code Noodle', tagline: 'Build first. Explain later.', url: 'https://example.com', logo: 'NN', amount: 31, clicks: 283, movement: 1 },
];

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: value % 1 ? 2 : 0 }).format(value);
}

function compactNumber(value) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

function destinationMeta(url = '') {
  const lower = url.toLowerCase();
  if (lower.includes('instagram.com')) return { label: 'Instagram', icon: '◎' };
  if (lower.includes('linkedin.com')) return { label: 'LinkedIn', icon: 'in' };
  if (lower.includes('x.com') || lower.includes('twitter.com')) return { label: 'X', icon: '𝕏' };
  if (lower.includes('tiktok.com')) return { label: 'TikTok', icon: '♪' };
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return { label: 'YouTube', icon: '▶' };
  return { label: 'Website', icon: '↗' };
}

export default function FlexSpotApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaderboard, setLeaderboard] = useState(demoEntries);
  const [recentActivity, setRecentActivity] = useState([
    'Tiny Rocket Studio moved up 2 places',
    'Inbox Ninja added $6 to their total',
    'Pixel Potato is holding the crown',
  ]);
  const [form, setForm] = useState({ name: '', tagline: '', url: '', amount: '1', logoPreview: '' });

  const ranked = useMemo(
    () => [...leaderboard].sort((a, b) => b.amount - a.amount).map((entry, index) => ({ ...entry, rank: index + 1 })),
    [leaderboard]
  );

  const champion = ranked[0];
  const podium = ranked.slice(0, 3);
  const topRows = ranked.slice(3, 10);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleLogo = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateField('logoPreview', reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.url.trim()) return;

    const amount = Math.max(1, Number(form.amount) || 1);
    const normalizedUrl = /^https?:\/\//i.test(form.url) ? form.url : `https://${form.url}`;
    const previousRank = ranked.findIndex((item) => item.name.toLowerCase() === form.name.trim().toLowerCase()) + 1;

    setLeaderboard((current) => {
      const existing = current.find((item) => item.name.toLowerCase() === form.name.trim().toLowerCase());
      if (existing) {
        return current.map((item) =>
          item.id === existing.id
            ? { ...item, amount: item.amount + amount, url: normalizedUrl, tagline: form.tagline || item.tagline, logoImage: form.logoPreview || item.logoImage }
            : item
        );
      }
      return [
        ...current,
        {
          id: Date.now(),
          name: form.name.trim(),
          tagline: form.tagline.trim() || 'New challenger',
          url: normalizedUrl,
          logo: form.name.trim().slice(0, 2).toUpperCase(),
          logoImage: form.logoPreview,
          amount,
          clicks: 0,
          movement: 0,
        },
      ];
    });

    setRecentActivity((items) => [`${form.name.trim()} pledged ${money(amount)} in this demo preview`, ...items].slice(0, 4));
    setForm({ name: '', tagline: '', url: '', amount: '1', logoPreview: '' });
    setIsModalOpen(false);

    if (previousRank) {
      setTimeout(() => {}, 0);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb] text-[#11131a] selection:bg-violet-200">
      <div className="border-b border-violet-100 bg-white/90 px-4 py-2 text-[12px] font-semibold text-slate-600 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" />142 currently online</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">Total Volume: <strong className="text-slate-900">$4,820</strong></span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline">All-time visitors: <strong className="text-slate-900">89K</strong></span>
          </div>
          <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-violet-700">Demo preview</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <a href="#top" className="flex shrink-0 items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#16131d] text-lg text-white shadow-sm">♛</div>
              <div className="leading-none">
                <div className="text-xl font-black tracking-[-0.04em]">FlexSpot<span className="text-violet-600">.lol</span></div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Give. Climb. Get seen.</div>
              </div>
            </a>

            {champion && (
              <a href={champion.url} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 lg:flex">
                <span className="text-sm">♛</span>
                <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700">Current #1</span>
                <span className="max-w-28 truncate text-xs font-black text-slate-900">{champion.name}</span>
              </a>
            )}
          </div>

          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            <a href="#leaderboard" className="hover:text-violet-700">Leaderboard</a>
            <a href="#how" className="hover:text-violet-700">How it works</a>
          </nav>

          <button onClick={() => setIsModalOpen(true)} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-[0_8px_24px_rgba(124,58,237,.22)] transition hover:-translate-y-0.5 hover:bg-violet-700 md:px-5">
            Donate $1 to Join →
          </button>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-8 pt-10 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pt-14">
          <div>
            <div className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-violet-700">Brands compete. The internet watches.</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-[#121218] sm:text-6xl lg:text-[72px]">
              BIG BRAND VISIBILITY.
              <span className="mt-2 block bg-gradient-to-r from-violet-700 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">START FROM JUST $1.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
              Put your brand, project or profile on the board. Every verified donation adds to your total. Climb higher, steal the crown, and turn the ranking into traffic.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button onClick={() => setIsModalOpen(true)} className="rounded-xl bg-violet-600 px-7 py-3.5 text-base font-black text-white shadow-[0_10px_30px_rgba(124,58,237,.24)] transition hover:-translate-y-0.5 hover:bg-violet-700">Start donating from $1 →</button>
              <a href="#how" className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-slate-800 transition hover:border-violet-300">How it works</a>
            </div>
            <div className="mt-7 grid max-w-2xl grid-cols-2 gap-3 text-xs font-bold text-slate-600 sm:grid-cols-4">
              {['Live leaderboard', 'Real outbound links', 'No signup', 'Top spot gets extra exposure'].map((item) => (
                <div key={item} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-violet-100 text-[10px] text-violet-700">✓</span>{item}</div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,.16),transparent_65%)]" />
            <div className="rounded-[32px] border border-violet-100 bg-white p-5 shadow-[0_30px_70px_rgba(48,30,95,.10)] sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-600">Champion spotlight</div>
                  <div className="mt-2 text-2xl font-black tracking-tight">The crown travels fast.</div>
                </div>
                <div className="float-crown text-4xl">♛</div>
              </div>
              {champion && (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
                  <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-950 text-lg font-black text-white">
                      {champion.logoImage ? <img src={champion.logoImage} alt="" className="h-full w-full object-cover" /> : champion.logo}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">Current #1</div>
                      <div className="truncate text-2xl font-black">{champion.name}</div>
                      <div className="truncate text-sm text-slate-500">{champion.tagline}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black">{money(champion.amount)}</div>
                      <div className="text-[11px] font-bold text-slate-400">donated total</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <a href={champion.url} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-black text-white">Visit leader ↗</a>
                    <button onClick={() => setIsModalOpen(true)} className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-black text-violet-700">Challenge #1</button>
                  </div>
                </div>
              )}
              <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500">#1 receives extra placement beside the FlexSpot logo and a dedicated champion spotlight while they hold the top rank.</div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-3">
          <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-4 md:px-8">
            <span className="shrink-0 rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-white">Live activity</span>
            <div className="activity-marquee flex min-w-max gap-10 text-xs font-bold text-slate-600">
              {[...recentActivity, ...recentActivity].map((item, index) => <span key={`${item}-${index}`}>● {item}</span>)}
            </div>
          </div>
        </section>

        <section id="leaderboard" className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:py-14">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Ranked by total verified donations</div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] sm:text-4xl">Live Leaderboard <span className="text-emerald-500">●</span></h2>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="w-fit rounded-xl border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-black text-violet-700">Get on the board from $1</button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end">
            {podium.map((item) => {
              const meta = destinationMeta(item.url);
              const isFirst = item.rank === 1;
              return (
                <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className={`rank-card group relative rounded-2xl border bg-white p-5 transition duration-300 hover:-translate-y-1 ${isFirst ? 'order-first border-amber-300 shadow-[0_20px_50px_rgba(234,179,8,.14)] md:order-none md:min-h-[260px]' : 'border-slate-200 shadow-[0_12px_35px_rgba(15,23,42,.06)]'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`grid h-10 min-w-10 place-items-center rounded-xl px-2 text-lg font-black ${isFirst ? 'bg-amber-300 text-amber-950' : 'bg-slate-100 text-slate-700'}`}>#{item.rank}</span>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${isFirst ? 'bg-amber-50 text-amber-700' : 'bg-violet-50 text-violet-700'}`}>{isFirst ? '♛ Current leader' : 'Top 3'}</span>
                  </div>
                  <div className="mt-5 flex items-center gap-4">
                    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-950 text-lg font-black text-white">
                      {item.logoImage ? <img src={item.logoImage} alt="" className="h-full w-full object-cover" /> : item.logo}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-black">{item.name}</h3>
                      <p className="truncate text-sm text-slate-500">{item.tagline}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-4">
                    <div>
                      <div className="text-xs font-bold text-slate-400">◉ {compactNumber(item.clicks)} clicks</div>
                      <div className="mt-1 text-[11px] font-black text-violet-600">{meta.icon} {meta.label}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black">{money(item.amount)}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">donated</div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,.04)]">
            <div className="border-b border-slate-100 px-5 py-4 text-sm font-black">Top 10</div>
            {topRows.map((item) => {
              const meta = destinationMeta(item.url);
              return (
                <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="grid grid-cols-[48px_1fr_auto] items-center gap-3 border-b border-slate-100 px-4 py-3.5 transition last:border-b-0 hover:bg-violet-50/50 sm:grid-cols-[48px_1fr_110px_110px]">
                  <div className="text-center text-sm font-black text-slate-500">#{item.rank}</div>
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-950 text-xs font-black text-white">{item.logoImage ? <img src={item.logoImage} alt="" className="h-full w-full object-cover" /> : item.logo}</div>
                    <div className="min-w-0"><div className="truncate text-sm font-black">{item.name}</div><div className="truncate text-xs text-slate-400">{meta.icon} {meta.label} · {compactNumber(item.clicks)} clicks</div></div>
                  </div>
                  <div className="hidden text-right text-xs font-black text-emerald-600 sm:block">{item.movement > 0 ? `↑ ${item.movement}` : item.movement < 0 ? `↓ ${Math.abs(item.movement)}` : '—'}</div>
                  <div className="text-right text-base font-black">{money(item.amount)}</div>
                </a>
              );
            })}
          </div>
        </section>

        <section id="how" className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
          <div className="rounded-[28px] bg-[#17141e] px-6 py-8 text-white sm:px-9 sm:py-10">
            <div className="grid gap-7 md:grid-cols-3">
              {[
                ['01', 'Submit your spot', 'Add your logo, company or profile name, destination link and the amount you want to donate.'],
                ['02', 'Pay and verify', 'Crypto payment happens after the form. The homepage never exposes a giant payment QR by default.'],
                ['03', 'Climb automatically', 'Once payment is verified, your total updates and the board reorders. The current #1 gets extra sitewide exposure.'],
              ].map(([step, title, copy]) => (
                <div key={step}><div className="text-xs font-black tracking-[0.2em] text-violet-300">{step}</div><h3 className="mt-3 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p></div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <button onClick={() => setIsModalOpen(true)} className="fixed bottom-4 left-4 right-4 z-30 rounded-2xl bg-violet-600 px-5 py-4 text-center text-base font-black text-white shadow-[0_18px_45px_rgba(124,58,237,.34)] md:hidden">Challenge the board from $1 →</button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="my-6 w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div><div className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">Step 1 of 2</div><h3 className="mt-2 text-3xl font-black tracking-tight">Claim your FlexSpot.</h3><p className="mt-2 text-sm leading-6 text-slate-500">Submit the public profile first. Payment will be the next screen after the real crypto verification flow is connected.</p></div>
              <button onClick={() => setIsModalOpen(false)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-black text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-[110px_1fr]">
                <label className="grid h-[110px] cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center text-xs font-black text-slate-500 hover:border-violet-400 hover:bg-violet-50">
                  {form.logoPreview ? <img src={form.logoPreview} alt="Logo preview" className="h-full w-full object-cover" /> : <span>Upload<br />logo</span>}
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogo} className="hidden" />
                </label>
                <div className="space-y-4">
                  <div><label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Company / profile name</label><input required value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="e.g. Pixel Potato" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /></div>
                  <div><label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Short tagline</label><input value={form.tagline} onChange={(e) => updateField('tagline', e.target.value)} placeholder="One short line about you" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /></div>
                </div>
              </div>

              <div><label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Website or social profile</label><input required value={form.url} onChange={(e) => updateField('url', e.target.value)} placeholder="https://yourwebsite.com or Instagram / LinkedIn / X profile" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /><p className="mt-1.5 text-xs text-slate-400">Social destinations will display the matching platform label automatically.</p></div>

              <div><label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Donation amount</label><div className="grid grid-cols-4 gap-2">{['1','5','10','25'].map((value) => <button key={value} type="button" onClick={() => updateField('amount', value)} className={`rounded-xl border px-3 py-2.5 text-sm font-black ${form.amount === value ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>${value}</button>)}</div><div className="mt-2 flex items-center rounded-xl border border-slate-300 bg-white px-4"><span className="font-black text-slate-400">$</span><input type="number" min="1" step="0.5" value={form.amount} onChange={(e) => updateField('amount', e.target.value)} className="w-full bg-transparent px-2 py-3 text-sm font-black outline-none" /><span className="text-xs font-bold text-slate-400">USD value</span></div></div>

              <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs font-semibold leading-5 text-amber-800">Demo only: this screen does not collect money yet. Real rankings must update only after verified payment, not after a button click or screenshot.</div>

              <button type="submit" className="w-full rounded-xl bg-violet-600 px-5 py-4 text-base font-black text-white shadow-[0_10px_25px_rgba(124,58,237,.2)] hover:bg-violet-700">Continue to payment setup →</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
