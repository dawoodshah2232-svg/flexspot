import { Link } from 'react-router-dom';
import { Logo } from './Header';
import Floaties from './Floaties';

export default function Footer({ onClaim }) {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line-soft)] bg-[var(--surface)] mt-20">
      <Floaties
        items={[
          { emoji: '👑', left: '2%', top: '18%', size: 26, cls: 'hidden md:block', opacity: 0.35 },
          { emoji: '⚡', left: '96%', top: '12%', size: 24, cls: 'hidden md:block', opacity: 0.35 },
          { emoji: '🚀', left: '88%', top: '68%', size: 26, cls: 'hidden md:block', opacity: 0.3 },
          { emoji: '💎', left: '6%', top: '72%', size: 22, cls: 'hidden md:block', opacity: 0.3 },
          { emoji: '✨', left: '50%', top: '8%', size: 20, cls: 'hidden md:block', opacity: 0.3 },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-5 relative">
        <div className="md:col-span-2">
          <Logo />
          <p className="text-[var(--ink-2)] text-sm mt-4 max-w-sm leading-relaxed">
            The internet's live spotlight competition. Claim your spot from $1, climb the
            leaderboard, and show the world what you're building.
          </p>
          <button onClick={onClaim} className="btn-primary px-5 py-2.5 text-sm mt-5">
            ⚡ Claim Your Spot
          </button>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm tracking-wide mb-4 text-[var(--ink)]">EXPLORE</h4>
          <ul className="space-y-2.5 text-sm text-[var(--ink-2)]">
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/explore">Explore</Link></li>
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/leaderboard">Leaderboard</Link></li>
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/rewards">Rewards</Link></li>
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/how-it-works">How It Works</Link></li>
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm tracking-wide mb-4 text-[var(--ink)]">LEGAL</h4>
          <ul className="space-y-2.5 text-sm text-[var(--ink-2)]">
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/terms">Terms of Service</Link></li>
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/disclaimers">Disclaimers</Link></li>
            <li><a className="hover:text-[var(--ink)] transition-colors" href="mailto:support@flexspot.lol">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm tracking-wide mb-4 text-[var(--ink)]">SPOTLIGHT</h4>
          <ul className="space-y-2.5 text-sm text-[var(--ink-2)]">
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/winners">Top spot this week</Link></li>
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/trending">Trending now</Link></li>
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/rising">Rising fast</Link></li>
            <li><Link className="hover:text-[var(--ink)] transition-colors" to="/new">New to watch</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--ink-2)]">
          <span>© {new Date().getFullYear()} FlexSpot.LOL — Everyone wants a spot on this page.</span>
          <span className="flex items-center gap-2"><span className="live-dot" /> Live leaderboard</span>
        </div>
      </div>
      <div className="h-24 lg:hidden" />
    </footer>
  );
}
