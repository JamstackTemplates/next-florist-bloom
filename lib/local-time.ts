import { DAYS, type Day } from './hours.ts';

/** A moment as seen on the studio's wall clock in a given IANA zone. */
export interface LocalMoment {
  /** YYYY-MM-DD in the zone. */
  date: string;
  day: Day;
  /** Minutes since local midnight. */
  minutes: number;
}

/** Wall-clock parts in `timeZone`, or null when the zone is missing or unknown. */
export function localMoment(now: Date, timeZone: string): LocalMoment | null {
  if (!timeZone) return null;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
    }).formatToParts(now);
  } catch { return null; }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const day = part('weekday') as Day;
  if (!DAYS.includes(day)) return null;
  return { date: `${part('year')}-${part('month')}-${part('day')}`, day, minutes: Number(part('hour')) * 60 + Number(part('minute')) };
}

/** Calendar arithmetic on a local date; independent of time zones and DST. */
export function addDays(date: string, offset: number): { date: string; day: Day } {
  const [y, m, d] = date.split('-').map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + offset));
  const iso = next.toISOString().slice(0, 10);
  return { date: iso, day: DAYS[(next.getUTCDay() + 6) % 7] };
}

export const clockPattern = /^([01]\d|2[0-3]):[0-5]\d$/;
export const toMinutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

/** "13:00" → "1pm", "12:00" → "noon", "09:30" → "9:30am". */
export function formatClock(value: string): string {
  const total = toMinutes(value);
  if (total === 12 * 60) return 'noon';
  const hour = Math.floor(total / 60), minute = total % 60;
  const suffix = hour < 12 ? 'am' : 'pm';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}${minute ? `:${String(minute).padStart(2, '0')}` : ''}${suffix}`;
}

/** "2026-11-23" → "23 November". */
export function formatDayMonth(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)));
}
