import React, { useState } from 'react';
import { ArrowUpRight, Calendar, Check, Copy, Instagram } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barbershopData';

const CONSULTATION_TOPICS = [
  { id: 'fade-style', label: 'Haircut & Fade', summary: 'a tailored haircut and fade' },
  { id: 'beard-sculpt', label: 'Beard Styling', summary: 'beard styling and a razor lineup' },
  { id: 'kids-cut', label: 'Kids Haircut', summary: 'a patient kids haircut' },
  { id: 'full-restyling', label: 'Complete Grooming', summary: 'a complete grooming session' },
];

const CRAFT_POINTS = ['Personal consultation', 'Precision finish', 'Easy WhatsApp booking'];

export const MeetYourBarberSection: React.FC = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['fade-style']);
  const [copiedNote, setCopiedNote] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
    setCopiedNote(false);
  };

  const selectedServices = CONSULTATION_TOPICS.filter((topic) => selectedTopics.includes(topic.id));
  const bookingNote = selectedServices.length
    ? `Hi Classic Cut Salon, I would like to book ${selectedServices.map((topic) => topic.summary).join(' and ')}.`
    : 'Hi Classic Cut Salon, I would like to book an appointment.';
  const bookingUrl = `${BUSINESS_INFO.bookingUrl}?text=${encodeURIComponent(bookingNote)}`;

  const copyNote = () => {
    navigator.clipboard?.writeText(bookingNote).catch(() => {});
    setCopiedNote(true);
    window.setTimeout(() => setCopiedNote(false), 2200);
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-b border-[#DFAF63]/15 bg-[#0C0907] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#E5B96F]">
              Your style, our craft
            </p>
            <h2
              id="about-heading"
              className="font-display text-4xl leading-none text-[#F7F1E8] sm:text-5xl md:text-[3.5rem]"
            >
              Meet Your <span className="text-[#E5B96F]">Salon</span>
            </h2>
          </div>

          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Classic Cut Salon on Instagram"
            className="hidden items-center gap-2 rounded-full border border-[#DFAF63]/30 px-4 py-2.5 text-xs font-semibold text-[#F7F1E8] transition-colors hover:border-[#E5B96F] hover:text-[#E5B96F] sm:inline-flex"
          >
            <Instagram className="h-4 w-4" />
            {BUSINESS_INFO.instagramHandle}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid overflow-hidden rounded-[28px] border border-[#DFAF63]/25 bg-[#140F0C] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="character-stage relative min-h-[420px] overflow-hidden border-b border-[#DFAF63]/20 lg:min-h-[610px] lg:border-b-0 lg:border-r">
            <div className="character-halo absolute inset-x-[12%] top-[8%] h-[70%] rounded-full bg-[#DFAF63]/15 blur-3xl" />
            <img
              src="/assets/characters/salon-client-3d.jpg"
              alt="Stylish Classic Cut Salon client with a fresh fade and shaped beard"
              loading="lazy"
              decoding="async"
              className="animate-client-float absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0C0907]/90 px-4 py-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#F7F1E8]">Fresh look</p>
                <p className="mt-0.5 text-[11px] text-[#B9AA9B]">Designed around you</p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5B96F] shadow-[0_0_18px_rgba(229,185,111,0.8)]" />
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E5B96F]">
              Classic Cut · Arya Nagar
            </p>
            <h3 className="mt-3 max-w-xl font-display text-2xl leading-tight text-[#F7F1E8] sm:text-3xl">
              A sharp cut starts with a good conversation.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#BFB0A2] sm:text-base">
              Tell us the look you want. Our stylists shape the cut, fade and beard finish around your face, routine and personality.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {CRAFT_POINTS.map((point, index) => (
                <span
                  key={point}
                  className="rounded-full border border-[#DFAF63]/25 bg-[#0C0907] px-3 py-2 text-[11px] font-semibold text-[#D8CBBB]"
                >
                  <span className="mr-1.5 text-[#E5B96F]">0{index + 1}</span>{point}
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-[#DFAF63]/15 pt-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F7F1E8]">Plan your visit</p>
                  <p className="mt-1 text-xs text-[#998B7F]">Choose one or more services</p>
                </div>
                <span className="text-xs font-semibold text-[#E5B96F]">{selectedTopics.length} selected</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Choose services">
                {CONSULTATION_TOPICS.map((topic) => {
                  const selected = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleTopic(topic.id)}
                      className={`min-h-11 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                        selected
                          ? 'border-[#E5B96F] bg-[#E5B96F]/12 text-[#F7F1E8]'
                          : 'border-[#DFAF63]/18 bg-[#0C0907] text-[#9F9285] hover:border-[#DFAF63]/45'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        {topic.label}
                        {selected && <Check className="h-3.5 w-3.5 shrink-0 text-[#E5B96F]" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 line-clamp-2 rounded-xl bg-[#0C0907] px-4 py-3 text-xs leading-relaxed text-[#B9AA9B]">
                “{bookingNote}”
              </p>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={copyNote}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#DFAF63]/40 px-4 text-xs font-bold text-[#E5B96F] transition-colors hover:bg-[#DFAF63]/10 sm:w-auto"
                >
                  {copiedNote ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedNote ? 'Copied' : 'Copy note'}
                </button>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#E5B96F] px-5 text-xs font-bold uppercase tracking-[0.06em] text-[#0C0907] transition-colors hover:bg-[#F2CD86]"
                >
                  <Calendar className="h-4 w-4" /> Book on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
