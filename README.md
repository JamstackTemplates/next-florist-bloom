# Wild Peony Florist

A lush, botanical florist website built on the Jamstacks Next.js starter: arrangements in market buckets with
swing-tag prices and an occasion filter, pressed-specimen wedding collections, a delivery-zone bloom map with a
suburb lookup and a live same-day cut-off tag. Wild Peony is a **fictitious sample** for the Jamstacks gallery
(`next-florist-bloom`); every name, number and address is made up. It is a self-contained static export and needs
no server, database or portal checkout at runtime.

## Run it

Requires Node 24+ and npm.

```sh
npm ci
npm run dev        # local development
npm run check      # tests, typecheck and static build into out/
npm start          # preview out/ like GitHub Pages would
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero with the same-day swing tag, this week's stems, occasion envelopes, featured buckets, wedding teaser, delivery strip, studio hours, Florist JSON-LD |
| `/arrangements/` | Every arrangement on the bucket shelves with petite/classic/lush prices, an occasion filter (`?occasion=<id>`), size guide and a by-occasion index |
| `/weddings/` | Three collections as herbarium sheets, the piece-by-piece price ledger, process and seasons |
| `/delivery/` | Suburb lookup, the three-zone bloom map, the cut-off peg timetable and delivery notes |
| `/contact/` | Hosted enquiry form when configured, always the public email, phone, hours and message guidance |
| `/404.html` | "This stem's wandered off" |

## Everyday edits

| To change… | Edit | Field or section |
| --- | --- | --- |
| This week's stems on Home | `content/in-season.ts` | `weekOf` (the Monday, `YYYY-MM-DD`) and each stem's `status`: `plenty`, `limited` ("a few left") or `last-week` ("nearly gone") |
| An arrangement's price or availability | `content/arrangements.ts` | `prices.petite/classic/lush` (whole AUD, petite < classic < lush), `available: false` shows "Resting this week", `featured` puts it on Home (max four) |
| A new arrangement | `content/arrangements.ts` | Copy an entry; give a unique lowercase `id`, `occasionIds` from `content/occasions.ts`, and an `art` recipe for its bucket illustration |
| Same-day cut-off times | `content/delivery.ts` | `cutOffs` (HH:MM inside studio hours, or `null` for no deliveries) |
| Public holidays | `content/delivery.ts` | `closures` (`{ date: 'YYYY-MM-DD', label }`); the tag and open-now status skip these days |
| Suburbs and fees | `content/delivery.ts` | `deliveryZones[].suburbs` (`id`, `name`, four-digit `postcode`), `fee`, optional earlier `sameDayCutOffOverride` |
| Wedding collections and pieces | `content/weddings.ts` | `weddingCollections`, `weddingPieces`, `weddingMinimumSpend`, `weddingSeasons` |
| Email, phone, studio hours, message tips | `content/business.ts` | `email`, `phone`, `hours`, `location`, `enquiries.order` / `enquiries.wedding` |
| Headings, introductions, button labels | the route's `app/**/page.tsx` | e.g. `<Hero.Heading>` in `app/page.tsx`, `<Collections.Heading>` in `app/weddings/page.tsx` |
| Business name | `content/business.ts` `name` and `site.config.json` `name` | |

For example, when the sweet peas finish, set that stem's `status: 'last-week'` in `content/in-season.ts`; Home
shows "nearly gone". To rest an arrangement, set `available: false`; Arrangements greys its bucket and shows
"Resting this week". Run `npm test` after editing: content checks fail with a message naming the item and field,
such as `arrangement "peony-armful".prices: petite must cost less than classic`.

Section components (`components/home-sections.tsx`, `arrangement-sections.tsx`, `wedding-sections.tsx`,
`delivery-sections.tsx`, `contact-sections.tsx`) own markup, layout, art and accessibility. Page files hold the
copy. Artwork is inline SVG in `components/art/`; there are no photographs or stock images.

## Time-based behaviour

All times are Melbourne time (`timeZone` in `site.config.json`). The same-day swing tag, the open-now badge, the
suburb lookup's "Today" line and today's cut-off peg are computed in the browser and refresh every minute.
The static page and visitors without JavaScript see neutral copy ("Same-day delivery: ask by 1pm weekdays,
11am Saturdays" and the hours list). A zone's cut-off is the earlier of the day's cut-off and the zone's
override. Dated closures are skipped when naming the next delivery day. Studio hours may not cross midnight;
overnight hours fail validation.

## Design

"Market buckets and pressed specimens": tissue-blush paper, moss-ink type and peony-magenta actions by day;
a greenhouse-green and aubergine cold room by night. Fonts are self-hosted from npm under the SIL Open
Font Licence 1.1: Yeseva One (display), Cabin Variable (body; its condensed width is used for specimen labels)
and Nothing You Could Do (handwriting on tags and cards). Colour tokens for light, automatic-dark and
explicit-dark modes live in `app/tailwind.input.css` and are mapped through `@theme inline`. Illustrations
use those tokens, so dark mode re-colours the same art. Printing drops art and keeps names, prices, hours and
contact details.

## Public configuration

```json
{
  "name": "Business name",
  "description": "Public description",
  "domain": "next-business-minimal.jamstacks.net",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

This sample uses `next-florist-bloom.jamstacks.net` and `Australia/Melbourne`; replace the demo domain
with your own. Do not invent canonical URLs when
the deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, content validation (with messages naming the
item to fix), same-day cut-offs including zone overrides, closures and daylight-saving changes, studio
open-now boundaries, the occasion filter, suburb lookup, Florist JSON-LD and enquiry wording. Typecheck uses Next's generated route types.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions. GitHub ignores a CNAME file for Actions deployments, so do not
add public/CNAME; the custom domain is a repository setting. The workflow sets it before building
when a `PAGES_ADMIN_TOKEN` secret is available (a fine-grained token with Administration and Pages
write access to the repository, e.g. as an organisation secret). The domain is the `SITE_DOMAIN`
variable, else site.config.json's `domain`, else `<repo-name>.jamstacks.net` for JamstackTemplates
repositories. Once the domain is set and its certificate is issued, a later deploy also enforces HTTPS.
Without the secret the step only prints a notice; set the custom domain and HTTPS in Settings → Pages.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Optional maps require
`frame-src https://www.google.com`. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To publish a gallery template, create [its manifest](jamstacks/README.md) and capture
genuine screenshots before running its separate publishing test:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-florist-bloom
node --test jamstacks/config.test.mjs
```

Before publication: replace neutral content and shell; validate industry data/schema and all links;
choose licensed fonts; verify both themes/base-path/embed states; create a neutral 1200×630 public/og.png
from the finished design and wire metadata; replace the icon; generate gallery captures and validate;
confirm domain/Pages settings and HTTPS; remove `plan/` and `.claude/skills/` after review. The website must not import or
link the planning folder. No stock screenshot or OG image is supplied as if it were final.
