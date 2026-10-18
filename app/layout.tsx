import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kalsekarcampusnav.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CampusNav | Indoor Campus Navigation for AIKTC, Panvel",
    template: "%s | CampusNav",
  },
  description:
    "Find classrooms, labs, offices, and facilities with indoor navigation across AIKTC's Kalsekar Technical Campus.",
  keywords: [
    "CampusNav",
    "Indoor Navigation",
    "AIKTC Campus Map",
    "Kalsekar Technical Campus",
    "AIKTC Navigation",
    "indoor campus navigation system",
    "classroom finder AIKTC",
    "engineering building floor map",
    "indoor routing",
    "Dijkstra algorithm navigation",
    "smart campus navigation",
    "New Panvel college map",
  ],
  authors: [
    { name: "Faraz Sualeh", url: `${baseUrl}/about` },
    { name: "Burhan Parkar", url: `${baseUrl}/about` },
  ],
  creator: "Faraz Sualeh & Burhan Parkar",
  publisher: "CampusNav",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CampusNav",
    title: "CampusNav | Indoor Campus Navigation for AIKTC, Panvel",
    description:
      "Find classrooms, labs, offices, and facilities with indoor navigation across AIKTC's Kalsekar Technical Campus.",
    images: [
      {
        url: "/cnlogo.png",
        width: 1200,
        height: 630,
        alt: "CampusNav - Indoor Campus Navigation System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusNav | Indoor Campus Navigation for AIKTC, Panvel",
    description:
      "Indoor routing and room search for Kalsekar Technical Campus.",
    images: ["/cnlogo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/favicon.ico", sizes: "180x180", type: "image/x-icon" },
    ],
  },
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
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${baseUrl}/#webapp`,
      "name": "CampusNav",
      "url": baseUrl,
      "applicationCategory": "TravelApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "description":
        "Indoor campus navigation system for Anjuman-i-Islam's Kalsekar Technical Campus (AIKTC).",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
      },
      "author": [
        {
          "@type": "Person",
          "name": "Faraz Sualeh",
        },
        {
          "@type": "Person",
          "name": "Burhan Parkar",
        },
      ],
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://www.aiktc.ac.in/#organization",
      "name": "Anjuman-i-Islam's Kalsekar Technical Campus (AIKTC)",
      "url": "https://www.aiktc.ac.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot No. 2 & 3, Sector 16, Near Thana Naka, Khandagaon",
        "addressLocality": "New Panvel",
        "addressRegion": "Maharashtra",
        "postalCode": "410206",
        "addressCountry": "IN",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="rkbZQ9-KqE6d1Xj_ArTzniSpRkd3O8u_JlvrAi-5dCw"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
