"use client";

import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  LineChart,
  Banknote,
  Gem,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  TrendingUp,
  ShieldCheck,
  LineChart,
  Banknote,
  Gem,
};

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="section-label mb-4 block">
            <span className="w-6 h-0.5 bg-[#C5922E] rounded-full" />
            Our Services
            <span className="w-6 h-0.5 bg-[#C5922E] rounded-full" />
          </span>
          <h2 className="font-manrope text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Everything You Need to{" "}
            <span className="gold-gradient-text">Invest Smartly</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            From finding the right property to closing the deal — we provide comprehensive
            real estate services with zero compromises.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                variants={staggerItem}
                className="group relative p-7 bg-[#F8FAFC] rounded-3xl border border-slate-200/80 hover:border-[#C5922E]/30 transition-all duration-400 hover:-translate-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] cursor-default overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl`} />

                {/* Icon */}
                <div className="relative z-10 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} border border-slate-200/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                    {Icon && <Icon size={26} className={service.accentColor} />}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-manrope font-bold text-xl text-slate-900 mb-3 group-hover:text-[#C5922E] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <button className={`inline-flex items-center gap-1.5 text-sm font-semibold ${service.accentColor} group-hover:gap-3 transition-all duration-300`}>
                    Learn More
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.03] to-transparent rounded-3xl" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
