// Arrangements page pieces: bucket-on-shelf items, the size cones, florist's choice card and the by-occasion index.
import type { ReactNode } from 'react';
import { arrangements, sizeNotes, type Arrangement, type SizeName } from '../content/arrangements';
import { occasions } from '../content/occasions';
import { aud, seasonLabel } from '../lib/collections';
import { Icon } from './art/marks';
import { BucketArt, ConeArt } from './art/objects';
import { SiteLink } from './site-link';
import { SwingTag } from './swing-tag';

type Slot = { children: ReactNode };
const SIZES: SizeName[] = ['petite', 'classic', 'lush'];

/** One arrangement: its bunch in a zinc bucket on the shelf, a price swing tag and the details. */
export function ArrangementBucket({ item, index }: { item: Arrangement; index: number }) {
  const prices = SIZES.filter(size => item.prices[size] !== undefined);
  return <article id={item.id} aria-labelledby={`${item.id}-name`} className="bucket flex w-full scroll-mt-32 flex-col">
    <div className="relative">
      <BucketArt art={item.art} label={item.style} wreath={item.style === 'wreath'} resting={!item.available} seed={index * 7 + 3} className="mx-auto -mb-1 block w-[78%] max-w-[15rem]" />
      {item.seasonal && <p className="absolute right-[8%] top-[6%] grid size-[5.6rem] -rotate-12 place-items-center rounded-full border-[2.5px] border-double border-primary text-center text-primary mix-blend-multiply dark:mix-blend-screen dark:border-petal dark:text-petal">
        <span className="specimen leading-tight">In season<br /><span className="font-hand text-[1rem] normal-case tracking-normal">{seasonLabel(item.seasonal)}</span></span>
      </p>}
      {!item.available && <p className="font-hand absolute left-[6%] top-[38%] -rotate-6 bg-paper px-3 py-1 text-[1.3rem] text-paper-ink shadow-[2px_3px_0_var(--ink-line)]">Resting this week</p>}
    </div>
    <div className="zinc-shelf rounded-none" />
    <div className="flex flex-1 flex-col px-5 pt-1 sm:px-6">
      <SwingTag variant="price" className="mt-3 self-start -rotate-2">
        <span className="sr-only">Prices: </span>
        <span className="font-hand flex flex-wrap gap-x-3 text-[1.18rem] leading-snug">
          {prices.map(size => <span key={size}>{sizeNotes[size].label} {aud(item.prices[size]!)}</span>)}
        </span>
      </SwingTag>
      <h3 id={`${item.id}-name`} className="mt-5 text-[1.85rem]">{item.name}</h3>
      <p className="specimen mt-2 text-accent-ink">{item.style} · {item.palette}</p>
      <p className="mt-3 text-muted">{item.description}</p>
      <p className="mt-3 text-[.95rem]"><span className="font-semibold">Usually:</span> {item.stems.join(', ')}.</p>
      <p className="mt-auto flex items-center gap-2 pt-4 text-[.95rem] font-semibold">
        <Icon name={item.sameDay ? 'bicycle' : 'clock'} className="size-8" />
        {!item.available ? 'Back when the season is' : item.sameDay ? 'Same-day eligible' : '24 h notice, made to order'}
      </p>
    </div>
  </article>;
}

/** Shelf header: oversized title beside short guidance. */
export function ShelfIntro({ children }: Slot) {
  return <div className="flex flex-wrap items-end justify-between gap-6">{children}</div>;
}

/* ---------- How sizes work ---------- */

function SizeGuideSection({ children }: Slot) {
  return <section aria-labelledby="sizes-heading" className="band-sage grain relative overflow-hidden py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap">
      <div className="max-w-2xl" data-reveal>{children}</div>
      <ol className="mt-12 grid items-end gap-10 sm:grid-cols-3" role="list">
        {SIZES.map((size, i) => <li key={size} className="text-center" data-reveal>
          <ConeArt scale={size} className={`mx-auto ${['w-[58%]', 'w-[78%]', 'w-full'][i]}`} />
          <p className="font-display mt-2 text-[clamp(3rem,6vw,4.6rem)] leading-none text-accent-ink">{sizeNotes[size].label}</p>
          <p className="mx-auto mt-3 max-w-[16rem] text-muted">{sizeNotes[size].note}</p>
          <span className="sr-only">Size {i + 1} of 3</span>
        </li>)}
      </ol>
    </div>
  </section>;
}
export const SizeGuide = Object.assign(SizeGuideSection, {
  Heading: ({ children }: Slot) => <h2 id="sizes-heading" className="text-[clamp(2.4rem,5.4vw,4.2rem)]">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-5 max-w-xl text-[1.1rem] text-muted">{children}</p>,
});

/* ---------- Florist's choice ---------- */

function FloristsChoiceSection({ children }: Slot) {
  return <section aria-labelledby="choice-heading" className="tissue grain relative py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="kraft relative mx-auto w-full max-w-md rotate-[-3deg] border-[1.5px] border-[var(--ink-line)] p-8 shadow-[5px_6px_0_var(--ink-line)]" data-reveal>
        <Icon name="secateurs" className="absolute -right-5 -top-6 size-16 rotate-12" />
        {children}
      </div>
      <ByOccasionIndex />
    </div>
  </section>;
}
export const FloristsChoice = Object.assign(FloristsChoiceSection, {
  Heading: ({ children }: Slot) => <h2 id="choice-heading" className="font-hand text-[2.1rem] leading-tight text-kraft-ink">{children}</h2>,
  Note: ({ children }: Slot) => <p className="mt-4 text-[1.08rem] text-kraft-ink">{children}</p>,
  Action: ({ children }: Slot) => <SiteLink href="/contact/" className="button mt-6">{children}</SiteLink>,
});

/** Plain anchor index by occasion. It is the filter's no-JavaScript fallback and a quick scan for everyone. */
export function ByOccasionIndex() {
  return <div id="by-occasion" className="scroll-mt-28" data-reveal>
    <h2 className="text-[clamp(1.9rem,3.6vw,2.6rem)]">By occasion</h2>
    <dl className="mt-5 divide-y divide-dashed divide-line">
      {occasions.map(o => <div key={o.id} id={`for-${o.id}`} className="grid scroll-mt-28 gap-1 py-3 sm:grid-cols-[11rem_1fr]">
        <dt className="font-semibold">{o.name}</dt>
        <dd className="text-muted">
          {arrangements.filter(a => a.occasionIds.includes(o.id)).map((a, i, list) => <span key={a.id}>
            <a href={`#${a.id}`} className="text-link">{a.name}</a>{i < list.length - 1 ? ', ' : ''}
          </span>)}
        </dd>
      </div>)}
    </dl>
  </div>;
}

/* ---------- Shared call-to-action band ---------- */

function CtaBandSection({ children, tone = 'soft' }: Slot & { tone?: 'soft' | 'deep' | 'sage' }) {
  const bg = tone === 'deep' ? 'band-deep' : tone === 'sage' ? 'band-sage' : 'band-soft';
  return <section aria-labelledby="cta-heading" className={`${bg} grain relative overflow-hidden py-[clamp(3.5rem,8vw,6rem)]`}>
    <div className="wrap flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between" data-reveal>{children}</div>
  </section>;
}
export const CtaBand = Object.assign(CtaBandSection, {
  Text: ({ children }: Slot) => <div className="max-w-2xl">{children}</div>,
  Heading: ({ children }: Slot) => <h2 id="cta-heading" className="text-[clamp(2.3rem,5vw,3.8rem)] [&_em]:not-italic [&_em]:text-accent-ink">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-4 text-[1.1rem] opacity-80">{children}</p>,
  Action: ({ children }: Slot) => <SiteLink href="/contact/" className="button shrink-0 text-[1.05rem]">{children}</SiteLink>,
});
