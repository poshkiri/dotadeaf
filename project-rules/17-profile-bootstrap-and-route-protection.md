# InterestingDeaf - Profile Bootstrap and Route Protection Rules

## Purpose
This document defines mandatory MVP rules for profile bootstrap and route protection behavior in InterestingDeaf.
The goal is to keep authentication-to-profile flow simple, secure, and maintainable in Next.js App Router with Supabase Auth.

## Project Context
- Product: InterestingDeaf (MVP platform for deaf and hard-of-hearing Dota 2 players).
- Stack context: Next.js App Router, Supabase Auth, TypeScript.
- Data context: `profiles` already exists as the application-level user profile table.

## 1) What Profile Bootstrap Means in This Project
Profile bootstrap is the minimal process of ensuring that an authenticated user has a corresponding application profile record in `profiles`.

Rules:
1. Profile bootstrap is not full onboarding.
2. Profile bootstrap exists to establish app-level user identity data separate from auth identity.
3. Profile bootstrap must remain lightweight and deterministic for MVP.

## 2) Relationship Between `auth.users` and `profiles`
1. `auth.users` is the authentication identity source of truth.
2. `profiles` is the application-level profile model used by product features.
3. One authenticated user must map to one profile record.
4. Profile data must not be collapsed into auth identity fields.
5. Access ownership must be tied to `profiles.user_id == auth user id`.

## 3) When a Minimal Profile Record Should Be Created
1. A minimal profile record should exist as early as practical after first successful authentication.
2. The system must not create duplicate profiles for the same auth user.
3. Bootstrap creation should be idempotent and safe under repeated checks.
4. If profile creation fails, the user must receive a clear retry-safe outcome.
5. Do not block all authenticated access indefinitely due to silent bootstrap failure.

## 4) What Counts as Sufficiently Completed Profile for MVP
For MVP route-gating decisions, a profile is considered sufficiently completed when:
1. The profile record exists.
2. Required minimum fields needed for core participation are present and non-empty.
3. Completion criteria are explicit, stable, and consistently enforced.

MVP rule:
1. Keep required completion fields minimal and practical.
2. Do not add broad optional-field requirements that create onboarding friction.
3. Any change to completion criteria must be deliberate and documented.

## 5) Behavior for Authenticated Users with Incomplete Profiles
1. Authenticated users with incomplete required profile data must be redirected to a minimal profile completion path.
2. Redirect behavior must be deterministic and loop-safe.
3. Users may access only the minimal routes needed to complete profile setup until completion requirements are met.
4. Do not implement a multi-step onboarding wizard at this stage.
5. Messaging must clearly explain why access is limited and what action is required.

## 6) Behavior for Unauthenticated Users Visiting Protected Routes
1. Access to protected platform routes is denied without a valid authenticated session.
2. Unauthenticated users must be redirected to login (or equivalent auth entry route).
3. Protected content must not be rendered before auth validation.
4. Behavior must remain consistent across all protected route groups.

## 7) Behavior for Authenticated Users Visiting Auth Pages
1. Authenticated users should not remain on login/register pages unnecessarily.
2. They must be redirected to the appropriate authenticated destination.
3. Destination selection must account for profile completion state (incomplete -> completion path, complete -> platform default or intended destination).
4. Redirect logic must avoid ambiguous outcomes and redirect loops.

## 8) Route Protection Expectations for MVP
1. Protected route checks must be explicit and reliable.
2. Route protection must not rely solely on client-only checks for security boundaries.
3. Authorization and ownership checks remain mandatory for protected data access.
4. Deny-by-default behavior applies when session or ownership state is uncertain.
5. Route protection must stay aligned with RLS expectations and auth architecture rules.

## 9) Maintainability and Simplicity Requirements
1. Keep route protection and profile bootstrap logic small, centralized, and easy to audit.
2. Prefer one clear protection path per route category over fragmented ad hoc checks.
3. Avoid speculative abstractions for future roles, tenants, or complex onboarding.
4. Do not introduce admin permission systems at this stage.
5. Do not overengineer middleware; use the smallest reliable approach that satisfies MVP security and UX needs.
6. Expand complexity only when validated by approved scope changes.

## 10) Security and Access-Control Non-Negotiables
1. Do not weaken access control for convenience.
2. Do not expose protected platform data to unauthenticated or unauthorized users.
3. Keep profile bootstrap and protection behavior consistent with least-privilege principles.
4. If protection behavior is uncertain, choose the stricter interpretation until clarified.

## Enforcement
1. Any implementation that violates these rules is non-compliant.
2. If conflicting requirements arise, prioritize security, access correctness, and MVP clarity.
3. If expected behavior is unclear, request clarification before implementation.
