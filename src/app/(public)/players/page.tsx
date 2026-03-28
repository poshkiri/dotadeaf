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
        <h1 className="ui-heading-1">{t("players_page.title")}</h1>
        <p className="ui-muted">{t("players_page.subtitle")}</p>
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
          <h2 className="ui-heading-2">{t("players_page.results")}</h2>
          <p className="ui-muted">
            {players.length === 1
              ? t("players_page.count_one", { count: players.length })
              : t("players_page.count_many", { count: players.length })}
          </p>
        </header>

        {players.length === 0 ? (
          <section aria-label="No players found" className="ui-card ui-section">
            <h3 className="ui-heading-2">{t("players_page.empty_title")}</h3>
            <p className="ui-muted">{t("players_page.empty_desc")}</p>
          </section>
        ) : (
          <div className="ui-players-grid">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
