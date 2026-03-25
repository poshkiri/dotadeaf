import { PlayerCard, PlayersFilters } from "@/components/features/players";
import { fetchPublicPlayers } from "@/services/players/searchPlayers";

type PlayersPageProps = {
  searchParams?: {
    rank?: string;
    preferredRole?: string;
    language?: string;
    region?: string;
    lookingForTeam?: string;
    query?: string;
  };
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
  const lookingForTeamParam = searchParams?.lookingForTeam;
  const filters = {
    rank: normalizeText(searchParams?.rank),
    preferredRole: normalizeText(searchParams?.preferredRole),
    language: normalizeText(searchParams?.language),
    region: normalizeText(searchParams?.region),
    lookingForTeam:
      lookingForTeamParam === "true"
        ? true
        : lookingForTeamParam === "false"
          ? false
          : undefined,
    query: normalizeText(searchParams?.query),
  };

  const players = await fetchPublicPlayers(filters);

  return (
    <main className="ui-page ui-players-layout">
      <header className="ui-players-header">
        <h1 className="ui-heading-1">Players</h1>
        <p className="ui-muted">Find players using simple filters.</p>
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
          <h2 className="ui-heading-2">Results</h2>
          <p className="ui-muted">
            {players.length} {players.length === 1 ? "player" : "players"}
          </p>
        </header>

        {players.length === 0 ? (
          <section aria-label="No players found" className="ui-card ui-section">
            <h3 className="ui-heading-2">No players found</h3>
            <p className="ui-muted">
              Try clearing some filters or broadening your search criteria.
            </p>
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
