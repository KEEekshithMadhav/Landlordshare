"use client";

import { WHATSAPP_HREF } from "@/lib/constants";

export default function PriceTicker() {
  const tickerItems = [
    {
      prefix: "Prices may vary daily.",
      suffix: "Please contact us for the latest prices and additional information.",
    },
    {
      prefix: "Prices may vary daily.",
      suffix: "Please contact us for the latest prices and additional information.",
    },
    {
      prefix: "Prices may vary daily.",
      suffix: "Please contact us for the latest prices and additional information.",
    },
    {
      prefix: "Prices may vary daily.",
      suffix: "Please contact us for the latest prices and additional information.",
    },
  ];

  return (
    <div
      role="region"
      aria-label="Price announcement"
      className="relative z-30 w-full bg-gradient-to-r from-[#070E1E] via-[#0F1D3A] to-[#070E1E] border-t border-slate-200/20 border-b border-[#FF0033]/30 text-white text-xs sm:text-sm py-2 overflow-hidden shadow-inner"
    >
      <div className="flex items-center">
        {/* Left pinned badge for quick context */}
        <div className="flex items-center pl-3 sm:pl-6 pr-3 sm:pr-4 shrink-0 z-20 bg-[#070E1E] shadow-[8px_0_12px_#070E1E]">
          <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-[#FF0033]/20 border border-[#FF0033]/50 text-[#FFCC00]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0033] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF0033]" />
            </span>
            Notice
          </span>
        </div>

        {/* Gradient edge fades for smooth entrance/exit */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#070E1E] to-transparent z-10 pointer-events-none" />

        {/* Continuous Infinite Marquee Track */}
        <div className="flex marquee-track items-center gap-8 sm:gap-12 whitespace-nowrap">
          {/* First set */}
          {tickerItems.map((item, idx) => (
            <div key={`ticker-1-${idx}`} className="flex items-center gap-3 shrink-0">
              <span className="text-[#FF0033] text-xs">✦</span>
              <span className="text-[#FFCC00] font-bold tracking-wide">
                {item.prefix}
              </span>
              <span className="text-slate-200 font-medium">
                Please{" "}
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold underline decoration-[#FF0033] hover:text-[#FFCC00] hover:decoration-[#FFCC00] transition-colors underline-offset-2"
                >
                  contact us
                </a>{" "}
                for the latest prices and additional information.
              </span>
            </div>
          ))}

          {/* Second duplicate set for seamless infinite loop */}
          {tickerItems.map((item, idx) => (
            <div key={`ticker-2-${idx}`} className="flex items-center gap-3 shrink-0">
              <span className="text-[#FF0033] text-xs">✦</span>
              <span className="text-[#FFCC00] font-bold tracking-wide">
                {item.prefix}
              </span>
              <span className="text-slate-200 font-medium">
                Please{" "}
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold underline decoration-[#FF0033] hover:text-[#FFCC00] hover:decoration-[#FFCC00] transition-colors underline-offset-2"
                >
                  contact us
                </a>{" "}
                for the latest prices and additional information.
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
