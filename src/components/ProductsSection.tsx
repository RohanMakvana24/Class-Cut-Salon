import React, { useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import {
  PRODUCT_ITEMS,
  ProductCategoryFilter,
  filterProductsByCategory,
  buildProductWhatsAppUrl,
} from '../data/barbershopData';

const PRODUCT_TABS: { id: ProductCategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'hair', label: 'Hair' },
  { id: 'beard', label: 'Beard' },
  { id: 'skin', label: 'Skin' },
];

const getPrice = (price: string) => Number(price.replace(/[^\d]/g, '')) || 0;

const PRODUCT_IMAGES: Record<string, string> = {
  'matte-molding-hair-clay': '/assets/products/matte-clay.jpg',
  'royal-oud-argan-beard-oil': '/assets/products/beard-oil.jpg',
  'charcoal-detan-face-scrub': '/assets/products/detan-scrub.jpg',
  'sea-salt-volume-spray': '/assets/products/sea-salt-mist.jpg',
  'sandalwood-cooling-aftershave': '/assets/products/aftershave-balm.jpg',
  'keratin-repair-hair-serum': '/assets/products/hair-serum.jpg',
};

export const ProductsSection: React.FC = () => {
  const productTrackRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryFilter>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const visibleProducts = filterProductsByCategory(PRODUCT_ITEMS, selectedCategory);
  const cartProducts = PRODUCT_ITEMS.filter((product) => (quantities[product.id] || 0) > 0);
  const totalItems = cartProducts.reduce((sum, product) => sum + quantities[product.id], 0);
  const totalPrice = cartProducts.reduce(
    (sum, product) => sum + getPrice(product.priceInr) * quantities[product.id],
    0
  );

  const changeQuantity = (id: string, change: number) => {
    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[id] || 0) + change);
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  };

  const scrollProducts = (direction: -1 | 1) => {
    productTrackRef.current?.scrollBy({ left: direction * 330, behavior: 'smooth' });
  };

  const orderUrl = buildProductWhatsAppUrl([
    ...cartProducts.map((product) => {
      const quantity = quantities[product.id];
      return `${product.name} × ${quantity} = ₹${getPrice(product.priceInr) * quantity}`;
    }),
    `Order total: ₹${totalPrice}`,
  ]);

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative overflow-hidden border-b border-[#DFAF63]/15 bg-[#0C0907] py-20 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <div className="mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#E5B96F]">
              Shop Menu
            </p>
            <h2
              id="products-heading"
              className="font-display text-4xl uppercase leading-none tracking-[-0.01em] text-[#F7F1E8] sm:text-5xl"
            >
              Our <span className="text-[#E5B96F]">Products</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#C9B8A6] sm:text-base">
              Salon-tested grooming essentials. Add items to your order and confirm pickup on WhatsApp.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter products"
            className="inline-flex w-full gap-1 rounded-xl border border-[#DFAF63]/25 bg-[#140F0C] p-1 sm:w-auto"
          >
            {PRODUCT_TABS.map((tab) => {
              const count = filterProductsByCategory(PRODUCT_ITEMS, tab.id).length;
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 ${
                    active
                      ? 'bg-[#E5B96F] text-[#0C0907]'
                      : 'text-[#C9B8A6] hover:text-[#F7F1E8]'
                  }`}
                >
                  {tab.label} <span className="opacity-65">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-[#9F9285]">Swipe or use arrows to explore</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollProducts(-1)}
              aria-label="Previous products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DFAF63]/35 text-[#E5B96F] transition-colors hover:bg-[#E5B96F] hover:text-[#0C0907]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollProducts(1)}
              aria-label="Next products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DFAF63]/35 text-[#E5B96F] transition-colors hover:bg-[#E5B96F] hover:text-[#0C0907]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={productTrackRef}
          className="products-scroll-track -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
        >
          {visibleProducts.map((product) => {
            const quantity = quantities[product.id] || 0;
            return (
              <article
                key={product.id}
                className={`group relative flex w-[82vw] max-w-[310px] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border bg-[#140F0C] transition-all duration-300 sm:w-[310px] ${
                  quantity > 0 ? 'border-[#E5B96F]/75' : 'border-[#DFAF63]/20 hover:border-[#DFAF63]/45'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#100B08]">
                  <img
                    src={PRODUCT_IMAGES[product.id]}
                    alt={`${product.name} product`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/75 px-2.5 py-1 font-mono text-[10px] font-bold text-[#F7F1E8]">
                    {product.indexLabel}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-[#E5B96F] px-3 py-1 font-mono text-xs font-bold text-[#0C0907]">
                    {product.priceInr}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B99C78]">
                    {product.categoryLabel}
                  </p>
                  <h3 className="mt-1.5 min-h-[44px] text-base font-bold leading-snug text-[#F7F1E8]">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#9F9285]">
                    {product.volume} <span className="mx-1.5 text-[#6C5D50]">·</span> {product.holdOrFinish}
                  </p>

                  <div className="mt-5">
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => changeQuantity(product.id, 1)}
                      className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-[#E5B96F]/55 text-xs font-bold text-[#E5B96F] transition-colors hover:bg-[#E5B96F] hover:text-[#0C0907] focus-ring"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add to order
                    </button>
                  ) : (
                    <div className="flex h-11 w-full items-center justify-between overflow-hidden rounded-xl border border-[#E5B96F]/55">
                      <button
                        type="button"
                        onClick={() => changeQuantity(product.id, -1)}
                        aria-label={`Remove one ${product.name}`}
                        className="flex h-full w-12 items-center justify-center text-[#E5B96F] transition-colors hover:bg-[#E5B96F] hover:text-[#0C0907]"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-bold tabular-nums text-[#F7F1E8]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => changeQuantity(product.id, 1)}
                        aria-label={`Add one ${product.name}`}
                        className="flex h-full w-12 items-center justify-center text-[#E5B96F] transition-colors hover:bg-[#E5B96F] hover:text-[#0C0907]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-7 rounded-2xl border border-[#DFAF63]/30 bg-[#18110D] p-4 sm:p-5">
          {totalItems === 0 ? (
            <div className="flex items-center justify-center gap-2 py-1 text-sm text-[#AFA094]">
              <ShoppingBag className="h-4 w-4" />
              <span>Your order is empty. Add a product to begin.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-[#F7F1E8]">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your order
                </p>
                <p className="mt-1 text-xs text-[#AFA094]">
                  {cartProducts.map((product) => `${product.name} × ${quantities[product.id]}`).join(' · ')}
                </p>
              </div>

              <div className="flex items-center gap-3 sm:shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantities({})}
                  className="px-2 py-2 text-xs font-semibold text-[#AFA094] hover:text-[#F7F1E8]"
                >
                  Clear
                </button>
                <a
                  href={orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#E5B96F] px-5 text-xs font-bold uppercase tracking-[0.06em] text-[#0C0907] transition-colors hover:bg-[#F2CD86] sm:flex-none"
                >
                  Order ₹{totalPrice} on WhatsApp
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
