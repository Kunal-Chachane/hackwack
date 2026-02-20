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

export const metadata: Metadata = {
  title: "LINK | AI-Powered URL Security Engine",
  description: "Advanced URL scanner and risk assessment platform. Detect phishing, malware, and malicious intent with LINK's intelligent engine.",
  keywords: ["URL Scanner", "Cybersecurity", "Phishing Detection", "Malware Analysis", "AI Security"],
  manifest: "/manifest.json",
  themeColor: "#2D3E33",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LINK",
  },
  openGraph: {
    title: "LINK | AI-Powered URL Security Engine",
    description: "Advanced URL scanner and risk assessment platform.",
    type: "website",
    locale: "en_US",
    url: "https://hackwack.com",
    siteName: "LINK",
  },
};

import SmoothScroll from "./components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
