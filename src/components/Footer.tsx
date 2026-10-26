import React from 'react';
import { Phone, MapPin, Instagram, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, ThemeMode } from '../data/barbershopData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  theme?: ThemeMode;
  onOpenInspector: (initialTab?: 'layers' | 'tokens' | 'docs') => void;
}

export const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
  return (
    <footer className="bg-[#090705] text-[#C9B8A6] border-t border-[#DFAF63]/20 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DFAF63]/15">
          {/* Brand & Rajkot Location */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo size="lg" theme={theme} />
            <p className="text-xs sm:text-sm text-[#C9B8A6] max-w-sm leading-relaxed">
              Premier men&apos;s grooming salon at {BUSINESS_INFO.fullAddress}. Precision haircuts, skin fades, beard styling, de-tan facials, and children&apos;s cuts in Rajkot.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold text-[#E5B96F]">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-1.5 hover:underline focus-ring"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <span aria-hidden="true" className="text-[#DFAF63]/40">·</span>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:underline focus-ring"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Pedak Road, Arya Nagar, Rajkot</span>
              </a>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#E5B96F]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#top" className="hover:text-[#E5B96F] transition-colors focus-ring">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E5B96F] transition-colors focus-ring">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#E5B96F] transition-colors focus-ring">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E5B96F] transition-colors focus-ring">
                  Meet Your Salon
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E5B96F] transition-colors focus-ring">
                  Transformation Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#E5B96F] transition-colors focus-ring">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E5B96F] transition-colors focus-ring">
                  Visit &amp; Book
                </a>
              </li>
            </ul>
          </div>

          {/* Official Booking & Social Channels */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#E5B96F]">
              Official Channels
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={BUSINESS_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#E5B96F] font-semibold hover:underline focus-ring"
                >
                  <span>Book Appointment via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#E5B96F] transition-colors focus-ring"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E5B96F]" />
                  <span>Instagram ({BUSINESS_INFO.instagramHandle})</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5B96F] transition-colors focus-ring"
                >
                  Google Maps Directions (Rajkot)
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5B96F] transition-colors focus-ring"
                >
                  4.9★ Local Reviews ({BUSINESS_INFO.googleSnapshot.reviewCount}+)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C9B8A6]/80">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name} · Pedak Cross Road, Arya Nagar, Rajkot, Gujarat 360003
          </p>
          <p className="text-center sm:text-right">
            Precision Haircuts · Skin Fades · Beard Styling · Rajkot, India
          </p>
        </div>
      </div>
    </footer>
  );
};
