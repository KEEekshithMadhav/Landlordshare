"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, WHATSAPP_HREF, PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs"
            : "bg-white/90 backdrop-blur-sm border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-18 sm:h-20" : "h-20 sm:h-24"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img
                src="/logo4.png"
                alt="LandlordShares Logo"
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
                }`}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-slate-700 hover:text-[#FF0033] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF0033] after:transition-all after:duration-300 hover:after:w-full pb-0.5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-1.5 px-3.5 py-2 text-slate-700 hover:text-[#FF0033] text-xs font-bold transition-colors"
              >
                <Phone size={14} className="text-[#FF0033]" />
                {PHONE_NUMBER}
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF0033] to-[#E60026] text-white text-sm font-bold rounded-xl hover:from-[#D6002B] hover:to-[#FF0033] shadow-[0_4px_15px_rgba(255,0,51,0.25)] hover:shadow-[0_6px_20px_rgba(255,0,51,0.35)] transition-all duration-200 hover:scale-102 active:scale-98"
              >
                <MessageCircle size={15} />
                Book Consultation
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 flex items-center justify-center text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-white pt-24 flex flex-col"
          >
            <div className="flex justify-end px-6 pb-2">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-slate-700 bg-slate-100 rounded-full"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-0 px-6 py-4 flex-1 overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="py-3.5 text-lg font-bold text-slate-800 hover:text-[#FF0033] border-b border-slate-100 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 space-y-3 pb-8"
              >
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl text-base shadow-sm"
                >
                  <MessageCircle size={18} />
                  WhatsApp Consultation
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#FF0033] to-[#E60026] text-white font-bold rounded-xl text-base shadow-sm"
                >
                  <Phone size={18} />
                  Call {PHONE_NUMBER}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
