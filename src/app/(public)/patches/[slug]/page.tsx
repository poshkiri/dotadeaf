import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PatchContent, PatchLayout, getPatchTocItems } from "@/components/features/patches";
import { fetchPublishedPatchBySlug } from "@/services/patches";

type PatchPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PatchPageProps): Promise<Metadata> {
  const patch = await fetchPublishedPatchBySlug(params.slug);

  if (!patch) {
    return {
      title: "Patch not found",
      description: "The requested patch is unavailable.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: patch.title_ru,
    description: `Russian-language Dota 2 patch details: ${patch.title_ru}`,
  };
}

export default async function PatchDetailsPage({ params }: PatchPageProps) {
  const patch = await fetchPublishedPatchBySlug(params.slug);

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
