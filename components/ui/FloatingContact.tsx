"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/constants";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <>
            <motion.a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-2xl shadow-lg font-semibold text-sm hover:bg-[#20bc5a] transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp
            </motion.a>
            <motion.a
              href={PHONE_HREF}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              className="flex items-center gap-2 bg-[#1B2A4A] text-white px-4 py-3 rounded-2xl shadow-lg font-semibold text-sm hover:bg-[#0F1D3A] transition-colors border border-[#C5922E]/40"
            >
              <Phone size={18} className="text-[#D4A843]" />
              Call Now
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-r from-[#C5922E] to-[#D4A843] text-white rounded-full shadow-[0_0_30px_rgba(197,146,46,0.5)] flex items-center justify-center transition-colors hover:from-[#A67B24] hover:to-[#C5922E]"
        aria-label="Contact us"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
