import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Flee from './components/Flee';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
// Chunk filenames change on every deploy. If a code-split chunk 404s because
// the tab holds HTML from the previous deploy, reload once to fetch fresh
// HTML instead of dying on a black page. The ErrorBoundary below is the
// second net: any render crash shows a reload card, never a dead screen.
function lazyRetry(importFn) {
  return React.lazy(() =>
    importFn().catch((err) => {
      const key = 'flexspot_chunk_retry_v1';
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1');
        window.location.reload();
      }
      throw err;
    })
  );
}
// Compare + Calculator are code-split like the blog — they never touch first paint.
// Route-level splitting: every page is its own chunk, so the first-paint
// bundle only carries the shell (header/footer/analytics) + whatever route
// the visitor lands on. This took the main bundle from ~1.5MB to a fraction.
const Home = lazyRetry(() => import('./pages/Home'));
const ClaimPage = lazyRetry(() => import('./pages/ClaimPage'));
const LeaderboardPage = lazyRetry(() => import('./pages/LeaderboardPage'));
const HowItWorks = lazyRetry(() => import('./pages/HowItWorks'));
const Rewards = lazyRetry(() => import('./pages/Rewards'));
const FAQ = lazyRetry(() => import('./pages/FAQ'));
const Privacy = lazyRetry(() => import('./pages/Privacy'));
const Terms = lazyRetry(() => import('./pages/Terms'));
const Disclaimers = lazyRetry(() => import('./pages/Disclaimers'));
const SpotProfile = lazyRetry(() => import('./pages/SpotProfile'));
const TopReferrersPage = lazyRetry(() => import('./pages/TopReferrersPage'));
const DiscoveryPage = lazyRetry(() => import('./pages/DiscoveryPage'));
const Explore = lazyRetry(() => import('./pages/Explore'));
const CategoryPage = lazyRetry(() => import('./pages/CategoryPage'));
const RootProfile = lazyRetry(() => import('./components/RootProfile'));
const NotFound = lazyRetry(() => import('./pages/NotFound'));
const ComparePage = lazyRetry(() => import('./pages/ComparePage'));
const CalculatorPage = lazyRetry(() => import('./pages/CalculatorPage'));
const Dashboard = lazyRetry(() => import('./pages/Dashboard'));
const Admin = lazyRetry(() => import('./pages/Admin'));
import { fetchLeaderboard, fetchPendingSpots, rank, saveRankSnapshot, IS_LIVE } from './lib/store';
import { LIVE_FEED_POOL } from './lib/data';

import { SiteSettingsProvider } from './lib/siteSettings.jsx';
import { useLiveOnline, startTracking, stopTracking } from './lib/analytics';
import { gaPageView } from './lib/ga';
import CookieConsent from './components/CookieConsent';
import SecurityGuard from './components/SecurityGuard';
import PageHead from './components/PageHead';

// Blog engine — code-split so the markdown bundle never touches first paint.
const Blog = lazyRetry(() => import('./pages/Blog'));
const BlogPost = lazyRetry(() => import('./pages/BlogPost'));

// Shared lazy-route fallback: matches the pre-data loading screen.
function RouteFallback() {
  return (
    <div className="pt-[92px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 text-center">
        <div className="text-5xl mb-4 anim-floaty">⚡</div>
        <div className="font-display font-bold text-[var(--ink)] text-lg">Loading the spotlight…</div>
      </div>
    </div>
  );
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Real visitor analytics: one server beacon per page view + a 20s heartbeat
// while the tab is visible, so the admin sees genuine site-wide traffic.
// Admin pages are never tracked (your own browsing must not pollute stats).
// Also fires a GA4 page_view per SPA navigation when GA is configured.
function AnalyticsTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const path = pathname + search;
    if (pathname.startsWith('/admin')) { stopTracking(); return; }
    startTracking(path);
    gaPageView(path);
    return () => stopTracking();
  }, [pathname, search]);
  return null;
}

function Shell() {
  const [spots, setSpots] = useState([]);
  const [pending, setPending] = useState([]);
  const [moves, setMoves] = useState({});
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);
  // REAL online count (analytics heartbeats). Public pages multiply it via display.js.
  const online = useLiveOnline(5000);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    const data = await fetchLeaderboard();
    setPending(fetchPendingSpots());
    // True rank deltas come from the store's snapshot tracking (spot.move)
    const mv = {};
    data.forEach((s) => { if (s.move) mv[s.slug] = s.move; });
    if (Object.keys(mv).length) {
      setMoves(mv);
      setTimeout(() => setMoves({}), 2600);
    }
    setSpots(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toast = useCallback((msg) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  // Demo-mode live simulation: periodic boosts & joins keep the board alive
  useEffect(() => {
    if (IS_LIVE || loading) return;
    const tick = () => {
      setSpots((old) => {
        if (!old.length) return old;
        const prevRank = {};
        old.forEach((s) => { prevRank[s.slug] = s.rank; });
        const next = old.map((s) => ({ ...s }));
        const r = Math.random();
        if (r < 0.7) {
          const i = Math.floor(Math.random() * next.length);
          const bump = [0.5, 1, 2, 5][Math.floor(Math.random() * 4)];
          next[i] = { ...next[i], amount: next[i].amount + bump };
          if (Math.random() < 0.5) toast(`⚡ ${next[i].name} just got a $${bump} boost`);
        } else {
          const [name, action] = LIVE_FEED_POOL[Math.floor(Math.random() * LIVE_FEED_POOL.length)];
          toast(`🔥 ${name} ${action}`);
        }
        const ranked = rank(next);
        // True rank deltas: old rank - new rank (positive = climbed)
        const mv = {};
        ranked.forEach((s) => {
          const d = (prevRank[s.slug] ?? s.rank) - s.rank;
          if (d !== 0) mv[s.slug] = d;
        });
        if (Object.keys(mv).length) {
          setMoves(mv);
          setTimeout(() => setMoves({}), 2600);
        }
        saveRankSnapshot(ranked);
        return ranked.map((s) => ({ ...s, move: mv[s.slug] || 0 }));
      });
    };
    const t = setInterval(tick, 22000);
    return () => clearInterval(t);
  }, [loading, toast]);

  const openClaim = useCallback(() => { navigate('/claim'); }, [navigate]);
  const openBoost = useCallback((spot) => { navigate(`/claim?boost=${spot.slug}`); }, [navigate]);

  const onSubmitted = useCallback(() => { load(); }, [load]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[var(--bg)]">
        <div className="text-center">
          <Flee><div className="text-5xl mb-4 anim-floaty">⚡</div></Flee>
          <div className="font-display font-bold text-[var(--ink)] text-lg">Loading the spotlight…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] overflow-x-clip">
      <ScrollTop />
      <AnalyticsTracker />
      <PageHead spots={spots} />
      <SecurityGuard />
      <Header onClaim={openClaim} />
      <main>
        <ErrorBoundary>
        <React.Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home spots={spots} onClaim={openClaim} onBoost={openBoost} viewers={online.length} />} />
          <Route path="/claim" element={<ClaimPage spots={spots} onSubmitted={onSubmitted} />} />
          <Route path="/leaderboard" element={<LeaderboardPage spots={spots} moves={moves} onBoost={openBoost} onClaim={openClaim} />} />
          <Route path="/explore" element={<Explore spots={spots} onBoost={openBoost} onClaim={openClaim} />} />
          <Route path="/explore/:category" element={<CategoryPage spots={spots} moves={moves} onBoost={openBoost} onClaim={openClaim} />} />
          <Route path="/trending" element={<DiscoveryPage mode="trending" spots={spots} moves={moves} onBoost={openBoost} onClaim={openClaim} />} />
          <Route path="/rising" element={<DiscoveryPage mode="rising" spots={spots} moves={moves} onBoost={openBoost} onClaim={openClaim} />} />
          <Route path="/winners" element={<DiscoveryPage mode="winners" spots={spots} moves={moves} onBoost={openBoost} onClaim={openClaim} />} />
          <Route path="/new" element={<DiscoveryPage mode="new" spots={spots} moves={moves} onBoost={openBoost} onClaim={openClaim} />} />
          <Route path="/how-it-works" element={<HowItWorks onClaim={openClaim} />} />
          <Route path="/compare" element={<ComparePage spots={spots} />} />
          <Route path="/calculator" element={<CalculatorPage spots={spots} onClaim={openClaim} />} />
          <Route path="/rewards" element={<Rewards spots={spots} onClaim={openClaim} />} />
          <Route path="/faq" element={<FAQ onClaim={openClaim} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimers" element={<Disclaimers />} />
          <Route path="/s/:slug" element={<SpotProfile spots={spots} onClaim={openClaim} onBoost={openBoost} refresh={load} />} />
          <Route path="/top-referrers" element={<TopReferrersPage />} />
          <Route path="/dashboard" element={<Dashboard spots={spots} onClaim={openClaim} />} />
          <Route path="/admin" element={<Admin spots={spots} pending={pending} refresh={load} />} />
          {/* Root profiles — static routes always win over /:slug in React Router ranking */}
          <Route path="/:slug" element={<RootProfile spots={spots} onClaim={openClaim} onBoost={openBoost} />} />
          <Route path="*" element={<NotFound onClaim={openClaim} />} />
        </Routes>
        </React.Suspense>
        </ErrorBoundary>
      </main>
      <Footer onClaim={openClaim} />
      <MobileNav onClaim={openClaim} />
      <CookieConsent />

      {/* toasts */}
      <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none w-full px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="toast-pop rounded-2xl px-5 py-3 text-sm font-semibold whitespace-nowrap max-w-full overflow-hidden text-ellipsis bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] shadow-[var(--shadow-card)]"
            >
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SiteSettingsProvider>
        <Shell />
      </SiteSettingsProvider>
    </BrowserRouter>
  );
}
