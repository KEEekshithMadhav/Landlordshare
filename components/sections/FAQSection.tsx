"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { viewportConfig, staggerContainer, staggerItem } from "@/lib/animations";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-[#F8FAFC] dark:bg-[#070E1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left: Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            className="lg:col-span-2"
          >
            <span className="section-label mb-4 block">
              <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
              FAQ
              <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
            </span>
            <h2 className="font-manrope text-4xl lg:text-5xl font-black text-[#0A1628] dark:text-white mb-4">
              Common{" "}
              <span className="emerald-gradient-text">Questions</span>
            </h2>
            <p className="text-[#0A1628]/60 dark:text-white/60 text-lg leading-relaxed mb-8">
              Everything you need to know about landlord share flats and our process.
            </p>

            <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-3xl">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="text-emerald-400" size={20} />
                <p className="text-[#0A1628] dark:text-white font-bold">Still have questions?</p>
              </div>
              <p className="text-[#0A1628]/60 dark:text-white/60 text-sm mb-4">
                Our experts are available Mon–Sat, 9 AM – 7 PM.
              </p>
              <a
                href="https://wa.me/918585854853"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-3 space-y-3"
          >
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`bg-white dark:bg-[#112240] border rounded-2xl overflow-hidden transition-all duration-300 ${
                  open === i
                    ? "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                    : "border-[#E2E8F0] dark:border-white/[0.06] hover:border-emerald-500/20"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-manrope font-semibold text-[#0A1628] dark:text-white pr-4 text-base">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                      open === i
                        ? "bg-emerald-500 text-white"
                        : "bg-[#F8FAFC] dark:bg-white/5 text-[#0A1628]/40 dark:text-white/40"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5">
                        <p className="text-[#0A1628]/70 dark:text-white/60 text-sm leading-relaxed border-t border-[#E2E8F0] dark:border-white/[0.06] pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
