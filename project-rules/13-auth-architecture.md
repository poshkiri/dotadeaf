# InterestingDeaf - Authentication Architecture Rules

## Purpose
This document defines the mandatory MVP authentication architecture for InterestingDeaf.
The architecture must remain simple, production-minded, and aligned with approved product scope.

## Project Context
- Product type: MVP platform for deaf and hard-of-hearing Dota 2 players.
- Stack context: Next.js App Router, Supabase, TypeScript.

## 1) Authentication System of Record
1. Supabase Auth is the only authentication system for MVP.
2. Authentication identity must be sourced from `auth.users`.
3. Application-level profile data must remain separate from authentication identity data.
4. Do not introduce parallel auth systems or duplicated identity stores.

## 2) Approved MVP Authentication Methods
The MVP supports only:
1. Email/password authentication.
2. Google OAuth authentication.

Rules:
1. No additional providers are allowed unless explicitly approved in scope.
2. VK is explicitly out of scope for this stage.
3. Auth method behavior must be consistent with session and route protection rules.

## 3) Profile Model Separation
1. `profiles` is the application-level user profile model and must remain separate from `auth.users`.
2. One auth user must map to one profile record.
3. Product profile attributes (for example display name, role preferences, skill bracket, bio, availability) belong in `profiles`, not in auth identity tables.
4. Auth architecture must not blur identity and profile responsibilities.

## 4) Public vs Protected Route Expectations
1. Public routes are accessible without authentication (for example public content pages and published patch pages).
2. Protected routes require a valid authenticated session.
3. Auth routes (login/register) must remain accessible and predictable for unauthenticated users.
4. Access boundaries must be explicit and consistently enforced across route groups.

## 5) Post-Registration Profile Completion Expectations
1. Registration completes account creation, but application onboarding requires profile completion.
2. New users are expected to complete essential profile fields before full participation in core platform flows.
3. Profile completion flow must stay minimal and task-focused for MVP.
4. Do not overengineer onboarding steps, branching flows, or gamified progression.

## 6) Route Protection Expectations
1. Protected routes must enforce authentication checks at server-validated boundaries.
2. Route protection must not rely solely on client-side UI behavior.
3. Unauthorized access attempts must resolve predictably (for example redirect to login or explicit deny behavior by policy).
4. Route protection logic must remain simple and auditable.

## 7) Session-Awareness Expectations
1. Session state must be treated as a first-class runtime concern in protected experiences.
2. Authenticated flows must react safely to missing, expired, or invalid sessions.
3. Session handling must prioritize correctness and data protection over convenience.
4. Session-aware behavior must remain consistent across route groups and data access paths.

## 8) Security-Minded Authentication Principles
1. Apply least-privilege and deny-by-default access behavior.
2. Never expose sensitive credentials, tokens, or auth artifacts to unsafe contexts.
3. Validate authentication state for sensitive operations at trusted server/data boundaries.
4. Avoid account enumeration signals and unnecessary auth error detail exposure.
5. Keep authentication and authorization concerns explicit and separate.

## 9) Intentionally Out of Scope for This Stage
The following are explicitly out of scope for MVP auth architecture:
1. VK authentication provider.
2. Admin role model and admin-only role hierarchy.
3. Complex multi-step onboarding frameworks.
4. Advanced identity orchestration beyond email/password and Google OAuth.
5. Multi-tenant or organization-level access models.

## 10) Simplicity and Maintainability Rules
1. Choose straightforward auth flows over complex extensibility patterns.
2. Avoid speculative abstractions for future providers or role systems.
3. Keep auth boundaries clear between routes, session checks, and profile completion requirements.
4. Expand auth architecture only when explicitly approved by product scope.

## Enforcement
1. Any auth change that conflicts with these rules is non-compliant.
2. If implementation pressure conflicts with security or scope boundaries, security and scope rules take priority.
3. If requirements are unclear, request clarification before introducing architectural changes.
