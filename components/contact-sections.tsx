// Contact page pieces: the tissue-wrapped form panel, handwritten gift cards and the herbarium contact label.
import type { ReactNode } from 'react';
import { business } from '../content/business';
import { mapDirectionsUrl } from '../lib/maps';
import { hoursSummary } from '../lib/studio-hours';
import { Icon } from './art/marks';
import { StudioStatus } from './studio-status';
import { TimeZoneNote } from './time-zone-note';

export function TissuePanel({ children }: { children: ReactNode }) {
  return <div className="relative">
    <div aria-hidden="true" data-art="" className="absolute -inset-3 -rotate-[1.4deg] bg-[var(--tissue-2)] [clip-path:polygon(0_2%,6%_0,14%_3%,25%_0,38%_2%,52%_0,66%_3%,80%_0,92%_2%,100%_0,99%_100%,0_99%)]" />
    <div className="relative border border-line bg-surface p-[clamp(1.5rem,4vw,2.75rem)] shadow-[0_20px_40px_-28px_rgb(60_20_30/.5)]">{children}</div>
  </div>;
}

/** Handwritten gift card listing what to put in the message (the form has name, email and message only). */
export function GiftCard({ title, items, tilt }: { title: string; items: string[]; tilt: string }) {
  return <div className="relative border-[1.5px] border-[var(--ink-line)] bg-paper p-6 pt-8 text-paper-ink shadow-[3px_4px_0_var(--ink-line)]" style={{ transform: `rotate(${tilt})` }}>
    <Icon name="ribbon" className="absolute -top-6 left-1/2 size-12 -translate-x-1/2" />
    <h2 className="font-hand text-[1.65rem] leading-tight">{title}</h2>
    <ul className="mt-3 space-y-1.5 text-[.98rem]">
      {items.map(item => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-[#9E1F5C]">—</span>{item}</li>)}
    </ul>
  </div>;
}

export function StudioLabel({ children }: { children?: ReactNode }) {
  const tel = business.phone.replace(/[^\d+]/g, '');
  return <section aria-labelledby="studio-label" className="herbarium p-6 pt-8">
    <p className="specimen text-paper-muted">Specimen · Studio</p>
    <h2 id="studio-label" className="mt-2 text-[1.9rem]">Email, phone &amp; studio</h2>
    <p className="mt-4 text-[1.1rem]"><a className="font-semibold underline decoration-2 [overflow-wrap:anywhere]" href={`mailto:${business.email}`}>{business.email}</a></p>
    {business.phone && <p className="mt-1"><a className="underline" href={`tel:${tel}`}>{business.phone}</a></p>}
    {children}
    <p className="mt-5 border-t border-dashed border-[var(--paper-edge)] pt-4 font-semibold">{business.location.label}</p>
    <p className="mt-1 text-paper-muted">{business.location.directions}</p>
    <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
      {hoursSummary(business.hours).map(row => <div key={row.days} className="contents"><dt className="font-semibold">{row.days}</dt><dd>{row.hours}</dd></div>)}
    </dl>
    <TimeZoneNote className="text-paper-muted" />
    <div className="mt-3 flex flex-wrap items-center gap-4">
      <StudioStatus />
      <a className="font-semibold underline" href={mapDirectionsUrl(business.location.mapQuery)} target="_blank" rel="noopener">Directions</a>
    </div>
  </section>;
}
