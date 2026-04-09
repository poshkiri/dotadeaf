"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type SignOutButtonProps = {
  className?: string;
  variant?: "inline" | "pill";
};

export function SignOutButton({
  className,
  variant = "inline",
}: SignOutButtonProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      router.replace("/", { locale });
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isLoading}
      className={className}
      data-variant={variant}
      aria-busy={isLoading}
    >
      {isLoading ? t("nav.logging_out") : t("nav.logout")}
    </button>
  );
}
