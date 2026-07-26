"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Link2,
  Share2,
  Play,
  Send,
  ArrowRight,
  Building2,
} from "lucide-react";
import { WHATSAPP_HREF, PHONE_HREF } from "@/lib/constants";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  Services: [
    { label: "Buy Property", href: "#services" },
    { label: "Sell Property", href: "#services" },
    { label: "Document Verify", href: "#services" },
    { label: "Home Loans", href: "#services" },
    { label: "Investment Consult", href: "#services" },
  ],
  Locations: [
    { label: "Kokapet", href: "#properties" },
    { label: "Tellapur", href: "#properties" },
    { label: "Neopolis", href: "#properties" },
    { label: "Financial District", href: "#properties" },
    { label: "Gachibowli", href: "#properties" },
  ],
};

const socialLinks = [
  { icon: Share2, href: "#", label: "Instagram" },
  { icon: Link2, href: "#", label: "Facebook" },
  { icon: Play, href: "#", label: "YouTube" },
  { icon: Send, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-[#070E1C] border-t border-white/5 text-white" id="contact">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo/logo.png"
                alt="LandlordShares"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Hyderabad&apos;s most trusted platform for verified landlord share flats.
              We make property buying safe, transparent, and straightforward.
            </p>

            <div className="space-y-3 mb-6">
              <a href={PHONE_HREF} className="flex items-center gap-3 text-sm text-white/60 hover:text-emerald-400 transition-colors">
                <Phone size={15} className="text-emerald-400" />
                +91 85858 54853
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/60 hover:text-emerald-400 transition-colors">
                <MessageCircle size={15} className="text-emerald-400" />
                WhatsApp Us
              </a>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin size={15} className="text-emerald-400 shrink-0" />
                Kondapur, Hyderabad, Telangana
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-emerald-500/20 rounded-xl flex items-center justify-center text-white/50 hover:text-emerald-400 transition-all border border-white/5 hover:border-emerald-500/30"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} LandlordShares. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
