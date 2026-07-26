"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X, Building2, MapPin } from "lucide-react";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/constants";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
  propertyLocation?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  propertyName,
  propertyLocation,
}: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#0F1D3A] border border-[#C5922E]/30 rounded-3xl p-8 w-full max-w-md shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="w-14 h-14 bg-[#C5922E]/20 rounded-2xl flex items-center justify-center mb-4 border border-[#C5922E]/30">
                  <Building2 className="text-[#D4A843]" size={28} />
                </div>
                <h3 className="text-white text-xl font-bold font-manrope mb-1">
                  {propertyName || "Get in Touch"}
                </h3>
                {propertyLocation && (
                  <div className="flex items-center gap-1.5 text-[#D4A843] text-sm">
                    <MapPin size={14} />
                    <span>{propertyLocation}</span>
                  </div>
                )}
                <p className="text-white/60 text-sm mt-2 leading-relaxed">
                  Choose how you'd like to connect. Our experts are available
                  Mon–Sat, 9 AM – 7 PM.
                </p>
              </div>

              {/* Contact Options */}
              <div className="space-y-3">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full bg-[#25D366]/15 border border-[#25D366]/30 hover:bg-[#25D366]/25 hover:border-[#25D366]/60 text-white p-4 rounded-2xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle size={22} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#25D366]">WhatsApp</p>
                    <p className="text-white/60 text-sm">Chat with our property expert</p>
                  </div>
                  <div className="ml-auto text-white/30 group-hover:text-[#25D366] transition-colors">
                    →
                  </div>
                </a>

                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-4 w-full bg-[#C5922E]/15 border border-[#C5922E]/30 hover:bg-[#C5922E]/25 hover:border-[#C5922E]/60 text-white p-4 rounded-2xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#C5922E] to-[#D4A843] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={22} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#D4A843]">Call Now</p>
                    <p className="text-white/60 text-sm">+91 98858 58529</p>
                  </div>
                  <div className="ml-auto text-white/30 group-hover:text-[#D4A843] transition-colors">
                    →
                  </div>
                </a>
              </div>

              {/* Footer note */}
              <p className="text-center text-white/30 text-xs mt-5">
                🔒 Your details are never shared with third parties.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
