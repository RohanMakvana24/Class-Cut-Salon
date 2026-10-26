# Phase 1 — Content and Website Structure Blueprint (`phase-1-content-plan.md`)

## 1. Project Objective and Audience

- **Target Audience**: Local Toronto residents along Eglinton Ave W, Forest Hill North, Cedarvale, and Oakwood-Vaughan seeking a dependable, welcoming neighborhood barbershop for precision haircuts, skin fades, beard trims, and children's cuts.
- **Primary Conversion Goal**: Route visitors cleanly to the existing booking hub (`https://linktr.ee/relookbarbershop`).
- **Secondary Conversion Goals**:
  1. Direct phone inquiries (`tel:+16472223540`).
  2. Turn-by-turn directions to `1054 Eglinton Ave W, Toronto, ON M6C 2C5, Canada`.
  3. Authentic portfolio discovery via `@new_relook_barbershop` on Instagram.
  4. Local trust building via faithful, attributed customer review excerpts and Amir's introduction.

---

## 2. Evidence and Content Inventory

| Item | Value | Classification | Source | Public Website Behavior |
| --- | --- | --- | --- | --- |
| Business Name | New Relook Barbershop | Supplied Fact | Project Brief | Displayed in Header, Hero H1, JSON-LD, Footer |
| Street Address | 1054 Eglinton Ave W, Toronto, ON M6C 2C5, Canada | Supplied Fact | Project Brief | Hero location line, Visit & Book, Footer, Maps URL |
| Telephone | +1 647-222-3540 | Supplied Fact | Project Brief | `tel:+16472223540` action; never assumed to be WhatsApp |
| Primary Booking URL | `https://linktr.ee/relookbarbershop` | Supplied Fact | Project Brief | All `Book Now` buttons point here until direct WhatsApp is verified |
| Instagram URL | `https://www.instagram.com/new_relook_barbershop/` | Supplied Fact | Project Brief | Social links & Transformation Gallery fallback CTA |
| Google Search / Listing | `https://www.google.com/search?q=New+Relook+Barbershop` | Supplied Fact | Project Brief | Linked from Customer Reviews section |
| Google Rating Total | 5.0 / 5 from 333 reviews | Supplied Snapshot | Project Brief | Displayed with explicit supplied-snapshot label; omitted from JSON-LD |
| Barber Name | Amir | Review Observation | Customer Reviews | Introduced in Meet Your Barber without invented credentials |
| Service Types | Haircuts, fades, beard grooming, children's cuts | Review Observation | Customer Reviews | Used as draft service categories without fabricated prices |
| Price Range ($30–40) | Mentioned in 1 customer review | Unconfirmed / Pending | Customer Review | Excluded from public service cards; kept in internal pending list |
| Opening Hours | Unknown | Unconfirmed / Pending | Pending | Visitors prompted to check Linktree or call for current hours |
| Direct WhatsApp URL | Mentioned in reviews | Unconfirmed / Pending | Pending | Routed via Linktree until official `wa.me` link is supplied |

---

## 3. Single-Page Structure & Reading Order

| Order | Section Name | Anchor ID | Primary Purpose | Primary Action |
| --- | --- | --- | --- | --- |
| 1 | Header | `#top` | Brand identity, section anchor links, compact mobile drawer | `Book Now` (`https://linktr.ee/relookbarbershop`) |
| 2 | Hero | `#hero` | Reference-inspired dark brick backdrop, oversized white `NEW RELOOK` title behind transparent model cutout, location line | `Book Now` & `Call +1 647-222-3540` |
| 3 | Services | `#services` | 6 grooming categories in a 3x2 dark/orange grid without invented prices | `Book Appointment via Linktree` |
| 4 | Meet Your Barber | `#about` | Restrained, evidence-backed introduction to Amir and the Eglinton West shop (replaces reference blog/product area) | `Schedule with Amir` |
| 5 | Transformation Gallery | `#gallery` | Full-width orange band + orange-framed paired transformation slots & Instagram showcase | `Follow @new_relook_barbershop` |
| 6 | Customer Reviews | `#reviews` | Full-width orange band + 5 faithful verbatim excerpts & snapshot disclosure | `Read Reviews on Google` |
| 7 | Visit and Book | `#contact` | Toronto address, phone, Linktree, Instagram, and Google Maps directions | `Book Now` & `Get Directions` |
| 8 | Footer | `footer` | Wordmark, quick section anchors, Toronto address, and Design/Phase blueprint inspector | Section navigation |

---

## 4. Draft English Website Copy

### Header
- **Wordmark**: `NEW RELOOK` / `BARBERSHOP`
- **Navigation**: `Services` (`#services`), `Meet Your Barber` (`#about`), `Gallery` (`#gallery`), `Reviews` (`#reviews`), `Visit & Book` (`#contact`)
- **Primary Button**: `Book Now`

### Hero (`#hero`)
- **Main H1**: `NEW RELOOK` (with `BARBERSHOP · TORONTO` descriptor)
- **Location & Supporting Copy**: `1054 Eglinton Ave W, Toronto · Precision haircuts, clean skin fades, beard sculpting, and welcoming neighborhood service.`
- **Primary CTA**: `Book Now` (`https://linktr.ee/relookbarbershop`)
- **Secondary CTA**: `Call +1 647-222-3540` (`tel:+16472223540`)

### Services (`#services`)
- **Eyebrow**: `Eglinton West Grooming`
- **Heading**: `SERVICES`
- **Subheading**: `Tailored haircuts, clean fades, and beard work in midtown Toronto. Select your service when booking through our official Linktree hub.`

### Meet Your Barber (`#about`)
- **Eyebrow**: `1054 Eglinton Ave W · Toronto`
- **Heading**: `MEET YOUR BARBER`
- **Body**: `At New Relook Barbershop, Amir has built a welcoming neighborhood chair where every cut starts with a real conversation. Toronto clients consistently point to his unhurried attention to detail—whether shaping a crisp skin fade, dialing in a balanced beard trim, or making a child's haircut comfortable and stress-free.`

### Transformation Gallery (`#gallery`)
- **Orange Band Eyebrow**: `See Authentic Work From Our Eglinton West Chair`
- **Orange Band Heading**: `TRANSFORMATION GALLERY`
- **Fallback / Instagram Copy**: `Real client before-and-after cuts are shared on our official Instagram @new_relook_barbershop. Dedicated orange-framed transformation slots below are ready for authentic shop photography.`

### Customer Reviews (`#reviews`)
- **Orange Band Eyebrow**: `What Our Toronto Clients Are Saying`
- **Orange Band Heading**: `CUSTOMER REVIEWS`
- **Snapshot Context**: `5.0 / 5 across 333 Google reviews (supplied listing snapshot; verify live count before launch).`

### Visit and Book (`#contact`)
- **Eyebrow**: `Midtown Toronto Location`
- **Heading**: `VISIT & BOOK`
- **Address**: `1054 Eglinton Ave W, Toronto, ON M6C 2C5, Canada`
- **Phone**: `+1 647-222-3540`

---

## 5. Hero Composition Brief

1. **Layer 1 (`z-index: 1`) — Brick Backdrop**: Dark exposed brick wall (`#27150F` over `#0C0907`).
2. **Layer 2 (`z-index: 10`) — Warm Side Lighting & Shading**: Radial amber/orange edge glows (`#F58A16` / `#D9A34B`) on left and right margins with a deep shaded center vignette.
3. **Layer 3 (`z-index: 20`) — Oversized White Display Title**: Full-width condensed `NEW RELOOK` lettering in `#F7F1E8`.
4. **Layer 4 (`z-index: 30`) — Central Transparent Barber Model Cutout**: Decorative seated upper-body barber model overlapping the center of `NEW RELOOK` so the head and shoulders sit in front of the letters while keeping the brand name legible on both desktop and mobile. Uses `alt=""` because the model is decorative and not Amir.
5. **Layer 5 (`z-index: 40`) — Lower Black Fade**: Smooth vertical gradient (`transparent` to `#0C0907`) blending the lower torso/arms into the canvas.
6. **Layer 6 (`z-index: 50`) — Foreground Copy & CTAs**: Restrained location line and `Book Now` / `Call` actions positioned clearly below the face/title overlap.

---

## 6. Faithful Testimonials Inventory

1. **Toronto Google Reviewer (Mentioning Amir)**: `"Amir is welcoming, takes his time to understand exactly what haircut and fade you want, and never rushes the chair..."` *(Truncated excerpt from supplied review transcript; per-review rating not inferred.)*
2. **Eglinton West Client Review**: `"Clean fade and beard trim every visit. Easy to book ahead through the booking link and WhatsApp updates..."` *(Truncated excerpt from supplied review transcript.)*
3. **Local Family Reviewer**: `"Brought my son in for a haircut and Amir was patient, friendly, and made sure the cut looked sharp from every angle..."` *(Truncated excerpt from supplied review transcript.)*
4. **Regular Toronto Customer**: `"Great neighborhood barbershop on Eglinton West. Consistent haircuts, clean shop atmosphere, and fair Toronto pricing..."` *(Truncated excerpt from supplied review transcript.)*
5. **Returning Client Review**: `"Attention to detail on the lineup and scissor work sets New Relook apart. Always leave the chair feeling fresh..."` *(Truncated excerpt from supplied review transcript.)*

---

## 7. Action and Link Map

- **Book Now**: `https://linktr.ee/relookbarbershop`
- **Call Us**: `tel:+16472223540`
- **Instagram**: `https://www.instagram.com/new_relook_barbershop/`
- **Directions**: `https://www.google.com/maps/search/?api=1&query=New+Relook+Barbershop+1054+Eglinton+Ave+W+Toronto+ON+M6C+2C5+Canada`
- **Google Reviews**: `https://www.google.com/search?q=New+Relook+Barbershop`
- **Direct WhatsApp**: *Pending confirmation — do not derive from telephone number.*

---

## 8. Image and Asset Inventory

| Asset | Purpose | Format & Ratio | Alt-Text Intent | Status |
| --- | --- | --- | --- | --- |
| Hero Transparent Model | Central decorative cutout overlapping `NEW RELOOK` | Transparent SVG / PNG / WebP (`4:5`) | `alt=""` (decorative model, not Amir) | Installed (Studio Vector + Reference Matte Cutout) |
| Dark Brick Texture | Wall backdrop across hero and sections | Procedural CSS / SVG pattern | `aria-hidden="true"` | Installed |
| Shop & Amir Portrait | Meet Your Barber visual | WebP / JPEG (`4:3` or `4:5`) | Descriptive portrait alt text when supplied | Pending authentic photo (text-led panel active) |
| Transformation Pairs | Before/After haircut pairs in `#gallery` | WebP / JPEG (`4:5` paired) | Specific description of before/after cut | Pending authentic photos (Instagram CTA + Slot Previewer active) |

---

## 9. Missing Information & Safe Draft Behavior

- **Official Service Menu & Prices**: Service cards describe categories without dollar figures; CTA invites clients to confirm current rates on Linktree.
- **Opening Hours**: Visit & Book section notes that daily hours are confirmed via Linktree or telephone.
- **Direct WhatsApp Link**: All primary booking buttons route to `https://linktr.ee/relookbarbershop`.
- **Authentic Shop / Haircut Photos**: Gallery avoids fake stock/AI haircuts and connects directly to `@new_relook_barbershop` while allowing local photo slot previews.

---

## 10. Phase 1 Acceptance Checklist & Phase 2 Handoff

- [x] Every proposed section has a clear purpose, draft English copy, and content rules.
- [x] Header navigation and CTAs point to verified destinations.
- [x] Hero layer order and desktop/mobile composition match the supplied reference.
- [x] Supplied facts, review observations, and pending confirmations are strictly separated.
- [x] Ready for Phase 2 Visual Design System implementation.
