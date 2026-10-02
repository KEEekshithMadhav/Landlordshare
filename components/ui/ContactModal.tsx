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
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
  propertyLocation?: string;
}

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactModal({
  isOpen,
  onClose,
  propertyName,
  propertyLocation,
}: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ fullName: "", mobile: "", email: "", city: "" });
        setStatus("idle");
        setErrorMsg("");
      }, 300);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
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
    const { name, value } = e.target;
    if (name === "mobile") {
      // Only allow digits, max 10
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = (): string | null => {
    if (!formData.fullName.trim()) return "Please enter your full name";
    if (!formData.mobile.trim() || formData.mobile.length < 10)
      return "Please enter a valid 10-digit mobile number";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      return "Please enter a valid email address";
    if (!formData.city.trim()) return "Please enter your city";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          propertyName: propertyName || "General Inquiry",
          propertyLocation: propertyLocation || "",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");

      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or call us directly.");
    }
  };

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
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-[0_40px_120px_rgba(0,0,0,0.4)] relative overflow-hidden">
              {/* Decorative top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0033] via-[#FF6600] to-[#FFCC00]" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all z-10"
              >
                <X size={16} />
              </button>

              {/* Content */}
              <div className="p-8 pt-10">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.1,
                        }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
                      >
                        <CheckCircle2
                          size={40}
                          className="text-green-500"
                        />
                      </motion.div>
                      <h3 className="font-manrope text-2xl font-bold text-slate-900 mb-2">
                        Thank You!
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        We&apos;ve received your inquiry for{" "}
                        <span className="font-semibold text-slate-700">
                          {propertyName}
                        </span>
                        . Our team will reach out shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Header */}
                      <div className="text-center mb-7">
                        <div className="inline-flex items-center gap-2 text-[#FF0033] text-xs font-bold uppercase tracking-[0.15em] mb-3">
                          <Building2 size={14} />
                          {propertyName || "LandlordShares"}
                        </div>
                        <h3 className="font-manrope text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
                          UNLOCK EXCLUSIVE ACCESS
                        </h3>
                        <p className="text-slate-500 text-sm">
                          Enter your details to get more details &amp;
                          schedule a site visit for
                        </p>
                        {propertyLocation && (
                          <div className="inline-flex items-center gap-1.5 text-[#FF0033] text-sm font-semibold mt-1">
                            <MapPin size={14} />
                            <span>{propertyLocation}</span>
                          </div>
                        )}
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name + Mobile row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Full Name{" "}
                              <span className="text-[#FF0033]">*</span>
                            </label>
                            <div className="relative">
                              <User
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                              />
                              <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Your full name"
                                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF0033]/30 focus:border-[#FF0033] transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Mobile Number{" "}
                              <span className="text-[#FF0033]">*</span>
                            </label>
                            <div className="relative">
                              <Phone
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                              />
                              <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="10-digit number"
                                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF0033]/30 focus:border-[#FF0033] transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address{" "}
                            <span className="text-[#FF0033]">*</span>
                          </label>
                          <div className="relative">
                            <Mail
                              size={16}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF0033]/30 focus:border-[#FF0033] transition-all"
                            />
                          </div>
                        </div>

                        {/* City */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            City <span className="text-[#FF0033]">*</span>
                          </label>
                          <div className="relative">
                            <MapPinned
                              size={16}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="Your city"
                              className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF0033]/30 focus:border-[#FF0033] transition-all"
                            />
                          </div>
                        </div>

                        {/* Error message */}
                        {errorMsg && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs font-medium text-center bg-red-50 p-2.5 rounded-xl"
                          >
                            {errorMsg}
                          </motion.p>
                        )}

                        {/* Submit button */}
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full py-4 bg-gradient-to-r from-[#FF0033] to-[#E60026] text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:from-[#D6002B] hover:to-[#FF0033] hover:shadow-[0_8px_30px_rgba(255,0,51,0.4)] transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Get More Details"
                          )}
                        </button>
                      </form>

                      {/* Trust badge */}
                      <p className="text-center text-slate-400 text-xs mt-5 flex items-center justify-center gap-1.5">
                        <Shield size={12} />
                        Your details are safe. We never spam.
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
  );
}
