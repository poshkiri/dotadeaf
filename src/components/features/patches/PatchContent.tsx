"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { toContentBlocks } from "./patchContentParser";

type PatchContentProps = {
  title: string;
  publishedAt: string | null;
  content: string;
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

function diffRowStyle(line: string): "buff" | "nerf" | "neutral" {
  const s = line.trim();
  if (s.startsWith("+")) return "buff";
  if (s.startsWith("-")) return "nerf";
  if (s.startsWith("*")) return "neutral";
  return "neutral";
}

const diffStyles = {
  buff: {
    borderLeft: "3px solid rgba(34,197,94,0.6)",
    background: "rgba(34,197,94,0.05)",
    padding: "8px 14px",
    borderRadius: "0 8px 8px 0",
    color: "#d4d4d8",
  },
  nerf: {
    borderLeft: "3px solid rgba(239,68,68,0.5)",
    background: "rgba(239,68,68,0.05)",
    padding: "8px 14px",
    borderRadius: "0 8px 8px 0",
    color: "#d4d4d8",
  },
  neutral: {
    borderLeft: "3px solid rgba(245,197,24,0.4)",
    background: "rgba(245,197,24,0.04)",
    padding: "8px 14px",
    borderRadius: "0 8px 8px 0",
    color: "#d4d4d8",
  },
} as const;

export function PatchContent({ title, publishedAt, content }: PatchContentProps) {
  const t = useTranslations();
  const locale = useLocale();
  const blocks = toContentBlocks(content);
  const version = extractVersion(title);

  return (
    <article className="patch-article patch-content-wrapper">
      <header className="patch-content-header">
        <Link href="/patches" className="patch-back-link">
          {t("patches.back_to_all")}
        </Link>
        {version ? (
          <span className="patch-detail-badge">
            {version}
          </span>
        ) : null}
        <h1 className="patch-detail-title">{title}</h1>
        <p className="patch-detail-date">
          <time dateTime={publishedAt ?? undefined}>
            {formatPatchDate(publishedAt, locale, t("patches.date_missing"))}
          </time>
        </p>
        <div className="patch-detail-divider" />
      </header>

      <section aria-label="Patch content" className="patch-content-body">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            const isFirstHeading =
              blocks.slice(0, index).every((b) => b.type !== "heading");
            return (
              <div
                key={`heading-wrap-${index}`}
                className="patch-section-heading-wrap"
                style={{ marginTop: isFirstHeading ? 0 : "36px" }}
              >
                <div aria-hidden className="patch-section-heading-bar" />
                <h2 id={block.id} className="scroll-mt-28 patch-section-heading">
                  {block.text}
                </h2>
              </div>
            );
          }

          if (block.type === "list") {
            return (
              <ul
                key={`list-${index}`}
                className="patch-rich-list"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`item-${index}-${itemIndex}`} className="patch-rich-list-item">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === "diff") {
            return (
              <div key={`diff-${index}`} className="patch-diff-group">
                {block.lines.map((line, lineIndex) => {
                  const tone = diffRowStyle(line);
                  const s = diffStyles[tone];
                  return (
                    <div
                      key={`diff-line-${index}-${lineIndex}`}
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        ...s,
                      }}
                      className="patch-diff-row"
                    >
                      {line}
                    </div>
                  );
                })}
              </div>
            );
          }

          if (block.type === "code") {
            return (
              <pre
                key={`code-${index}`}
                className="patch-code-block"
              >
                <code>{block.lines.join("\n")}</code>
              </pre>
            );
          }

          return (
            <p
              key={`paragraph-${index}`}
              className="patch-rich-paragraph"
            >
              {block.text}
            </p>
          );
        })}
      </section>
    </article>
  );
}
