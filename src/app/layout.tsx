import type { ReactNode } from "react";
import "@/app/globals.css";
import "@/styles/ui-foundations.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
