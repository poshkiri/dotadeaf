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

function extractVersion(title: string): string | null {
  const m = title.match(/(\d+\.\d+(?:\.\d+)?)/);
  return m ? m[1] : null;
}

function versionFromSlug(slug: string): string {
  const compact = slug.replace(/[^0-9.]/g, "");
  if (/^\d+\.\d+/.test(compact)) {
    return compact.match(/^(\d+\.\d+)/)?.[1] ?? slug;
  }
  const digits = slug.replace(/\D/g, "");
  if (digits.length >= 2) {
    return `${digits[0]}.${digits.slice(1)}`;
  }
  return slug.slice(0, 8) || "—";
}

type PatchRowProps = {
  patch: PatchListItem;
  detailBasePath: string;
  locale: string;
  dateFallback: string;
};

function PatchRow({ patch, detailBasePath, locale, dateFallback }: PatchRowProps) {
  const version = extractVersion(patch.title) ?? versionFromSlug(patch.slug);

  return (
    <li className="patch-list-item">
      <Link href={`${detailBasePath}/${patch.slug}`} className="patch-card">
        <div className="patch-card-shell">
          <div className="patch-card-content">
            <div className="patch-version-badge">
              {version}
            </div>
            <div className="patch-card-copy">
              <h3 className="patch-card-title">{patch.title}</h3>
              <p className="patch-card-summary">{patch.summary}</p>
              <p className="patch-card-date">
                <time dateTime={patch.publishedAt ?? undefined}>
                  {formatPatchDate(patch.publishedAt, locale, dateFallback)}
                </time>
              </p>
            </div>
          </div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F5C518"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
            className="patch-card-arrow"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </li>
  );
}

export function PatchList({ patches, detailBasePath = "/patches" }: PatchListProps) {
  const t = useTranslations();
  const locale = useLocale();

  if (patches.length === 0) {
    return (
      <section aria-label="Patches list">
        <div className="patch-empty-state">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(245,197,24,0.4)"
            strokeWidth="1.5"
            className="patch-empty-icon"
            aria-hidden
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <p className="patch-empty-title">{t("patches.empty_title")}</p>
          <p className="patch-empty-copy">{t("patches.empty_desc")}</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Patches list" className="patch-list-section">
      <ul className="patch-list">
        {patches.map((patch) => (
          <PatchRow
            key={patch.slug}
            patch={patch}
            detailBasePath={detailBasePath}
            locale={locale}
            dateFallback={t("patches.date_missing")}
          />
        ))}
      </ul>
    </section>
  );
}
