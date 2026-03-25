# InterestingDeaf - Profile UI and Edit Flow Rules

## Purpose
This document defines mandatory MVP rules for profile UI and profile edit flow in InterestingDeaf.
The goal is to keep profile experience clear, accessible, and practical for core platform participation.

## Project Context
- Product: InterestingDeaf (MVP platform for deaf and hard-of-hearing Dota 2 players).
- Stack context: Next.js App Router, TypeScript, Supabase.
- Scope context: MVP-first, no speculative social complexity.

## 1) Purpose of the Profile Page (`/profile`)
1. The profile page presents the current user’s profile information in a clear, readable format.
2. It provides a stable summary of identity and play-related fields used by MVP features.
3. It must make profile completeness and key status information easy to understand.
4. It must provide a clear path to edit/update profile data.
5. It must remain focused on user-owned profile data only.

## 2) Purpose of the Profile Edit Page (`/profile/edit`)
1. The profile edit page is the single MVP place for creating/completing/updating profile data.
2. It must support both first-time profile completion and later updates.
3. It must prioritize fast, low-friction completion of required fields.
4. It must use a simple, linear form structure.
5. It must avoid multi-step wizard behavior at this stage.

## 3) MVP Profile Fields
The MVP profile UI/edit flow supports only:
1. `display_name`
2. `preferred_roles`
3. `skill_bracket`
4. `bio`
5. `is_available`

Context-only (system-managed, not user-edited in the main form):
1. `last_active_at`
2. `created_at`
3. `updated_at`

## 4) Required vs Optional Fields
Required for MVP profile completion:
1. `display_name`

Optional for MVP:
1. `preferred_roles`
2. `skill_bracket`
3. `bio`
4. `is_available`

Rules:
1. Required status must be explicit in the form UI.
2. Optional fields must not block completion or save when validly omitted.
3. Required criteria must remain aligned with profile-completion gate rules.

## 5) Validation Expectations
1. Validation must be explicit, predictable, and easy to understand.
2. `display_name` must be non-empty after trimming.
3. Text inputs must reject invalid empty-only values for required fields.
4. Validation messages must explain what needs to be corrected.
5. Client-side validation improves UX, but server-side validation remains mandatory.
6. Validation rules must stay minimal and MVP-focused.

## 6) Accessibility Expectations for Profile Form
1. Every field must have a visible label.
2. Required/optional state must be explicit and perceivable.
3. The form must be fully keyboard-accessible.
4. Focus states must be visible and consistent.
5. Error messages must be programmatically associated with their fields.
6. Color alone must not be the only indicator of error/success/required state.
7. Form layout and spacing must support low cognitive load and fast scanning.

## 7) Error Handling Expectations
1. Errors must be shown in clear, non-technical language.
2. Field-level errors and form-level errors must be distinguishable.
3. Do not expose internal stack traces, secrets, or sensitive system details.
4. Save failures must provide a clear retry path.
5. Previously entered valid data should be preserved where practical after failed submissions.

## 8) Save and Update Behavior Expectations
1. Save behavior must be deterministic and idempotent at the user intent level.
2. The same form should support initial completion and subsequent updates.
3. On save, user feedback must clearly indicate loading, success, and failure states.
4. Updates must be scoped to the authenticated user’s own profile only.
5. Profile writes must follow access-control and ownership constraints.
6. Do not add hidden side effects unrelated to profile data update.

## 9) Post-Save Redirect Expectations
1. If profile was previously incomplete and is now sufficiently complete, redirect to the authenticated default destination (`/dashboard`) or intended valid destination by route policy.
2. If save fails or profile remains incomplete, keep user on edit flow with clear guidance.
3. Redirect outcomes must be deterministic and loop-safe.
4. Do not force unnecessary intermediate pages after successful save.

## 10) Maintainability Requirements
1. Keep profile UI and form modules small and focused.
2. Keep profile completion criteria centralized and reusable across route/auth checks.
3. Avoid duplicating validation and completion rules in multiple places.
4. Keep page files thin and delegate logic to dedicated non-page modules where reasonable.
5. Avoid speculative abstractions for post-MVP profile systems.
6. Expand profile flow complexity only with approved scope changes.

## 11) Intentionally Out of Scope for This Stage
1. Avatar upload and media processing.
2. Advanced social features (followers, endorsements, reactions, social graph).
3. Profile themes/custom skins.
4. Public profile reputation systems.
5. Complex multi-step onboarding/profile setup wizard.
6. Admin-driven profile moderation UI beyond explicitly requested scope.

## Enforcement
1. Any profile UI/edit implementation that violates these rules is non-compliant.
2. If uncertainty exists, choose the simpler and stricter MVP-safe behavior.
3. Security, accessibility, clarity, and maintainability take priority over visual complexity.
