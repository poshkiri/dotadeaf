import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  MVP_REQUIRED_PROFILE_FIELDS,
  isProfileSufficientlyCompletedForMvp,
} from "./profileCompletion";

const PROFILES_TABLE = "profiles";

export type MinimalProfile = {
  id: string;
  user_id: string;
  display_name: string | null;
  dota_nickname: string | null;
  preferred_roles: string[] | null;
  skill_bracket: string | null;
  language: string | null;
  region: string | null;
};

type CreateMinimalProfileParams = {
  userId: string;
  email?: string | null;
  displayName?: string | null;
};

function resolveMinimalDisplayName({
  email,
  displayName,
}: {
  email?: string | null;
  displayName?: string | null;
}): string {
  const trimmedDisplayName = displayName?.trim();
  if (trimmedDisplayName) {
    return trimmedDisplayName;
  }

  const emailLocalPart = email?.split("@")[0]?.trim();
  if (emailLocalPart) {
    return emailLocalPart;
  }

  return "New player";
}

export { MVP_REQUIRED_PROFILE_FIELDS, isProfileSufficientlyCompletedForMvp };

export async function getProfileByUserId(
  userId: string,
): Promise<MinimalProfile | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PROFILES_TABLE)
    .select(
      "id, user_id, display_name, dota_nickname, preferred_roles, skill_bracket, language, region",
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load profile: ${error.message}`);
  }

  return data as MinimalProfile | null;
}

export async function doesProfileExist(userId: string): Promise<boolean> {
  const profile = await getProfileByUserId(userId);
  return Boolean(profile);
}

export async function createMinimalProfileIfNeeded({
  userId,
  email,
  displayName,
}: CreateMinimalProfileParams): Promise<MinimalProfile> {
  const existingProfile = await getProfileByUserId(userId);
  if (existingProfile) {
    return existingProfile;
  }

  const minimalDisplayName = resolveMinimalDisplayName({ email, displayName });
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from(PROFILES_TABLE)
    .insert({
      user_id: userId,
      display_name: minimalDisplayName,
    })
    .select(
      "id, user_id, display_name, dota_nickname, preferred_roles, skill_bracket, language, region",
    )
    .single();

  if (!error) {
    return data as MinimalProfile;
  }

  // Duplicate profile can happen under race conditions. In that case, read and return it.
  if (error.code === "23505") {
    const profileAfterConflict = await getProfileByUserId(userId);
    if (profileAfterConflict) {
      return profileAfterConflict;
    }
  }

  throw new Error(`Failed to create minimal profile: ${error.message}`);
}
