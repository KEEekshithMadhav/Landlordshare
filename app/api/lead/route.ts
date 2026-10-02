import { NextRequest, NextResponse } from "next/server";

// Replace with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, mobile, email, city, propertyName, propertyLocation, timestamp } = body;

    // Basic server-side validation
    if (!fullName || !mobile || !email || !city) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SCRIPT_URL is not configured in environment variables.");
      // Still return success to user so the UX isn't broken while setting up
      // Remove this fallback once Google Script URL is configured
      console.log("Lead received (Google Sheet not connected):", {
        fullName,
        mobile,
        email,
        city,
        propertyName,
        propertyLocation,
        timestamp,
      });
      return NextResponse.json({ success: true });
    }

    // Send data to Google Apps Script Web App
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        mobile,
        email,
        city,
        propertyName: propertyName || "General Inquiry",
        propertyLocation: propertyLocation || "",
        timestamp: timestamp || new Date().toISOString(),
        source: "LandlordShares Website",
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Script responded with ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
