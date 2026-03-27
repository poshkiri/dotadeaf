import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/ui-foundations.css";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "dotadeaf",
  description: "dotadeaf",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-[#0a0a0a] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
