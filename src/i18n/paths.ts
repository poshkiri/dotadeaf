import { routing, type AppLocale } from "./routing";

export const appRoutes = {
  home: "/",
  about: "/about",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  profile: "/profile",
  profileEdit: "/profile/edit",
  players: "/players",
  patches: "/patches",
  messages: "/messages",
} as const;

export function getLocaleFromPath(path: string | null | undefined): AppLocale | undefined {
  if (!path) {
    return undefined;
  }

  const [firstSegment] = path.split("/").filter(Boolean);
  return routing.locales.find((locale) => locale === firstSegment);
}

export function getPathWithLocale(
  path: string,
  locale: string | null | undefined,
): string {
  const normalizedLocale =
    routing.locales.find((supportedLocale) => supportedLocale === locale) ??
    routing.defaultLocale;

  if (path === appRoutes.home) {
    return `/${normalizedLocale}`;
  }

  return `/${normalizedLocale}${path}`;
}
