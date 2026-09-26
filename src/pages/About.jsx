import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Section({ title, children }) {
  return (
    <section className="mb-9">
      <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)] tracking-tight mb-3">{title}</h2>
      <div className="text-[var(--ink-2)] text-[15px] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function About() {
  return (
    <div className="pt-[92px]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--blaze)] bg-[var(--blaze)]/10 rounded-full px-4 py-1.5 mb-5">
            👑 About FlexSpot
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight">
            The internet's <span className="grad-text">live spotlight</span>
          </h1>
          <p className="text-[var(--ink-2)] mt-4 leading-relaxed">
            FlexSpot.LOL is a public leaderboard where brands, startups, creators, and meme pages
            compete for attention. Anyone can claim a spot from just $1, boost it to climb the
            board, and the highest bidder takes the crown — live, in front of everyone.
          </p>
          <p className="text-[var(--ink-2)] mt-3 leading-relaxed">
            Launched in September 2026, FlexSpot is built on one simple idea: attention is the
            currency of the internet, and the price of it should be public. Every rank on our
            board was paid for, and every payment is verified by a real human before it goes
            live. No hidden algorithms, no black boxes — just a transparent race for the
            spotlight.
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9">
          <Section title="How it works">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Claim a spot</strong> — pick a brand name, add your details, and pay from $1 in USDT. No account needed to start.</li>
              <li><strong className="text-[var(--ink)]">Boost to climb</strong> — every extra dollar of boost moves you up the live leaderboard.</li>
              <li><strong className="text-[var(--ink)]">Refer and earn</strong> — every member gets a personal referral link and earns 20% commission on every payment from people who join through it, paid in USDT.</li>
              <li><strong className="text-[var(--ink)]">Transparent by design</strong> — spots are ordered by total verified boosts, so what you see is exactly what was paid.</li>
            </ul>
            <p>
              New here? Start with <Link to="/how-it-works" className="text-[var(--blaze)] hover:underline font-semibold">How it works</Link> or
              browse the <Link to="/faq" className="text-[var(--blaze)] hover:underline font-semibold">FAQ</Link>.
            </p>
          </Section>

          <Section title="Who runs FlexSpot">
            <p>
              FlexSpot is operated by Dawood Shah, based in Dubai, United Arab Emirates.
              It's an independent project — a small team building a fairer way for brands to
              buy attention.
            </p>
            <p>
              We publish honest numbers only: rankings reflect real paid boosts, and our{' '}
              <Link to="/disclaimers" className="text-[var(--blaze)] hover:underline font-semibold">disclaimers</Link> page
              spells out exactly what a paid spot does and doesn't guarantee.
            </p>
          </Section>

          <Section title="Talk to us">
            <p>
              Questions, feedback, press, or partnership ideas — we'd genuinely like to hear
              from you. Head to the <Link to="/contact" className="text-[var(--blaze)] hover:underline font-semibold">Contact page</Link> and
              reach out. We read every message.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
