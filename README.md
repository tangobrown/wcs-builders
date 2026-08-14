# WCS Building Services — website

A six-page marketing site for **WCS Building Services**, a father-and-son
domestic building firm in Axminster, East Devon. Built to the design handoff as
a Next.js (App Router) + Tailwind CSS rebuild of the client's existing site.

Pages: **Home, About WCS, Services, Gallery, Contact, Privacy Policy.**

## Stack

- **Next.js 15** (App Router, TypeScript) — every page is statically rendered
  except the contact form's API route.
- **Tailwind CSS 3** with the brand tokens wired into `tailwind.config.ts`.
- **Fonts** via `next/font/google`: Poppins (600, 700) for headings/nav/buttons,
  Public Sans (400, 600, 700) for body copy.
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

`components/ContactForm.tsx` posts JSON to `app/api/contact/route.ts`, which:

- validates required fields (name + a valid email),
- drops bot submissions via a honeypot field,
- delivers via **Resend** when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set,
- otherwise logs the message server-side and returns success (so the site works
  out of the box for demos).

Copy `.env.example` to `.env.local` and fill in the Resend credentials before
launch. Swap Resend for Nodemailer/Formspree here if the client prefers.

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

## SEO

Per-page titles/descriptions, Open Graph tags, a `sitemap.xml`, `robots.txt`
and `LocalBusiness` JSON-LD (name, phone, area served) are all wired up. Add
real per-page OG images alongside the photography swap.
