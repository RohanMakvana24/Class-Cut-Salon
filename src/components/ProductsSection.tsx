import React, { useState } from 'react';
import {
  ShoppingBag,
  Check,
  Plus,
  ArrowUpRight,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  PRODUCT_ITEMS,
  ProductItem,
  ProductCategoryFilter,
  filterProductsByCategory,
  buildProductWhatsAppUrl,
} from '../data/barbershopData';

const PRODUCT_TABS: { id: ProductCategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Products (6)' },
  { id: 'hair', label: 'Hair Styling' },
  { id: 'beard', label: 'Beard & Shave' },
  { id: 'skin', label: 'Skin & Care' },
];

const ProductBottleIllustration: React.FC<{
  style: ProductItem['bottleStyle'];
  indexLabel: string;
}> = ({ style, indexLabel }) => {
  return (
    <svg
      viewBox="0 0 220 200"
      className="w-full h-44 sm:h-48 drop-shadow-[0_18px_28px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:scale-105"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`goldFoil-${indexLabel}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2C6" />
          <stop offset="45%" stopColor="#E5B96F" />
          <stop offset="100%" stopColor="#A87424" />
        </linearGradient>
        <linearGradient id={`darkGlass-${indexLabel}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1B1410" />
          <stop offset="28%" stopColor="#2E221A" />
          <stop offset="70%" stopColor="#140F0B" />
          <stop offset="100%" stopColor="#090705" />
        </linearGradient>
        <linearGradient id={`amberGlass-${indexLabel}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A4414" />
          <stop offset="50%" stopColor="#3E2009" />
          <stop offset="100%" stopColor="#190D04" />
        </linearGradient>
        <radialGradient id={`pedestalGlow-${indexLabel}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DFAF63" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#DFAF63" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Studio Pedestal Shadow & Warm Rim Reflection */}
      <ellipse cx="110" cy="176" rx="64" ry="12" fill={`url(#pedestalGlow-${indexLabel})`} />
      <ellipse cx="110" cy="176" rx="46" ry="6" fill="#050403" opacity="0.75" />

      {style === 'jar' && (
        <g>
          {/* Wide Luxury Matte Clay Apothecary Jar */}
          <rect
            x="54"
            y="64"
            width="112"
            height="22"
            rx="5"
            fill={`url(#goldFoil-${indexLabel})`}
          />
          <line x1="58" y1="75" x2="162" y2="75" stroke="#18120D" strokeWidth="1" opacity="0.35" />
          <rect
            x="50"
            y="84"
            width="120"
            height="86"
            rx="14"
            fill={`url(#darkGlass-${indexLabel})`}
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1.2"
          />
          {/* Specular studio glass highlight */}
          <rect x="60" y="90" width="8" height="74" rx="4" fill="#FFF2C6" opacity="0.08" />
          {/* Front Foil Label */}
          <rect
            x="64"
            y="100"
            width="92"
            height="54"
            rx="6"
            fill="#0E0A08"
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1"
          />
          <text
            x="110"
            y="118"
            textAnchor="middle"
            fill="#E5B96F"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="2.2"
          >
            CLASSIC CUT
          </text>
          <text
            x="110"
            y="131"
            textAnchor="middle"
            fill="#F7F1E8"
            fontSize="7"
            letterSpacing="1.6"
          >
            MATTE HAIR CLAY
          </text>
          <text
            x="110"
            y="144"
            textAnchor="middle"
            fill="#C9B8A6"
            fontSize="6"
            letterSpacing="1.2"
          >
            STRONG HOLD · 100G
          </text>
        </g>
      )}

      {style === 'dropper' && (
        <g>
          {/* Rubber pipette bulb */}
          <rect x="99" y="24" width="22" height="24" rx="10" fill="#18120E" stroke="#DFAF63" strokeWidth="0.8" />
          {/* Gold ridged collar */}
          <rect x="93" y="45" width="34" height="15" rx="3" fill={`url(#goldFoil-${indexLabel})`} />
          {/* Neck */}
          <path d="M96 60 L82 78 L138 78 L124 60 Z" fill={`url(#amberGlass-${indexLabel})`} />
          {/* Bottle Body */}
          <rect
            x="76"
            y="76"
            width="68"
            height="96"
            rx="12"
            fill={`url(#amberGlass-${indexLabel})`}
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1.2"
          />
          <rect x="83" y="82" width="6" height="82" rx="3" fill="#FFF2C6" opacity="0.14" />
          {/* Label */}
          <rect
            x="82"
            y="94"
            width="56"
            height="62"
            rx="4"
            fill="#0E0A08"
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1"
          />
          <text x="110" y="113" textAnchor="middle" fill="#E5B96F" fontSize="7.5" fontWeight="700" letterSpacing="1.6">
            CLASSIC CUT
          </text>
          <text x="110" y="126" textAnchor="middle" fill="#F7F1E8" fontSize="6.5" letterSpacing="1.2">
            ROYAL OUD
          </text>
          <text x="110" y="137" textAnchor="middle" fill="#E5B96F" fontSize="6" letterSpacing="1.2">
            BEARD OIL
          </text>
          <text x="110" y="149" textAnchor="middle" fill="#C9B8A6" fontSize="5.5" letterSpacing="1">
            50 ML · ARGAN
          </text>
        </g>
      )}

      {style === 'tube' && (
        <g>
          {/* Matte Charcoal Facial Scrub Tube */}
          <path
            d="M72 40 L148 40 L136 148 L84 148 Z"
            fill={`url(#darkGlass-${indexLabel})`}
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1.2"
          />
          {/* Top crimp seal */}
          <rect x="70" y="34" width="80" height="7" rx="2" fill={`url(#goldFoil-${indexLabel})`} />
          {/* Flip cap at bottom */}
          <rect x="88" y="148" width="44" height="22" rx="5" fill={`url(#goldFoil-${indexLabel})`} />
          {/* Tube label */}
          <text x="110" y="72" textAnchor="middle" fill="#E5B96F" fontSize="8" fontWeight="700" letterSpacing="1.8">
            CLASSIC CUT
          </text>
          <line x1="88" y1="80" x2="132" y2="80" stroke="#E5B96F" strokeWidth="0.8" opacity="0.5" />
          <text x="110" y="96" textAnchor="middle" fill="#F7F1E8" fontSize="7" fontWeight="600" letterSpacing="1.3">
            CHARCOAL
          </text>
          <text x="110" y="108" textAnchor="middle" fill="#E5B96F" fontSize="6.5" letterSpacing="1.3">
            DE-TAN SCRUB
          </text>
          <text x="110" y="126" textAnchor="middle" fill="#C9B8A6" fontSize="5.8" letterSpacing="1">
            120 ML · DETOX
          </text>
        </g>
      )}

      {style === 'spray' && (
        <g>
          {/* Nozzle cap & atomizer */}
          <rect x="98" y="24" width="24" height="20" rx="4" fill="#17120E" stroke="#E5B96F" strokeWidth="0.9" />
          <circle cx="110" cy="34" r="2.5" fill="#E5B96F" />
          <rect x="92" y="44" width="36" height="14" rx="3" fill={`url(#goldFoil-${indexLabel})`} />
          {/* Tall Cylindrical Sea Salt Mist Bottle */}
          <rect
            x="80"
            y="58"
            width="60"
            height="114"
            rx="14"
            fill={`url(#darkGlass-${indexLabel})`}
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1.2"
          />
          <rect x="87" y="66" width="5" height="96" rx="2.5" fill="#FFF2C6" opacity="0.1" />
          <rect
            x="85"
            y="82"
            width="50"
            height="68"
            rx="4"
            fill="#0E0A08"
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="0.9"
          />
          <text x="110" y="102" textAnchor="middle" fill="#E5B96F" fontSize="7" fontWeight="700" letterSpacing="1.5">
            CLASSIC CUT
          </text>
          <text x="110" y="116" textAnchor="middle" fill="#F7F1E8" fontSize="6.5" letterSpacing="1.2">
            SEA SALT
          </text>
          <text x="110" y="127" textAnchor="middle" fill="#E5B96F" fontSize="6" letterSpacing="1.2">
            VOLUME MIST
          </text>
          <text x="110" y="141" textAnchor="middle" fill="#C9B8A6" fontSize="5.5" letterSpacing="1">
            150 ML · PRE-STYLE
          </text>
        </g>
      )}

      {style === 'balm' && (
        <g>
          {/* Classic Barbershop Apothecary Aftershave Flask */}
          <rect x="92" y="34" width="36" height="18" rx="4" fill={`url(#goldFoil-${indexLabel})`} />
          <path d="M95 52 L74 74 L146 74 L125 52 Z" fill={`url(#darkGlass-${indexLabel})`} stroke="#DFAF63" strokeWidth="1" />
          <rect
            x="70"
            y="72"
            width="80"
            height="98"
            rx="14"
            fill={`url(#darkGlass-${indexLabel})`}
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1.2"
          />
          <rect
            x="78"
            y="90"
            width="64"
            height="64"
            rx="6"
            fill="#0E0A08"
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1"
          />
          <text x="110" y="109" textAnchor="middle" fill="#E5B96F" fontSize="7.5" fontWeight="700" letterSpacing="1.6">
            CLASSIC CUT
          </text>
          <text x="110" y="122" textAnchor="middle" fill="#F7F1E8" fontSize="6.5" letterSpacing="1.1">
            SANDALWOOD
          </text>
          <text x="110" y="133" textAnchor="middle" fill="#E5B96F" fontSize="6" letterSpacing="1.1">
            AFTERSHAVE BALM
          </text>
          <text x="110" y="146" textAnchor="middle" fill="#C9B8A6" fontSize="5.5" letterSpacing="1">
            100 ML · SOOTHING
          </text>
        </g>
      )}

      {style === 'serum' && (
        <g>
          {/* Luxury Pump Serum Bottle */}
          <path d="M102 26 L124 26 L124 31 L114 31 L114 44 L104 44 Z" fill={`url(#goldFoil-${indexLabel})`} />
          <rect x="94" y="44" width="32" height="14" rx="3" fill={`url(#goldFoil-${indexLabel})`} />
          <rect
            x="78"
            y="58"
            width="64"
            height="112"
            rx="16"
            fill={`url(#amberGlass-${indexLabel})`}
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1.2"
          />
          <rect x="85" y="66" width="6" height="94" rx="3" fill="#FFF2C6" opacity="0.14" />
          <rect
            x="84"
            y="84"
            width="52"
            height="66"
            rx="5"
            fill="#0E0A08"
            stroke={`url(#goldFoil-${indexLabel})`}
            strokeWidth="1"
          />
          <text x="110" y="104" textAnchor="middle" fill="#E5B96F" fontSize="7" fontWeight="700" letterSpacing="1.5">
            CLASSIC CUT
          </text>
          <text x="110" y="117" textAnchor="middle" fill="#F7F1E8" fontSize="6.5" letterSpacing="1.2">
            PRO-KERATIN
          </text>
          <text x="110" y="128" textAnchor="middle" fill="#E5B96F" fontSize="6" letterSpacing="1.2">
            HAIR SERUM
          </text>
          <text x="110" y="142" textAnchor="middle" fill="#C9B8A6" fontSize="5.5" letterSpacing="1">
            60 ML · ANTI-FRIZZ
          </text>
        </g>
      )}
    </svg>
  );
};

export const ProductsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryFilter>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const visibleProducts = filterProductsByCategory(PRODUCT_ITEMS, selectedCategory);
  const selectedProducts = PRODUCT_ITEMS.filter((item) => selectedProductIds.includes(item.id));

  const toggleProductSelection = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalSelectedInr = selectedProducts.reduce((sum, item) => {
    const numeric = Number(item.priceInr.replace(/[^\d]/g, '')) || 0;
    return sum + numeric;
  }, 0);

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative bg-[#0C0907] py-20 md:py-28 border-b border-[#DFAF63]/15 overflow-hidden"
    >
      {/* Subtle Ambient Gold Studio Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-0 w-[620px] h-[420px] rounded-full bg-[#DFAF63]/[0.06] blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section Header + Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-[1px] w-7 bg-[#E5B96F]" />
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#E5B96F]">
                SALON APOTHECARY &amp; ESSENTIALS · RAJKOT
              </p>
            </div>
            <h2
              id="products-heading"
              className="font-display uppercase text-4xl sm:text-5xl md:text-[3.5rem] text-[#F7F1E8] tracking-[-0.01em] leading-none"
            >
              OUR{' '}
              <span className="bg-gradient-to-b from-[#FFF2C6] via-[#E5B96F] to-[#C28B37] bg-clip-text text-transparent">
                PRODUCTS
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-[#DFD3C5] leading-relaxed">
              Take the Classic Cut Salon finish home. Professional hair clays, cold-pressed beard oils, and de-tan care used daily by our barbers at Pedak Cross Road, Arya Nagar, Rajkot.
            </p>
          </div>

          {/* Sleek Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter salon grooming products by category"
            className="grid grid-cols-2 sm:inline-flex sm:flex-wrap items-center gap-1.5 rounded-2xl sm:rounded-full border border-[#DFAF63]/30 bg-[#140F0C] p-1.5 w-full sm:w-auto self-start lg:self-auto"
          >
            {PRODUCT_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.03em] sm:tracking-[0.06em] text-center transition-all cursor-pointer focus-ring ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E8C27A] via-[#DFAF63] to-[#C58E3D] text-[#090705] shadow-[0_4px_16px_rgba(223,175,99,0.3)]'
                      : 'text-[#F7F1E8]/85 hover:text-[#E5B96F]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Multi-Product Pickup Bar (Visible when items are selected) */}
        {selectedProducts.length > 0 && (
          <div
            role="region"
            aria-label="Selected products for salon pickup"
            className="luxury-card-shadow mb-8 rounded-2xl border border-[#E5B96F]/50 bg-[#140F0C] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E5B96F]/15 border border-[#E5B96F]/40 flex items-center justify-center text-[#E5B96F] shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#F7F1E8]">
                  {selectedProducts.length}{' '}
                  {selectedProducts.length === 1 ? 'Product' : 'Products'} Selected for In-Salon Pickup ·{' '}
                  <span className="text-[#E5B96F] font-mono tabular-nums">₹{totalSelectedInr}</span>
                </p>
                <p className="text-xs text-[#DFD3C5] mt-0.5">
                  {selectedProducts.map((p) => p.name).join(' · ')}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProductIds([])}
                className="px-3.5 py-2 rounded-lg border border-[#DFAF63]/35 text-xs font-medium text-[#DFD3C5] hover:text-[#F7F1E8] hover:border-[#DFAF63]/70 transition-colors cursor-pointer focus-ring"
              >
                Clear
              </button>
              <a
                href={buildProductWhatsAppUrl(selectedProducts.map((p) => `${p.name} (${p.priceInr})`))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#FFF2C6] via-[#E5B96F] to-[#C8923B] text-[#090705] font-bold text-xs uppercase tracking-[0.06em] hover:brightness-105 transition-all focus-ring"
              >
                <span>Reserve on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* 3x2 Luxury Grooming Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {visibleProducts.map((product) => {
            const isSelected = selectedProductIds.includes(product.id);
            const singleProductWaUrl = buildProductWhatsAppUrl([
              `${product.name} (${product.volume} - ${product.priceInr})`,
            ]);

            return (
              <article
                key={product.id}
                className={`group luxury-card-shadow relative rounded-[24px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-[#140F0C] border ${
                  isSelected
                    ? 'border-[#E5B96F]'
                    : product.featured
                    ? 'border-[#E5B96F]/45 hover:border-[#E5B96F]'
                    : 'border-[#DFAF63]/20 hover:border-[#E5B96F]/55'
                }`}
              >
                <div>
                  {/* Top Row: Editorial Index + Category Metadata & Price */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#E5B96F]">
                      <span>{product.indexLabel}.</span>
                      <span>{product.categoryLabel}</span>
                      {product.featured && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#F58A16] font-bold">Bestseller</span>
                        </>
                      )}
                    </div>
                    <span className="font-mono text-lg sm:text-xl font-bold text-[#F7F1E8] tabular-nums">
                      {product.priceInr}
                    </span>
                  </div>

                  {/* Studio Bottle Illustration Stage (Always rich dark velvet stage so gold bottle pops) */}
                  <div className="product-stage-dark relative my-2 rounded-2xl bg-gradient-to-b from-[#1D1510] via-[#120D09] to-[#0A0705] border border-[#DFAF63]/25 py-4 px-3 flex items-center justify-center overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(229,185,111,0.18),transparent_70%)]"
                    />
                    <ProductBottleIllustration
                      style={product.bottleStyle}
                      indexLabel={product.indexLabel}
                    />
                  </div>

                  {/* Unboxed Clean Spec Line (Volume · Hold/Finish) */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-[#DFD3C5]">
                    <span className="font-mono font-semibold text-[#E5B96F]">{product.volume}</span>
                    <span aria-hidden="true" className="text-[#E5B96F]/60">·</span>
                    <span>{product.holdOrFinish}</span>
                    <span aria-hidden="true" className="text-[#E5B96F]/60">·</span>
                    <span className="text-[#E5B96F] font-semibold">In Stock at Salon</span>
                  </div>

                  {/* Product Title & Description */}
                  <h3 className="mt-2 font-sans text-xl sm:text-2xl font-bold text-[#F7F1E8] tracking-[-0.02em] leading-snug">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#DFD3C5] leading-relaxed">
                    {product.description}
                  </p>

                  {/* Key Benefits */}
                  <ul className="mt-4 pt-4 border-t border-[#DFAF63]/20 space-y-2">
                    {product.keyBenefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-[#F7F1E8]"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#E5B96F] shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons: Select for Pickup + Direct WhatsApp Order */}
                <div className="mt-6 pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggleProductSelection(product.id)}
                    aria-pressed={isSelected}
                    className={`flex-1 min-h-[42px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold tracking-[0.02em] transition-all cursor-pointer focus-ring ${
                      isSelected
                        ? 'border-[#E5B96F] bg-[#E5B96F]/20 text-[#F7F1E8]'
                        : 'border-[#DFAF63]/45 bg-transparent text-[#E5B96F] hover:border-[#E5B96F] hover:bg-[#E5B96F]/10'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#E5B96F] shrink-0" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-[#E5B96F] shrink-0" />
                        <span>Add to Pickup</span>
                      </>
                    )}
                  </button>

                  <a
                    href={singleProductWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFF2C6] via-[#E5B96F] to-[#C8923B] text-[#090705] font-bold text-xs tracking-[0.02em] hover:brightness-105 transition-all focus-ring"
                  >
                    <span>Buy via WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom In-Salon Guidance Banner */}
        <div className="luxury-card-shadow mt-10 sm:mt-12 rounded-2xl border border-[#DFAF63]/25 bg-[#140F0C] p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-sm sm:text-base font-bold text-[#F7F1E8]">
              Not sure whether Matte Clay, Sea Salt Spray, or Beard Oil suits your hair type best?
            </p>
            <p className="text-xs sm:text-sm text-[#DFD3C5] mt-1 leading-relaxed">
              Ask your barber during your haircut at Classic Cut Salon (Pedak Cross Road, Arya Nagar, Rajkot) for a free product test and styling demo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={buildProductWhatsAppUrl([])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-[#E8C27A] via-[#DFAF63] to-[#C58E3D] text-[#090705] font-bold text-xs uppercase tracking-[0.08em] hover:brightness-110 transition-all focus-ring"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Ask Product Price &amp; Combo</span>
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full border border-[#DFAF63]/45 text-[#F7F1E8] hover:border-[#E5B96F] hover:text-[#E5B96F] font-semibold text-xs uppercase tracking-[0.08em] transition-colors focus-ring"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E5B96F] shrink-0" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
