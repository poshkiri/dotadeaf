import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import {
  getProfileByUserId,
  isProfileSufficientlyCompletedForMvp,
} from "@/services/auth/profileBootstrap";
import { resolvePostAuthDestination } from "@/services/auth/redirects";

export const dynamic = "force-dynamic";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const locale = await getLocale();

  if (user) {
    const profile = await getProfileByUserId(user.id);
    const isProfileComplete = isProfileSufficientlyCompletedForMvp(profile);
    redirect(resolvePostAuthDestination({ isProfileComplete, locale }));
  }

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0a0a0a", paddingTop: "80px" }}>{children}</main>
    </>
  );
}
