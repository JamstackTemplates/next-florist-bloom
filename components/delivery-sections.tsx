// Delivery page pieces: suburb lookup tag, the full bloom map with zone lists, the peg timetable and notes.
import type { ReactNode } from 'react';
import { closures, deliveryNotes, deliveryZones } from '../content/delivery';
import { aud } from '../lib/collections';
import { formatClock } from '../lib/local-time';
import { BloomMap, Icon } from './art/marks';
import { CutOffPegs } from './cut-off-pegs';
import { SuburbLookup } from './suburb-lookup';

type Slot = { children: ReactNode };
const Title = ({ children, id }: Slot & { id: string }) => <h2 id={id} className="text-[clamp(2.3rem,5vw,3.9rem)] [&_em]:not-italic [&_em]:text-accent-ink">{children}</h2>;
const Lede = ({ children }: Slot) => <p className="mt-5 max-w-xl text-[1.1rem] text-muted">{children}</p>;

export function LookupTag() {
  return <section aria-label="Check your suburb" className="wrap relative z-10 mt-8 pb-8 md:-mt-6">
    <div className="kraft relative mx-auto max-w-3xl border-[1.5px] border-[var(--ink-line)] p-[clamp(1.5rem,4vw,2.75rem)] pl-[clamp(2.75rem,7vw,4.5rem)] shadow-[5px_6px_0_var(--ink-line)] [clip-path:polygon(2rem_0,100%_0,100%_100%,2rem_100%,0_calc(100%-2rem),0_2rem)]">
      <span aria-hidden="true" className="absolute left-4 top-1/2 size-5 -translate-y-1/2 rounded-full border-[3px] border-[var(--kraft-edge)] bg-bg" />
      <SuburbLookup />
    </div>
  </section>;
}

function ZonesSection({ children }: Slot) {
  return <section aria-labelledby="zones-heading" className="band-sage grain relative overflow-hidden py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap">
      <div className="max-w-2xl" data-reveal>{children}</div>
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <BloomMap zones={deliveryZones} className="mx-auto w-full max-w-[44rem] [&_.map-label]:max-sm:hidden" />
        <ol className="space-y-6" role="list">
          {deliveryZones.map((zone, i) => <li key={zone.id} className="border-l-4 pl-5" style={{ borderColor: `color-mix(in srgb, var(--petal) ${[100, 65, 35][i] ?? 35}%, transparent)` }}>
            <h3 className="flex flex-wrap items-baseline gap-x-3 text-[1.8rem]">{zone.name} <span className="font-hand text-[1.4rem] text-accent-ink">{aud(zone.fee)}</span></h3>
            {zone.sameDayCutOffOverride && <p className="text-sm font-semibold">Same-day cut-off {formatClock(zone.sameDayCutOffOverride)} on weekdays</p>}
            <p className="mt-1 text-muted">{zone.suburbs.map(s => `${s.name} ${s.postcode}`).join(' · ')}</p>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
export const Zones = Object.assign(ZonesSection, {
  Heading: ({ children }: Slot) => <Title id="zones-heading">{children}</Title>,
  Introduction: Lede,
});

function TimetableSection({ children }: Slot) {
  return <section aria-labelledby="timetable-heading" className="tissue grain relative py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap">
      <div className="max-w-2xl" data-reveal>{children}</div>
      <div className="mt-10" data-reveal><CutOffPegs /></div>
      <p className="mt-8 text-sm text-muted">Closed {closures.map(c => `${c.label} ${new Date(`${c.date}T12:00:00Z`).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}`).join(' · ')}.</p>
    </div>
  </section>;
}
export const Timetable = Object.assign(TimetableSection, {
  Heading: ({ children }: Slot) => <Title id="timetable-heading">{children}</Title>,
  Introduction: Lede,
});

const NOTE_ICONS = ['clock', 'notice', 'pin', 'ribbon'] as const;
function NotesSection({ children }: Slot) {
  return <section aria-labelledby="notes-heading" className="relative py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)]">
      <div data-reveal>{children}</div>
      <dl className="band-soft grid gap-x-10 gap-y-8 border border-line p-[clamp(1.5rem,4vw,3rem)] sm:grid-cols-2" data-reveal>
        {deliveryNotes.map((note, i) => <div key={note.id}>
          <dt className="flex items-center gap-3 font-display text-[1.45rem]"><Icon name={NOTE_ICONS[i % 4]} className="size-10 shrink-0" />{note.title}</dt>
          <dd className="mt-2 text-muted">{note.text}</dd>
        </div>)}
      </dl>
    </div>
  </section>;
}
export const Notes = Object.assign(NotesSection, {
  Heading: ({ children }: Slot) => <Title id="notes-heading">{children}</Title>,
  Introduction: Lede,
});
