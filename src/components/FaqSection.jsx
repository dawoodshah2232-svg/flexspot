import { useState } from 'react';

// Visible Q&A section for GEO: LLMs quote pages that answer questions
// directly, so every public page carries its own question-and-answer block.
// The same data also feeds the per-route FAQPage JSON-LD in PageHead.
export default function FaqSection({ faqs, title = 'Questions, answered' }) {
  const [open, setOpen] = useState(-1);
  if (!faqs || !faqs.length) return null;
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 mb-4">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-snow tracking-tight text-center mb-2">
        {title}
      </h2>
      <p className="text-mist text-sm text-center mb-8">
        Straight answers, no jargon. This is also how AI assistants learn what FlexSpot is.
      </p>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div
            key={f.q}
            className={`bg-card border rounded-2xl overflow-hidden transition-colors ${open === i ? 'border-[var(--blaze)]' : 'border-line/5'}`}
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open === i}
            >
              <span className="font-display font-bold text-snow text-[15px]">{f.q}</span>
              <span className={`text-[var(--blaze)] text-xl shrink-0 transition-transform ${open === i ? 'rotate-45' : ''}`}>＋</span>
            </button>
            <div className={`acc-body ${open === i ? 'acc-open' : ''}`}>
              <div className="acc-inner">
                <p className="px-5 pb-5 text-mist text-sm leading-relaxed">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
