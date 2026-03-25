# InterestingDeaf - MVP Route Access Matrix

## Purpose
This document defines strict route access rules for the MVP.
It establishes who can access which route groups and what behavior is required for boundary cases.

## Route Classification

### 1) Public Routes
Public routes are accessible without authentication.

Examples:
- Home page and public informational pages.
- Public patch pages (published entries only).
- Public player discovery views if enabled by product policy.

Rules:
1. Public routes must not expose protected account or conversation data.
2. Unpublished or restricted content must not be exposed through public routes.
3. Public routes may be visible to authenticated users as normal.

### 2) Auth Routes
Auth routes handle sign-in and registration flows.

Examples:
- `/login`
- `/register`

Rules:
1. Auth routes must be available to unauthenticated users.
2. Auth routes must not expose protected platform data.
3. Auth routes are transitional entry points, not destination pages for authenticated users.

### 3) Protected Platform Routes
Protected routes require a valid authenticated session.

Examples:
- `/dashboard`
- `/profile`
- `/profile/edit`
- `/messages`
- `/messages/[id]`
- `/settings`

Rules:
1. Protected routes must enforce authentication at trusted route boundaries.
2. Unauthorized requests must not render protected content.
3. Protected routes must remain inaccessible to users without a valid session.

## Access Behavior Matrix

### Unauthenticated User -> Public Route
- Access: allowed.
- Behavior: render public content only.

### Unauthenticated User -> Auth Route
- Access: allowed.
- Behavior: render auth flow (login/register).

### Unauthenticated User -> Protected Platform Route
- Access: denied.
- Behavior: redirect to login (or equivalent explicit auth-required flow).
- Security rule: never render protected page content before auth validation.

### Authenticated User -> Public Route
- Access: allowed.
- Behavior: render public route normally.

### Authenticated User -> Auth Route (`/login`, `/register`)
- Access: transitional only; do not keep user in auth flow unnecessarily.
- Behavior: redirect authenticated users to the platform default entry route.
- Rule: avoid presenting login/register as the primary destination when a valid session exists.

### Authenticated User (Profile Complete) -> Protected Platform Route
- Access: allowed, subject to route-level authorization boundaries.
- Behavior: render requested protected page.

### Authenticated User (Profile Incomplete) -> Protected Platform Route
- Access: restricted until required profile completion steps are done.
- Behavior: redirect to profile completion/edit flow until minimum required profile data exists.
- Rule: keep this gate minimal and MVP-focused; do not introduce complex onboarding branching.

## Messages and Settings Access Boundaries

### Messages Area (`/messages`, `/messages/[id]`)
1. Access requires authentication.
2. Conversation thread access requires participant membership in the target conversation.
3. Users must not view or interact with conversations where they are not participants.
4. Listing and thread access must be scoped to the current user’s allowed conversation set.

### Settings Area (`/settings`)
1. Access requires authentication.
2. Settings operations are scoped to the current user’s own account/profile context.
3. No cross-user settings access is allowed.
4. MVP settings must remain user-scoped and simple; no admin settings surface is included.

## Profile Completion Gate Expectations
1. Minimum profile completion is a required gate for full platform participation.
2. Gate criteria must be explicit and limited to MVP-required profile fields.
3. Profile completion checks must be consistent across protected routes.
4. Do not add multi-step, role-based, or speculative onboarding complexity.

## Enforcement Rules
1. Route access must default to deny when session or ownership checks are uncertain.
2. Route boundaries must align with authentication and RLS expectations.
3. Any route behavior that exposes protected data without required checks is non-compliant.
4. If route classification or behavior is unclear, choose the more restrictive option and request clarification.
