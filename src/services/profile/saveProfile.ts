import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MvpProfileFormValues } from "./validation";

const PROFILES_TABLE = "profiles";

type SaveProfileForUserParams = {
  userId: string;
  values: MvpProfileFormValues;
};

export async function saveProfileForUser({
  userId,
  values,
}: SaveProfileForUserParams) {
  const supabase = await createSupabaseServerClient();
  const profileUpdatePayload = {
    user_id: userId,
    display_name: values.display_name,
    dota_nickname: values.dota_nickname || null,
    preferred_roles: values.preferred_roles,
    // DB compatibility: keep existing column names for MVP rank/availability.
    skill_bracket: values.rank || null,
    language: values.language || null,
    region: values.region || null,
    bio: values.bio,
    is_available: values.looking_for_team,
  };

  const { error } = await supabase
    .from(PROFILES_TABLE)
    .upsert(profileUpdatePayload, { onConflict: "user_id" });

  if (error) {
    throw new Error(`Failed to save profile: ${error.message}`);
  }
}
