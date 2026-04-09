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

      <section className="ui-platform-grid" aria-label="Available settings">
        <article className="ui-card ui-section">
          <h2 className="ui-heading-2">{t("platform.available_now")}</h2>
          <p className="ui-muted">{t("platform.available_desc")}</p>
          <p>
            <Link href="/profile/edit">{t("platform.go_profile_edit")}</Link>
          </p>
        </article>

        <article className="ui-card ui-section">
          <h2 className="ui-heading-2">{t("platform.language_settings_title")}</h2>
          <p className="ui-muted">{t("platform.language_settings_desc")}</p>
          <p>
            <Link href="/dashboard">{t("platform.back_to_dashboard")}</Link>
          </p>
        </article>

        <article className="ui-card ui-section">
          <h2 className="ui-heading-2">{t("platform.messaging_settings_title")}</h2>
          <p className="ui-muted">{t("platform.messaging_settings_desc")}</p>
          <p>
            <Link href="/messages">{t("platform.open_messages")}</Link>
          </p>
        </article>
      </section>
    </main>
  );
}
