# InterestingDeaf - Production Readiness Rules

## Purpose
This document defines mandatory production readiness rules for InterestingDeaf MVP.
It ensures safe, reliable, and secure go-live decisions for a Next.js + Supabase + Vercel stack.

## Project Context
- Product: InterestingDeaf MVP.
- Platform: Next.js App Router, TypeScript, Supabase, Vercel.
- Scope: production readiness standards for deployment, security, data access, and launch verification.

## 1) Deployment Principles
1. Production deployment must be intentional, traceable, and reversible where practical.
2. Stability and user safety take priority over release speed.
3. Deploy only validated, in-scope changes.
4. Keep release scope small and understandable.
5. Do not ship unverified behavior to production.

## 2) Environment Variable Safety
1. Environment variables are the only allowed source for runtime secrets and sensitive configuration.
2. Secret keys must remain server-only and must never be exposed in client bundles.
3. Public environment variables must contain only values safe for client exposure.
4. Missing required environment variables are release blockers.
5. Never log, print, or surface secret values in errors, diagnostics, or UI output.

## 3) Production vs Development Awareness
1. Production and development environments must be treated as separate trust and risk domains.
2. Development shortcuts must not leak into production behavior.
3. Production data and credentials must never be used for casual local testing.
4. Feature behavior must be validated in a non-production environment before production release.
5. Environment confusion is a blocker and must be resolved before launch.

## 4) Security Expectations
1. Security controls are non-negotiable and must not be weakened for convenience.
2. Apply least-privilege principles across routes, services, and database operations.
3. Deny-by-default behavior is required when access intent is uncertain.
4. All sensitive operations must enforce server-side authorization checks.
5. Security-sensitive regressions are release blockers.

## 5) RLS Importance (Supabase)
1. Row-Level Security (RLS) is mandatory for all protected tables.
2. RLS policies must align with ownership and participant boundaries defined by product rules.
3. Application logic must not assume RLS safety without policy verification.
4. Any data path that bypasses RLS expectations is non-compliant.
5. Policy changes require explicit review before production rollout.

## 6) Authentication Safety Requirements
1. Authenticated boundaries must be validated server-side for protected pages and actions.
2. Session-dependent behavior must handle missing, expired, or invalid sessions safely.
3. Sender/owner identity must come from trusted auth context, not client-provided values.
4. Auth routes and protected routes must preserve deterministic redirect behavior.
5. Auth safety regressions (session leaks, unauthorized access, identity confusion) block launch.

## 7) Data Protection Expectations
1. Return only the minimum fields required by each UI use case.
2. Protect private data from unauthorized read and write paths.
3. Sensitive and internal-only fields must not be exposed in public contexts.
4. Input validation is mandatory at server boundaries before persistence.
5. Data access must remain auditable, predictable, and ownership-scoped.

## 8) Pre-Launch Validation Mindset
1. A release is not ready until critical paths are validated with evidence.
2. Validate both success paths and key failure/empty/unauthorized paths.
3. Confirm changes did not introduce obvious regressions in adjacent flows.
4. Treat unresolved high-risk issues as blockers, not post-launch TODOs.
5. If confidence is insufficient, delay release and fix the gaps.

## 9) Mandatory Checks Before Going Live
Before production launch, verify all of the following:
1. Build, lint, and type checks complete successfully.
2. Required environment variables are present and correctly scoped (public vs server-only).
3. Authentication and protected-route boundaries behave as expected.
4. RLS policies are active and aligned with current access rules.
5. Public pages do not expose restricted or draft-only data.
6. Core MVP flows are functionally verified:
   - auth (login/register/OAuth path as configured),
   - profile read/edit,
   - players listing and filters,
   - chat list/thread/send,
   - patches list/detail (published-only behavior).
7. Known risks and limitations are documented and accepted explicitly.

## 10) Intentionally Out of Scope for This Document
1. New product feature requirements.
2. Infrastructure redesign beyond current MVP architecture.
3. Vendor migration plans.
4. Non-MVP compliance frameworks not requested for current scope.

## Enforcement
1. Any launch decision that violates these rules is non-compliant.
2. Security and data protection take priority over delivery speed.
3. If readiness is unclear, choose the safer interpretation and delay go-live until verified.
