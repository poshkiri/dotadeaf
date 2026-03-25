import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProfileForView = {
  id: string;
  user_id: string;
  display_name: string | null;
  dota_nickname: string | null;
  rank: string | null;
  preferred_roles: string[];
  language: string | null;
  region: string | null;
  bio: string | null;
  looking_for_team: boolean;
  last_active_at: string | null;
};

type ProfileForViewRow = {
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
  last_active_at: string | null;
};

const PROFILES_TABLE = "profiles";

export async function getProfileForViewByUserId(
  userId: string,
): Promise<ProfileForView | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PROFILES_TABLE)
    .select(
      "id, user_id, display_name, dota_nickname, preferred_roles, skill_bracket, language, region, bio, is_available, last_active_at",
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load profile for view: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const row = data as ProfileForViewRow;
  return {
    id: row.id,
    user_id: row.user_id,
    display_name: row.display_name,
    dota_nickname: row.dota_nickname,
    rank: row.skill_bracket,
    preferred_roles: row.preferred_roles ?? [],
    language: row.language,
    region: row.region,
    bio: row.bio,
    looking_for_team: Boolean(row.is_available),
    last_active_at: row.last_active_at,
  };
}
