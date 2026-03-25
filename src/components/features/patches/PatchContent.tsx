const DATE_FORMATTER = new Intl.DateTimeFormat("ru-RU", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

type PatchContentProps = {
  title: string;
  publishedAt: string | null;
  content: string;
};

type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function formatPatchDate(value: string | null): string {
  if (!value) {
    return "Date not specified";
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Date not specified";
  }

  return DATE_FORMATTER.format(parsedDate);
}

function toContentBlocks(content: string): ContentBlock[] {
  const lines = content.split(/\r?\n/);
  const blocks: ContentBlock[] = [];

  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

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

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmedLine.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", text: trimmedLine.slice(3).trim() });
      continue;
    }

    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      flushParagraph();
      listBuffer.push(trimmedLine.slice(2).trim());
      continue;
    }

    flushList();
    paragraphBuffer.push(trimmedLine);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export function PatchContent({ title, publishedAt, content }: PatchContentProps) {
  const blocks = toContentBlocks(content);

  return (
    <article className="ui-card ui-patch-article">
      <header className="ui-patch-header">
        <h1 className="ui-heading-1">{title}</h1>
        <p className="ui-patch-meta">
          <time dateTime={publishedAt ?? undefined}>
            {formatPatchDate(publishedAt)}
          </time>
        </p>
      </header>

      <section aria-label="Patch content" className="ui-patch-body">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2 key={`heading-${index}`} className="ui-heading-2">
                {block.text}
              </h2>
            );
          }

          if (block.type === "list") {
            return (
              <ul key={`list-${index}`} className="ui-patch-list">
                {block.items.map((item, itemIndex) => (
                  <li key={`item-${index}-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            );
          }

          return (
            <p key={`paragraph-${index}`} className="ui-patch-paragraph">
              {block.text}
            </p>
          );
        })}
      </section>
    </article>
  );
}
