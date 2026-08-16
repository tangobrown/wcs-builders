# WCS Building Services — website

A six-page marketing site for **WCS Building Services**, a father-and-son
domestic building firm in Axminster, East Devon. Built to the design handoff as
a Next.js (App Router) + Tailwind CSS rebuild of the client's existing site.

Pages: **Home, About WCS, Services, Gallery, Contact, Privacy Policy.**

## Stack

- **Next.js 15** (App Router, TypeScript) — every page is statically rendered
  except the contact form's API route.
- **Tailwind CSS 3** with the brand tokens wired into `tailwind.config.ts`.
- **Fonts** self-hosted via `next/font/local` (files in `app/fonts/`): Poppins
  (600, 700) for headings/nav/buttons, Public Sans (variable, 400–700) for body
  copy. Self-hosting keeps the production build free of any network fetch to
  Google Fonts.
- **Images** via `next/image` from local files in `public/images`, with per-grid
  `sizes` so phones don't download desktop-size files.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
app/
  layout.tsx          # fonts, footer, metadata, LocalBusiness JSON-LD
  page.tsx            # Home
  about/ services/ gallery/ contact/ privacy-policy/
  api/contact/route.ts  # form handler (Resend or log-only fallback)
  sitemap.ts  robots.ts
components/
  SiteHeader.tsx      # top bar + nav + accessible mobile drawer
  HomeHero.tsx  PageHero.tsx
  SectionHeading.tsx  Button.tsx
  ServicesCarousel.tsx  # client: auto-advance, swipe, reduced-motion
  ContactForm.tsx       # client: validation, honeypot, pending/sent/error
  ZoomImage.tsx         # client: gallery lightbox
  Footer.tsx  icons.tsx
lib/site.ts           # business details + navigation
public/
  logo.png
  images/             # photography (see "Photography" below)
```

## Brand tokens

Colours, type scale, spacing and the angled section edges are defined in
`tailwind.config.ts` and `app/globals.css`. Notably: **square corners
everywhere** (radius 0), navy `#0c1d3d` / gold `#bd8f13`, and a 1200px content
container with a 24px gutter that sits outside the box so hero and body copy
share one left edge.

## Contact form

`components/ContactForm.tsx` validates required fields (name + a valid email)
client-side, then posts the submission straight to **Formspree** as JSON with
`Accept: application/json` (so Formspree replies with JSON rather than a
redirect). It shows inline field errors, a pending state, a success panel and
an error state, and includes a honeypot (`_gotcha`) that both the form and
Formspree use to drop bots.

The endpoint lives in `lib/site.ts` (`formspreeEndpoint`) and can be overridden
with `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. The Formspree form ID is public by design,
so no server route or secret is required. Enquiries are delivered to whichever
inbox the Formspree form is configured to notify.

## Photography — action required before launch

The design references photos hosted on the client's live WordPress media
library, which this build environment could not reach. **Every file in
`public/images/` is therefore a branded, clearly-labelled placeholder** at the
correct aspect ratio. Replace them with the real exports, keeping the same
filenames (or update the paths in the components).

Per the handoff, these slots still need genuinely new shots (the originals
weren't recoverable): the **home/interior hero banner** (`hero-banner.jpg`),
**Loft Conversions**, **Barn Conversions**, **Driveways** and **Bespoke
Projects**. The rest (Extensions, Kitchens, the team, both directors and the
gallery images) exist in the client's library and can be exported directly.

Logo: `public/logo.png` is the white wordmark — usable only on dark
backgrounds. Ask the client for a navy/full-colour version if it's ever needed
on white.

## SEO & AI search

Search and answer-engine optimisation lives mostly in `lib/seo.tsx`:

- **Metadata** — per-page titles, meta descriptions, canonical URLs, Open Graph
  and Twitter cards (via a branded `public/og.jpg`), keywords, and explicit
  `robots` directives (`max-image-preview:large`, etc.).
- **Structured data (JSON-LD)** — a `GeneralContractor` / `LocalBusiness` entity
  (name, phone, geo, area served, founders, service catalogue) linked by `@id`
  to a `WebSite` node, plus per-page `WebPage`/`AboutPage`/`CollectionPage`/
  `ContactPage` nodes, `BreadcrumbList`s, an `ItemList` of services, and an
  `FAQPage` on Contact. This is what both Google rich results and AI answer
  engines read.
- **Answer-engine content** — a grounded FAQ on the Contact page (matching the
  FAQPage schema) and a `public/llms.txt` summarising the business for LLM
  crawlers.
- **Crawlability** — `sitemap.xml` (with image entries), `robots.txt`,
  `manifest.webmanifest`, theme colour, and descriptive image `alt` text.

Business facts (name, phone, area, founders, services) are centralised in
`lib/site.ts` and `lib/seo.tsx`. Update a couple of details before launch if
available: a full street address/postcode and opening hours (both intentionally
omitted rather than guessed), and Google/Bing verification tokens.
