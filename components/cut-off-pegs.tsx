'use client';

import { useEffect, useState } from 'react';
import { cutOffs } from '../content/delivery';
import { formatClock, localMoment } from '../lib/local-time';
import { site } from '../lib/site';

/** Same-day cut-offs as kraft tags pegged on twine. Today's peg is highlighted in the browser only. */
export function CutOffPegs({ compact = false }: { compact?: boolean }) {
  const [today, setToday] = useState('');
  useEffect(() => {
    const update = () => setToday(localMoment(new Date(), site.timeZone)?.day.slice(0, 3) ?? '');
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);
  const weekdays = cutOffs.filter(c => !['Saturday', 'Sunday'].includes(c.day));
  const sameWeekday = weekdays.every(c => c.time === weekdays[0].time);
  const rows = compact && sameWeekday
    ? [{ day: 'Mon–Fri', days: weekdays.map(c => c.day.slice(0, 3)), time: weekdays[0].time },
      ...cutOffs.filter(c => ['Saturday', 'Sunday'].includes(c.day)).map(c => ({ day: c.day.slice(0, 3), days: [c.day.slice(0, 3)], time: c.time }))]
    : cutOffs.map(c => ({ day: c.day.slice(0, 3), days: [c.day.slice(0, 3)], time: c.time }));
  return <ul className="flex flex-wrap gap-x-3 gap-y-6 pt-1" role="list">
    {rows.map((row, i) => {
      const isToday = row.days.includes(today);
      return <li key={row.day} className="relative flex flex-col items-center pt-3 before:absolute before:-inset-x-2 before:top-[.55rem] before:h-[2px] before:bg-[var(--twine)]" style={{ transform: `rotate(${[-3, 2, -1.5, 3, -2, 1.5, -2.5][i % 7]}deg)` }}>
        <span aria-hidden="true" className="absolute top-0 h-5 w-2 rounded-sm border border-[var(--ink-line)] bg-[var(--kraft-edge)]" />
        <span className={`mt-2 min-w-[5.5rem] border-[1.5px] border-[var(--ink-line)] px-3 pt-3 pb-2 text-center shadow-[2px_3px_0_var(--ink-line)] ${isToday ? 'bg-primary text-on-primary' : 'kraft text-kraft-ink'}`}>
          <span className="specimen block text-[.68rem]">{row.day}{isToday ? <span className="sr-only"> (today)</span> : null}</span>
          <span className="font-hand block text-[1.25rem] leading-tight">{row.time ? `by ${formatClock(row.time)}` : 'studio only'}</span>
          {isToday && <span aria-hidden="true" className="specimen block text-[.6rem]">today</span>}
        </span>
      </li>;
    })}
  </ul>;
}
