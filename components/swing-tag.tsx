import type { ReactNode } from 'react';

/**
 * The florist's swing tag: a kraft card with a punched eyelet, hanging from twine.
 * `portrait` is the signature size (Home hero, Delivery, Contact); `price` is the small
 * landscape tag used for arrangement prices. It sways on hover/focus (CSS), still under reduced motion.
 */
export function SwingTag({ children, variant = 'portrait', idle = false, className = '', twine = 56 }: {
  children: ReactNode; variant?: 'portrait' | 'price'; idle?: boolean; className?: string;
  /** Length of the visible twine above the tag, in px. */
  twine?: number;
}) {
  const portrait = variant === 'portrait';
  const shape = portrait
    ? 'polygon(1.6rem 0, calc(100% - 1.6rem) 0, 100% 1.6rem, 100% 100%, 0 100%, 0 1.6rem)'
    : 'polygon(1.2rem 0, 100% 0, 100% 100%, 1.2rem 100%, 0 calc(100% - 1.2rem), 0 1.2rem)';
  const inner = portrait
    ? 'polygon(calc(1.6rem - .4px) 0, calc(100% - 1.6rem + .4px) 0, 100% calc(1.6rem - .4px), 100% 100%, 0 100%, 0 calc(1.6rem - .4px))'
    : 'polygon(calc(1.2rem - .4px) 0, 100% 0, 100% 100%, calc(1.2rem - .4px) 100%, 0 calc(100% - 1.2rem + .4px), 0 calc(1.2rem - .4px))';
  return <div className={`swing-host relative ${className}`} style={portrait ? { paddingTop: twine } : undefined}>
    <div className={`swing relative ${idle ? 'swing-idle' : ''}`}>
      {portrait
        ? <svg aria-hidden="true" data-art="" className="pointer-events-none absolute bottom-[calc(100%-1.5rem)] left-1/2 w-8 -translate-x-1/2 overflow-visible" style={{ height: twine + 24 }} viewBox="0 0 32 100" preserveAspectRatio="none">
            <path d="M16 100 C6 70 26 40 16 0" fill="none" stroke="var(--twine)" strokeWidth={2.4} vectorEffect="non-scaling-stroke" />
          </svg>
        : <svg aria-hidden="true" data-art="" className="pointer-events-none absolute right-[calc(100%-1.1rem)] top-1/2 h-10 w-12 -translate-y-full overflow-visible" viewBox="0 0 48 40">
            <path d="M44 40 C30 34 20 10 0 0" fill="none" stroke="var(--twine)" strokeWidth={2} />
          </svg>}
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--ink-line)]" style={{ clipPath: shape }} />
      <div aria-hidden="true" className="kraft absolute inset-[1.5px] translate-x-[2px] translate-y-[1.5px]" style={{ clipPath: inner }} />
      <span aria-hidden="true" className={`absolute size-3.5 rounded-full border-2 border-[var(--kraft-edge)] bg-bg shadow-[inset_1px_1px_0_rgb(0_0_0/.25)] ${portrait ? 'left-1/2 top-3 -translate-x-1/2' : 'left-2.5 top-1/2 -translate-y-1/2'}`} />
      <div className={`relative text-kraft-ink ${portrait ? 'px-6 pb-6 pt-10' : 'py-2.5 pl-9 pr-4'}`}>{children}</div>
    </div>
  </div>;
}
