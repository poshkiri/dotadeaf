import { PlayerCard, PlayersFilters } from "@/components/features/players";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { appRoutes, getPathWithLocale } from "@/i18n/paths";
import { createOrGetDirectConversation } from "@/services/chat";
import type { PublicPlayerProfile } from "@/services/players/searchPlayers";
import { fetchPublicPlayers } from "@/services/players/searchPlayers";
import {
  normalizePlayerFilterValue,
  PLAYER_LANGUAGE_OPTIONS,
  PLAYER_RANK_OPTIONS,
  PLAYER_REGION_OPTIONS,
  PLAYER_ROLE_OPTIONS,
} from "@/services/players/filters";

type PlayersPageProps = {
  searchParams: Promise<{
    rank?: string;
    preferredRole?: string;
    language?: string;
    region?: string;
    lookingForTeam?: string;
    query?: string;
  }>;
};

export default async function PlayersPage({ searchParams }: PlayersPageProps) {
  const t = await getTranslations();
  const locale = await getLocale();
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const sp = await searchParams;
  const lookingForTeamParam = sp.lookingForTeam;
  const filters = {
    rank: normalizePlayerFilterValue(sp.rank),
    preferredRole: normalizePlayerFilterValue(sp.preferredRole),
    language: normalizePlayerFilterValue(sp.language),
    region: normalizePlayerFilterValue(sp.region),
    lookingForTeam:
      lookingForTeamParam === "true"
        ? true
        : lookingForTeamParam === "false"
          ? false
          : undefined,
    query: normalizePlayerFilterValue(sp.query),
  };

  let players: PublicPlayerProfile[] = [];
  let playersLoadFailed = false;

  try {
    players = await fetchPublicPlayers(filters);
  } catch {
    playersLoadFailed = true;
  }

  async function startChatAction(formData: FormData) {
    "use server";

    const supabase = await createSupabaseServerClient();
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser) {
      redirect(getPathWithLocale(appRoutes.login, locale));
    }

    const otherUserId = String(formData.get("other_user_id") ?? "").trim();
    if (!otherUserId) {
      redirect(getPathWithLocale(appRoutes.players, locale));
    }

    const conversation = await createOrGetDirectConversation({
      currentUserId: currentUser.id,
      otherUserId,
    });

    redirect(getPathWithLocale(`${appRoutes.messages}/${conversation.id}`, locale));
  }

  return (
    <main className="ui-page ui-players-layout ui-players-page">
      <header className="ui-players-header">
        <div className="ui-players-header-accent" aria-hidden />
        <h1 className="ui-players-title">{t("players_page.title")}</h1>
        <p className="ui-players-subtitle">{t("players_page.subtitle")}</p>
      </header>

      <section aria-label="Players filters" className="ui-section">
        <PlayersFilters
          values={{
            rank: filters.rank,
            preferredRole: filters.preferredRole,
            language: filters.language,
            region: filters.region,
            lookingForTeam:
              typeof filters.lookingForTeam === "boolean"
                ? filters.lookingForTeam
                  ? "true"
                  : "false"
                : "",
            query: filters.query,
          }}
          rankOptions={[...PLAYER_RANK_OPTIONS]}
          preferredRoleOptions={[...PLAYER_ROLE_OPTIONS]}
          languageOptions={[...PLAYER_LANGUAGE_OPTIONS]}
          regionOptions={[...PLAYER_REGION_OPTIONS]}
        />
      </section>

      <section aria-label="Players results" className="ui-section">
        <header className="ui-players-results-header">
          <h2 className="ui-players-results-title">{t("players_page.results")}</h2>
          <span className="ui-players-count-badge">
            {players.length === 1
              ? t("players_page.count_one", { count: players.length })
              : t("players_page.count_many", { count: players.length })}
          </span>
        </header>

        {playersLoadFailed ? (
          <section aria-label="Players temporarily unavailable" className="ui-players-empty">
            <h3 className="ui-players-empty-title">{t("players_page.unavailable_title")}</h3>
            <p className="ui-players-empty-desc">{t("players_page.unavailable_desc")}</p>
          </section>
        ) : players.length === 0 ? (
          <section aria-label="No players found" className="ui-players-empty">
            <svg
              className="ui-players-empty-icon"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(245,197,24,0.4)"
              strokeWidth="1.5"
              aria-hidden
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <h3 className="ui-players-empty-title">{t("players_page.empty_title")}</h3>
            <p className="ui-players-empty-desc">{t("players_page.empty_desc")}</p>
          </section>
        ) : (
          <div className="ui-players-grid players-grid" style={{ marginTop: "24px" }}>
            {players.map((p) => (
              <PlayerCard
                key={p.id}
                id={p.id}
                user_id={p.user_id}
                display_name={p.display_name}
                dota_nickname={p.dota_nickname ?? undefined}
                rank={p.rank ?? undefined}
                roles={p.preferred_roles}
                language={p.language ?? undefined}
                region={p.region ?? undefined}
                looking_for_team={p.looking_for_team}
                current_user_id={user?.id}
                start_chat_action={startChatAction}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
