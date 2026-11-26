import type { Metadata } from 'next';
import { BucketsWeek, Closing, DeliveryStrip, FeaturedShelf, Hero, OccasionEnvelopes, StudioVisit, WeddingTeaser } from '../components/home-sections';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

// Home page copy, in the order visitors see it. Layout and art live in components/home-sections.tsx.
export default function HomePage() {
  return <>
    <Hero>
      <Hero.Eyebrow>Florist · Queen Victoria Market, Melbourne</Hero.Eyebrow>
      <Hero.Heading>Armfuls of <em>peonies</em>, delivered today.</Hero.Heading>
      <Hero.Introduction>
        Loose, garden-style flowers cut to the season in our studio beside Queen Victoria Market. Same-day
        delivery across inner Melbourne when you ask by the cut-off.
      </Hero.Introduction>
      <Hero.Actions>
        <Hero.PrimaryAction>Send an order enquiry</Hero.PrimaryAction>
        <Hero.SecondaryAction>Browse arrangements</Hero.SecondaryAction>
      </Hero.Actions>
    </Hero>

    <BucketsWeek>
      <BucketsWeek.Heading>In the buckets <em>this week</em></BucketsWeek.Heading>
      <BucketsWeek.Note>
        Peony season is here and it never lasts long enough. This is what came in from the growers on
        Monday morning, and how much of it is left.
      </BucketsWeek.Note>
    </BucketsWeek>

    <OccasionEnvelopes>
      <OccasionEnvelopes.Heading>Flowers for…</OccasionEnvelopes.Heading>
      <OccasionEnvelopes.Introduction>
        Pick the moment and we’ll show you what suits it. Every arrangement comes with a handwritten card.
      </OccasionEnvelopes.Introduction>
    </OccasionEnvelopes>

    <FeaturedShelf>
      <FeaturedShelf.Heading>Straight from the <em>buckets</em></FeaturedShelf.Heading>
      <FeaturedShelf.Link>See all arrangements</FeaturedShelf.Link>
    </FeaturedShelf>

    <WeddingTeaser>
      <WeddingTeaser.Heading>Wedding flowers, pressed into memory</WeddingTeaser.Heading>
      <WeddingTeaser.Introduction>
        From a registry-office posy to a meadow arch for a hundred and fifty guests. We start with a chat
        about your day and the season, then design the flowers around both.
      </WeddingTeaser.Introduction>
      <WeddingTeaser.Link>Explore wedding flowers</WeddingTeaser.Link>
    </WeddingTeaser>

    <DeliveryStrip>
      <DeliveryStrip.Heading>Across inner Melbourne, <em>today</em></DeliveryStrip.Heading>
      <DeliveryStrip.Introduction>
        Three rings around the studio, from the CBD out to Brighton and Coburg. Enquiries that reach us
        before the cut-off can usually go out the same day once we confirm.
      </DeliveryStrip.Introduction>
    </DeliveryStrip>

    <StudioVisit>
      <StudioVisit.Heading>Come and <em>smell</em> the peonies</StudioVisit.Heading>
      <StudioVisit.Introduction>
        The studio door is always propped open. Pick your own stems from the buckets and we’ll wrap them
        while you wait.
      </StudioVisit.Introduction>
    </StudioVisit>

    <Closing>
      <Closing.Heading>Tell us who they’re for. <em>We’ll do the rest.</em></Closing.Heading>
      <Closing.Introduction>
        Send the occasion, the suburb and a budget. We’ll reply with what’s best in the buckets and a delivery time.
      </Closing.Introduction>
      <Closing.Action>Send an order enquiry</Closing.Action>
    </Closing>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
  </>;
}
