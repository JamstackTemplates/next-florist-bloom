// Wedding collections, individual pieces and seasonal notes for /weddings/.

export interface WeddingCollection {
  /** Stable URL-safe ID. */
  id: string;
  name: string;
  /** Starting price in whole AUD. */
  fromPrice: number;
  includes: string[];
  /** Who it suits, e.g. guest count. */
  suits: string;
}

export interface WeddingPiece {
  /** Stable URL-safe ID. */
  id: string;
  name: string;
  /** Starting price in whole AUD. */
  fromPrice: number;
  unit: 'each' | 'per metre';
}

export const weddingCollections: WeddingCollection[] = [
  {
    id: 'the-posy', name: 'The Posy', fromPrice: 650,
    includes: ['Bridal posy', 'Two bridesmaid posies', 'Four buttonholes'],
    suits: 'Registry and small weddings',
  },
  {
    id: 'the-garden', name: 'The Garden', fromPrice: 2400,
    includes: ['Bridal bouquet', 'Four bridesmaid bouquets', 'Eight buttonholes', 'Two ceremony urns', 'Ten table posies'],
    suits: '60–100 guests',
  },
  {
    id: 'the-wild-arch', name: 'The Wild Arch', fromPrice: 5800,
    includes: ['Everything in The Garden', 'Meadow ceremony arch', 'Long-table garland', 'On-the-day styling and pack-down'],
    suits: '100+ guests',
  },
];

export const weddingPieces: WeddingPiece[] = [
  { id: 'bridal-bouquet', name: 'Bridal bouquet', fromPrice: 260, unit: 'each' },
  { id: 'bridesmaid-posy', name: 'Bridesmaid posy', fromPrice: 110, unit: 'each' },
  { id: 'buttonhole', name: 'Buttonhole', fromPrice: 28, unit: 'each' },
  { id: 'flower-crown', name: 'Flower crown', fromPrice: 95, unit: 'each' },
  { id: 'ceremony-urn', name: 'Ceremony urn', fromPrice: 420, unit: 'each' },
  { id: 'meadow-arch', name: 'Meadow arch', fromPrice: 1900, unit: 'each' },
  { id: 'table-posy', name: 'Table posy', fromPrice: 55, unit: 'each' },
  { id: 'table-garland', name: 'Long-table garland', fromPrice: 85, unit: 'per metre' },
];

/** Smallest wedding we take on, in whole AUD. Every collection must start at or above it. */
export const weddingMinimumSpend = 650;

export const weddingTravelNote =
  'Prices include delivery and set-up anywhere in metropolitan Melbourne. Regional venues are welcome; we’ll add travel to your quote.';

export interface SeasonNote {
  id: 'spring' | 'summer' | 'autumn' | 'winter';
  season: string;
  months: string;
  blooms: string;
}

export const weddingSeasons: SeasonNote[] = [
  { id: 'spring', season: 'Spring', months: 'Sep–Nov', blooms: 'Peonies, ranunculus, sweet pea, tulips' },
  { id: 'summer', season: 'Summer', months: 'Dec–Feb', blooms: 'Dahlias, garden roses, cosmos, hydrangea' },
  { id: 'autumn', season: 'Autumn', months: 'Mar–May', blooms: 'Late dahlias, rose hips, chrysanthemums, smoke bush' },
  { id: 'winter', season: 'Winter', months: 'Jun–Aug', blooms: 'Hellebores, anemones, camellias, wattle' },
];
