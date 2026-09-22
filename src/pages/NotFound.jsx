import { Link } from 'react-router-dom';
import Flee from '../components/Flee';

// Dedicated 404 — replaces the old catch-all that rendered the homepage.
export default function NotFound({ onClaim }) {
  return (
    <div className="pt-[92px] min-h-screen grid place-items-center px-4">
      <div className="text-center max-w-md py-16">
        <div className="text-7xl mb-6"><Flee><span className="inline-block">🕳️</span></Flee></div>
        <h1 className="font-display font-extrabold text-4xl text-[var(--ink)] mb-3">
          Lost in the spotlight?
        </h1>
        <p className="text-[var(--ink-2)] text-sm leading-relaxed mb-8">
          That page doesn't exist. The internet is big — but the leaderboard is right here.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary px-8 py-3.5 text-sm">
            🏠 Back home
          </Link>
          <Link to="/leaderboard" className="btn-ghost px-8 py-3.5 text-sm">
            📊 Leaderboard
          </Link>
        </div>
        {onClaim && (
          <button onClick={onClaim} className="mt-6 text-sm font-bold text-[var(--blaze)] hover:underline">
            ⚡ Claim your spot instead — from $1
          </button>
        )}
      </div>
    </div>
  );
}
