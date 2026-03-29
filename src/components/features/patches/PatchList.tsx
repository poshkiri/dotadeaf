"use client";

import { useState, type CSSProperties } from "react";
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

const cardBaseStyle: CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  transition: "all 0.2s ease",
  textDecoration: "none",
};

type PatchRowProps = {
  patch: PatchListItem;
  detailBasePath: string;
  locale: string;
  dateFallback: string;
};

function PatchRow({ patch, detailBasePath, locale, dateFallback }: PatchRowProps) {
  const [hovered, setHovered] = useState(false);
  const version = extractVersion(patch.title) ?? versionFromSlug(patch.slug);
  const cardStyle: CSSProperties = hovered
    ? {
        ...cardBaseStyle,
        borderColor: "rgba(245,197,24,0.3)",
        background: "rgba(245,197,24,0.03)",
        transform: "translateX(4px)",
      }
    : cardBaseStyle;

  return (
    <li style={{ listStyle: "none", margin: 0, padding: 0 }}>
      <Link
        href={`${detailBasePath}/${patch.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <div
          style={cardStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
            <div
              style={{
                background: "rgba(245,197,24,0.1)",
                border: "1px solid rgba(245,197,24,0.2)",
                borderRadius: "8px",
                padding: "8px 14px",
                color: "#F5C518",
                fontWeight: 700,
                fontSize: "15px",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                minWidth: "80px",
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              {version}
            </div>
            <div style={{ minWidth: 0 }}>
              <h3
                style={{
                  color: "#fafafa",
                  fontWeight: 600,
                  fontSize: "16px",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {patch.title}
              </h3>
              <p style={{ color: "#71717a", fontSize: "13px", margin: "2px 0 0" }}>
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
            style={{ flexShrink: 0 }}
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
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            padding: "60px 24px",
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(245,197,24,0.4)"
            strokeWidth="1.5"
            style={{ margin: "0 auto 16px", display: "block" }}
            aria-hidden
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <p style={{ color: "#fafafa", fontWeight: 600, fontSize: "18px", margin: "0 0 8px" }}>
            {t("patches.empty_title")}
          </p>
          <p style={{ color: "#71717a", fontSize: "14px", margin: 0 }}>{t("patches.empty_desc")}</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Patches list" style={{ marginTop: "8px" }}>
      <ul style={{ margin: 0, padding: 0 }}>
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
