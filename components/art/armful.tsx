import { asset } from '../../lib/paths';

const HERO_ALT =
  'Lush garden-style bouquet of blush-pink and coral peonies, deep magenta peony buds, ivory garden roses, golden ranunculus, feathery astilbe, eucalyptus and olive foliage wrapped in warm brown kraft paper and blush tissue tied with jute twine';

/**
 * Hero artwork: An abundant seasonal armful of peonies wrapped in kraft and tissue paper.
 * Automatically switches between dawn studio (light mode, #F8ECE7 backdrop) and nocturnal
 * cold-room (dark mode, #111A14 backdrop) for both system preference and manual theme toggle.
 */
export function MarketArmful({ className = 'w-full' }: { className?: string }) {
  const lightSrc = asset('/hero-peonies-light.jpg');
  const darkSrc = asset('/hero-peonies-dark.jpg');

  return (
    <figure className={`relative ${className}`}>
      <div className="hero-plate-frame relative overflow-hidden rounded-[1.5rem] border border-line bg-surface/80 p-2 sm:p-2.5">
        <div className="relative aspect-[928/880] w-full overflow-hidden rounded-[1.15rem] bg-bg">
          <img
            src={lightSrc}
            alt={HERO_ALT}
            width={928}
            height={880}
            fetchPriority="high"
            decoding="async"
            className="hero-img-light h-full w-full object-cover object-center"
          />
          <img
            src={darkSrc}
            alt={HERO_ALT}
            width={928}
            height={880}
            fetchPriority="high"
            decoding="async"
            className="hero-img-dark h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.15rem] ring-1 ring-inset ring-line/40"
          />
        </div>
      </div>
    </figure>
  );
}
