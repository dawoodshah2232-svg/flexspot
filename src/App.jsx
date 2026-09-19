import React, { useEffect, useMemo, useState } from 'react';

const SUPABASE_URL = 'https://nffiijlpjbjljoidlfbv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mZmlpamxwamJqbGpvaWRsZmJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MzY1NjAsImV4cCI6MjEwNTQxMjU2MH0.Qaz_vApZ4QlAP1SFD8AgcX3ARYwTsJhjpY9DVFCEn_0';

const demoEntries = [
  { id: 'demo-1', name: 'Pixel Potato', tagline: 'Small tools. Serious usefulness.', url: '#', logo: 'PP', amount: 125, clicks: 1200, movement: 3, demo: true },
  { id: 'demo-2', name: 'Cloud Burrito', tagline: 'Wrap your workflow in the cloud.', url: '#', logo: 'CB', amount: 98, clicks: 842, movement: 1, demo: true },
  { id: 'demo-3', name: 'Spreadsheet Goblin', tagline: 'Making cells behave since Tuesday.', url: '#', logo: 'SG', amount: 76, clicks: 620, movement: 0, demo: true },
  { id: 'demo-4', name: 'Tiny Rocket Studio', tagline: 'Launch faster. Look sharper.', url: '#', logo: 'TR', amount: 54, clicks: 540, movement: 2, demo: true },
  { id: 'demo-5', name: 'Monday Escape', tagline: 'Tools for people allergic to busywork.', url: '#', logo: 'ME', amount: 43, clicks: 430, movement: -1, demo: true },
  { id: 'demo-6', name: 'Inbox Ninja', tagline: 'Less email. More actual work.', url: '#', logo: 'IN', amount: 37, clicks: 311, movement: 4, demo: true },
  { id: 'demo-7', name: 'No-Code Noodle', tagline: 'Build first. Explain later.', url: '#', logo: 'NN', amount: 31, clicks: 283, movement: 1, demo: true },
  { id: 'demo-8', name: 'Quiet Launch', tagline: 'Make noise without shouting.', url: '#', logo: 'QL', amount: 24, clicks: 221, movement: 0, demo: true },
  { id: 'demo-9', name: 'Draft Monkey', tagline: 'Write less boring things.', url: '#', logo: 'DM', amount: 19, clicks: 177, movement: 2, demo: true },
  { id: 'demo-10', name: 'Pixel Taxi', tagline: 'Design that actually gets there.', url: '#', logo: 'PT', amount: 14, clicks: 142, movement: 1, demo: true },
  { id: 'demo-11', name: 'Tab Hoarder', tagline: 'One more browser tab.', url: '#', logo: 'TH', amount: 11, clicks: 98, movement: 0, demo: true },
  { id: 'demo-12', name: 'Launch Snack', tagline: 'Tiny launch. Big appetite.', url: '#', logo: 'LS', amount: 9, clicks: 75, movement: -1, demo: true },
];

const boardCopy = {
  all_time: { label: 'All-time', sub: 'The permanent throne.' },
  today: { label: 'Today', sub: 'Resets at UTC midnight.' },
  week: { label: 'This week', sub: 'Fresh throne every Monday.' },
};

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: value % 1 ? 2 : 0 }).format(value || 0);
}

function compactNumber(value) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value || 0);
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

function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'FS';
}

function BrandLogo({ item, size = 'md' }) {
  const sizes = size === 'lg' ? 'h-16 w-16 text-lg' : size === 'sm' ? 'h-10 w-10 text-xs' : 'h-14 w-14 text-base';
  return (
    <div className={`grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#17141e] font-black text-white ${sizes}`}>
      {item.logoImage ? <img src={item.logoImage} alt={`${item.name} logo`} className="h-full w-full object-cover" /> : item.logo || initials(item.name)}
    </div>
  );
}

export default function FlexSpotApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileTopOpen, setMobileTopOpen] = useState(false);
  const [board, setBoard] = useState('all_time');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingBoard, setLoadingBoard] = useState(true);
  const [boardError, setBoardError] = useState('');
  const [query, setQuery] = useState('');
  const [submitState, setSubmitState] = useState({ loading: false, error: '', result: null });
  const [form, setForm] = useState({ name: '', tagline: '', url: '', amount: '1', logoPreview: '' });

  const loadLeaderboard = async (selected = board) => {
    setLoadingBoard(true);
    setBoardError('');
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_leaderboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ p_board: selected }),
      });
      if (!response.ok) throw new Error('Unable to load the live leaderboard.');
      const rows = await response.json();
      setLeaderboard(rows.map((row) => ({
        id: row.id,
        name: row.name,
        tagline: row.tagline,
        url: row.destination_url,
        logo: initials(row.name),
        logoImage: row.logo_url,
        amount: Number(row.total_cents || 0) / 100,
        clicks: 0,
        movement: 0,
        rank: row.rank,
      })));
    } catch (error) {
      console.error(error);
      setBoardError(error.message || 'Unable to load live data.');
      setLeaderboard([]);
    } finally {
      setLoadingBoard(false);
    }
  };

  useEffect(() => {
    loadLeaderboard(board);
    const timer = setInterval(() => loadLeaderboard(board), 15000);
    return () => clearInterval(timer);
  }, [board]);

  const usingDemo = leaderboard.length === 0;
  const sourceEntries = usingDemo ? demoEntries : leaderboard;
  const ranked = useMemo(
    () => [...sourceEntries].sort((a, b) => b.amount - a.amount).map((entry, index) => ({ ...entry, rank: entry.rank || index + 1 })),
    [sourceEntries]
  );
  const champion = ranked[0];
  const podium = ranked.slice(0, 3);
  const topRows = ranked.slice(3, 10);
  const filteredRows = ranked.filter((item) => `${item.name} ${item.tagline}`.toLowerCase().includes(query.toLowerCase())).slice(10, 100);
  const totalVolume = leaderboard.reduce((sum, item) => sum + item.amount, 0);

  const activity = useMemo(() => {
    if (!leaderboard.length) return [
      'The crown is waiting for the first verified challenger',
      'Listings start from just $1',
      'Every verified donation can move the board',
    ];
    return leaderboard.slice(0, 5).map((item, index) => index === 0 ? `${item.name} is holding the crown at ${money(item.amount)}` : `${item.name} is currently #${item.rank} with ${money(item.amount)}`);
  }, [leaderboard]);

  const switchBoard = (next) => {
    setBoard(next);
    setQuery('');
    document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleLogo = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setSubmitState({ loading: false, error: 'Use PNG, JPG or WebP for the logo.', result: null });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setSubmitState({ loading: false, error: 'Logo must be 2 MB or smaller.', result: null });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateField('logoPreview', reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.url.trim()) return;
    setSubmitState({ loading: true, error: '', result: null });
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/create-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          tagline: form.tagline.trim(),
          url: form.url.trim(),
          amount: Number(form.amount || 1),
          logo_data_url: form.logoPreview || null,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Unable to save your submission.');
      setSubmitState({ loading: false, error: '', result: payload });
    } catch (error) {
      setSubmitState({ loading: false, error: error.message || 'Submission failed.', result: null });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitState({ loading: false, error: '', result: null });
    setForm({ name: '', tagline: '', url: '', amount: '1', logoPreview: '' });
  };

  const visit = (item, event) => {
    if (item.demo || item.url === '#') event.preventDefault();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f7fb] text-[#11131a] selection:bg-violet-200">
      <div className="border-b border-violet-100 bg-white/95 px-4 py-2 text-[12px] font-semibold text-slate-600 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" />Live arena</span>
            <span className="hidden text-slate-300 sm:inline">|</span>
            <span className="hidden sm:inline">Verified brands: <strong className="text-slate-900">{leaderboard.length}</strong></span>
            <span className="hidden text-slate-300 md:inline">|</span>
            <span className="hidden md:inline">Verified volume: <strong className="text-slate-900">{money(totalVolume)}</strong></span>
          </div>
          <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${usingDemo ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{usingDemo ? 'Demo arena' : 'Live data'}</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="flex min-w-0 items-center gap-3 lg:gap-4">
            <a href="#top" className="flex shrink-0 items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#16131d] text-lg text-white shadow-sm">♛</div>
              <div className="leading-none">
                <div className="text-xl font-black tracking-[-0.04em]">FlexSpot<span className="text-violet-600">.lol</span></div>
                <div className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">Give. Climb. Get seen.</div>
              </div>
            </a>
            {champion && !champion.demo && (
              <a href={champion.url} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 lg:flex">
                <span>♛</span><span className="text-[10px] font-bold uppercase tracking-wide text-amber-700">Current #1</span><span className="max-w-28 truncate text-xs font-black">{champion.name}</span>
              </a>
            )}
          </div>
          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            <a href="#leaderboard" className="hover:text-violet-700">Leaderboard</a>
            <a href="#how" className="hover:text-violet-700">How it works</a>
            <a href="#rules" className="hover:text-violet-700">Rules</a>
            <a href="#faq" className="hover:text-violet-700">FAQ</a>
          </nav>
          <button onClick={() => setIsModalOpen(true)} className="rounded-xl bg-violet-600 px-3.5 py-2.5 text-xs font-black text-white shadow-[0_8px_24px_rgba(124,58,237,.22)] transition hover:-translate-y-0.5 hover:bg-violet-700 sm:px-5 sm:text-sm">Donate $1 to Join →</button>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-8 pt-9 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pt-14">
          <div>
            <div className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-violet-700">Brands compete. The internet watches.</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-[#121218] sm:text-6xl lg:text-[72px]">
              BIG BRAND VISIBILITY.
              <span className="mt-2 block bg-gradient-to-r from-violet-700 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">START FROM JUST $1.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg">Put your brand, project or profile on the board. Every verified donation adds to your total. Climb higher, steal the crown, and turn the ranking into traffic.</p>
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
                <div><div className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-600">Champion spotlight</div><div className="mt-2 text-2xl font-black tracking-tight">The crown travels fast.</div></div>
                <div className="float-crown text-4xl">♛</div>
              </div>
              {champion ? (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
                  <div className="flex items-center gap-4">
                    <BrandLogo item={champion} size="lg" />
                    <div className="min-w-0 flex-1"><div className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">{champion.demo ? 'Demo #1' : 'Current #1'}</div><div className="truncate text-2xl font-black">{champion.name}</div><div className="truncate text-sm text-slate-500">{champion.tagline}</div></div>
                    <div className="text-right"><div className="text-2xl font-black">{money(champion.amount)}</div><div className="text-[11px] font-bold text-slate-400">donated total</div></div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <a onClick={(e) => visit(champion, e)} href={champion.url} target="_blank" rel="noreferrer" className={`rounded-xl px-4 py-3 text-center text-sm font-black ${champion.demo ? 'cursor-default bg-slate-100 text-slate-400' : 'bg-slate-950 text-white'}`}>{champion.demo ? 'Demo brand' : 'Visit leader ↗'}</a>
                    <button onClick={() => setIsModalOpen(true)} className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-black text-violet-700">Challenge #1</button>
                  </div>
                </div>
              ) : <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm font-bold text-slate-500">The crown is suspiciously available.</div>}
              <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500">#1 gets extra placement beside the FlexSpot logo and this dedicated champion spotlight while they hold the top rank.</div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-3">
          <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-4 md:px-8">
            <span className="shrink-0 rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-white">Live activity</span>
            <div className="activity-marquee flex min-w-max gap-10 text-xs font-bold text-slate-600">{[...activity, ...activity].map((item, index) => <span key={`${item}-${index}`}>● {item}</span>)}</div>
          </div>
        </section>

        <section id="leaderboard" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-10 md:px-8 lg:py-14">
          <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Ranked by verified donations</div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] sm:text-4xl">Live Leaderboard <span className="text-emerald-500">●</span></h2>
              <p className="mt-2 text-sm font-medium text-slate-500">{boardCopy[board].sub}</p>
            </div>
            <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
              {Object.entries(boardCopy).map(([key, value]) => <button key={key} onClick={() => switchBoard(key)} className={`rounded-xl px-4 py-2 text-xs font-black transition ${board === key ? 'bg-slate-950 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>{value.label}</button>)}
            </div>
          </div>

          {boardError && <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{boardError} Showing the demo arena instead.</div>}
          {loadingBoard && <div className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Refreshing live board…</div>}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end">
            {podium.map((item) => {
              const meta = destinationMeta(item.url);
              const isFirst = item.rank === 1;
              return (
                <a onClick={(e) => visit(item, e)} key={item.id} href={item.url} target="_blank" rel="noreferrer" className={`rank-card group relative rounded-2xl border bg-white p-5 transition duration-300 hover:-translate-y-1 ${item.demo ? 'cursor-default' : ''} ${isFirst ? 'order-first border-amber-300 shadow-[0_20px_50px_rgba(234,179,8,.14)] md:order-none md:min-h-[260px]' : 'border-slate-200 shadow-[0_12px_35px_rgba(15,23,42,.06)]'}`}>
                  <div className="flex items-center justify-between gap-3"><span className={`grid h-10 min-w-10 place-items-center rounded-xl px-2 text-lg font-black ${isFirst ? 'bg-amber-300 text-amber-950' : 'bg-slate-100 text-slate-700'}`}>#{item.rank}</span><span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${isFirst ? 'bg-amber-50 text-amber-700' : 'bg-violet-50 text-violet-700'}`}>{isFirst ? '♛ Current leader' : 'Top 3'}</span></div>
                  <div className="mt-5 flex items-center gap-4"><BrandLogo item={item} size="lg" /><div className="min-w-0"><h3 className="truncate text-xl font-black">{item.name}</h3><p className="truncate text-sm text-slate-500">{item.tagline}</p></div></div>
                  <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-4"><div><div className="text-xs font-bold text-slate-400">◉ {compactNumber(item.clicks)} clicks</div><div className="mt-1 text-[11px] font-black text-violet-600">{meta.icon} {item.demo ? 'Demo' : meta.label}</div></div><div className="text-right"><div className="text-2xl font-black">{money(item.amount)}</div><div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">donated</div></div></div>
                </a>
              );
            })}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,.04)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div className="text-sm font-black">Top 10</div><button onClick={() => setMobileTopOpen(true)} className="text-xs font-black text-violet-600 md:hidden">Open list</button></div>
            {topRows.map((item) => {
              const meta = destinationMeta(item.url);
              return (
                <a onClick={(e) => visit(item, e)} key={item.id} href={item.url} target="_blank" rel="noreferrer" className={`grid grid-cols-[48px_1fr_auto] items-center gap-3 border-b border-slate-100 px-4 py-3.5 transition last:border-b-0 hover:bg-violet-50/50 sm:grid-cols-[48px_1fr_110px_110px] ${item.demo ? 'cursor-default' : ''}`}>
                  <div className="text-center text-sm font-black text-slate-500">#{item.rank}</div>
                  <div className="flex min-w-0 items-center gap-3"><BrandLogo item={item} size="sm" /><div className="min-w-0"><div className="truncate text-sm font-black">{item.name}</div><div className="truncate text-xs text-slate-400">{meta.icon} {item.demo ? 'Demo' : meta.label} · {compactNumber(item.clicks)} clicks</div></div></div>
                  <div className="hidden text-right text-xs font-black text-emerald-600 sm:block">{item.movement > 0 ? `↑ ${item.movement}` : item.movement < 0 ? `↓ ${Math.abs(item.movement)}` : '—'}</div>
                  <div className="text-right text-base font-black">{money(item.amount)}</div>
                </a>
              );
            })}
          </div>

          <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,.04)] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">Positions 11–100</div><h3 className="mt-1 text-2xl font-black">The rest of the arena</h3></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a brand" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 sm:max-w-xs" /></div>
            <div className="mt-5 divide-y divide-slate-100">
              {filteredRows.length ? filteredRows.map((item) => <a onClick={(e) => visit(item, e)} key={item.id} href={item.url} target="_blank" rel="noreferrer" className={`grid grid-cols-[42px_1fr_auto] items-center gap-3 py-3.5 hover:bg-violet-50/40 ${item.demo ? 'cursor-default' : ''}`}><div className="text-center text-sm font-black text-slate-400">#{item.rank}</div><div className="flex min-w-0 items-center gap-3"><BrandLogo item={item} size="sm" /><div className="min-w-0"><div className="truncate text-sm font-black">{item.name}</div><div className="truncate text-xs text-slate-400">{item.tagline}</div></div></div><div className="text-sm font-black">{money(item.amount)}</div></a>) : <div className="py-10 text-center text-sm font-semibold text-slate-400">{ranked.length <= 10 ? 'When more verified brands join, positions 11–100 will appear here.' : 'No matching brands.'}</div>}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-[28px] bg-[#17141e] p-6 text-white sm:p-8">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">Why fight for #1?</div><h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">The winner doesn’t just get a number.</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">{['Logo beside FlexSpot branding', 'Dedicated champion spotlight', 'Largest podium treatment', 'Direct outbound website traffic'].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold"><span className="mr-2 text-amber-300">♛</span>{item}</div>)}</div>
            </div>
            <div className="rounded-[28px] border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-6 sm:p-8"><div className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Simple idea</div><h3 className="mt-3 text-3xl font-black tracking-tight">Donate more. Move up.</h3><p className="mt-4 text-sm font-medium leading-6 text-slate-600">If another brand passes your total, they pass your position. Add more later and climb again. No subscriptions. No fake urgency. Just a visible paid ranking.</p><button onClick={() => setIsModalOpen(true)} className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-black text-white">Join from $1 →</button></div>
          </div>
        </section>

        <section id="how" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="mb-7 max-w-2xl"><div className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">How it works</div><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Three steps. Zero signup drama.</h2></div>
          <div className="grid gap-5 md:grid-cols-3">{[
            ['01', 'Submit your spot', 'Add your logo, company or profile name, short tagline, and the website or social link people should visit.'],
            ['02', 'Choose your donation', 'Start at $1 and increase in $0.50 steps. The payment screen comes after your profile is saved.'],
            ['03', 'Climb automatically', 'Once payment is verified, your amount counts toward the live board. Higher verified totals rank higher.'],
          ].map(([step, title, copy]) => <div key={step} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,.04)]"><div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-xs font-black text-violet-700">{step}</div><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p></div>)}</div>
        </section>

        <section id="rules" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 sm:p-9"><div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><div className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">Rules</div><h2 className="mt-2 text-3xl font-black tracking-tight">Keep the game simple.</h2><p className="mt-4 text-sm leading-6 text-slate-500">This is paid promotion and entertainment, not an investment product or a promise of profit.</p></div><div className="grid gap-3 sm:grid-cols-2">{[
            ['Minimum entry', '$1.00'], ['Top-up step', '$0.50 minimum'], ['Ranking', 'Verified total, highest first'], ['Tie rule', 'Earlier total wins'], ['Boards', 'All-time, Today, This Week'], ['Accounts', 'No public signup or login'], ['Champion', '#1 gets extra temporary exposure'], ['Payments', 'Only verified funds affect rank'],
          ].map(([label, value]) => <div key={label} className="rounded-2xl bg-slate-50 p-4"><div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</div><div className="mt-1 text-sm font-black text-slate-900">{value}</div></div>)}</div></div></div>
        </section>

        <section id="faq" className="scroll-mt-24 mx-auto max-w-5xl px-4 py-10 pb-24 md:px-8">
          <div className="text-center"><div className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">FAQ</div><h2 className="mt-2 text-3xl font-black tracking-tight">The obvious questions.</h2></div>
          <div className="mt-7 grid gap-3">{[
            ['Do I need an account?', 'No. You submit directly. A private management link can be used later for your own listing.'],
            ['Can I link Instagram instead of a website?', 'Yes. Instagram, LinkedIn, X, TikTok and YouTube links are supported and labelled automatically.'],
            ['Does paying $1 put me at #1?', 'No. $1 gets you into the arena. Your actual position depends on the verified totals already on the selected board.'],
            ['Can I add more later?', 'Yes. Top-ups increase your eligible total after payment verification.'],
            ['Is the #1 position guaranteed for a period?', 'No. Someone else can pass the current leader at any time by reaching a higher verified total.'],
          ].map(([q, a]) => <details key={q} className="group rounded-2xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer list-none text-sm font-black text-slate-900">{q}<span className="float-right text-violet-600 transition group-open:rotate-45">+</span></summary><p className="mt-3 pr-6 text-sm leading-6 text-slate-500">{a}</p></details>)}</div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 md:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-xl font-black tracking-tight">FlexSpot<span className="text-violet-600">.lol</span></div><div className="mt-1 text-xs font-medium text-slate-400">Give. Climb. Get seen.</div></div><div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500"><a href="#rules">Rules</a><a href="#faq">FAQ</a><button onClick={() => setIsModalOpen(true)}>Join from $1</button></div></div></footer>

      <div className="fixed bottom-3 left-3 right-3 z-30 grid grid-cols-[1fr_auto] gap-2 md:hidden">
        <button onClick={() => setIsModalOpen(true)} className="rounded-2xl bg-violet-600 px-5 py-4 text-center text-sm font-black text-white shadow-[0_18px_45px_rgba(124,58,237,.34)]">Donate $1 to Join →</button>
        <button onClick={() => setMobileTopOpen(true)} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-xs font-black text-slate-800 shadow-lg">Top 10</button>
      </div>

      {mobileTopOpen && <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm md:hidden" onClick={() => setMobileTopOpen(false)}><div className="absolute bottom-0 left-0 right-0 max-h-[78vh] overflow-y-auto rounded-t-[28px] bg-white p-5" onClick={(e) => e.stopPropagation()}><div className="mb-4 flex items-center justify-between"><div><div className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">Persistent access</div><h3 className="text-2xl font-black">Top 10</h3></div><button onClick={() => setMobileTopOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-sm font-black">✕</button></div><div className="divide-y divide-slate-100">{ranked.slice(0, 10).map((item) => <div key={item.id} className="grid grid-cols-[38px_1fr_auto] items-center gap-3 py-3"><div className="text-center text-sm font-black text-slate-400">#{item.rank}</div><div className="flex min-w-0 items-center gap-3"><BrandLogo item={item} size="sm" /><div className="truncate text-sm font-black">{item.name}</div></div><div className="text-sm font-black">{money(item.amount)}</div></div>)}</div></div></div>}

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-4">
          <div className="my-5 w-full max-w-xl rounded-[28px] bg-white p-5 shadow-2xl sm:p-8">
            {!submitState.result ? <>
              <div className="flex items-start justify-between gap-5"><div><div className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">Step 1 of 2</div><h3 className="mt-2 text-3xl font-black tracking-tight">Claim your FlexSpot.</h3><p className="mt-2 text-sm leading-6 text-slate-500">No signup. Submit your public profile and choose how much you want to donate.</p></div><button onClick={closeModal} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-black text-slate-600">✕</button></div>
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-[110px_1fr]">
                  <label className="grid h-[110px] cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center text-xs font-black text-slate-500 hover:border-violet-400 hover:bg-violet-50">{form.logoPreview ? <img src={form.logoPreview} alt="Logo preview" className="h-full w-full object-cover" /> : <span>Upload<br />logo</span>}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogo} className="hidden" /></label>
                  <div className="space-y-4"><div><label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Company / profile name</label><input required maxLength={60} value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="e.g. Pixel Potato" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /></div><div><label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Short tagline</label><input maxLength={100} value={form.tagline} onChange={(e) => updateField('tagline', e.target.value)} placeholder="One short line about you" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /></div></div>
                </div>
                <div><label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Website or social profile</label><input required value={form.url} onChange={(e) => updateField('url', e.target.value)} placeholder="https://yourwebsite.com or Instagram / LinkedIn / X profile" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /><p className="mt-1.5 text-xs text-slate-400">Your card will open this link directly.</p></div>
                <div><label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Donation amount</label><div className="grid grid-cols-4 gap-2">{['1','5','10','25'].map((value) => <button key={value} type="button" onClick={() => updateField('amount', value)} className={`rounded-xl border px-3 py-2.5 text-sm font-black ${form.amount === value ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>${value}</button>)}</div><div className="mt-2 flex items-center rounded-xl border border-slate-300 bg-white px-4"><span className="font-black text-slate-400">$</span><input type="number" min="1" step="0.5" value={form.amount} onChange={(e) => updateField('amount', e.target.value)} className="w-full bg-transparent px-2 py-3 text-sm font-black outline-none" /><span className="text-xs font-bold text-slate-400">USD value</span></div></div>
                {submitState.error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">{submitState.error}</div>}
                <button disabled={submitState.loading} type="submit" className="w-full rounded-xl bg-violet-600 px-5 py-4 text-base font-black text-white shadow-[0_10px_25px_rgba(124,58,237,.2)] transition hover:bg-violet-700 disabled:cursor-wait disabled:opacity-60">{submitState.loading ? 'Saving your spot…' : 'Continue to payment →'}</button>
                <p className="text-center text-[11px] font-medium leading-5 text-slate-400">Your rank only changes after payment is independently verified. Uploading a screenshot alone never counts as payment.</p>
              </form>
            </> : <>
              <div className="flex items-start justify-between gap-5"><div><div className="text-xs font-black uppercase tracking-[0.16em] text-emerald-600">Profile saved</div><h3 className="mt-2 text-3xl font-black tracking-tight">Your spot is ready for payment.</h3></div><button onClick={closeModal} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-black">✕</button></div>
              <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50 p-5"><div className="text-xs font-black uppercase tracking-[0.14em] text-violet-700">Order created</div><div className="mt-2 text-2xl font-black">{money((submitState.result.order?.amount_cents || 0) / 100)}</div><div className="mt-1 text-xs font-semibold text-slate-500">Reference: {submitState.result.order?.id}</div></div>
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="text-sm font-black text-amber-900">Crypto checkout is not live yet.</div><p className="mt-2 text-sm leading-6 text-amber-800">Your submission is safely stored. We will not invent a wallet address or mark this order paid until the real receiving wallet or merchant provider is configured.</p><div className="mt-4 flex flex-wrap gap-2">{['USDT · TRC20', 'USDT · BEP20'].map((item) => <span key={item} className="rounded-full border border-amber-200 bg-white px-3 py-1.5 text-[11px] font-black text-amber-800">{item}</span>)}</div></div>
              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-xs font-semibold leading-5 text-slate-500">Save this management token securely for future recovery: <span className="break-all font-mono text-slate-700">{submitState.result.management_token}</span></div>
              <button onClick={closeModal} className="mt-5 w-full rounded-xl bg-slate-950 px-5 py-4 text-sm font-black text-white">Done for now</button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
