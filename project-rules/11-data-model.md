# InterestingDeaf - MVP Data Model Specification

## Purpose
This document defines the mandatory MVP data model for InterestingDeaf.
It sets clear entity boundaries, relationships, and constraints for a simple, maintainable Supabase-based schema.

## Scope
The MVP data model includes only:
- Supabase Auth users (`auth.users`) as the authentication source.
- `profiles`
- `patches`
- `conversations`
- `conversation_participants`
- `messages`

No additional product-domain tables are included in this specification.

## Core Modeling Principles
1. Keep schema design simple, explicit, and aligned with MVP goals.
2. Use `auth.users` for authentication identity only; business profile data must live outside auth tables.
3. Favor clear one-purpose entities over broad multi-purpose tables.
4. Do not introduce speculative structures for post-MVP features.
5. Preserve strict ownership and access boundaries for user-generated data.

## 1) Authentication Source: `auth.users`
### Purpose
- Source of truth for user authentication and account identity managed by Supabase Auth.

### Usage Rules
1. Authentication data must not be duplicated into application tables unless required for app behavior.
2. Application profile attributes must not be stored directly in `auth.users`.
3. Application entities referencing a user identity must reference the auth user identifier.

## 2) `profiles`
### Purpose
- Stores product-facing user profile information for discovery and interaction.
- Must be separate from `auth.users`.

### Required Fields
- `id` (primary key, UUID).
- `user_id` (foreign key to `auth.users.id`, unique).
- `display_name`.
- `preferred_roles` (MVP-compatible representation for Dota 2 role preferences).
- `skill_bracket` (MVP-compatible representation).
- `bio` (short profile description).
- `is_available` (simple activity/availability status).
- `last_active_at`.
- `created_at`.
- `updated_at`.

### Constraints and Uniqueness
1. Exactly one profile per auth user (`user_id` unique).
2. `display_name` is required.
3. Timestamps are required for auditability and ordering.
4. Keep optional fields minimal; avoid profile bloat in MVP.

## 3) `patches`
### Purpose
- Stores manually managed Russian-language Dota 2 patch content entries.

### Required Fields
- `id` (primary key, UUID).
- `slug` (unique, URL-safe identifier).
- `title_ru`.
- `content_ru`.
- `published_at`.
- `created_at`.
- `updated_at`.
- `is_published` (boolean publication status).

### Constraints and Uniqueness
1. `slug` must be unique.
2. `title_ru` and `content_ru` are required for published entries.
3. Patch content is manually managed; no automated ingestion assumptions in MVP.
4. Only Dota 2 patch content is allowed in MVP.

## 4) `conversations`
### Purpose
- Represents one-to-one personal chat threads between exactly two users.

### Required Fields
- `id` (primary key, UUID).
- `created_at`.
- `updated_at`.
- `last_message_at` (nullable before first message).

### Constraints and Uniqueness
1. Conversations are one-to-one only for MVP.
2. Group chat semantics are out of scope.
3. Conversation identity should remain stable across repeated user interactions.

## 5) `conversation_participants`
### Purpose
- Maps users to conversations with participant metadata.

### Required Fields
- `id` (primary key, UUID).
- `conversation_id` (foreign key to `conversations.id`).
- `user_id` (foreign key to `auth.users.id`).
- `joined_at`.
- `last_read_message_id` (nullable reference to `messages.id` for read state).

### Constraints and Uniqueness
1. Unique pair on (`conversation_id`, `user_id`) to prevent duplicate membership rows.
2. For MVP one-to-one conversations, each conversation must have exactly two participants.
3. A user must not appear more than once in the same conversation.

## 6) `messages`
### Purpose
- Stores message entries inside conversations.

### Required Fields
- `id` (primary key, UUID).
- `conversation_id` (foreign key to `conversations.id`).
- `sender_user_id` (foreign key to `auth.users.id`).
- `body` (message text content).
- `created_at`.
- `edited_at` (nullable).

### Constraints and Uniqueness
1. Each message belongs to exactly one conversation.
2. `sender_user_id` must be a participant of the referenced conversation.
3. Empty message bodies are not allowed.
4. Message ordering must be deterministic by timestamp and stable tie-breaking rule.

## Entity Relationships
1. `auth.users` 1 -> 1 `profiles` (via `profiles.user_id`, unique).
2. `conversations` 1 -> many `conversation_participants`.
3. `auth.users` 1 -> many `conversation_participants`.
4. `conversations` 1 -> many `messages`.
5. `auth.users` 1 -> many `messages` (as sender).
6. `conversation_participants.last_read_message_id` -> `messages.id` (optional read marker).

## High-Level Access Control Expectations
1. Users can read and update only their own profile unless a profile view is intentionally public by product policy.
2. Users can access conversation and message data only if they are participants in that conversation.
3. Users can create messages only in conversations where they are participants.
4. Patch entries are read-accessible for public pages when published.
5. Patch creation/update/publishing operations are restricted to trusted management workflows.
6. Apply least-privilege defaults and deny-by-default behavior for uncertain cases.

## Intentionally Out of Scope for MVP
The following are explicitly excluded from this data model:
1. Tournament-related tables.
2. Team/clan/guild tables.
3. Advanced statistics integration tables.
4. Multi-game domain abstractions.
5. Group conversation models.
6. AI-related entities.
7. Complex social graph tables beyond one-to-one chat needs.

## Maintainability Guidance
1. Add new entities only when a concrete MVP requirement cannot be solved with the existing model.
2. Avoid polymorphic table patterns and generic entity buckets.
3. Keep naming explicit and domain-oriented.
4. Keep schema migrations small, reviewable, and reversible where possible.
5. Preserve separation between authentication identity (`auth.users`) and product profile data (`profiles`).
6. Revisit schema design after MVP only when justified by validated product needs.

## Enforcement
1. Any schema change that conflicts with this specification requires explicit approval.
2. Any attempt to add out-of-scope entities is non-compliant for MVP.
3. Simplicity, correctness, and access control safety take priority over speculative extensibility.
