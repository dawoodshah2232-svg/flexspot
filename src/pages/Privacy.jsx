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

export default function Privacy() {
  return (
    <div className="pt-[92px]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--blaze)] bg-[var(--blaze)]/10 rounded-full px-4 py-1.5 mb-5">
            🔒 Privacy Policy
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight">
            Your data, <span className="grad-text">our promise</span>
          </h1>
          <p className="text-[var(--ink-2)] mt-3 text-sm">Last updated: September 2026</p>
          <p className="text-[var(--ink-2)] mt-4 leading-relaxed">
            FlexSpot.LOL ("FlexSpot", "we", "us") is the internet's live spotlight competition.
            This page explains what information we collect when you claim a spot on the leaderboard,
            how we use it, and the choices you have. Short version: we collect only what the
            competition needs to run, we show most of it publicly by design, and we never sell it.
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9">
          <Section title="1. What we collect">
            <p>When you claim a leaderboard spot or boost one, we ask for:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Brand / display name, tagline and description</strong> — shown publicly on the leaderboard and your spot profile.</li>
              <li><strong className="text-[var(--ink)]">Links</strong> — your website and optional social profiles (X, Instagram, Facebook, LinkedIn), shown publicly.</li>
              <li><strong className="text-[var(--ink)]">Logo / profile image</strong> — optional, shown publicly.</li>
              <li><strong className="text-[var(--ink)]">Payment screenshot</strong> — required, so our team can manually verify your USDT payment. Kept private, never displayed publicly.</li>
              <li><strong className="text-[var(--ink)]">Transaction ID (TxID)</strong> — optional, used only to help us verify a payment. Kept private.</li>
              <li><strong className="text-[var(--ink)]">Email address</strong> — optional, used only to contact you about your spot (e.g. approval status). Never displayed publicly.</li>
              <li><strong className="text-[var(--ink)]">Referral information</strong> — which referral code you used, if any, so we can credit rewards correctly.</li>
            </ul>
            <p>
              We also collect basic anonymous technical data (such as page views on your spot)
              so the leaderboard can show live counters and trends.
            </p>
          </Section>

          <Section title="2. How we use it">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To <strong className="text-[var(--ink)]">display your brand</strong> on the public leaderboard and your public spot profile page.</li>
              <li>To <strong className="text-[var(--ink)]">verify payments</strong> manually via your uploaded screenshot and optional TxID.</li>
              <li>To <strong className="text-[var(--ink)]">contact you</strong> about approvals, disputes, or important service changes (only if you gave us an email).</li>
              <li>To <strong className="text-[var(--ink)]">detect abuse</strong> — fake payment proofs, spam, or impersonation.</li>
              <li>To <strong className="text-[var(--ink)]">improve the service</strong> using aggregated, anonymous statistics.</li>
            </ul>
            <p>
              We do <strong className="text-[var(--ink)]">not</strong> sell, rent, or trade your personal
              information to anyone, ever. We don't run behavioral ad tracking on this site.
            </p>
          </Section>

          <Section title="3. Preview mode & local storage">
            <p>
              While the site runs in preview/demo mode, some features store small amounts of data
              locally in your own browser (local storage) — for example remembering your theme
              preference or draft details. This data stays on your device and is never sent to us.
              Clearing your browser data removes it.
            </p>
          </Section>

          <Section title="4. How long we keep it">
            <p>
              Public spot information (brand name, links, amounts) is kept as long as your spot
              remains on the leaderboard, since the leaderboard is the product. Payment screenshots
              and TxIDs are kept only as long as needed for verification and dispute handling.
              If you'd like your spot removed or your private details deleted, contact us using
              the details below and we will handle it promptly.
            </p>
          </Section>

          <Section title="5. Your choices">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Email and logo uploads are <strong className="text-[var(--ink)]">optional</strong> — claim a spot without them.</li>
              <li>Only share brand information you are comfortable showing publicly — the leaderboard is a public page by design.</li>
              <li>Request correction or deletion of your private details (payment proof, email) at any time.</li>
            </ul>
          </Section>

          <Section title="6. Minors">
            <p>
              Payments on FlexSpot require you to be <strong className="text-[var(--ink)]">18 or older</strong>,
              or to have a parent/guardian's consent. We don't knowingly collect payment-related data
              from children under 13; if we learn we have, we will delete it.
            </p>
          </Section>

          <Section title="7. Contact us">
            <p>
              Questions about this policy or your data? Reach out via the contact details on our
              site or through our social channels listed in the footer. We'll respond as quickly as we can.
            </p>
          </Section>

          <Section title="8. Changes to this policy">
            <p>
              If we change this policy, we'll update the "Last updated" date above and, for significant
              changes, highlight them on the site. Continued use of FlexSpot after changes take effect
              means you accept the updated policy.
            </p>
          </Section>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/terms" className="btn-ghost px-6 py-3 text-center text-sm">Read the Terms of Service</Link>
          <Link to="/claim" className="btn-primary px-6 py-3 text-center text-sm">⚡ Claim Your Spot</Link>
        </div>
      </div>
    </div>
  );
}
