import "server-only";

import { appRoutes, getPathWithLocale } from "@/i18n/paths";

const DEFAULT_AUTHENTICATED_PATH = appRoutes.dashboard;
const INCOMPLETE_PROFILE_PATH = appRoutes.profileEdit;

export function resolveSafeInternalPath(
  value: string | null | undefined,
  fallback: string = DEFAULT_AUTHENTICATED_PATH,
): string {
  if (!value) {
    return fallback;
  }

  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return fallback;
  }

  return trimmed;
}

type ResolvePostAuthDestinationParams = {
  isProfileComplete: boolean;
  preferredPath?: string | null;
  locale?: string | null;
};

export function resolvePostAuthDestination({
  isProfileComplete,
  preferredPath,
  locale,
}: ResolvePostAuthDestinationParams): string {
  if (!isProfileComplete) {
    return getPathWithLocale(INCOMPLETE_PROFILE_PATH, locale);
  }

  return resolveSafeInternalPath(
    preferredPath,
    getPathWithLocale(DEFAULT_AUTHENTICATED_PATH, locale),
  );
}
