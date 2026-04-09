export const PLAYER_RANK_OPTIONS = [
  "Herald",
  "Guardian",
  "Crusader",
  "Archon",
  "Legend",
  "Ancient",
  "Divine",
  "Immortal",
] as const;

export const PLAYER_ROLE_OPTIONS = [
  "Carry",
  "Mid",
  "Offlane",
  "Soft Support",
  "Hard Support",
] as const;

export const PLAYER_LANGUAGE_OPTIONS = ["Russian", "English"] as const;

export const PLAYER_REGION_OPTIONS = [
  "EU West",
  "EU East",
  "Russia",
  "CIS",
] as const;

export function normalizePlayerFilterValue(
  value: string | undefined,
): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}
