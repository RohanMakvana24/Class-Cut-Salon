# Phase 3 — Reference-Style Hero Section Notes (`phase-3-hero-notes.md`)

## 1. Implemented Hero Layer Stack (`src/components/HeroSection.tsx`)

| Layer Order | Z-Index Token | Element & Responsibility | Accessibility / Pointer Behavior |
| --- | --- | --- | --- |
| Layer 1 | `--z-hero-brick` (`1`) | `.bg-dark-brick` exposed dark brick wall pattern | Decorative (`aria-hidden="true"`, `pointer-events-none`) |
| Layer 2 | `--z-hero-lighting` (`10`) | `.hero-warm-edge-glow` warm orange side lighting + subtle edge barber brush/shears silhouettes | Decorative (`aria-hidden="true"`, `pointer-events-none`) |
| Layer 3 | `--z-hero-title` (`20`) | Semantic `<h1>` containing oversized white `NEW RELOOK` lettering and `BARBERSHOP · TORONTO` descriptor | Primary page heading (`h1`) |
| Layer 4 | `--z-hero-model` (`30`) | `HeroBarberCutout` central transparent seated barber cutout overlapping the middle of `NEW RELOOK` | Decorative (`alt=""`, `aria-hidden="true"`, `pointer-events-none`) |
| Layer 5 | `--z-hero-fade` (`40`) | Multi-stop black vertical gradient blending the bottom of the cutout into `#0C0907` | Decorative (`aria-hidden="true"`, `pointer-events-none`) |
| Layer 6 | `--z-hero-foreground` (`50`) | Eglinton West Toronto location badge, concise value statement, `Book Now` (Linktree) and `Call +1 647-222-3540` CTAs | Interactive semantic links (`<a>`) |

## 2. Desktop vs. Mobile Responsive Composition

- **Desktop (`>= 768px`)**:
  - `NEW RELOOK` spans across the upper hero (`clamp(4.5rem, 13.5vw, 11.2rem)`), split with a balanced center gap so `NEW` flanks the left shoulder and `RELOOK` flanks the right shoulder while the barber's pompadour and temples overlap the inner letter edges.
  - The central transparent barber cutout is anchored in a reserved `4:5` aspect-ratio container (`max-w-[490px]`) directly in front of the `NEW RELOOK` lettering.
- **Mobile (`< 768px`)**:
  - `NEW RELOOK` scales fluidly (`clamp(3.1rem, 15.5vw, 5.2rem)`) so it never causes horizontal overflow even at `320px` width.
  - The transparent cutout scales via `--mobile-scale` (`0.96`) with reserved vertical rhythm so the barber's head overlaps the lower third of `NEW RELOOK` while keeping the entire title and foreground booking buttons crisp and unobstructed.

## 3. Cutout Modes & Missing-Image Fallback

- **Hybrid Reference Photo Cutout (`hybrid_photo_cutout`)**: Uses HTML5 Canvas to isolate the central seated barber from the supplied reference asset (`/public/assets/aistudio/image_c6e6f2ed.png`) with a feathered alpha silhouette mask so zero background lettering (`SLICK STYLE`) appears, allowing him to sit cleanly in front of our HTML `NEW RELOOK` heading.
- **Studio Vector Cutout (`vector_studio_cutout`)**: Uses `/public/assets/hero-barber-cutout.svg` with native alpha transparency and warm amber rim lighting.
- **Missing-Asset Typographic Fallback (`typographic_fallback`)**: Deliberate architectural composition featuring the oversized `NEW RELOOK` typography, warm brick lighting, vintage scissor crest emblem, and primary booking actions with zero broken image icons.
