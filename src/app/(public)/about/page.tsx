import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function AboutPage() {
  const t = await getTranslations();

  return (
    <main className="ui-page ui-public-page">
      <section className="ui-card ui-section">
        <h1 className="ui-heading-1">{t("about.title")}</h1>
        <p className="ui-muted">
          {t("about.intro")}
        </p>
      </section>

      <section className="ui-card ui-section">
        <h2 className="ui-heading-2">{t("about.what_title")}</h2>
        <ul className="ui-public-list">
          <li>{t("about.item1")}</li>
          <li>{t("about.item2")}</li>
          <li>{t("about.item3")}</li>
          <li>{t("about.item4")}</li>
        </ul>
      </section>

      <section className="ui-card ui-section">
        <h2 className="ui-heading-2">{t("about.principles_title")}</h2>
        <p className="ui-muted">{t("about.principles_desc")}</p>
        <p>
          <Link href="/players">{t("about.browse_players")}</Link> or{" "}
          <Link href="/register">{t("about.create_account")}</Link>.
        </p>
      </section>
    </main>
  );
}
