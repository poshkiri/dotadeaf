import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { ProfileEditForm } from "@/components/forms/profile";
import { getProfileForViewByUserId } from "@/services/profile/readProfile";
import { appRoutes, getPathWithLocale } from "@/i18n/paths";
import {
  normalizeMvpProfileFormInput,
  validateMvpProfileForm,
} from "@/services/profile/validation";
import { saveProfileForUser } from "@/services/profile/saveProfile";
import { isProfileSufficientlyCompletedForMvp } from "@/services/auth/profileCompletion";

type EditProfilePageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditProfilePage({
  searchParams,
}: EditProfilePageProps) {
  const t = await getTranslations();
  const locale = await getLocale();
  const sp = await searchParams;
  const { user } = await enforcePlatformRouteAccess({ allowIncompleteProfile: true });
  const profile = await getProfileForViewByUserId(user.id);

  const initialValues = normalizeMvpProfileFormInput({
    display_name: profile?.display_name ?? "",
    dota_nickname: profile?.dota_nickname ?? "",
    rank: profile?.rank ?? "",
    preferred_roles: profile?.preferred_roles ?? [],
    language: profile?.language ?? "",
    region: profile?.region ?? "",
    bio: profile?.bio ?? "",
    looking_for_team: profile?.looking_for_team ?? false,
  });

  async function saveProfileAction(formData: FormData) {
    "use server";

    const { user: currentUser } = await enforcePlatformRouteAccess({
      allowIncompleteProfile: true,
    });

    const preferredRolesRaw = String(formData.get("preferred_roles") ?? "");
    const preferredRoles = preferredRolesRaw
      .split(",")
      .map((role) => role.trim())
      .filter(Boolean);

    const validation = validateMvpProfileForm({
      display_name: String(formData.get("display_name") ?? ""),
      dota_nickname: String(formData.get("dota_nickname") ?? ""),
      rank: String(formData.get("rank") ?? ""),
      preferred_roles: preferredRoles,
      language: String(formData.get("language") ?? ""),
      region: String(formData.get("region") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      looking_for_team: formData.get("looking_for_team") === "on",
    });

    if (!validation.isValid) {
      redirect(`${getPathWithLocale(appRoutes.profileEdit, locale)}?error=validation`);
    }

    try {
      await saveProfileForUser({
        userId: currentUser.id,
        values: validation.values,
      });

      if (isProfileSufficientlyCompletedForMvp(validation.values)) {
        redirect(getPathWithLocale(appRoutes.dashboard, locale));
      }

      redirect(getPathWithLocale(appRoutes.profileEdit, locale));
    } catch {
      redirect(`${getPathWithLocale(appRoutes.profileEdit, locale)}?error=save`);
    }
  }

  const formError =
    sp.error === "validation"
      ? t("platform.edit_validation_error")
      : sp.error === "save"
        ? t("platform.edit_save_error")
        : undefined;

  return (
    <main className="ui-page ui-platform-page">
      <header className="ui-section">
        <h1 className="ui-heading-1">{t("platform.edit_title")}</h1>
        <p className="ui-muted">{t("platform.edit_subtitle")}</p>
      </header>
      <ProfileEditForm
        initialValues={initialValues}
        formError={formError}
        action={saveProfileAction}
      />
    </main>
  );
}
