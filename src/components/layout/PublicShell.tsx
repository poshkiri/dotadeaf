import type { ReactNode } from "react";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { SiteContainer } from "./SiteContainer";

type PublicShellProps = {
  children: ReactNode;
};

export async function PublicShell({ children }: PublicShellProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="ui-public-shell">
      <header className="ui-public-header">
        <SiteContainer>
          <div className="ui-public-header-row">
            <Link href="/" className="ui-public-brand">
              InterestingDeaf
            </Link>
            <nav aria-label="Public navigation" className="ui-public-nav">
              <Link href="/players">Players</Link>
              <Link href="/patches">Patches</Link>
              <Link href="/about">About</Link>
              {user ? <Link href="/messages">Messages</Link> : null}
              {user ? <Link href="/profile">Profile</Link> : null}
            </nav>
            <div className="ui-public-auth-links">
              {user ? (
                <Link href="/dashboard" className="ui-button ui-public-register-link">
                  Open platform
                </Link>
              ) : (
                <>
                  <Link href="/login">Log in</Link>
                  <Link href="/register" className="ui-button ui-public-register-link">
                    Join
                  </Link>
                </>
              )}
            </div>
          </div>
        </SiteContainer>
      </header>

      <SiteContainer>{children}</SiteContainer>

      <footer className="ui-public-footer">
        <SiteContainer>
          <div className="ui-public-footer-row">
            <p className="ui-muted">
              InterestingDeaf helps deaf and hard-of-hearing Dota 2 players find teammates,
              chat, and follow patches in Russian.
            </p>
            <nav aria-label="Footer navigation" className="ui-public-footer-nav">
              <Link href="/players">Players</Link>
              <Link href="/patches">Patches</Link>
              <Link href="/about">About</Link>
              {user ? <Link href="/messages">Messages</Link> : null}
              {user ? <Link href="/profile">Profile</Link> : null}
            </nav>
          </div>
        </SiteContainer>
      </footer>
    </div>
  );
}
