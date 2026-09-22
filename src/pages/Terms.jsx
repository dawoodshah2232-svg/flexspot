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

export default function Terms() {
  return (
    <div className="pt-[92px]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--gold)] bg-[var(--gold)]/10 rounded-full px-4 py-1.5 mb-5">
            📜 Terms of Service
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight">
            The rules of <span className="grad-text">the game</span>
          </h1>
          <p className="text-[var(--ink-2)] mt-3 text-sm">Last updated: September 2026</p>
          <p className="text-[var(--ink-2)] mt-4 leading-relaxed">
            By claiming a spot, boosting a brand, or using FlexSpot.LOL ("FlexSpot", "we", "us"),
            you agree to these terms. They're written in plain language on purpose — the competition
            is fun, and the rules should be too.
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9">
          <Section title="1. The competition, in short">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>FlexSpot is a public leaderboard where brands compete for the top spot.</li>
              <li><strong className="text-[var(--ink)]">Rank is decided by contribution amount</strong> — the highest amount holds the #1 spot. Ties are broken by who claimed first (earliest wins).</li>
              <li>One cent more is enough to overtake a rival. That's the game.</li>
              <li>View counts, boosts, and referrals affect visibility and rewards — but rank itself follows the money.</li>
            </ul>
          </Section>

          <Section title="2. Claiming a spot & payments">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">$1 minimum</strong> to claim a spot. Any amount from $1 up is accepted.</li>
              <li>Payments are <strong className="text-[var(--ink)]">USDT only</strong>, sent manually to the wallet address shown for the network you choose (BSC, Solana, or Tron).</li>
              <li>You <strong className="text-[var(--ink)]">upload a payment screenshot</strong> as proof; a transaction ID (TxID) is optional but helps us verify faster.</li>
              <li>Every claim is reviewed by our team before it goes live — <strong className="text-[var(--ink)]">admin approval is required</strong>. New spots appear as "Pending Approval" until verified.</li>
              <li>The amount you select is the total you pay — no hidden fees added by us.</li>
            </ul>
          </Section>

          <Section title="3. Refunds">
            <p>
              Once your spot has been <strong className="text-[var(--ink)]">approved and published</strong> on the
              leaderboard, payments are <strong className="text-[var(--ink)]">non-refundable</strong> — your brand
              is already receiving the public exposure you paid for. If your claim is rejected during
              review (e.g. invalid proof), we will work with you to resolve it or arrange a refund for
              verified genuine payments.
            </p>
          </Section>

          <Section title="4. Fair play — fake proofs get banned">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">No fake payment proofs.</strong> Uploaded screenshots are reviewed manually; forged, reused, or manipulated proofs lead to rejection and a permanent ban from the leaderboard.</li>
              <li>No impersonating other brands, no trademark-infringing logos, no illegal or adult content.</li>
              <li>No bot traffic, fake views, or manipulation of counters — we reserve the right to remove or demote spots involved in abuse.</li>
              <li>We may edit or remove any spot that violates these rules, at our discretion.</li>
            </ul>
          </Section>

          <Section title="5. Boosts, referrals & rewards">
            <p>
              Boosts follow the same payment and verification rules as new claims. Referral codes
              credit the referrer according to the rewards program shown on the Rewards page.
              Reward details may be adjusted as the program evolves — we'll announce material changes
              on the site before they take effect.
            </p>
          </Section>

          <Section title="6. Demo content">
            <p>
              While the site is in preview, the leaderboard may include <strong className="text-[var(--ink)]">demo
              brands</strong> used to demonstrate how FlexSpot works. Demo entries are labelled as such
              and represent no real payment or endorsement. They will be cleared when the live
              competition opens.
            </p>
          </Section>

          <Section title="7. Eligibility">
            <p>
              You must be <strong className="text-[var(--ink)]">18 or older</strong>, or have a parent or
              guardian's consent, to make a payment on FlexSpot. By paying, you confirm you meet
              this requirement.
            </p>
          </Section>

          <Section title="8. What FlexSpot is (and isn't)">
            <p>
              FlexSpot sells public exposure on a leaderboard — not investment products, not guaranteed
              traffic, and not financial advice. Ranking is determined transparently by contribution
              amount, but we make no promises about how many visitors your spot will receive.
              The service is provided "as is"; we aim for high uptime and fairness but can't
              guarantee uninterrupted availability.
            </p>
          </Section>

          <Section title="9. Changes">
            <p>
              We may update these terms as FlexSpot grows. Material changes will be highlighted on
              the site, and the "Last updated" date will always reflect the current version.
              Continued use after changes take effect means you accept them.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              Questions about these terms? Reach out via the contact details on our site or through
              our social channels in the footer. By using FlexSpot, you agree to these terms and
              our <Link to="/privacy" className="text-[var(--blaze)] hover:underline font-semibold">Privacy Policy</Link>.
            </p>
          </Section>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/privacy" className="btn-ghost px-6 py-3 text-center text-sm">Read the Privacy Policy</Link>
          <Link to="/claim" className="btn-primary px-6 py-3 text-center text-sm">⚡ Claim Your Spot — $1</Link>
        </div>
      </div>
    </div>
  );
}
