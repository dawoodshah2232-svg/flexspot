import React, { useMemo, useState } from "react";

const STARTING_BIDS = [
  {
    id: 1,
    name: "Neon Labs",
    tagline: "Ideas that glow after dark.",
    url: "https://example.com",
    mark: "N",
    amount: 1250,
    clicks: 1200,
  },
  {
    id: 2,
    name: "Orbit Soda",
    tagline: "Refreshment from another planet.",
    url: "https://example.com",
    mark: "O",
    amount: 980,
    clicks: 842,
  },
  {
    id: 3,
    name: "Pixel Union",
    tagline: "Making the internet more playful.",
    url: "https://example.com",
    mark: "P",
    amount: 760,
    clicks: 620,
  },
  {
    id: 4,
    name: "Mango Club",
    tagline: "A very good internet corner.",
    url: "https://example.com",
    mark: "M",
    amount: 540,
    clicks: 540,
  },
  {
    id: 5,
    name: "Futureproof",
    tagline: "Build tomorrow, loudly.",
    url: "https://example.com",
    mark: "F",
    amount: 430,
    clicks: 430,
  },
];

const EMPTY_FORM = { name: "", tagline: "", url: "", amount: "1" };
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function FlexSpotApp() {
  const [bids, setBids] = useState(STARTING_BIDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const leaderboard = useMemo(
    () => [...bids].sort((a, b) => b.amount - a.amount || a.id - b.id),
    [bids],
  );
  const totalVolume = useMemo(
    () => bids.reduce((total, bid) => total + bid.amount, 0),
    [bids],
  );

  const openModal = () => {
    setError("");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setError("");
    setIsModalOpen(false);
  };
  const updateField = ({ target: { name, value } }) =>
    setForm((current) => ({ ...current, [name]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(form.amount);
    const url = /^https?:\/\//i.test(form.url)
      ? form.url
      : `https://${form.url}`;
    if (
      !form.name.trim() ||
      !form.url.trim() ||
      !Number.isFinite(amount) ||
      amount < 1
    ) {
      setError("Add a brand name, a valid link, and a bid of at least $1.");
      return;
    }
    try {
      new URL(url);
    } catch {
      setError("Please enter a valid destination URL.");
      return;
    }
    setBids((current) => [
      ...current,
      {
        id: Date.now(),
        name: form.name.trim(),
        tagline: form.tagline.trim() || "The newest challenger on FlexSpot.",
        url,
        mark: form.name.trim().charAt(0).toUpperCase(),
        amount,
        clicks: 0,
      },
    ]);
    setForm(EMPTY_FORM);
    closeModal();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0614] text-white selection:bg-fuchsia-500 selection:text-white">
      <div className="border-b border-violet-500/30 bg-[#150a29] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-violet-200 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
            142 flexing now
          </span>
          <span className="hidden text-violet-300 md:block">
            Real brands. Real bids. Real exposure.
          </span>
          <span className="whitespace-nowrap text-fuchsia-300">
            Live volume: {money.format(totalVolume)}
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0614]/90 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="text-2xl font-black tracking-tighter">
            FLEX<span className="text-fuchsia-400">SPOT</span>
            <span className="text-violet-400">.LOL</span>
          </a>
          <button
            onClick={openModal}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-black shadow-lg shadow-fuchsia-950/60 transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
          >
            Donate $1 to Join →
          </button>
        </div>
      </header>
      <main id="top">
        <section className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-700/30 blur-[120px]" />
          <div className="relative lg:col-span-7">
            <p className="mb-5 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-200">
              The internet's loudest leaderboard
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[.92] tracking-tight sm:text-7xl">
              BID FOR ATTENTION.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-400">
                OWN THE SPOTLIGHT.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-violet-100/70">
              Drop your brand on the board, outbid the competition, and turn a
              tiny donation into a very visible flex.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={openModal}
                className="rounded-xl bg-white px-6 py-3.5 font-black text-[#12091e] transition hover:bg-fuchsia-100 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Start with $1
              </button>
              <a
                href="#leaderboard"
                className="text-sm font-bold text-violet-200 hover:text-white"
              >
                See who's winning ↓
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="rotate-2 rounded-3xl border border-violet-300/30 bg-gradient-to-br from-violet-600 to-fuchsia-700 p-1 shadow-2xl shadow-violet-950/70">
              <div className="rounded-[22px] bg-[#140a24] p-7">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-fuchsia-300">
                  Currently on top
                </p>
                <div className="my-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-white text-5xl font-black text-violet-700">
                  {leaderboard[0].mark}
                </div>
                <p className="text-3xl font-black">{leaderboard[0].name}</p>
                <p className="mt-1 text-violet-200/70">
                  {leaderboard[0].tagline}
                </p>
                <div className="mt-7 flex items-end justify-between border-t border-white/10 pt-5">
                  <span className="text-sm font-bold text-violet-200">
                    Crown bid
                  </span>
                  <span className="text-3xl font-black text-lime-300">
                    {money.format(leaderboard[0].amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="leaderboard"
          className="border-y border-violet-400/15 bg-[#10071d] px-6 py-14"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-fuchsia-300">
                  Updates instantly
                </p>
                <h2 className="mt-1 text-3xl font-black">
                  Live Leaderboard 🏆
                </h2>
              </div>
              <span className="rounded-full bg-lime-400/10 px-3 py-1.5 text-xs font-bold text-lime-300">
                ● LIVE &amp; INTERACTIVE
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {leaderboard.map((item, index) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/10 bg-[#1a0d2c] p-5 transition hover:-translate-y-1 hover:border-fuchsia-400/70 hover:bg-[#21103a] focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl font-black text-fuchsia-300">
                      #{index + 1}
                    </span>
                    <span className="rounded-full bg-violet-500/15 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-violet-200">
                      {index === 0 ? "👑 Crown holder" : "Active bid"}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-300 to-fuchsia-300 text-xl font-black text-[#1a0d2c]">
                      {item.mark}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-black group-hover:text-fuchsia-200">
                        {item.name}
                      </h3>
                      <p className="truncate text-sm text-violet-100/60">
                        {item.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-violet-200/60">
                      {item.clicks.toLocaleString()} clicks
                    </span>
                    <span className="text-2xl font-black text-lime-300">
                      {money.format(item.amount)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-title"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-violet-300/30 bg-[#190c2b] p-6 shadow-2xl shadow-black sm:p-8">
            <button
              onClick={closeModal}
              aria-label="Close join form"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xl text-violet-100 transition hover:bg-white/10"
            >
              ×
            </button>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-fuchsia-300">
              Make your flex
            </p>
            <h2 id="join-title" className="mt-1 text-3xl font-black">
              Claim your spot.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-violet-100/65">
              Give $1 or more. Your entry joins the leaderboard and ranks by its
              bid immediately.
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-bold">
                Brand Name
                <input
                  autoFocus
                  required
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Pixel Potato"
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#0d0718] px-4 py-3 text-white placeholder:text-violet-200/30 focus:border-fuchsia-400 focus:outline-none"
                />
              </label>
              <label className="block text-sm font-bold">
                Tagline
                <input
                  name="tagline"
                  value={form.tagline}
                  onChange={updateField}
                  placeholder="High-carb computing"
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#0d0718] px-4 py-3 text-white placeholder:text-violet-200/30 focus:border-fuchsia-400 focus:outline-none"
                />
              </label>
              <label className="block text-sm font-bold">
                URL
                <input
                  required
                  name="url"
                  type="text"
                  inputMode="url"
                  value={form.url}
                  onChange={updateField}
                  placeholder="yourwebsite.com"
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#0d0718] px-4 py-3 text-white placeholder:text-violet-200/30 focus:border-fuchsia-400 focus:outline-none"
                />
              </label>
              <label className="block text-sm font-bold">
                Bid Amount (USD)
                <input
                  required
                  name="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.amount}
                  onChange={updateField}
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#0d0718] px-4 py-3 font-black text-lime-300 focus:border-fuchsia-400 focus:outline-none"
                />
              </label>
              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-400/10 px-3 py-2 text-sm font-medium text-red-200"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 font-black transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
              >
                Submit &amp; take your rank →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
