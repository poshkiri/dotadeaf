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
          <div className="ui-public-footer-row">
            <p className="ui-muted">{t("common.brand")}</p>
            <nav aria-label="Footer navigation" className="ui-public-footer-nav">
              <Link href="/players">{t("nav.players")}</Link>
              <Link href="/patches">{t("nav.patches")}</Link>
              <Link href="/about">{t("nav.about")}</Link>
              {user ? <Link href="/messages">{t("footer.messages")}</Link> : null}
              {user ? <Link href="/profile">{t("footer.profile")}</Link> : null}
            </nav>
          </div>
        </SiteContainer>
      </footer>
    </div>
  );
}
