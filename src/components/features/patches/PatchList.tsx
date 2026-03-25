import Link from "next/link";

const DATE_FORMATTER = new Intl.DateTimeFormat("ru-RU", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

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

export function PatchList({
  patches,
  detailBasePath = "/patches",
  emptyStateText = "No published patches yet.",
}: PatchListProps) {
  if (patches.length === 0) {
    return (
      <section aria-label="Patches list" className="ui-card ui-section">
        <h2 className="ui-heading-2">Published patches</h2>
        <p className="ui-muted">{emptyStateText}</p>
      </section>
    );
  }

  return (
    <section aria-label="Patches list" className="ui-section">
      <h2 className="ui-heading-2">Published patches</h2>
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
                  {formatPatchDate(patch.publishedAt)}
                </time>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
