import React, { useState } from 'react';
import {
  Instagram,
  Scissors,
  Sparkles,
  Shield,
  ExternalLink,
  ArrowUpRight,
  Upload,
  RotateCcw,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  INITIAL_GALLERY_SLOTS,
  GallerySlotItem,
} from '../data/barbershopData';

const CRAFT_HIGHLIGHTS = [
  {
    badge: 'SIGNATURE FADE WORK',
    steps: ['Consultation & Crown Mapping', 'Seamless Zero-Gap Skin / Mid Fade', 'Textured Scissor Top Finish'],
    icon: Scissors,
  },
  {
    badge: 'BEARD ARCHITECTURE',
    steps: ['Graduated Cheek & Sideburn Blend', 'Crisp Straight-Razor Lineup', 'Conditioning Oil & Shape Balance'],
    icon: Shield,
  },
  {
    badge: 'CLASSIC & YOUTH STYLING',
    steps: ['Shear-Over-Comb Precision Structure', 'Clean Natural Neckline Taper', 'Effortless Everyday Grow-Out'],
    icon: Sparkles,
  },
];

export const TransformationGallerySection: React.FC = () => {
  const [slots, setSlots] = useState<GallerySlotItem[]>(INITIAL_GALLERY_SLOTS);

  const handleUploadPhoto = (
    slotId: string,
    side: 'before' | 'after',
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);

    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id !== slotId) return slot;
        return {
          ...slot,
          status: 'custom_preview_loaded',
          beforePreviewUrl: side === 'before' ? objectUrl : slot.beforePreviewUrl,
          afterPreviewUrl: side === 'after' ? objectUrl : slot.afterPreviewUrl,
        };
      })
    );
  };

  const handleResetSlots = () => {
    setSlots(INITIAL_GALLERY_SLOTS);
  };

  const hasCustomUploads = slots.some((s) => s.status === 'custom_preview_loaded');

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative py-20 sm:py-28 bg-[#0C0907] border-b border-[#DFAF63]/15 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-[1px] w-7 bg-[#E5B96F]" />
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#E5B96F]">
                THE SALON &amp; CRAFT PORTFOLIO · RAJKOT, GUJARAT
              </p>
            </div>
            <h2
              id="gallery-heading"
              className="font-display text-4xl sm:text-5xl md:text-[3.5rem] text-[#F7F1E8] leading-none"
            >
              TRANSFORMATION{' '}
              <span className="bg-gradient-to-b from-[#FFF2C6] via-[#E5B96F] to-[#C28B37] bg-clip-text text-transparent">
                GALLERY
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#C9B8A6] max-w-md leading-relaxed">
            Explore real client haircuts, skin fades, and beard transformations from Classic Cut Salon in Arya Nagar, Rajkot on our official Instagram portfolio.
          </p>
        </div>

        {/* 3 Luxury Lookbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {slots.map((slot, index) => {
            const craft = CRAFT_HIGHLIGHTS[index] || CRAFT_HIGHLIGHTS[0];
            const IconComponent = craft.icon;
            const isCenter = index === 1;
            const hasUploadedPair = Boolean(slot.beforePreviewUrl || slot.afterPreviewUrl);

            return (
              <article
                key={slot.id}
                className={`group luxury-card-shadow rounded-2xl bg-[#140F0C] border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isCenter
                    ? 'border-[#E5B96F]/45 lg:-translate-y-1.5'
                    : 'border-[#DFAF63]/20 hover:border-[#E5B96F]/50'
                }`}
              >
                {/* Visual Showcase Header Area */}
                <div className="relative bg-gradient-to-b from-[#1C1510] to-[#0E0B08] p-6 sm:p-7 border-b border-[#DFAF63]/18">
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E5B96F]">
                      {slot.slotNumber} · {craft.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#140F0C] border border-[#DFAF63]/35 flex items-center justify-center text-[#E5B96F]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {hasUploadedPair ? (
                    <div className="grid grid-cols-2 gap-3 aspect-[4/3] rounded-xl overflow-hidden bg-[#0C0907] border border-[#DFAF63]/30 mb-4">
                      <div className="relative flex items-center justify-center bg-[#120E0B]">
                        {slot.beforePreviewUrl ? (
                          <img
                            src={slot.beforePreviewUrl}
                            alt={`${slot.title} — before haircut`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[11px] font-mono uppercase text-[#C9B8A6]">Before</span>
                        )}
                      </div>
                      <div className="relative flex items-center justify-center bg-[#120E0B]">
                        {slot.afterPreviewUrl ? (
                          <img
                            src={slot.afterPreviewUrl}
                            alt={`${slot.title} — after haircut`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[11px] font-mono uppercase text-[#E5B96F]">After</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Architectural 3-Step Chair Process Visual */
                    <div className="rounded-xl bg-[#0C0907]/90 border border-[#DFAF63]/20 p-4 space-y-2.5">
                      {craft.steps.map((step, sIdx) => (
                        <div
                          key={step}
                          className="flex items-center gap-3 text-xs text-[#E8E2D9]"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#1D1511] border border-[#DFAF63]/40 flex items-center justify-center font-mono text-[10px] text-[#E5B96F] shrink-0">
                            0{sIdx + 1}
                          </span>
                          <span className="font-medium">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subtle Custom Upload Actions + Instagram Link */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#140F0C] border border-[#DFAF63]/30 text-[#C9B8A6] hover:text-[#E5B96F] hover:border-[#E5B96F] cursor-pointer transition-colors whitespace-nowrap">
                        <Upload className="w-3 h-3 text-[#E5B96F] shrink-0" />
                        <span>Before</span>
                        <input
                          type="file"
                          accept="image/*"
                          aria-label={`Upload before photo for ${slot.title}`}
                          onChange={(e) => handleUploadPhoto(slot.id, 'before', e)}
                          className="sr-only"
                        />
                      </label>
                      <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#140F0C] border border-[#DFAF63]/30 text-[#C9B8A6] hover:text-[#E5B96F] hover:border-[#E5B96F] cursor-pointer transition-colors whitespace-nowrap">
                        <Upload className="w-3 h-3 text-[#E5B96F] shrink-0" />
                        <span>After</span>
                        <input
                          type="file"
                          accept="image/*"
                          aria-label={`Upload after photo for ${slot.title}`}
                          onChange={(e) => handleUploadPhoto(slot.id, 'after', e)}
                          className="sr-only"
                        />
                      </label>
                    </div>

                    <a
                      href={BUSINESS_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#E5B96F] hover:underline whitespace-nowrap"
                    >
                      <span>View on IG</span>
                      <ArrowUpRight className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Card Details Footer */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#D9A34B] mb-1.5">
                      {slot.categoryLabel}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl text-[#F7F1E8] group-hover:text-[#E5B96F] transition-colors">
                      {slot.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#C9B8A6] leading-relaxed">
                      {slot.framingNote}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Luxury Instagram Portfolio Banner */}
        <div className="luxury-card-shadow mt-10 sm:mt-12 rounded-2xl bg-[#140F0C] border border-[#DFAF63]/28 p-5 sm:p-9 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 text-left">
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#E5B96F]">
              AUTHENTIC PORTFOLIO · RAJKOT, GUJARAT
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-[#F7F1E8]">
              VIEW REAL CUTS &amp; FADES ON INSTAGRAM
            </h3>
            <p className="text-xs sm:text-sm text-[#C9B8A6] max-w-xl leading-relaxed">
              We never display stock or AI-generated haircuts as salon work. Browse authentic client transformations from Classic Cut Salon, Arya Nagar, Rajkot on our Instagram page.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 shrink-0 w-full md:w-auto">
            {hasCustomUploads && (
              <button
                type="button"
                onClick={handleResetSlots}
                className="w-full sm:w-auto max-w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.06em] sm:tracking-[0.1em] border border-[#DFAF63]/40 text-[#C9B8A6] hover:text-[#F7F1E8] rounded-xl sm:rounded-full transition-colors cursor-pointer focus-ring"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Reset Previews</span>
              </button>
            )}

            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto max-w-full min-h-[46px] inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-6 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-normal sm:tracking-[0.08em] bg-gradient-to-r from-[#E8C27A] via-[#DFAF63] to-[#C58E3D] text-[#090705] hover:brightness-110 rounded-xl sm:rounded-full transition-all shadow-[0_8px_24px_rgba(223,175,99,0.28)] focus-ring"
            >
              <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">Follow {BUSINESS_INFO.instagramHandle}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
