# Phase 6 — Functionality, Testing, and Basic SEO (`phase-6-validation.md`)

## 1. Automated Unit Tests (`node:test`)

- **Command**: `npx --yes tsx --test src/data/barbershopData.test.ts`
- **Coverage**:
  - Service category filtering (`all`, `haircuts`, `beard`, `specialty`).
  - Public copy compliance verification (asserting zero unconfirmed `$` prices in service cards, zero references to unrelated Jordan `relooksalon.com`, verified `https://linktr.ee/relookbarbershop` booking URL, and verified `tel:+16472223540` phone URI).
  - Responsive hero crop bounds clamping (`clampHeroCropConfig`).
  - `schema.org/HairSalon` JSON-LD generation with strictly verified Toronto fields.

## 2. Customer Journey & Functional Verification

| Journey / Action | Destination / Behavior | Result |
| --- | --- | --- |
| Primary `Book Now` CTAs (Header, Hero, Services, Visit & Book) | `https://linktr.ee/relookbarbershop` | Verified |
| Secondary `Call` CTAs (Hero, Visit & Book, Footer) | `tel:+16472223540` | Verified |
| Instagram Portfolio Links (Gallery, Visit & Book, Footer) | `https://www.instagram.com/new_relook_barbershop/` | Verified |
| Google Maps Directions Link | `https://www.google.com/maps/search/?api=1&query=New+Relook+Barbershop+1054+Eglinton+Ave+W+Toronto+ON+M6C+2C5+Canada` | Verified |
| Google Reviews Snapshot Link | `https://www.google.com/search?q=New+Relook+Barbershop` | Verified |
| Section Anchor Navigation (`#services`, `#about`, `#gallery`, `#reviews`, `#contact`) | Smooth scroll with `scroll-padding-top: 5rem` offset | Verified |
| Mobile Navigation Drawer | Keyboard accessible, `aria-expanded`, `Escape` key closes menu | Verified |

## 3. Responsive & Accessibility Checks

- **Viewports Inspected**: `1440x900` (Desktop) and `390x844` (Mobile) via headless Chromium (`playwright-cli`).
- **Heading Hierarchy**: Single semantic `<h1>` (`NEW RELOOK BARBERSHOP`) in the Hero; `<h2>` headings for each major section (`SERVICES`, `MEET YOUR BARBER`, `TRANSFORMATION GALLERY`, `CUSTOMER REVIEWS`, `VISIT & BOOK`).
- **Decorative vs. Informative Alt Text**: Hero cutout uses `alt=""` / `aria-hidden="true"` so screen readers do not announce a decorative model as staff.
- **Contrast**: `#F58A16` orange primary buttons use `#0C0907` dark ink (`8.3:1` contrast ratio).

## 4. Basic SEO & Structured Data (`index.html`)

- **Title**: `New Relook Barbershop | Toronto`
- **Meta Description**: Grounded in the Eglinton Ave W Toronto location and core services.
- **Indexing Mode**: `<meta name="robots" content="noindex, nofollow" />` enabled for demo/preview safety per Phase 6 & 7 rules.
- **Structured Data**: `schema.org` `HairSalon` JSON-LD with `name`, `telephone`, `PostalAddress` (`1054 Eglinton Ave W, Toronto, ON M6C 2C5, CA`), and `sameAs` (`instagram.com/new_relook_barbershop/`, `linktr.ee/relookbarbershop`). Unconfirmed opening hours, prices, and aggregate ratings are intentionally omitted from JSON-LD.
