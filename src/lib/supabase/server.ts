import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabasePublicEnv, getSupabaseServiceRoleKey } from "./env";
import type { Database } from "./database.types";

/**
 * Server client for use in Server Components, Server Actions, and Route Handlers.
 * Reads and writes auth session cookies automatically via next/headers.
 * Uses the anon key — RLS applies.
 */
export async function createSupabaseServerClient() {
  const { url, anonKey } = getSupabasePublicEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll is called from Server Components where cookies cannot be set.
          // The Middleware handles session refresh, so this is safe to ignore.
        }
      },
    },
  });
}

/**
 * Privileged server client for use in Server Actions and Route Handlers only.
 * Bypasses RLS — use only for admin-level operations.
 * Never expose this client to the browser.
 */
export async function createSupabaseServiceRoleClient() {
  const { url } = getSupabasePublicEnv();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, serviceRoleKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Safe to ignore in Server Components.
        }
      },
    },
  });
}
