"use client";

export interface AttributionData {
  trafficSource: string;
  isInstagramLead: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrerUrl?: string;
  landingPageUrl?: string;
  firstTouchTimestamp?: string;
}

const STORAGE_KEY = "landlordshares_attribution";

/**
 * Parses query parameters and referrer to detect traffic source,
 * specifically optimizing for Organic Instagram and Instagram Ads.
 */
export function captureTrafficAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return {
      trafficSource: "Direct",
      isInstagramLead: false,
    };
  }

  // Check if we already have attribution saved in this session
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (existing) {
      const parsed = JSON.parse(existing) as AttributionData;
      return parsed;
    }
  } catch (err) {
    console.warn("Error reading stored attribution:", err);
  }

  // Parse current URL search params
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source")?.toLowerCase() || undefined;
  const utmMedium = urlParams.get("utm_medium")?.toLowerCase() || undefined;
  const utmCampaign = urlParams.get("utm_campaign") || undefined;
  const utmContent = urlParams.get("utm_content") || undefined;
  const utmTerm = urlParams.get("utm_term") || undefined;
  const igsh = urlParams.get("igsh") || undefined;
  const igshid = urlParams.get("igshid") || undefined;

  const referrer = document.referrer ? document.referrer.toLowerCase() : "";
  const currentUrl = window.location.href;

  // Detect Instagram traffic
  const isInstagramReferrer =
    referrer.includes("instagram.com") ||
    referrer.includes("l.instagram.com") ||
    referrer.includes("lm.instagram.com");

  const isInstagramUtm =
    utmSource === "instagram" ||
    utmMedium === "instagram" ||
    utmMedium === "ig" ||
    Boolean(igsh) ||
    Boolean(igshid);

  const isInstagram = isInstagramReferrer || isInstagramUtm;

  let trafficSource = "Direct";
  if (isInstagram) {
    if (utmMedium === "cpc" || utmMedium === "paid" || utmMedium === "ads") {
      trafficSource = "Instagram Ads";
    } else {
      trafficSource = "Instagram Organic";
    }
  } else if (utmSource) {
    trafficSource = `Campaign (${utmSource})`;
  } else if (referrer) {
    if (referrer.includes("google.com")) trafficSource = "Google Search";
    else if (referrer.includes("facebook.com")) trafficSource = "Facebook";
    else if (referrer.includes("linkedin.com")) trafficSource = "LinkedIn";
    else if (referrer.includes("youtube.com")) trafficSource = "YouTube";
    else trafficSource = `Referral (${new URL(referrer).hostname})`;
  }

  const attribution: AttributionData = {
    trafficSource,
    isInstagramLead: isInstagram,
    utmSource: utmSource || (isInstagram ? "instagram" : undefined),
    utmMedium: utmMedium || (isInstagram ? "organic_bio_or_reel" : undefined),
    utmCampaign,
    utmContent,
    utmTerm,
    referrerUrl: document.referrer || undefined,
    landingPageUrl: currentUrl,
    firstTouchTimestamp: new Date().toISOString(),
  };

  // Persist across session and local storage
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch (err) {
    console.warn("Error saving attribution to storage:", err);
  }

  return attribution;
}

/**
 * Retrieves current attribution data or performs capture if missing.
 */
export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return {
      trafficSource: "Direct",
      isInstagramLead: false,
    };
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as AttributionData;
    }
  } catch (err) {
    console.warn("Error reading stored attribution:", err);
  }

  return captureTrafficAttribution();
}
