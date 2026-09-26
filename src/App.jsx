import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
const About = lazyRetry(() => import('./pages/About'));
const Contact = lazyRetry(() => import('./pages/Contact'));
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
const AuctionPage = lazyRetry(() => import('./pages/AuctionPage'));
import { fetchLeaderboard, fetchPendingSpots } from './lib/store';

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/s/:slug" element={<SpotProfile spots={spots} onClaim={openClaim} onBoost={openBoost} refresh={load} />} />
          <Route path="/top-referrers" element={<TopReferrersPage />} />
          <Route path="/dashboard" element={<Dashboard spots={spots} onClaim={openClaim} />} />
          <Route path="/auction" element={<AuctionPage />} />
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
