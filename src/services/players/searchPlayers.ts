import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isProfileSufficientlyCompletedForMvp } from "@/services/auth/profileCompletion";

type PublicPlayerProfileRow = {
  id: string;
  user_id: string;
  display_name: string | null;
  dota_nickname: string | null;
  preferred_roles: string[] | null;
  skill_bracket: string | null;
  language: string | null;
  region: string | null;
  bio: string | null;
  is_available: boolean | null;
};

export type PlayerSearchFilters = {
  rank?: string;
  preferredRole?: string;
  language?: string;
  region?: string;
  lookingForTeam?: boolean;
  query?: string;
  limit?: number;
};

export type PublicPlayerProfile = {
  id: string;
  user_id: string;
  display_name: string;
  preferred_roles: string[];
  rank: string | null;
  language: string | null;
  region: string | null;
  dota_nickname: string | null;
  bio: string | null;
  looking_for_team: boolean;
};

const PROFILES_TABLE = "profiles";
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

function normalizeText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function escapeIlikeValue(value: string): string {
  return value.replace(/[,%_]/g, "\\$&");
}

function resolveLimit(limit: number | undefined): number {
  if (!limit || Number.isNaN(limit)) {
    return DEFAULT_LIMIT;
  }

  return Math.min(Math.max(limit, 1), MAX_LIMIT);
}

function mapPublicPlayer(row: PublicPlayerProfileRow): PublicPlayerProfile {
  return {
    id: row.id,
    user_id: row.user_id,
    display_name: row.display_name?.trim() ?? "",
    preferred_roles: row.preferred_roles ?? [],
    rank: row.skill_bracket,
    language: row.language ?? null,
    region: row.region ?? null,
    dota_nickname: row.dota_nickname ?? null,
    bio: row.bio ?? null,
    looking_for_team: Boolean(row.is_available),
  };
}

export async function fetchPublicPlayers(
  filters: PlayerSearchFilters = {},
): Promise<PublicPlayerProfile[]> {
  const supabase = await createSupabaseServerClient();
  const rank = normalizeText(filters.rank);
  const preferredRole = normalizeText(filters.preferredRole);
  const language = normalizeText(filters.language);
  const region = normalizeText(filters.region);
  const query = normalizeText(filters.query);
  const limit = resolveLimit(filters.limit);

  let queryBuilder = supabase
    .from(PROFILES_TABLE)
    .select(
      "id, user_id, display_name, dota_nickname, preferred_roles, skill_bracket, language, region, bio, is_available",
    )
    .not("display_name", "is", null)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (rank) {
    queryBuilder = queryBuilder.eq("skill_bracket", rank);
  }

  if (preferredRole) {
    queryBuilder = queryBuilder.contains("preferred_roles", [preferredRole]);
  }

  if (typeof filters.lookingForTeam === "boolean") {
    queryBuilder = queryBuilder.eq("is_available", filters.lookingForTeam);
  }

  if (language) {
    queryBuilder = queryBuilder.eq("language", language);
  }

  if (region) {
    queryBuilder = queryBuilder.eq("region", region);
  }

  if (query) {
    const escapedQuery = escapeIlikeValue(query);
    queryBuilder = queryBuilder.or(
      `display_name.ilike.%${escapedQuery}%,dota_nickname.ilike.%${escapedQuery}%`,
    );
  }

  const { data, error } = await queryBuilder;

  if (error) {
    throw new Error(`Failed to fetch public players: ${error.message}`);
  }

  const rows = (data ?? []) as PublicPlayerProfileRow[];

  return rows
    .filter((row) =>
      isProfileSufficientlyCompletedForMvp({
        display_name: row.display_name,
        dota_nickname: row.dota_nickname,
        skill_bracket: row.skill_bracket,
        language: row.language,
        region: row.region,
        preferred_roles: row.preferred_roles,
      }),
    )
    .map(mapPublicPlayer);
}
