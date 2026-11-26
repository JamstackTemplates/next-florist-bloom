'use client';

import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { closures } from '../content/delivery';
import { site } from '../lib/site';
import { studioLabel } from '../lib/studio-hours';

/** Open-now label. Neutral static output; the browser refreshes it every minute in the studio's zone. */
export function StudioStatus({ className = '' }: { className?: string }) {
  const [label, setLabel] = useState('See studio hours');
  useEffect(() => {
    const update = () => setLabel(studioLabel(business.hours, closures, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);
  const open = label.startsWith('Open');
  return <span className={`inline-flex items-center gap-2 rounded-full border border-current px-3 py-1 text-sm font-semibold ${className}`}>
    <span aria-hidden="true" className={`size-2.5 rounded-full ${open ? 'bg-[#6FAF4E]' : 'bg-current opacity-50'}`} />
    {label}
  </span>;
}
