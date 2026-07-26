"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_HREF } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-end overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/hero-poster.jpg"
        >
          <source src="/videos/hyd.mp4" type="video/mp4" />
        </video>

        {/* Transparent gradient overlay: subtle right shadow for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950/85 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
      </div>

      {/* Content — Transparent & Aligned to Right */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20">
        <div className="max-w-2xl text-right ml-auto bg-transparent p-0">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F1D3A]/60 border border-[#FF0033]/40 rounded-full mb-6 backdrop-blur-sm shadow-md"
          >
            <div className="w-2.5 h-2.5 bg-[#FF0033] rounded-full animate-pulse" />
            <span className="text-[#FFCC00] text-sm font-bold tracking-wide">
              🏙️ Hyderabad&apos;s #1 Landlord Share Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-6 drop-shadow-md"
          >
            Buy Verified
            <br />
            <span className="inline-block pb-1 border-b-[4px] border-[#FF0033]">
              <span className="text-[#FF0033]">Landlord Share</span>
            </span>
            <br />
            <span className="text-white">Property Safely.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-100 text-base sm:text-lg leading-relaxed mb-8 font-inter font-medium drop-shadow-sm max-w-xl ml-auto"
          >
            We help first-time buyers access{" "}
            <span className="text-white font-bold">exclusive landlord share apartments</span> in
            Kokapet, Tellapur, Neopolis & more — at{" "}
            <span className="text-[#FFCC00] font-bold">10–20% below builder price</span>, with
            full legal verification and zero hidden charges.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row justify-end gap-4 mb-10"
          >
            <a
              href="#properties"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF0033] to-[#E60026] text-white font-bold text-base rounded-2xl hover:from-[#D6002B] hover:to-[#FF0033] shadow-[0_10px_25px_rgba(255,0,51,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Explore Properties
              <ArrowRight size={18} />
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F1D3A]/70 border border-white/30 text-white font-bold text-base rounded-2xl hover:bg-[#0F1D3A]/90 backdrop-blur-md transition-all duration-300"
            >
              <MessageCircle size={18} />
              Free Consultation
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-end gap-3 sm:gap-4 text-slate-100 text-sm font-medium"
          >
            {["RERA Approved Projects", "Zero Brokerage", "Legal Document Verified", "Free Site Visit"].map((item) => (
              <span key={item} className="flex items-center gap-2 bg-[#0F1D3A]/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-xs">
                <span className="text-[#FFCC00] font-bold">✓</span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-xs font-semibold uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/50 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-[#FF0033] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
