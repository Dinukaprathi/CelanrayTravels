import type { Metadata } from "next";
import {  Inter_Tight, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from '../components/Header/Header'
import "../styles/theme.css";
import { Footer } from "@/components/common/Footer";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter-tight',
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-instrument-sans',
});

export const metadata: Metadata = {
  title: {
    default: "Ceylanray - Your Sri Lankan Travel Experience",
    template: "%s | Ceylanray"
  },
  description: "Discover Sri Lanka with Ceylanray - Your complete travel companion for flights, hotels, and curated holiday packages. Experience authentic Sri Lankan adventures.",
  keywords: ["Sri Lanka travel", "holiday packages", "Sri Lankan tours", "hotels in Sri Lanka", "travel experiences", "Ceylanray"],
  authors: [{ name: "Ceylanray" }],
  creator: "Ceylanray",
  publisher: "Ceylanray",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ceylanray.com'), // Replace with your actual domain
  openGraph: {
    title: "Ceylanray - Your Sri Lankan Travel Experience",
    description: "Discover Sri Lanka with Ceylanray - Your complete travel companion for flights, hotels, and curated holiday packages.",
    url: 'https://ceylanray.com',
    siteName: 'Ceylanray',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'Ceylanray Sri Lankan Travel Experiences',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ceylanray - Your Sri Lankan Travel Experience",
    description: "Discover Sri Lanka with Ceylanray - Your complete travel companion for flights, hotels, and curated holiday packages.",
    images: ['/twitter-image.jpg'], // Add your Twitter card image
    creator: '@ceylanray',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // Add your Google verification code
    // yandex: 'your-yandex-verification',
    // bing: 'your-bing-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Determine if the current page has a CTA
  const hasCta = true; // You might want to make this dynamic based on the route

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://ceylanray.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${interTight.variable} ${instrumentSans.variable} p antialiased`}
      >
        <Header />
        {children}
        <Footer hasCta={hasCta} />
      </body>
    </html>
  );
}
