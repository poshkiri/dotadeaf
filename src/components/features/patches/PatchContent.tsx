"use client";

import { useLocale, useTranslations } from "next-intl";

type PatchContentProps = {
  title: string;
  publishedAt: string | null;
  content: string;
};

type ContentBlock =
  | { type: "heading"; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lines: string[] }
  | { type: "diff"; lines: string[] };

export type PatchTocItem = {
  id: string;
  label: string;
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

function toContentBlocks(content: string): ContentBlock[] {
  const lines = content.split(/\r?\n/);
  const blocks: ContentBlock[] = [];
  const headingCount = new Map<string, number>();

  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let codeBuffer: string[] = [];
  let diffBuffer: string[] = [];
  let inCodeFence = false;

  const createHeadingId = (text: string): string => {
    const base = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 72);

    const safeBase = base || "section";
    const currentCount = headingCount.get(safeBase) ?? 0;
    headingCount.set(safeBase, currentCount + 1);
    return currentCount === 0 ? safeBase : `${safeBase}-${currentCount + 1}`;
  };

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      blocks.push({ type: "paragraph", text: paragraphBuffer.join(" ") });
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: [...listBuffer] });
      listBuffer = [];
    }
  };

  const flushCode = () => {
    if (codeBuffer.length > 0) {
      blocks.push({ type: "code", lines: [...codeBuffer] });
      codeBuffer = [];
    }
  };

  const flushDiff = () => {
    if (diffBuffer.length > 0) {
      blocks.push({ type: "diff", lines: [...diffBuffer] });
      diffBuffer = [];
    }
  };

  const isDiffLine = (line: string) =>
    line.includes(":") &&
    (line.includes("+") || line.includes("-")) &&
    line.length <= 140;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      flushCode();
      flushDiff();
      continue;
    }

    if (trimmedLine.startsWith("```")) {
      flushParagraph();
      flushList();
      flushDiff();
      if (inCodeFence) {
        flushCode();
      }
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      flushParagraph();
      flushList();
      flushDiff();
      codeBuffer.push(trimmedLine);
      continue;
    }

    if (trimmedLine.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushCode();
      flushDiff();
      const headingText = trimmedLine.slice(3).trim();
      blocks.push({ type: "heading", text: headingText, id: createHeadingId(headingText) });
      continue;
    }

    if (isDiffLine(trimmedLine)) {
      flushParagraph();
      flushList();
      flushCode();
      diffBuffer.push(trimmedLine);
      continue;
    }

    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      flushParagraph();
      flushCode();
      flushDiff();
      listBuffer.push(trimmedLine.slice(2).trim());
      continue;
    }

    flushList();
    flushCode();
    flushDiff();
    paragraphBuffer.push(trimmedLine);
  }

  flushParagraph();
  flushList();
  flushCode();
  flushDiff();

  return blocks;
}

export function getPatchTocItems(content: string): PatchTocItem[] {
  return toContentBlocks(content)
    .filter((block): block is Extract<ContentBlock, { type: "heading" }> => block.type === "heading")
    .map((block) => ({ id: block.id, label: block.text }));
}

function diffRowStyle(line: string): "buff" | "nerf" | "neutral" {
  const t = line.trim();
  if (t.startsWith("+")) return "buff";
  if (t.startsWith("-")) return "nerf";
  if (t.startsWith("*")) return "neutral";
  const low = t.toLowerCase();
  if (low.includes("buff") || low.includes("increase") || low.includes("up") || low.includes("усилен")) {
    return "buff";
  }
  if (low.includes("nerf") || low.includes("decrease") || low.includes("down") || low.includes("ослаб")) {
    return "nerf";
  }
  return "neutral";
}

const diffStyles = {
  buff: {
    background: "rgba(34,197,94,0.06)",
    borderLeft: "3px solid rgba(34,197,94,0.5)",
  },
  nerf: {
    background: "rgba(239,68,68,0.06)",
    borderLeft: "3px solid rgba(239,68,68,0.4)",
  },
  neutral: {
    background: "rgba(245,197,24,0.05)",
    borderLeft: "3px solid rgba(245,197,24,0.35)",
  },
} as const;

export function PatchContent({ title, publishedAt, content }: PatchContentProps) {
  const t = useTranslations();
  const locale = useLocale();
  const blocks = toContentBlocks(content);
  const version = extractVersion(title);

  return (
    <article
      className="patch-article"
      style={{
        maxWidth: "740px",
        margin: "0 auto",
        padding: "40px 24px 80px",
        width: "100%",
      }}
    >
      <header style={{ marginBottom: "24px" }}>
        {version ? (
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 700,
              color: "#0a0a0a",
              background: "#F5C518",
              padding: "4px 12px",
              borderRadius: "9999px",
              marginBottom: "12px",
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
            margin: version ? "8px 0 0" : "0",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <p style={{ color: "#71717a", fontSize: "14px", marginTop: "12px" }}>
          <time dateTime={publishedAt ?? undefined}>
            {formatPatchDate(publishedAt, locale, t("patches.date_missing"))}
          </time>
        </p>
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            margin: "24px 0 0",
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
                  marginTop: isFirstHeading ? 0 : "32px",
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
              <ul key={`list-${index}`} className="my-4 space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={`item-${index}-${itemIndex}`}
                    className="rounded-md px-2.5 py-1.5 text-zinc-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === "diff") {
            return (
              <div key={`diff-${index}`} className="mb-3 space-y-1.5">
                {block.lines.map((line, lineIndex) => {
                  const tone = diffRowStyle(line);
                  const s = diffStyles[tone];
                  return (
                    <div
                      key={`diff-line-${index}-${lineIndex}`}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: "#d4d4d8",
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
                color: "#d4d4d8",
                fontSize: "15px",
                lineHeight: 1.7,
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
