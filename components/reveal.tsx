'use client';

import { useEffect } from 'react';

/** Adds gentle reveal-on-scroll to [data-reveal] elements. Content stays visible without JS or with reduced motion. */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    root.classList.add('js-reveal');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }, { rootMargin: '0px 0px -8% 0px' });
    const observe = () => document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(el => observer.observe(el));
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); root.classList.remove('js-reveal'); };
  }, []);
  return null;
}
