import type { Metadata } from 'next';
import { ArrangementBucket, CtaBand, FloristsChoice, ShelfIntro, SizeGuide } from '../../components/arrangement-sections';
import { PeonySpray } from '../../components/art/objects';
import { OccasionShelf } from '../../components/occasion-shelf';
import { PageHead } from '../../components/page-head';
import { arrangements, floristsChoice } from '../../content/arrangements';
import { occasions } from '../../content/occasions';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Arrangements',
  description: 'Peony armfuls, market posies, garden bouquets and sympathy wreaths in petite, classic and lush sizes, with same-day delivery across inner Melbourne.',
  alternates: { canonical: absoluteUrl('/arrangements/') },
};

// Arrangements page copy. The collection itself lives in content/arrangements.ts.
export default function ArrangementsPage() {
  return <>
    <PageHead eyebrow="Arrangements" title={<>Every bucket on <em>the stall</em></>} art={<PeonySpray />}>
      <p>Each arrangement comes in up to three sizes and is made on the morning it goes out. We swap stems like for like
        with the season, so yours will be the freshest version of it.</p>
    </PageHead>

    <section aria-labelledby="shelf-heading" className="wrap py-[clamp(3rem,7vw,5rem)]">
      <ShelfIntro>
        <h2 id="shelf-heading" className="text-[clamp(2rem,4vw,3rem)]">Choose by occasion</h2>
        <p className="max-w-md text-muted">Prices are for the flowers; delivery is added by suburb. Tap an occasion to narrow the shelf.</p>
      </ShelfIntro>
      <div className="mt-8">
        <OccasionShelf
          occasions={occasions.map(o => ({ id: o.id, name: o.name }))}
          entries={arrangements.map((a, i) => ({ id: a.id, occasionIds: a.occasionIds, node: <ArrangementBucket item={a} index={i} /> }))}
          emptyText="Nothing in the buckets for that occasion right now. Ask us for florist’s choice."
        />
      </div>
    </section>

    <SizeGuide>
      <SizeGuide.Heading>How sizes work</SizeGuide.Heading>
      <SizeGuide.Introduction>Same flowers, more of them. Not sure? Classic is what most people send.</SizeGuide.Introduction>
    </SizeGuide>

    <FloristsChoice>
      <FloristsChoice.Heading>Florist’s choice</FloristsChoice.Heading>
      <FloristsChoice.Note>{floristsChoice}</FloristsChoice.Note>
      <FloristsChoice.Action>Ask for florist’s choice</FloristsChoice.Action>
    </FloristsChoice>

    <CtaBand>
      <CtaBand.Text>
        <CtaBand.Heading>Found the one? <em>Tell us where it’s going.</em></CtaBand.Heading>
        <CtaBand.Introduction>Name the arrangement and size, the suburb and the day. We’ll reply to confirm stems, timing and payment.</CtaBand.Introduction>
      </CtaBand.Text>
      <CtaBand.Action>Send an order enquiry</CtaBand.Action>
    </CtaBand>
  </>;
}
