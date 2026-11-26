import { DarkModeToggle } from 'jamstacks';
import { HeaderSprig } from './art/marks';
import { SiteLink } from './site-link';
import { Wordmark } from './wordmark';

const links = [
  { href: '/arrangements/', label: 'Arrangements' },
  { href: '/weddings/', label: 'Weddings' },
  { href: '/delivery/', label: 'Delivery' },
  { href: '/contact/', label: 'Contact' },
];

export function SiteHeader() {
  return <header className="tissue relative z-30 border-b border-line">
    <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-1 pt-3 pb-1 md:min-h-[5.75rem] md:flex-nowrap md:py-3">
      <div className="relative">
        <Wordmark />
        <HeaderSprig className="pointer-events-none absolute -bottom-4 left-10 w-40 opacity-90 max-md:hidden" />
      </div>
      <nav aria-label="Main" className="order-last -mx-1 flex w-full justify-between gap-1 border-t border-line/70 pt-1 md:order-none md:mx-0 md:ml-auto md:w-auto md:justify-end md:gap-7 md:border-0 md:pt-0">
        {links.map(link => <SiteLink key={link.href} href={link.href} markCurrent="section"
          className="relative px-1 py-2.5 text-[.98rem] font-semibold no-underline hover:text-accent-ink hover:no-underline aria-[current]:text-accent-ink aria-[current]:after:absolute aria-[current]:after:inset-x-1 aria-[current]:after:bottom-1 aria-[current]:after:h-[3px] aria-[current]:after:rounded-full aria-[current]:after:bg-[var(--stem)]">
          {link.label}
        </SiteLink>)}
      </nav>
      <div className="ml-auto flex items-center gap-2 sm:gap-3 md:ml-0">
        <SiteLink href="/contact/" className="button min-h-10 px-3.5 py-2 text-[.92rem] max-sm:shadow-none sm:px-4">
          <span className="sm:hidden">Enquire</span><span className="max-sm:hidden">Send an order enquiry</span>
        </SiteLink>
        <DarkModeToggle />
      </div>
    </div>
  </header>;
}
