import type { ReactNode } from "react";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PublicNavbar } from "./PublicNavbar";

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
      <PublicNavbar />

      <SiteContainer>
        <div className="pt-20 md:pt-24">{children}</div>
      </SiteContainer>

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
