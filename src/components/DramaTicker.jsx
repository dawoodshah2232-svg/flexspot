import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Rotating viral one-liners — internet-culture drama that makes people share.
export const DRAMA_LINES = [
  '👑 Who will steal the crown?',
  '⚔️ Someone just entered the battlefield.',
  '😬 Your competitor just moved above you.',
  '💸 Only $1 away from beating #25.',
  '✨ Your spot is waiting.',
  '🔥 The board never sleeps.',
];

export default function DramaTicker({ lines = DRAMA_LINES, interval = 4200, className = '' }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % lines.length), interval);
    return () => clearInterval(t);
  }, [lines.length, interval]);
  return (
    <div className={`flex items-center gap-2.5 text-sm min-h-[24px] max-w-full overflow-hidden ${className}`}>
      <span className="live-dot shrink-0" />
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="font-semibold text-snow/90 min-w-0 flex-1 truncate"
        >
          {lines[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
