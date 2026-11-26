// Weddings page pieces: pressed-specimen collection sheets, the price ledger, process numerals and the seasons strip.
import type { ReactNode } from 'react';
import { weddingCollections, weddingMinimumSpend, weddingPieces, weddingSeasons, weddingTravelNote } from '../content/weddings';
import { aud } from '../lib/collections';
import { VineDivider } from './art/marks';
import { PressedStem, SeasonSprig } from './art/objects';

type Slot = { children: ReactNode };
const stems = ['sweet-pea', 'peony', 'eucalyptus'] as const;

function SectionTitle({ children, id }: Slot & { id: string }) {
  return <h2 id={id} className="text-[clamp(2.4rem,5.4vw,4.2rem)] [&_em]:not-italic [&_em]:text-accent-ink">{children}</h2>;
}
const Lede = ({ children }: Slot) => <p className="mt-5 max-w-xl text-[1.1rem] text-muted">{children}</p>;

/* ---------- Collections as herbarium sheets ---------- */

function CollectionsSection({ children }: Slot) {
  return <section aria-labelledby="collections-heading" className="relative py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap">
      <div className="max-w-2xl" data-reveal>{children}</div>
      <ul className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8" role="list">
        {weddingCollections.map((c, i) => <li key={c.id} className={['md:mt-0 md:-rotate-2', 'md:mt-16 md:rotate-1', 'md:mt-6 md:rotate-[2.5deg]'][i % 3]} data-reveal>
          <article aria-labelledby={`${c.id}-name`} className="herbarium flex h-full flex-col p-6 pt-8">
            <PressedStem kind={stems[i % 3]} className="mx-auto h-72" />
            <div className="mt-4 border-[1.5px] border-[var(--paper-ink)] p-4">
              <p className="specimen text-paper-muted">Specimen no. {String(i + 1).padStart(2, '0')} · {c.suits}</p>
              <h3 id={`${c.id}-name`} className="mt-2 text-[2.1rem] text-paper-ink">{c.name}</h3>
              <p className="font-hand text-[1.5rem] text-[#9E1F5C]">from {aud(c.fromPrice)}</p>
              <ul className="mt-3 space-y-1 text-[.97rem]">
                {c.includes.map(item => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-[#557740]">✿</span>{item}</li>)}
              </ul>
            </div>
          </article>
        </li>)}
      </ul>
      <p className="mt-12 max-w-2xl text-muted">{weddingTravelNote} Weddings start from {aud(weddingMinimumSpend)}.</p>
    </div>
  </section>;
}
export const Collections = Object.assign(CollectionsSection, {
  Heading: ({ children }: Slot) => <SectionTitle id="collections-heading">{children}</SectionTitle>,
  Introduction: Lede,
});

/* ---------- Pieces as a florist's price ledger ---------- */

function LedgerSection({ children }: Slot) {
  return <section aria-labelledby="ledger-heading" className="tissue grain relative py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
      <div data-reveal>{children}</div>
      <div className="relative border-y-[3px] border-double border-[var(--ink-line)] py-4" data-reveal>
        <ul className="grid gap-x-12 sm:grid-cols-2" role="list">
          {weddingPieces.map(piece => <li key={piece.id} className="flex items-baseline gap-2 border-b border-line py-3.5">
            <span className="font-display text-[1.3rem]">{piece.name}</span>
            <span aria-hidden="true" className="mx-1 flex-1 translate-y-[-.2rem] border-b-2 border-dotted border-[var(--muted)] opacity-50" />
            <span className="font-hand whitespace-nowrap text-[1.3rem]">from {aud(piece.fromPrice)}<span className="text-[1rem] text-muted"> {piece.unit === 'each' ? 'ea' : '/ m'}</span></span>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}
export const Ledger = Object.assign(LedgerSection, {
  Heading: ({ children }: Slot) => <SectionTitle id="ledger-heading">{children}</SectionTitle>,
  Introduction: Lede,
});

/* ---------- Process: four numerals along a vine ---------- */

function ProcessSection({ children }: Slot) {
  return <section aria-labelledby="process-heading" className="relative overflow-hidden py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap">{children}</div>
  </section>;
}
export const Process = Object.assign(ProcessSection, {
  Heading: ({ children }: Slot) => <div data-reveal><SectionTitle id="process-heading">{children}</SectionTitle></div>,
  Steps: ({ children }: Slot) => <div className="relative mt-10">
    <VineDivider className="absolute inset-x-0 -top-2 hidden w-full opacity-80 md:block" />
    <ol className="relative grid gap-10 [counter-reset:step] sm:grid-cols-2 md:grid-cols-4" role="list">{children}</ol>
  </div>,
  Step: ({ title, children }: Slot & { title: string }) => <li className="[counter-increment:step]" data-reveal>
    <span aria-hidden="true" className="font-display block text-[6.5rem] leading-none text-accent-ink [text-shadow:3px_3px_0_var(--surface-soft)] before:content-[counter(step,decimal-leading-zero)]" />
    <h3 className="relative mt-6 text-[1.6rem]">{title}</h3>
    <p className="mt-2 text-muted">{children}</p>
  </li>,
});

/* ---------- Seasons strip ---------- */

function SeasonsSection({ children }: Slot) {
  return <section aria-labelledby="seasons-heading" className="band-sage grain relative py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap">
      <div className="max-w-2xl" data-reveal>{children}</div>
      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4" role="list">
        {weddingSeasons.map(s => <li key={s.id} className="border-t-2 border-[var(--ink-line)] pt-5" data-reveal>
          <SeasonSprig season={s.id} className="h-28" />
          <h3 className="mt-3 text-[2rem]">{s.season}</h3>
          <p className="specimen mt-1 text-accent-ink">{s.months}</p>
          <p className="mt-2 text-muted">{s.blooms}</p>
        </li>)}
      </ul>
    </div>
  </section>;
}
export const Seasons = Object.assign(SeasonsSection, {
  Heading: ({ children }: Slot) => <SectionTitle id="seasons-heading">{children}</SectionTitle>,
  Introduction: Lede,
});
