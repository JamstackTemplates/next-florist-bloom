import type { ReactNode } from 'react';

/** Inner-page heading on tissue paper: eyebrow, large title (use <em> for accent words), lede, and art spilling in from the right. */
export function PageHead({ eyebrow, title, children, id, art, aside }: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Bloom art that spills in from the right edge. */
  art?: ReactNode;
  /** Optional object (e.g. the swing tag) shown beside the title. */
  aside?: ReactNode;
}) {
  return <header className="tissue grain relative overflow-hidden border-b border-line">
    <div className={`wrap relative grid gap-8 pt-[clamp(2.5rem,6vw,5rem)] pb-[clamp(2.5rem,5vw,4.5rem)] ${art ? 'max-md:pb-36' : ''} md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end`}>
      <div className="relative z-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id={id} className="mt-3 mb-5 max-w-[14ch] text-[clamp(2.9rem,7.4vw,5.6rem)] [&_em]:not-italic [&_em]:text-accent-ink">{title}</h1>
        {children ? <div className="max-w-(--measure) text-[clamp(1.08rem,1.6vw,1.25rem)] text-muted">{children}</div> : null}
      </div>
      {aside ? <div className="relative z-10 flex justify-start md:justify-end">{aside}</div> : null}
    </div>
    {art ? <div aria-hidden="true" data-art="" className={`pointer-events-none absolute -right-10 bottom-[-12%] w-[min(46vw,30rem)] opacity-95 max-md:-bottom-6 max-md:-right-8 max-md:w-44 ${aside ? 'md:hidden lg:block lg:right-[-6rem] lg:w-[24rem]' : ''}`}>{art}</div> : null}
  </header>;
}
