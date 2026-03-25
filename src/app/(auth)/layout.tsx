import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getProfileByUserId,
  isProfileSufficientlyCompletedForMvp,
} from "@/services/auth/profileBootstrap";
import { resolvePostAuthDestination } from "@/services/auth/redirects";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const profile = await getProfileByUserId(user.id);
    const isProfileComplete = isProfileSufficientlyCompletedForMvp(profile);
    redirect(resolvePostAuthDestination({ isProfileComplete }));
  }

  return <>{children}</>;
}
