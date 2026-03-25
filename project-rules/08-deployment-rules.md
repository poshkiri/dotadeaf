# InterestingDeaf - Deployment Rules

## Purpose
This document defines mandatory deployment rules for InterestingDeaf across GitHub, Vercel, and Supabase.
Deployment decisions must prioritize safety, consistency, and production reliability.

## 1) Deployment Principles
1. Every deployment must be intentional, traceable, and reversible where possible.
2. Stability and user safety take priority over release speed.
3. Deploy only changes that are validated and within approved scope.
4. Keep deployment flow predictable and consistent across environments.
5. Do not treat production as a testing environment.

## 2) Environment Separation Awareness
1. Development, preview/staging, and production environments must remain clearly separated.
2. Environment-specific configuration must be explicit and correct for each target.
3. Production resources must never be used for casual development/testing activities.
4. Data boundaries between non-production and production must be respected.
5. Environment confusion is a release blocker and must be resolved before deployment.

## 3) GitHub Flow Discipline
1. GitHub history must clearly represent what is being deployed and why.
2. Deployable changes must be reviewed and scoped to approved work.
3. Do not mix unrelated work in the same deployment path.
4. Release intent, risk level, and expected impact must be clear before merge/deploy.
5. Unverified changes must not be promoted toward production.

## 4) Vercel Deployment Safety
1. Vercel deployments must use the correct environment settings and variables.
2. Preview deployments should be used to validate behavior before production promotion.
3. Production deployment must only occur after required checks pass.
4. If deployment health is uncertain, pause release and investigate before continuing.
5. Monitor immediate post-deploy behavior and be ready to respond to regressions.

## 5) Supabase Deployment and Data Safety
1. Supabase schema and data-impacting changes must be treated as high risk.
2. Database-related changes require explicit verification of compatibility with running code.
3. Protect data integrity and avoid destructive operations without approved safeguards.
4. Changes affecting permissions/policies must be reviewed for security and access impact.
5. Never apply data or schema changes in production without clear rollout intent.

## 6) Migration Caution Rules
1. All migrations must be reviewed for backward compatibility and rollback considerations.
2. Avoid risky, irreversible, or bulk-destructive migration steps without explicit approval.
3. Migration sequencing must align with application deployment order to prevent runtime breakage.
4. Validate migration impact in non-production before production execution.
5. If migration risk is unclear, stop and request explicit confirmation.

## 7) Config Consistency Rules
1. Configuration must stay consistent with architecture, environment purpose, and security rules.
2. Critical settings must be aligned across GitHub workflows, Vercel deployment config, and Supabase usage.
3. Do not introduce hidden environment drift through ad hoc config changes.
4. Config changes must be documented in deployment reporting.
5. Secret values and sensitive config must follow security policy at all times.

## 8) Pre-Deploy Validation Mindset
Before production deployment, confirm:
1. Required build, lint, and type diagnostics are successful or explicitly assessed.
2. Core user flows affected by the release are verified.
3. Known risks and unresolved issues are documented and acknowledged.
4. Environment configuration is correct for the target deployment.
5. Database and API compatibility risks are understood.

No production deployment is considered acceptable without this validation mindset.

## 9) Production Safety Checks
1. Confirm release scope and expected behavior before deployment.
2. Confirm no obvious regressions in critical user paths.
3. Confirm monitoring visibility for early detection of release issues.
4. Confirm rollback/mitigation path is known before high-impact releases.
5. If confidence is insufficient, do not deploy.

## 10) Explicit Approval for Risky Changes
No risky production changes are allowed without explicit approval.

Risky changes include, but are not limited to:
- Destructive or irreversible database operations.
- Permission/security policy changes with broad impact.
- High-risk auth/session logic changes.
- Significant infrastructure/configuration shifts.
- Changes with unknown rollback strategy.

If a change is potentially high impact and approval is not explicit, deployment must stop.

## 11) Enforcement
1. Any deployment that bypasses these rules is non-compliant.
2. If release safety cannot be demonstrated, postpone deployment.
3. Operational discipline is mandatory for every production-facing release.
