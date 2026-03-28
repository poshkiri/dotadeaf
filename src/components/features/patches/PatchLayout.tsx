"use client";

import type { ReactNode } from "react";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import type { PatchTocItem } from "./PatchContent";
import { PatchTocSidebar } from "./PatchTocSidebar";

export type { PatchTocItem };

type PatchLayoutProps = {
  children: ReactNode;
  tocItems: PatchTocItem[];
};

export function PatchLayout({ children, tocItems }: PatchLayoutProps) {
  return (
    <div className="patch-layout-root">
      <ReadingProgress />

      <div className="patch-layout-main">{children}</div>

      <PatchTocSidebar items={tocItems} />
    </div>
  );
}
