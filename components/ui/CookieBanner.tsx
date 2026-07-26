"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm w-full"
        >
          <div className="bg-[#112240] border border-white/10 rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <Cookie size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Cookie Preferences</p>
                <p className="text-white/60 text-xs leading-relaxed">
                  We use cookies to enhance your experience. By continuing, you agree to our{" "}
                  <a href="#" className="text-emerald-400 underline">Privacy Policy</a>.
                </p>
              </div>
              <button
                onClick={decline}
                className="text-white/40 hover:text-white transition-colors ml-auto shrink-0"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-emerald-600 transition-colors"
              >
                <Check size={14} />
                Accept All
              </button>
              <button
                onClick={decline}
                className="flex-1 text-white/60 text-xs font-semibold py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:text-white transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
