export type MvpProfileFormInput = {
  display_name?: string | null;
  dota_nickname?: string | null;
  rank?: string | null;
  preferred_roles?: string[] | null;
  language?: string | null;
  region?: string | null;
  bio?: string | null;
  looking_for_team?: boolean | null;
};

export type MvpProfileFormValues = {
  display_name: string;
  dota_nickname: string;
  rank: string;
  preferred_roles: string[];
  language: string;
  region: string;
  bio: string | null;
  looking_for_team: boolean;
};

export type MvpProfileFormErrors = Partial<Record<keyof MvpProfileFormValues, string>>;

export const MVP_PROFILE_REQUIRED_FIELDS = [
  "display_name",
  "dota_nickname",
  "rank",
  "preferred_roles",
  "language",
  "region",
] as const;

export const MVP_PROFILE_OPTIONAL_FIELDS = ["bio", "looking_for_team"] as const;

function normalizeText(value: string | null | undefined): string {
  return (value ?? "").trim();
}

function normalizeRoles(value: string[] | null | undefined): string[] {
  const roles = value ?? [];
  return roles.map((role) => role.trim()).filter(Boolean);
}

export function normalizeMvpProfileFormInput(
  input: MvpProfileFormInput,
): MvpProfileFormValues {
  return {
    display_name: normalizeText(input.display_name),
    dota_nickname: normalizeText(input.dota_nickname),
    rank: normalizeText(input.rank),
    preferred_roles: normalizeRoles(input.preferred_roles),
    language: normalizeText(input.language),
    region: normalizeText(input.region),
    bio: normalizeText(input.bio) || null,
    looking_for_team: Boolean(input.looking_for_team),
  };
}

export function validateMvpProfileForm(
  input: MvpProfileFormInput,
): {
  values: MvpProfileFormValues;
  errors: MvpProfileFormErrors;
  isValid: boolean;
} {
  const values = normalizeMvpProfileFormInput(input);
  const errors: MvpProfileFormErrors = {};

  if (!values.display_name) {
    errors.display_name = "Display name is required.";
  }

  if (!values.dota_nickname) {
    errors.dota_nickname = "Dota nickname is required.";
  }

  if (!values.rank) {
    errors.rank = "Rank is required.";
  }

  if (!values.language) {
    errors.language = "Language is required.";
  }

  if (!values.region) {
    errors.region = "Region is required.";
  }

  if (values.preferred_roles.length === 0) {
    errors.preferred_roles = "At least one preferred role is required.";
  }

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
