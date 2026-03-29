import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PatchList } from "@/components/features/patches";
import { fetchPublishedPatches } from "@/services/patches";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("seo.patches_title"),
    description: t("seo.patches_description"),
  };
}

function buildPatchSummary(
  title: string,
  fallback: string,
  formatSummary: (patchTitle: string) => string,
): string {
  const normalized = title.trim();
  if (!normalized) {
    return fallback;
  }

  return formatSummary(normalized);
}

export default async function PatchesPage() {
  const t = await getTranslations();
  const patches = await fetchPublishedPatches();
  const patchItems = patches.map((patch) => ({
    slug: patch.slug,
    title: patch.title_ru,
    summary: buildPatchSummary(
      patch.title_ru,
      t("patches.overview_fallback"),
      (patchTitle) => t("patches.overview_prefix", { title: patchTitle }),
    ),
    publishedAt: patch.published_at,
  }));

  return (
    <main className="ui-page ui-patches-layout">
      <header className="ui-players-header">
        <div className="ui-players-header-accent" aria-hidden />
        <h1 className="ui-players-title">{t("patches.title")}</h1>
        <p className="ui-players-subtitle">{t("patches.subtitle")}</p>
        <p className="ui-patches-lead">
          <Link href="/players">{t("patches.lead_before")}</Link>.{" "}
          <Link href="/register">{t("about.create_account")}</Link>.{" "}
          {t("patches.lead_after")}
        </p>
      </header>

      <PatchList patches={patchItems} />
    </main>
  );
}
