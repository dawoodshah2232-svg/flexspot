import { useState } from 'react';
import { shareLinks, copyText } from '../lib/format';

export default function ShareButtons({ spot, compact = false }) {
  const [copied, setCopied] = useState(false);
  const origin = window.location.origin;
  const links = shareLinks(spot, origin);

  const doCopy = async () => {
    const ok = await copyText(links.url);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1800); }
  };

  const btn = 'flex items-center justify-center gap-2 rounded-xl font-semibold transition-all hover:-translate-y-0.5 text-sm';
  const size = compact ? 'px-3 py-2' : 'px-4 py-2.5';

  return (
    <div className={`flex flex-wrap gap-2 ${compact ? '' : ''}`}>
      <a href={links.whatsapp} target="_blank" rel="noopener" className={`${btn} ${size} bg-[#25D366]/15 text-[#3ddc74] border border-[#25D366]/30 hover:bg-[#25D366]/25`}>
        <span>💬</span> WhatsApp
      </a>
      <a href={links.facebook} target="_blank" rel="noopener" className={`${btn} ${size} bg-[#1877F2]/15 text-[#5b9dff] border border-[#1877F2]/30 hover:bg-[#1877F2]/25`}>
        <span>📘</span> Facebook
      </a>
      <a href={links.x} target="_blank" rel="noopener" className={`${btn} ${size} bg-white/10 text-snow border border-white/15 hover:bg-white/15`}>
        <span>𝕏</span> Post
      </a>
      <a href={links.telegram} target="_blank" rel="noopener" className={`${btn} ${size} bg-[#229ED9]/15 text-[#5cc8f5] border border-[#229ED9]/30 hover:bg-[#229ED9]/25`}>
        <span>✈️</span> Telegram
      </a>
      <button onClick={doCopy} className={`${btn} ${size} ${copied ? 'bg-neon/20 text-neon border border-neon/40' : 'bg-white/5 text-mist border border-white/10 hover:text-snow'}`}>
        {copied ? '✓ Copied!' : '🔗 Copy link'}
      </button>
    </div>
  );
}
