// Human-first "why we built this" block. Plain team voice, zero invented
// claims — GEO point 2: AI models and people both trust original,
// experience-driven writing over generic marketing copy.
export default function FounderNote() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
      <div className="rounded-3xl bg-card border border-line/5 p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute -top-6 -left-2 text-[120px] leading-none text-[var(--blaze)] opacity-10 select-none font-display">{"\u201C"}</div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--blaze)] mb-4">Why we built FlexSpot</p>
        <div className="space-y-4 text-mist text-[15px] leading-relaxed">
          <p>
            Most advertising is a black box. You pay, you hope, and you never really
            see where the money went — just a dashboard full of numbers someone
            else controls.
          </p>
          <p>
            We wanted the opposite: attention you can actually watch. A public board.
            A live rank. Every dollar visible to everyone. Claim a spot for $1 and the
            whole internet can see you climb — or watch a rival steal your crown
            in real time.
          </p>
          <p>
            No ad account. No jargon. No minimum spend that only agencies can afford.
            Just you, your link, and a fair fight for the spotlight.
          </p>
        </div>
        <p className="mt-6 text-snow font-display font-bold text-sm">— The FlexSpot team</p>
      </div>
    </section>
  );
}
