# InterestingDeaf - Auth UI and Flow Rules

## Purpose
This document defines mandatory MVP rules for authentication UI and user authentication flows in InterestingDeaf.
The goal is to keep auth experiences clear, accessible, secure, and maintainable without adding unnecessary complexity.

## Project Context
- Product: InterestingDeaf (MVP platform for deaf and hard-of-hearing Dota 2 players).
- Stack context: Next.js App Router, TypeScript, Supabase Auth.
- This document is rules/specification only.

## 1) MVP Auth UI Scope
The MVP auth UI scope includes only:
1. Login page.
2. Registration page.
3. Email/password authentication flow.
4. Google OAuth authentication flow.
5. Post-auth redirects and profile-completion gating behavior.
6. Clear user-facing auth errors and loading states.

Out of scope for this stage:
1. VK authentication.
2. Multi-step onboarding wizard.
3. Advanced identity linking workflows.
4. Role-based auth UIs beyond standard user access.

## 2) Auth UI Principles
1. Keep auth pages clear, calm, and practical.
2. Prioritize task completion over visual decoration.
3. Do not overdesign auth pages with heavy effects or unnecessary motion.
4. Keep page structure simple and predictable.
5. Ensure consistency between login and register experiences.

## 3) Login Page Expectations
1. Login must support email/password as a primary path.
2. Login must provide Google OAuth as an alternative path.
3. Required fields and actions must be explicit and easy to scan.
4. Submission, loading, success, and failure states must be clearly visible.
5. Provide clear navigation to registration for users without an account.
6. Do not include unrelated profile or platform setup steps on the login page.

## 4) Register Page Expectations
1. Registration must support email/password account creation.
2. Registration must provide Google OAuth as an alternative path.
3. Required account-creation inputs must be explicit and minimal for MVP.
4. Submission, loading, success, and failure states must be clearly visible.
5. Provide clear navigation to login for existing users.
6. Do not add complex onboarding branching on registration pages.

## 5) Email/Password Flow Expectations
1. The flow must be straightforward and predictable.
2. Input validation must be clear and actionable for users.
3. Authentication errors must be communicated safely without exposing sensitive details.
4. The flow must not leak account-enumeration hints where avoidable.
5. Keep all behavior aligned with Supabase Auth and security constraints.

## 6) Google OAuth Flow Expectations
1. Google OAuth is supported in MVP as the only social provider.
2. OAuth initiation and return flow must be explicit and stable.
3. Failure and cancellation states must return users to a clear retry path.
4. OAuth result handling must align with the same post-auth redirect rules as email/password where applicable.
5. Do not add provider-specific UI complexity beyond what is required for a clean MVP flow.

## 7) Post-Auth Redirect Expectations
1. Redirect behavior must be deterministic and consistent.
2. Authenticated users should not remain on login/register routes unnecessarily.
3. Unauthenticated users attempting protected routes must be routed to auth entry points.
4. After successful authentication, users must be redirected to the intended destination when valid, otherwise to the default platform entry route.
5. Redirect logic must avoid loops and ambiguous routing outcomes.

## 8) Profile Completion Expectations After Registration
1. Account creation and profile completion are separate concerns.
2. Newly authenticated users with incomplete required profile data must be routed to a minimal profile completion path before full platform participation.
3. Profile-completion requirements must stay MVP-focused and limited to essential fields.
4. Do not implement a complex onboarding wizard or multi-stage guided experience at this stage.
5. Profile completion behavior must be consistent across protected routes.

## 9) Error Handling Expectations
1. Show concise, user-readable error messages for failed auth actions.
2. Error messages must explain what the user can do next.
3. Do not expose secrets, internal stack traces, or sensitive system details.
4. Distinguish validation errors from authentication failures in a user-friendly way.
5. Preserve entered form data when safe and practical to reduce user frustration.

## 10) Accessibility Expectations for Auth Forms
1. Auth forms must be keyboard-accessible end-to-end.
2. Every input must have a visible label; placeholders are supplementary only.
3. Focus states must be visible and predictable.
4. Validation and error messaging must be perceivable and clearly associated with relevant fields.
5. Color alone must not be the only signal for required fields, errors, or success states.
6. Form structure, spacing, and text hierarchy must support fast scanning and low cognitive load.

## 11) Simplicity and Maintainability Requirements
1. Keep auth UI modules small, focused, and easy to reason about.
2. Separate presentation concerns from auth flow/control logic where reasonable.
3. Avoid speculative abstractions for future providers or advanced auth journeys.
4. Reuse stable patterns between login and registration pages to reduce duplication.
5. Add complexity only when required by approved MVP scope.

## 12) Enforcement
1. Any auth UI or flow behavior that conflicts with these rules is non-compliant.
2. If a requirement is unclear, choose the safer and simpler interpretation and request clarification.
3. Security, accessibility, and clarity take priority over visual novelty.
