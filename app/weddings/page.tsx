import type { Metadata } from 'next';
import { CtaBand } from '../../components/arrangement-sections';
import { BridalPosy } from '../../components/art/objects';
import { PageHead } from '../../components/page-head';
import { Collections, Ledger, Process, Seasons } from '../../components/wedding-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Wedding flowers',
  description: 'Seasonal wedding flowers from a Melbourne studio: three collections from $650, bridal bouquets, ceremony urns, meadow arches and long-table garlands.',
  alternates: { canonical: absoluteUrl('/weddings/') },
};

// Weddings page copy. Collections, pieces and seasons live in content/weddings.ts.
export default function WeddingsPage() {
  return <>
    <PageHead eyebrow="Wedding flowers" title={<>Flowers for <em>the day</em> you’ll keep</>} art={<BridalPosy />}>
      <p>Garden-style wedding flowers designed around your season, your venue and how you want the day to feel.
        Every wedding starts with an unhurried conversation.</p>
    </PageHead>

    <Collections>
      <Collections.Heading>Three <em>collections</em></Collections.Heading>
      <Collections.Introduction>
        Starting points, not set menus. Each collection is reshaped around your flowers, palette and guest count.
      </Collections.Introduction>
    </Collections>

    <Ledger>
      <Ledger.Heading>Piece <em>by piece</em></Ledger.Heading>
      <Ledger.Introduction>
        For smaller weddings or adding to a collection. Prices are starting points and depend on the
        flowers in season on your date.
      </Ledger.Introduction>
    </Ledger>

    <Process>
      <Process.Heading>From first chat <em>to the day</em></Process.Heading>
      <Process.Steps>
        <Process.Step title="Say hello">Send your date, venues and a rough budget. We’ll reply within two working days to say whether we’re free.</Process.Step>
        <Process.Step title="Meet at the studio">Thirty minutes among the buckets, looking at what grows in your season and what you love.</Process.Step>
        <Process.Step title="Your proposal">A written proposal with sketches, stems and an itemised quote. A deposit holds the date once you’re happy.</Process.Step>
        <Process.Step title="The morning of">We cut, build and deliver, then set up the ceremony and tables so you never have to think about it.</Process.Step>
      </Process.Steps>
    </Process>

    <Seasons>
      <Seasons.Heading>What blooms <em>when</em></Seasons.Heading>
      <Seasons.Introduction>We work with what’s growing. It looks better, lasts longer and costs less than forcing the off-season.</Seasons.Introduction>
    </Seasons>

    <CtaBand>
      <CtaBand.Text>
        <CtaBand.Heading>Tell us about <em>your day</em></CtaBand.Heading>
        <CtaBand.Introduction>Your date, venues, guest count, palette and a rough flower budget are all we need to start.</CtaBand.Introduction>
      </CtaBand.Text>
      <CtaBand.Action>Ask about your wedding</CtaBand.Action>
    </CtaBand>
  </>;
}
