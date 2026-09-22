import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

function Section({ title, children, anchor }) {
  const id = anchor || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return (
    <section className="mb-9 scroll-mt-28" id={id}>
      <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)] tracking-tight mb-3">{title}</h2>
      <div className="text-[var(--ink-2)] text-[15px] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function Terms() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    }
  }, [hash]);
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
          <p className="text-[var(--ink-2)] mt-3 text-sm">Effective date: September 1, 2026 · Last updated: September 2026</p>
          <p className="text-[var(--ink-2)] mt-4 leading-relaxed">
            These Terms of Service ("Terms") form a legally binding agreement between you and the
            operator of FlexSpot.LOL ("FlexSpot", "we", "us", "our"). By browsing the site, claiming
            a spot, boosting a brand, using a referral link, or otherwise using the service, you
            agree to these Terms and to our{' '}
            <Link to="/privacy" className="text-[var(--blaze)] hover:underline font-semibold">Privacy Policy</Link>.
            If you do not agree, do not use FlexSpot.
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9">
          <Section title="1. What FlexSpot is">
            <p>
              FlexSpot is a public, internet-wide leaderboard competition. Users purchase public
              visibility placements ("spots") for brands, projects, or themselves. Spots are ranked
              on a live public leaderboard, and brands can be boosted with additional contributions
              to climb the rankings. A referral program credits spots for visits made through
              personal referral links.
            </p>
            <p>
              FlexSpot sells <strong className="text-[var(--ink)]">public exposure on a leaderboard</strong>.
              It is an entertainment and visibility service — not an investment product, not a
              securities offering, not a gambling service, and not financial advice. Nothing on this
              site constitutes an offer to invest, a promise of returns, or a recommendation to buy
              any asset.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>You must be <strong className="text-[var(--ink)]">18 years or older</strong>, or have the consent of a parent or legal guardian, to make a payment on FlexSpot. By paying, you represent that you meet this requirement.</li>
              <li>You must have the legal capacity to enter into a binding agreement in your jurisdiction.</li>
              <li>You are responsible for ensuring that using FlexSpot and sending cryptocurrency payments is lawful where you live. We do not offer the service where it is prohibited by law.</li>
              <li>No account registration is required to claim a spot; submissions are tied to the brand details and payment proof you provide.</li>
            </ul>
          </Section>

          <Section title="3. Claiming a spot and boost purchases">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Minimum $1</strong> to claim a spot or boost a brand. Any amount from $1 up is accepted, to two decimal places.</li>
              <li>Payments are made in <strong className="text-[var(--ink)]">USDT (Tether)</strong> only, sent manually by you to the wallet address shown for the network you choose (BNB Smart Chain / BEP20, Solana, or Tron / TRC20).</li>
              <li>To complete a submission you must upload a <strong className="text-[var(--ink)]">screenshot of the completed payment</strong> (required). A transaction ID (TxID) is optional but helps us verify faster.</li>
              <li>Every claim and boost is reviewed by our team before it takes effect — <strong className="text-[var(--ink)]">admin approval is required</strong>. New spots show as "Pending Approval" until verified; boost amounts land on the board only after verification.</li>
              <li>The amount you select is the total you pay — <strong className="text-[var(--ink)]">we add no fees</strong>. (Your wallet or the blockchain network may charge its own transfer fees; those are between you and your provider.)</li>
              <li>We may reject any submission that fails verification, violates these Terms, or appears fraudulent. Rejected submissions are not published, and genuine but unverifiable payments are handled under section 4.</li>
            </ul>
          </Section>

          <Section title="4. USDT payment terms and refunds">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">All sales are final.</strong> Once your spot or boost has been approved and published on the leaderboard, the payment is <strong className="text-[var(--ink)]">non-refundable</strong> — the public exposure you purchased begins immediately upon publication.</li>
              <li><strong className="text-[var(--ink)]">You are responsible for the transfer.</strong> Cryptocurrency transfers are irreversible. You must send USDT on the correct network to the exact address shown. We are not responsible for funds sent to the wrong address, on the wrong network, in the wrong token, or in the wrong amount.</li>
              <li><strong className="text-[var(--ink)]">Rejected claims.</strong> If your submission is rejected during review (for example, invalid or unverifiable proof), we will first work with you to resolve it. For verified genuine payments that cannot be approved, we will arrange a refund of the received amount to a wallet address you provide, minus any network transfer fees. Refunds, where offered, are at our sole discretion and processed in USDT.</li>
              <li><strong className="text-[var(--ink)]">Duplicate or overpaid transfers</strong> may be credited as a boost to the same spot or refunded at our discretion; contact us promptly at <a href="mailto:support@flexspot.lol" className="text-[var(--blaze)] hover:underline font-semibold">support@flexspot.lol</a>.</li>
              <li><strong className="text-[var(--ink)]">Fraudulent payments</strong> (fake, reused, or manipulated proofs) are never refunded and result in a permanent ban under section 6.</li>
            </ul>
          </Section>

          <Section title="5. Leaderboard ranking mechanics">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Rank is decided by total contribution amount, highest first.</strong> The spot with the highest verified total holds the #1 position.</li>
              <li><strong className="text-[var(--ink)]">Ties are broken by claim time</strong> — the spot that was claimed first ranks higher.</li>
              <li>Any increase in a spot's total — a boost, a referral credit, or a new contribution — immediately re-ranks the board. Rankings update as payments are verified.</li>
              <li>View counts, leaderboard movement indicators, and activity feeds are engagement features; they <strong className="text-[var(--ink)]">do not determine rank</strong>. Rank follows verified contribution amounts only.</li>
              <li>Pending (unverified) submissions do not affect rankings until approved.</li>
            </ul>
          </Section>

          <Section title="6. Prohibited conduct">
            <p>You agree not to, and not to allow others to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Submit <strong className="text-[var(--ink)]">fake, forged, reused, or manipulated payment proofs</strong> — this leads to rejection and a permanent ban.</li>
              <li>Impersonate another brand, person, or entity, or submit logos, names, or content you do not have the right to use.</li>
              <li>Submit content that is illegal, defamatory, hateful, sexually explicit involving minors, or that promotes violence or wrongdoing.</li>
              <li>Use bots, scripts, click farms, fake views, or any automated means to inflate counters, referral credits, or activity feeds.</li>
              <li>Farm referral credits through self-visits, VPN/proxy rotation, or other artificial traffic — credits earned this way will be reversed and accounts banned.</li>
              <li>Attempt to access the admin dashboard or other users' data, interfere with the site's operation, or probe its security.</li>
              <li>Use the service for money laundering, sanctions evasion, or any other unlawful purpose.</li>
            </ul>
            <p>
              We may, at our sole discretion and without prior notice, edit, demote, suspend, or
              permanently remove any spot or submission that violates these Terms, and ban the
              responsible party from future participation. No refunds are owed for removals caused
              by violations.
            </p>
          </Section>

          <Section title="7. Your content — rights and license">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>You retain ownership of the brand materials you submit (names, taglines, descriptions, logos, links).</li>
              <li>By submitting content to FlexSpot, you grant us a <strong className="text-[var(--ink)]">worldwide, non-exclusive, royalty-free license</strong> to display, reproduce, and distribute that content on the leaderboard, spot profile pages, social channels, and marketing materials for the service, for as long as your spot is active.</li>
              <li>You represent and warrant that you own or have the rights to everything you submit, and that it does not infringe any third party's intellectual property, privacy, or other rights.</li>
              <li>If you believe content on FlexSpot infringes your rights, contact us at <a href="mailto:support@flexspot.lol" className="text-[var(--blaze)] hover:underline font-semibold">support@flexspot.lol</a> with details, and we will review it promptly.</li>
            </ul>
          </Section>

          <Section title="8. Referral program terms">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Each spot can generate personal referral links. Every genuine visit through a referral link credits <strong className="text-[var(--ink)]">$1</strong> to that spot's total contribution amount.</li>
              <li>Credits are limited to <strong className="text-[var(--ink)]">one per visitor per day</strong> per spot. Repeat visits from the same visitor within the same day do not earn additional credits.</li>
              <li>Only genuine human visits count. Self-referrals, bot traffic, incentivized click schemes, and other artificial visits are fraud: credits will be reversed and the spot may be removed under section 6.</li>
              <li>Referral credits increase a spot's total and therefore its rank, exactly like paid boosts.</li>
              <li>The referral reward amount, crediting rules, and program availability may be adjusted as the program evolves. Material changes will be announced on the site before they take effect and will apply going forward, not retroactively to already-credited visits.</li>
              <li>Referral earnings shown on the site are informational records of credits applied to spots; they are not a currency, not withdrawable unless a future wallet feature is launched, and have no cash value outside the competition.</li>
            </ul>
          </Section>

          <Section title="9. Admin approval and the admin dashboard">
            <p>
              All claims and boosts require manual review before going live. We aim to review
              submissions within 24 hours but make no guarantee of review times. The admin dashboard
              is protected by PIN authentication and is for the FlexSpot operations team only;
              unauthorized access attempts are prohibited and may be reported.
            </p>
          </Section>

          <Section title="10. Service availability — no SLA">
            <p>
              We work hard to keep FlexSpot fast and available, but the service is provided on an
              <strong className="text-[var(--ink)]"> "as is" and "as available"</strong> basis. We do not
              guarantee uninterrupted, error-free, or secure operation, and we offer no service-level
              agreement (SLA). We may perform maintenance, modify features, or suspend the service
              temporarily at any time, with or without notice. Rankings, counters, and displayed
              figures are computed from our records; in the event of a technical error, our
              corrected records prevail.
            </p>
          </Section>

          <Section title="11. Disclaimers" anchor="disclaimers">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Preview / demo data.</strong> While the site operates in preview mode, the leaderboard may include illustrative demo entries used to demonstrate how FlexSpot works. Demo entries are labelled as such, represent no real payment or endorsement, and will be cleared when the live competition opens.</li>
              <li><strong className="text-[var(--ink)]">Cryptocurrency risk.</strong> USDT is a digital asset whose value can fluctuate and whose transfers are irreversible. Blockchain networks can experience delays, congestion, or failures outside our control. You are solely responsible for entering the correct wallet address and network; lost or misdirected transfers cannot be recovered by us.</li>
              <li><strong className="text-[var(--ink)]">No guarantees.</strong> We make no promise, guarantee, or representation regarding the amount of traffic, views, clicks, sales, leads, or any other outcome your spot will receive. Rankings reflect contribution amounts, not commercial performance. Nothing on FlexSpot is financial, investment, or legal advice.</li>
              <li><strong className="text-[var(--ink)]">Third-party brands.</strong> Brand names, logos, and trademarks appearing on the leaderboard belong to their respective owners. Their appearance does not imply endorsement of, or affiliation with, FlexSpot, and FlexSpot's display of user-submitted brand content does not imply our endorsement of those brands.</li>
              <li><strong className="text-[var(--ink)]">Not a regulated entity.</strong> FlexSpot is an entertainment and visibility service. We are not a bank, broker, exchange, investment adviser, or other regulated financial institution, and the service does not offer regulated financial products.</li>
            </ul>
          </Section>

          <Section title="12. Limitation of liability">
            <p>
              To the maximum extent permitted by applicable law, FlexSpot and its operators,
              officers, and team members will not be liable for any indirect, incidental, special,
              consequential, or punitive damages — including loss of profits, revenue, data, or
              goodwill — arising from your use of (or inability to use) the service, even if advised
              of the possibility of such damages.
            </p>
            <p>
              Our total aggregate liability for any claim arising out of or relating to these Terms
              or the service will not exceed the <strong className="text-[var(--ink)]">total amount you
              paid to FlexSpot in the 12 months</strong> preceding the claim, or USD 100, whichever is
              greater. Some jurisdictions do not allow certain limitations; in those cases our
              liability is limited to the greatest extent permitted by law.
            </p>
          </Section>

          <Section title="13. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless FlexSpot and its operators, officers,
              and team members from any claims, damages, losses, liabilities, and expenses (including
              reasonable legal fees) arising from: (a) your use of the service; (b) your violation of
              these Terms; (c) content you submit, including any claim that it infringes third-party
              rights; or (d) your violation of any law or regulation.
            </p>
          </Section>

          <Section title="14. Termination">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>We may suspend or terminate your access to the service, and remove your spots, at any time for violation of these Terms, suspected fraud, or to comply with legal obligations — with or without notice.</li>
              <li>You may stop using FlexSpot at any time. You may request removal of your spot and deletion of your private data by contacting <a href="mailto:support@flexspot.lol" className="text-[var(--blaze)] hover:underline font-semibold">support@flexspot.lol</a>.</li>
              <li>Termination does not entitle you to a refund for published placements (see section 4). Sections 4, 6, 7, 11, 12, 13, 15, and 16 survive termination.</li>
            </ul>
          </Section>

          <Section title="15. Dispute resolution and governing law">
            <p>
              These Terms are governed by the <strong className="text-[var(--ink)]">laws of the United
              Arab Emirates</strong>. If a dispute arises, you agree to first contact us at{' '}
              <a href="mailto:support@flexspot.lol" className="text-[var(--blaze)] hover:underline font-semibold">support@flexspot.lol</a>{' '}
              and attempt to resolve it informally for 30 days. If the dispute is not resolved, it will
              be subject to the <strong className="text-[var(--ink)]">exclusive jurisdiction of the courts
              of Dubai, United Arab Emirates</strong>. You consent to that jurisdiction and waive any
              objection to venue.
            </p>
          </Section>

          <Section title="16. Changes to these terms">
            <p>
              We may update these Terms as FlexSpot grows. Material changes will be highlighted on the
              site (for example, a notice on the homepage) before they take effect, and the "Last
              updated" date above will always reflect the current version. Continued use of FlexSpot
              after changes take effect constitutes acceptance of the updated Terms. If you do not
              agree to updated Terms, you must stop using the service.
            </p>
          </Section>

          <Section title="17. General provisions">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-[var(--ink)]">Entire agreement.</strong> These Terms and the Privacy Policy constitute the entire agreement between you and FlexSpot regarding the service.</li>
              <li><strong className="text-[var(--ink)]">Severability.</strong> If any provision is found unenforceable, the remaining provisions continue in full force.</li>
              <li><strong className="text-[var(--ink)]">No waiver.</strong> Our failure to enforce any provision is not a waiver of our right to do so later.</li>
              <li><strong className="text-[var(--ink)]">Assignment.</strong> You may not assign your rights under these Terms; we may assign ours in connection with a merger, acquisition, or sale of assets.</li>
              <li><strong className="text-[var(--ink)]">Contact.</strong> Questions about these Terms: <a href="mailto:support@flexspot.lol" className="text-[var(--blaze)] hover:underline font-semibold">support@flexspot.lol</a>.</li>
            </ul>
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
