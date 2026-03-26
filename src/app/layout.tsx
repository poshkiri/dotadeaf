import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/ui-foundations.css";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "dotadeaf — Dota 2 for deaf players",
  description: "Find Dota 2 teammates. Built for deaf and hard-of-hearing players.",
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
    <html lang="en">
      <body className="bg-[#09090b] text-zinc-100 antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
