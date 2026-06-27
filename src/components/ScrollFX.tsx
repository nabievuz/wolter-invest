'use client';

import { useEffect } from 'react';

// Adds the `.in` class to `.reveal` elements as they scroll into view.
// Mirrors the approved prototype's reveal animation, with a no-IO fallback.
export default function ScrollFX() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((e) => io.observe(e));
    const safety = setTimeout(() => els.forEach((e) => e.classList.add('in')), 4000);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return null;
}
