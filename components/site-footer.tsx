import { business } from '../content/business';
import { hoursSummary } from '../lib/studio-hours';
import { BucketSilhouettes } from './art/objects';
import { SiteLink } from './site-link';
import { StudioStatus } from './studio-status';
import { TimeZoneNote } from './time-zone-note';
import { Wordmark } from './wordmark';

export function SiteFooter() {
  const tel = business.phone.replace(/[^\d+]/g, '');
  return <footer className="relative mt-20">
    <BucketSilhouettes className="block h-14 w-full md:h-20" />
    <div className="band-deep grain">
      <div className="wrap grid gap-12 py-14 md:grid-cols-[1.2fr_1.1fr_.8fr]">
        <div>
          <Wordmark tone="deep" />
          <p className="font-display mt-6 max-w-[16ch] text-[1.9rem] leading-[1.1]">Cut this morning, in a vase by tonight.</p>
          <p className="mt-4 max-w-sm text-on-deep-muted">{business.tagline}</p>
        </div>
        <div className="herbarium -rotate-1 p-6 pt-7 md:mt-2">
          <p className="specimen text-paper-muted">Specimen · Studio</p>
          <p className="font-display mt-2 text-xl leading-snug">{business.location.label}</p>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-[.95rem]">
            {hoursSummary(business.hours).map(row => <div key={row.days} className="contents"><dt className="font-semibold">{row.days}</dt><dd>{row.hours}</dd></div>)}
          </dl>
          <TimeZoneNote className="text-paper-muted" />
          <StudioStatus className="mt-3 text-paper-ink" />
          <p className="mt-4 border-t border-dashed border-[var(--paper-edge)] pt-3 text-[.95rem]">
            <a className="font-semibold underline" href={`mailto:${business.email}`}>{business.email}</a>
            {business.phone && <><br /><a className="underline" href={`tel:${tel}`}>{business.phone}</a></>}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col items-start gap-2.5 text-[1.05rem]">
          <p className="specimen text-on-deep-muted">Around the stall</p>
          <SiteLink href="/arrangements/" className="font-semibold">Arrangements</SiteLink>
          <SiteLink href="/weddings/" className="font-semibold">Wedding flowers</SiteLink>
          <SiteLink href="/delivery/" className="font-semibold">Delivery & cut-offs</SiteLink>
          <SiteLink href="/contact/" className="font-semibold">Send an enquiry</SiteLink>
        </nav>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-4 border-t border-white/15 py-5 text-sm text-on-deep-muted">
        <p>{business.name} is a sample florist for the Jamstacks gallery. Orders are enquiries until we reply.</p>
        <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="text-on-deep no-underline hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
      </div>
    </div>
  </footer>;
}
