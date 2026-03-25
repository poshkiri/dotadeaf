-- Add missing MVP profile fields to public.profiles.
-- These columns are intentionally nullable with no default:
--   - Existing rows before this migration will have null values, which is safe.
--   - App-layer validation enforces presence for new submissions.
--   - Backward-compatible: no existing data is removed or modified.

alter table public.profiles
  add column if not exists dota_nickname text,
  add column if not exists language text,
  add column if not exists region text;
