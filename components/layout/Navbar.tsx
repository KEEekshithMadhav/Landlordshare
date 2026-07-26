"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, WHATSAPP_HREF } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: scrolled ? -100 : 0,
          opacity: scrolled ? 0 : 1,
          pointerEvents: scrolled ? "none" : "auto",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo with height 58px */}
            <Link href="/" className="flex items-center group">
              <img
                src="/logo.png"
                alt="LandlordShares Logo"
                className="h-[58px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-slate-700 hover:text-[#C5922E] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C5922E] after:transition-all after:duration-300 hover:after:w-full pb-0.5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C5922E] to-[#D4A843] text-white text-sm font-bold rounded-xl hover:from-[#A67B24] hover:to-[#C5922E] shadow-[0_4px_15px_rgba(197,146,46,0.3)] hover:shadow-[0_6px_20px_rgba(197,146,46,0.4)] transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={15} />
                Book Consultation
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 flex items-center justify-center text-slate-800"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-30 bg-white pt-24 flex flex-col"
          >
            <nav className="flex flex-col gap-0 px-6 py-6 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 text-xl font-bold text-slate-800 hover:text-[#C5922E] border-b border-slate-100 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 space-y-3"
              >
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl text-lg shadow-md"
                >
                  <MessageCircle size={20} />
                  WhatsApp Us
                </a>
                <a
                  href="tel:9885858529"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#C5922E] to-[#D4A843] text-white font-bold rounded-2xl text-lg shadow-md"
                >
                  <Phone size={20} />
                  Call Now
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
