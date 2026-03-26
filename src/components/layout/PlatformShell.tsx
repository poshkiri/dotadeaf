import type { ReactNode } from "react";

import { SiteContainer } from "./SiteContainer";

type PlatformShellProps = {
  children: ReactNode;
};

export function PlatformShell({ children }: PlatformShellProps) {
  return (
    <div className="ui-platform-shell">
      <SiteContainer>
        <div className="ui-platform-content">{children}</div>
      </SiteContainer>

      <footer className="ui-platform-footer">
        <SiteContainer>
          <p className="ui-muted">
            Keep your profile up to date to improve player discovery and messaging.
          </p>
        </SiteContainer>
      </footer>
    </div>
  );
}
