import React from 'react';
import { Cpu } from 'lucide-react';
import { CONFIG } from '../config';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 md:px-12 bg-kasavu-dark border-t-[3.5px] border-teak relative overflow-hidden">
      {/* Clean graph paper decoration */}
      <div className="absolute inset-0 charupadi-overlay pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Centered Maker Showcase CTA Card */}
        <div className="neo-card p-8 md:p-12 bg-kasavu border-2 border-teak text-center max-w-2xl mx-auto shadow-[4px_4px_0px_0px_var(--color-teak)]">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass font-black block mb-2">
            Output Interfaces // Maker Showcase
          </span>

          <h2 className="font-sans font-black text-3xl md:text-4xl text-teak tracking-tight mb-4">
            Call for Projects
          </h2>

          <p className="font-serif text-sm text-teak mt-2 mb-8 font-bold leading-relaxed">
            Are you building something unique with Raspberry Pi, microcontrollers, IoT devices, or open-source hardware? Show off your creation to Kerala's developer ecosystem! Secure your maker desk, display your build, and exchange ideas at the event.
          </p>

          <a
            href={CONFIG.projectFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-block px-8 py-4 bg-leaf-green text-white hover:bg-leaf-green-dark shadow-[4px_4px_0px_0px_var(--color-teak)] font-sans font-black tracking-wider uppercase text-xs"
          >
            Showcase Your Project // Apply for Showcase
          </a>
        </div>

      </div>
    </section>
  );
}
