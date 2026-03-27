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
  | { type: "code"; lines: string[] };

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
    month: "short",
    day: "numeric",
  }).format(parsedDate);
}

function toContentBlocks(content: string): ContentBlock[] {
  const lines = content.split(/\r?\n/);
  const blocks: ContentBlock[] = [];
  const headingCount = new Map<string, number>();

  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let codeBuffer: string[] = [];

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

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      flushCode();
      continue;
    }

    if (trimmedLine.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushCode();
      const headingText = trimmedLine.slice(3).trim();
      blocks.push({ type: "heading", text: headingText, id: createHeadingId(headingText) });
      continue;
    }

    if (trimmedLine.startsWith("```")) {
      flushParagraph();
      flushList();
      if (codeBuffer.length > 0) {
        flushCode();
      }
      continue;
    }

    if (
      trimmedLine.includes(":") &&
      (trimmedLine.includes("+") || trimmedLine.includes("-")) &&
      trimmedLine.length <= 140
    ) {
      flushParagraph();
      flushList();
      codeBuffer.push(trimmedLine);
      continue;
    }

    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      flushParagraph();
      flushCode();
      listBuffer.push(trimmedLine.slice(2).trim());
      continue;
    }

    flushList();
    flushCode();
    paragraphBuffer.push(trimmedLine);
  }

  flushParagraph();
  flushList();
  flushCode();

  return blocks;
}

export function getPatchTocItems(content: string): PatchTocItem[] {
  return toContentBlocks(content)
    .filter((block): block is Extract<ContentBlock, { type: "heading" }> => block.type === "heading")
    .map((block) => ({ id: block.id, label: block.text }));
}

function resolveDiffRowTone(item: string): string {
  const normalized = item.toLowerCase();
  if (normalized.includes("buff") || normalized.includes("increase") || normalized.includes("up")) {
    return "bg-emerald-500/5";
  }

  if (normalized.includes("nerf") || normalized.includes("decrease") || normalized.includes("down")) {
    return "bg-red-500/5";
  }

  return "";
}

export function PatchContent({ title, publishedAt, content }: PatchContentProps) {
  const t = useTranslations();
  const locale = useLocale();
  const blocks = toContentBlocks(content);

  return (
    <article className="w-full">
      <header className="mb-7 border-b border-zinc-800 pb-5">
        <h1 className="font-['Inter',sans-serif] text-[clamp(1.85rem,3.8vw,2.65rem)] font-medium tracking-tight text-zinc-50">
          {title}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          <time dateTime={publishedAt ?? undefined}>
            {formatPatchDate(publishedAt, locale, t("patches.date_missing"))}
          </time>
        </p>
      </header>

      <section
        aria-label="Patch content"
        className="prose prose-invert prose-zinc max-w-none
                   prose-headings:font-['Inter',sans-serif] prose-headings:font-medium
                   prose-h2:text-[clamp(1.3rem,2.3vw,1.75rem)] prose-h2:tracking-tight
                   prose-p:text-zinc-200 prose-p:leading-7"
      >
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                id={block.id}
                key={`heading-${index}`}
                className="scroll-mt-28"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "list") {
            return (
              <ul key={`list-${index}`} className="my-4 space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={`item-${index}-${itemIndex}`}
                    className={`rounded-md px-2.5 py-1.5 ${resolveDiffRowTone(item)}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
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
            <p key={`paragraph-${index}`}>
              {block.text}
            </p>
          );
        })}
      </section>
    </article>
  );
}
