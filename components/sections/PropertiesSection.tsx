"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Home, Maximize2, Clock, BadgeCheck,
  CreditCard, Tag, ArrowRight, SlidersHorizontal,
} from "lucide-react";
import { PROPERTIES, AREAS } from "@/lib/constants";
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import ContactModal from "@/components/ui/ContactModal";

const badgeColors: Record<string, string> = {
  Premium: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "New Launch": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Hot Deal": "bg-red-500/20 text-red-300 border-red-500/30",
  Luxury: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Ultra Luxury": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "Value Buy": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Best Value": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Pre-Launch": "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

export default function PropertiesSection() {
  const [activeArea, setActiveArea] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState<{
    name: string;
    location: string;
  } | null>(null);

  const filtered = PROPERTIES.filter(
    (p) => activeArea === "All" || p.tag === activeArea
  );

  return (
    <section id="properties" className="section-padding bg-[#F8FAFC] dark:bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="section-label mb-4 block">
              <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
              Live Listings
              <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
            </span>
            <h2 className="font-manrope text-4xl lg:text-5xl font-black text-[#0A1628] dark:text-white mb-3">
              Available{" "}
              <span className="emerald-gradient-text">Properties</span>
            </h2>
            <p className="text-[#0A1628]/60 dark:text-white/60 text-lg">
              Updated daily. All listings are verified and RERA compliant.
            </p>
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={16} className="text-[#0A1628]/40 dark:text-white/40" />
            {AREAS.map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeArea === area
                    ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : "bg-[#0A1628]/10 dark:bg-white/5 text-[#0A1628]/60 dark:text-white/60 hover:bg-emerald-500/10 hover:text-emerald-500"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Properties Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArea}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((property) => (
              <motion.div
                key={property.id}
                variants={staggerItem}
                className="group bg-white dark:bg-[#112240] rounded-3xl border border-[#E2E8F0] dark:border-white/[0.06] overflow-hidden hover:border-emerald-500/30 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                {/* Card image */}
                <div className="relative h-52 overflow-hidden bg-[#112240]">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className={`badge border text-xs ${badgeColors[property.badge] || "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"}`}>
                      {property.badge}
                    </span>
                    {property.rera && (
                      <div className="flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                        <BadgeCheck size={10} />
                        RERA
                      </div>
                    )}
                  </div>

                  {/* Location at bottom */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                    <MapPin size={13} className="text-emerald-400" />
                    <span className="text-white text-sm font-semibold">{property.location}</span>
                  </div>

                  {/* Highlight */}
                  <div className="absolute bottom-4 right-4">
                    <span className="text-white/80 text-xs bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      {property.highlight}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="font-manrope font-bold text-xl text-[#0A1628] dark:text-white mb-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {property.name}
                  </h3>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-3 my-4">
                    <div className="flex items-center gap-2 text-sm text-[#0A1628]/60 dark:text-white/50">
                      <Home size={14} className="text-emerald-500 shrink-0" />
                      <span>{property.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#0A1628]/60 dark:text-white/50">
                      <Maximize2 size={14} className="text-emerald-500 shrink-0" />
                      <span className="truncate">{property.area}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#0A1628]/60 dark:text-white/50">
                      <Clock size={14} className="text-emerald-500 shrink-0" />
                      <span>{property.possession}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#0A1628]/60 dark:text-white/50">
                      <CreditCard size={14} className="text-emerald-500 shrink-0" />
                      <span className="truncate">{property.payment}</span>
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0] dark:border-white/[0.06]">
                    <div>
                      <p className="text-xs text-[#0A1628]/40 dark:text-white/30 mb-0.5">Starting from</p>
                      <p className="font-manrope font-black text-lg text-[#0A1628] dark:text-white">
                        {property.price}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedProperty({
                          name: property.name,
                          location: property.location,
                        })
                      }
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Know More
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() =>
              setSelectedProperty({ name: "All Properties", location: "Hyderabad" })
            }
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-emerald-500 text-emerald-500 dark:text-emerald-400 font-bold rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            View All Properties
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        propertyName={selectedProperty?.name}
        propertyLocation={selectedProperty?.location}
      />
    </section>
  );
}
