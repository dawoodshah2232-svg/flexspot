// GEO point 3: borrow trust by quoting recognized experts.
// Every quote here is a widely documented, verifiable public statement
// with plain attribution \u2014 no invented endorsements, ever.
const QUOTES = [
  {
    text: 'Content marketing is the only marketing left.',
    by: 'Seth Godin',
    role: 'Author of Purple Cow',
  },
  {
    text: 'Marketing is no longer about the stuff that you make, but about the stories you tell.',
    by: 'Seth Godin',
    role: 'Author of Purple Cow',
  },
  {
    text: 'On the average, five times as many people read the headline as read the body copy.',
    by: 'David Ogilvy',
    role: 'Founder of Ogilvy & Mather',
  },
];

export default function ExpertVoices() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-snow tracking-tight text-center mb-2">
        Don\u2019t take our word for it
      </h2>
      <p className="text-mist text-sm text-center mb-8">
        The people who literally wrote the book on attention agree on one thing:
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {QUOTES.map((q) => (
          <figure key={q.text} className="rounded-3xl bg-card border border-line/5 p-6 flex flex-col">
            <blockquote className="text-snow text-[15px] leading-relaxed flex-1">
              \u201C{q.text}\u201D
            </blockquote>
            <figcaption className="mt-4 pt-4 border-t border-line/5">
              <p className="text-snow font-bold text-sm">{q.by}</p>
              <p className="text-mist text-xs mt-0.5">{q.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
