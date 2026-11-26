import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { arrangements, type Arrangement } from '../content/arrangements.ts';
import { business } from '../content/business.ts';
import { closures, cutOffs, deliveryZones } from '../content/delivery.ts';
import { inSeason } from '../content/in-season.ts';
import { occasions } from '../content/occasions.ts';
import { weddingCollections, weddingPieces } from '../content/weddings.ts';
import { checkAllContent, checkArrangements, checkDelivery, checkInSeason, checkWeddings } from '../lib/content-checks.ts';
import { aud, filterByOccasion, findSuburbs, fromPrice, inSeasonNow, stemStatusLabel } from '../lib/collections.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const peony = arrangements.find(a => a.id === 'peony-armful')!;
const edit = (patch: Partial<Arrangement>) => arrangements.map(a => a.id === peony.id ? { ...a, ...patch } : a);

test('the shipped content passes every check', () => {
  assert.doesNotThrow(checkAllContent);
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  for (const tip of [...business.enquiries.order, ...business.enquiries.wedding]) assert.ok(tip.trim(), 'business.enquiries: empty tip');
});

test('arrangement failures name the item and field', () => {
  assert.throws(() => checkArrangements(edit({ id: 'Peony Armful' })), /"Peony Armful": id must be/);
  assert.throws(() => checkArrangements([...arrangements, { ...peony }]), /"peony-armful": duplicate id/);
  assert.throws(() => checkArrangements(edit({ occasionIds: ['birthday', 'graduation'] })), /"peony-armful".occasionIds: unknown occasion "graduation"/);
  assert.throws(() => checkArrangements(edit({ prices: { petite: 95 } as never })), /"peony-armful".prices.classic: required/);
  assert.throws(() => checkArrangements(edit({ prices: { classic: 0 } })), /"peony-armful".prices.classic: must be a positive whole/);
  assert.throws(() => checkArrangements(edit({ prices: { classic: 99.5 } })), /prices.classic: must be a positive whole/);
  assert.throws(() => checkArrangements(edit({ prices: { petite: 150, classic: 145 } })), /"peony-armful".prices: petite must cost less than classic/);
  assert.throws(() => checkArrangements(edit({ prices: { classic: 145, lush: 140 } })), /classic must cost less than lush/);
  assert.throws(() => checkArrangements(edit({ seasonal: { from: 0, to: 12 } })), /"peony-armful".seasonal.from: month must be 1–12/);
  assert.throws(() => checkArrangements(edit({ seasonal: { from: 10, to: 13 } })), /seasonal.to: month must be 1–12/);
  assert.throws(() => checkArrangements(edit({ stems: [] })), /"peony-armful".stems/);
});

test('in-season, wedding and delivery failures are item-specific', () => {
  assert.throws(() => checkInSeason([...inSeason, { ...inSeason[0] }]), /"peony-coral-charm": duplicate id/);
  assert.throws(() => checkInSeason(inSeason, '2026-02-30'), /weekOf "2026-02-30"/);
  assert.throws(() => checkWeddings(weddingCollections.map(c => c.id === 'the-posy' ? { ...c, fromPrice: 500 } : c)), /"the-posy".fromPrice: below the \$650 minimum/);
  assert.throws(() => checkWeddings(weddingCollections, [...weddingPieces, { id: 'buttonhole', name: 'x', fromPrice: 1, unit: 'each' }]), /"buttonhole": duplicate id/);
  const moved = deliveryZones.map(z => z.id === 'zone-c' ? { ...z, suburbs: [...z.suburbs, { id: 'carlton-2', name: 'Carlton', postcode: '3999' }] } : z);
  assert.throws(() => checkDelivery(moved), /"carlton-2": "Carlton" is already listed in zone-a/);
  const samePostcode = deliveryZones.map(z => z.id === 'zone-b' ? { ...z, suburbs: [...z.suburbs, { id: 'parkville', name: 'Parkville', postcode: '3053' }] } : z);
  assert.throws(() => checkDelivery(samePostcode), /"parkville": postcode 3053 is already listed for carlton/);
  assert.throws(() => checkDelivery(deliveryZones, cutOffs.map(c => c.day === 'Friday' ? { ...c, time: '1pm' } : c)), /Friday time "1pm"/);
  assert.throws(() => checkDelivery(deliveryZones, cutOffs.map(c => c.day === 'Saturday' ? { ...c, time: '16:30' } : c)), /Saturday cut-off 16:30 must fall inside studio hours/);
  assert.throws(() => checkDelivery(deliveryZones, cutOffs.slice(1)), /Monday must occur exactly once/);
  assert.throws(() => checkDelivery(deliveryZones, cutOffs, [...closures, { date: '2026-13-01', label: 'Typo' }]), /"Typo": date "2026-13-01"/);
  assert.throws(() => checkDelivery(deliveryZones.map(z => z.id === 'zone-c' ? { ...z, sameDayCutOffOverride: '12' } : z)), /"zone-c".sameDayCutOffOverride/);
});

test('occasion filter, prices, seasons and suburb lookup', () => {
  const ids = occasions.map(o => o.id);
  assert.deepEqual(filterByOccasion(arrangements, 'sympathy', ids).map(a => a.id), ['white-hush', 'eucalyptus-wreath']);
  assert.equal(filterByOccasion(arrangements, 'graduation', ids).length, arrangements.length);
  assert.equal(filterByOccasion(arrangements, null, ids).length, arrangements.length);
  assert.equal(fromPrice(peony), 95);
  assert.equal(fromPrice(arrangements.find(a => a.id === 'white-hush')!), 135);
  assert.equal(aud(5800), '$5,800');
  assert.ok(inSeasonNow(peony, 11) && !inSeasonNow(peony, 3));
  assert.ok(inSeasonNow({ seasonal: { from: 11, to: 2 } }, 1), 'seasons may wrap the new year');
  assert.equal(stemStatusLabel['last-week'], 'nearly gone');
  assert.equal(findSuburbs('3182')[0].suburb.name, 'St Kilda');
  assert.equal(findSuburbs('fitz').map(m => m.suburb.id).join(), 'fitzroy,fitzroy-north');
  assert.equal(findSuburbs('st kilda')[0].zone.id, 'zone-b');
  assert.equal(findSuburbs('elwood')[0].zone.sameDayCutOffOverride, '12:00');
  assert.deepEqual(findSuburbs('Geelong'), []);
});

test('Florist JSON-LD derives from content and escapes inline JSON', () => {
  const data = businessStructuredData();
  assert.equal(data['@type'], 'Florist');
  assert.equal(data.name, business.name);
  assert.equal(data.telephone, business.phone);
  assert.equal(data.openingHoursSpecification.length, 7);
  assert.deepEqual(data.openingHoursSpecification[5], { '@type': 'OpeningHoursSpecification', dayOfWeek: 'https://schema.org/Saturday', opens: '08:00', closes: '16:00' });
  assert.equal(data.areaServed.length, deliveryZones.reduce((n, z) => n + z.suburbs.length, 0));
  assert.ok(data.areaServed.some(p => p.name === 'Brunswick VIC 3056'));
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sources(path) : /\.(tsx?|mjs)$/.test(name) ? [path] : [];
  });
}

test('enquiry wording never implies an order, booking or payment is settled', () => {
  const root = new URL('..', import.meta.url).pathname;
  const files = ['app', 'components', 'content'].flatMap(dir => sources(join(root, dir)));
  const banned = [/order now/i, /\bbook(ed|ing|ings)?\b/i, /\bconfirmed\b/i, /\bbuy now\b/i, /add to cart/i, /\bcheckout\b/i, /pay (now|online)/i];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const pattern of banned) assert.doesNotMatch(text, pattern, `${file.replace(root, '')}: avoid ${pattern}`);
  }
  assert.match(business.enquiries.paymentNote, /don’t send card details/);
});
