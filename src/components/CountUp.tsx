'use client';

import { useEffect, useRef, useState } from 'react';

export default function CountUp({
  end,
  duration = 1200
}: {
  end: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVal(end);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            io.disconnect();
            let t0: number | null = null;
            const step = (ts: number) => {
              if (t0 === null) t0 = ts;
              const p = Math.min((ts - t0) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(end * eased));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{end >= 1000 ? val.toLocaleString('en-US') : val}</span>;
}
