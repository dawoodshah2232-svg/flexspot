import { useState } from 'react';
import { shareLinks, copyText } from '../lib/format';

export default function ShareButtons({ spot, compact = false, refCode = null }) {
  const [copied, setCopied] = useState(false);
  const origin = window.location.origin;
  const links = shareLinks(spot, origin, refCode);

  const doCopy = async () => {
    const ok = await copyText(links.url);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1800); }
  };

  const btn = 'flex items-center justify-center gap-2 rounded-xl font-semibold transition-all hover:-translate-y-0.5 text-sm';
  const size = compact ? 'px-3 py-2' : 'px-4 py-2.5';

  return (
    <div className={`flex flex-wrap gap-2 ${compact ? '' : ''}`}>
      <a href={links.facebook} target="_blank" rel="noopener noreferrer" className={`${btn} ${size} bg-[#1877F2]/15 text-[#5b9dff] border border-[#1877F2]/30 hover:bg-[#1877F2]/25`}>
        <span>📘</span> Facebook
      </a>
      <a href={links.x} target="_blank" rel="noopener noreferrer" className={`${btn} ${size} bg-line/10 text-snow border border-line/15 hover:bg-line/15`}>
        <span>𝕏</span> Post
      </a>
      <a href={links.telegram} target="_blank" rel="noopener noreferrer" className={`${btn} ${size} bg-[#229ED9]/15 text-[#5cc8f5] border border-[#229ED9]/30 hover:bg-[#229ED9]/25`}>
        <span>✈️</span> Telegram
      </a>
      <button onClick={doCopy} className={`${btn} ${size} ${copied ? 'bg-[var(--green-soft)] text-[var(--green)] border border-[var(--green)]' : 'bg-line/5 text-mist border border-line/10 hover:text-snow'}`}>
        {copied ? '✓ Copied!' : '🔗 Copy link'}
      </button>
    </div>
  );
}
