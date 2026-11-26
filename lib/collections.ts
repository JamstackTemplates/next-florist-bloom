import type { Arrangement } from '../content/arrangements.ts';
import { deliveryZones, type DeliveryZone, type Suburb } from '../content/delivery.ts';
import type { StemStatus } from '../content/in-season.ts';

/** Arrangements for an occasion; an unknown or empty occasion returns them all. */
export function filterByOccasion<T extends Pick<Arrangement, 'occasionIds'>>(items: readonly T[], occasionId: string | null, known: readonly string[]): T[] {
  if (!occasionId || !known.includes(occasionId)) return [...items];
  return items.filter(item => item.occasionIds.includes(occasionId));
}

/** Handwritten status on the specimen sheet. */
export const stemStatusLabel: Record<StemStatus, string> = { plenty: 'plenty', limited: 'a few left', 'last-week': 'nearly gone' };

/** Lowest listed price, for "from $" tags. */
export function fromPrice(item: Pick<Arrangement, 'prices'>): number {
  return Math.min(...[item.prices.petite, item.prices.classic, item.prices.lush].filter((p): p is number => typeof p === 'number'));
}

export function inSeasonNow(item: Pick<Arrangement, 'seasonal'>, month: number): boolean {
  if (!item.seasonal) return false;
  const { from, to } = item.seasonal;
  return from <= to ? month >= from && month <= to : month >= from || month <= to;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const seasonLabel = (seasonal: { from: number; to: number }) => `${MONTHS[seasonal.from - 1]}–${MONTHS[seasonal.to - 1]}`;

export interface SuburbMatch { suburb: Suburb; zone: DeliveryZone }

const fold = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g, '');

/** Suburbs whose name or postcode starts with (or, for names, contains) the query; prefix matches first. */
export function findSuburbs(query: string, zones: readonly DeliveryZone[] = deliveryZones, limit = 6): SuburbMatch[] {
  const q = fold(query);
  if (!q) return [];
  const all = zones.flatMap(zone => zone.suburbs.map(suburb => ({ suburb, zone })));
  const score = ({ suburb }: SuburbMatch) => {
    const name = fold(suburb.name);
    if (suburb.postcode.startsWith(q) || name.startsWith(q)) return 0;
    if (name.includes(q)) return 1;
    return -1;
  };
  return all.filter(match => score(match) >= 0).sort((a, b) => score(a) - score(b)).slice(0, limit);
}

export const aud = (value: number) => `$${value.toLocaleString('en-AU')}`;
