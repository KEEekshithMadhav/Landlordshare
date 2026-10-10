"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Lock, FileText, CheckCircle } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-150 overflow-hidden relative">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#FF0033] flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-lg text-slate-900">
                      Privacy Policy & Consent
                    </h3>
                    <p className="text-xs text-slate-500">
                      LandlordShares Data Protection & Fair Usage Notice
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <Lock size={15} className="text-[#FF0033]" />
                    1. Information We Collect
                  </h4>
                  <p>
                    When you submit an enquiry on LandlordShares (landlordshares.com), we collect
                    your name, mobile number, email address, current city, the specific property
                    you are interested in, and referral tracking data (such as Instagram or campaign tags).
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <FileText size={15} className="text-[#FF0033]" />
                    2. Purpose of Collection & Usage
                  </h4>
                  <p>
                    Your contact information is used strictly to provide you with property pricing,
                    floor plans, project brochures, arrange site visits, and coordinate legal
                    verification details with verified landowners and project advisors.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <CheckCircle size={15} className="text-[#FF0033]" />
                    3. Communication Consent (DPDP Act & TRAI Compliance)
                  </h4>
                  <p>
                    By submitting the enquiry form, you provide express consent to LandlordShares
                    and our authorized property coordinators to contact you via Phone Calls,
                    WhatsApp messages, and SMS regarding your inquiry, overriding National Do Not
                    Call (NDNC) registrations solely for this purpose.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                    4. Zero Spam & Third-Party Selling Guarantee
                  </h4>
                  <p>
                    We do not sell, rent, or trade your personal information to unauthorized third
                    parties or generic marketing brokers. All data is transferred securely to our
                    lead management CRM (Wylto) via encrypted SSL webhooks.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                    5. Opt-Out & Contact
                  </h4>
                  <p>
                    You may revoke your consent at any time by replying &quot;STOP&quot; to our
                    WhatsApp messages or writing to us at support@landlordshares.com.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-slate-800 transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
