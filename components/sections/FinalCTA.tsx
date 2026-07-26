"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_HREF, PHONE_HREF } from "@/lib/constants";
import { viewportConfig } from "@/lib/animations";

export default function FinalCTA() {
  return (
    <section className="section-padding bg-[#0F1D3A] relative overflow-hidden">
      {/* Animated bg orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5922E]/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#1B2A4A]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4A843]/10 rounded-full blur-[80px]" />
        <div className="absolute inset-0 grid-pattern opacity-5" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7 }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5922E]/15 border border-[#C5922E]/30 rounded-full mb-8">
            <div className="w-2 h-2 bg-[#D4A843] rounded-full animate-pulse" />
            <span className="text-[#E8C872] text-sm font-semibold">
              Limited Slots Available – Book Today
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-manrope text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.05]">
            Ready to Own Your{" "}
            <span className="gold-gradient-text">Dream Home</span>
            <br />
            in Hyderabad?
          </h2>

          {/* Subheading */}
          <p className="text-white/60 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Join 2,000+ happy buyers who discovered exclusive landlord share flats
            through LandlordShares. Your dream property is just one conversation away.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#C5922E] to-[#D4A843] text-white font-bold text-lg rounded-2xl hover:from-[#A67B24] hover:to-[#C5922E] hover:shadow-[0_0_40px_rgba(197,146,46,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle size={22} />
              Book Free Consultation
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 border border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/15 hover:border-white/30 transition-all duration-300"
            >
              <Phone size={22} />
              Call +91 98858 58529
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/30 text-sm">
            {[
              "✓ Zero Brokerage",
              "✓ RERA Verified Projects",
              "✓ Free Site Visit",
              "✓ End-to-End Support",
            ].map((item) => (
              <span key={item} className="hover:text-[#E8C872] transition-colors cursor-default">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
