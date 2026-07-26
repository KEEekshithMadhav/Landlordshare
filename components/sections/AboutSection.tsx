"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileText, HandshakeIcon, ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_HREF } from "@/lib/constants";
import { viewportConfig, staggerContainer, staggerItem } from "@/lib/animations";

const highlights = [
  {
    icon: HandshakeIcon,
    title: "Joint Development Agreement",
    description:
      "The landowner provides land while the builder constructs apartments. As part of this deal, the landowner receives a fixed share of completed flats.",
  },
  {
    icon: FileText,
    title: "Full Document Verification",
    description:
      "We verify every document — title deeds, RERA registration, building approvals, and encumbrance certificates — before you sign anything.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Transparent Purchase",
    description:
      "No hidden fees, no broker tricks. We guide first-time buyers through every step so you buy with complete confidence and clarity.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[#F8FAFC] overflow-hidden border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-5 block">
              <span className="w-6 h-0.5 bg-[#C5922E] rounded-full" />
              About Us
              <span className="w-6 h-0.5 bg-[#C5922E] rounded-full" />
            </span>

            <h2 className="font-manrope text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-[1.1]">
              What Are{" "}
              <span className="gold-gradient-text">Landlord Share</span>{" "}
              Flats?
            </h2>

            <div className="space-y-5 text-slate-600 text-base leading-relaxed font-inter">
              <p>
                In some real estate projects, the landowner and builder work together.
                The landowner provides the land, and the builder constructs the apartments.
                As part of this agreement, the landowner receives a{" "}
                <span className="text-slate-900 font-bold">fixed number of flats</span>{" "}
                in the completed project. These are called{" "}
                <span className="text-[#C5922E] font-bold">landlord share flats</span>.
              </p>
              <p>
                Sometimes, the landowner sells these flats directly to buyers. In certain cases,
                they may be available at{" "}
                <span className="text-slate-900 font-bold">competitive prices</span>{" "}
                compared to the builder's regular units.
              </p>
              <p>
                At <span className="text-[#C5922E] font-bold">LandLordShares</span>, we help
                first-time buyers understand the process, verify all documents, and ensure
                a safe and transparent purchase — so you can{" "}
                <span className="text-slate-900 font-bold">buy with confidence and clarity</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#C5922E] to-[#D4A843] text-white font-bold rounded-2xl hover:from-[#A67B24] hover:to-[#C5922E] shadow-[0_4px_15px_rgba(197,146,46,0.3)] transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={17} />
                Talk to an Expert
              </a>
              <a
                href="#properties"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-slate-300 text-slate-800 font-semibold rounded-2xl hover:bg-white hover:border-slate-400 shadow-xs transition-all duration-300"
              >
                View Properties
                <ArrowRight size={17} />
              </a>
            </div>
          </motion.div>

          {/* Right — Highlight Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-5"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="flex gap-5 p-6 bg-white border border-slate-200/80 rounded-2xl hover:border-[#C5922E]/30 hover:shadow-md transition-all duration-300 group shadow-xs"
              >
                <div className="w-12 h-12 shrink-0 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={22} className="text-[#C5922E]" />
                </div>
                <div>
                  <h3 className="font-manrope font-bold text-slate-900 text-base mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: "₹150Cr+", label: "Deals Closed" },
                { value: "78+", label: "Happy Buyers" },
                { value: "100%", label: "Satisfaction" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl shadow-xs"
                >
                  <p className="font-manrope font-black text-xl text-[#C5922E]">{s.value}</p>
                  <p className="text-slate-600 font-semibold text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
