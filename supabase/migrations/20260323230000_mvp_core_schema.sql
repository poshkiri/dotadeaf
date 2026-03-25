-- InterestingDeaf MVP core schema
-- Scope: profiles, patches, conversations, conversation_participants, messages

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text not null check (btrim(display_name) <> ''),
  preferred_roles text[] not null default '{}',
  skill_bracket text,
  bio text,
  is_available boolean not null default false,
  last_active_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.patches (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (btrim(slug) <> ''),
  title_ru text not null check (btrim(title_ru) <> ''),
  content_ru text not null check (btrim(content_ru) <> ''),
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_message_at timestamptz
);

create table if not exists public.conversation_participants (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  last_read_message_id uuid,
  constraint conversation_participants_unique_member unique (conversation_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_user_id uuid not null references auth.users(id) on delete restrict,
  body text not null check (btrim(body) <> ''),
  created_at timestamptz not null default now(),
  edited_at timestamptz,
  constraint messages_sender_must_be_participant
    foreign key (conversation_id, sender_user_id)
    references public.conversation_participants(conversation_id, user_id)
    on delete restrict
);

alter table public.conversation_participants
  add constraint conversation_participants_last_read_message_fk
  foreign key (last_read_message_id)
  references public.messages(id)
  on delete set null;

create index if not exists idx_messages_conversation_created_at
  on public.messages (conversation_id, created_at desc);

create index if not exists idx_conversation_participants_user_id
  on public.conversation_participants (user_id);

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger set_patches_updated_at
before update on public.patches
for each row
execute function public.set_updated_at();

create trigger set_conversations_updated_at
before update on public.conversations
for each row
execute function public.set_updated_at();
