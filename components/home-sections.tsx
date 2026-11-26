// Home page sections. Copy is passed in as children from app/page.tsx; these own layout, art and behaviour.
import type { ReactNode } from 'react';
import { arrangements } from '../content/arrangements';
import { business } from '../content/business';
import { deliveryZones } from '../content/delivery';
import { inSeason, weekOf } from '../content/in-season';
import { occasions } from '../content/occasions';
import { weddingCollections } from '../content/weddings';
import { aud, fromPrice, stemStatusLabel } from '../lib/collections';
import { formatDayMonth } from '../lib/local-time';
import { mapDirectionsUrl } from '../lib/maps';
import { hoursSummary } from '../lib/studio-hours';
import { MarketArmful } from './art/armful';
import { BloomMap, PetalDivider } from './art/marks';
import { BucketArt, EnvelopeArt, PressedStem } from './art/objects';
import { CutOffPegs } from './cut-off-pegs';
import { SameDayTag } from './same-day-tag';
import { SiteLink } from './site-link';
import { StudioStatus } from './studio-status';
import { SwingTag } from './swing-tag';
import { TimeZoneNote } from './time-zone-note';

type Slot = { children: ReactNode };

/* ---------- Hero ---------- */

function HeroSection({ children }: Slot) {
  return <section aria-labelledby="hero-heading" className="tissue grain relative overflow-hidden border-b border-line">
    <div className="wrap relative grid items-center gap-10 pt-8 pb-16 md:min-h-[min(52rem,calc(100svh-5.75rem))] md:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] md:gap-10 md:py-16 lg:gap-14">
      <div className="relative z-10 flex flex-col">{children}</div>
      <div className="relative mx-auto w-full max-w-[34rem] md:max-w-none">
        <MarketArmful className="w-full" />
        <div className="absolute -bottom-7 left-3 z-10 w-[11rem] sm:left-4 sm:w-[12.5rem] md:-bottom-8 md:-left-6 md:w-[13.5rem] lg:-left-8">
          <SameDayTag twine={54} />
        </div>
      </div>
    </div>
  </section>;
}
function Eyebrow({ children }: Slot) { return <p className="eyebrow">{children}</p>; }
function Heading({ children }: Slot) {
  return <h1 id="hero-heading" className="mt-3 text-[clamp(2.9rem,6.2vw,5.4rem)] leading-[.95] [&_em]:not-italic [&_em]:text-accent-ink">{children}</h1>;
}
function Introduction({ children }: Slot) {
  return <p className="mt-6 max-w-[30rem] text-[1.12rem] text-muted md:mt-8 md:text-[1.22rem]">{children}</p>;
}
function Actions({ children }: Slot) { return <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{children}</div>; }
function PrimaryAction({ children }: Slot) { return <SiteLink href="/contact/" className="button text-[1.05rem]">{children}</SiteLink>; }
function SecondaryAction({ children, href = '/arrangements/' }: Slot & { href?: string }) {
  return <SiteLink href={href} className="font-semibold text-ink underline decoration-[var(--stem)] decoration-2 underline-offset-[.3em] hover:text-accent-ink">{children}</SiteLink>;
}
export const Hero = Object.assign(HeroSection, { Eyebrow, Heading, Introduction, Actions, PrimaryAction, SecondaryAction });

/* ---------- In the buckets this week ---------- */

function BucketsWeekSection({ children }: Slot) {
  const [day, month] = formatDayMonth(weekOf).split(' ');
  return <section aria-labelledby="week-heading" className="band-sage grain relative overflow-hidden py-[clamp(4rem,9vw,7.5rem)]">
    <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.5fr)]">
      <div data-reveal>
        {children}
        <p className="mt-8 font-display leading-[.85] text-foliage" aria-label={`Week of ${day} ${month}`}>
          <span className="block text-[1.4rem]">Week of</span>
          <span className="block text-[clamp(6rem,15vw,11rem)] text-accent-ink">{day}</span>
          <span className="block text-[clamp(2.4rem,5vw,3.6rem)]">{month}</span>
        </p>
      </div>
      <div className="herbarium relative rotate-[-1.2deg] p-[clamp(1.25rem,3vw,2.5rem)]" data-reveal>
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_8.5rem]">
          <ul className="divide-y divide-dashed divide-[var(--paper-edge)]">
            {inSeason.map((stem, i) => <li key={stem.id} className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-x-3 py-3">
              <span className="specimen text-paper-muted">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="block font-semibold">{stem.name}</span>
                <span className="block text-[.92rem] text-paper-muted"><i>{stem.botanical}</i> · {stem.note}</span>
              </span>
              <span className={`font-hand text-right text-[1.15rem] ${stem.status === 'last-week' ? 'text-[#9E1F5C]' : stem.status === 'limited' ? 'text-[#8A5A1E]' : 'text-[#3E5B2A]'}`}>{stemStatusLabel[stem.status]}</span>
            </li>)}
          </ul>
          <div className="hidden flex-col items-center justify-between sm:flex">
            <PressedStem kind="peony" className="w-full" />
            <p className="specimen border border-[var(--paper-edge)] px-2 py-1.5 text-center text-[.6rem] leading-snug text-paper-muted">Paeonia lactiflora<br />Wild Peony studio<br />{month.slice(0, 3)}</p>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
function SectionTitle({ children, id, className = '' }: Slot & { id?: string; className?: string }) {
  return <h2 id={id} className={`text-[clamp(2.4rem,5.4vw,4.2rem)] [&_em]:not-italic [&_em]:text-accent-ink ${className}`}>{children}</h2>;
}
function Lede({ children, className = '' }: Slot & { className?: string }) {
  return <p className={`mt-5 max-w-[32rem] text-[1.1rem] text-muted ${className}`}>{children}</p>;
}
export const BucketsWeek = Object.assign(BucketsWeekSection, {
  Heading: ({ children }: Slot) => <SectionTitle id="week-heading">{children}</SectionTitle>,
  Note: ({ children }: Slot) => <Lede>{children}</Lede>,
});

/* ---------- Flowers for… (occasion envelopes) ---------- */

function OccasionEnvelopesSection({ children }: Slot) {
  return <section aria-labelledby="occasions-heading" className="tissue grain relative py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap">
      <div className="max-w-2xl" data-reveal>{children}</div>
      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-0" role="list">
        {occasions.map((o, i) => <li key={o.id} className="lg:-mx-1" style={{ transform: `rotate(${[-5, 3, -2, 4, -4, 2][i % 6]}deg)` }}>
          <SiteLink href={`/arrangements/?occasion=${o.id}`} className="envelope group block text-center no-underline hover:no-underline">
            <EnvelopeArt colour={o.envelopeColour} motif={o.seal} className="mx-auto w-full max-w-[12rem] drop-shadow-[0_10px_12px_rgb(40_20_20/.16)]" />
            <span className="font-display mt-2 block text-[1.35rem] leading-tight group-hover:text-accent-ink">{o.name}</span>
            <span className="blurb mt-1 block text-[.92rem] text-muted">{o.blurb}</span>
          </SiteLink>
        </li>)}
      </ul>
    </div>
  </section>;
}
export const OccasionEnvelopes = Object.assign(OccasionEnvelopesSection, {
  Heading: ({ children }: Slot) => <SectionTitle id="occasions-heading">{children}</SectionTitle>,
  Introduction: ({ children }: Slot) => <Lede>{children}</Lede>,
});

/* ---------- Featured shelf ---------- */

function FeaturedShelfSection({ children }: Slot) {
  const featured = arrangements.filter(a => a.featured);
  return <section aria-labelledby="featured-heading" className="band-soft grain relative overflow-hidden py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap">
      <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>{children}</div>
      <ul className="mt-12 grid grid-cols-2 gap-y-12 lg:grid-cols-4" role="list">
        {featured.map((a, i) => <li key={a.id} className="bucket flex flex-col">
          <SiteLink href={`/arrangements/#${a.id}`} className="group block no-underline hover:no-underline">
            <BucketArt art={a.art} label={a.style} wreath={a.style === 'wreath'} resting={!a.available} seed={i * 7 + 3} className="mx-auto -mb-1 w-[88%] max-w-[15rem]" />
            <div className="zinc-shelf rounded-none" />
            <div className="flex justify-center pt-1">
              <SwingTag variant="price" className="mt-3 -rotate-2 transition-transform group-hover:rotate-1">
                <span className="block font-display text-[1.05rem] leading-tight">{a.name}</span>
                <span className="font-hand block text-[1.2rem] leading-tight">from {aud(fromPrice(a))}</span>
              </SwingTag>
            </div>
          </SiteLink>
        </li>)}
      </ul>
    </div>
  </section>;
}
export const FeaturedShelf = Object.assign(FeaturedShelfSection, {
  Heading: ({ children }: Slot) => <div className="max-w-xl"><SectionTitle id="featured-heading">{children}</SectionTitle></div>,
  Link: ({ children }: Slot) => <SiteLink href="/arrangements/" className="button button-quiet">{children}</SiteLink>,
});

/* ---------- Wedding teaser ---------- */

function WeddingTeaserSection({ children }: Slot) {
  return <section aria-labelledby="weddings-heading" className="band-deep grain relative mt-16 py-[clamp(4rem,8vw,6.5rem)]">
    <div className="wrap grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="herbarium relative order-2 mx-auto w-full max-w-sm rotate-[2.5deg] p-6 md:order-1 md:-mt-40" data-reveal>
        <PressedStem kind="rose" className="mx-auto h-64" />
        <p className="specimen mt-3 border-t border-dashed border-[var(--paper-edge)] pt-3 text-paper-muted">Specimen · Bridal posy</p>
        <p className="font-hand text-[1.4rem] text-paper-ink">white garden rose, olive &amp; hellebore</p>
      </div>
      <div className="order-1 md:order-2" data-reveal>
        <p className="font-display leading-[.8] text-petal"><span className="text-[clamp(6rem,14vw,10rem)]">{String(weddingCollections.length).padStart(2, '0')}</span> <span className="text-[1.9rem] text-on-deep">collections</span></p>
        {children}
      </div>
    </div>
  </section>;
}
export const WeddingTeaser = Object.assign(WeddingTeaserSection, {
  Heading: ({ children }: Slot) => <h2 id="weddings-heading" className="mt-6 text-[clamp(2.2rem,4.6vw,3.6rem)] text-on-deep">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mt-5 max-w-[30rem] text-[1.1rem] text-on-deep-muted">{children}</p>,
  Link: ({ children }: Slot) => <SiteLink href="/weddings/" className="button mt-8 bg-on-deep text-[#2B2418] border-on-deep hover:bg-white hover:border-white">{children}</SiteLink>,
});

/* ---------- Delivery strip ---------- */

function DeliveryStripSection({ children }: Slot) {
  return <section aria-labelledby="delivery-heading" className="tissue grain relative overflow-hidden py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap grid items-center gap-12 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
      <div className="relative mx-auto w-full max-w-[28rem]" data-reveal>
        <BloomMap zones={deliveryZones} labels={false} className="w-full" />
        <ul className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-muted" role="list">
          {deliveryZones.map(z => <li key={z.id}><strong className="text-ink">{z.name}</strong> · {aud(z.fee)}</li>)}
        </ul>
      </div>
      <div data-reveal>
        {children}
        <div className="mt-8"><CutOffPegs compact /></div>
        <SiteLink href="/delivery/" className="mt-9 inline-block font-semibold text-accent-ink underline decoration-2 underline-offset-[.3em]">Check your suburb →</SiteLink>
      </div>
    </div>
  </section>;
}
export const DeliveryStrip = Object.assign(DeliveryStripSection, {
  Heading: ({ children }: Slot) => <SectionTitle id="delivery-heading">{children}</SectionTitle>,
  Introduction: ({ children }: Slot) => <Lede>{children}</Lede>,
});

/* ---------- Studio visit ---------- */

function StudioVisitSection({ children }: Slot) {
  return <section aria-labelledby="studio-heading" className="band-sage grain relative py-[clamp(4rem,9vw,7rem)]">
    <div className="wrap grid gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center">
      <div className="kraft relative -rotate-1 border-[1.5px] border-[var(--ink-line)] p-[clamp(1.5rem,4vw,3rem)] shadow-[4px_5px_0_var(--ink-line)]" data-reveal>
        <p className="specimen">Studio hours</p>
        <dl className="mt-4 divide-y divide-dashed divide-[var(--kraft-edge)]">
          {hoursSummary(business.hours).map(row => <div key={row.days} className="flex items-baseline justify-between gap-6 py-2.5">
            <dt className="font-display text-[1.5rem]">{row.days}</dt><dd className="font-hand text-[1.4rem]">{row.hours}</dd>
          </div>)}
        </dl>
        <div className="mt-5 flex flex-wrap items-center gap-3"><StudioStatus /></div>
        <TimeZoneNote className="text-kraft-ink/75" />
      </div>
      <div data-reveal>
        {children}
        <p className="mt-6 max-w-md font-semibold">{business.location.label}</p>
        <p className="mt-2 max-w-md text-muted">{business.location.directions}</p>
        <a href={mapDirectionsUrl(business.location.mapQuery)} className="mt-6 inline-block font-semibold text-accent-ink underline decoration-2 underline-offset-[.3em]" rel="noopener" target="_blank">Get directions (opens Google Maps)</a>
      </div>
    </div>
  </section>;
}
export const StudioVisit = Object.assign(StudioVisitSection, {
  Heading: ({ children }: Slot) => <SectionTitle id="studio-heading">{children}</SectionTitle>,
  Introduction: ({ children }: Slot) => <Lede>{children}</Lede>,
});

/* ---------- Closing call to action ---------- */

function ClosingSection({ children }: Slot) {
  return <section aria-labelledby="closing-heading" className="relative overflow-hidden pt-16">
    <PetalDivider className="mx-auto block w-full max-w-6xl" />
    <div className="wrap py-14 text-center" data-reveal>{children}</div>
  </section>;
}
export const Closing = Object.assign(ClosingSection, {
  Heading: ({ children }: Slot) => <h2 id="closing-heading" className="mx-auto max-w-[16ch] text-[clamp(2.6rem,6.4vw,5rem)] [&_em]:not-italic [&_em]:text-accent-ink">{children}</h2>,
  Introduction: ({ children }: Slot) => <p className="mx-auto mt-5 max-w-xl text-[1.1rem] text-muted">{children}</p>,
  Action: ({ children }: Slot) => <SiteLink href="/contact/" className="button mt-9 text-[1.05rem]">{children}</SiteLink>,
});
