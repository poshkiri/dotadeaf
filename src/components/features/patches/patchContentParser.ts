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

export function toContentBlocks(content: string): ContentBlock[] {
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

  const isStandaloneDiffLine = (trimmed: string) => {
    if (!trimmed.length) return false;
    if (trimmed[0] === "+") return true;
    if (trimmed[0] === "-" && !trimmed.startsWith("- ")) return true;
    if (trimmed[0] === "*" && !trimmed.startsWith("* ")) return true;
    return false;
  };

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

    if (isStandaloneDiffLine(trimmedLine)) {
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
