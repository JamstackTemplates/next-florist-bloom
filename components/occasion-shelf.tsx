'use client';

import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { filterByOccasion } from '../lib/collections';

type Entry = { id: string; occasionIds: string[]; node: ReactNode };

/**
 * Occasion filter for the bucket shelves. Reads and writes ?occasion=<id>.
 * Without JavaScript every arrangement shows and the chips jump to the by-occasion index below.
 */
export function OccasionShelf({ occasions, entries, emptyText }: {
  occasions: { id: string; name: string }[]; entries: Entry[]; emptyText: ReactNode;
}) {
  const [active, setActive] = useState<string | null>(null);
  const known = occasions.map(o => o.id);

  useEffect(() => {
    const read = () => {
      const id = new URLSearchParams(window.location.search).get('occasion');
      setActive(id && known.includes(id) ? id : null);
    };
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function choose(event: MouseEvent, id: string | null) {
    event.preventDefault();
    setActive(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set('occasion', id); else url.searchParams.delete('occasion');
    url.hash = '';
    window.history.pushState(null, '', url);
  }

  const shown = filterByOccasion(entries, active, known);
  const activeName = occasions.find(o => o.id === active)?.name;
  const chip = 'relative inline-flex min-h-11 items-center px-5 pr-7 text-[.95rem] font-semibold no-underline transition-colors [clip-path:polygon(0_0,100%_0,calc(100%-.8rem)_50%,100%_100%,0_100%)] hover:no-underline';

  return <div>
    <nav aria-label="Filter by occasion" className="flex flex-wrap gap-2.5" data-art="">
      <a href="#by-occasion" onClick={e => choose(e, null)} aria-current={active === null ? 'true' : undefined}
        className={`${chip} ${active === null ? 'bg-primary text-on-primary' : 'bg-surface-soft text-ink hover:bg-band'}`}>All occasions</a>
      {occasions.map(o => <a key={o.id} href={`#for-${o.id}`} onClick={e => choose(e, o.id)} aria-current={active === o.id ? 'true' : undefined}
        className={`${chip} ${active === o.id ? 'bg-primary text-on-primary' : 'bg-surface-soft text-ink hover:bg-band'}`}>{o.name}</a>)}
    </nav>
    <p className="mt-4 text-sm text-muted" role="status" aria-live="polite">
      {activeName ? `${shown.length} ${shown.length === 1 ? 'arrangement' : 'arrangements'} for ${activeName}` : `All ${entries.length} arrangements`}
    </p>
    {shown.length
      ? <ul className="mt-6 grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" role="list">{shown.map(e => <li key={e.id} className="flex">{e.node}</li>)}</ul>
      : <p className="font-hand mt-10 text-2xl">{emptyText}</p>}
  </div>;
}
