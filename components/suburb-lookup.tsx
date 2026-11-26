'use client';

import { useEffect, useId, useState } from 'react';
import { closures, cutOffs, deliveryZones } from '../content/delivery';
import { aud, findSuburbs, type SuburbMatch } from '../lib/collections';
import { formatClock } from '../lib/local-time';
import { effectiveCutOff, sameDayCopy, sameDayStatus } from '../lib/same-day';
import { site } from '../lib/site';
import { SiteLink } from './site-link';

/** Type-ahead over the delivery suburbs (name or postcode). Without JavaScript, the full lists below are the lookup. */
export function SuburbLookup() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<SuburbMatch | null>(null);
  const [today, setToday] = useState<string>('');
  const matches = findSuburbs(query);
  const exact = matches.find(m => m.suburb.name.toLowerCase() === query.trim().toLowerCase() || m.suburb.postcode === query.trim());
  const result = picked ?? exact ?? null;

  const zoneCutOff = result?.zone.sameDayCutOffOverride;
  const resultId = result?.suburb.id;
  useEffect(() => {
    if (!resultId) { setToday(''); return; }
    const update = () => {
      const status = sameDayStatus({ now: new Date(), timeZone: site.timeZone, cutOffs, closures, zoneCutOff });
      setToday(status ? `${sameDayCopy(status).headline}. ${sameDayCopy(status).detail}.` : '');
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [resultId, zoneCutOff]);

  const weekday = effectiveCutOff(cutOffs.find(c => c.day === 'Monday')?.time ?? null, result?.zone.sameDayCutOffOverride);
  const saturday = effectiveCutOff(cutOffs.find(c => c.day === 'Saturday')?.time ?? null, result?.zone.sameDayCutOffOverride);

  return <div>
    <label htmlFor={id} className="font-display block text-[1.6rem] leading-tight text-kraft-ink">Where are the flowers going?</label>
    <input id={id} type="search" inputMode="search" autoComplete="off" placeholder="Suburb or postcode, e.g. Brunswick or 3182"
      value={query} onChange={e => { setQuery(e.target.value); setPicked(null); }}
      aria-describedby={`${id}-result`}
      className="mt-3 block min-h-12 w-full rounded-md border-[1.5px] border-[var(--ink-line)] bg-[#FFFBF3] px-4 text-[1.05rem] text-[#22331F] placeholder:text-[#6B6656] focus-visible:outline-[var(--primary)]" />
    <noscript><p className="mt-3 text-sm">The full suburb lists are on the bloom map below.</p></noscript>
    {!result && matches.length > 0 && <ul className="mt-3 flex flex-wrap gap-2" aria-label="Matching suburbs">
      {matches.map(m => <li key={m.suburb.id}><button type="button" onClick={() => { setPicked(m); setQuery(m.suburb.name); }}
        className="rounded-full border border-[var(--ink-line)] bg-[#FFFBF3] px-3.5 py-1.5 text-sm font-semibold text-[#22331F] hover:bg-white">
        {m.suburb.name} <span className="opacity-70">{m.suburb.postcode}</span></button></li>)}
    </ul>}
    <div id={`${id}-result`} aria-live="polite" className="mt-4 min-h-6">
      {result ? <div className="rounded-md border-[1.5px] border-dashed border-[var(--ink-line)] bg-[#FFFBF3]/70 p-4 text-[#22331F]">
        <p className="font-hand text-2xl leading-tight">Yes, we deliver to {result.suburb.name}.</p>
        <p className="mt-2"><strong>{result.zone.name}</strong> · delivery {aud(result.zone.fee)}</p>
        <p className="mt-1 text-[.95rem]">Same-day: ask by {weekday ? formatClock(weekday) : 'the cut-off'} weekdays{saturday ? `, ${formatClock(saturday)} Saturdays` : ''}.</p>
        {today && <p className="mt-1 text-[.95rem] font-semibold">Today: {today}</p>}
      </div>
      : query.trim() && !matches.length ? <p className="text-[#22331F]">
        Not on our map? <SiteLink href="/contact/" className="font-semibold underline">Send an enquiry</SiteLink> and we’ll see what we can do.
      </p> : null}
    </div>
    <p className="sr-only">{deliveryZones.length} delivery zones.</p>
  </div>;
}
