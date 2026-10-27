import { Instagram } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barbershopData';
import { PrismCarousel, PrismCarouselItem } from './ui/prism-carousel';
import { RisingInk } from './ui/rising-ink';

const TRANSFORMATIONS: PrismCarouselItem[] = [
  {
    src: '/assets/aistudio/image_02ebd036.png',
    alt: 'Classic Cut Salon precision haircut showcase',
    title: 'Precision Fade',
    subtitle: 'Sharp blend · Clean finish',
  },
  {
    src: '/assets/aistudio/image_5ddfe75b.png',
    alt: 'Classic Cut Salon textured hairstyle showcase',
    title: 'Textured Crop',
    subtitle: 'Natural flow · Matte texture',
  },
  {
    src: '/assets/aistudio/image_c6e6f2ed.png',
    alt: 'Classic Cut Salon grooming transformation',
    title: 'Beard Architecture',
    subtitle: 'Balanced shape · Razor detail',
  },
  {
    src: '/assets/aistudio/image_3c3fc679.png',
    alt: 'Classic Cut Salon contemporary haircut',
    title: 'Modern Classic',
    subtitle: 'Scissor craft · Easy styling',
  },
  {
    src: '/assets/aistudio/image_7ef69104.png',
    alt: 'Premium salon finish by Classic Cut Salon',
    title: 'Salon Finish',
    subtitle: 'Tailored detail · Rajkot craft',
  },
];

export const TransformationGallerySection = () => (
  <section id="gallery" aria-labelledby="gallery-heading" className="relative overflow-hidden border-b border-[#DFAF63]/15 bg-[#0C0907] py-20 sm:py-28">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(223,175,99,0.10),transparent_48%)]" />
    <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
      <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#E5B96F]">
          Selected work · Rajkot
        </p>
        <RisingInk
          as="h2"
          id="gallery-heading"
          text="THE CUT IN MOTION"
          color="#F7F1E8"
          colors={['#F4CC82', '#8B541A']}
          lift={0.48}
          radius={1.5}
          className="font-display text-4xl leading-none sm:text-5xl md:text-[3.5rem]"
        />
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#C9B8A6] sm:text-base">
          Swipe through signature fades, texture and finishing work from the Classic Cut chair.
        </p>
      </div>

      <PrismCarousel items={TRANSFORMATIONS} />

      <div className="mt-9 flex justify-center">
        <a
          href={BUSINESS_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-[#DFAF63]/35 bg-[#140F0C]/80 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#E5B96F] transition hover:border-[#E5B96F] hover:bg-[#1C1510]"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          See more on Instagram
        </a>
      </div>
    </div>
  </section>
);
