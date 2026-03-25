const REQUIRED_PUBLIC_ENV = {
  url: "NEXT_PUBLIC_SUPABASE_URL",
  anonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
} as const;

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSupabasePublicEnv() {
  return {
    url: requireEnv(REQUIRED_PUBLIC_ENV.url),
    anonKey: requireEnv(REQUIRED_PUBLIC_ENV.anonKey),
  };
}

export function getSupabaseServiceRoleKey() {
  // Optional foundation helper for server-only privileged operations.
  return requireEnv("SUPABASE_SERVICE_ROLE_KEY");
}
