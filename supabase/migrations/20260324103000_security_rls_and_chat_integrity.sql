-- Security hardening migration:
-- 1) Enforce RLS policies for MVP tables
-- 2) Enforce one-to-one conversation integrity at DB level

alter table public.profiles enable row level security;
alter table public.patches enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;

-- Profiles: public read for discovery, self write only.
drop policy if exists profiles_select_public on public.profiles;
create policy profiles_select_public
  on public.profiles
  for select
  using (true);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
  on public.profiles
  for insert
  with check (auth.uid() = user_id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
  on public.profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists profiles_delete_own on public.profiles;
create policy profiles_delete_own
  on public.profiles
  for delete
  using (auth.uid() = user_id);

-- Patches: published-only public read. No public write policies.
drop policy if exists patches_select_published on public.patches;
create policy patches_select_published
  on public.patches
  for select
  using (is_published = true);

-- Conversations: only participants can read/update.
drop policy if exists conversations_select_participant on public.conversations;
create policy conversations_select_participant
  on public.conversations
  for select
  using (
    exists (
      select 1
      from public.conversation_participants cp
      where cp.conversation_id = conversations.id
        and cp.user_id = auth.uid()
    )
  );

drop policy if exists conversations_insert_authenticated on public.conversations;
create policy conversations_insert_authenticated
  on public.conversations
  for insert
  with check (auth.uid() is not null);

drop policy if exists conversations_update_participant on public.conversations;
create policy conversations_update_participant
  on public.conversations
  for update
  using (
    exists (
      select 1
      from public.conversation_participants cp
      where cp.conversation_id = conversations.id
        and cp.user_id = auth.uid()
    )
  );

-- Conversation participants:
-- - readable only by participants of same conversation
-- - insert allowed for self, or second participant only if caller is already a member
drop policy if exists conversation_participants_select_participant on public.conversation_participants;
create policy conversation_participants_select_participant
  on public.conversation_participants
  for select
  using (
    exists (
      select 1
      from public.conversation_participants cp
      where cp.conversation_id = conversation_participants.conversation_id
        and cp.user_id = auth.uid()
    )
  );

drop policy if exists conversation_participants_insert_member_flow on public.conversation_participants;
create policy conversation_participants_insert_member_flow
  on public.conversation_participants
  for insert
  with check (
    auth.uid() is not null
    and (
      user_id = auth.uid()
      or exists (
        select 1
        from public.conversation_participants cp
        where cp.conversation_id = conversation_participants.conversation_id
          and cp.user_id = auth.uid()
      )
    )
  );

drop policy if exists conversation_participants_update_own on public.conversation_participants;
create policy conversation_participants_update_own
  on public.conversation_participants
  for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists conversation_participants_delete_own on public.conversation_participants;
create policy conversation_participants_delete_own
  on public.conversation_participants
  for delete
  using (user_id = auth.uid());

-- Messages: participant read, participant send as self.
drop policy if exists messages_select_participant on public.messages;
create policy messages_select_participant
  on public.messages
  for select
  using (
    exists (
      select 1
      from public.conversation_participants cp
      where cp.conversation_id = messages.conversation_id
        and cp.user_id = auth.uid()
    )
  );

drop policy if exists messages_insert_participant_as_self on public.messages;
create policy messages_insert_participant_as_self
  on public.messages
  for insert
  with check (
    sender_user_id = auth.uid()
    and exists (
      select 1
      from public.conversation_participants cp
      where cp.conversation_id = messages.conversation_id
        and cp.user_id = auth.uid()
    )
  );

-- DB-level one-to-one conversation integrity.
alter table public.conversations
  add column if not exists participant_one_user_id uuid references auth.users(id) on delete restrict,
  add column if not exists participant_two_user_id uuid references auth.users(id) on delete restrict;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'conversations_participant_pair_order'
  ) then
    alter table public.conversations
      add constraint conversations_participant_pair_order
      check (
        participant_one_user_id is null
        or participant_two_user_id is null
        or participant_one_user_id < participant_two_user_id
      );
  end if;
end $$;

create unique index if not exists idx_conversations_unique_direct_pair
  on public.conversations (participant_one_user_id, participant_two_user_id)
  where participant_one_user_id is not null and participant_two_user_id is not null;

create or replace function public.sync_direct_conversation_pair()
returns trigger
language plpgsql
as $$
declare
  target_conversation_id uuid;
  participant_count integer;
  participant_ids uuid[];
begin
  target_conversation_id := coalesce(new.conversation_id, old.conversation_id);

  select count(*), array_agg(user_id order by user_id)
  into participant_count, participant_ids
  from public.conversation_participants
  where conversation_id = target_conversation_id;

  if participant_count > 2 then
    raise exception 'Direct conversation cannot have more than 2 participants';
  end if;

  if participant_count = 2 then
    update public.conversations
    set
      participant_one_user_id = participant_ids[1],
      participant_two_user_id = participant_ids[2]
    where id = target_conversation_id;
  else
    update public.conversations
    set
      participant_one_user_id = null,
      participant_two_user_id = null
    where id = target_conversation_id;
  end if;

  return null;
end;
$$;

drop trigger if exists sync_direct_conversation_pair_after_insert on public.conversation_participants;
create trigger sync_direct_conversation_pair_after_insert
after insert on public.conversation_participants
for each row
execute function public.sync_direct_conversation_pair();

drop trigger if exists sync_direct_conversation_pair_after_update on public.conversation_participants;
create trigger sync_direct_conversation_pair_after_update
after update on public.conversation_participants
for each row
execute function public.sync_direct_conversation_pair();

drop trigger if exists sync_direct_conversation_pair_after_delete on public.conversation_participants;
create trigger sync_direct_conversation_pair_after_delete
after delete on public.conversation_participants
for each row
execute function public.sync_direct_conversation_pair();
