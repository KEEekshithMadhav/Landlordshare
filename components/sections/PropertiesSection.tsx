"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Home, Maximize2, Clock, BadgeCheck,
  CreditCard, Tag, ArrowRight, SlidersHorizontal, ChevronUp
} from "lucide-react";
import { PROPERTIES, AREAS } from "@/lib/constants";
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import ContactModal from "@/components/ui/ContactModal";

export default function PropertiesSection() {
  const [activeArea, setActiveArea] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{
    name: string;
    location: string;
  } | null>(null);

  const filtered = PROPERTIES.filter(
    (p) => activeArea === "All" || p.tag === activeArea
  );

  const displayedProperties = showAll ? filtered : filtered.slice(0, 8);

  return (
    <section id="properties" className="section-padding bg-[#F8FAFC]">
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
              <span className="w-6 h-0.5 bg-[#C5922E] rounded-full" />
              Live Listings
              <span className="w-6 h-0.5 bg-[#C5922E] rounded-full" />
            </span>
            <h2 className="font-manrope text-4xl lg:text-5xl font-black text-slate-900 mb-3">
              Available{" "}
              <span className="gold-gradient-text">Properties</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Updated daily. All listings are verified and RERA compliant.
            </p>
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={16} className="text-slate-400" />
            {AREAS.map((area) => (
              <button
                key={area}
                onClick={() => {
                  setActiveArea(area);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeArea === area
                    ? "bg-gradient-to-r from-[#C5922E] to-[#D4A843] text-white shadow-[0_4px_15px_rgba(197,146,46,0.3)]"
                    : "bg-slate-200/70 text-slate-700 hover:bg-amber-50 hover:text-[#C5922E]"
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
            key={activeArea + (showAll ? "-all" : "-initial")}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {displayedProperties.map((property) => (
              <motion.div
                key={property.id}
                variants={staggerItem}
                className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:border-[#C5922E]/40 transition-all duration-400 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
              >
                {/* Card image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                  {/* RERA Badge */}
                  {property.rera && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#C5922E] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                      <BadgeCheck size={10} />
                      RERA
                    </div>
                  )}

                  {/* Location at bottom */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#E8C872]" />
                    <span className="text-white text-sm font-semibold">{property.location}</span>
                  </div>

                  {/* Highlight */}
                  <div className="absolute bottom-4 right-4">
                    <span className="text-white/90 text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      {property.highlight}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-manrope font-bold text-lg text-slate-900 mb-1 group-hover:text-[#C5922E] transition-colors line-clamp-1">
                    {property.name}
                  </h3>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-2.5 my-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Home size={13} className="text-[#C5922E] shrink-0" />
                      <span className="truncate">{property.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Maximize2 size={13} className="text-[#C5922E] shrink-0" />
                      <span className="truncate">{property.area}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Clock size={13} className="text-[#C5922E] shrink-0" />
                      <span className="truncate">{property.possession}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CreditCard size={13} className="text-[#C5922E] shrink-0" />
                      <span className="truncate">{property.payment}</span>
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] text-slate-400 mb-0.5">Starting from</p>
                      <p className="font-manrope font-black text-sm text-slate-900 truncate max-w-[130px]">
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
                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#C5922E] to-[#D4A843] text-white text-xs font-bold rounded-xl hover:from-[#A67B24] hover:to-[#C5922E] hover:shadow-[0_0_20px_rgba(197,146,46,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
                    >
                      Know More
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        {filtered.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#C5922E] text-[#C5922E] font-bold rounded-2xl hover:bg-gradient-to-r hover:from-[#C5922E] hover:to-[#D4A843] hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,146,46,0.3)]"
            >
              {showAll ? "Show Initial Properties" : `View All (${filtered.length}) Properties`}
              {showAll ? <ChevronUp size={18} /> : <ArrowRight size={18} />}
            </button>
          </motion.div>
        )}
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
