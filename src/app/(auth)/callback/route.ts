import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { appRoutes, getLocaleFromPath, getPathWithLocale } from "@/i18n/paths";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import {
  getProfileByUserId,
  isProfileSufficientlyCompletedForMvp,
} from "@/services/auth/profileBootstrap";
import {
  resolvePostAuthDestination,
  resolveSafeInternalPath,
} from "@/services/auth/redirects";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const preferredPath = resolveSafeInternalPath(requestUrl.searchParams.get("next"));
  const locale = getLocaleFromPath(preferredPath);
  const loginUrl = new URL(getPathWithLocale(appRoutes.login, locale), requestUrl.origin);

  if (!code) {
    loginUrl.searchParams.set("error", "oauth_callback_missing_code");
    return NextResponse.redirect(loginUrl);
  }

  let response = NextResponse.redirect(new URL(preferredPath, requestUrl.origin));
  const { url, anonKey } = getSupabasePublicEnv();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    loginUrl.searchParams.set("error", "oauth_callback_exchange_failed");
    return NextResponse.redirect(loginUrl);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    loginUrl.searchParams.set("error", "oauth_callback_user_not_found");
    return NextResponse.redirect(loginUrl);
  }

  const profile = await getProfileByUserId(user.id);
  const isProfileComplete = isProfileSufficientlyCompletedForMvp(profile);
  const destination = resolvePostAuthDestination({
    isProfileComplete,
    preferredPath,
    locale,
  });

  response = NextResponse.redirect(new URL(destination, requestUrl.origin));
  return response;
}
