import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/navigation";
import { appRoutes } from "@/i18n/paths";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Navbar } from "./Navbar";

import { SiteContainer } from "./SiteContainer";

type PublicShellProps = {
  children: ReactNode;
};

export async function PublicShell({ children }: PublicShellProps) {
  const t = await getTranslations();
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="ui-public-shell">
      <Navbar isAuthenticated={Boolean(user)} />
      <SiteContainer>
        <div style={{ paddingTop: "80px" }}>{children}</div>
      </SiteContainer>

      <footer className="ui-public-footer">
        <SiteContainer>
          <div className="ui-public-footer-row" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p className="ui-muted">{t("common.brand")}</p>
            <nav
              aria-label="Footer navigation"
              className="ui-public-footer-nav"
              style={{ display: "flex", alignItems: "center", gap: "24px" }}
            >
              <Link href={appRoutes.players}>{t("nav.players")}</Link>
              <Link href={appRoutes.patches}>{t("nav.patches")}</Link>
              <Link href={appRoutes.about}>{t("nav.about")}</Link>
              {user ? <Link href={appRoutes.dashboard}>{t("nav.dashboard")}</Link> : null}
              {user ? <Link href={appRoutes.messages}>{t("footer.messages")}</Link> : null}
              {user ? <Link href={appRoutes.profile}>{t("footer.profile")}</Link> : null}
              {user ? <Link href={appRoutes.settings}>{t("nav.settings")}</Link> : null}
              {user ? <SignOutButton className="ui-public-footer-logout" /> : null}
            </nav>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: 0 }}>
              © 2026 dotadeaf. {t("footer.rights")}
            </p>
          </div>
        </SiteContainer>
      </footer>
    </div>
  );
}
