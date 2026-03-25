# InterestingDeaf - Player Search and Filters Rules

## Purpose
This document defines mandatory MVP rules for the public player search and filter experience in InterestingDeaf.
The goal is to provide a clear, reliable, and practical discovery flow for deaf and hard-of-hearing Dota 2 players without unnecessary complexity.

## Project Context
- Product: InterestingDeaf (MVP platform for deaf and hard-of-hearing Dota 2 players).
- Data source: `profiles` table is the player listing foundation.
- Scope: Public players listing is included in MVP.

## 1) Purpose of the Public Players Page
1. The public players page allows users to discover relevant players using simple, high-signal filters.
2. It must prioritize quick scanning and practical teammate discovery.
3. It must avoid exposing incomplete or low-quality profile records that reduce trust.
4. It must remain lightweight and predictable for MVP.

## 2) Listing Card Visibility Rules
Player listing cards should show only essential MVP-safe profile information:
1. Display name.
2. Rank (if provided and valid).
3. Preferred roles.
4. Language.
5. Region.
6. Looking-for-team status.
7. Short bio excerpt (optional, trimmed for readability).

Rules:
1. Do not expose internal/system fields in listing cards.
2. Do not show fields with broken/invalid/unusable values.
3. Use consistent field ordering across cards.
4. Keep cards compact and easy to compare.

## 3) MVP Filters (Required)
The MVP filter set includes only:
1. Rank.
2. Preferred role.
3. Language.
4. Region.
5. Looking-for-team.

Rules:
1. Filters must be explicit and user-readable.
2. Filter choices must map directly to available profile data.
3. Filter logic must be deterministic and easy to reason about.
4. Avoid speculative filter dimensions not required by MVP.

## 4) Text Search Expectations (If Included)
If text search is included in MVP:
1. Search scope must be narrow and explicit (for example display name and/or nickname fields if supported).
2. Search behavior must be predictable and case-insensitive where practical.
3. Search must not silently expand into fuzzy recommendations or hidden ranking logic.
4. Search and filter combinations must produce transparent results.

If text search is not implemented yet:
1. Do not fake search behavior.
2. Keep UI honest about currently available filter-only functionality.

## 5) Profile Completeness and Listing Eligibility
1. Public listing must include only sufficiently completed profiles for MVP.
2. Completion criteria must be centralized and consistent with profile-completion rules used in route/auth flows.
3. Profiles missing required completion fields must be excluded from public listing by default.
4. Do not expose partially broken profile data in discovery surfaces.

## 6) URL and Query Parameter Expectations
1. Filter state must be representable in URL query parameters.
2. Query parameter names must be stable, explicit, and predictable.
3. URLs should be shareable and restorable for the same filter state.
4. Invalid/unknown query parameters must fail safely (ignored or normalized), not break the page.
5. Default listing behavior must be well-defined when no filters are applied.

## 7) UX Expectations for Filter Controls
1. Filter controls must be easy to find and understand.
2. Active filters must be visible at a glance.
3. Users must be able to clear filters quickly.
4. Control behavior must be consistent across desktop and mobile layouts.
5. Keep interaction simple; avoid heavy client-side state orchestration when server-driven behavior is sufficient.

## 8) Empty State Expectations
1. Empty states must clearly explain that no players match the current filters/search.
2. Empty states must suggest a practical next step (for example clear filters or broaden criteria).
3. Empty-state messaging must be concise and non-technical.
4. Do not present empty states as errors when the system is functioning correctly.

## 9) Maintainability Requirements
1. Keep player search/filter logic small, explicit, and testable.
2. Separate UI rendering from query/filter construction where practical.
3. Keep filter definitions centralized to avoid duplicated logic across components/routes.
4. Prefer straightforward server-first filtering patterns over complex client-side synchronization.
5. Expand complexity only after validated product needs and explicit scope approval.

## 10) Intentionally Out of Scope for This Stage
1. Advanced recommendation/ranking systems.
2. Behavioral personalization or AI-based matching.
3. Multi-step expert search builders.
4. Saved searches, alerts, or subscription-style discovery workflows.
5. Heavy analytics-driven sorting experiments.
6. Advanced social graph relevance scoring.

## Enforcement
1. Any player search/filter behavior that conflicts with these rules is non-compliant.
2. If uncertain, choose the simpler and more transparent MVP-safe behavior.
3. Clarity, correctness, and trustworthiness take priority over novelty.
