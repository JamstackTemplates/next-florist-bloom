// Content validation used by the tests. Every failure names the item and field to fix.
import { arrangements as defaultArrangements, type Arrangement } from '../content/arrangements.ts';
import { business } from '../content/business.ts';
import { closures as defaultClosures, cutOffs as defaultCutOffs, deliveryZones as defaultZones, type Closure, type CutOff, type DeliveryZone } from '../content/delivery.ts';
import { inSeason as defaultInSeason, weekOf as defaultWeekOf, type SeasonalStem } from '../content/in-season.ts';
import { occasions as defaultOccasions, type Occasion } from '../content/occasions.ts';
import { weddingCollections, weddingMinimumSpend, weddingPieces, type WeddingCollection, type WeddingPiece } from '../content/weddings.ts';
import { DAYS, validateHours, type OpeningHours } from './hours.ts';
import { clockPattern, toMinutes } from './local-time.ts';

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function fail(message: string): never { throw new Error(message); }

export function checkIds(label: string, items: readonly { id: string }[]): void {
  const seen = new Set<string>();
  for (const [index, item] of items.entries()) {
    if (!ID.test(item.id ?? '')) fail(`${label}[${index}] "${item.id}": id must be lowercase letters, numbers and single hyphens`);
    if (seen.has(item.id)) fail(`${label} "${item.id}": duplicate id`);
    seen.add(item.id);
  }
}

const required = (label: string, value: unknown) => {
  if (typeof value !== 'string' || !value.trim()) fail(`${label}: required`);
};
const wholePrice = (label: string, value: number) => {
  if (!Number.isInteger(value) || value <= 0) fail(`${label}: must be a positive whole number of dollars (got ${value})`);
};

export function isValidDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

export function checkOccasions(occasions: readonly Occasion[] = defaultOccasions): void {
  checkIds('occasions', occasions);
  for (const o of occasions) { required(`occasion "${o.id}".name`, o.name); required(`occasion "${o.id}".blurb`, o.blurb); }
}

export function checkArrangements(arrangements: readonly Arrangement[] = defaultArrangements, occasions: readonly Occasion[] = defaultOccasions): void {
  checkIds('arrangements', arrangements);
  const known = new Set(occasions.map(o => o.id));
  for (const a of arrangements) {
    const at = `arrangement "${a.id}"`;
    required(`${at}.name`, a.name);
    required(`${at}.description`, a.description);
    required(`${at}.palette`, a.palette);
    if (!a.stems.length || a.stems.some(s => !s.trim())) fail(`${at}.stems: list at least one stem, with no blanks`);
    if (!a.occasionIds.length) fail(`${at}.occasionIds: choose at least one occasion`);
    for (const id of a.occasionIds) if (!known.has(id)) fail(`${at}.occasionIds: unknown occasion "${id}"`);
    if (a.prices.classic === undefined) fail(`${at}.prices.classic: required`);
    const sizes = (['petite', 'classic', 'lush'] as const).filter(size => a.prices[size] !== undefined);
    for (const size of sizes) wholePrice(`${at}.prices.${size}`, a.prices[size]!);
    for (let i = 1; i < sizes.length; i++) {
      if (a.prices[sizes[i]]! <= a.prices[sizes[i - 1]]!) fail(`${at}.prices: ${sizes[i - 1]} must cost less than ${sizes[i]}`);
    }
    if (a.seasonal) {
      for (const key of ['from', 'to'] as const) {
        const month = a.seasonal[key];
        if (!Number.isInteger(month) || month < 1 || month > 12) fail(`${at}.seasonal.${key}: month must be 1–12 (got ${month})`);
      }
    }
    if (typeof a.available !== 'boolean') fail(`${at}.available: true or false`);
  }
}

export function checkInSeason(stems: readonly SeasonalStem[] = defaultInSeason, weekOf = defaultWeekOf): void {
  checkIds('inSeason', stems);
  if (!isValidDate(weekOf)) fail(`inSeason weekOf "${weekOf}": use a real date as YYYY-MM-DD`);
  for (const s of stems) {
    required(`in-season "${s.id}".name`, s.name);
    if (!['plenty', 'limited', 'last-week'].includes(s.status)) fail(`in-season "${s.id}".status: plenty, limited or last-week`);
  }
}

export function checkWeddings(collections: readonly WeddingCollection[] = weddingCollections, pieces: readonly WeddingPiece[] = weddingPieces, minimum = weddingMinimumSpend): void {
  checkIds('weddingCollections', collections);
  checkIds('weddingPieces', pieces);
  for (const c of collections) {
    wholePrice(`wedding collection "${c.id}".fromPrice`, c.fromPrice);
    if (c.fromPrice < minimum) fail(`wedding collection "${c.id}".fromPrice: below the $${minimum} minimum spend`);
    if (!c.includes.length) fail(`wedding collection "${c.id}".includes: list what's included`);
  }
  for (const p of pieces) wholePrice(`wedding piece "${p.id}".fromPrice`, p.fromPrice);
}

export function checkDelivery(
  zones: readonly DeliveryZone[] = defaultZones, cutOffs: readonly CutOff[] = defaultCutOffs,
  closures: readonly Closure[] = defaultClosures, hours: readonly OpeningHours[] = business.hours,
): void {
  checkIds('deliveryZones', zones);
  checkIds('suburbs', zones.flatMap(zone => zone.suburbs));
  const postcodes = new Map<string, string>();
  const names = new Map<string, string>();
  for (const zone of zones) {
    wholePrice(`delivery zone "${zone.id}".fee`, zone.fee);
    if (zone.sameDayCutOffOverride !== undefined && !clockPattern.test(zone.sameDayCutOffOverride)) {
      fail(`delivery zone "${zone.id}".sameDayCutOffOverride: use HH:MM`);
    }
    for (const suburb of zone.suburbs) {
      if (!/^\d{4}$/.test(suburb.postcode)) fail(`suburb "${suburb.id}".postcode: four digits`);
      const key = suburb.name.trim().toLowerCase();
      if (names.has(key)) fail(`suburb "${suburb.id}": "${suburb.name}" is already listed in ${names.get(key)}`);
      if (postcodes.has(suburb.postcode)) fail(`suburb "${suburb.id}": postcode ${suburb.postcode} is already listed for ${postcodes.get(suburb.postcode)}`);
      names.set(key, zone.id);
      postcodes.set(suburb.postcode, suburb.id);
    }
  }
  validateHours(hours);
  for (const day of DAYS) {
    const matches = cutOffs.filter(entry => entry.day === day);
    if (matches.length !== 1) fail(`cutOffs: ${day} must occur exactly once`);
    const { time } = matches[0];
    if (time === null) continue;
    if (!clockPattern.test(time)) fail(`cutOffs: ${day} time "${time}" must be HH:MM or null`);
    const open = hours.find(entry => entry.day === day)!;
    if (!open.opens || !open.closes) fail(`cutOffs: ${day} has a cut-off but the studio is closed that day`);
    if (toMinutes(time) <= toMinutes(open.opens) || toMinutes(time) >= toMinutes(open.closes)) {
      fail(`cutOffs: ${day} cut-off ${time} must fall inside studio hours (${open.opens}–${open.closes})`);
    }
  }
  const dates = new Set<string>();
  for (const c of closures) {
    if (!isValidDate(c.date)) fail(`closures "${c.label}": date "${c.date}" must be a real YYYY-MM-DD date`);
    if (dates.has(c.date)) fail(`closures: ${c.date} listed twice`);
    required(`closures ${c.date}.label`, c.label);
    dates.add(c.date);
  }
}

export function checkAllContent(): void {
  checkOccasions();
  checkArrangements();
  checkInSeason();
  checkWeddings();
  checkDelivery();
  const featured = defaultArrangements.filter(a => a.featured);
  if (featured.length < 1 || featured.length > 4) fail(`arrangements: feature between one and four on Home (now ${featured.length})`);
}
