import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FAQS } from '../lib/data';

function Item({ f, open, onToggle }) {
  return (
    <div className={`bg-card border rounded-2xl overflow-hidden transition-colors ${open ? 'border-[var(--blaze)]' : 'border-line/5'}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-display font-bold text-snow text-[15px]">{f.q}</span>
        <span className={`text-[var(--blaze)] text-xl shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}>＋</span>
      </button>
      <div className={`acc-body ${open ? 'acc-open' : ''}`}>
        <div className="acc-inner"><p className="px-5 pb-5 text-mist text-sm leading-relaxed">{f.a}</p></div>
      </div>
    </div>
  );
}

export default function FAQ({ onClaim }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="pt-[92px]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-snow tracking-tight text-center">Frequently asked <span className="grad-text">questions</span></h1>
        <p className="text-mist text-center mt-3 mb-10">Everything you need to know before you claim the spotlight.</p>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Item key={f.q} f={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-card border border-line/5 p-8 text-center">
          <h2 className="font-display font-bold text-2xl text-snow">Still have questions?</h2>
          <p className="text-mist text-sm mt-2 mb-5">Or are you ready to stop reading and start climbing?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onClaim} className="btn-primary px-8 py-3.5">⚡ Claim My Spot — $1</button>
            <Link to="/leaderboard" className="btn-ghost px-8 py-3.5 text-center">See the leaderboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
