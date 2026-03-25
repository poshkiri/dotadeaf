import "server-only";

import { redirect } from "next/navigation";
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
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfileByUserId(user.id);
  const isProfileComplete = isProfileSufficientlyCompletedForMvp(profile);

  if (!allowIncompleteProfile && !isProfileComplete) {
    redirect("/profile/edit");
  }

  return { user, profile, isProfileComplete };
}
