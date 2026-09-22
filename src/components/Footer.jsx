import { Link } from 'react-router-dom';
import { Logo } from './Navbar';

export default function Footer({ onClaim }) {
  return (
    <footer className="border-t border-line/5 bg-coal/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="text-mist text-sm mt-4 max-w-sm leading-relaxed">
            The internet's public spotlight marketplace. Claim your spot from $1, climb the live leaderboard, and show the world what you're building.
          </p>
          <button onClick={onClaim} className="btn-primary px-5 py-2.5 text-sm mt-5">⚡ Claim Your Spot</button>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm tracking-wide mb-4">EXPLORE</h4>
          <ul className="space-y-2.5 text-sm text-mist">
            <li><Link className="hover:text-snow transition-colors" to="/leaderboard">Leaderboard</Link></li>
            <li><Link className="hover:text-snow transition-colors" to="/how-it-works">How It Works</Link></li>
            <li><Link className="hover:text-snow transition-colors" to="/rewards">Rewards</Link></li>
            <li><Link className="hover:text-snow transition-colors" to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm tracking-wide mb-4">SPOTLIGHT</h4>
          <ul className="space-y-2.5 text-sm text-mist">
            <li><Link className="hover:text-snow transition-colors" to="/winners">Top spot this week</Link></li>
            <li><Link className="hover:text-snow transition-colors" to="/trending">Trending now</Link></li>
            <li><Link className="hover:text-snow transition-colors" to="/rising">Rising fast</Link></li>
            <li><Link className="hover:text-snow transition-colors" to="/new">New to watch</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mist">
          <span>© {new Date().getFullYear()} FlexSpot.LOL — Everyone wants a spot on this page.</span>
          <span className="flex items-center gap-2"><span className="live-dot" /> Live leaderboard</span>
        </div>
      </div>
      <div className="h-24 lg:hidden" />
    </footer>
  );
}
