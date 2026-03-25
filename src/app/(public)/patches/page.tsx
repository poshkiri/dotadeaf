import type { Metadata } from "next";
import Link from "next/link";
import { PatchList } from "@/components/features/patches";
import { fetchPublishedPatches } from "@/services/patches";

export const metadata: Metadata = {
  title: "Dota 2 Patches (RU)",
  description: "Russian-language Dota 2 patch notes and updates.",
};

function buildPatchSummary(title: string): string {
  const normalized = title.trim();
  if (!normalized) {
    return "Patch overview in Russian.";
  }

  return `Overview: ${normalized}`;
}

export default async function PatchesPage() {
  const patches = await fetchPublishedPatches();
  const patchItems = patches.map((patch) => ({
    slug: patch.slug,
    title: patch.title_ru,
    summary: buildPatchSummary(patch.title_ru),
    publishedAt: patch.published_at,
  }));

  return (
    <main className="ui-page ui-patches-layout">
      <header className="ui-patches-header">
        <h1 className="ui-heading-1">Dota 2 patches</h1>
        <p className="ui-muted">
          Russian-language patch updates for InterestingDeaf users.
        </p>
        <p className="ui-muted">
          <Link href="/players">Find teammates</Link> and <Link href="/register">create your profile</Link> to use the full platform.
        </p>
      </header>

      <PatchList patches={patchItems} />
    </main>
  );
}
