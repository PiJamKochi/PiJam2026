import React from 'react';
import { Cpu, Calendar, MapPin, Radio } from 'lucide-react';

export default function Hero() {
  const scrollToRegister = () => {
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[75vh] silicon-grid py-16 px-6 md:px-12 flex items-center justify-center overflow-hidden">
      {/* Clean graph paper decoration */}
      <div className="absolute inset-0 charupadi-overlay pointer-events-none opacity-30" />

      {/* Decorative Yellow & Pink Stars in Corners (From Poster) */}
      <div className="absolute top-10 left-10 text-brass opacity-70 hidden xl:block select-none animate-pulse">
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current stroke-teak" strokeWidth="1.5">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
        </svg>
      </div>
      <div className="absolute bottom-16 right-10 text-terracotta opacity-70 hidden xl:block select-none animate-pulse" style={{ animationDelay: '1.5s' }}>
        <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current stroke-teak" strokeWidth="1.5">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
        </svg>
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">

        {/* Core CPU Block (Centered Main Title Card in Neo-brutalism) */}
        <div className="neo-card p-5 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle PCB Drawing in Background */}
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="pcb-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" className="fill-teak" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pcb-dots)" />
              {/* Woodwork-PCB Trace Lines in bold draft style */}
              <line x1="20" y1="0" x2="20" y2="150" className="stroke-teak" strokeWidth="2" />
              <line x1="40" y1="0" x2="40" y2="180" className="stroke-teak" strokeWidth="2" />
              <line x1="60" y1="0" x2="60" y2="200" className="stroke-teak" strokeWidth="2" />
              <path d="M 40 180 L 100 240 L 300 240" className="stroke-teak fill-none" strokeWidth="2" fill="none" />
              <circle cx="300" cy="240" r="4" className="fill-teak" />
              <path d="M 60 200 L 150 290 L 150 450" className="stroke-teak fill-none" strokeWidth="2" fill="none" />
              <circle cx="150" cy="450" r="4" className="fill-teak" />
            </svg>
          </div>

          {/* Technical Metadata Header */}
          <div className="flex items-center justify-between border-b-2 border-teak pb-4 mb-8 font-mono text-[10px] font-black tracking-wider text-teak/70 relative z-10">
            <span className="flex items-center"><Cpu className="w-3.5 h-3.5 mr-1.5 text-brass" /> CORE_BLOCK // BCM2712_A76</span>
            <span className="flex items-center"><Radio className="w-3.5 h-3.5 mr-1.5 text-terracotta animate-signal" /> BUS_SPEED // 2.4GHz</span>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 my-auto">
            <h2 className="font-sans font-black text-xs uppercase tracking-[0.25em] text-terracotta mb-3">

            </h2>
            <h1 className="font-sans font-black text-4xl md:text-6xl text-teak tracking-tighter leading-none mb-6">
              Raspberry Pi Jam <br />
              <span className="text-brass italic font-serif font-black">Kochi 2026</span>
            </h1>
            <p className="text-base md:text-lg text-teak font-bold max-w-xl leading-relaxed mb-8">
              A meeting of Raspberry Pi enthusiasts. Build the next generation of physical systems.
            </p>
          </div>

          {/* Action Callouts in Neo Button style */}
          <div className="flex flex-wrap gap-4 mt-4 relative z-10">
            <button
              onClick={scrollToRegister}
              className="neo-btn px-6 py-3.5 bg-terracotta text-white hover:bg-terracotta-dark shadow-[4px_4px_0px_0px_var(--color-teak)]"
            >
              Secure Seat // REG_BUS
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('board-explorer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="neo-btn px-6 py-3.5 bg-brass text-white hover:bg-brass-dark shadow-[4px_4px_0px_0px_var(--color-teak)] font-sans font-black tracking-wider text-xs uppercase"
            >
              Explore Pi 5
            </button>
          </div>

          {/* Event Spatial-Time Register Metadata inside neat borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t-2 border-teak pt-6 mt-8 font-mono text-[10px] relative z-10">
            <div className="flex items-start gap-3 bg-kasavu p-3 border-2 border-teak rounded-lg shadow-[3px_3px_0px_0px_var(--color-teak)]">
              <Calendar className="w-4 h-4 text-brass shrink-0 mt-0.5" />
              <div>
                <span className="text-teak-light block uppercase tracking-wider text-[8px] font-black mb-0.5">REGISTER // TIMER_1</span>
                <span className="text-teak font-black block text-sm tracking-wide">JULY 11, 2026</span>
                <span className="text-teak font-black block text-sm tracking-wide">10am to 4pm</span>
                <span className="text-teak-light text-[9px] block mt-0.5">Saturday  // 6HRS RUNTIME</span>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-kasavu p-3 border-2 border-teak rounded-lg shadow-[3px_3px_0px_0px_var(--color-teak)]">
              <MapPin className="w-4 h-4 text-brass shrink-0 mt-0.5" />
              <div>
                <span className="text-teak-light block uppercase tracking-wider text-[8px] font-black mb-0.5">REGISTER // LOC_REF</span>
                <span className="text-teak font-black block text-sm tracking-wide"> Tinkerspace Kochi, Kerala</span>
                <span className="text-teak-light text-[9px] block mt-0.5">Lat: 9.9312° N / Lon: 76.2673° E</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
