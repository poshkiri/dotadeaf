import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/ui-foundations.css";
import "@/app/globals.css";
import { InstallBanner } from "@/components/ui/InstallBanner";
import { ServiceWorkerRegister } from "@/components/ui/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "dotadeaf — Dota 2 для глухих игроков",
  description: "Находи тиммейтов в Dota 2. Платформа для глухих и слабослышащих игроков.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "dotadeaf",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/icons/icon-192.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#F5C518",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="dotadeaf" />
        <meta name="theme-color" content="#F5C518" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body className="bg-[#0a0a0a] text-zinc-100 antialiased">
        {children}
        <ServiceWorkerRegister />
        <InstallBanner />
      </body>
    </html>
  );
}
