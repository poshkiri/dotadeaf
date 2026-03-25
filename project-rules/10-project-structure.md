# InterestingDeaf - Project Structure Rules

## Purpose
This document defines the intended project structure for long-term maintainability, predictable growth, and clear ownership boundaries.
These rules are mandatory for all new files and refactoring decisions.

## 1) Top-Level Folder Structure
The project must remain organized around clear responsibilities:

- `src/app/` - Next.js App Router routes, route groups, layouts, and route-level composition only.
- `src/components/` - shared UI building blocks and layout primitives reused across routes/features.
- `src/features/` - feature-oriented modules containing domain UI, business logic, and feature-local data orchestration.
- `src/lib/` - narrowly scoped cross-cutting utilities that are not tied to a single feature domain.
- `src/services/` - integrations and service-layer adapters (for external systems or shared infrastructure workflows).
- `src/hooks/` - reusable React hooks with clear ownership and limited scope.
- `src/types/` - shared TypeScript types used across multiple features or layers.
- `src/constants/` - stable constants and enums that are not environment secrets.
- `src/config/` - app configuration definitions and non-secret runtime configuration mapping.
- `src/utils/` - small generic helpers with no hidden domain behavior.
- `src/styles/` - global style entry points and shared style-level assets only.
- `supabase/` - Supabase-related project assets (for example schema/migration workflows and platform-level Supabase structure).

Rules:
1. Do not create new top-level folders without explicit justification.
2. Place code in the narrowest valid folder first, then promote to shared locations only after real reuse.
3. Keep boundaries explicit; avoid mixed-responsibility folders.

## 2) Routing Structure (App Router)
Route organization must stay explicit and scalable:

- `src/app/(public)/` - publicly accessible pages (home, about, patch pages, player discovery pages).
- `src/app/(auth)/` - authentication routes (login, register, and related auth flows).
- `src/app/(platform)/` - authenticated product routes (dashboard, profile, messages, settings, and related platform workflows).
- `src/app/api/` - route handlers and API boundaries.

Rules:
1. Route groups must represent access context and product area, not arbitrary folder preferences.
2. Keep route files thin; route pages should compose feature modules and layout shells, not own complex logic.
3. Dynamic route segments must be used only where resource identity is truly route-driven.

## 3) Purpose of Each Major Layer
1. **Route layer (`src/app`)**: routing, params handling, metadata, and high-level composition.
2. **UI layer (`src/components`, feature UI)**: presentational elements, interaction surfaces, and visual structure.
3. **Domain layer (`src/features/<feature>/domain`)**: business rules, domain types, and feature-specific policies.
4. **Data layer (`src/features/<feature>/data` or equivalent)**: data access orchestration and persistence boundaries.
5. **Shared support layer (`src/lib`, `src/utils`, `src/services`)**: reusable support modules that do not violate feature ownership.

Each layer must keep a single primary concern.

## 4) Feature Organization Rules
Each feature should be structured for isolation and growth:

- `src/features/<feature>/components/` for feature-specific UI.
- `src/features/<feature>/domain/` for business logic and domain types.
- `src/features/<feature>/data/` (or equivalent name) for data access orchestration.
- `src/features/<feature>/lib/` for small feature-local helpers.
- `src/features/<feature>/index.ts` as the feature entry surface when needed.

Rules:
1. Keep feature internals private by default; expose only stable interfaces.
2. Do not place feature logic directly into unrelated shared folders.
3. Move code to shared locations only after repeated, proven cross-feature reuse.

## 5) Separation of UI, Business Logic, and Data Access
1. UI modules must not directly own low-level persistence or integration details.
2. Business logic must not depend on route rendering details.
3. Data access modules must enforce input/output boundaries and avoid leaking storage structure into UI.
4. Route files should coordinate layers, not replace them.
5. Keep boundary crossing explicit and traceable.

## 6) What Must Not Be Placed in Page Files
Page files must not become implementation dumping grounds.

Do not place the following directly in `page.tsx` unless trivially unavoidable:
1. Complex business rules or domain decision trees.
2. Low-level Supabase query logic and persistence details.
3. Large reusable UI blocks better owned by feature/shared components.
4. Generic utility/helper implementations.
5. Cross-cutting service orchestration.

Page files should remain small, readable composition points.

## 7) Maintainability Rules as Project Grows
1. Prefer small modules with explicit responsibility over large multi-purpose files.
2. Keep naming domain-oriented and consistent across layers.
3. Avoid speculative abstractions and premature framework complexity.
4. Prevent circular dependencies between features and shared layers.
5. Enforce strict typing boundaries between layers.
6. Keep imports clean and directionally consistent (routes -> features/shared -> lower-level helpers).
7. Refactor incrementally; do not perform broad unrelated structural edits in feature tasks.
8. Preserve architecture consistency before optimizing for short-term speed.

## 8) Enforcement
1. Structural violations must be corrected before task completion.
2. If placement is unclear, choose the simpler boundary-preserving location and request clarification.
3. Any change that weakens architectural clarity or ownership boundaries is non-compliant.
