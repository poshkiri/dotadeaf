import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function SettingsPage() {
  const t = await getTranslations();
  await enforcePlatformRouteAccess();

  return (
    <main className="ui-page ui-platform-page">
      <header className="ui-section">
        <h1 className="ui-heading-1">{t("platform.settings_title")}</h1>
        <p className="ui-muted">{t("platform.settings_subtitle")}</p>
      </header>

      <section className="ui-card ui-section" aria-label="Available settings">
        <h2 className="ui-heading-2">{t("platform.available_now")}</h2>
        <p className="ui-muted">{t("platform.available_desc")}</p>
        <p>
          <Link href="/profile/edit">{t("platform.go_profile_edit")}</Link>
        </p>
      </section>
    </main>
  );
}
