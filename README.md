This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Lead Management & CRM Integration

Leads captured from the Contact Modal are submitted to `/api/lead` and processed as follows:

1. **Google Sheets**:
   - Deployed Google Apps Script URL:
     `https://script.google.com/macros/s/AKfycbwmWDKSqS811fX3Ipdckgtiwv5lxXcd7IJdgyq3Te4seFHU6QCapT_TUNP33aCLBaWg/exec`
   - Source code available in [`google-apps-script.js`](./google-apps-script.js).
   - Automatically appends lead data (IST Timestamp, Name, Phone, Email, City, Property, Location, Source) to the active sheet.

2. **Wylto CRM Webhook**:
   - Webhook URL: `https://server.wylto.com/webhook/DFQUNxMp3IaNlLinPl`
   - Configured in [lib/constants.ts](./lib/constants.ts) and [google-apps-script.js](./google-apps-script.js).
   - Phone numbers are automatically converted to standard international format (`+91...`).

3. **Environment Configuration** (`.env.local`):
   ```env
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbwmWDKSqS811fX3Ipdckgtiwv5lxXcd7IJdgyq3Te4seFHU6QCapT_TUNP33aCLBaWg/exec
   WYLTO_WEBHOOK_URL=https://server.wylto.com/webhook/DFQUNxMp3IaNlLinPl
   ```
