import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="pt-[92px]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--blaze)] bg-[var(--blaze)]/10 rounded-full px-4 py-1.5 mb-5">
            ✉️ Contact
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--ink)] tracking-tight">
            Get in <span className="grad-text">touch</span>
          </h1>
          <p className="text-[var(--ink-2)] mt-4 leading-relaxed">
            Questions about your spot, a payment, the referral program, or anything else —
            email us and we'll get back to you. We read every message.
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-9 space-y-6">
          <div>
            <h2 className="font-display font-bold text-lg text-[var(--ink)] mb-2">📧 Email</h2>
            <p className="text-[var(--ink-2)] text-[15px] leading-relaxed mb-3">
              For support, billing, and general questions:
            </p>
            <a
              href="mailto:support@flexspot.lol"
              className="inline-flex items-center gap-2 font-bold text-[var(--blaze)] hover:underline text-lg"
            >
              support@flexspot.lol
            </a>
            <p className="text-[var(--ink-2)] text-sm mt-3 leading-relaxed">
              Tip: if your question is about claiming or boosting, the{' '}
              <Link to="/faq" className="text-[var(--blaze)] hover:underline font-semibold">FAQ</Link> usually
              has the answer right away.
            </p>
          </div>

          <div className="border-t border-[var(--line)] pt-6">
            <h2 className="font-display font-bold text-lg text-[var(--ink)] mb-2">🐦 Social</h2>
            <p className="text-[var(--ink-2)] text-[15px] leading-relaxed">
              Follow and DM us on X:{' '}
              <a
                href="https://x.com/flexspotlol"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--blaze)] hover:underline"
              >
                @flexspotlol
              </a>
            </p>
          </div>

          <div className="border-t border-[var(--line)] pt-6">
            <h2 className="font-display font-bold text-lg text-[var(--ink)] mb-2">🏢 Operator</h2>
            <p className="text-[var(--ink-2)] text-[15px] leading-relaxed">
              FlexSpot.LOL is operated by Dawood Shah, Dubai, United Arab Emirates.
              Learn more on the <Link to="/about" className="text-[var(--blaze)] hover:underline font-semibold">About page</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
