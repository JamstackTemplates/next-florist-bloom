// Wild Peony Florist: shared business details. A fictitious sample for the Jamstacks gallery.
// Page copy (headings, introductions, calls to action) lives in each route's app/**/page.tsx.
import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short line used in metadata and the footer. */
  tagline: string;
  /** Plain-text introduction used by metadata and structured data. */
  introduction: string;
  /** Public contact address, always shown on Contact. Never a private notification destination. */
  email: string;
  /** Public phone number as displayed; blank hides it. */
  phone: string;
  /** Where the studio is. No street number: the market is the landmark. */
  location: {
    /** One-line studio description shown in the footer and Contact. */
    label: string;
    /** Locality for structured data. */
    locality: string;
    region: string;
    postcode: string;
    country: string;
    /** Search text for the optional map and directions links. */
    mapQuery: string;
    /** How to find the door, in a sentence. */
    directions: string;
  };
  /**
   * Studio opening hours in the site.config.json time zone (Australia/Melbourne).
   * Each weekday once; opens is inclusive, closes exclusive; nothing may cross midnight.
   */
  hours: OpeningHours[];
  /** Contact page guidance. The hosted form has only name, email and message fields. */
  enquiries: {
    /** Suggestions for an order enquiry message (not extra form fields). */
    order: string[];
    /** Suggestions for a wedding enquiry message. */
    wedding: string[];
    /** Shown beside the form: address and payment are arranged by reply. */
    paymentNote: string;
  };
}

export const business: Business = {
  name: 'Wild Peony Florist',
  tagline: 'Lush, garden-style flowers from beside Queen Victoria Market.',
  introduction:
    'Loose, garden-style flowers cut to the season in a Melbourne studio beside Queen Victoria Market, with same-day delivery across inner Melbourne and wedding flowers designed from the first chat.',
  email: 'hello@example.com',
  phone: '(03) 5550 4127',
  location: {
    label: 'Stall-front studio beside Queen Victoria Market, Melbourne VIC 3000',
    locality: 'Melbourne',
    region: 'VIC',
    postcode: '3000',
    country: 'AU',
    mapQuery: 'Queen Victoria Market, Melbourne VIC',
    directions: 'Opposite the market’s Elizabeth Street sheds: look for the zinc buckets on the footpath.',
  },
  hours: [
    { day: 'Monday', opens: '08:00', closes: '18:00' },
    { day: 'Tuesday', opens: '08:00', closes: '18:00' },
    { day: 'Wednesday', opens: '08:00', closes: '18:00' },
    { day: 'Thursday', opens: '08:00', closes: '18:00' },
    { day: 'Friday', opens: '08:00', closes: '18:00' },
    { day: 'Saturday', opens: '08:00', closes: '16:00' },
    { day: 'Sunday', opens: '09:00', closes: '13:00' },
  ],
  enquiries: {
    order: [
      'The arrangement and size you like, or a budget',
      'The occasion',
      'Delivery date and suburb',
      'The recipient’s name',
      'What the card should say',
      'Colours they love (or can’t stand)',
    ],
    wedding: [
      'Your wedding date',
      'Ceremony and reception venues',
      'Roughly how many guests',
      'Colour palette or mood',
      'An approximate flower budget',
    ],
    paymentNote:
      'We’ll confirm the recipient’s full address and payment when we reply. Please don’t send card details in the message.',
  },
};
