// Occasions used by the Arrangements filter and the Home "Flowers for…" envelopes.

/** Wax-seal motif drawn on the occasion's envelope. */
export type SealMotif = 'candle' | 'heart' | 'dove' | 'rattle' | 'ribbon' | 'sprig';
/** Envelope paper colour, one of the palette's art tones. */
export type EnvelopeColour = 'blush' | 'petal' | 'sage' | 'cream' | 'kraft' | 'butter';

export interface Occasion {
  /** Stable URL-safe ID, used in /arrangements/?occasion=<id> and in arrangement occasionIds. */
  id: string;
  /** Label on the envelope and filter chip. */
  name: string;
  /** One line revealed when the envelope opens. */
  blurb: string;
  envelopeColour: EnvelopeColour;
  seal: SealMotif;
}

export const occasions: Occasion[] = [
  { id: 'birthday', name: 'Birthday', blurb: 'Bright, generous and a little bit showy.', envelopeColour: 'butter', seal: 'candle' },
  { id: 'anniversary', name: 'Anniversary & love', blurb: 'Deep reds, blush and garden roses.', envelopeColour: 'petal', seal: 'heart' },
  { id: 'sympathy', name: 'Sympathy', blurb: 'Soft whites and greens, quietly given.', envelopeColour: 'cream', seal: 'dove' },
  { id: 'new-baby', name: 'New baby', blurb: 'Fresh, gentle colour and plenty of scent.', envelopeColour: 'sage', seal: 'rattle' },
  { id: 'thank-you', name: 'Thank you', blurb: 'A posy that says it properly.', envelopeColour: 'kraft', seal: 'ribbon' },
  { id: 'just-because', name: 'Just because', blurb: 'Whatever’s best in the buckets today.', envelopeColour: 'blush', seal: 'sprig' },
];
