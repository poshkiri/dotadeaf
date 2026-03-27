import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function DashboardPage() {
  const t = await getTranslations();
  const { profile, isProfileComplete } = await enforcePlatformRouteAccess();

  return (
    <main className="ui-page ui-platform-page">
      <header className="ui-section">
        <h1 className="ui-heading-1">{t("platform.dashboard_title")}</h1>
        <p className="ui-muted">
          {t("platform.dashboard_subtitle")}
        </p>
      </header>

      <section className="ui-card ui-section" aria-label="Profile status">
        <h2 className="ui-heading-2">{t("platform.profile_status")}</h2>
        <p className="ui-muted">
          {isProfileComplete
            ? t("platform.profile_complete")
            : t("platform.profile_incomplete")}
        </p>
        <p>
          <Link href="/profile/edit">{t("platform.open_profile_editor")}</Link>
        </p>
        {profile ? null : (
          <p className="ui-muted">{t("platform.profile_missing")}</p>
        )}
      </section>

      <section className="ui-platform-grid" aria-label={t("platform.quick_nav")}>
        <article className="ui-card ui-section">
          <h2 className="ui-heading-2">{t("platform.find_teammates")}</h2>
          <p className="ui-muted">{t("platform.find_teammates_desc")}</p>
          <p>
            <Link href="/players">{t("platform.open_players")}</Link>
          </p>
        </article>

        <article className="ui-card ui-section">
          <h2 className="ui-heading-2">{t("platform.messages")}</h2>
          <p className="ui-muted">{t("platform.messages_desc")}</p>
          <p>
            <Link href="/messages">{t("platform.open_messages")}</Link>
          </p>
        </article>

        <article className="ui-card ui-section">
          <h2 className="ui-heading-2">{t("platform.patch_updates")}</h2>
          <p className="ui-muted">{t("platform.patch_updates_desc")}</p>
          <p>
            <Link href="/patches">{t("platform.open_patches")}</Link>
          </p>
        </article>
      </section>
    </main>
  );
}
