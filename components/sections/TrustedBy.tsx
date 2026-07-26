"use client";

import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/constants";
import { Building2 } from "lucide-react";

export default function TrustedBy() {
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-16 bg-[#070E1C] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm uppercase tracking-widest font-semibold"
        >
          Featuring properties from Hyderabad&apos;s premier developers
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#070E1C] to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#070E1C] to-transparent z-10" />

        <div className="flex marquee-track gap-10">
          {doubled.map((partner, i) => (
            <div
              key={`${partner}-${i}`}
              className="flex items-center gap-3 px-6 py-3 bg-white/[0.04] border border-white/[0.06] rounded-2xl whitespace-nowrap group hover:border-emerald-500/20 transition-colors"
            >
              <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Building2 size={14} className="text-emerald-400" />
              </div>
              <span className="text-white/50 group-hover:text-white/80 transition-colors text-sm font-medium font-manrope">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
