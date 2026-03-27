import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/navigation";

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
      <SiteContainer>
        <div>{children}</div>
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
              <Link href="/players">{t("nav.players")}</Link>
              <Link href="/patches">{t("nav.patches")}</Link>
              <Link href="/about">{t("nav.about")}</Link>
              {user ? <Link href="/messages">{t("footer.messages")}</Link> : null}
              {user ? <Link href="/profile">{t("footer.profile")}</Link> : null}
            </nav>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: 0 }}>
              © 2026 dotadeaf. Все права защищены.
            </p>
          </div>
        </SiteContainer>
      </footer>
    </div>
  );
}
