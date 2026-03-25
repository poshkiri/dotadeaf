import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const PATCHES_TABLE = "patches";

type PublishedPatchListRow = {
  id: string;
  slug: string;
  title_ru: string;
  published_at: string | null;
  created_at: string;
};

type PublishedPatchDetailRow = {
  id: string;
  slug: string;
  title_ru: string;
  content_ru: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PublishedPatchListItem = {
  id: string;
  slug: string;
  title_ru: string;
  published_at: string | null;
  created_at: string;
};

export type PublishedPatch = {
  id: string;
  slug: string;
  title_ru: string;
  content_ru: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function fetchPublishedPatches(): Promise<PublishedPatchListItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PATCHES_TABLE)
    .select("id, slug, title_ru, published_at, created_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch published patches: ${error.message}`);
  }

  return ((data ?? []) as PublishedPatchListRow[]).map((row) => ({
    id: row.id,
    slug: row.slug,
    title_ru: row.title_ru,
    published_at: row.published_at,
    created_at: row.created_at,
  }));
}

export async function fetchPublishedPatchBySlug(
  slug: string,
): Promise<PublishedPatch | null> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PATCHES_TABLE)
    .select("id, slug, title_ru, content_ru, published_at, created_at, updated_at")
    .eq("slug", normalizedSlug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch published patch: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const row = data as PublishedPatchDetailRow;
  return {
    id: row.id,
    slug: row.slug,
    title_ru: row.title_ru,
    content_ru: row.content_ru,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
