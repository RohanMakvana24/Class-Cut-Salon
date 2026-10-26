import React, { useState } from 'react';
import {
  Check,
  Copy,
  Calendar,
  MapPin,
  MessageSquare,
  Scissors,
  Sparkles,
  Instagram,
  ArrowUpRight,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/barbershopData';

const CONSULTATION_TOPICS = [
  {
    id: 'fade-style',
    label: 'Skin or Taper Fade + Scissor Top',
    summary: 'Looking for a tailored skin/taper fade with scissor work on top.',
  },
  {
    id: 'beard-sculpt',
    label: 'Beard Styling & Razor Lineup',
    summary: 'Looking for a sharp beard trim, shaping, and razor lineup.',
  },
  {
    id: 'kids-cut',
    label: "Child's or Youth Haircut",
    summary: 'Booking a patient, stylish haircut session for a child/youth.',
  },
  {
    id: 'full-restyling',
    label: 'De-Tan, Facial & Complete Grooming',
    summary: 'Would like a complete hair restyle, beard trim, and facial/de-tan session.',
  },
];

export const MeetYourBarberSection: React.FC = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['fade-style']);
  const [copiedNote, setCopiedNote] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setCopiedNote(false);
  };

  const compiledConsultationNote =
    selectedTopics.length > 0
      ? `Hi Classic Cut Salon (Rajkot) — ${CONSULTATION_TOPICS.filter((t) =>
          selectedTopics.includes(t.id)
        )
          .map((t) => t.summary)
          .join(' ')}`
      : 'Hi Classic Cut Salon (Rajkot) — I would like to book an appointment.';

  const handleCopyConsultationNote = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(compiledConsultationNote).catch(() => {});
    }
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2500);
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-20 sm:py-28 bg-[#0C0907] border-b border-[#DFAF63]/15 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-[1px] w-7 bg-[#E5B96F]" />
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#E5B96F]">
                PEDAK ROAD, ARYA NAGAR · RAJKOT CRAFT
              </p>
            </div>
            <h2
              id="about-heading"
              className="font-display text-4xl sm:text-5xl md:text-[3.5rem] text-[#F7F1E8] leading-none"
            >
              MEET YOUR{' '}
              <span className="bg-gradient-to-b from-[#FFF2C6] via-[#E5B96F] to-[#C28B37] bg-clip-text text-transparent">
                SALON
              </span>
            </h2>
          </div>

          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-full inline-flex items-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-full border border-[#DFAF63]/35 bg-[#140F0C] text-[11px] sm:text-xs font-semibold tracking-[0.04em] sm:tracking-[0.06em] text-[#F7F1E8] hover:border-[#E5B96F] hover:text-[#E5B96F] transition-colors self-start md:self-auto focus-ring"
          >
            <Instagram className="w-4 h-4 text-[#E5B96F] shrink-0" />
            <span className="truncate">{BUSINESS_INFO.instagramHandle}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E5B96F] shrink-0" />
          </a>
        </div>

        {/* Main 12-Column Luxury Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column (7 cols): Salon Story & 3 Craft Pillars */}
          <div className="luxury-card-shadow lg:col-span-7 rounded-2xl bg-[#140F0C] border border-[#DFAF63]/20 p-5 sm:p-10 flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6">
              {/* Clean Responsive Kicker Row */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#E5B96F] pb-3 border-b border-[#DFAF63]/15">
                <span className="inline-flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 shrink-0 text-[#E5B96F]" />
                  <span>Master Stylists · Classic Cut Salon</span>
                </span>
                <span aria-hidden="true" className="hidden sm:inline text-[#DFAF63]/50">·</span>
                <span className="text-[#C9B8A6] block sm:inline w-full sm:w-auto">
                  Arya Nagar, Rajkot, Gujarat
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] text-[#F7F1E8] leading-tight">
                WELCOMING RAJKOT HOSPITALITY &amp; UNHURRIED ATTENTION TO DETAIL
              </h3>

              <p className="text-sm sm:text-base text-[#C9B8A6] leading-relaxed">
                Located at <strong className="text-[#F7F1E8] font-semibold">Pedak Cross Road, Opp. Umiya R.O., Ranchod Nagar Society, Arya Nagar, Rajkot</strong>, Classic Cut Salon is built around warm Kathiyawadi hospitality, hygienic AC comfort, and precision chair craft. Across hundreds of local Rajkot reviews, clients praise our stylists for listening carefully before starting a cut and taking the time to get every fade transition right.
              </p>

              <p className="text-sm sm:text-base text-[#C9B8A6] leading-relaxed">
                Whether you are visiting for a sharp skin fade, a royal hot-towel beard lineup, a wedding groom facial &amp; de-tan package, or bringing your child in for a patient, stylish haircut, every appointment focuses on a clean look that suits your personality.
              </p>
            </div>

            {/* 3 Sculpted Luxury Craft Pillars */}
            <div className="mt-8 pt-8 border-t border-[#DFAF63]/15 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-[#0C0907] border border-[#DFAF63]/20 p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#E5B96F] tracking-[0.14em]">
                    01. CONSULTATION
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#DFAF63]/70" />
                </div>
                <p className="text-xs text-[#C9B8A6] leading-relaxed">
                  Every cut starts by talking through your preferred length, fade height, and daily hair styling routine.
                </p>
              </div>

              <div className="rounded-xl bg-[#0C0907] border border-[#DFAF63]/20 p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#E5B96F] tracking-[0.14em]">
                    02. PRECISION CUTS
                  </span>
                  <Scissors className="w-3.5 h-3.5 text-[#DFAF63]/70" />
                </div>
                <p className="text-xs text-[#C9B8A6] leading-relaxed">
                  Modern haircuts, skin fades, scissor work, beard sculpting, de-tan facials, and kids&apos; cuts.
                </p>
              </div>

              <div className="rounded-xl bg-[#0C0907] border border-[#DFAF63]/20 p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#E5B96F] tracking-[0.14em]">
                    03. EASY BOOKING
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-[#DFAF63]/70" />
                </div>
                <p className="text-xs text-[#C9B8A6] leading-relaxed">
                  Book your slot via WhatsApp (+91 82828 48453) or walk in at Pedak Cross Road, Arya Nagar, Rajkot.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Chair Consultation Prep Card */}
          <div className="luxury-card-shadow lg:col-span-5 rounded-2xl bg-[#140F0C] border border-[#E5B96F]/35 p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E5B96F]">
                  PRE-APPOINTMENT HELPER
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1D1511] border border-[#DFAF63]/35 flex items-center justify-center text-[#E5B96F]">
                  <MessageSquare className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-[1.75rem] text-[#F7F1E8]">
                PREPARE YOUR BOOKING NOTE
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#C9B8A6] leading-relaxed">
                Select what you are planning for your visit to copy a quick note for your WhatsApp booking message:
              </p>

              <div
                className="mt-5 space-y-2.5"
                role="group"
                aria-label="Select services for booking note"
              >
                {CONSULTATION_TOPICS.map((topic) => {
                  const checked = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => toggleTopic(topic.id)}
                      aria-pressed={checked}
                      className={`w-full min-h-[46px] px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer focus-ring ${
                        checked
                          ? 'bg-[#1D1511] border-[#E5B96F] text-[#F7F1E8] shadow-[0_4px_16px_rgba(223,175,99,0.14)]'
                          : 'bg-[#0C0907] border-[#DFAF63]/18 text-[#C9B8A6] hover:border-[#DFAF63]/50 hover:text-[#F7F1E8]'
                      }`}
                    >
                      <span>{topic.label}</span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          checked
                            ? 'bg-gradient-to-br from-[#E8C27A] to-[#C58E3D] text-[#090705]'
                            : 'border border-[#C9B8A6]/40'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Ready-to-paste Glass Box */}
              <div className="mt-5 p-4 rounded-xl bg-[#0C0907] border border-[#DFAF63]/28">
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#E5B96F]">
                  Ready-to-paste WhatsApp note:
                </span>
                <p className="mt-1.5 text-xs sm:text-[13px] text-[#F7F1E8] leading-relaxed">
                  &ldquo;{compiledConsultationNote}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCopyConsultationNote}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.06em] sm:tracking-[0.08em] border border-[#DFAF63]/55 text-[#E5B96F] hover:bg-[#DFAF63]/15 rounded-xl sm:rounded-full transition-colors cursor-pointer focus-ring"
              >
                {copiedNote ? (
                  <>
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Note Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Copy Note</span>
                  </>
                )}
              </button>

              <a
                href={BUSINESS_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.06em] sm:tracking-[0.08em] bg-gradient-to-r from-[#E8C27A] via-[#DFAF63] to-[#C58E3D] text-[#090705] hover:brightness-110 rounded-xl sm:rounded-full transition-all shadow-[0_6px_20px_rgba(223,175,99,0.28)] focus-ring"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Book on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
