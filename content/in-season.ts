// "In the buckets this week": the owner's weekly edit. Update `weekOf` and each stem's status.

/** plenty = lots in; limited = a few left; last-week = nearly gone, shown as "nearly gone". */
export type StemStatus = 'plenty' | 'limited' | 'last-week';

export interface SeasonalStem {
  /** Stable URL-safe ID. */
  id: string;
  /** Common name as written on the specimen line. */
  name: string;
  /** Botanical name for the specimen label. */
  botanical: string;
  /** A few words in the florist's voice. */
  note: string;
  status: StemStatus;
}

/** ISO date (YYYY-MM-DD) of the Monday this list was written for. */
export const weekOf = '2026-11-23';

export const inSeason: SeasonalStem[] = [
  { id: 'peony-coral-charm', name: 'Coral Charm peony', botanical: 'Paeonia ‘Coral Charm’', note: 'Opens coral, fades to apricot.', status: 'plenty' },
  { id: 'peony-sarah-bernhardt', name: 'Sarah Bernhardt peony', botanical: 'Paeonia lactiflora', note: 'Classic ruffled pink.', status: 'plenty' },
  { id: 'ranunculus', name: 'Ranunculus', botanical: 'Ranunculus asiaticus', note: 'Butterscotch and blush.', status: 'limited' },
  { id: 'sweet-pea', name: 'Sweet pea', botanical: 'Lathyrus odoratus', note: 'The scent of the week.', status: 'last-week' },
  { id: 'garden-rose', name: 'Garden rose', botanical: 'Rosa', note: 'Locally grown, Yarra Valley.', status: 'plenty' },
  { id: 'foxglove', name: 'Foxglove', botanical: 'Digitalis purpurea', note: 'Tall speckled spires.', status: 'limited' },
  { id: 'eucalyptus', name: 'Silver-dollar eucalyptus', botanical: 'Eucalyptus cinerea', note: 'Always in the buckets.', status: 'plenty' },
];
