import assert from 'node:assert/strict';
import { test } from 'node:test';
import { closures, cutOffs } from '../content/delivery.ts';
import { business } from '../content/business.ts';
import { formatClock } from '../lib/local-time.ts';
import { sameDayCopy, sameDayStatus } from '../lib/same-day.ts';
import { studioLabel } from '../lib/studio-hours.ts';

const zone = 'Australia/Melbourne';
const at = (iso: string, zoneCutOff?: string) => sameDayStatus({ now: new Date(iso), timeZone: zone, cutOffs, closures, zoneCutOff });
const copy = (iso: string, zoneCutOff?: string) => sameDayCopy(at(iso, zoneCutOff)!);

// Melbourne is UTC+11 (AEDT) in November.
test('weekday cut-off is 13:00 local, exclusive', () => {
  assert.deepEqual(at('2026-11-24T01:59:00Z'), { kind: 'open', cutOff: '13:00', minutesLeft: 1 }); // Tue 12:59
  assert.equal(copy('2026-11-24T01:59:00Z').detail, '1 min to go for same-day');
  assert.equal(at('2026-11-24T02:00:00Z')!.kind, 'passed'); // Tue 13:00
  assert.deepEqual(copy('2026-11-24T02:00:00Z'), { headline: 'Today’s cut-off has passed', detail: 'Next delivery tomorrow · ask by 1pm' });
  assert.equal(copy('2026-11-23T21:46:00Z').detail, '4 h 14 m to go for same-day'); // Tue 08:46
});

test('Saturday closes same-day at 11:00 and Sunday names Monday', () => {
  assert.equal(at('2026-11-27T23:59:00Z')!.kind, 'open'); // Sat 10:59
  const sat = copy('2026-11-28T00:00:00Z'); // Sat 11:00
  assert.equal(sat.detail, 'Next delivery Monday · ask by 1pm');
  assert.equal(at('2026-11-29T00:00:00Z')!.kind, 'no-delivery'); // Sun 11:00
  assert.deepEqual(copy('2026-11-29T00:00:00Z'), { headline: 'No deliveries today', detail: 'Studio collection only · next delivery tomorrow · ask by 1pm' });
});

test('a zone cut-off takes the earlier of the two times', () => {
  assert.equal(at('2026-11-24T00:59:00Z', '12:00')!.kind, 'open'); // Tue 11:59
  assert.equal(at('2026-11-24T01:00:00Z', '12:00')!.kind, 'passed'); // Tue 12:00
  assert.equal(copy('2026-11-24T00:30:00Z', '12:00').headline, 'Ask by noon today');
  assert.deepEqual(at('2026-11-27T23:00:00Z', '12:00'), { kind: 'open', cutOff: '11:00', minutesLeft: 60 }); // Sat 10:00 keeps 11:00
});

test('dated closures are skipped when naming the next delivery day', () => {
  const christmasEve = at('2026-12-24T03:00:00Z'); // Thu 24 Dec 14:00, after cut-off
  assert.equal(christmasEve!.kind, 'passed');
  assert.equal((christmasEve as { next: { date: string } }).next.date, '2026-12-28'); // skips 25, 26 (Sat closure), 27 (Sun)
  assert.deepEqual(copy('2026-12-24T22:00:00Z'), { headline: 'Closed today · Christmas Day', detail: 'Next delivery Monday · ask by 1pm' });
});

test('daylight-saving changes keep local cut-offs', () => {
  // AEDT ends Sun 5 Apr 2026 (UTC+11 → +10). Monday 6 Apr cut-off 13:00 = 03:00Z.
  assert.equal(at('2026-04-06T02:59:00Z')!.kind, 'open');
  assert.equal(at('2026-04-06T03:00:00Z')!.kind, 'passed');
  // AEDT starts Sun 4 Oct 2026 (UTC+10 → +11). Monday 5 Oct cut-off 13:00 = 02:00Z.
  assert.equal(at('2026-10-05T01:59:00Z')!.kind, 'open');
  assert.equal(at('2026-10-05T02:00:00Z')!.kind, 'passed');
  // Saturday before the change: 11:00 AEST = 01:00Z.
  assert.equal(at('2026-10-03T00:59:00Z')!.kind, 'open');
  assert.equal(at('2026-10-03T01:00:00Z')!.kind, 'passed');
});

test('missing or unknown zones stay neutral', () => {
  assert.equal(sameDayStatus({ now: new Date(), timeZone: '', cutOffs, closures }), null);
  assert.equal(sameDayStatus({ now: new Date(), timeZone: 'Mars/Base', cutOffs, closures }), null);
});

test('studio open-now boundaries for every day, and closures', () => {
  const label = (iso: string) => studioLabel(business.hours, closures, zone, new Date(iso));
  // Mon 23 Nov 2026 .. Sun 29 Nov 2026, AEDT (UTC+11).
  const days = ['2026-11-23', '2026-11-24', '2026-11-25', '2026-11-26', '2026-11-27', '2026-11-28', '2026-11-29'];
  for (const [i, date] of days.entries()) {
    const entry = business.hours[i];
    const utc = (hhmm: string, deltaMin: number) => {
      const [h, m] = hhmm.split(':').map(Number);
      return new Date(Date.parse(`${date}T00:00:00+11:00`) + (h * 60 + m + deltaMin) * 60_000).toISOString();
    };
    assert.match(label(utc(entry.opens!, -1)), /^Closed now · opens today/, `${entry.day} before opening`);
    assert.equal(label(utc(entry.opens!, 0)), `Open now · until ${formatClock(entry.closes!)}`, `${entry.day} at opening`);
    assert.equal(label(utc(entry.closes!, -1)), `Open now · until ${formatClock(entry.closes!)}`, `${entry.day} last minute`);
    assert.match(label(utc(entry.closes!, 0)), /^Closed now · opens tomorrow at (8am|9am)$/, `${entry.day} at closing`);
  }
  assert.equal(label('2026-12-24T23:00:00Z'), 'Closed today · Christmas Day · opens Sunday at 9am');
  assert.equal(studioLabel(business.hours, closures, '', new Date()), 'See studio hours');
});
