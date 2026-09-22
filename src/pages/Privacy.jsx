import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Section({ title, children }) {
  return (
    <section className="mb-9 scroll-mt-28" id={title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}>
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
          <p className="text-[var(--ink-2)] mt-3 text-sm">Effective date: September 1, 2026 · Last updated: September 2026</p>
          <p className="text-[var(--ink-2)] mt-4 leading-relaxed">
            FlexSpot.LOL ("FlexSpot", "we", "us", "our") operates the live spotlight leaderboard at
            flexspot.lol. This Privacy Policy explains what information we collect when you browse,
            claim a spot, boost a brand, or use referral links — how we use it, who we share it with,
            and the choices you have. Short version: we collect only what the competition needs to run,
            most of it is shown publicly by design, and we never sell your personal information.
          </p>
          <p className="text-[var(--ink-2)] mt-3 leading-relaxed">
            By using FlexSpot, you agree to the practices described here. If you do not agree, please
            do not use the service. This policy should be read together with our{' '}
            <Link to="/terms" className="text-[var(--blaze)] hover:underline font-semibold">Terms of Service</Link>.
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9">
          <Section title="1. Definitions">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">"Personal data"</strong> means information that identifies or can be reasonably linked to you as an individual (for example, your email address or a payment screenshot containing your wallet details).</li>
              <li><strong className="text-[var(--ink)]">"Public spot data"</strong> means brand name, tagline, description, website, social links, logo, contribution amounts, and referral supporter names that you choose to publish on the public leaderboard.</li>
              <li><strong className="text-[var(--ink)]">"Service"</strong> means the FlexSpot.LOL website, leaderboard, claim and boost flows, referral program, and admin review systems.</li>
            </ul>
          </Section>

          <Section title="2. Data we collect">
            <p>We collect the following categories of information:</p>
            <p><strong className="text-[var(--ink)]">A. Information you give us directly</strong></p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Brand / display name, tagline, and description</strong> — shown publicly on the leaderboard and your spot profile page.</li>
              <li><strong className="text-[var(--ink)]">Website and social links</strong> (X, Instagram, Facebook, LinkedIn) — shown publicly.</li>
              <li><strong className="text-[var(--ink)]">Logo / profile image</strong> — optional, shown publicly.</li>
              <li><strong className="text-[var(--ink)]">Email address</strong> — optional; used only to contact you about your spot (approval status, disputes, important service notices). Never displayed publicly.</li>
              <li><strong className="text-[var(--ink)]">Payment screenshot</strong> — required to manually verify your USDT payment. Kept private and never displayed publicly.</li>
              <li><strong className="text-[var(--ink)]">Transaction ID (TxID)</strong> — optional; used only to help verify a payment. Kept private.</li>
              <li><strong className="text-[var(--ink)]">Referral information</strong> — which referral code brought a visitor, and the display name you enter to create a personal referral link. Supporter names are shown publicly on spot profiles and referral boards.</li>
              <li><strong className="text-[var(--ink)]">Contributor name / handle</strong> — when you boost a brand, the name you enter is shown publicly on that brand's page (defaults to "Anonymous booster" if left blank).</li>
            </ul>
            <p><strong className="text-[var(--ink)]">B. Data collected automatically</strong></p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Usage data</strong> — page views on spots, leaderboard visits, and interaction counts, so the site can display live counters and trends. Collected in aggregated or pseudonymous form.</li>
              <li><strong className="text-[var(--ink)]">Device and browser information</strong> — such as browser type and approximate region, used for abuse prevention and to improve the service. We do not run behavioral advertising trackers.</li>
              <li><strong className="text-[var(--ink)]">Referral visit records</strong> — when someone visits through a referral link, we record the referral code and the time of visit so the $1-per-visit credit can be applied (limited to one credit per visitor per day).</li>
            </ul>
            <p><strong className="text-[var(--ink)]">C. Data stored in your browser (local storage)</strong></p>
            <p>
              The site stores small amounts of data locally in your own browser — for example theme
              preference, draft claim details, and referral-visit flags used to enforce the
              one-credit-per-day rule. This data stays on your device and is not transmitted to our
              servers; clearing your browser data removes it. We do not use third-party tracking
              cookies or cross-site advertising identifiers.
            </p>
          </Section>

          <Section title="3. Purpose and legal basis">
            <p>We process your information only for these purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Operating the competition</strong> — displaying your brand on the public leaderboard and spot profile pages (based on your agreement to the Terms when you submit).</li>
              <li><strong className="text-[var(--ink)]">Verifying payments</strong> — reviewing uploaded screenshots and TxIDs to confirm genuine USDT transfers (necessary to provide the paid service).</li>
              <li><strong className="text-[var(--ink)]">Communication</strong> — contacting you about approvals, disputes, or important service changes, only if you provided an email (your consent; you may withdraw it by asking us to delete it).</li>
              <li><strong className="text-[var(--ink)]">Referral rewards</strong> — crediting the correct spot and referrer for referral-driven visits (based on your agreement to the referral program terms).</li>
              <li><strong className="text-[var(--ink)]">Fraud and abuse prevention</strong> — detecting fake payment proofs, spam, impersonation, and referral farming (our legitimate interest in keeping the competition fair).</li>
              <li><strong className="text-[var(--ink)]">Improvement and analytics</strong> — using aggregated, anonymous statistics to improve the service (our legitimate interest; no individual profiling).</li>
            </ul>
            <p>
              We will never use your personal data for purposes materially different from those above
              without first telling you and, where required, obtaining your consent.
            </p>
          </Section>

          <Section title="4. What is public by design">
            <p>
              FlexSpot is a public leaderboard. Anything you enter as brand name, tagline, description,
              website, social links, logo, contribution amount, referral supporter name, or boost
              contributor name is <strong className="text-[var(--ink)]">published publicly</strong> on the
              leaderboard and spot profile pages, and may be indexed by search engines. Email addresses,
              payment screenshots, and transaction IDs are <strong className="text-[var(--ink)]">never
              published</strong> and are visible only to our review team. Only share brand information you
              are comfortable showing to the whole internet.
            </p>
          </Section>

          <Section title="5. Third parties and data sharing">
            <p>We do not sell, rent, or trade your personal information. We share data only as follows:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Supabase (database hosting)</strong> — when the service runs on live infrastructure, your submissions and account records are stored on Supabase-hosted databases. Supabase processes this data only on our instructions as a service provider.</li>
              <li><strong className="text-[var(--ink)]">Blockchain networks</strong> — USDT payments are verified against public blockchain records (BNB Smart Chain, Solana, Tron). Transaction details on public blockchains are inherently public; we cannot control or delete them.</li>
              <li><strong className="text-[var(--ink)]">Legal compliance</strong> — we may disclose information if required by law, court order, or to protect against fraud, abuse, or harm to others.</li>
              <li><strong className="text-[var(--ink)]">Business transfer</strong> — if FlexSpot is acquired or merged, user data may transfer to the new operator, who will be bound by this policy or a materially equivalent one.</li>
            </ul>
            <p>
              We do not currently share data with advertising networks or data brokers, and we do not
              use third-party analytics that build cross-site profiles of you.
            </p>
          </Section>

          <Section title="6. Data retention">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Public spot data</strong> (brand name, links, amounts, referral supporter names) is kept as long as your spot remains on the leaderboard — the public leaderboard is the product you purchased.</li>
              <li><strong className="text-[var(--ink)]">Payment screenshots and transaction IDs</strong> are kept for up to 24 months after your submission, for verification and dispute handling, then deleted.</li>
              <li><strong className="text-[var(--ink)]">Email addresses</strong> are kept until you ask us to delete them or your spot is removed.</li>
              <li><strong className="text-[var(--ink)]">Rejected submissions</strong> and their payment proofs are deleted within 90 days of rejection, unless a dispute is open.</li>
              <li><strong className="text-[var(--ink)]">Aggregated analytics</strong> contain no personal identifiers and may be retained indefinitely.</li>
            </ul>
            <p>
              If you would like your spot removed from the leaderboard or your private details deleted,
              contact us (see section 9). Removal from the public leaderboard takes effect promptly;
              please note that cached copies and search-engine indexes may take time to update.
            </p>
          </Section>

          <Section title="7. Data security">
            <p>
              We protect your information with reasonable technical and organizational measures:
              encrypted connections (HTTPS) for all traffic, access-limited review dashboards for
              payment proofs, and strict separation between public spot data and private verification
              data. No method of transmission or storage is completely secure, so we cannot guarantee
              absolute security — but we treat your payment proofs and contact details as confidential
              and limit access to the small team that performs verification.
            </p>
          </Section>

          <Section title="8. Your rights">
            <p>You have the following rights over your personal data. To exercise any of them, contact us (section 9):</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Access</strong> — ask for a copy of the personal data we hold about you.</li>
              <li><strong className="text-[var(--ink)]">Correction</strong> — ask us to fix inaccurate or incomplete information (for example, a wrong link on your spot).</li>
              <li><strong className="text-[var(--ink)]">Deletion</strong> — ask us to delete your private details (email, payment proof, TxID) or remove your spot from the leaderboard.</li>
              <li><strong className="text-[var(--ink)]">Restriction and objection</strong> — ask us to limit or stop certain processing, such as promotional contact.</li>
              <li><strong className="text-[var(--ink)]">Portability</strong> — receive your submitted data in a commonly used format.</li>
            </ul>
            <p>
              We will respond to requests within 30 days. Where the data you ask to delete is public
              spot data tied to a paid placement, deletion removes the spot from the leaderboard; it
              does not entitle you to a refund (see the Terms of Service, section 4).
            </p>
          </Section>

          <Section title="9. Contact us">
            <p>
              For privacy questions, data requests, or complaints, contact us at{' '}
              <a href="mailto:support@flexspot.lol" className="text-[var(--blaze)] hover:underline font-semibold">support@flexspot.lol</a>{' '}
              with the subject line "Privacy". We aim to respond within 7 business days. If you are not
              satisfied with our response, you may contact your local data protection authority.
            </p>
          </Section>

          <Section title="10. Minors">
            <p>
              FlexSpot is not directed at children under 13, and payments require you to be 18 or older
              (or to have a parent/guardian's consent). We do not knowingly collect personal data from
              children under 13. If we learn that we have collected such data, we will delete it promptly.
              If you believe a child has provided us with personal data, contact us at{' '}
              <a href="mailto:support@flexspot.lol" className="text-[var(--blaze)] hover:underline font-semibold">support@flexspot.lol</a>.
            </p>
          </Section>

          <Section title="11. International transfers">
            <p>
              FlexSpot is operated from the United Arab Emirates. Your data may be stored or processed
              in the UAE or in the regions where our infrastructure providers (such as Supabase) host
              data. By using the service, you consent to this transfer. Where required, we apply
              appropriate safeguards for cross-border transfers.
            </p>
          </Section>

          <Section title="12. Changes to this policy">
            <p>
              We may update this policy as FlexSpot evolves. We will update the "Last updated" date
              above and, for material changes, highlight them on the site (for example, a notice on
              the homepage or claim page) before they take effect. Continued use of FlexSpot after
              changes take effect means you accept the updated policy.
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
