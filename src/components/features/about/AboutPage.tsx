import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function AboutPage() {
  const t = await getTranslations();

  return (
    <main className="about-page">
      <header className="about-hero">
        <div className="about-hero-accent" aria-hidden />
        <p className="about-kicker">Why dotadeaf exists</p>
        <h1 className="about-title">{t("about.title")}</h1>
        <p className="about-subtitle">{t("about.subtitle")}</p>
      </header>

      <section className="about-story-grid">
        <div className="about-mission-block">
          <span className="about-block-label about-block-label-gold">
            {t("about.mission_label")}
          </span>
          <h2 className="about-block-title">{t("about.mission_title")}</h2>
          <p className="about-block-copy">{t("about.mission_text")}</p>
        </div>

        <div className="about-problem-block">
          <span className="about-block-label about-block-label-danger">
            {t("about.problem_label")}
          </span>
          <h2 className="about-block-title">{t("about.problem_title")}</h2>
          <p className="about-block-copy">{t("about.problem_text")}</p>
        </div>
      </section>

      <section className="about-values-section">
        <div className="about-values-heading">
          <p className="about-kicker">What the platform offers</p>
          <h2 className="about-values-title">{t("about.values_title")}</h2>
        </div>

        <div className="about-values-grid">
        {[
          { icon: "◈", titleKey: "v1_title", descKey: "v1_desc" },
          { icon: "◉", titleKey: "v2_title", descKey: "v2_desc" },
          { icon: "◍", titleKey: "v3_title", descKey: "v3_desc" },
          { icon: "◎", titleKey: "v4_title", descKey: "v4_desc" },
        ].map((item) => (
          <article key={item.titleKey} className="about-value-card">
            <span className="about-value-icon">
              {item.icon}
            </span>
            <h3 className="about-value-title">
              {t(`about.${item.titleKey}`)}
            </h3>
            <p className="about-value-copy">
              {t(`about.${item.descKey}`)}
            </p>
          </article>
        ))}
        </div>
      </section>

      <section className="about-cta-block">
        <h2 className="about-cta-title">
          {t("about.cta_title")}
        </h2>
        <p className="about-cta-copy">{t("about.cta_text")}</p>
        <Link href="/register" className="about-cta-link">
          {t("about.cta_button")}
        </Link>
      </section>
    </main>
  );
}
