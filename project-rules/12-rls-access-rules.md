# InterestingDeaf - MVP RLS Access Rules

## Purpose
This document defines high-level row-level security (RLS) access expectations for the MVP database schema.
These rules apply to all data access paths and must be enforced with deny-by-default behavior.

## Scope
This document covers:
- `profiles`
- `patches`
- `conversations`
- `conversation_participants`
- `messages`

## Core Access Principles
1. Access must follow least-privilege principles at all times.
2. All tables must be protected by explicit row-level access rules.
3. If access intent is unclear, deny access by default.
4. Client-side checks are not security controls; server/database enforcement is mandatory.
5. Access rules must align with MVP scope and one-to-one chat boundaries.

## Actor Model (MVP)
1. **Unauthenticated public users**: visitors without a signed-in session.
2. **Authenticated users**: signed-in users represented by Supabase Auth identity.
3. **Trusted management actors**: restricted operational/admin workflows for managing patch content.

## Table-Level RLS Expectations

### 1) `profiles`
#### Read
1. MVP may allow profile visibility for player discovery according to product policy.
2. Sensitive profile fields must not be exposed beyond intended visibility scope.

#### Write
1. Users can create and edit only their own profile.
2. Users must not create, update, or delete another user’s profile.
3. Profile ownership is defined by `profiles.user_id == auth user id`.

### 2) `patches`
#### Read
1. Public users can read only published patch entries.
2. Authenticated users can read published patch entries under the same rule as public users.
3. Unpublished patch entries must not be publicly readable.

#### Write
1. Patch creation, update, and publish-state changes are restricted to trusted management actors only.
2. Regular authenticated users must not modify patch content.

### 3) `conversations`
#### Read
1. Users can access only conversations they participate in.
2. Users must not access conversation metadata for conversations they do not participate in.

#### Write
1. Conversation creation must follow MVP one-to-one chat boundaries.
2. Users must not modify or delete unrelated conversations they do not participate in.

### 4) `conversation_participants`
#### Read
1. Users can read participant rows only for conversations they participate in.
2. Users must not enumerate participant membership outside their own conversations.

#### Write
1. Participant membership changes must be restricted to valid conversation operations.
2. Users must not add/remove arbitrary users from conversations outside allowed one-to-one flow.
3. Users can update only their own participant-scoped state (for example read markers), where applicable.

### 5) `messages`
#### Read
1. Users can read messages only inside conversations they participate in.
2. Users must not access messages from non-participant conversations.

#### Write
1. Users can send messages only inside conversations they participate in.
2. Users must not send messages on behalf of other users.
3. Message edits/deletes, if supported, must be limited to allowed ownership rules and MVP behavior.

## MVP-Specific Boundary Rules
1. One-to-one messaging boundaries must be preserved by access controls.
2. No group-chat style permission behavior should be introduced in MVP.
3. No broad “read all chat data” access for normal users is allowed.
4. Access control must not be weakened for convenience during development.

## Data Exposure and Safety Expectations
1. Return only fields required by each use case.
2. Avoid exposing operational or internal-only fields to public contexts.
3. Do not rely on hidden UI states to protect data visibility.
4. Access behavior must be predictable and auditable.

## Maintainability Guidance
1. Keep policies simple, explicit, and table-focused.
2. Prefer clear ownership and participant checks over complex multi-branch logic.
3. Reuse policy patterns only when semantics are truly identical.
4. Extend policies only when new approved MVP requirements demand it.

## Enforcement
1. Any data path that bypasses these access expectations is non-compliant.
2. If policy behavior is uncertain, choose the more restrictive interpretation until clarified.
3. Security and privacy protections are mandatory and not negotiable for MVP.
