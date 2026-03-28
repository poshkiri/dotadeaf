"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type PatchListItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string | null;
};

type PatchListProps = {
  patches: PatchListItem[];
  detailBasePath?: string;
  emptyStateText?: string;
};

function formatPatchDate(value: string | null, locale: string, fallback: string): string {
  if (!value) {
    return fallback;
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

export function PatchList({
  patches,
  detailBasePath = "/patches",
  emptyStateText,
}: PatchListProps) {
  const t = useTranslations();
  const locale = useLocale();
  const resolvedEmpty = emptyStateText ?? t("patches.empty");

  if (patches.length === 0) {
    return (
      <section aria-label="Patches list" className="ui-card ui-section">
        <h2 className="ui-heading-2">{t("patches.published_title")}</h2>
        <p className="ui-muted">{resolvedEmpty}</p>
      </section>
    );
  }

  return (
    <section aria-label="Patches list" className="ui-section">
      <h2 className="ui-heading-2">{t("patches.published_title")}</h2>
      <ul className="patch-list">
        {patches.map((patch) => (
          <li key={patch.slug}>
            <Link href={`${detailBasePath}/${patch.slug}`} className="patch-card">
              <div className="patch-card-inner">
                <div>
                  <span className="patch-card-label">{t("patches.card_game_label")}</span>
                  <h3 className="patch-card-title">{patch.title}</h3>
                  <p className="patch-card-date">
                    <time dateTime={patch.publishedAt ?? undefined}>
                      {formatPatchDate(patch.publishedAt, locale, t("patches.date_missing"))}
                    </time>
                  </p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F5C518"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
