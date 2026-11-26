// The arrangement collection shown on Home (featured) and /arrangements/.
// Frequent owner edits: `available`, `featured` and `prices`.

/** Illustrated flower drawn in the arrangement's bucket. */
export type FlowerKind = 'peony' | 'rose' | 'ranunculus' | 'dahlia' | 'sweet-pea' | 'daisy' | 'hellebore';
/** Bloom colour for the illustration. */
export type BloomTone = 'coral' | 'pink' | 'cream' | 'red' | 'white' | 'butter' | 'lilac' | 'magenta' | 'apricot';
export type FoliageKind = 'eucalyptus' | 'fern' | 'olive';
export type ArrangementStyle = 'posy' | 'bouquet' | 'vase' | 'box' | 'wreath';
export type SizeName = 'petite' | 'classic' | 'lush';

export interface Arrangement {
  /** Stable URL-safe ID (lowercase letters, numbers, hyphens), used as the page anchor. */
  id: string;
  name: string;
  style: ArrangementStyle;
  /** One or two sentences in the florist's voice. */
  description: string;
  /** What's usually in it; the studio substitutes like for like with the season. */
  stems: string[];
  /** Colour story, e.g. "blush, cream, eucalyptus". */
  palette: string;
  /** IDs from content/occasions.ts. */
  occasionIds: string[];
  /** Whole Australian dollars, delivery not included. `classic` is required; petite < classic < lush. */
  prices: { petite?: number; classic: number; lush?: number };
  /** false shows "Resting this week" and greys the bucket. */
  available: boolean;
  /** Months (1–12) the arrangement is in season; may wrap the new year (e.g. 11 → 2). Omit for year-round. */
  seasonal?: { from: number; to: number };
  /** true when it can go out on a same-day delivery; false shows "24 h notice". */
  sameDay: boolean;
  /** Shown on the Home shelf (keep it to four). */
  featured: boolean;
  /** How the bucket illustration is drawn. */
  art: { main: FlowerKind; accent: FlowerKind; tones: [BloomTone, BloomTone, BloomTone]; foliage: FoliageKind };
}

export const sizeNotes: Record<SizeName, { label: string; note: string }> = {
  petite: { label: 'Petite', note: 'A generous handful. Bedside tables, desks and thank-yous.' },
  classic: { label: 'Classic', note: 'Our everyday armful. Fills a kitchen bench or a big hug.' },
  lush: { label: 'Lush', note: 'Overflowing. For the moments you want them to gasp a little.' },
};

export const arrangements: Arrangement[] = [
  {
    id: 'peony-armful', name: 'The Peony Armful', style: 'bouquet',
    description: 'The one we’re named for: fat, ruffled peonies wrapped loose in tissue, only while the season lasts.',
    stems: ['Coral Charm peonies', 'Sarah Bernhardt peonies', 'garden roses', 'eucalyptus', 'astilbe'],
    palette: 'coral, blush, cream, silver-green', occasionIds: ['birthday', 'anniversary', 'just-because'],
    prices: { petite: 95, classic: 145, lush: 220 }, available: true, seasonal: { from: 10, to: 12 }, sameDay: true, featured: true,
    art: { main: 'peony', accent: 'rose', tones: ['coral', 'pink', 'cream'], foliage: 'eucalyptus' },
  },
  {
    id: 'market-posy', name: 'Market Posy', style: 'posy',
    description: 'A hand-tied posy of whatever made us stop at the market this morning.',
    stems: ['ranunculus', 'spray roses', 'sweet pea', 'mint', 'eucalyptus tips'],
    palette: 'butter, apricot, soft green', occasionIds: ['thank-you', 'just-because', 'birthday'],
    prices: { petite: 45, classic: 65 }, available: true, sameDay: true, featured: true,
    art: { main: 'ranunculus', accent: 'sweet-pea', tones: ['butter', 'apricot', 'pink'], foliage: 'olive' },
  },
  {
    id: 'garden-gather', name: 'Garden Gather', style: 'bouquet',
    description: 'Looks like it was picked from a very good garden on the way over. Loose, airy and full of movement.',
    stems: ['garden roses', 'cosmos', 'foxglove', 'chamomile', 'fern'],
    palette: 'pink, white, lilac, fresh green', occasionIds: ['birthday', 'new-baby', 'just-because'],
    prices: { petite: 80, classic: 120, lush: 180 }, available: true, sameDay: true, featured: true,
    art: { main: 'rose', accent: 'daisy', tones: ['pink', 'white', 'lilac'], foliage: 'fern' },
  },
  {
    id: 'white-hush', name: 'White Hush', style: 'vase',
    description: 'Whites and greens arranged in a keepsake glass vase. Calm, and no fuss for the person receiving it.',
    stems: ['white garden roses', 'lisianthus', 'hellebores', 'olive', 'eucalyptus'],
    palette: 'white, cream, silver-green', occasionIds: ['sympathy', 'thank-you'],
    prices: { classic: 135, lush: 195 }, available: true, sameDay: true, featured: false,
    art: { main: 'rose', accent: 'hellebore', tones: ['white', 'cream', 'white'], foliage: 'olive' },
  },
  {
    id: 'ruby-romance', name: 'Ruby Romance', style: 'bouquet',
    description: 'Deep red garden roses and burgundy peonies with dark foliage. Grown-up romance, never a cliché.',
    stems: ['red garden roses', 'burgundy peonies', 'scabiosa', 'smoke bush', 'eucalyptus'],
    palette: 'ruby, magenta, plum, silver-green', occasionIds: ['anniversary'],
    prices: { petite: 90, classic: 140, lush: 210 }, available: true, sameDay: true, featured: true,
    art: { main: 'rose', accent: 'peony', tones: ['red', 'magenta', 'pink'], foliage: 'eucalyptus' },
  },
  {
    id: 'little-sprout', name: 'Little Sprout', style: 'box',
    description: 'A low keepsake box of soft blooms that sits safely on a crowded hospital table or nursery shelf.',
    stems: ['spray roses', 'sweet pea', 'chamomile', 'lamb’s ear'],
    palette: 'butter, blush, lilac', occasionIds: ['new-baby'],
    prices: { petite: 60, classic: 85 }, available: true, sameDay: true, featured: false,
    art: { main: 'daisy', accent: 'sweet-pea', tones: ['butter', 'lilac', 'pink'], foliage: 'fern' },
  },
  {
    id: 'wild-meadow-vase', name: 'Wild Meadow Vase', style: 'vase',
    description: 'Tall, wild and arranged to stand in a ceramic vase for a week. Made to order, so give us a day.',
    stems: ['foxglove', 'delphinium', 'cosmos', 'grasses', 'garden roses'],
    palette: 'lilac, pink, white, meadow green', occasionIds: ['birthday', 'thank-you'],
    prices: { classic: 150, lush: 230 }, available: true, sameDay: false, featured: false,
    art: { main: 'daisy', accent: 'rose', tones: ['lilac', 'white', 'pink'], foliage: 'fern' },
  },
  {
    id: 'eucalyptus-wreath', name: 'Eucalyptus & Olive Wreath', style: 'wreath',
    description: 'A hand-bound wreath of silver eucalyptus and olive with a few white blooms. For a service, a door or a quiet remembering.',
    stems: ['silver-dollar eucalyptus', 'olive', 'white roses', 'hellebores'],
    palette: 'silver-green, white', occasionIds: ['sympathy'],
    prices: { classic: 160, lush: 240 }, available: true, sameDay: false, featured: false,
    art: { main: 'hellebore', accent: 'rose', tones: ['white', 'cream', 'white'], foliage: 'eucalyptus' },
  },
  {
    id: 'sweet-pea-jar', name: 'Sweet Pea Jar', style: 'vase',
    description: 'A jar crammed with sweet peas. The scent arrives before you do.',
    stems: ['sweet pea', 'mint', 'chamomile'],
    palette: 'lilac, magenta, blush', occasionIds: ['thank-you', 'new-baby'],
    prices: { petite: 55, classic: 75 }, available: true, seasonal: { from: 9, to: 11 }, sameDay: true, featured: false,
    art: { main: 'sweet-pea', accent: 'daisy', tones: ['lilac', 'magenta', 'pink'], foliage: 'olive' },
  },
  {
    id: 'dahlia-glow', name: 'Dahlia Glow', style: 'bouquet',
    description: 'Café au lait and coral dahlias at their late-summer best. Back when the dahlias are.',
    stems: ['café au lait dahlias', 'coral dahlias', 'zinnia', 'amaranthus', 'fern'],
    palette: 'apricot, coral, burgundy', occasionIds: ['birthday', 'just-because'],
    prices: { petite: 85, classic: 130, lush: 195 }, available: false, seasonal: { from: 1, to: 4 }, sameDay: true, featured: false,
    art: { main: 'dahlia', accent: 'daisy', tones: ['apricot', 'coral', 'butter'], foliage: 'fern' },
  },
];

export const floristsChoice =
  'Can’t decide? Ask for florist’s choice with a budget and an occasion. We’ll build it from the best of this morning’s buckets.';
