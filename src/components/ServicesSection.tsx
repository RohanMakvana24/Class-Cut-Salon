import React, { useState } from 'react';
import {
  Scissors,
  Sparkles,
  Shield,
  Layers,
  Users,
  Compass,
  Zap,
  Palette,
  Monitor,
  ArrowUpRight,
  PhoneCall,
  Calendar,
  Flame,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICE_ITEMS,
  ServiceItem,
  ServiceCategoryFilter,
  filterServicesByCategory,
} from '../data/barbershopData';
import { ShaderCard, ShaderCardFeature, ShaderFlameTheme } from './ShaderCard';

const CATEGORY_TABS: { id: ServiceCategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Services (6)' },
  { id: 'haircuts', label: 'Haircuts & Fades' },
  { id: 'beard', label: 'Beard & Grooming' },
  { id: 'specialty', label: 'Kids & Groom Packages' },
];

function getServiceShaderFeatures(service: ServiceItem): ShaderCardFeature[] {
  switch (service.id) {
    case 'classic-modern-haircuts':
      return [
        { icon: <Zap className="w-4 h-4" />, label: 'Tailored to face & crown shape' },
        { icon: <Palette className="w-4 h-4" />, label: 'Custom textured scissor & clipper cut' },
        { icon: <Layers className="w-4 h-4" />, label: 'Clean neckline & sideburn taper' },
        { icon: <Monitor className="w-4 h-4" />, label: 'Hair wash & blow-dry styling finish' },
      ];
    case 'skin-taper-fades':
      return [
        { icon: <Zap className="w-4 h-4" />, label: 'Seamless zero-gap skin & drop fades' },
        { icon: <Palette className="w-4 h-4" />, label: 'Custom low, mid, or high fade blend' },
        { icon: <Layers className="w-4 h-4" />, label: 'Crisp straight-razor hairline lineup' },
        { icon: <Sparkles className="w-4 h-4" />, label: 'Balanced grow-out contour detailing' },
      ];
    case 'beard-trim-grooming':
      return [
        { icon: <Zap className="w-4 h-4" />, label: 'Precision beard sculpting & tapering' },
        { icon: <Palette className="w-4 h-4" />, label: 'Sharp cheek & jawline razor lineup' },
        { icon: <Shield className="w-4 h-4" />, label: 'Relaxing hot-towel royal shave care' },
        { icon: <Sparkles className="w-4 h-4" />, label: 'Nourishing beard oil & balm finish' },
      ];
    case 'haircut-beard-combo':
      return [
        { icon: <Zap className="w-4 h-4" />, label: 'Complete haircut + beard in 1 session' },
        { icon: <Palette className="w-4 h-4" />, label: 'Connected fade-to-beard transition' },
        { icon: <Layers className="w-4 h-4" />, label: 'Razor detailing & refreshing hair wash' },
        { icon: <Monitor className="w-4 h-4" />, label: 'Ready for events & daily confidence' },
      ];
    case 'kids-family-cuts':
      return [
        { icon: <Zap className="w-4 h-4" />, label: 'Patient, friendly Rajkot stylists' },
        { icon: <Palette className="w-4 h-4" />, label: 'School-ready & trendy youth styles' },
        { icon: <Users className="w-4 h-4" />, label: 'Comfortable hygienic AC salon chair' },
        { icon: <Sparkles className="w-4 h-4" />, label: 'Gentle clipper & scissor detailing' },
      ];
    case 'consultation-lineup':
    default:
      return [
        { icon: <Zap className="w-4 h-4" />, label: 'Men’s de-tan & charcoal facial glow' },
        { icon: <Palette className="w-4 h-4" />, label: 'Custom wedding & festive groom prep' },
        { icon: <Compass className="w-4 h-4" />, label: '1-on-1 hairstyle & beard consultation' },
        { icon: <Sparkles className="w-4 h-4" />, label: 'Relaxing head massage & hair spa' },
      ];
  }
}

function formatShaderTitle(rawTitle: string): string {
  return rawTitle
    .toLowerCase()
    .replace(/(?:^|\s|-)\S/g, (char) => char.toUpperCase());
}

export const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryFilter>('all');
  const [flameTheme, setFlameTheme] = useState<ShaderFlameTheme>('gold');
  const visibleServices = filterServicesByCategory(SERVICE_ITEMS, selectedCategory);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#0C0907] py-20 md:py-28 border-b border-[#DFAF63]/15 overflow-hidden"
    >
      {/* Subtle Ambient Gold Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[380px] rounded-full bg-[#DFAF63]/[0.06] blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section Header + Category Filter Bar + Flame Shader Theme Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-[1px] w-7 bg-[#E5B96F]" />
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#E5B96F]">
                CRAFT &amp; GROOMING MENU · RAJKOT, GUJARAT
              </p>
            </div>
            <h2
              id="services-heading"
              className="font-display uppercase text-4xl sm:text-5xl md:text-[3.5rem] text-[#F7F1E8] tracking-[-0.01em] leading-none"
            >
              OUR{' '}
              <span className="bg-gradient-to-b from-[#FFF2C6] via-[#E5B96F] to-[#C28B37] bg-clip-text text-transparent">
                SERVICES
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
            {/* Shader Flame Theme Switcher (Default Royal Gold vs Violet) */}
            <div
              role="group"
              aria-label="Shader flame color theme"
              className="inline-flex items-center justify-center gap-1 rounded-xl sm:rounded-full border border-[#DFAF63]/25 bg-[#140F0C] p-1 self-start sm:self-auto"
            >
              <button
                type="button"
                onClick={() => setFlameTheme('gold')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  flameTheme === 'gold'
                    ? 'bg-gradient-to-r from-[#E8C27A] to-[#C58E3D] text-[#090705] shadow-[0_4px_14px_rgba(223,175,99,0.35)]'
                    : 'text-[#C9B8A6] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gold Flame</span>
              </button>
              <button
                type="button"
                onClick={() => setFlameTheme('violet')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  flameTheme === 'violet'
                    ? 'bg-[#9333EA] text-white shadow-[0_4px_14px_rgba(147,51,234,0.45)]'
                    : 'text-[#C9B8A6] hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Violet Flame</span>
              </button>
            </div>

            {/* Sleek Category Filter Bar — 2x2 Rounded Grid on Mobile, Pill Bar on sm+ */}
            <div
              role="tablist"
              aria-label="Filter barbershop services by category"
              className="grid grid-cols-2 sm:inline-flex sm:flex-wrap items-center gap-1.5 rounded-2xl sm:rounded-full border border-[#DFAF63]/25 bg-[#140F0C] p-1.5 w-full sm:w-auto self-start lg:self-auto"
            >
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-2.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.03em] sm:tracking-[0.06em] text-center transition-all cursor-pointer focus-ring ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E8C27A] via-[#DFAF63] to-[#C58E3D] text-[#090705] shadow-[0_4px_16px_rgba(223,175,99,0.3)]'
                        : 'text-[#C9B8A6] hover:text-[#F7F1E8]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3x2 Animated WebGL Shader Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {visibleServices.map((service, index) => {
            const isFeatured = Boolean(service.featuredOrangeCard);
            const serviceNumber = `0${index + 1}`;
            return (
              <ShaderCard
                key={service.id}
                badge={`SERVICE ${serviceNumber}`}
                isSignature={isFeatured}
                title={formatShaderTitle(service.title)}
                description={service.description}
                features={getServiceShaderFeatures(service)}
                ctaLabel="Explore & Book"
                ctaHref={BUSINESS_INFO.bookingUrl}
                secondaryLabel={`Call Salon (${BUSINESS_INFO.phoneDisplay})`}
                secondaryHref={BUSINESS_INFO.phoneHref}
                flameTheme={flameTheme}
                phaseOffset={index * 1.35}
              />
            );
          })}
        </div>

        {/* Bottom Custom Consultation & Direct Booking Strip */}
        <div className="luxury-card-shadow mt-10 sm:mt-12 rounded-2xl border border-[#DFAF63]/25 bg-[#140F0C] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-base sm:text-lg font-bold text-[#F7F1E8]">
              Looking for a custom makeover, wedding groom package, or kids haircut timing in Rajkot?
            </p>
            <p className="text-xs sm:text-sm text-[#C9B8A6] mt-1 leading-relaxed">
              Every session at Classic Cut Salon is tailored to your hair texture and consultation. Message us on WhatsApp or call our Arya Nagar, Rajkot salon directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            <a
              href={BUSINESS_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-[#E8C27A] via-[#DFAF63] to-[#C58E3D] text-[#090705] font-bold text-xs uppercase tracking-[0.08em] hover:brightness-110 transition-all shadow-[0_8px_24px_rgba(223,175,99,0.28)] focus-ring"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="truncate">Book via WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full border border-[#DFAF63]/45 text-[#F7F1E8] hover:border-[#E5B96F] hover:text-[#E5B96F] font-semibold text-xs uppercase tracking-[0.08em] transition-colors focus-ring"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E5B96F] shrink-0" />
              <span className="truncate">{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
