import { Link } from 'react-router-dom';

const STEPS = [
  { icon: '⚡', t: 'Claim your spot', d: 'Tell us who you are: name, logo, tagline, website and socials. No signup, no friction — under a minute, starting from $1. You instantly get your own public page at flexspot.lol/your-name.' },
  { icon: '💳', t: 'Contribute', d: 'Choose your contribution. In Phase 1, payment is verified manually by our team (usually within hours). Automatic checkout is coming soon. 100% of your contribution counts toward your rank.' },
  { icon: '🚀', t: 'Climb the leaderboard', d: 'Spots rank by total verified support. Every dollar moves you up — pass a rival and you take their rank live, in front of everyone. Boost yourself anytime, or rally friends to back you.' },
  { icon: '📣', t: 'Go viral', d: 'Share your page and referral link on WhatsApp, X, Instagram and everywhere else. Referral joins grow your stats and unlock rewards like Most Shared and Community Favorite.' },
  { icon: '👑', t: 'Own the spotlight', d: 'Reach #1 and take the crown: golden spotlight card, homepage feature, and the most-clicked spot on the page. Defend it — challengers are always coming.' },
];

const AUDIENCES = [
  { icon: '🧑‍🎤', t: 'Creators & personal brands', d: 'Turn followers into fuel. A FlexSpot page is a public scoreboard for your hype — link it in your bio and let fans push you to #1.' },
  { icon: '🚀', t: 'Startups & products', d: 'Launch day, every day. Get in front of thousands of curious visitors and convert attention into signups.' },
  { icon: '🏢', t: 'Companies & local businesses', d: 'Cheap, visible, fun advertising. Outrank competitors in your city or niche and own the local spotlight.' },
  { icon: '🎪', t: 'Events & communities', d: 'Sell out your event or grow your community by making the leaderboard part of the story.' },
];

export default function HowItWorks({ onClaim }) {
  return (
    <div className="pt-[68px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 text-center">
        <h1 className="font-display font-bold text-4xl sm:text-6xl text-snow tracking-tight">How <span className="grad-text">FlexSpot</span> works</h1>
        <p className="text-mist mt-4 max-w-xl mx-auto">Five steps between you and internet fame. No ads account, no marketing degree required.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 space-y-4">
        {STEPS.map((s, i) => (
          <div key={s.t} className="card-lift flex gap-5 bg-card border border-white/5 rounded-3xl p-6">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-electric/15 border border-electric/30 grid place-items-center text-3xl">{s.icon}</div>
            <div>
              <div className="text-[11px] font-bold text-electric uppercase tracking-[0.18em] mb-1">Step {i + 1}</div>
              <h3 className="font-display font-bold text-xl text-snow mb-1.5">{s.t}</h3>
              <p className="text-mist text-sm leading-relaxed">{s.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <h2 className="font-display font-bold text-3xl text-snow text-center">Who's it for?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {AUDIENCES.map((a) => (
            <div key={a.t} className="card-lift bg-card border border-white/5 rounded-3xl p-6">
              <div className="text-4xl mb-3">{a.icon}</div>
              <h3 className="font-display font-bold text-snow mb-1.5">{a.t}</h3>
              <p className="text-mist text-sm leading-relaxed">{a.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-14 rounded-[32px] spotlight bg-gradient-to-br from-gold/15 via-card to-card border border-gold/25 p-8 sm:p-12 text-center">
        <h2 className="font-display font-bold text-3xl text-snow">Ready for your moment?</h2>
        <p className="text-mist mt-3">Your name. Your brand. Your moment. From $1.</p>
        <button onClick={onClaim} className="btn-gold px-10 py-4 mt-6">⚡ Claim My Spot Now</button>
        <div className="mt-4"><Link to="/faq" className="text-electric text-sm font-semibold hover:underline">Still curious? Read the FAQ →</Link></div>
      </div>
    </div>
  );
}
