import React from 'react';
import raspberryPiLogo from '../assets/Raspberry_Pi_Logo.svg';
import tinkerSpaceLogo from '../assets/tinkerspace.png';
import makerGramLogo from '../assets/makergram.png';
import googleDevsLogo from '../assets/google for developers.png';

export default function Organizers() {
  return (
    <section id="organizers" className="py-20 px-6 md:px-12 silicon-grid border-t-[3.5px] border-teak relative">
      {/* Clean graph paper decoration */}
      <div className="absolute inset-0 charupadi-overlay pointer-events-none opacity-30" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass font-black block mb-2">
            System Operators // Core Communities
          </span>
          <h2 className="font-sans font-black text-3xl md:text-4xl text-teak tracking-tight">
            Meet the Organizers
          </h2>
          <p className="font-serif text-sm text-teak mt-2 max-w-xl mx-auto font-bold">
            Brought to you by makers, engineers, and global developer communities driving next-gen hardware prototyping in Kerala.
          </p>
        </div>

        {/* Organizers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">

          {/* Organizer Card 1: Raspberry Pi */}
          <div className="neo-card p-6 bg-kasavu-dark border-2 border-teak flex flex-col items-center text-center justify-center gap-4 min-h-[220px] shadow-[4px_4px_0px_0px_var(--color-teak)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <div className="w-full h-20 flex items-center justify-center">
              <img src={raspberryPiLogo} alt="Raspberry Pi Logo" className="max-h-16 max-w-[95%] object-contain" />
            </div>
            <div>
              <h3 className="font-sans font-black text-sm text-teak uppercase tracking-wider mb-1">Raspberry Pi</h3>
              <p className="font-mono text-[9px] text-brass uppercase font-black">Foundation // Hardware</p>
            </div>
          </div>

          {/* Organizer Card 2: TinkerSpace */}
          <div className="neo-card p-6 bg-kasavu-dark border-2 border-teak flex flex-col items-center text-center justify-center gap-4 min-h-[220px] shadow-[4px_4px_0px_0px_var(--color-teak)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <div className="w-full h-20 flex items-center justify-center">
              <img src={tinkerSpaceLogo} alt="TinkerSpace Logo" className="max-h-16 max-w-[95%] object-contain" />
            </div>
            <div>
              <h3 className="font-sans font-black text-sm text-teak uppercase tracking-wider mb-1">TinkerSpace</h3>
              <p className="font-mono text-[9px] text-brass uppercase font-black">Makerspace // Host</p>
            </div>
          </div>

          {/* Organizer Card 3: MakerGram */}
          <div className="neo-card p-6 bg-kasavu-dark border-2 border-teak flex flex-col items-center text-center justify-center gap-4 min-h-[220px] shadow-[4px_4px_0px_0px_var(--color-teak)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <div className="w-full h-20 flex items-center justify-center">
              <img src={makerGramLogo} alt="MakerGram Logo" className="max-h-16 max-w-[95%] object-contain" />
            </div>
            <div>
              <h3 className="font-sans font-black text-sm text-teak uppercase tracking-wider mb-1">MakerGram</h3>
              <p className="font-mono text-[9px] text-brass uppercase font-black">IoT Community // Hardware</p>
            </div>
          </div>

          {/* Organizer Card 4: Google for Developers */}
          <div className="neo-card p-6 bg-kasavu-dark border-2 border-teak flex flex-col items-center text-center justify-center gap-4 min-h-[220px] shadow-[4px_4px_0px_0px_var(--color-teak)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <div className="w-full h-20 flex items-center justify-center">
              <img src={googleDevsLogo} alt="Google for Developers Logo" className="max-h-16 max-w-[95%] object-contain scale-[2.0]" />
            </div>
            <div>
              <h3 className="font-sans font-black text-sm text-teak uppercase tracking-wider mb-1">Google for Developers</h3>
              <p className="font-mono text-[9px] text-brass uppercase font-black">Partner // Developer Relations</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
