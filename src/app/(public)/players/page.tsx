import { PlayerCard, PlayersFilters } from "@/components/features/players";
import { fetchPublicPlayers } from "@/services/players/searchPlayers";
import { getTranslations } from "next-intl/server";

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

const RANK_OPTIONS = [
  "Herald",
  "Guardian",
  "Crusader",
  "Archon",
  "Legend",
  "Ancient",
  "Divine",
  "Immortal",
];

const PREFERRED_ROLE_OPTIONS = [
  "Carry",
  "Mid",
  "Offlane",
  "Soft Support",
  "Hard Support",
];

const LANGUAGE_OPTIONS = ["Russian", "English"];
const REGION_OPTIONS = ["EU West", "EU East", "Russia", "CIS"];

function normalizeText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export default async function PlayersPage({ searchParams }: PlayersPageProps) {
  const t = await getTranslations();
  const sp = await searchParams;
  const lookingForTeamParam = sp.lookingForTeam;
  const filters = {
    rank: normalizeText(sp.rank),
    preferredRole: normalizeText(sp.preferredRole),
    language: normalizeText(sp.language),
    region: normalizeText(sp.region),
    lookingForTeam:
      lookingForTeamParam === "true"
        ? true
        : lookingForTeamParam === "false"
          ? false
          : undefined,
    query: normalizeText(sp.query),
  };

  const players = await fetchPublicPlayers(filters);

  return (
    <main className="ui-page ui-players-layout">
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
          rankOptions={RANK_OPTIONS}
          preferredRoleOptions={PREFERRED_ROLE_OPTIONS}
          languageOptions={LANGUAGE_OPTIONS}
          regionOptions={REGION_OPTIONS}
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

        {players.length === 0 ? (
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {players.map((p) => (
              <PlayerCard
                key={p.id}
                id={p.id}
                display_name={p.display_name}
                dota_nickname={p.dota_nickname ?? undefined}
                rank={p.rank ?? undefined}
                roles={p.preferred_roles}
                language={p.language ?? undefined}
                region={p.region ?? undefined}
                looking_for_team={p.looking_for_team}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
