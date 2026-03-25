type PlayersFilterValues = {
  rank?: string;
  preferredRole?: string;
  language?: string;
  region?: string;
  lookingForTeam?: "true" | "false" | "";
  query?: string;
};

type PlayersFiltersProps = {
  values?: PlayersFilterValues;
  actionPath?: string;
  rankOptions?: string[];
  preferredRoleOptions?: string[];
  languageOptions?: string[];
  regionOptions?: string[];
  includeTextSearch?: boolean;
};

const DEFAULT_ACTION_PATH = "/players";

function selectValue(value: string | undefined): string {
  return value ?? "";
}

export function PlayersFilters({
  values,
  actionPath = DEFAULT_ACTION_PATH,
  rankOptions = [],
  preferredRoleOptions = [],
  languageOptions = [],
  regionOptions = [],
  includeTextSearch = true,
}: PlayersFiltersProps) {
  return (
    <form
      method="get"
      action={actionPath}
      aria-label="Player filters"
      className="ui-form ui-card"
    >
      <fieldset className="ui-form-section">
        <legend>Filters</legend>
        <p className="ui-muted">
          Refine results by rank, role, language, region, and team status.
        </p>

        <div className="ui-filter-grid">
          {includeTextSearch ? (
            <div className="ui-field">
              <label htmlFor="players-query">Search</label>
              <input
                id="players-query"
                name="query"
                type="search"
                defaultValue={values?.query ?? ""}
                placeholder="Display name or Dota nickname"
              />
            </div>
          ) : null}

          <div className="ui-field">
            <label htmlFor="players-rank">Rank</label>
            <select
              id="players-rank"
              name="rank"
              defaultValue={selectValue(values?.rank)}
            >
              <option value="">Any rank</option>
              {rankOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="ui-field">
            <label htmlFor="players-role">Preferred role</label>
            <select
              id="players-role"
              name="preferredRole"
              defaultValue={selectValue(values?.preferredRole)}
            >
              <option value="">Any role</option>
              {preferredRoleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="ui-field">
            <label htmlFor="players-language">Language</label>
            <select
              id="players-language"
              name="language"
              defaultValue={selectValue(values?.language)}
            >
              <option value="">Any language</option>
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="ui-field">
            <label htmlFor="players-region">Region</label>
            <select
              id="players-region"
              name="region"
              defaultValue={selectValue(values?.region)}
            >
              <option value="">Any region</option>
              {regionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="ui-field">
            <label htmlFor="players-looking-for-team">Looking for team</label>
            <select
              id="players-looking-for-team"
              name="lookingForTeam"
              defaultValue={values?.lookingForTeam ?? ""}
            >
              <option value="">Any status</option>
              <option value="true">Looking for team</option>
              <option value="false">Not looking for team</option>
            </select>
          </div>
        </div>

        <div className="ui-inline-actions">
          <button type="submit">Apply filters</button>
          <a href={actionPath}>Clear filters</a>
        </div>
      </fieldset>
    </form>
  );
}

export type { PlayersFilterValues };
