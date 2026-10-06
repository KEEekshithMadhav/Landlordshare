import { NextRequest, NextResponse } from "next/server";
import { WYLTO_WEBHOOK_URL, GOOGLE_SCRIPT_URL as DEFAULT_GOOGLE_SCRIPT_URL } from "@/lib/constants";

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL;
// Wylto CRM Webhook URL
const WEBHOOK_URL = process.env.WYLTO_WEBHOOK_URL || WYLTO_WEBHOOK_URL;
// Set to "true" if you want Next.js to also call Wylto directly even when Google Apps Script is configured
const DIRECT_WYLTO_ENABLED = process.env.DIRECT_WYLTO_ENABLED === "true";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = (body.fullName || body.name || "").trim();
    const rawPhone = (body.mobile || body.phoneNumber || body.phone || "").trim();
    const email = (body.email || "").trim();
    const city = (body.city || "").trim();
    const propertyName = body.propertyName || "General Inquiry";
    const propertyLocation = body.propertyLocation || "";
    const timestamp = body.timestamp || new Date().toISOString();

    // Server-side validation: name and phone are essential
    if (!fullName || !rawPhone) {
      return NextResponse.json(
        { error: "Name and phone number are required" },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhoneNumber(rawPhone);

    const wyltoPayload: Record<string, unknown> = {
      name: fullName,
      phoneNumber: formattedPhone,
    };

    if (email) wyltoPayload.email = email;
    if (city) wyltoPayload.city = city;
    if (propertyName) wyltoPayload.propertyName = propertyName;
    if (propertyLocation) wyltoPayload.propertyLocation = propertyLocation;
    wyltoPayload.source = "LandlordShares Website";
    wyltoPayload.timestamp = timestamp;

    const tasks: Promise<unknown>[] = [];

    // 1. Send data to Wylto CRM Webhook directly (if enabled or if Google Script is not handling it)
    const shouldDispatchDirectWylto = WEBHOOK_URL && (!GOOGLE_SCRIPT_URL || DIRECT_WYLTO_ENABLED);
    if (shouldDispatchDirectWylto) {
      tasks.push(
        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(wyltoPayload),
        })
          .then(async (res) => {
            if (!res.ok) {
              const errText = await res.text().catch(() => "");
              console.error(`Wylto webhook responded with status ${res.status}: ${errText}`);
            } else {
              console.log("Lead successfully submitted directly to Wylto webhook");
            }
          })
          .catch((err) => {
            console.error("Error submitting lead to Wylto webhook:", err);
          })
      );
    }

    // 2. Send data to Google Apps Script Web App (if configured)
    if (GOOGLE_SCRIPT_URL) {
      tasks.push(
        fetch(GOOGLE_SCRIPT_URL, {
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
            timestamp,
            source: "LandlordShares Website",
          }),
        })
          .then(async (res) => {
            if (!res.ok) {
              console.error(`Google Script responded with status ${res.status}`);
            }
          })
          .catch((err) => {
            console.error("Error submitting lead to Google Script:", err);
          })
      );
    } else {
      console.log("Lead received (Google Sheet not connected):", {
        fullName,
        mobile: rawPhone,
        phoneNumber: formattedPhone,
        email,
        city,
        propertyName,
        propertyLocation,
        timestamp,
      });
    }

    // Await all dispatch requests without letting one failure break the other
    await Promise.allSettled(tasks);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}

