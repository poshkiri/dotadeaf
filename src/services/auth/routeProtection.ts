import "server-only";

import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { appRoutes, getPathWithLocale } from "@/i18n/paths";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getProfileByUserId,
  isProfileSufficientlyCompletedForMvp,
} from "./profileBootstrap";

type EnforcePlatformRouteAccessOptions = {
  allowIncompleteProfile?: boolean;
};

export async function enforcePlatformRouteAccess({
  allowIncompleteProfile = false,
}: EnforcePlatformRouteAccessOptions = {}) {
  const locale = await getLocale();
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(getPathWithLocale(appRoutes.login, locale));
  }

  const profile = await getProfileByUserId(user.id);
  const isProfileComplete = isProfileSufficientlyCompletedForMvp(profile);

  if (!allowIncompleteProfile && !isProfileComplete) {
    redirect(getPathWithLocale(appRoutes.profileEdit, locale));
  }

  return { user, profile, isProfileComplete };
}
