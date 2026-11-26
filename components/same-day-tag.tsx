'use client';

import { useEffect, useState } from 'react';
import { closures, cutOffs } from '../content/delivery';
import { formatClock } from '../lib/local-time';
import { sameDayCopy, sameDayStatus } from '../lib/same-day';
import { site } from '../lib/site';
import { SwingTag } from './swing-tag';

const weekday = cutOffs.find(c => c.day === 'Monday')?.time;
const saturday = cutOffs.find(c => c.day === 'Saturday')?.time;
/** Neutral copy for the static page and visitors without JavaScript. */
export const staticSameDay = {
  headline: 'Same-day delivery',
  detail: `Ask by ${weekday ? formatClock(weekday) : 'the cut-off'} weekdays${saturday ? `, ${formatClock(saturday)} Saturdays` : ''}.`,
};

/** The signature swing tag with today's same-day status, computed in the browser every minute. */
export function SameDayTag({ className = '', idle = false, twine }: { className?: string; idle?: boolean; twine?: number }) {
  const [copy, setCopy] = useState(staticSameDay);
  useEffect(() => {
    const update = () => {
      const status = sameDayStatus({ now: new Date(), timeZone: site.timeZone, cutOffs, closures });
      setCopy(status ? sameDayCopy(status) : staticSameDay);
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);
  return <SwingTag className={className} idle={idle} twine={twine}>
    <p className="specimen text-[.68rem] text-kraft-ink/80">Same-day · Melbourne time</p>
    <p className="font-hand mt-2 text-[clamp(1.2rem,3vw,1.45rem)] leading-[1.15]" aria-live="polite">{copy.headline}</p>
    <p className="mt-2 text-[.9rem] font-semibold leading-snug">{copy.detail}</p>
  </SwingTag>;
}
