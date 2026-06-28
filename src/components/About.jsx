import React from 'react';
import { Cpu, Users, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-12 bg-kasavu-dark border-t-[3.5px] border-teak relative overflow-hidden">
      {/* Clean graph paper decoration */}
      <div className="absolute inset-0 charupadi-overlay pointer-events-none opacity-20" />
      
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bold Text Info */}
        <div className="lg:col-span-7">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass font-black block mb-3">
            System Spec // Event Info
          </span>
          <h2 className="font-sans font-black text-3xl md:text-5xl text-teak tracking-tight mb-6 leading-none">
            Why This Event <br />
            Is <span className="text-terracotta italic font-serif">Super Cool?</span>
          </h2>
          <div className="space-y-6">
            <p className="font-serif text-base md:text-lg text-teak font-bold leading-relaxed">
              Raspberry Jams are independently organised community events where people get together to share knowledge, learn new things, and meet other Raspberry Pi enthusiasts.
            </p>
            <p className="font-serif text-base md:text-lg text-teak/80 font-bold leading-relaxed">
              Attending a Jam is a great way to find out more about the Raspberry Pi and Open Hardware, learn what you can do with it, and meet like-minded people.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Microchip Grid Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1 */}
          <div className="border-2 border-teak bg-kasavu p-5 rounded-xl shadow-[4px_4px_0px_0px_var(--color-teak)] flex items-start space-x-4">
            <div className="p-2.5 bg-brass/10 border border-brass/20 rounded-lg text-brass">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-black text-sm text-teak uppercase tracking-wider mb-1">Share Knowledge</h4>
              <p className="font-sans font-bold text-xs text-teak-light">Exchange project files, troubleshoot circuits, and showcase your hardware build.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-2 border-teak bg-kasavu p-5 rounded-xl shadow-[4px_4px_0px_0px_var(--color-teak)] flex items-start space-x-4">
            <div className="p-2.5 bg-terracotta/10 border border-terracotta/20 rounded-lg text-terracotta">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-black text-sm text-teak uppercase tracking-wider mb-1">Open Hardware</h4>
              <p className="font-sans font-bold text-xs text-teak-light">Dive into IoT, embedded coding, sensor matrices, and general-purpose prototyping.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border-2 border-teak bg-kasavu p-5 rounded-xl shadow-[4px_4px_0px_0px_var(--color-teak)] flex items-start space-x-4">
            <div className="p-2.5 bg-leaf-green/10 border border-leaf-green/20 rounded-lg text-leaf-green">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-black text-sm text-teak uppercase tracking-wider mb-1">Meet Enthusiasts</h4>
              <p className="font-sans font-bold text-xs text-teak-light">Connect with engineers, makers, educators, and hobbyists building the future.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
