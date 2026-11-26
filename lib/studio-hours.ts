import type { Closure } from '../content/delivery.ts';
import { DAYS, validateHours, type OpeningHours } from './hours.ts';
import { addDays, formatClock, localMoment, toMinutes } from './local-time.ts';

/** "8am–6pm" for a day, or "Closed". */
export function formatHours(entry: OpeningHours): string {
  return entry.opens && entry.closes ? `${formatClock(entry.opens)}–${formatClock(entry.closes)}` : 'Closed';
}

/**
 * Open-now label that also respects dated closures. Browser-only: static output shows the hours list.
 * Opening is inclusive and closing exclusive; overnight hours are rejected by validateHours.
 */
export function studioLabel(hours: readonly OpeningHours[], closures: readonly Closure[], timeZone: string, now = new Date()): string {
  const fallback = 'See studio hours';
  const local = localMoment(now, timeZone);
  if (!local) return fallback;
  validateHours(hours);
  const entryFor = (day: string) => hours.find(entry => entry.day === day)!;
  const closure = closures.find(entry => entry.date === local.date);
  const today = entryFor(local.day);
  if (!closure && today.opens && today.closes && local.minutes >= toMinutes(today.opens) && local.minutes < toMinutes(today.closes)) {
    return `Open now · until ${formatClock(today.closes)}`;
  }
  for (let offset = 0; offset <= 14; offset++) {
    const candidate = addDays(local.date, offset);
    const entry = entryFor(candidate.day);
    if (!entry.opens || closures.some(c => c.date === candidate.date)) continue;
    if (offset === 0 && local.minutes >= toMinutes(entry.opens)) continue;
    const when = offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : candidate.day;
    return `${closure ? `Closed today · ${closure.label}` : 'Closed now'} · opens ${when} at ${formatClock(entry.opens)}`;
  }
  return 'Closed · see studio hours';
}

/** Group consecutive days with identical hours: "Mon–Fri 8am–6pm". */
export function hoursSummary(hours: readonly OpeningHours[]): { days: string; hours: string }[] {
  const short = (day: string) => day.slice(0, 3);
  const rows: { from: string; to: string; hours: string }[] = [];
  for (const day of DAYS) {
    const text = formatHours(hours.find(entry => entry.day === day)!);
    const last = rows.at(-1);
    if (last && last.hours === text) last.to = day; else rows.push({ from: day, to: day, hours: text });
  }
  return rows.map(row => ({ days: row.from === row.to ? short(row.from) : `${short(row.from)}–${short(row.to)}`, hours: row.hours }));
}
