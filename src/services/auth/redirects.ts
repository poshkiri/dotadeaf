import "server-only";

const DEFAULT_AUTHENTICATED_PATH = "/dashboard";
const INCOMPLETE_PROFILE_PATH = "/profile/edit";

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
};

export function resolvePostAuthDestination({
  isProfileComplete,
  preferredPath,
}: ResolvePostAuthDestinationParams): string {
  if (!isProfileComplete) {
    return INCOMPLETE_PROFILE_PATH;
  }

  return resolveSafeInternalPath(preferredPath, DEFAULT_AUTHENTICATED_PATH);
}
