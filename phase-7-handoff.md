# Phase 7 — Final Polish, Preview, and Deployment Handoff (`phase-7-handoff.md`)

## 1. Current Release Status

- **Mode**: **Demo Preview / Local Production Ready** (`noindex, nofollow` enabled).
- **Development Command**: `npm run dev` (runs on port `3000`).
- **Production Build Command**: `npm run build` (outputs static bundle to `dist/`).
- **Type Check Command**: `npm run lint` (`tsc --noEmit`).
- **Unit Test Command**: `npx --yes tsx --test src/data/barbershopData.test.ts`.

## 2. How to Update Content & Assets Before Official Public Launch

1. **Confirm Official Service Menu & Prices (`src/data/barbershopData.ts`)**:
   - Update `SERVICE_ITEMS` `priceNote` values once Amir confirms official Toronto menu pricing.
2. **Confirm Opening Hours & Direct WhatsApp Link (`src/data/barbershopData.ts`)**:
   - Replace `hoursStatus: 'pending_confirmation'` and `whatsappStatus: 'pending_verification'` with the owner-verified daily schedule and official `wa.me` booking link if separate from Linktree.
3. **Install Authentic Transformation Gallery Photos (`src/data/barbershopData.ts`)**:
   - Add real paired Before/After client photos to `INITIAL_GALLERY_SLOTS` (`beforePreviewUrl` / `afterPreviewUrl`) or test them live using the on-page **Upload Before/After Preview** control.
4. **Replace or Tune the Hero Cutout (`src/components/HeroBarberCutout.tsx` & `src/data/barbershopData.ts`)**:
   - Adjust `DEFAULT_HERO_CROP` (`desktopScale`, `desktopOffsetY`, `mobileScale`, `mobileOffsetY`) or drop a transparent `.webp`/`.png` into `/public/assets/` and reference it in `HeroBarberCutout.tsx`.
5. **Switch from Demo Preview to Official Public Launch (`index.html`)**:
   - Once the business owner approves the site and confirms the official production domain:
     - Change `<meta name="robots" content="noindex, nofollow" />` to `<meta name="robots" content="index, follow" />`.
     - Add `<link rel="canonical" href="https://<confirmed-domain>/" />` and `<meta property="og:url" content="https://<confirmed-domain>/" />`.
     - Never use the unrelated Jordan domain `relooksalon.com`.
