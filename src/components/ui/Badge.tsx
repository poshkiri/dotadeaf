import type { ReactNode } from "react";

type BadgeTone = "default" | "muted" | "success";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};

function getToneClassName(tone: BadgeTone): string {
  if (tone === "muted") {
    return "ui-badge ui-badge-muted";
  }

  if (tone === "success") {
    return "ui-badge ui-badge-success";
  }

  return "ui-badge";
}

export function Badge({ children, tone = "default" }: BadgeProps) {
  return <span className={getToneClassName(tone)}>{children}</span>;
}
