import type { Metadata } from 'next';
import { BloomEnvelope } from '../../components/art/objects';
import { CopyEmail } from '../../components/copy-email';
import { GiftCard, StudioLabel, TissuePanel } from '../../components/contact-sections';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { SameDayTag } from '../../components/same-day-tag';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send an order or wedding enquiry to Wild Peony Florist, beside Queen Victoria Market, Melbourne. We reply to confirm stems, delivery and payment.',
  alternates: { canonical: absoluteUrl('/contact/') },
};

// Contact page copy. Email, phone, hours and message guidance come from content/business.ts.
export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead eyebrow="Contact" title={<>Send us <em>an enquiry</em></>} art={<BloomEnvelope />}>
      <p>For flowers to send, flowers for your wedding, or regular flowers for an office or venue. Every order starts as an
        enquiry: we reply to confirm the stems, delivery time and payment.</p>
    </PageHead>

    <div className="wrap grid gap-12 py-[clamp(3rem,7vw,5rem)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <section aria-labelledby="form-heading">
        <TissuePanel>
          <h2 id="form-heading" className="text-[clamp(2rem,4vw,2.8rem)]">Write to the studio</h2>
          <p className="mt-3 text-muted">{business.enquiries.paymentNote}</p>
          <div className="mt-7">
            {hosted ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
              : <div className="rounded-ui border-[1.5px] border-dashed border-line bg-surface p-6">
                <h3 className="text-2xl">Email us directly</h3>
                <p className="mt-3 text-muted">The enquiry form isn’t connected on this copy of the site. Please email{' '}
                  <a className="text-link" href={`mailto:${business.email}`}>{business.email}</a> with the details alongside.</p>
              </div>}
          </div>
        </TissuePanel>
        <div className="mt-14 max-w-xl">
          <StudioLabel>
            <div className="mt-3 flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
          </StudioLabel>
        </div>
      </section>

      <aside aria-label="Contact details" className="grid content-start gap-10">
        <SameDayTag className="mx-auto w-[15rem] lg:mx-0" twine={48} />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <GiftCard title="For an order, include" items={business.enquiries.order} tilt="-2deg" />
          <GiftCard title="For a wedding, include" items={business.enquiries.wedding} tilt="1.5deg" />
        </div>
      </aside>
    </div>
  </>;
}
