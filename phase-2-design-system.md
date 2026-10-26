# Phase 2 — Visual Design System (`phase-2-design-system.md`)

## 1. Selected Stack & Commands

- **Framework**: React 19 + TypeScript + Vite + Tailwind CSS v4 (`@tailwindcss/vite`).
- **Development Server**: `npm run dev` (serves on `http://localhost:3000`).
- **Production Build**: `npm run build` (`vite build`).
- **Type Check / Lint**: `npm run lint` (`tsc --noEmit`).
- **Unit Tests**: `npx --yes tsx --test src/data/barbershopData.test.ts`.

## 2. Color & Typography Tokens (`src/index.css`)

| CSS Custom Property | Value | Role & Contrast |
| --- | --- | --- |
| `--color-canvas` | `#0C0907` | Deep obsidian-brown main page canvas |
| `--color-panel` | `#181311` | Elevated service, review, and feature panels |
| `--color-brick-base` | `#27150F` | Warm exposed brick wall base tone |
| `--color-primary-orange` | `#F58A16` | Primary buttons, full-width section bands, card borders (contrast with `#0C0907` text: `8.3:1` WCAG AAA) |
| `--color-warm-gold` | `#D9A34B` | Eyebrow labels, brass hardware accents, subtle dividers |
| `--color-main-text` | `#F7F1E8` | Warm ivory headings and primary copy (`17.4:1` on `#0C0907`) |
| `--color-muted-text` | `#C3B6A8` | Supporting descriptions (`9.8:1` on `#0C0907`, `8.1:1` on `#181311`) |

### Typography Pairing
- **Display Font (`--font-display`)**: `'Anton'`, uppercase, tight line-height (`0.94`), fluid `clamp()` scaling so `NEW RELOOK` fills the hero width without horizontal overflow at `320px`.
- **Body Font (`--font-sans`)**: `'DM Sans'`, `15px–16px` with `1.6` line-height for effortless reading on dark surfaces.
- **Monospace Font (`--font-mono`)**: `'JetBrains Mono'` with `tabular-nums` for index numbers, phone digits, and technical specifications.

## 3. Shared Component Inventory

1. **Header (`src/components/Header.tsx`)**: 3-zone top bar with stacked `NEW RELOOK` wordmark, single-line anchor links, `Book Now` CTA, and accessible mobile menu (`Escape` support, focus management, `aria-expanded`).
2. **HeroSection (`src/components/HeroSection.tsx`) & HeroBarberCutout (`src/components/HeroBarberCutout.tsx`)**: 6-layer reference composition with interactive cutout switcher and crop controls.
3. **OrangeSectionBand**: Full-width `#F58A16` section banner with dark `#0C0907` condensed display typography matching the `TRANSFORMATION GALLERY` and `FEEDBACKS` bands in the reference.
4. **ServicesSection (`src/components/ServicesSection.tsx`)**: 3x2 grid featuring the signature angled solid-orange second card (`.service-card-angled`).
5. **DesignSystemPreviewModal (`src/components/DesignSystemPreviewModal.tsx`)**: Internal Phase 2 component preview, interactive 6-layer Hero Stack Diagram, and Phase 1–7 documentation viewer.

## 4. Phase 3 Handoff

- Build the full production home-page hero using the 6-layer stack (`--z-hero-brick` through `--z-hero-foreground`) and test both the active transparent barber cutout and the missing-image typographic fallback.
