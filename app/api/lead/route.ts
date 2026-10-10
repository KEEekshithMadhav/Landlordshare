import { NextRequest, NextResponse } from "next/server";
import {
  WYLTO_WEBHOOK_URL as DEFAULT_WYLTO_URL,
  GOOGLE_SCRIPT_URL as DEFAULT_GOOGLE_SCRIPT_URL,
} from "@/lib/constants";

// Configuration from environment variables
const WYLTO_WEBHOOK_URL = process.env.WYLTO_WEBHOOK_URL || DEFAULT_WYLTO_URL;
const WYLTO_AUTH_TOKEN = process.env.WYLTO_AUTH_TOKEN || process.env.WYLTO_WEBHOOK_SECRET || "";
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL;

// Phone number normalization
function formatPhoneNumber(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.toString().trim();
  const digits = cleaned.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }
  return cleaned.startsWith("+") ? cleaned : `+${digits}`;
}

// Basic email validator
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Honeypot check (prevent automated spam bots)
    if (body.website_hp) {
      console.warn("Spam bot trapped by honeypot field. Discarding lead silently.");
      return NextResponse.json({ success: true, message: "Processed" });
    }

    // 2. Extract and sanitize lead information
    const fullName = (body.fullName || body.name || "").trim();
    const rawPhone = (body.mobile || body.phoneNumber || body.phone || "").trim();
    const email = (body.email || "").trim();
    const city = (body.city || "").trim();
    const consentGiven = body.consentGiven !== false;

    // Property Attribution
    const propertyId = body.propertyId || null;
    const propertyName = body.propertyName || "General Inquiry";
    const propertyLocation = body.propertyLocation || "Hyderabad";
    const propertyType = body.propertyType || "";
    const propertyPrice = body.propertyPrice || "";
    const propertyArea = body.propertyArea || "";

    // Organic Instagram & Campaign Tracking
    const trafficSource = body.trafficSource || (body.isInstagramLead ? "Instagram Organic" : "Website");
    const isInstagramLead = Boolean(body.isInstagramLead);
    const utmSource = body.utmSource || (isInstagramLead ? "instagram" : "direct");
    const utmMedium = body.utmMedium || "";
    const utmCampaign = body.utmCampaign || "";
    const utmContent = body.utmContent || "";
    const utmTerm = body.utmTerm || "";
    const referrerUrl = body.referrerUrl || req.headers.get("referer") || "";
    const landingPageUrl = body.landingPageUrl || "";
    const timestamp = body.timestamp || new Date().toISOString();

    // Request metadata
    const userAgent = req.headers.get("user-agent") || "";
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown IP";

    // 3. Validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "A valid full name (at least 2 characters) is required" },
        { status: 400 }
      );
    }

    const cleanDigits = rawPhone.replace(/\D/g, "");
    if (!cleanDigits || cleanDigits.length < 10) {
      return NextResponse.json(
        { error: "A valid 10-digit phone number is required" },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhoneNumber(rawPhone);

    // 4. Construct Wylto CRM Webhook Payload
    const wyltoPayload = {
      // Primary Contact
      name: fullName,
      phoneNumber: formattedPhone,
      email: email || undefined,
      city: city || undefined,

      // Property Attribution
      propertyName,
      propertyLocation,
      propertyType: propertyType || undefined,
      propertyPrice: propertyPrice || undefined,
      propertyArea: propertyArea || undefined,
      propertyId: propertyId || undefined,

      // Source & Attribution Tracking
      source: "LandlordShares Website",
      trafficSource,
      isInstagramLead,
      utmSource,
      utmMedium: utmMedium || undefined,
      utmCampaign: utmCampaign || undefined,
      utmContent: utmContent || undefined,
      utmTerm: utmTerm || undefined,
      referrer: referrerUrl || undefined,
      landingPage: landingPageUrl || undefined,

      // Compliance & Metadata
      consentGiven,
      consentTimestamp: timestamp,
      submittedAt: timestamp,
      clientIp,
      userAgent: userAgent.slice(0, 200),
    };

    const tasks: Promise<unknown>[] = [];

    // 5. Securely Dispatch to Wylto CRM Webhook
    if (WYLTO_WEBHOOK_URL) {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (WYLTO_AUTH_TOKEN) {
        headers["Authorization"] = `Bearer ${WYLTO_AUTH_TOKEN}`;
        headers["X-Webhook-Secret"] = WYLTO_AUTH_TOKEN;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const wyltoTask = fetch(WYLTO_WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(wyltoPayload),
        signal: controller.signal,
      })
        .then(async (res) => {
          clearTimeout(timeoutId);
          if (!res.ok) {
            const errText = await res.text().catch(() => "");
            console.error(
              `[Wylto] Webhook responded with status ${res.status}: ${errText.slice(0, 200)}`
            );
          } else {
            console.log(
              `[Wylto] Lead successfully delivered for ${fullName} (${propertyName}) [Source: ${trafficSource}]`
            );
          }
        })
        .catch((err) => {
          clearTimeout(timeoutId);
          console.error("[Wylto] Webhook connection error:", err.message || err);
        });

      tasks.push(wyltoTask);
    }

    // 6. Dual-Redundancy Backup to Google Apps Script / Sheets
    if (GOOGLE_SCRIPT_URL) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const backupTask = fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          mobile: rawPhone,
          phoneNumber: formattedPhone,
          email,
          city,
          propertyName,
          propertyLocation,
          trafficSource,
          isInstagramLead,
          utmSource,
          timestamp,
          source: "LandlordShares Website",
        }),
        signal: controller.signal,
      })
        .then((res) => {
          clearTimeout(timeoutId);
          if (!res.ok) {
            console.warn(`[Backup] Google Script responded with status ${res.status}`);
          }
        })
        .catch((err) => {
          clearTimeout(timeoutId);
          console.warn("[Backup] Google Script error:", err.message || err);
        });

      tasks.push(backupTask);
    }

    // Wait for all dispatches to complete gracefully without throwing
    await Promise.allSettled(tasks);

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      lead: {
        name: fullName,
        property: propertyName,
        attribution: trafficSource,
      },
    });
  } catch (error: unknown) {
    console.error("[Lead API] Uncaught submission error:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again." },
      { status: 500 }
    );
  }
}
