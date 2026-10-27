import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PrismCarouselItem = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
};

type PrismCarouselProps = {
  items: PrismCarouselItem[];
  startIndex?: number;
  autoplay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  className?: string;
};

const circularOffset = (index: number, active: number, length: number) => {
  let offset = index - active;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
};

export function PrismCarousel({
  items,
  startIndex = 0,
  autoplay = true,
  interval = 4500,
  pauseOnHover = true,
  className = '',
}: PrismCarouselProps) {
  const [active, setActive] = useState(Math.min(startIndex, Math.max(items.length - 1, 0)));
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const dragStart = useRef<number | null>(null);

  const move = useCallback((step: 1 | -1) => {
    if (items.length < 2) return;
    setDirection(step);
    setActive((current) => (current + step + items.length) % items.length);
  }, [items.length]);

  const selectSlide = useCallback((index: number) => {
    setDirection(index >= active ? 1 : -1);
    setActive(index);
  }, [active]);

  useEffect(() => {
    if (!autoplay || paused || items.length < 2) return;
    const timer = window.setInterval(() => move(1), interval);
    return () => window.clearInterval(timer);
  }, [autoplay, interval, items.length, move, paused]);

  if (!items.length) return null;

  return (
    <div
      className={`prism-carousel ${className}`}
      aria-roledescription="carousel"
      aria-label="Classic Cut transformations"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={(event) => {
        dragStart.current = event.clientX;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        if (dragStart.current === null) return;
        const distance = event.clientX - dragStart.current;
        dragStart.current = null;
        if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
      }}
      onPointerCancel={() => { dragStart.current = null; }}
    >
      <div className="prism-carousel__stage">
        {items.map((item, index) => {
          const offset = circularOffset(index, active, items.length);
          const distance = Math.abs(offset);
          const visible = distance <= 2;
          const x = offset * 57;
          const scale = distance === 0 ? 1 : distance === 1 ? 0.72 : 0.57;

          return (
            <article
              key={item.src}
              className="prism-carousel__slide"
              aria-hidden={index !== active}
              style={{
                opacity: visible ? (distance === 0 ? 1 : distance === 1 ? 0.58 : 0.2) : 0,
                pointerEvents: index === active ? 'auto' : 'none',
                transform: `translate3d(calc(-50% + ${x}%), -50%, 0) scale(${scale}) rotateY(${offset * -9}deg)`,
                zIndex: 20 - distance,
                filter: index === active ? 'saturate(1)' : 'saturate(0.15) brightness(0.55)',
              }}
            >
              <img src={item.src} alt={item.alt} draggable={false} />
              {index === active && (
                <div
                  key={`${active}-${direction}`}
                  className={`prism-carousel__sweep ${direction < 0 ? 'is-reversed' : ''}`}
                  aria-hidden="true"
                />
              )}
              <div className="prism-carousel__shade" />
              <div className="prism-carousel__caption">
                <p>{item.subtitle}</p>
                <h3>{item.title}</h3>
              </div>
            </article>
          );
        })}
      </div>

      <div
        className="prism-carousel__controls"
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
      >
        <button type="button" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous transformation">
          <ChevronLeft aria-hidden="true" />
        </button>
        <div className="prism-carousel__dots" aria-label={`Slide ${active + 1} of ${items.length}`}>
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className={index === active ? 'is-active' : ''}
              aria-label={`Show transformation ${index + 1}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={(event) => {
                event.stopPropagation();
                selectSlide(index);
              }}
            />
          ))}
        </div>
        <button type="button" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next transformation">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
