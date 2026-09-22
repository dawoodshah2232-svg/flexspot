import { useEffect, useState } from 'react';
import { breakOutOfFrames, isOfficialHost } from '../lib/security';

/**
 * Site-wide guard, mounted once in App:
 *  - breaks out of attacker iframes on load
 *  - on any unofficial domain shows a persistent anti-phishing banner
 */
export default function SecurityGuard() {
  const [unofficial, setUnofficial] = useState(false);

  useEffect(() => {
    breakOutOfFrames();
    setUnofficial(!isOfficialHost());
  }, []);

  if (!unofficial) return null;

  return (
    <div
      role="alert"
      className="fixed top-0 inset-x-0 z-[100] bg-red-600 text-white text-center px-4 py-2.5 text-[13px] font-bold shadow-lg"
    >
      ⚠️ This looks like a <u>copy</u> of FlexSpot, not the official site. Never send crypto here —
      the real site is only <b>flexspot.lol</b>. Payments on copies go to scammers.
    </div>
  );
}

/** Hook for pages (Claim) to disable sensitive actions on cloned copies. */
export function useUnofficialHost() {
  const [unofficial, setUnofficial] = useState(false);
  useEffect(() => { setUnofficial(!isOfficialHost()); }, []);
  return unofficial;
}
