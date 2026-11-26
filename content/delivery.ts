// Delivery zones, same-day cut-offs and dated closures. All times are local to site.config.json's
// time zone (Australia/Melbourne). Frequent owner edits: cut-off times, closures, suburbs and fees.
import type { Day } from '../lib/hours.ts';

export interface Suburb {
  /** Stable URL-safe ID. */
  id: string;
  name: string;
  /** Four-digit Victorian postcode. */
  postcode: string;
}

export interface DeliveryZone {
  /** Stable URL-safe ID. */
  id: string;
  /** Zone name shown on the bloom map. */
  name: string;
  /** Delivery fee in whole AUD. */
  fee: number;
  /**
   * Optional earlier same-day cut-off (HH:MM) for this zone. The zone's cut-off is the earlier of
   * this and the day's cut-off, so Saturday's 11:00 still applies to every zone.
   */
  sameDayCutOffOverride?: string;
  suburbs: Suburb[];
}

export interface CutOff {
  day: Day;
  /** Latest local HH:MM for a same-day enquiry, or null when there are no deliveries that day. */
  time: string | null;
}

export interface Closure {
  /** Local date, YYYY-MM-DD. The studio is closed and nothing is delivered. */
  date: string;
  label: string;
}

export const deliveryZones: DeliveryZone[] = [
  {
    id: 'zone-a', name: 'Inner circle', fee: 15,
    suburbs: [
      { id: 'melbourne-cbd', name: 'Melbourne CBD', postcode: '3000' },
      { id: 'carlton', name: 'Carlton', postcode: '3053' },
      { id: 'fitzroy', name: 'Fitzroy', postcode: '3065' },
      { id: 'collingwood', name: 'Collingwood', postcode: '3066' },
      { id: 'north-melbourne', name: 'North Melbourne', postcode: '3051' },
      { id: 'southbank', name: 'Southbank', postcode: '3006' },
      { id: 'docklands', name: 'Docklands', postcode: '3008' },
      { id: 'richmond', name: 'Richmond', postcode: '3121' },
      { id: 'south-yarra', name: 'South Yarra', postcode: '3141' },
      { id: 'east-melbourne', name: 'East Melbourne', postcode: '3002' },
    ],
  },
  {
    id: 'zone-b', name: 'Middle ring', fee: 22,
    suburbs: [
      { id: 'brunswick', name: 'Brunswick', postcode: '3056' },
      { id: 'northcote', name: 'Northcote', postcode: '3070' },
      { id: 'st-kilda', name: 'St Kilda', postcode: '3182' },
      { id: 'prahran', name: 'Prahran', postcode: '3181' },
      { id: 'footscray', name: 'Footscray', postcode: '3011' },
      { id: 'hawthorn', name: 'Hawthorn', postcode: '3122' },
      { id: 'kew', name: 'Kew', postcode: '3101' },
      { id: 'port-melbourne', name: 'Port Melbourne', postcode: '3207' },
      { id: 'abbotsford', name: 'Abbotsford', postcode: '3067' },
      { id: 'fitzroy-north', name: 'Fitzroy North', postcode: '3068' },
    ],
  },
  {
    id: 'zone-c', name: 'Outer petals', fee: 30, sameDayCutOffOverride: '12:00',
    suburbs: [
      { id: 'coburg', name: 'Coburg', postcode: '3058' },
      { id: 'preston', name: 'Preston', postcode: '3072' },
      { id: 'elwood', name: 'Elwood', postcode: '3184' },
      { id: 'brighton', name: 'Brighton', postcode: '3186' },
      { id: 'camberwell', name: 'Camberwell', postcode: '3124' },
      { id: 'williamstown', name: 'Williamstown', postcode: '3016' },
      { id: 'essendon', name: 'Essendon', postcode: '3040' },
      { id: 'thornbury', name: 'Thornbury', postcode: '3071' },
    ],
  },
];

export const cutOffs: CutOff[] = [
  { day: 'Monday', time: '13:00' },
  { day: 'Tuesday', time: '13:00' },
  { day: 'Wednesday', time: '13:00' },
  { day: 'Thursday', time: '13:00' },
  { day: 'Friday', time: '13:00' },
  { day: 'Saturday', time: '11:00' },
  { day: 'Sunday', time: null },
];

export const closures: Closure[] = [
  { date: '2026-12-25', label: 'Christmas Day' },
  { date: '2026-12-26', label: 'Boxing Day' },
  { date: '2027-01-01', label: 'New Year’s Day' },
  { date: '2027-03-26', label: 'Good Friday' },
  { date: '2027-12-25', label: 'Christmas Day' },
  { date: '2027-12-26', label: 'Boxing Day' },
];

export const deliveryWindows = 'Weekday deliveries 10am–5pm; Saturday 10am–2pm.';

export const deliveryNotes: { id: string; title: string; text: string }[] = [
  { id: 'windows', title: 'Delivery windows', text: `${deliveryWindows} We can’t promise an exact time, but tell us about a lunch break or a school pick-up and we’ll aim around it.` },
  { id: 'no-one-home', title: 'If no-one’s home', text: 'We leave flowers somewhere shady and safe and text a photo. If there’s nowhere safe, they come back to the studio and we arrange another try.' },
  { id: 'offices', title: 'Hospitals and offices', text: 'Most wards and reception desks are fine. Tell us the ward or level, and check the hospital allows fresh flowers.' },
  { id: 'closures', title: 'Public holidays', text: 'The studio is closed on Christmas Day, Boxing Day, New Year’s Day and Good Friday. Send your enquiry early for Mother’s Day and Valentine’s Day.' },
];
