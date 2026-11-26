import { business } from '../content/business.ts';
import { deliveryZones } from '../content/delivery.ts';
import { absoluteUrl } from './paths.ts';

/** Florist schema derived from content/business.ts and content/delivery.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const image = url ? `${url}og.png` : undefined;
  return {
    '@context': 'https://schema.org', '@type': 'Florist',
    name: business.name, description: business.introduction, email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}), ...(image ? { image } : {}),
    priceRange: '$$', currenciesAccepted: 'AUD',
    address: {
      '@type': 'PostalAddress', streetAddress: business.location.label.split(',')[0],
      addressLocality: business.location.locality, addressRegion: business.location.region,
      postalCode: business.location.postcode, addressCountry: business.location.country,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.location.mapQuery)}`,
    openingHoursSpecification: business.hours.filter(entry => entry.opens && entry.closes).map(entry => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${entry.day}`, opens: entry.opens, closes: entry.closes,
    })),
    areaServed: deliveryZones.flatMap(zone => zone.suburbs.map(suburb => ({
      '@type': 'Place', name: `${suburb.name} VIC ${suburb.postcode}`,
    }))),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
