"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const featureIcons = ["🎯", "🔎", "💬", "🧩"];

export function HomePage() {
  const t = useTranslations();

  return (
    <div className="home-page">
      <section className="home-hero" aria-label="Hero section">
        <div className="home-orb home-orb-violet" aria-hidden="true" />
        <div className="home-orb home-orb-red" aria-hidden="true" />
        <div className="home-orb home-orb-indigo" aria-hidden="true" />

        <div className="home-hero-content">
          <p className="home-hero-badge">{t("hero.badge")}</p>
          <h1 className="home-hero-title">
            <span>{t("hero.title1")}</span>
            <span className="home-hero-title-accent">{t("hero.title2")}</span>
          </h1>
          <p className="home-hero-subtitle">{t("hero.subtitle")}</p>

          <div className="home-hero-actions">
            <Link href="/register" className="home-btn home-btn-primary">
              {t("hero.cta_primary")}
            </Link>
            <Link href="/players" className="home-btn home-btn-secondary">
              {t("hero.cta_secondary")}
            </Link>
          </div>

          <div className="home-hero-tags" aria-label="Highlights">
            <span>{t("hero.tag_role")}</span>
            <span>{t("hero.tag_rank")}</span>
            <span>{t("hero.tag_region")}</span>
          </div>
        </div>
      </section>

      <section className="home-stats" aria-label="Platform stats">
        <div className="home-stats-inner">
          <div className="home-stat-item">
            <strong>500+</strong>
            <span>{t("stats.players").replace("500+ ", "")}</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat-item">
            <strong>Dota 2</strong>
            <span>{t("stats.patches").replace("Dota 2 ", "")}</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat-item">
            <strong>{t("stats.free")}</strong>
            <span>{t("common.brand")}</span>
          </div>
        </div>
      </section>

      <section className="home-features" aria-label="Features">
        <h2>{t("features.title")}</h2>
        <div className="home-features-grid">
          {[1, 2, 3, 4].map((index) => (
            <article key={index} className="home-feature-card">
              <div className="home-feature-icon" aria-hidden="true">
                {featureIcons[index - 1]}
              </div>
              <h3>{t(`features.f${index}_title`)}</h3>
              <p>{t(`features.f${index}_desc`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta" aria-label="Call to action">
        <h2>{t("cta_section.title")}</h2>
        <p>{t("cta_section.subtitle")}</p>
        <Link href="/register" className="home-btn home-btn-primary home-btn-large">
          {t("cta_section.button")}
        </Link>
      </section>
    </div>
  );
}
