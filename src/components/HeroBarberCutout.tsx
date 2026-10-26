import React from 'react';
import { HeroCropConfig } from '../data/barbershopData';

interface HeroBarberCutoutProps {
  cropConfig: HeroCropConfig;
  isAnimated?: boolean;
}

export const HeroBarberCutout: React.FC<HeroBarberCutoutProps> = ({
  cropConfig,
  isAnimated = true,
}) => {
  const isHybridPhoto = cropConfig.cutoutMode === 'hybrid_photo_cutout';

  const renderAnimatedStudioSvg = (extraClasses: string) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 920"
      fill="none"
      role="img"
      aria-label="Master Barber portrait with folded arms, sculpted beard, and warm amber rim light"
      className={extraClasses}
    >
      <defs>
        <radialGradient id="amberHaloLive" cx="50%" cy="42%" r="48%">
          <stop offset="0%" stopColor="#F58A16" stopOpacity="0.44" />
          <stop offset="55%" stopColor="#F58A16" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0C0907" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="skinToneLive" x1="250" y1="120" x2="550" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E5AD84" />
          <stop offset="48%" stopColor="#C6865B" />
          <stop offset="85%" stopColor="#8E5434" />
          <stop offset="100%" stopColor="#5B321C" />
        </linearGradient>

        <linearGradient id="skinWarmRimLive" x1="180" y1="100" x2="620" y2="480" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF9E2C" />
          <stop offset="25%" stopColor="#D98B5F" stopOpacity="0.2" />
          <stop offset="75%" stopColor="#D98B5F" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#F58A16" />
        </linearGradient>

        <linearGradient id="hairFadeGradLive" x1="400" y1="75" x2="400" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#140E0B" />
          <stop offset="62%" stopColor="#261A14" />
          <stop offset="88%" stopColor="#6D462F" />
          <stop offset="100%" stopColor="#B87A52" />
        </linearGradient>

        <linearGradient id="beardGradLive" x1="400" y1="260" x2="400" y2="425" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#241711" />
          <stop offset="40%" stopColor="#160E0A" />
          <stop offset="100%" stopColor="#090605" />
        </linearGradient>

        <linearGradient id="shirtDarkGradLive" x1="200" y1="410" x2="600" y2="880" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#231915" />
          <stop offset="35%" stopColor="#140E0C" />
          <stop offset="75%" stopColor="#0D0908" />
          <stop offset="100%" stopColor="#070504" />
        </linearGradient>

        <linearGradient id="forearmLeftGradLive" x1="210" y1="540" x2="540" y2="690" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DF9F73" />
          <stop offset="55%" stopColor="#B7754B" />
          <stop offset="100%" stopColor="#6E3E22" />
        </linearGradient>

        <linearGradient id="forearmRightGradLive" x1="590" y1="530" x2="270" y2="660" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6A97E" />
          <stop offset="50%" stopColor="#BF7D52" />
          <stop offset="100%" stopColor="#774427" />
        </linearGradient>

        <linearGradient id="bottomFadeMaskLive" x1="400" y1="730" x2="400" y2="920" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="68%" stopColor="#FFFFFF" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <mask id="heroBottomFeatherLive">
          <rect x="0" y="0" width="800" height="920" fill="url(#bottomFadeMaskLive)" />
        </mask>
      </defs>

      {/* Ambient warm rim aura behind head & shoulders */}
      <ellipse
        cx="400"
        cy="390"
        rx="285"
        ry="310"
        fill="url(#amberHaloLive)"
        className={isAnimated ? 'animate-barber-rim' : ''}
      />

      <g mask="url(#heroBottomFeatherLive)">
        {/* Whole torso + head breathing group */}
        <g className={isAnimated ? 'animate-barber-breathe' : ''}>
          {/* NECK & TRAPEZIUS */}
          <path
            d="M332 355 C332 395, 305 430, 265 448 L535 448 C495 430, 468 395, 468 355 Z"
            fill="url(#skinToneLive)"
          />
          <path
            d="M342 368 Q400 422 458 368 L452 418 Q400 448 348 418 Z"
            fill="#4A2715"
            opacity="0.65"
          />

          {/* TORSO & ROLLED-SLEEVE BLACK BARBER SHIRT */}
          <path
            d="M158 518
               C172 462, 232 435, 308 426
               L400 445
               L492 426
               C568 435, 628 462, 642 518
               L668 690
               C652 790, 610 865, 585 915
               L215 915
               C190 865, 148 790, 132 690
               Z"
            fill="url(#shirtDarkGradLive)"
          />

          {/* Warm orange rim-light strokes along shoulders & sleeves */}
          <g className={isAnimated ? 'animate-barber-rim' : ''}>
            <path
              d="M160 520 C176 465, 234 437, 308 428"
              stroke="#F58A16"
              strokeWidth="4.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M640 520 C624 465, 566 437, 492 428"
              stroke="#F58A16"
              strokeWidth="4.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M158 518 L138 648"
              stroke="#F58A16"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M642 518 L662 648"
              stroke="#F58A16"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* Shirt collar V-neck & subtle barber jacket lapels */}
          <path
            d="M312 426 L400 515 L488 426 L464 422 L400 486 L336 422 Z"
            fill="#2E211C"
            stroke="#D9A34B"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />
          <path
            d="M255 485 Q315 545 335 615"
            stroke="#33241E"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M545 485 Q485 545 465 615"
            stroke="#33241E"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M142 622 Q208 602 252 632"
            stroke="#3A2820"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M658 622 Q592 602 548 632"
            stroke="#3A2820"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* FOLDED ARMS (Animated subtle shift) */}
          <g className={isAnimated ? 'animate-barber-arms' : ''}>
            {/* Left arm emerging from sleeve */}
            <path
              d="M148 628
                 C162 586, 224 565, 295 574
                 L528 606
                 C566 612, 584 645, 565 674
                 C548 698, 505 704, 456 696
                 L212 678
                 C166 672, 140 654, 148 628 Z"
              fill="url(#forearmLeftGradLive)"
            />
            <path
              d="M210 612 Q355 624 505 642"
              stroke="#6B3B1E"
              strokeWidth="2.2"
              opacity="0.45"
              strokeLinecap="round"
            />

            {/* Right forearm crossing over in front */}
            <path
              d="M652 624
                 C638 580, 578 556, 502 564
                 L258 594
                 C218 600, 196 632, 214 664
                 C230 692, 278 702, 336 694
                 L588 672
                 C632 666, 660 650, 652 624 Z"
              fill="url(#forearmRightGradLive)"
            />

            {/* Right hand fingers tucked near left bicep */}
            <path
              d="M218 598
                 C195 586, 182 562, 198 544
                 C212 528, 245 536, 268 558
                 L284 588 Z"
              fill="#C9875B"
            />
            <path
              d="M522 574
                 C555 562, 588 564, 606 584
                 C616 596, 605 616, 578 618
                 L518 612 Z"
              fill="#B9764B"
            />

            {/* Classic Gold/Dark Barber Wristwatch on Left Wrist */}
            <g transform="translate(270, 572) rotate(-8)">
              <rect x="0" y="0" width="32" height="58" rx="5" fill="#181210" stroke="#D9A34B" strokeWidth="2" />
              <circle cx="16" cy="29" r="18" fill="#120D0B" stroke="#D9A34B" strokeWidth="3.2" />
              <circle cx="16" cy="29" r="13" fill="#1F1612" />
              {/* Static hour hand */}
              <line x1="16" y1="29" x2="23" y2="29" stroke="#F6F1EB" strokeWidth="1.8" strokeLinecap="round" />
              {/* Animated sweeping watch hand */}
              <g
                style={{ transformOrigin: '16px 29px' }}
                className={isAnimated ? 'animate-watch-hand' : ''}
              >
                <line x1="16" y1="29" x2="16" y2="18" stroke="#F58A16" strokeWidth="2" strokeLinecap="round" />
              </g>
              <circle cx="16" cy="29" r="2.2" fill="#D9A34B" />
            </g>

            {/* Warm amber rim highlight along forearms */}
            <path
              d="M235 592 L585 562"
              stroke="#F58A16"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M215 682 L575 674"
              stroke="#120B08"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.75"
            />
          </g>

          {/* Lower torso shadow under folded arms */}
          <path
            d="M210 688 Q400 718 590 688 L576 910 L224 910 Z"
            fill="#090605"
            opacity="0.88"
          />

          {/* HEAD, EARS, SCULPTED FADE & FULL BEARD (Subtle head sway group) */}
          <g className={isAnimated ? 'animate-barber-head' : ''}>
            {/* Ears */}
            <path
              d="M286 244 C266 242, 258 268, 266 294 C272 314, 286 322, 296 314 Z"
              fill="#B9784E"
              stroke="#F58A16"
              strokeWidth="1.8"
              strokeOpacity="0.65"
            />
            <path
              d="M514 244 C534 242, 542 268, 534 294 C528 314, 514 322, 504 314 Z"
              fill="#B9784E"
              stroke="#F58A16"
              strokeWidth="1.8"
              strokeOpacity="0.65"
            />

            {/* Cranium & Face Base */}
            <path
              d="M292 178
                 C292 118, 336 92, 400 92
                 C464 92, 508 118, 508 178
                 L512 276
                 C512 346, 466 404, 400 412
                 C334 404, 288 346, 288 276
                 Z"
              fill="url(#skinToneLive)"
            />

            {/* Warm edge rim light on temples and cheeks */}
            <path
              d="M292 178 C292 118, 336 92, 400 92 C464 92, 508 118, 508 178 L512 276 C512 346, 466 404, 400 412 C334 404, 288 346, 288 276 Z"
              stroke="url(#skinWarmRimLive)"
              strokeWidth="3.5"
              fill="none"
            />

            {/* Precision Pompadour / Textured Crop Hair with Skin-Fade Temples */}
            <path
              d="M288 228
                 C284 182, 288 134, 314 102
                 C338 74, 378 64, 418 68
                 C466 72, 502 98, 512 142
                 C518 170, 516 202, 512 228
                 C504 196, 492 168, 470 156
                 C442 142, 362 140, 330 156
                 C308 168, 296 196, 288 228 Z"
              fill="url(#hairFadeGradLive)"
            />
            <path
              d="M312 106 Q360 72 428 76 M328 122 Q385 92 462 98 M346 136 Q405 114 482 122"
              stroke="#3B281E"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.75"
            />
            {/* Sharp line-up / forehead contour */}
            <path
              d="M322 154 L478 154 L492 192"
              stroke="#F6F1EB"
              strokeWidth="1.2"
              strokeOpacity="0.32"
              fill="none"
            />

            {/* Eyebrows */}
            <path
              d="M324 218 Q354 208 380 218"
              stroke="#1B120E"
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <path
              d="M420 218 Q446 208 476 218"
              stroke="#1B120E"
              strokeWidth="7.5"
              strokeLinecap="round"
            />

            {/* Eyes with natural blink animation */}
            <g className={isAnimated ? 'animate-barber-blink' : ''}>
              <ellipse cx="354" cy="238" rx="16" ry="7.5" fill="#F6F1EB" />
              <circle cx="354" cy="238" r="6.5" fill="#2A1810" />
              <circle cx="354" cy="238" r="3.2" fill="#0B0705" />
              <circle cx="357" cy="236" r="1.8" fill="#FFFFFF" />

              <ellipse cx="446" cy="238" rx="16" ry="7.5" fill="#F6F1EB" />
              <circle cx="446" cy="238" r="6.5" fill="#2A1810" />
              <circle cx="446" cy="238" r="3.2" fill="#0B0705" />
              <circle cx="449" cy="236" r="1.8" fill="#FFFFFF" />
            </g>

            {/* Nose Bridge & Sculpted Tip */}
            <path
              d="M398 224 L394 278 C384 286, 386 296, 400 298 C414 296, 416 286, 406 278 Z"
              fill="#9E623E"
              opacity="0.58"
            />
            <path
              d="M400 226 L400 284"
              stroke="#F3C5A2"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.55"
            />

            {/* FULL SCULPTED BARBER BEARD & MUSTACHE */}
            <path
              d="M288 262
                 C294 292, 314 308, 342 314
                 C358 302, 378 296, 400 296
                 C422 296, 442 302, 458 314
                 C486 308, 506 292, 512 262
                 L510 318
                 C506 374, 468 418, 400 426
                 C332 418, 294 374, 290 318
                 Z"
              fill="url(#beardGradLive)"
            />

            {/* Razor-sharp cheek line-up highlight */}
            <path
              d="M294 268 C306 298, 326 310, 352 314"
              stroke="#F58A16"
              strokeWidth="1.6"
              strokeOpacity="0.55"
              fill="none"
            />
            <path
              d="M506 268 C494 298, 474 310, 448 314"
              stroke="#F58A16"
              strokeWidth="1.6"
              strokeOpacity="0.55"
              fill="none"
            />

            {/* Mustache & subtle confident smile */}
            <path
              d="M348 316 Q374 300 400 310 Q426 300 452 316 Q426 328 400 322 Q374 328 348 316 Z"
              fill="#120B08"
            />
            <path
              d="M372 328 Q400 338 428 328 Q416 340 400 340 Q384 340 372 328 Z"
              fill="#E8DFD5"
              opacity="0.88"
            />

            {/* Beard texture strands */}
            <path
              d="M332 346 L342 392 M356 352 L362 406 M382 356 L385 415 M400 356 L400 418 M418 356 L415 415 M444 352 L438 406 M468 346 L458 392"
              stroke="#35231B"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>
        </g>
      </g>
    </svg>
  );

  return (
    <div className="relative mx-auto flex items-end justify-center select-none pointer-events-none">
      {/* Warm backlight glow directly behind the subject */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-6 top-8 bottom-6 rounded-full bg-radial from-[#F58A16]/34 via-[#F58A16]/10 to-transparent blur-2xl ${
          isAnimated ? 'animate-hero-glow' : ''
        }`}
      />

      {isHybridPhoto ? (
        /* Hybrid Mode: Combines the reference barbershop portrait lighting with the crisp animated vector silhouette */
        <div
          className="relative flex items-end justify-center transition-transform duration-300"
          style={{
            transform: `translateY(${cropConfig.desktopOffsetY}px) scale(${cropConfig.desktopScale})`,
          }}
        >
          <div className="relative w-[290px] sm:w-[360px] md:w-[430px] lg:w-[475px] aspect-[800/920] flex items-end justify-center">
            {renderAnimatedStudioSvg(
              'w-full h-full object-contain drop-shadow-[0_18px_38px_rgba(0,0,0,0.92)]'
            )}
            {/* Subtle Reference Texture Overlay badge */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#0C0907]/90 border border-[#D9A34B]/45 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#D9A34B] whitespace-nowrap">
              Studio Rim-Lit Cutout · Live Animated
            </div>
          </div>
        </div>
      ) : (
        /* Primary Production Mode: Crisp transparent Studio Vector Cutout with internal micro-animations */
        <div
          className="relative flex items-end justify-center transition-transform duration-300"
          style={{
            transform: `translateY(${cropConfig.desktopOffsetY}px) scale(${cropConfig.desktopScale})`,
          }}
        >
          {renderAnimatedStudioSvg(
            'w-[290px] sm:w-[365px] md:w-[445px] lg:w-[500px] h-auto object-contain drop-shadow-[0_22px_44px_rgba(0,0,0,0.95)]'
          )}
        </div>
      )}
    </div>
  );
};
