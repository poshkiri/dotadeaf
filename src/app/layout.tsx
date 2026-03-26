import type { ReactNode } from "react";
import "@/styles/ui-foundations.css";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";

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
