"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { appRoutes, getLocaleFromPath, getPathWithLocale } from "@/i18n/paths";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { AuthFormMessage } from "./AuthFormMessage";

type GoogleSignInButtonProps = {
  label?: string;
  nextPath?: string;
};

function resolveSafeNextPath(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return appRoutes.dashboard;
  }

  return value;
}

export function GoogleSignInButton({
  label,
  nextPath = appRoutes.dashboard,
}: GoogleSignInButtonProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  async function handleGoogleSignIn() {
    try {
      setIsLoading(true);
      setErrorMessage(undefined);

      const safeNextPath = resolveSafeNextPath(nextPath);
      const localizedNextPath = getLocaleFromPath(safeNextPath)
        ? safeNextPath
        : getPathWithLocale(safeNextPath, locale);
      const redirectTo = `${window.location.origin}${appRoutes.callback}?next=${encodeURIComponent(
        localizedNextPath,
      )}`;
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) {
        setErrorMessage(t("auth_form.google_failed"));
      }
    } catch {
      setErrorMessage(t("auth_form.google_failed"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="ui-form ui-auth-google-stack">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="ui-auth-google-button"
      >
        {isLoading ? t("auth_form.redirecting") : (label ?? t("auth_page.login_google"))}
      </button>
      <AuthFormMessage message={errorMessage} />
    </div>
  );
}
