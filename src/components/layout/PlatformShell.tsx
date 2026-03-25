import type { ReactNode } from "react";
import Link from "next/link";

import { SiteContainer } from "./SiteContainer";

type PlatformShellProps = {
  children: ReactNode;
};

export function PlatformShell({ children }: PlatformShellProps) {
  return (
    <div className="ui-platform-shell">
      <header className="ui-platform-header">
        <SiteContainer>
          <div className="ui-platform-header-row">
            <Link href="/dashboard" className="ui-platform-brand">
              InterestingDeaf
            </Link>
            <nav aria-label="Platform navigation" className="ui-platform-nav">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/profile">Profile</Link>
              <Link href="/messages">Messages</Link>
              <Link href="/settings">Settings</Link>
              <Link href="/players">Players</Link>
              <Link href="/patches">Patches</Link>
            </nav>
          </div>
        </SiteContainer>
      </header>

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
