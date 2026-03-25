# InterestingDeaf - Patches System Rules

## Purpose
This document defines mandatory MVP rules for the Dota 2 patch content system in InterestingDeaf.
The system must remain simple, manually managed, and focused on high-quality Russian-language readability for deaf and hard-of-hearing users.

## Project Context
- Product: InterestingDeaf (MVP platform for deaf and hard-of-hearing Dota 2 players).
- Content type: manually created Dota 2 patch pages in Russian.
- Stack context: Next.js App Router, TypeScript, Supabase.

## 1) Purpose of the Patches System
1. Provide clear and reliable Russian-language patch information for Dota 2 players.
2. Make important game changes easy to find and understand.
3. Keep patch content workflow simple and predictable for MVP.
4. Prioritize content clarity and trust over feature breadth.

## 2) Patch Content Structure Expectations
Each patch entry must follow a consistent, content-first structure:
1. `slug` as a stable URL identifier.
2. `title_ru` as the primary Russian title.
3. `content_ru` as the main Russian body content.
4. Publication metadata (`is_published`, `published_at`) for visibility control.

Rules:
1. Patch content is manually authored and curated.
2. Content structure must remain explicit and stable.
3. Avoid speculative fields not required for MVP publishing and reading flow.
4. Keep body content organized with clear headings and sections where practical.

## 3) Patch Listing Page Expectations
1. Listing page must show only published patch entries.
2. Entries should be ordered by publication recency (newest first) where data is available.
3. Each listing item must provide enough context to choose the target patch (at minimum title and publication context).
4. Listing must support fast scanning and straightforward navigation to patch details.
5. Empty state must clearly explain when no published patches are available.

## 4) Patch Detail Page Expectations
1. Detail page must render one published patch entry by stable slug.
2. The page must prioritize readable Russian content and clear section hierarchy.
3. Unpublished or missing entries must not expose restricted content.
4. Not-found behavior must be deterministic and safe for invalid/unpublished slugs.
5. Detail page UI must stay content-focused without decorative complexity.

## 5) SEO Expectations
1. Each published patch page must have unique, meaningful metadata derived from patch content.
2. Title and descriptive metadata should clearly reflect the patch topic in Russian.
3. Canonical routing should remain stable through slug-based URLs.
4. Only published patch pages should be indexable by default.
5. SEO behavior must stay simple and aligned with App Router conventions.

## 6) Published vs Draft Behavior
1. `is_published` is the primary visibility gate for public access.
2. Draft/unpublished patches must not appear in public listings.
3. Draft/unpublished patch detail pages must not be publicly readable.
4. Publication state changes must be explicit and predictable.
5. Do not introduce complex multi-stage editorial states in MVP.

## 7) Content Readability Expectations
1. Russian-language readability is a core quality requirement.
2. Content must be structured for fast scanning: headings, short sections, and clear grouping.
3. Avoid overly dense, unstructured text blocks.
4. Terminology should remain consistent and understandable for target users.
5. Critical gameplay changes should be presented clearly and unambiguously.

## 8) Maintainability Requirements
1. Keep patch data access and rendering logic separated from unrelated feature logic.
2. Keep listing/detail behavior deterministic and easy to audit.
3. Avoid speculative abstractions for future CMS/editorial complexity.
4. Preserve simple published/draft semantics for MVP.
5. Expand patch-system complexity only with explicit post-MVP approval.

## 9) Intentionally Out of Scope for MVP
1. Admin panel for patch management.
2. Automatic patch parsing or ingestion from external sources.
3. AI-generated translation/summarization workflows.
4. Rich editorial workflow states beyond draft/published.
5. Community editing, comments, reactions, or discussion threads on patch pages.
6. Multi-game patch support beyond Dota 2.

## 10) Simplicity and Content-Focus Rule
1. The patch system must remain manually managed, Russian-language, and content-first.
2. Delivery speed must not compromise readability and correctness.
3. If uncertain, choose the simpler and safer interpretation that protects published-content quality.

## Enforcement
1. Any patches implementation that violates these rules is non-compliant.
2. If requirements are unclear, choose the stricter content-safety interpretation and request clarification.
3. Clarity, publication safety, and MVP scope discipline take priority over feature expansion.
