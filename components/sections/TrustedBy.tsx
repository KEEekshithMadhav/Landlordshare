"use client";

import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/constants";

export default function TrustedBy() {
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-14 bg-white border-y border-slate-100 overflow-hidden">
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
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex marquee-track items-center gap-14 sm:gap-20">
          {doubled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center shrink-0 h-16 w-36 cursor-pointer group"
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto max-w-[130px] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              ) : (
                <span className="font-manrope font-bold text-slate-500 text-base grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-[#C5922E] transition-all">
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
