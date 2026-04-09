-- Production hardening for MVP discovery and chat.
-- Goals:
-- 1) Keep user-generated payload sizes aligned with app limits.
-- 2) Add supporting indexes for common catalog and messaging access paths.

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'messages_body_length_check'
  ) then
    alter table public.messages
      add constraint messages_body_length_check
      check (char_length(body) <= 2000);
  end if;
end $$;

create index if not exists idx_profiles_discovery_filters
  on public.profiles (skill_bracket, language, region, is_available, updated_at desc);

create index if not exists idx_conversation_participants_conversation_id
  on public.conversation_participants (conversation_id);

create index if not exists idx_conversations_last_message_at
  on public.conversations (last_message_at desc nulls last, updated_at desc);
