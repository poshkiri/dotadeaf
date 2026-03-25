"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isProfileSufficientlyCompletedForMvp } from "@/services/auth/profileCompletion";

type AuthPageRedirectGuardProps = {
  completedProfileDestination?: string;
  incompleteProfileDestination?: string;
};

export function AuthPageRedirectGuard({
  completedProfileDestination = "/dashboard",
  incompleteProfileDestination = "/profile/edit",
}: AuthPageRedirectGuardProps) {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function redirectIfAuthenticated() {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted || !user) {
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select(
          "display_name, dota_nickname, preferred_roles, skill_bracket, language, region",
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (isProfileSufficientlyCompletedForMvp(profile)) {
        router.replace(completedProfileDestination);
      } else {
        router.replace(incompleteProfileDestination);
      }
      router.refresh();
    }

    redirectIfAuthenticated();

    return () => {
      isMounted = false;
    };
  }, [completedProfileDestination, incompleteProfileDestination, router]);

  return null;
}
