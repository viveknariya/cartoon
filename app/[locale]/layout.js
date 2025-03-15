import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Photo Cartoon AI Converter | Turn Images to Cartoons Free 🖼️➡️🎨",
  description:
    "Convert any photo to cartoon online instantly! AI-powered photo cartoonizer with 20+ art styles. Perfect for profile pictures, gifts, and social media. No skills required - transform photos to cartoons in 1 click!",
  keywords: [
    "photo to cartoon", // Primary keyword first
    "photo cartoon", // Exact match
    "cartoon from photo",
    "convert photo to cartoon",
    "photo cartoon converter",
    "photo cartoon maker",
    "turn photo into cartoon",
    "cartoonize photo",
    "AI photo cartoon",
    "free photo cartoonizer",
    "online photo to cartoon",
    "cartoon selfie from photo",
    "cartoon profile picture",
    "photo to anime cartoon",
    "digital art from photo",
  ],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
};

// Providing all messages to the client
// side is the easiest way to get started

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FGBG1FN3WP"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [] function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-FGBG1FN3WP');
        `,
          }}
        />
      </body>
    </html>
  );
}
