"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Home,
  Maximize2,
  Clock,
  BadgeCheck,
  CreditCard,
  ArrowRight,
  SlidersHorizontal,
  ChevronUp,
  Search,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { PROPERTIES, AREAS, WHATSAPP_NUMBER } from "@/lib/constants";
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import ContactModal, { PropertyAttribution } from "@/components/ui/ContactModal";

export default function PropertiesSection() {
  const [activeArea, setActiveArea] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyAttribution | null>(null);

  // Filter based on area and search query
  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const matchesArea = activeArea === "All" || p.tag === activeArea;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        (p.highlight && p.highlight.toLowerCase().includes(q));
      return matchesArea && matchesQuery;
    });
  }, [activeArea, searchQuery]);

  const displayedProperties = showAll ? filtered : filtered.slice(0, 8);

  const buildWhatsAppLink = (prop: typeof PROPERTIES[0]) => {
    const text = encodeURIComponent(
      `Hello LandlordShares, I would like more details and pricing for *${prop.name}* located in ${prop.location} (${prop.type}, starting ${prop.price}). Please share brochure and site visit availability.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  return (
    <section id="properties" className="py-20 sm:py-28 bg-[#FAFAFA] border-t border-slate-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#FF0033] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} />
              Curated Hyderabad Portfolio
            </div>
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Verified Landlord{" "}
              <span className="bg-gradient-to-r from-[#FF0033] to-[#E60026] bg-clip-text text-transparent">
                Share Properties
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              100% legally vetted landlord allocations in Hyderabad&apos;s fastest growing corridors.
              Save 10–20% compared to direct builder retail pricing.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-6 bg-white border border-slate-200/80 px-6 py-3 rounded-2xl shadow-xs">
            <div>
              <p className="text-xs text-slate-400 font-medium">Available Inventory</p>
              <p className="text-lg font-black text-slate-900">{PROPERTIES.length}+ Units</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Average Savings</p>
              <p className="text-lg font-black text-[#FF0033]">12% – 18%</p>
            </div>
          </div>
        </motion.div>

        {/* Search & Location Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project name, micro-market (Kokapet, Tellapur, Neopolis)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF0033]/20 focus:border-[#FF0033] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Area Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <SlidersHorizontal size={13} />
              Area:
            </span>
            {AREAS.map((area) => (
              <button
                key={area}
                onClick={() => {
                  setActiveArea(area);
                  setShowAll(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  activeArea === area
                    ? "bg-[#FF0033] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <span>
            Showing <strong className="text-slate-900">{displayedProperties.length}</strong> of{" "}
            <strong className="text-slate-900">{filtered.length}</strong> matched properties
          </span>
          {activeArea !== "All" && (
            <button
              onClick={() => setActiveArea("All")}
              className="text-[#FF0033] hover:underline font-semibold"
            >
              Reset to All Areas
            </button>
          )}
        </div>

        {/* Property Cards Grid */}
        <AnimatePresence mode="wait">
          {displayedProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 max-w-md mx-auto"
            >
              <p className="text-slate-400 text-sm mb-2">No properties matching your criteria</p>
              <button
                onClick={() => {
                  setActiveArea("All");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-[#FF0033] underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeArea + searchQuery + (showAll ? "-all" : "-initial")}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {displayedProperties.map((property) => (
                <motion.div
                  key={property.id}
                  variants={staggerItem}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-slate-300 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header & Media */}
                    <div className="relative h-50 overflow-hidden bg-slate-100">
                      <img
                        src={property.image}
                        alt={property.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Modern Clean Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                        <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-black px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wider">
                          {property.badge || "Landlord Share"}
                        </span>
                        {property.rera && (
                          <span className="flex items-center gap-1 bg-[#FF0033] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-xs">
                            <BadgeCheck size={11} />
                            RERA
                          </span>
                        )}
                      </div>

                      {/* Bottom Info on Media */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                        <div className="flex items-center gap-1 text-xs font-bold drop-shadow-sm">
                          <MapPin size={13} className="text-[#FFCC00]" />
                          <span>{property.location}</span>
                        </div>
                        {property.highlight && (
                          <span className="text-[10px] font-medium bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-white/90">
                            {property.highlight}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <h3 className="font-manrope font-bold text-lg text-slate-900 group-hover:text-[#FF0033] transition-colors line-clamp-1">
                        {property.name}
                      </h3>

                      {/* Key Attributes Grid */}
                      <div className="grid grid-cols-2 gap-2.5 my-3.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-1.5 truncate">
                          <Home size={13} className="text-[#FF0033] shrink-0" />
                          <span className="truncate">{property.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Maximize2 size={13} className="text-[#FF0033] shrink-0" />
                          <span className="truncate">{property.area}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Clock size={13} className="text-[#FF0033] shrink-0" />
                          <span className="truncate">{property.possession}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <CreditCard size={13} className="text-[#FF0033] shrink-0" />
                          <span className="truncate">{property.payment}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Enquire Actions */}
                  <div className="p-5 pt-0 mt-auto">
                    <div className="pt-3.5 border-t border-slate-150">
                      {/* Full-width Starting Price Display (Zero Truncation) */}
                      <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 mb-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Starting Price
                        </span>
                        <div className="font-manrope font-black text-sm sm:text-[15px] text-slate-900 leading-snug break-words">
                          {property.price}
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="flex items-center gap-2">
                        {/* WhatsApp Attribution Quick Button */}
                        <a
                          href={buildWhatsAppLink(property)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp us about this property"
                          aria-label={`Enquire about ${property.name} on WhatsApp`}
                          className="h-10 px-3 rounded-xl bg-emerald-50 hover:bg-[#25D366] text-emerald-700 hover:text-white flex items-center justify-center gap-1.5 font-bold text-xs transition-all duration-200 border border-emerald-200/80 shrink-0"
                        >
                          <MessageCircle size={16} />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>

                        {/* Modal Enquiry / External Page */}
                        {(property as { link?: string }).link ? (
                          <a
                            href={(property as { link?: string }).link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-10 flex items-center justify-center gap-1.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                          >
                            Explore Site
                            <ExternalLink size={13} />
                          </a>
                        ) : (
                          <button
                            onClick={() =>
                              setSelectedProperty({
                                id: property.id,
                                name: property.name,
                                location: property.location,
                                type: property.type,
                                area: property.area,
                                price: property.price,
                                badge: property.badge,
                                possession: property.possession,
                              })
                            }
                            className="flex-1 h-10 flex items-center justify-center gap-1.5 px-4 bg-gradient-to-r from-[#FF0033] to-[#E60026] hover:from-[#D6002B] hover:to-[#FF0033] text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-[0_4px_16px_rgba(255,0,51,0.35)] transition-all duration-200 active:scale-[0.98]"
                          >
                            Enquire Now
                            <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All CTA */}
        {filtered.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-300 text-slate-800 hover:text-[#FF0033] hover:border-[#FF0033] font-bold text-sm rounded-xl shadow-xs hover:shadow-md transition-all duration-200"
            >
              {showAll ? "Show Fewer Properties" : `View All (${filtered.length}) Properties`}
              {showAll ? <ChevronUp size={16} /> : <ArrowRight size={16} />}
            </button>
          </motion.div>
        )}
      </div>

      {/* Property Context Contact Modal */}
      <ContactModal
        isOpen={Boolean(selectedProperty)}
        onClose={() => setSelectedProperty(null)}
        property={selectedProperty}
      />
    </section>
  );
}
