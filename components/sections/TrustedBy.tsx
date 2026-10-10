"use client";

import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/constants";

export default function TrustedBy() {
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-14 bg-slate-50/60 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-manrope text-3xl sm:text-4xl font-black text-[#0F1D3A] tracking-tight"
        >
          Our partners
        </motion.h2>
      </div>

      {/* Clean Marquee of Pure Logos */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50/90 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/90 to-transparent z-10 pointer-events-none" />

        <div className="flex marquee-track items-center gap-6 sm:gap-8">
          {doubled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center shrink-0 h-16 w-40 sm:w-44 cursor-pointer group"
            >
              {partner.logo ? (
                <div className="flex items-center justify-center w-full h-full bg-white border border-slate-200/80 rounded-xl px-3 py-2 shadow-xs group-hover:border-[#C5922E]/40 group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-11 sm:h-12 w-auto max-w-[135px] sm:max-w-[145px] object-contain transition-all duration-300"
                  />
                </div>
              ) : (
                <span className="font-manrope font-bold text-slate-700 text-base group-hover:text-[#C5922E] transition-all">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
