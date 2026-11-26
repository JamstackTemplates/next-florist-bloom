import { business } from '../content/business';
import { PeonyBud } from './art/marks';
import { SiteLink } from './site-link';

/** Peony-bud monogram with "Wild Peony" in Yeseva One and "Florist" in small caps. */
export function Wordmark({ tone = 'ink', className = '' }: { tone?: 'ink' | 'deep'; className?: string }) {
  const [first, ...rest] = business.name.replace(/ Florist$/, '').split(' ');
  return <SiteLink href="/" className={`group inline-flex items-center gap-2.5 no-underline hover:no-underline ${className}`} aria-label={`${business.name}, home`}>
    <PeonyBud className="size-9 sm:size-11 shrink-0 transition-transform duration-500 group-hover:-rotate-6" />
    <span className="flex flex-col leading-none">
      <span className={`font-display text-[1.3rem] sm:text-[1.6rem] tracking-[-.01em] ${tone === 'deep' ? 'text-on-deep' : 'text-ink'}`}>{first} <span className={tone === 'deep' ? 'text-petal' : 'text-accent-ink'}>{rest.join(' ')}</span></span>
      <span className={`specimen mt-1 text-[.56rem] tracking-[.28em] sm:text-[.62rem] sm:tracking-[.34em] ${tone === 'deep' ? 'text-on-deep-muted' : 'text-muted'}`}>Florist · Melbourne</span>
    </span>
  </SiteLink>;
}
