import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MapPin,
  Phone,
  Calendar,
  Instagram,
  Navigation,
  Clock,
  ExternalLink,
  Sparkles,
  Compass,
  Check,
  Copy,
  Car,
  Scissors,
  Crosshair,
  Plus,
  Minus,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/barbershopData';

interface RajkotLandmarkRoute {
  id: string;
  name: string;
  distance: string;
  driveTime: string;
  directionHint: string;
  lat: number;
  lng: number;
  zoom: number;
}

// Exact coordinates of Classic Cut Salon at Pedak Cross Road, Opp. Umiya R.O., Arya Nagar, Rajkot
const SALON_COORDS = {
  lat: 22.30295,
  lng: 70.82115,
};

const RAJKOT_LANDMARKS: RajkotLandmarkRoute[] = [
  {
    id: 'umiya-ro',
    name: 'Umiya R.O. · Pedak Cross Road',
    distance: 'Opposite · 30 m',
    driveTime: '1 min walk',
    directionHint: 'Directly opposite Umiya R.O. at Pedak Cross Road main junction, Arya Nagar.',
    lat: 22.30295,
    lng: 70.82115,
    zoom: 17,
  },
  {
    id: 'ranchod-nagar',
    name: 'Ranchod Nagar Society',
    distance: '250 m',
    driveTime: '2 min walk',
    directionHint: 'Walk straight towards Pedak Cross Road main road near Umiya R.O.',
    lat: 22.30365,
    lng: 70.82195,
    zoom: 17,
  },
  {
    id: 'sant-kabir',
    name: 'Sant Kabir Road',
    distance: '1.3 km',
    driveTime: '4 min drive',
    directionHint: 'Head north via Pedak Road towards Arya Nagar & Ranchod Nagar Society.',
    lat: 22.3005,
    lng: 70.8225,
    zoom: 16,
  },
  {
    id: 'kuwadva-road',
    name: 'Kuwadva Road / Greenland Chowkdi',
    distance: '2.4 km',
    driveTime: '7 min drive',
    directionHint: 'Take the 80 Feet / Pedak Road connector straight into Arya Nagar.',
    lat: 22.3065,
    lng: 70.8205,
    zoom: 15,
  },
];

const TILE_SIZE = 256;
const MIN_ZOOM = 13;
const MAX_ZOOM = 19;

function latLngToWorldPixel(lat: number, lng: number, zoom: number) {
  const scale = TILE_SIZE * Math.pow(2, zoom);
  const x = ((lng + 180) / 360) * scale;
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const y =
    (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale;
  return { x, y };
}

function worldPixelToLatLng(x: number, y: number, zoom: number) {
  const scale = TILE_SIZE * Math.pow(2, zoom);
  const lng = (x / scale) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * y) / scale;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { lat, lng };
}

export const VisitAndBookSection: React.FC = () => {
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>(RAJKOT_LANDMARKS[0].id);
  const [mapTone, setMapTone] = useState<'luxury-dark' | 'standard'>('luxury-dark');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Interactive Map State (clean hospital-free road tiles + real coordinate pin)
  const [zoom, setZoom] = useState<number>(17);
  const [center, setCenter] = useState<{ lat: number; lng: number }>(SALON_COORDS);
  const [showPlaceholderOverlay, setShowPlaceholderOverlay] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({
    width: 800,
    height: 450,
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{
    clientX: number;
    clientY: number;
    startWorldX: number;
    startWorldY: number;
  } | null>(null);

  const activeLandmark =
    RAJKOT_LANDMARKS.find((item) => item.id === selectedLandmarkId) || RAJKOT_LANDMARKS[0];

  // Track viewport size for accurate Web Mercator tile projection
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setViewportSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Dismiss placeholder overlay immediately when user zooms in or out
  const handleZoomChange = useCallback((nextZoom: number) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, nextZoom));
    setZoom(clamped);
    setShowPlaceholderOverlay(false);
  }, []);

  // Keep normal page scrolling over the map. Ctrl/Cmd + wheel intentionally zooms it.
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1 : -1;
      setZoom((prev) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta)));
      setShowPlaceholderOverlay(false);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore clicks on buttons/links inside the map
    if ((e.target as HTMLElement).closest('button, a')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const startWorld = latLngToWorldPixel(center.lat, center.lng, zoom);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startWorldX: startWorld.x,
      startWorldY: startWorld.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      setShowPlaceholderOverlay(false);
    }

    const nextWorldX = dragStartRef.current.startWorldX - dx;
    const nextWorldY = dragStartRef.current.startWorldY - dy;
    const nextLatLng = worldPixelToLatLng(nextWorldX, nextWorldY, zoom);
    setCenter(nextLatLng);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      dragStartRef.current = null;
      setIsDragging(false);
    }
  };

  const handleSelectLandmark = (landmark: RajkotLandmarkRoute) => {
    setSelectedLandmarkId(landmark.id);
    setCenter({ lat: landmark.lat, lng: landmark.lng });
    setZoom(landmark.zoom);
    setShowPlaceholderOverlay(true);
  };

  const handleRecenterPin = () => {
    setSelectedLandmarkId(RAJKOT_LANDMARKS[0].id);
    setCenter(SALON_COORDS);
    setZoom(17);
    setShowPlaceholderOverlay(true);
  };

  const handleCopyAddress = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(BUSINESS_INFO.fullAddress).catch(() => {});
    }
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2400);
  };

  // Compute visible tiles and exact pixel position of the Salon & active landmark
  const centerWorld = latLngToWorldPixel(center.lat, center.lng, zoom);
  const topLeftWorldX = centerWorld.x - viewportSize.width / 2;
  const topLeftWorldY = centerWorld.y - viewportSize.height / 2;

  const startTileX = Math.floor(topLeftWorldX / TILE_SIZE) - 1;
  const endTileX = Math.floor((topLeftWorldX + viewportSize.width) / TILE_SIZE) + 1;
  const startTileY = Math.floor(topLeftWorldY / TILE_SIZE) - 1;
  const endTileY = Math.floor((topLeftWorldY + viewportSize.height) / TILE_SIZE) + 1;

  const maxTileIndex = Math.pow(2, zoom);
  const tiles: Array<{ key: string; url: string; left: number; top: number }> = [];

  // apistyle=s.t:2|p.v:off hides all third-party POIs & hospitals while keeping all Rajkot street names & neighbourhoods!
  const cleanRoadStyleParam = 's.t:2%7Cp.v:off%2Cs.t:4%7Ce.l.i%7Cp.v:off';

  for (let tx = startTileX; tx <= endTileX; tx++) {
    for (let ty = startTileY; ty <= endTileY; ty++) {
      if (ty < 0 || ty >= maxTileIndex) continue;
      const wrappedTx = ((tx % maxTileIndex) + maxTileIndex) % maxTileIndex;
      const serverIdx = Math.abs(tx + ty) % 4;
      const url = `https://mt${serverIdx}.google.com/vt/lyrs=m&x=${wrappedTx}&y=${ty}&z=${zoom}&hl=en&apistyle=${cleanRoadStyleParam}`;
      tiles.push({
        key: `${zoom}-${tx}-${ty}`,
        url,
        left: tx * TILE_SIZE - topLeftWorldX,
        top: ty * TILE_SIZE - topLeftWorldY,
      });
    }
  }

  const salonWorld = latLngToWorldPixel(SALON_COORDS.lat, SALON_COORDS.lng, zoom);
  const salonScreenX = salonWorld.x - topLeftWorldX;
  const salonScreenY = salonWorld.y - topLeftWorldY;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-20 sm:py-28 bg-[#0C0907] border-b border-[#DFAF63]/15 overflow-hidden"
    >
      {/* Subtle Ambient Gold Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 hidden md:block -translate-x-1/2 w-[900px] h-[350px] rounded-full bg-[#DFAF63]/[0.05] blur-[96px]"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-[1px] w-7 bg-[#E5B96F]" />
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#E5B96F]">
                PEDAK ROAD, ARYA NAGAR · RAJKOT, GUJARAT
              </p>
            </div>
            <h2
              id="contact-heading"
              className="font-display text-4xl sm:text-5xl md:text-[3.5rem] text-[#F7F1E8] leading-none"
            >
              VISIT &amp;{' '}
              <span className="bg-gradient-to-b from-[#FFF2C6] via-[#E5B96F] to-[#C28B37] bg-clip-text text-transparent">
                BOOK
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#C9B8A6] max-w-md leading-relaxed">
            Reserve your chair via WhatsApp, call Classic Cut Salon directly, or get turn-by-turn Google Maps directions to Pedak Cross Road, Arya Nagar, Rajkot.
          </p>
        </div>

        {/* Main 12-Column Luxury Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column (7 cols): Address, Contact Channels & Hours Status */}
          <div className="luxury-card-shadow lg:col-span-7 rounded-2xl bg-[#140F0C] border border-[#DFAF63]/22 p-5 sm:p-10 flex flex-col justify-between">
            <div className="space-y-7">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E5B96F]">
                  01 · RAJKOT SALON ADDRESS
                </span>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl text-[#F7F1E8]">
                  {BUSINESS_INFO.name.toUpperCase()}
                </h3>
                <p className="mt-3 text-base sm:text-lg text-[#F7F1E8] font-medium flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E5B96F] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.fullAddress}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#DFAF63]/15">
                {/* Telephone Card */}
                <div className="rounded-xl bg-[#0C0907] border border-[#DFAF63]/20 p-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E5B96F] tracking-[0.14em]">
                    <Phone className="w-4 h-4 text-[#E5B96F]" />
                    <span>DIRECT PHONE &amp; WHATSAPP</span>
                  </div>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="mt-2.5 inline-block font-display text-xl text-[#F7F1E8] hover:text-[#E5B96F] transition-colors tabular-nums focus-ring"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <p className="mt-1.5 text-xs text-[#C9B8A6] leading-relaxed">
                    Call or WhatsApp for walk-in timings or same-day chair availability in Rajkot.
                  </p>
                </div>

                {/* Hours & Booking Channel Note */}
                <div className="rounded-xl bg-[#0C0907] border border-[#DFAF63]/20 p-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E5B96F] tracking-[0.14em]">
                    <Clock className="w-4 h-4 text-[#E5B96F]" />
                    <span>DAILY SALON HOURS</span>
                  </div>
                  <p className="mt-2.5 text-base font-bold text-[#F7F1E8]">
                    Daily: 9:00 AM – 9:30 PM
                  </p>
                  <p className="mt-1.5 text-xs text-[#C9B8A6] leading-relaxed">
                    Open all week at Pedak Cross Road, Opp. Umiya R.O., Arya Nagar, Rajkot.
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary Action Links */}
            <div className="mt-8 pt-6 border-t border-[#DFAF63]/15 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto max-w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.04em] sm:tracking-[0.08em] bg-[#1D1511] border border-[#DFAF63]/50 text-[#F7F1E8] hover:bg-[#DFAF63] hover:text-[#090705] rounded-xl sm:rounded-full transition-all focus-ring"
              >
                <Navigation className="w-4 h-4 text-[#E5B96F] shrink-0 group-hover:text-[#090705]" />
                <span className="truncate">Get Google Maps Directions</span>
              </a>

              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto max-w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.04em] sm:tracking-[0.08em] bg-[#0C0907] border border-[#DFAF63]/35 text-[#F7F1E8] hover:border-[#E5B96F] hover:text-[#E5B96F] rounded-xl sm:rounded-full transition-colors focus-ring"
              >
                <Instagram className="w-4 h-4 text-[#E5B96F] shrink-0" />
                <span className="truncate">{BUSINESS_INFO.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Luxury Brushed-Gold Concierge Booking Card */}
          <div className="luxury-card-shadow lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#211810] via-[#16110C] to-[#0E0B08] border border-[#E5B96F]/45 p-5 sm:p-10 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Clean Responsive Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#E5B96F] pb-2 border-b border-[#DFAF63]/20 w-full">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>OFFICIAL RAJKOT BOOKING</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-[#F7F1E8] leading-tight">
                READY FOR YOUR NEXT CUT OR FADE?
              </h3>

              <p className="text-sm sm:text-[15px] text-[#C9B8A6] leading-relaxed">
                Book your appointment at Classic Cut Salon in Rajkot directly via WhatsApp or phone call for zero waiting time.
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#F7F1E8]">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1D1511] border border-[#E5B96F]/50 flex items-center justify-center font-mono text-[11px] text-[#E5B96F] shrink-0">
                    01
                  </span>
                  <span>Message us on WhatsApp or call +91 82828 48453</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1D1511] border border-[#E5B96F]/50 flex items-center justify-center font-mono text-[11px] text-[#E5B96F] shrink-0">
                    02
                  </span>
                  <span>Choose your haircut, fade, beard, or de-tan package</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1D1511] border border-[#E5B96F]/50 flex items-center justify-center font-mono text-[11px] text-[#E5B96F] shrink-0">
                    03
                  </span>
                  <span>Visit us at Pedak Cross Road, Arya Nagar, Rajkot</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={BUSINESS_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.06em] sm:tracking-[0.12em] bg-gradient-to-r from-[#E8C27A] via-[#DFAF63] to-[#C58E3D] text-[#090705] hover:brightness-110 rounded-xl sm:rounded-full transition-all focus-ring"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="truncate">Book via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="w-full max-w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-[0.06em] sm:tracking-[0.1em] border border-[#DFAF63]/50 text-[#F7F1E8] hover:border-[#E5B96F] hover:text-[#E5B96F] rounded-xl sm:rounded-full transition-colors focus-ring"
              >
                <Phone className="w-4 h-4 text-[#E5B96F] shrink-0" />
                <span className="truncate">Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ====================================================================
            02 · INTERACTIVE RAJKOT SALON LOCATION MAP & LANDMARK ROUTE FINDER
           ==================================================================== */}
        <div className="luxury-card-shadow mt-8 sm:mt-10 rounded-[24px] bg-[#140F0C] border border-[#DFAF63]/25 overflow-hidden">
          {/* Top Map Control Bar */}
          <div className="p-5 sm:px-8 sm:py-6 border-b border-[#DFAF63]/15 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#1D1511] border border-[#DFAF63]/40 flex items-center justify-center text-[#E5B96F] shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E5B96F]">
                    02 · LIVE RAJKOT SALON RADAR &amp; DIRECTIONS
                  </span>
                  <span className="hidden sm:inline text-[#DFAF63]/40">·</span>
                  <span className="font-mono text-[11px] text-[#DFD3C5]">
                    PIN 360003 · ARYA NAGAR
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-[#F7F1E8] mt-0.5">
                  FIND US AT PEDAK CROSS ROAD, OPP. UMIYA R.O.
                </h3>
              </div>
            </div>

            {/* Map Mode Switcher, Re-center Pin & Quick Copy Address */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleRecenterPin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E5B96F]/45 bg-[#1D1511] text-xs font-semibold text-[#E5B96F] hover:bg-[#E5B96F] hover:text-[#090705] transition-colors cursor-pointer focus-ring"
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>Focus Salon Pin</span>
              </button>

              <div
                role="group"
                aria-label="Map visual style"
                className="inline-flex items-center rounded-xl border border-[#DFAF63]/25 bg-[#0C0907] p-1"
              >
                <button
                  type="button"
                  onClick={() => setMapTone('luxury-dark')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer focus-ring ${
                    mapTone === 'luxury-dark'
                      ? 'bg-[#E5B96F] text-[#090705]'
                      : 'text-[#DFD3C5] hover:text-[#F7F1E8]'
                  }`}
                >
                  Gold Night Map
                </button>
                <button
                  type="button"
                  onClick={() => setMapTone('standard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer focus-ring ${
                    mapTone === 'standard'
                      ? 'bg-[#E5B96F] text-[#090705]'
                      : 'text-[#DFD3C5] hover:text-[#F7F1E8]'
                  }`}
                >
                  Standard Map
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DFAF63]/35 bg-[#0C0907] text-xs font-semibold text-[#F7F1E8] hover:border-[#E5B96F] hover:text-[#E5B96F] transition-colors cursor-pointer focus-ring"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#E5B96F]" />
                    <span>Address Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#E5B96F]" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Map Canvas + Nearby Rajkot Landmarks Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left / Main Interactive Hospital-Free Road Map Viewport (8 cols) */}
            <div
              ref={mapContainerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onDoubleClick={() => handleZoomChange(zoom + 1)}
              role="application"
              aria-label="Interactive Rajkot Salon Map — Drag to pan, scroll or use buttons to zoom"
              className={`product-stage-dark relative lg:col-span-8 min-h-[380px] sm:min-h-[450px] bg-[#0B0907] overflow-hidden select-none touch-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              {/* Clean Hospital-Free Google Road Tiles Layer */}
              <div
                className={`absolute inset-0 pointer-events-none transition-[filter] duration-300 ${
                  mapTone === 'luxury-dark'
                    ? 'invert-[92%] hue-rotate-[180deg] brightness-[0.88] contrast-[1.08] saturate-[0.75]'
                    : ''
                }`}
              >
                {tiles.map((tile) => (
                  <img
                    key={tile.key}
                    src={tile.url}
                    alt=""
                    draggable={false}
                    style={{
                      position: 'absolute',
                      left: `${Math.round(tile.left)}px`,
                      top: `${Math.round(tile.top)}px`,
                      width: `${TILE_SIZE}px`,
                      height: `${TILE_SIZE}px`,
                    }}
                    className="max-w-none select-none pointer-events-none"
                  />
                ))}
              </div>

              {/* Subtle Gold Vignette Frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#DFAF63]/20"
              />

              {/* ============================================================
                  COORDINATE-LOCKED SALON LOCATION POINTER
                  Stays pinned to exact Pedak Cross Road coordinate when zooming/panning.
                  The floating callout placeholder automatically hides as soon as
                  the user zooms in, zooms out, or drags the map!
                 ============================================================ */}
              <div
                style={{
                  position: 'absolute',
                  left: `${salonScreenX}px`,
                  top: `${salonScreenY}px`,
                  transform: 'translate(-50%, -100%)',
                }}
                className="pointer-events-none z-20 flex flex-col items-center"
              >
                {/* Floating Callout Placeholder — Automatically hides on Zoom In / Zoom Out / Drag */}
                {showPlaceholderOverlay && (
                  <div className="product-stage-dark relative px-3.5 py-2.5 rounded-2xl bg-[#0D0A07]/95 backdrop-blur-md border-2 border-[#E5B96F] shadow-[0_12px_30px_rgba(0,0,0,0.65)] flex items-center gap-2.5 mb-2.5 transition-opacity duration-200 whitespace-nowrap">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFF2C6] via-[#E5B96F] to-[#C28B37] text-[#090705] flex items-center justify-center shrink-0">
                      <Scissors className="w-4 h-4 stroke-[2.4]" />
                    </div>
                    <div className="text-left pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#E5B96F]">
                          CLASSIC CUT SALON · HERE
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs font-bold text-[#F7F1E8] leading-tight mt-0.5">
                        Opp. Umiya R.O., Pedak Cross Road
                      </p>
                    </div>
                    <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#0D0A07] border-r-2 border-b-2 border-[#E5B96F]" />
                  </div>
                )}

                {/* Default Map Location Pointer + Permanent Label */}
                <div className="relative flex flex-col items-center">
                  <span className="absolute -bottom-1 w-10 h-10 rounded-full bg-[#EA4335]/30 animate-ping" />
                  {/* Classic Map Pin SVG anchored at bottom tip */}
                  <svg
                    width="38"
                    height="46"
                    viewBox="0 0 38 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_6px_12px_rgba(0,0,0,0.75)]"
                  >
                    <path
                      d="M19 1C9.611 1 2 8.611 2 18C2 30.25 19 45 19 45C19 45 36 30.25 36 18C36 8.611 28.389 1 19 1Z"
                      fill="#EA4335"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <circle cx="19" cy="18" r="6.5" fill="#75140C" />
                    <circle cx="19" cy="18" r="4" fill="#FFFFFF" />
                  </svg>

                  {/* Crisp Inline Map Label right beside/below the pin */}
                  <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#0D0A07]/90 border border-[#E5B96F]/60 text-[11px] font-bold text-[#F7F1E8] shadow-md whitespace-nowrap">
                    Classic Cut Salon
                  </span>
                </div>
              </div>

              {/* Zoom In / Zoom Out Controls (Top-Right of Map) */}
              <div className="product-stage-dark absolute top-4 right-4 z-30 flex flex-col rounded-xl bg-[#0E0B08]/95 backdrop-blur-md border border-[#E5B96F]/45 overflow-hidden shadow-lg">
                <button
                  type="button"
                  onClick={() => handleZoomChange(zoom + 1)}
                  disabled={zoom >= MAX_ZOOM}
                  aria-label="Zoom in map"
                  className="w-10 h-10 flex items-center justify-center text-[#F7F1E8] hover:bg-[#E5B96F] hover:text-[#090705] disabled:opacity-40 transition-colors cursor-pointer border-b border-[#DFAF63]/20"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleZoomChange(zoom - 1)}
                  disabled={zoom <= MIN_ZOOM}
                  aria-label="Zoom out map"
                  className="w-10 h-10 flex items-center justify-center text-[#F7F1E8] hover:bg-[#E5B96F] hover:text-[#090705] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Floating Bottom-Left Placeholder Card — Also auto-hides when user zooms in/out or pans */}
              {showPlaceholderOverlay && (
                <div className="product-stage-dark absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-30 rounded-2xl bg-[#0E0B08]/95 backdrop-blur-md border border-[#E5B96F]/45 p-3.5 sm:p-4 flex items-center justify-between gap-4 transition-opacity duration-200">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFF2C6] via-[#E5B96F] to-[#C28B37] text-[#090705] shrink-0">
                      <MapPin className="w-5 h-5 stroke-[2.4]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#E5B96F] truncate">
                        {activeLandmark.name} · {activeLandmark.distance}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-[#F7F1E8] truncate mt-0.5">
                        Pedak Cross Road, Opp. Umiya R.O., Rajkot
                      </p>
                    </div>
                  </div>

                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open turn-by-turn directions in Google Maps"
                    className="w-9 h-9 rounded-xl bg-[#E5B96F]/15 border border-[#E5B96F]/45 flex items-center justify-center text-[#E5B96F] hover:bg-[#E5B96F] hover:text-[#090705] transition-colors shrink-0 focus-ring"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Right Column (4 cols): Nearby Rajkot Landmark Route Selector */}
            <div className="lg:col-span-4 p-5 sm:p-7 bg-[#140F0C] border-t lg:border-t-0 lg:border-l border-[#DFAF63]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E5B96F]">
                    NEARBY RAJKOT LANDMARKS
                  </span>
                  <Car className="w-4 h-4 text-[#E5B96F]" />
                </div>

                <p className="text-xs text-[#DFD3C5] leading-relaxed mb-4">
                  Tap a nearby Rajkot area below to preview the route and travel time to our chair:
                </p>

                <div
                  role="tablist"
                  aria-label="Select nearby Rajkot landmark"
                  className="space-y-2.5"
                >
                  {RAJKOT_LANDMARKS.map((landmark) => {
                    const isSelected = landmark.id === activeLandmark.id;
                    return (
                      <button
                        key={landmark.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => handleSelectLandmark(landmark)}
                        className={`w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer focus-ring ${
                          isSelected
                            ? 'bg-[#1D1511] border-[#E5B96F] text-[#F7F1E8]'
                            : 'bg-[#0C0907] border-[#DFAF63]/18 text-[#DFD3C5] hover:border-[#DFAF63]/45'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-[13px] font-bold text-[#F7F1E8]">
                            {landmark.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#E5B96F]/15 text-[#E5B96F] font-mono text-[10px] font-semibold shrink-0">
                            {landmark.driveTime}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#DFD3C5] leading-snug">
                          {landmark.directionHint}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DFAF63]/15">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFF2C6] via-[#E5B96F] to-[#C8923B] text-[#090705] font-bold text-xs uppercase tracking-[0.08em] hover:brightness-105 transition-all focus-ring"
                >
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>Start Live Navigation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
