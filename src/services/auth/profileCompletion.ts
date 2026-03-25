export const MVP_REQUIRED_PROFILE_FIELDS = [
  "display_name",
  "dota_nickname",
  "rank",
  "language",
  "region",
  "preferred_roles",
] as const;

export type MvpProfileCompletionInput = {
  display_name?: string | null;
  dota_nickname?: string | null;
  rank?: string | null;
  skill_bracket?: string | null;
  language?: string | null;
  region?: string | null;
  preferred_roles?: string[] | null;
} | null;

export function isProfileSufficientlyCompletedForMvp(
  profile: MvpProfileCompletionInput,
): boolean {
  if (!profile) {
    return false;
  }

  const resolvedRank = profile.rank ?? profile.skill_bracket ?? null;

  const hasDisplayName = Boolean(profile.display_name?.trim().length);
  const hasDotaNickname = Boolean(profile.dota_nickname?.trim().length);
  const hasRank = Boolean(resolvedRank?.trim().length);
  const hasLanguage = Boolean(profile.language?.trim().length);
  const hasRegion = Boolean(profile.region?.trim().length);
  const hasPreferredRoles = Array.isArray(profile.preferred_roles)
    ? profile.preferred_roles.some((role) => role.trim().length > 0)
    : false;

  return (
    hasDisplayName &&
    hasDotaNickname &&
    hasRank &&
    hasLanguage &&
    hasRegion &&
    hasPreferredRoles
  );
}
