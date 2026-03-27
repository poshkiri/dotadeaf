import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createIntlMiddleware(routing);

/**
 * Refreshes the Supabase auth session on every request.
 *
 * This is required by @supabase/ssr: access tokens expire and must be
 * silently refreshed via cookies. Without this proxy, server-side
 * auth.getUser() calls will fail after the token expires, breaking
 * protected route checks even for legitimately logged-in users.
 *
 * The proxy does NOT perform route protection — that responsibility
 * stays in the individual server pages/layouts via enforcePlatformRouteAccess().
 */
export async function proxy(request: NextRequest) {
  const i18nResponse = handleI18nRouting(request);

  if (i18nResponse.status >= 300 && i18nResponse.status < 400) {
    return i18nResponse;
  }

  let supabaseResponse = i18nResponse;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          i18nResponse.headers.forEach((value, key) => {
            supabaseResponse.headers.set(key, value);
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh the session — do NOT remove this call.
  // It silently exchanges expired access tokens using the refresh token in cookies.
  // getUser() makes a network request to Supabase Auth — this is intentional
  // and is the only reliable way to validate the token server-side.
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico and other common static assets
     */
    "/((?!_next/static|_next/image|favicon.ico|callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
