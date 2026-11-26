import type { Metadata } from 'next';
import { CtaBand } from '../../components/arrangement-sections';
import { LookupTag, Notes, Timetable, Zones } from '../../components/delivery-sections';
import { PageHead } from '../../components/page-head';
import { SameDayTag } from '../../components/same-day-tag';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Delivery & same-day cut-offs',
  description: 'Flower delivery across inner Melbourne from $15. Same-day when you ask by 1pm weekdays or 11am Saturdays; check your suburb and zone.',
  alternates: { canonical: absoluteUrl('/delivery/') },
};

// Delivery page copy. Zones, suburbs, cut-offs and closures live in content/delivery.ts.
export default function DeliveryPage() {
  return <>
    <PageHead eyebrow="Delivery" title={<>Out the door <em>by bike and van</em></>} aside={<SameDayTag className="w-[15rem]" idle twine={64} />}>
      <p>We deliver across three rings of inner Melbourne, six days a week. Ask before the cut-off and your flowers can
        usually go out the same day once we confirm.</p>
    </PageHead>

    <LookupTag />

    <Zones>
      <Zones.Heading>The <em>bloom map</em></Zones.Heading>
      <Zones.Introduction>
        Three rings around the studio. The further the petal, the earlier we need to hear from you.
      </Zones.Introduction>
    </Zones>

    <Timetable>
      <Timetable.Heading>Same-day <em>cut-offs</em></Timetable.Heading>
      <Timetable.Introduction>
        Times are Melbourne time. After the cut-off we’ll suggest the next delivery day when we reply.
      </Timetable.Introduction>
    </Timetable>

    <Notes>
      <Notes.Heading>Good to <em>know</em></Notes.Heading>
      <Notes.Introduction>The small print, written large.</Notes.Introduction>
    </Notes>

    <CtaBand tone="sage">
      <CtaBand.Text>
        <CtaBand.Heading>Ready when <em>you are</em></CtaBand.Heading>
        <CtaBand.Introduction>Send the suburb, the day and what you’d like. We’ll reply with timing and the delivery fee.</CtaBand.Introduction>
      </CtaBand.Text>
      <CtaBand.Action>Send an order enquiry</CtaBand.Action>
    </CtaBand>
  </>;
}
