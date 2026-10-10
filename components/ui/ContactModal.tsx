"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  MapPin,
  Shield,
  Loader2,
  CheckCircle2,
  User,
  Phone,
  Mail,
  MapPinned,
  Tag,
  Check,
} from "lucide-react";
import { getStoredAttribution, AttributionData } from "@/lib/tracking";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

export interface PropertyAttribution {
  id?: number | string;
  name: string;
  location: string;
  type?: string;
  area?: string;
  price?: string;
  badge?: string;
  possession?: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: PropertyAttribution | null;
  // Fallbacks for direct string usage
  propertyName?: string;
  propertyLocation?: string;
}

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  website_hp: string; // Honeypot field for bot spam deterrence
  consent: boolean;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactModal({
  isOpen,
  onClose,
  property,
  propertyName,
  propertyLocation,
}: ContactModalProps) {
  // Normalize property details
  const activeProperty: PropertyAttribution = property || {
    name: propertyName || "General Inquiry",
    location: propertyLocation || "Hyderabad",
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    website_hp: "",
    consent: true,
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [attribution, setAttribution] = useState<AttributionData | null>(null);

  // Initialize and capture attribution upon modal readiness
  useEffect(() => {
    if (isOpen) {
      const data = getStoredAttribution();
      setAttribution(data);
    }
  }, [isOpen]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          fullName: "",
          mobile: "",
          email: "",
          city: "",
          website_hp: "",
          consent: true,
        });
        setStatus("idle");
        setErrorMsg("");
      }, 300);
    }
  }, [isOpen]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "mobile") {
      // Strip out anything not a digit, cap at 10 digits
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digits }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = (): string | null => {
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      return "Please enter your full name (minimum 2 characters)";
    }
    const cleanPhone = formData.mobile.trim();
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      return "Please enter a valid 10-digit Indian mobile number (e.g. 9885858529)";
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      return "Please enter a valid email address";
    }
    if (!formData.city.trim()) {
      return "Please enter your city";
    }
    if (!formData.consent) {
      return "Please agree to the privacy consent to receive property details";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check (if bot filled the hidden field, silently fail)
    if (formData.website_hp) {
      setStatus("success");
      setTimeout(() => onClose(), 1500);
      return;
    }

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setErrorMsg("");
    setStatus("loading");

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        consentGiven: formData.consent,
        // Property Attribution
        propertyId: activeProperty.id,
        propertyName: activeProperty.name,
        propertyLocation: activeProperty.location,
        propertyType: activeProperty.type,
        propertyPrice: activeProperty.price,
        propertyArea: activeProperty.area,
        // Organic Instagram & Campaign Attribution
        trafficSource: attribution?.trafficSource || "Direct",
        isInstagramLead: attribution?.isInstagramLead || false,
        utmSource: attribution?.utmSource,
        utmMedium: attribution?.utmMedium,
        utmCampaign: attribution?.utmCampaign,
        utmContent: attribution?.utmContent,
        utmTerm: attribution?.utmTerm,
        referrerUrl: attribution?.referrerUrl,
        landingPageUrl: attribution?.landingPageUrl,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed");
      }

      setStatus("success");

      // Auto-close after success confirmation
      setTimeout(() => {
        onClose();
      }, 2600);
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again or call us.";
      setErrorMsg(message);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <div className="bg-white rounded-3xl w-full max-w-lg shadow-[0_25px_70px_rgba(15,23,42,0.2)] border border-slate-100 relative overflow-hidden my-auto">
                {/* Modern minimal red accent top line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0033] via-[#E60026] to-[#FF6600]" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="absolute top-5 right-5 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <X size={16} />
                </button>

                {/* Content */}
                <div className="p-6 sm:p-8 pt-8">
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                            delay: 0.1,
                          }}
                          className="w-16 h-16 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center mx-auto mb-5"
                        >
                          <CheckCircle2 size={36} className="text-emerald-500" />
                        </motion.div>
                        <h3 className="font-manrope text-2xl font-bold text-slate-900 mb-2">
                          Enquiry Received!
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto mb-4">
                          Thank you for your interest in{" "}
                          <span className="font-semibold text-slate-900">
                            {activeProperty.name}
                          </span>
                          . Our verified property advisor will share details and pricing with you shortly.
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-full">
                          <Check size={14} /> Assigned to LandlordShares Hyderabad Desk
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Header & Property Attribution Banner */}
                        <div className="mb-6">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-red-50 text-[#FF0033] border border-red-100 shrink-0">
                              <Building2 size={12} />
                              Verified Listing
                            </span>
                            {activeProperty.price && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md max-w-full break-words">
                                <Tag size={12} className="text-[#FF0033] shrink-0" />
                                <span>{activeProperty.price}</span>
                              </span>
                            )}
                          </div>

                          <h3 className="font-manrope text-2xl font-black text-slate-900 tracking-tight">
                            Enquire About {activeProperty.name}
                          </h3>

                          {/* Property mini-card summary */}
                          <div className="mt-2.5 p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin size={13} className="text-[#FF0033] shrink-0" />
                              <span className="font-medium text-slate-900">
                                {activeProperty.location}
                              </span>
                              {activeProperty.type && (
                                <span className="text-slate-400">
                                  • {activeProperty.type}
                                </span>
                              )}
                            </div>
                            <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              0% Brokerage
                            </span>
                          </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {/* Honeypot field (hidden from legitimate users) */}
                          <div className="hidden" aria-hidden="true">
                            <label htmlFor="website_hp">Leave this empty</label>
                            <input
                              type="text"
                              id="website_hp"
                              name="website_hp"
                              value={formData.website_hp}
                              onChange={handleChange}
                              tabIndex={-1}
                              autoComplete="off"
                            />
                          </div>

                          {/* Full Name */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Full Name <span className="text-[#FF0033]">*</span>
                            </label>
                            <div className="relative">
                              <User
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                              />
                              <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Your full name"
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF0033]/20 focus:border-[#FF0033] transition-all"
                              />
                            </div>
                          </div>

                          {/* Mobile Phone (with +91 badge) */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Phone / WhatsApp <span className="text-[#FF0033]">*</span>
                            </label>
                            <div className="relative flex items-center">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-500 font-semibold text-xs border-r border-slate-200 pr-2.5">
                                <Phone size={13} className="text-[#FF0033]" />
                                <span>+91</span>
                              </div>
                              <input
                                type="tel"
                                name="mobile"
                                required
                                maxLength={10}
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="98858 58529"
                                className="w-full pl-18 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF0033]/20 focus:border-[#FF0033] transition-all font-medium tracking-wide"
                              />
                            </div>
                          </div>

                          {/* Email & City Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Email Address <span className="text-[#FF0033]">*</span>
                              </label>
                              <div className="relative">
                                <Mail
                                  size={15}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="name@email.com"
                                  className="w-full pl-9 pr-3 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF0033]/20 focus:border-[#FF0033] transition-all"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                City <span className="text-[#FF0033]">*</span>
                              </label>
                              <div className="relative">
                                <MapPinned
                                  size={15}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                  type="text"
                                  name="city"
                                  required
                                  value={formData.city}
                                  onChange={handleChange}
                                  placeholder="Hyderabad"
                                  className="w-full pl-9 pr-3 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF0033]/20 focus:border-[#FF0033] transition-all"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Privacy Consent Checkbox (DPDP Act & TRAI Compliance) */}
                          <div className="pt-1">
                            <label className="flex items-start gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#FF0033] focus:ring-[#FF0033]/30"
                              />
                              <span className="text-xs text-slate-600 leading-snug">
                                I authorize LandlordShares to contact me via WhatsApp / Call
                                regarding property pricing &amp; availability. I agree to the{" "}
                                <button
                                  type="button"
                                  onClick={() => setPrivacyOpen(true)}
                                  className="text-[#FF0033] underline hover:text-[#D6002B] font-semibold"
                                >
                                  Privacy Policy
                                </button>
                                .
                              </span>
                            </label>
                          </div>

                          {/* Error message */}
                          {errorMsg && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-600 text-xs font-medium text-center bg-red-50 p-2.5 rounded-xl border border-red-100"
                            >
                              {errorMsg}
                            </motion.p>
                          )}

                          {/* Submit button */}
                          <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full py-3.5 bg-gradient-to-r from-[#FF0033] to-[#E60026] text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:from-[#D6002B] hover:to-[#FF0033] shadow-[0_4px_20px_rgba(255,0,51,0.25)] hover:shadow-[0_8px_30px_rgba(255,0,51,0.35)] transition-all duration-300 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {status === "loading" ? (
                              <>
                                <Loader2 size={18} className="animate-spin" />
                                Processing Request...
                              </>
                            ) : (
                              "Get Property Pricing & Details"
                            )}
                          </button>
                        </form>

                        {/* Trust badge */}
                        <p className="text-center text-slate-400 text-xs mt-4 flex items-center justify-center gap-1.5">
                          <Shield size={12} className="text-emerald-500" />
                          Encrypted Transmission • Zero Brokerage • Direct Landlord Shares
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Embedded Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </>
  );
}
