"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type GoogleSignInButtonProps = {
  label?: string;
  nextPath?: string;
};

function resolveSafeNextPath(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export function GoogleSignInButton({
  label = "Sign in with Google",
  nextPath = "/dashboard",
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  async function handleGoogleSignIn() {
    try {
      setIsLoading(true);
      setErrorMessage(undefined);

      const safeNextPath = resolveSafeNextPath(nextPath);
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        safeNextPath,
      )}`;
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) {
        setErrorMessage("Google sign-in failed. Please try again.");
      }
    } catch {
      setErrorMessage("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="ui-form">
      <button type="button" onClick={handleGoogleSignIn} disabled={isLoading}>
        {isLoading ? "Redirecting..." : label}
      </button>
      <p role="alert" aria-live="polite" className="ui-field-error">
        {errorMessage ?? ""}
      </p>
    </div>
  );
}
