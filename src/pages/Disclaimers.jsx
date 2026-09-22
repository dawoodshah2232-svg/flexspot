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

export default function Disclaimers() {
  return (
    <div className="pt-[92px]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--blaze)] bg-[var(--blaze)]/10 rounded-full px-4 py-1.5 mb-5">
            Disclaimers
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight">
            Read this <span className="grad-text">before you pay</span>
          </h1>
          <p className="text-[var(--ink-2)] mt-3 text-sm">Last updated: September 23, 2026</p>
          <p className="text-[var(--ink-2)] mt-4 leading-relaxed">
            FlexSpot.LOL ("FlexSpot", "we", "us", "our") is a public spotlight leaderboard at
            flexspot.lol, operated by Dawood Shah, Dubai, United Arab Emirates. This page sets out
            the important limitations of the service in plain language. It forms part of our
            <Link to="/terms" className="text-[var(--blaze)] hover:underline font-semibold"> Terms of Service</Link>.
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9">
          <Section title="1. Visibility and earnings disclaimer">
            <p>
              Paying for a spot on the FlexSpot leaderboard buys <strong className="text-[var(--ink)]">visibility
              placement only</strong> — a public position on the leaderboard and a public spot
              profile page for your brand. We make <strong className="text-[var(--ink)]">no guarantee</strong>
              of any traffic, page views, clicks, leads, sales, revenue, or earnings resulting from
              a paid spot. A high leaderboard position is determined transparently by total
              contributed amounts, but it is <strong className="text-[var(--ink)]">not an endorsement</strong>
              of the brand by FlexSpot, and it does not imply that the brand is vetted, verified,
              or recommended by us.
            </p>
            <p>
              FlexSpot sells public exposure on a leaderboard. It is not an investment product,
              not an advertising network with guaranteed impressions, and not financial advice of
              any kind.
            </p>
          </Section>

          <Section title="2. Referral rewards disclaimer">
            <p>
              Referral credits earned through personal referral links are <strong className="text-[var(--ink)]">promotional
              ledger entries only</strong>. They increase a spot's visible total on the leaderboard
              and currently have <strong className="text-[var(--ink)]">no cash value</strong>: they
              cannot be redeemed, transferred, converted, or withdrawn. A user login, wallet, and
              withdrawal feature is planned for a future phase of the service but is
              <strong className="text-[var(--ink)]"> not yet available</strong>. Nothing on this site
              should be read as a promise that referral credits will ever acquire monetary value or
              become withdrawable.
            </p>
          </Section>

          <Section title="3. Crypto and payment disclaimer">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Payments are made <strong className="text-[var(--ink)]">manually in USDT</strong> to wallet addresses displayed on our claim page for the network you select (BSC, Solana, or Tron).</li>
              <li>Always <strong className="text-[var(--ink)]">verify the wallet address and network</strong> before sending. Cryptocurrency transactions are <strong className="text-[var(--ink)]">irreversible</strong> once confirmed on-chain — we cannot reverse or recover funds sent to the wrong address or network.</li>
              <li>We will never ask for your private keys, seed phrases, or wallet passwords. Anyone asking for them is not us.</li>
              <li>All claims and boosts require manual review and <strong className="text-[var(--ink)]">admin approval</strong> before going live; verification times may vary.</li>
            </ul>
          </Section>

          <Section title="4. Demo and preview data disclaimer">
            <p>
              FlexSpot currently runs in <strong className="text-[var(--ink)]">preview/demo mode</strong>.
              Some leaderboard listings may be <strong className="text-[var(--ink)]">illustrative demo
              or preview entries</strong> used to demonstrate how the service works. Demo entries
              represent no real brand, no real payment, and no endorsement. Rankings, amounts, and
              activity shown during preview mode are illustrative and do not reflect live
              competition results. Demo entries will be cleared when the live competition opens.
            </p>
          </Section>

          <Section title='5. General "as is" disclaimer'>
            <p>
              The FlexSpot service is provided <strong className="text-[var(--ink)]">"as is" and "as
              available"</strong>, without warranties of any kind, express or implied. While we aim
              for high uptime, fair rankings, and accurate counters, we cannot guarantee
              uninterrupted availability, error-free operation, or the accuracy of displayed data
              at all times. Use of the service is at your own risk. For the full limitation of our
              liability, see section 12 of our <Link to="/terms" className="text-[var(--blaze)] hover:underline font-semibold">Terms of Service</Link>.
            </p>
          </Section>

          <Section title="6. Contact">
            <p>
              Questions about these disclaimers? Contact the site operator — Dawood Shah, Dubai,
              UAE — via the Contact link in the footer of this site.
            </p>
          </Section>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/terms" className="btn-ghost px-6 py-3 text-center text-sm">Read the Terms of Service</Link>
          <Link to="/privacy" className="btn-ghost px-6 py-3 text-center text-sm">Read the Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
