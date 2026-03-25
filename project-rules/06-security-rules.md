# InterestingDeaf - Security Rules

## Purpose
This document defines mandatory security rules for InterestingDeaf as a real, production-facing web platform.
Security is non-optional and applies to every feature, change, and deployment decision.

## 1) Core Security Principles
1. Security requirements are mandatory and must never be bypassed for convenience.
2. Apply secure-by-default decisions in architecture, implementation, and operations.
3. Minimize attack surface by limiting unnecessary endpoints, permissions, and exposed data.
4. Treat all external input as untrusted by default.
5. If a change introduces security uncertainty, pause and resolve before shipping.

## 2) Authentication Safety Principles
1. Authentication flows must rely on trusted platform mechanisms and validated sessions.
2. Session handling must be explicit, consistent, and resistant to tampering.
3. Authentication state must be verified at protected boundaries.
4. Do not expose authentication tokens or session artifacts to unnecessary contexts.
5. Account-related flows must avoid user enumeration and information leakage.

## 3) Authorization Basics
1. Authorization is required for every protected resource and action.
2. Validate permissions server-side for all sensitive reads and mutations.
3. Do not rely on client-side checks as a security control.
4. Enforce deny-by-default behavior when access rules are unclear.
5. Access policies must align with least privilege and domain ownership rules.

## 4) Supabase Security Expectations
1. Supabase must be configured and used with production-grade security posture.
2. Row-level security expectations must be respected and not bypassed by convenience patterns.
3. Queries and mutations must operate under explicit authorization constraints.
4. Service-level credentials must be isolated to trusted server contexts only.
5. Supabase data access must follow clear, auditable boundaries.

## 5) Least Privilege Mindset
1. Grant only the minimum permissions required for each role, feature, and operation.
2. Reduce privilege scope for APIs, database access, and service integrations.
3. Avoid broad access policies that simplify implementation at security cost.
4. Reassess permission scope when new features are added.

## 6) Input Validation Rules
1. Validate all untrusted inputs at system boundaries.
2. Enforce expected shape, type, format, and size constraints.
3. Reject invalid input early with safe and clear error responses.
4. Validation must occur server-side even when client-side validation exists.
5. Do not pass unchecked input into queries, business rules, or output rendering paths.

## 7) Output Sanitization Rules
1. Treat all rendered dynamic content as potentially unsafe unless proven safe.
2. Sanitize or encode output according to rendering context.
3. Prevent script injection and unsafe HTML rendering paths.
4. Avoid exposing internal implementation details in user-facing error output.
5. Ensure API responses include only fields required by the caller.

## 8) Secrets and Credential Handling
1. Credentials, tokens, API keys, and secret values must never be hardcoded.
2. Secrets must never be committed to source control.
3. Secret access must be restricted to the minimum required runtime contexts.
4. Rotate and replace compromised credentials immediately when exposure is suspected.
5. Do not print secrets in logs, errors, diagnostics, or debugging output.

## 9) Environment Variable Safety
1. Use environment variables for sensitive configuration only where appropriate.
2. Keep secret environment variables server-only; never expose them to client bundles.
3. Validate required environment configuration at startup or deployment checks.
4. Do not edit environment files or secret values unless explicitly instructed.
5. Avoid permissive fallback defaults for sensitive settings.

## 10) Rate Limiting and Abuse Awareness
1. Protect high-risk actions from brute-force, spam, and abuse patterns.
2. Apply rate-limiting strategy to authentication, messaging, and search-sensitive endpoints.
3. Design endpoints with abuse resistance in mind, including resource-cost awareness.
4. Prefer fail-safe behavior when abuse signals are detected.

## 11) Abuse Prevention Mindset
1. Anticipate misuse scenarios for user-generated content and communication features.
2. Prevent obvious abuse vectors in chat and profile interactions.
3. Restrict actions that can be automated for harassment or platform disruption.
4. Escalate suspicious behavior patterns for operational review when applicable.

## 12) Secure Database Access Patterns
1. Use parameterized and safe query patterns only.
2. Scope database reads and writes to authorized user context.
3. Avoid returning excessive rows or sensitive columns by default.
4. Keep database operations predictable, explicit, and reviewable.
5. Data access logic must preserve consistency with authorization policies.

## 13) Safe File and API Practices
1. Validate file metadata and constraints before accepting or processing files.
2. Reject unsupported or unsafe file types and oversized payloads.
3. APIs must enforce authentication, authorization, validation, and safe error behavior.
4. Never trust client-provided identifiers without ownership checks.
5. Do not expose internal stack traces or sensitive operational details in API responses.

## 14) Logging and Observability Without Data Leakage
1. Log security-relevant events with enough context for incident response.
2. Do not log passwords, tokens, secrets, or sensitive personal data.
3. Use structured, minimal logging that supports investigation without over-collection.
4. Error and audit logs must preserve privacy and confidentiality expectations.
5. Diagnostic output must be safe for shared operational environments.

## 15) Non-Negotiable Security Rule
Cursor must not weaken security controls, policies, or safeguards for speed or convenience.

## 16) Enforcement
1. Any change that reduces security posture must be rejected.
2. If requirements conflict, choose the more secure option and request clarification.
3. Security review is required whenever sensitive flows, permissions, or data boundaries are modified.
