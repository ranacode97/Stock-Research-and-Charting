import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Libre_Baskerville, IBM_Plex_Mono, Inter } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import InstallPrompt from "@/components/InstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const baskerville = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-mono-data",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-sans-label",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zero-sum-times.com"),
  title: {
    default: "Zero Sum Times — Stock Analytics & Market Data",
    template: "%s | Zero Sum Times",
  },
  description:
    "Free stock analytics for 3,500+ NASDAQ-listed companies. Real-time market heatmaps, financial statements, DCF valuation, insider trading, congress trades, earnings calendar, and portfolio tools.",
  keywords: [
    "stock analytics", "stock screener", "market heatmap", "financial statements",
    "DCF calculator", "insider trading", "congress trading", "earnings calendar",
    "portfolio simulator", "stock comparison", "dividend screener", "correlation matrix",
    "technical analysis", "free stock data", "NASDAQ stocks",
  ],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "The Zero Sum Times",
    locale: "en_US",
    url: "https://zero-sum-times.com",
    title: "Zero Sum Times — Stock Analytics & Market Data",
    description:
      "Free stock analytics for 3,500+ stocks. Market heatmaps, financial statements, insider & congress trading, earnings, DCF valuation, and more.",
    images: [
      {
        url: "https://zero-sum-times.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Zero Sum Times — Free Stock Analytics & Market Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero Sum Times — Stock Analytics & Market Data",
    description: "Free stock analytics, heatmaps, financials, and trading tools for 3,500+ stocks.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://zero-sum-times.com",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Zero Sum Times",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zero-sum-times.com/#organization",
        name: "The Zero Sum Times",
        url: "https://zero-sum-times.com",
        logo: {
          "@type": "ImageObject",
          url: "https://zero-sum-times.com/icons/icon-512x512.png",
          width: 512,
          height: 512,
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://zero-sum-times.com/#website",
        url: "https://zero-sum-times.com",
        name: "Zero Sum Times",
        description:
          "Free stock analytics for 3,500+ NASDAQ-listed companies. Market heatmaps, financial statements, DCF valuation, insider trading, congress trades, and portfolio tools.",
        publisher: { "@id": "https://zero-sum-times.com/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://zero-sum-times.com/stocks/{search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://zero-sum-times.com/#webpage",
        url: "https://zero-sum-times.com",
        name: "Zero Sum Times — Stock Analytics & Market Data",
        isPartOf: { "@id": "https://zero-sum-times.com/#website" },
        about: { "@id": "https://zero-sum-times.com/#organization" },
        description:
          "Free stock analytics for 3,500+ stocks. Real-time market heatmaps, financial statements, insider & congress trading, earnings calendar, DCF valuation, and portfolio tools.",
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='dark')d.classList.add('dark');else if(t==='light')d.classList.remove('dark');else if(window.matchMedia('(prefers-color-scheme:dark)').matches)d.classList.add('dark');}catch(e){}})()`}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${baskerville.variable} ${ibmMono.variable} ${inter.variable} antialiased`}
      >
        <InstallPrompt />
        {children}
      </body>
    </html>
  );
}
