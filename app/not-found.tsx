import { FallenStem } from '../components/art/objects';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return <section aria-labelledby="nf-heading" className="tissue grain relative overflow-hidden">
    <div className="wrap grid items-center gap-8 py-[clamp(3rem,8vw,6rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div>
        <p className="eyebrow">404 · page not found</p>
        <h1 id="nf-heading" className="mt-3 text-[clamp(2.8rem,7vw,5.2rem)]">This stem’s <span className="text-accent-ink">wandered off</span></h1>
        <p className="mt-5 max-w-md text-[1.1rem] text-muted">The page you were after has slipped out of its bucket. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <SiteLink href="/" className="button">Back to the stall</SiteLink>
          <SiteLink href="/arrangements/" className="font-semibold underline decoration-[var(--stem)] decoration-2 underline-offset-[.3em]">Arrangements</SiteLink>
          <SiteLink href="/contact/" className="font-semibold underline decoration-[var(--stem)] decoration-2 underline-offset-[.3em]">Contact</SiteLink>
        </div>
      </div>
      <FallenStem className="w-full" />
    </div>
  </section>;
}
