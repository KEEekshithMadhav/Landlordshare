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
    <section id="about" className="section-padding bg-[#070E1C] overflow-hidden">
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
              <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
              About Us
              <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
            </span>

            <h2 className="font-manrope text-4xl lg:text-5xl font-black text-white mb-6 leading-[1.1]">
              What Are{" "}
              <span className="emerald-gradient-text">Landlord Share</span>{" "}
              Flats?
            </h2>

            <div className="space-y-5 text-white/65 text-base leading-relaxed">
              <p>
                In some real estate projects, the landowner and builder work together.
                The landowner provides the land, and the builder constructs the apartments.
                As part of this agreement, the landowner receives a{" "}
                <span className="text-white font-semibold">fixed number of flats</span>{" "}
                in the completed project. These are called{" "}
                <span className="text-emerald-400 font-semibold">landlord share flats</span>.
              </p>
              <p>
                Sometimes, the landowner sells these flats directly to buyers. In certain cases,
                they may be available at{" "}
                <span className="text-white font-semibold">competitive prices</span>{" "}
                compared to the builder's regular units.
              </p>
              <p>
                At <span className="text-emerald-400 font-semibold">LLS</span>, we help
                first-time buyers understand the process, verify all documents, and ensure
                a safe and transparent purchase — so you can{" "}
                <span className="text-white font-semibold">buy with confidence and clarity</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={17} />
                Talk to an Expert
              </a>
              <a
                href="#properties"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white/80 font-semibold rounded-2xl hover:border-emerald-500/40 hover:text-emerald-400 transition-all duration-300"
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
                className="flex gap-5 p-6 bg-white/[0.04] border border-white/[0.07] rounded-2xl hover:border-emerald-500/25 hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className="w-12 h-12 shrink-0 bg-emerald-500/15 border border-emerald-500/25 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={22} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-manrope font-bold text-white text-base mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: "₹500Cr+", label: "Deals Closed" },
                { value: "2,000+", label: "Happy Buyers" },
                { value: "98%", label: "Satisfaction" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                >
                  <p className="font-manrope font-black text-xl text-emerald-400">{s.value}</p>
                  <p className="text-white/45 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
