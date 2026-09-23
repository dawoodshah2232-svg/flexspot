import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Flee from './components/Flee';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ClaimPage from './pages/ClaimPage';
import LeaderboardPage from './pages/LeaderboardPage';
import HowItWorks from './pages/HowItWorks';
import Rewards from './pages/Rewards';
// Compare + Calculator are code-split like the blog — they never touch first paint.
const ComparePage = React.lazy(() => import('./pages/ComparePage'));
const CalculatorPage = React.lazy(() => import('./pages/CalculatorPage'));
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimers from './pages/Disclaimers';
import SpotProfile from './pages/SpotProfile';
import TopReferrersPage from './pages/TopReferrersPage';
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Admin = React.lazy(() => import('./pages/Admin'));
import { fetchLeaderboard, fetchPendingSpots, rank, saveRankSnapshot, IS_LIVE } from './lib/store';
import { LIVE_FEED_POOL } from './lib/data';

import { SiteSettingsProvider } from './lib/siteSettings.jsx';
import { trackPageView, writeHeartbeat, useLiveOnline } from './lib/analytics';
import { gaPageView } from './lib/ga';
import CookieConsent from './components/CookieConsent';
import DiscoveryPage from './pages/DiscoveryPage';
import Explore from './pages/Explore';
import CategoryPage from './pages/CategoryPage';
import RootProfile from './components/RootProfile';
import NotFound from './pages/NotFound';
import SecurityGuard from './components/SecurityGuard';
import PageHead from './components/PageHead';

// Blog engine — code-split so the markdown bundle never touches first paint.
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

function BlogFallback() {
  return (
    <div className="pt-[92px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 text-center">
        <div className="text-5xl mb-4 anim-floaty">📝</div>
        <div className="font-display font-bold text-[var(--ink)] text-lg">Loading the article…</div>
      </div>
    </div>
  );
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Real visitor analytics: page views on every route change + heartbeat
// every 10s so the admin "online now" count is genuinely live.
// Also fires a GA4 page_view per SPA navigation when GA is configured.
function AnalyticsTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const path = pathname + search;
    trackPageView(path, document.title);
    gaPageView(path);
    writeHeartbeat(path);
    const t = setInterval(() => writeHeartbeat(path), 10000);
    return () => clearInterval(t);
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
          <Route path="/compare" element={<React.Suspense fallback={<BlogFallback />}><ComparePage spots={spots} /></React.Suspense>} />
          <Route path="/calculator" element={<React.Suspense fallback={<BlogFallback />}><CalculatorPage spots={spots} onClaim={openClaim} /></React.Suspense>} />
          <Route path="/rewards" element={<Rewards spots={spots} onClaim={openClaim} />} />
          <Route path="/faq" element={<FAQ onClaim={openClaim} />} />
          <Route path="/blog" element={<React.Suspense fallback={<BlogFallback />}><Blog /></React.Suspense>} />
          <Route path="/blog/:slug" element={<React.Suspense fallback={<BlogFallback />}><BlogPost /></React.Suspense>} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimers" element={<Disclaimers />} />
          <Route path="/s/:slug" element={<SpotProfile spots={spots} onClaim={openClaim} onBoost={openBoost} refresh={load} />} />
          <Route path="/top-referrers" element={<TopReferrersPage />} />
          <Route path="/dashboard" element={<React.Suspense fallback={<BlogFallback />}><Dashboard spots={spots} onClaim={openClaim} /></React.Suspense>} />
          <Route path="/admin" element={<React.Suspense fallback={<BlogFallback />}><Admin spots={spots} pending={pending} refresh={load} /></React.Suspense>} />
          {/* Root profiles — static routes always win over /:slug in React Router ranking */}
          <Route path="/:slug" element={<RootProfile spots={spots} onClaim={openClaim} onBoost={openBoost} />} />
          <Route path="*" element={<NotFound onClaim={openClaim} />} />
        </Routes>
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
