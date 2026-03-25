import type { ReactNode } from "react";

type SiteContainerProps = {
  children: ReactNode;
};

export function SiteContainer({ children }: SiteContainerProps) {
  return <div className="ui-shell">{children}</div>;
}
