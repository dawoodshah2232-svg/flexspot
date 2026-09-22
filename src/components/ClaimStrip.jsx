import Flee from './Flee';

// ClaimStrip — compact inline CTA dropped into the leaderboard flow after
// every 30th row. Reuses the homepage CTA band's design language (purple
// radial gradient, gold accents, caption pill) at ~2x a row's height.
export default function ClaimStrip({ onClaim }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl text-white"
      style={{ background: 'radial-gradient(700px 320px at 50% -20%, #7C3AED 0%, #4C1D95 55%, #1E1B4B 100%)' }}
    >
      <div className="absolute -top-12 left-1/4 w-48 h-48 bg-[#F59E0B]/25 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.12]" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="relative flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-5 py-5 sm:px-8 text-center sm:text-left">
        <Flee className="shrink-0">
          <span className="anim-floaty block text-4xl sm:text-5xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]">👑</span>
        </Flee>
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-[#FCD34D]">
            <span className="live-dot" /> THE #1 SPOT IS UP FOR GRABS
          </div>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl mt-2 leading-tight">
            Not on the board yet? <Flee className="inline-block"><span className="inline-block">✨</span></Flee>
          </h3>
          <p className="text-white/75 text-xs sm:text-sm mt-1">
            The top 10 gets 80% of all clicks. Your spot is one claim away — from just $1.
          </p>
        </div>
        <button onClick={onClaim} className="btn-gold px-6 py-3 text-sm font-extrabold shrink-0 w-full sm:w-auto">
          ⚡ Claim Your Spot From $1
        </button>
      </div>
    </div>
  );
}
