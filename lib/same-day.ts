import type { Closure, CutOff } from '../content/delivery.ts';
import type { Day } from './hours.ts';
import { addDays, formatClock, localMoment, toMinutes } from './local-time.ts';

export interface NextDelivery {
  day: Day;
  date: string;
  /** HH:MM cut-off on that day. */
  cutOff: string;
  /** true when the next delivery day is tomorrow. */
  tomorrow: boolean;
}

export type SameDayStatus =
  | { kind: 'open'; cutOff: string; minutesLeft: number }
  | { kind: 'passed' | 'no-delivery'; next: NextDelivery | null }
  | { kind: 'closed'; label: string; next: NextDelivery | null };

/** The earlier of the day's cut-off and an optional zone cut-off; null when the day has no deliveries. */
export function effectiveCutOff(dayCutOff: string | null, zoneCutOff?: string): string | null {
  if (!dayCutOff) return null;
  if (!zoneCutOff) return dayCutOff;
  return toMinutes(zoneCutOff) < toMinutes(dayCutOff) ? zoneCutOff : dayCutOff;
}

/**
 * Same-day delivery status at `now` in the studio's zone. Browser-only callers supply the clock;
 * static output never computes it. Returns null without a valid zone.
 */
export function sameDayStatus(options: {
  now: Date; timeZone: string; cutOffs: readonly CutOff[]; closures: readonly Closure[]; zoneCutOff?: string;
}): SameDayStatus | null {
  const { now, timeZone, cutOffs, closures, zoneCutOff } = options;
  const local = localMoment(now, timeZone);
  if (!local) return null;
  const cutOffFor = (day: Day) => effectiveCutOff(cutOffs.find(entry => entry.day === day)?.time ?? null, zoneCutOff);
  const closure = (date: string) => closures.find(entry => entry.date === date);

  const findNext = (): NextDelivery | null => {
    for (let offset = 1; offset <= 21; offset++) {
      const candidate = addDays(local.date, offset);
      const cutOff = cutOffFor(candidate.day);
      if (cutOff && !closure(candidate.date)) return { ...candidate, cutOff, tomorrow: offset === 1 };
    }
    return null;
  };

  const closedToday = closure(local.date);
  if (closedToday) return { kind: 'closed', label: closedToday.label, next: findNext() };
  const today = cutOffFor(local.day);
  if (!today) return { kind: 'no-delivery', next: findNext() };
  const left = toMinutes(today) - local.minutes;
  if (left > 0) return { kind: 'open', cutOff: today, minutesLeft: left };
  return { kind: 'passed', next: findNext() };
}

/** "2 h 14 m" or "14 min". */
export function formatRemaining(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return m ? `${h} h ${m} m` : `${h} h`;
}

function nextLine(next: NextDelivery | null, lead = 'Next'): string {
  if (!next) return 'Send an enquiry and we’ll suggest a day';
  return `${lead} delivery ${next.tomorrow ? 'tomorrow' : next.day} · ask by ${formatClock(next.cutOff)}`;
}

/** Two lines for the swing tag: a handwritten headline and a smaller detail. */
export function sameDayCopy(status: SameDayStatus): { headline: string; detail: string } {
  switch (status.kind) {
    case 'open': return { headline: `Ask by ${formatClock(status.cutOff)} today`, detail: `${formatRemaining(status.minutesLeft)} to go for same-day` };
    case 'passed': return { headline: 'Today’s cut-off has passed', detail: nextLine(status.next) };
    case 'no-delivery': return { headline: 'No deliveries today', detail: `Studio collection only · ${nextLine(status.next, 'next')}` };
    case 'closed': return { headline: `Closed today · ${status.label}`, detail: nextLine(status.next) };
  }
}
