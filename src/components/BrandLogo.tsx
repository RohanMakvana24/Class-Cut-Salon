import React from 'react';
import { ThemeMode } from '../data/barbershopData';

interface BrandLogoProps {
  size?: 'default' | 'lg';
  theme?: ThemeMode;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'default',
  theme = 'dark',
  className = '',
}) => {
  const isLarge = size === 'lg';
  const isLight = theme === 'light';

  return (
    <a
      href="#top"
      aria-label="Classic Cut Salon — Back to top"
      className={`group inline-flex items-center ${
        isLarge ? 'gap-3.5' : 'gap-2.5 md:gap-3'
      } shrink-0 select-none focus-ring ${className}`}
    >
      {/* Unique Luxury Crossed Barber Shears & Royal Crown Diamond Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 68 68"
          fill="none"
          aria-hidden="true"
          className={`relative z-10 transition-transform duration-300 group-hover:scale-105 ${
            isLarge
              ? 'w-[50px] h-[50px]'
              : 'w-9 h-9 md:w-[46px] md:h-[46px]'
          }`}
        >
          <defs>
            <linearGradient id="ccGoldPrimary" x1="6" y1="6" x2="62" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF0B8" />
              <stop offset="35%" stopColor="#E5B96F" />
              <stop offset="70%" stopColor="#B87D28" />
              <stop offset="100%" stopColor="#F5DA96" />
            </linearGradient>

            <linearGradient id="ccGoldRich" x1="14" y1="12" x2="54" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFAF63" />
              <stop offset="100%" stopColor="#8F5D16" />
            </linearGradient>

            <linearGradient id="ccBladeContrast" x1="16" y1="14" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isLight ? '#2B2017' : '#FFFFFF'} />
              <stop offset="100%" stopColor={isLight ? '#0F0A07' : '#CFC6B8'} />
            </linearGradient>
          </defs>

          {/* Outer Architectural Faceted Diamond / Octagon Frame */}
          <path
            d="M34 4 L49 9 L59 19 L64 34 L59 49 L49 59 L34 64 L19 59 L9 49 L4 34 L9 19 L19 9 Z"
            stroke="url(#ccGoldPrimary)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Inner Precision Hairline Diamond */}
          <path
            d="M34 8.5 L59.5 34 L34 59.5 L8.5 34 Z"
            stroke="url(#ccGoldPrimary)"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeLinejoin="round"
          />

          {/* Top 3-Point Royal Barber Crown */}
          <path
            d="M27.5 19.5 L29.2 14.2 L34 17.4 L38.8 14.2 L40.5 19.5 Z"
            fill="url(#ccGoldPrimary)"
          />
          <circle cx="34" cy="12" r="1.3" fill="url(#ccGoldPrimary)" />
          <circle cx="28.2" cy="12.6" r="1" fill="url(#ccGoldPrimary)" />
          <circle cx="39.8" cy="12.6" r="1" fill="url(#ccGoldPrimary)" />

          {/* Crossed Precision Barber Shears — Blade 1 (Top-Left Tip to Bottom-Right Ring) */}
          <path
            d="M19.5 17.5 L36.8 34.8 L34.2 37.4 L18.2 20.2 C17.8 19.1 18.4 18 19.5 17.5 Z"
            fill="url(#ccBladeContrast)"
          />
          <path
            d="M34.2 35.2 L42.5 43.8"
            stroke="url(#ccBladeContrast)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Crossed Precision Barber Shears — Blade 2 (Top-Right Tip to Bottom-Left Ring) */}
          <path
            d="M48.5 17.5 L31.2 34.8 L33.8 37.4 L49.8 20.2 C50.2 19.1 49.6 18 48.5 17.5 Z"
            fill="url(#ccGoldPrimary)"
          />
          <path
            d="M33.8 35.2 L25.5 43.8"
            stroke="url(#ccGoldPrimary)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Left Scissor Finger Ring + Pinky Tang */}
          <circle
            cx="22.8"
            cy="47.2"
            r="5.2"
            stroke="url(#ccGoldPrimary)"
            strokeWidth="2.5"
          />
          <path
            d="M17.8 49.5 C15.8 50.8 14.8 52.2 14.5 53.5"
            stroke="url(#ccGoldPrimary)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Right Scissor Finger Ring + Pinky Tang */}
          <circle
            cx="45.2"
            cy="47.2"
            r="5.2"
            stroke="url(#ccBladeContrast)"
            strokeWidth="2.5"
          />
          <path
            d="M50.2 49.5 C52.2 50.8 53.2 52.2 53.5 53.5"
            stroke="url(#ccBladeContrast)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Center Tension Pivot Screw Jewel */}
          <circle
            cx="34"
            cy="34.2"
            r="2.6"
            fill={isLight ? '#FFFFFF' : '#120E0B'}
            stroke="url(#ccGoldPrimary)"
            strokeWidth="1.6"
          />

          {/* Bottom Mustache / Razor Wing Flourish */}
          <path
            d="M27.5 55.2 Q34 58.2 40.5 55.2"
            stroke="url(#ccGoldRich)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Modern High-Contrast Luxury Wordmark Lockup: CLASSIC CUT SALON */}
      <div className="flex flex-col justify-center">
        {/* Main Wordmark: CLASSIC / CUT */}
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-hero-geometric tracking-[0.06em] transition-colors ${
              isLight ? 'text-[#16100B]' : 'text-[#FFFFFF]'
            } ${
              isLarge
                ? 'text-xl sm:text-[22px]'
                : 'text-[15px] md:text-[20px] lg:text-[21px]'
            }`}
          >
            CLASSIC
          </span>

          {/* Diagonal Gold Razor Slash Divider */}
          <span
            aria-hidden="true"
            className={`inline-block w-[1.8px] rotate-[18deg] bg-gradient-to-b from-[#FCE3A6] via-[#DFAF63] to-[#9A6519] mx-0.5 self-center ${
              isLarge ? 'h-4' : 'h-3 md:h-4'
            }`}
          />

          <span
            className={`font-hero-geometric tracking-[0.06em] ${
              isLight
                ? 'text-[#B87314]'
                : 'bg-gradient-to-b from-[#FFF2C6] via-[#E5B96F] to-[#C28B37] bg-clip-text text-transparent'
            } ${
              isLarge
                ? 'text-xl sm:text-[22px]'
                : 'text-[15px] md:text-[20px] lg:text-[21px]'
            }`}
          >
            CUT
          </span>
        </div>

        {/* Bottom Rule + SALON */}
        <div className="mt-0.5 md:mt-1 flex items-center gap-1.5">
          <span
            className={`h-[1px] w-4 md:w-5 ${
              isLight ? 'bg-[#B87314]/60' : 'bg-[#E5B96F]/65'
            }`}
          />
          <span
            className={`font-crest-serif uppercase tracking-[0.3em] font-semibold leading-none ${
              isLight ? 'text-[#5C4B3B]' : 'text-[#DED6C8]'
            } ${isLarge ? 'text-[9px]' : 'text-[7.5px] md:text-[8.8px]'}`}
          >
            SALON
          </span>
          <span
            className={`h-[1px] flex-1 ${
              isLight
                ? 'bg-gradient-to-r from-[#B87314]/60 to-transparent'
                : 'bg-gradient-to-r from-[#E5B96F]/65 to-transparent'
            }`}
          />
        </div>
      </div>
    </a>
  );
};
