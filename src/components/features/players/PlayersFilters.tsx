import { getTranslations } from "next-intl/server";

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

export async function PlayersFilters({
  values,
  actionPath = DEFAULT_ACTION_PATH,
  rankOptions = [],
  preferredRoleOptions = [],
  languageOptions = [],
  regionOptions = [],
  includeTextSearch = true,
}: PlayersFiltersProps) {
  const t = await getTranslations();

  return (
    <form
      method="get"
      action={actionPath}
      aria-label={t("player_filters.form_aria")}
      className="ui-form ui-players-filters"
    >
      <fieldset className="ui-form-section ui-players-filters-fieldset">
        <legend className="ui-players-filters-legend">{t("player_filters.legend")}</legend>
        <p className="ui-players-filters-desc">{t("player_filters.desc")}</p>

        <div className="ui-filter-grid">
          {includeTextSearch ? (
            <div className="ui-field">
              <label htmlFor="players-query">{t("player_filters.search")}</label>
              <input
                id="players-query"
                name="query"
                type="search"
                defaultValue={values?.query ?? ""}
                placeholder={t("player_filters.search_placeholder")}
              />
            </div>
          ) : null}

          <div className="ui-field">
            <label htmlFor="players-rank">{t("player_filters.rank")}</label>
            <select
              id="players-rank"
              name="rank"
              defaultValue={selectValue(values?.rank)}
            >
              <option value="">{t("player_filters.any_rank")}</option>
              {rankOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="ui-field">
            <label htmlFor="players-role">{t("player_filters.role")}</label>
            <select
              id="players-role"
              name="preferredRole"
              defaultValue={selectValue(values?.preferredRole)}
            >
              <option value="">{t("player_filters.any_role")}</option>
              {preferredRoleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="ui-field">
            <label htmlFor="players-language">{t("player_filters.language")}</label>
            <select
              id="players-language"
              name="language"
              defaultValue={selectValue(values?.language)}
            >
              <option value="">{t("player_filters.any_language")}</option>
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="ui-field">
            <label htmlFor="players-region">{t("player_filters.region")}</label>
            <select
              id="players-region"
              name="region"
              defaultValue={selectValue(values?.region)}
            >
              <option value="">{t("player_filters.any_region")}</option>
              {regionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="ui-field">
            <label htmlFor="players-looking-for-team">{t("player_filters.looking")}</label>
            <select
              id="players-looking-for-team"
              name="lookingForTeam"
              defaultValue={values?.lookingForTeam ?? ""}
            >
              <option value="">{t("player_filters.any_status")}</option>
              <option value="true">{t("player_filters.looking_yes")}</option>
              <option value="false">{t("player_filters.looking_no")}</option>
            </select>
          </div>
        </div>

        <div className="ui-inline-actions ui-players-filters-actions">
          <button type="submit" className="ui-players-filters-apply">
            {t("player_filters.apply")}
          </button>
          <a href={actionPath} className="ui-players-filters-clear">
            {t("player_filters.clear")}
          </a>
        </div>
      </fieldset>
    </form>
  );
}

export type { PlayersFilterValues };
