import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Flee from '../components/Flee';
import FaqSection from '../components/FaqSection';
import { GEO_FAQS } from '../lib/geoFaqs';
import FounderNote from '../components/FounderNote';
import ExpertVoices from '../components/ExpertVoices';

const STEPS = [
  {
    icon: '⚡',
    tag: 'STEP 01',
    time: '60 seconds',
    accent: 'blaze',
    t: 'Claim your spot',
    s: 'Tell us who you are — no signup, no friction. From $1 you own a public page at flexspot.lol/your-name.',
    bullets: ['Name, picture, story + links — done in a minute', 'Your brand is officially in the game'],
  },
  {
    icon: '💳',
    tag: 'STEP 02',
    time: 'crypto',
    accent: 'green',
    t: 'Fuel it with USDT',
    s: 'Send USDT on BSC, Solana or Tron, upload the payment screenshot, and join the review queue.',
    bullets: ['Zero fees — every cent counts toward your rank', 'Approval usually lands within hours'],
  },
  {
    icon: '🚀',
    tag: 'STEP 03',
    time: 'the climb',
    accent: 'blue',
    t: 'Outrank your rivals',
    s: 'Highest amount wins the crown. Tie? Whoever got there FIRST takes it — even $0.01 more puts you above.',
    bullets: ['Pass a rival and you steal their rank live', 'It all happens in front of everyone 😬'],
  },
  {
    icon: '📣',
    tag: 'STEP 04',
    time: 'go viral',
    accent: 'gold',
    t: 'Rally your crowd',
    s: 'Share your page everywhere — X, Instagram, Telegram. Fans boost the brands they love, and every boost pushes you higher.',
    bullets: ['Referral joins grow your stats', 'Unlock rewards as your crowd spreads the word'],
  },
  {
    icon: '👑',
    tag: 'STEP 05',
    time: 'glory',
    accent: 'blaze',
    t: 'Take the crown',
    s: 'Hit #1 and you get the golden spotlight card, the homepage feature, and the most-clicked spot on the page.',
    bullets: ['Maximum eyeballs on your brand', 'But sleep on it and a challenger takes it all — defend it 👑'],
  },
];

const ACCENT = {
  blaze: { soft: 'bg-[var(--blaze-soft)]', text: 'text-[var(--blaze)]', ring: 'border-[var(--blaze)]/30', dot: 'bg-[var(--blaze)]' },
  green: { soft: 'bg-[var(--green-soft)]', text: 'text-[#0A8A4E]', ring: 'border-[var(--green)]/30', dot: 'bg-[var(--green)]' },
  blue: { soft: 'bg-[var(--blue-soft)]', text: 'text-[#1D5FC4]', ring: 'border-[var(--blue)]/30', dot: 'bg-[var(--blue)]' },
  gold: { soft: 'bg-[var(--gold-soft)]', text: 'text-[var(--gold-deep)]', ring: 'border-[var(--gold)]/40', dot: 'bg-[var(--gold)]' },
};

const BATTLES = [
  { icon: '🥊', kick: 'DRAMA', t: 'Call out a rival', d: 'Tag a competitor. Dare them to out-boost you. The internet loves a fight — and both of you get the traffic.' },
  { icon: '🎪', kick: 'TIMING', t: 'Make it an event', d: 'Launch day? Drop day? Birthday? Turn any moment into a leaderboard war and let your crowd carry you to #1.' },
  { icon: '🤣', kick: 'MEMES', t: 'Memes welcome', d: 'Funny pages climb fast. A joke brand with a crowd can dethrone a serious company. That\'s the whole point.' },
  { icon: '🌍', kick: 'OPEN', t: 'Anyone, anywhere', d: 'Business, creator, social account, personal brand, pure meme — $1 and something to show is all it takes.' },
];

export default function HowItWorks({ onClaim }) {
  return (
    <div className="pt-[92px]">
      {/* ---------- HERO ---------- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--line)] rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[var(--ink-2)] mb-5 shadow-[var(--shadow-card)]"
        >
          <span className="live-dot" /> THE INTERNET'S LIVE BRAND BATTLE
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display font-extrabold text-4xl sm:text-6xl text-[var(--ink)] tracking-tight"
        >
          How FlexSpot works: <span className="grad-text">claim a spot from $1 and outrank everyone.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[var(--ink-2)] mt-4 max-w-xl mx-auto text-base sm:text-lg"
        >
          Five steps to internet fame. No ads account, no marketing degree — just $1, a little nerve, and the guts to outrank everyone else.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-[var(--ink-3)] mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          <strong className="text-[var(--ink-2)]">What is FlexSpot?</strong> FlexSpot is the internet's public
          spotlight competition: anyone can claim a public leaderboard spot for their brand, creator page, or
          meme — starting at $1 — and fans boost it to climb the live rankings. The highest total takes the crown.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button onClick={onClaim} className="btn-primary px-8 py-4 text-base">⚡ I'm in — claim my spot</button>
          <Link to="/leaderboard" className="text-[var(--ink-2)] font-bold text-sm hover:text-[var(--ink)] transition-colors">
            Watch the battle live →
          </Link>
        </motion.div>
      </div>

      {/* ---------- STEPS: staggered cards, no timeline ---------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 items-start">
          {STEPS.map((s, i) => {
            const a = ACCENT[s.accent];
            return (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: (i % 2) * 0.08 }}
                className={i % 2 === 1 ? 'md:mt-12' : ''}
              >
                <div className={`card card-lift rounded-3xl p-6 sm:p-7 relative overflow-hidden border-t-4 ${a.ring}`}>
                  {/* ghost number */}
                  <span className="absolute -top-3 right-4 font-display font-black text-[92px] leading-none text-[var(--ink)] opacity-[0.06] select-none" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-3 mb-4 relative">
                    <div className={`shrink-0 w-14 h-14 rounded-2xl ${a.soft} border ${a.ring} grid place-items-center text-3xl shadow-sm`}>
                      <Flee><span className="inline-block">{s.icon}</span></Flee>
                    </div>
                    <div>
                      <div className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold ${a.text} uppercase tracking-[0.18em]`}>
                        <span className={`${a.soft} border ${a.ring} rounded-full px-2.5 py-0.5`}>{s.tag}</span>
                        <span className="text-[var(--ink-3)] font-semibold normal-case tracking-normal">· {s.time}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-2xl text-[var(--ink)] tracking-tight mt-1">{s.t}</h3>
                    </div>
                  </div>
                  <p className="text-[var(--ink-2)] text-[15px] leading-relaxed relative">{s.s}</p>
                  <ul className="mt-4 space-y-2 relative">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-[var(--ink)] font-medium">
                        <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full ${a.soft} grid place-items-center text-[11px] ${a.text} font-bold`}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ---------- BATTLES / BENTO ---------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink)] text-center tracking-tight"
        >
          How the viral ones <span className="grad-text">play it</span> 🔥
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.05 }}
          className="text-[var(--ink-2)] text-center mt-3 text-sm sm:text-base"
        >
          The leaderboard rewards drama. Use it.
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {BATTLES.map((a, i) => (
            <motion.div
              key={a.t}
              initial={{ opacity: 0, y: 28, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="card card-lift rounded-3xl p-6 relative overflow-hidden"
            >
              <div className="text-[11px] font-extrabold tracking-[0.2em] text-[var(--blaze)] mb-3">{a.kick}</div>
              <Flee><div className="text-6xl mb-4 drop-shadow-sm">{a.icon}</div></Flee>
              <h3 className="font-display font-extrabold text-lg text-[var(--ink)] mb-1.5 tracking-tight">{a.t}</h3>
              <p className="text-[var(--ink-2)] text-sm leading-relaxed">{a.d}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------- CTA BAND ---------- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-14 sm:mt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[32px] p-8 sm:p-12 text-center text-white shadow-[var(--shadow-blaze)]"
          style={{ background: 'radial-gradient(1000px 420px at 50% -10%, #7C3AED 0%, #4C1D95 45%, #1E1B4B 100%)' }}
        >
          <div className="absolute inset-0 opacity-[0.15]" aria-hidden="true"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
          {/* floating sparkles */}
          <motion.div className="absolute top-8 left-10 text-2xl" aria-hidden="true"
            animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>✨</motion.div>
          <motion.div className="absolute bottom-10 right-12 text-2xl" aria-hidden="true"
            animate={{ y: [0, 10, 0], rotate: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>⚡</motion.div>
          <div className="relative">
            <Flee>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl mb-4"
            >
              👑
            </motion.div>
            </Flee>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">Your rivals are already climbing.</h2>
            <p className="text-white/85 mt-3 max-w-md mx-auto">Every minute you wait, someone else takes the spot that should be yours.</p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={onClaim} className="bg-white text-[#5B21B6] font-extrabold px-10 py-4 rounded-full text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all">
                ⚡ Claim My Spot From $1
              </button>
            </div>
            <div className="mt-5 flex items-center justify-center gap-4 text-sm">
              <Link to="/faq" className="text-white/80 font-semibold hover:underline">Still curious? Read the FAQ →</Link>
              <span className="text-white/40">·</span>
              <Link to="/leaderboard" className="text-white/80 font-semibold hover:underline">See the leaderboard →</Link>
            </div>
          </div>
          <FounderNote />
          <ExpertVoices />
          <FaqSection faqs={GEO_FAQS['/how-it-works']} />
        </motion.div>
      </div>
    </div>
  );
}
