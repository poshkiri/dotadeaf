import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Navbar } from "./Navbar";

import { SiteContainer } from "./SiteContainer";

type PlatformShellProps = {
  children: ReactNode;
};

export async function PlatformShell({ children }: PlatformShellProps) {
  const t = await getTranslations();

  return (
    <div className="ui-platform-shell">
      <Navbar isAuthenticated />
      <SiteContainer>
        <div className="ui-platform-content" style={{ paddingTop: "80px" }}>
          {children}
        </div>
      </SiteContainer>

      <footer className="ui-platform-footer">
        <SiteContainer>
          <p className="ui-muted">
            {t("platform.footer_hint")}
          </p>
        </SiteContainer>
      </footer>
    </div>
  );
}
