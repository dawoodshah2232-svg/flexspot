import { useEffect, useRef, useState } from 'react';

export default function CountUp({ to, duration = 1200, format = (n) => Math.round(n).toLocaleString() }) {
  const [val, setVal] = useState(0);
  const raf = useRef();

  useEffect(() => {
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [to, duration]);

  return <span>{format(val)}</span>;
}
