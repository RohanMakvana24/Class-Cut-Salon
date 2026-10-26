# Phase 5 — Images and Final Visual Assets (`phase-5-assets.md`)

## 1. Asset Inventory & Provenance

| Asset | Purpose | Path | Format / Ratio | Alt-Text Rule | Status |
| --- | --- | --- | --- | --- | --- |
| Reference Mockup | Desktop/mobile visual target & hybrid cutout source | `/public/assets/aistudio/image_c6e6f2ed.png` | PNG | N/A (internal reference / canvas source) | Supplied by user |
| Studio Barber Cutout | Alpha-transparent decorative hero barber cutout | `/public/assets/hero-barber-cutout.svg` | SVG (`4:5`) | `alt=""` (decorative model, not Amir) | Installed |
| Hybrid Reference Cutout | Canvas-extracted alpha cutout of the seated reference barber | `src/components/HeroBarberCutout.tsx` | HTML5 `<canvas>` (`4:5`) | `alt=""` (`aria-hidden="true"`) | Installed |
| Dark Brick Backdrop | Textured dark brick wall across hero and sections | `src/index.css` (`.bg-dark-brick`) | CSS procedural pattern | Decorative background | Installed |
| Authentic Shop / Haircut Photos | Meet Your Barber & Transformation Gallery | Configurable in `src/data/barbershopData.ts` | `4:5` WebP/JPEG | Descriptive client cut alt text | Pending owner upload (Instagram CTA active) |

## 2. Image Generation Tool Note & Alpha Cutout Engineering

- During Phase 5 execution, the `generate_image` API was invoked with the Phase 5 hero barber prompt (`hero_barber_model_cutout`, `3:4` aspect ratio), which returned `generic::resource_exhausted` (API quota limit in the sandbox).
- Following the explicit Phase 5 instruction (*"If image generation is unavailable or fails, keep the Phase 3 fallback, document the limitation and asset requirements, and integrate other available photos"*), we engineered two complementary real-alpha cutout solutions plus the Phase 3 typographic fallback:
  1. **Hybrid Reference Photo Cutout (`hybrid_photo_cutout` — Default)**: Dynamically crops the central seated bearded barber from the user-supplied reference `/public/assets/aistudio/image_c6e6f2ed.png` onto an HTML5 `<canvas>` and applies a contoured silhouette alpha mask that removes the surrounding wall and reference lettering (`SLICK STYLE`), yielding a genuine alpha-transparent cutout seated in front of our oversized HTML `NEW RELOOK` heading.
  2. **Studio Vector Rim-Lit Cutout (`vector_studio_cutout`)**: Uses `/public/assets/hero-barber-cutout.svg`, a multi-layered vector illustration with warm amber rim lighting, rolled-sleeve cream shirt, dark leather suspenders, crossed tattooed forearms, and 100% native alpha transparency.
  3. **Custom Cutout Upload & Phase 3 Typographic Fallback (`typographic_fallback`)**: Visitors/owners can also upload any `.png`/`.webp` cutout live in the **Hero Cutout & Design System Inspector** or switch to the pure typographic brick fallback.
