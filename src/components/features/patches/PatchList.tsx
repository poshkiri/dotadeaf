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
    month: "short",
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
      <ul className="ui-list">
        {patches.map((patch) => (
          <li key={patch.slug}>
            <article className="ui-card ui-patches-list-item">
              <header className="ui-patches-list-head">
                <h3 className="ui-patches-list-title">
                  <Link href={`${detailBasePath}/${patch.slug}`}>{patch.title}</Link>
                </h3>
              </header>
              <p className="ui-patches-list-summary">{patch.summary}</p>
              <p className="ui-patches-list-meta">
                <time dateTime={patch.publishedAt ?? undefined}>
                  {formatPatchDate(patch.publishedAt, locale, t("patches.date_missing"))}
                </time>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
