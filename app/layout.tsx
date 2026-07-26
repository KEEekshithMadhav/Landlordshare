import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingContact from "@/components/ui/FloatingContact";
import CookieBanner from "@/components/ui/CookieBanner";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landlordshares.com"),
  title: {
    default: "LandlordShares | Verified Landlord Share Flats in Hyderabad",
    template: "%s | LandlordShares",
  },
  description:
    "Buy verified landlord share flats in Hyderabad's prime locations — Kokapet, Tellapur, Neopolis & more. RERA approved projects, transparent pricing, expert guidance. Book a free consultation today.",
  keywords: [
    "landlord share flats",
    "landlord share flats hyderabad",
    "buy flats kokapet",
    "buy flats tellapur",
    "buy flats neopolis",
    "real estate hyderabad",
    "joint development agreement flats",
    "JDA flats hyderabad",
    "3 BHK kokapet",
    "investment property hyderabad",
  ],
  authors: [{ name: "LandlordShares", url: "https://landlordshares.com" }],
  creator: "LandlordShares",
  publisher: "LandlordShares",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://landlordshares.com",
    siteName: "LandlordShares",
    title: "LandlordShares | Verified Landlord Share Flats in Hyderabad",
    description:
      "Buy verified landlord share flats in Hyderabad's prime locations. RERA approved, transparent pricing, expert guidance.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LandlordShares – Premium Real Estate in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LandlordShares | Verified Landlord Share Flats in Hyderabad",
    description: "Buy verified landlord share flats in Hyderabad's prime locations.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-site-verification",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "LandlordShares",
  description:
    "Verified landlord share flats in Hyderabad — Kokapet, Tellapur, Neopolis and more.",
  url: "https://landlordshares.com",
  telephone: "+918585854853",
  areaServed: "Hyderabad, Telangana, India",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  priceRange: "₹₹₹",
  openingHours: "Mo-Sa 09:00-19:00",
  sameAs: [
    "https://wa.me/918585854853",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0A1628" />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} font-inter antialiased bg-[#0A1628] text-white`}
      >
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
        <CookieBanner />
      </body>
    </html>
  );
}
