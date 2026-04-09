import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PatchContent, PatchLayout, getPatchTocItems } from "@/components/features/patches";
import { fetchPublishedPatchBySlug } from "@/services/patches";

type PatchPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PatchPageProps): Promise<Metadata> {
  const t = await getTranslations();
  const { slug } = await params;
  let patch = null;

  try {
    patch = await fetchPublishedPatchBySlug(slug);
  } catch {
    return {
      title: t("patches.unavailable_title"),
      description: t("patches.unavailable_desc"),
      robots: { index: false, follow: false },
    };
  }

  if (!patch) {
    return {
      title: t("patches.not_found_title"),
      description: t("patches.not_found_desc"),
      robots: { index: false, follow: false },
    };
  }

  return {
    title: patch.title_ru,
    description: t("patches.meta_desc", { title: patch.title_ru }),
  };
}

export default async function PatchDetailsPage({ params }: PatchPageProps) {
  const t = await getTranslations();
  const { slug } = await params;
  let patch = null;

  try {
    patch = await fetchPublishedPatchBySlug(slug);
  } catch {
    return (
      <main className="ui-page ui-patches-layout">
        <section className="ui-card ui-section" aria-label={t("patches.title")}>
          <h1 className="ui-heading-1">{t("patches.unavailable_title")}</h1>
          <p className="ui-muted">{t("patches.unavailable_desc")}</p>
        </section>
      </main>
    );
  }

  if (!patch) {
    notFound();
  }

  const tocItems = getPatchTocItems(patch.content_ru);

  return (
    <main className="ui-page ui-patches-layout">
      <PatchLayout tocItems={tocItems}>
        <PatchContent
          title={patch.title_ru}
          publishedAt={patch.published_at}
          content={patch.content_ru}
        />
      </PatchLayout>
    </main>
  );
}
