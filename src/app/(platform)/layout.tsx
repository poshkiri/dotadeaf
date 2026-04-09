import type { ReactNode } from "react";
import { PlatformShell } from "@/components/layout/PlatformShell";

export const dynamic = "force-dynamic";

export default function PlatformLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <PlatformShell>{children}</PlatformShell>;
}
