/**
 * LandlordShares — Google Apps Script Web App
 * Handles:
 * 1. Appends lead row to active Google Sheet with IST timestamp
 * 2. Automatically forwards lead to Wylto CRM Webhook (Server-to-Server)
 *
 * Webhook URL: https://server.wylto.com/webhook/DFQUNxMp3IaNlLinPl
 */

const WYLTO_WEBHOOK_URL = "https://server.wylto.com/webhook/DFQUNxMp3IaNlLinPl";

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    // 1. Parse incoming payload safely
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 2. Format timestamp for IST
    var timestamp = data.timestamp
      ? new Date(data.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    var fullName = (data.fullName || data.name || "").toString().trim();
    var mobile = (data.mobile || data.phoneNumber || data.phone || "").toString().trim();
    var email = (data.email || "").toString().trim();
    var city = (data.city || "").toString().trim();
    var propertyName = (data.propertyName || "General Inquiry").toString().trim();
    var propertyLocation = (data.propertyLocation || "").toString().trim();
    var source = (data.source || "LandlordShares Website").toString().trim();

    // 3. Append row to Google Sheet
    sheet.appendRow([
      timestamp,
      fullName,
      mobile,
      email,
      city,
      propertyName,
      propertyLocation,
      source,
    ]);

    // 4. Forward to Wylto CRM Webhook (Server-to-Server)
    try {
      var rawDigits = mobile.replace(/\D/g, "");
      var formattedPhone = "";
      if (rawDigits.length === 10) {
        formattedPhone = "+91" + rawDigits;
      } else if (rawDigits.length === 12 && rawDigits.indexOf("91") === 0) {
        formattedPhone = "+" + rawDigits;
      } else if (mobile.indexOf("+") === 0) {
        formattedPhone = mobile;
      } else {
        formattedPhone = rawDigits ? "+" + rawDigits : "";
      }

      var wyltoPayload = {
        name: fullName,
        phoneNumber: formattedPhone,
        email: email,
        city: city,
        propertyName: propertyName,
        propertyLocation: propertyLocation,
        source: source,
        timestamp: timestamp,
      };

      UrlFetchApp.fetch(WYLTO_WEBHOOK_URL, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(wyltoPayload),
        muteHttpExceptions: true,
      });
    } catch (webhookError) {
      Logger.log("Wylto Webhook Error: " + webhookError.toString());
    }

    // Return success
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Lead saved to sheet and forwarded to Wylto" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check endpoint
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "LandlordShares Lead API is running" })
  ).setMimeType(ContentService.MimeType.JSON);
}
