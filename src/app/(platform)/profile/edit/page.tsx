import { redirect } from "next/navigation";
import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { ProfileEditForm } from "@/components/forms/profile";
import { getProfileForViewByUserId } from "@/services/profile/readProfile";
import {
  normalizeMvpProfileFormInput,
  validateMvpProfileForm,
} from "@/services/profile/validation";
import { saveProfileForUser } from "@/services/profile/saveProfile";
import { isProfileSufficientlyCompletedForMvp } from "@/services/auth/profileCompletion";

type EditProfilePageProps = {
  searchParams?: {
    error?: string;
  };
};

export default async function EditProfilePage({
  searchParams,
}: EditProfilePageProps) {
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
      redirect("/profile/edit?error=validation");
    }

    try {
      await saveProfileForUser({
        userId: currentUser.id,
        values: validation.values,
      });

      if (isProfileSufficientlyCompletedForMvp(validation.values)) {
        redirect("/dashboard");
      }

      redirect("/profile/edit");
    } catch {
      redirect("/profile/edit?error=save");
    }
  }

  const formError =
    searchParams?.error === "validation"
      ? "Please correct the highlighted profile fields and try again."
      : searchParams?.error === "save"
        ? "Profile could not be saved. Please try again."
        : undefined;

  return (
    <main className="ui-page ui-platform-page">
      <header className="ui-section">
        <h1 className="ui-heading-1">Edit profile</h1>
        <p className="ui-muted">Update your MVP profile information.</p>
      </header>
      <ProfileEditForm
        initialValues={initialValues}
        formError={formError}
        action={saveProfileAction}
      />
    </main>
  );
}
