"use client";

import { useState } from "react";
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
  const [backHover, setBackHover] = useState(false);
  const blocks = toContentBlocks(content);
  const version = extractVersion(title);

  return (
    <article
      className="patch-article"
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "120px 24px 80px",
        width: "100%",
      }}
    >
      <header style={{ marginBottom: "0" }}>
        <Link
          href="/patches"
          onMouseEnter={() => setBackHover(true)}
          onMouseLeave={() => setBackHover(false)}
          style={{
            color: backHover ? "#F5C518" : "#71717a",
            fontSize: "14px",
            marginBottom: "24px",
            display: "block",
            textDecoration: "none",
            transition: "color 0.15s ease",
          }}
        >
          {t("patches.back_to_all")}
        </Link>
        {version ? (
          <span
            style={{
              display: "inline-block",
              fontSize: "13px",
              fontWeight: 600,
              color: "#F5C518",
              background: "rgba(245,197,24,0.1)",
              padding: "4px 12px",
              borderRadius: "9999px",
            }}
          >
            {version}
          </span>
        ) : null}
        <h1
          style={{
            color: "#fafafa",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: "12px 0 0",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <p style={{ color: "#71717a", fontSize: "14px", marginTop: "12px", marginBottom: 0 }}>
          <time dateTime={publishedAt ?? undefined}>
            {formatPatchDate(publishedAt, locale, t("patches.date_missing"))}
          </time>
        </p>
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            margin: "24px 0",
          }}
        />
      </header>

      <section aria-label="Patch content" className="patch-content-body">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            const isFirstHeading =
              blocks.slice(0, index).every((b) => b.type !== "heading");
            return (
              <div
                key={`heading-wrap-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: isFirstHeading ? 0 : "36px",
                  marginBottom: "12px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    width: "4px",
                    height: "20px",
                    background: "#F5C518",
                    borderRadius: "2px",
                    boxShadow: "0 0 8px rgba(245,197,24,0.5)",
                    flexShrink: 0,
                  }}
                />
                <h2
                  id={block.id}
                  className="scroll-mt-28"
                  style={{
                    color: "#fafafa",
                    fontSize: "20px",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {block.text}
                </h2>
              </div>
            );
          }

          if (block.type === "list") {
            return (
              <ul
                key={`list-${index}`}
                style={{
                  margin: "16px 0",
                  paddingLeft: "1.25rem",
                  color: "#a1a1aa",
                  fontSize: "15px",
                  lineHeight: 1.8,
                }}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`item-${index}-${itemIndex}`} style={{ marginBottom: "0.35rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === "diff") {
            return (
              <div key={`diff-${index}`} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
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
                className="my-5 overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-800 p-3 font-mono text-xs text-zinc-100"
              >
                <code>{block.lines.join("\n")}</code>
              </pre>
            );
          }

          return (
            <p
              key={`paragraph-${index}`}
              style={{
                color: "#a1a1aa",
                fontSize: "15px",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              {block.text}
            </p>
          );
        })}
      </section>
    </article>
  );
}
