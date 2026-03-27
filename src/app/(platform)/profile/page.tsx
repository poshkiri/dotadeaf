import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { getProfileForViewByUserId } from "@/services/profile/readProfile";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";

export default async function ProfilePage() {
  const t = await getTranslations();
  const { user } = await enforcePlatformRouteAccess();
  const profile = await getProfileForViewByUserId(user.id);

  if (!profile) {
    return (
      <main className="ui-page ui-platform-page">
        <h1 className="ui-heading-1">{t("platform.profile_title")}</h1>
        <p className="ui-muted">{t("platform.profile_unavailable")}</p>
        <section className="ui-card ui-section" aria-label="Profile setup guidance">
          <p className="ui-muted">{t("platform.profile_setup")}</p>
          <p>
            <Link href="/profile/edit">{t("platform.edit_profile")}</Link>
          </p>
        </section>
      </main>
    );
  }

  const preferredRoles =
    profile.preferred_roles.length > 0
      ? profile.preferred_roles.join(", ")
      : t("common.not_specified");

  return (
    <main className="ui-page ui-platform-page">
      <h1 className="ui-heading-1">{t("platform.profile_title")}</h1>
      <p className="ui-muted">{t("platform.profile_review")}</p>

      <dl className="ui-card ui-profile-summary">
        <div>
          <dt>{t("platform.display_name")}</dt>
          <dd>{profile.display_name ?? t("common.not_specified")}</dd>
        </div>

        <div>
          <dt>{t("platform.dota_nickname")}</dt>
          <dd>{profile.dota_nickname ?? t("common.not_specified")}</dd>
        </div>

        <div>
          <dt>{t("platform.preferred_roles")}</dt>
          <dd>{preferredRoles}</dd>
        </div>

        <div>
          <dt>{t("platform.rank")}</dt>
          <dd>{profile.rank ?? t("common.not_specified")}</dd>
        </div>

        <div>
          <dt>{t("platform.language")}</dt>
          <dd>{profile.language ?? t("common.not_specified")}</dd>
        </div>

        <div>
          <dt>{t("platform.region")}</dt>
          <dd>{profile.region ?? t("common.not_specified")}</dd>
        </div>

        <div>
          <dt>{t("platform.bio")}</dt>
          <dd>{profile.bio ?? t("common.not_specified")}</dd>
        </div>

        <div>
          <dt>{t("platform.availability")}</dt>
          <dd>
            <Badge tone={profile.looking_for_team ? "success" : "muted"}>
              {profile.looking_for_team
                ? t("platform.looking_yes")
                : t("platform.looking_no")}
            </Badge>
          </dd>
        </div>

        <div>
          <dt>{t("platform.last_active")}</dt>
          <dd>{profile.last_active_at ?? t("common.not_available")}</dd>
        </div>
      </dl>

      <section className="ui-card ui-section" aria-label="Profile actions">
        <h2 className="ui-heading-2">{t("platform.profile_actions")}</h2>
        <p className="ui-muted">{t("platform.profile_actions_desc")}</p>
        <p>
          <Link href="/profile/edit">{t("platform.edit_profile")}</Link>
        </p>
      </section>
    </main>
  );
}
