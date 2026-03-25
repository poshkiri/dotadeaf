# InterestingDeaf - Technical Architecture Rules

## Purpose
This document defines mandatory architecture rules for building and evolving InterestingDeaf using the approved stack:
Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Supabase, and Vercel.

## 1) Architecture Principles
1. Keep architecture simple, explicit, and scalable for MVP growth.
2. Prefer a server-first approach whenever user experience and feature behavior allow it.
3. Minimize client-side complexity and JavaScript footprint.
4. Build with clear boundaries between UI, domain logic, and data access.
5. Introduce new dependencies only with explicit justification and measurable benefit.
6. Do not use outdated Next.js patterns.

## 2) Preferred Folder Organization
Use feature-oriented structure with shared layers:
- `src/app/` for routes, layouts, and route-level composition (App Router only).
- `src/features/<feature>/` for feature-specific UI, logic, and domain structures.
- `src/shared/` for reusable cross-feature UI primitives, utilities, and constants.
- `src/config/` for application-level static configuration.

Rules:
- Keep feature code inside its feature folder.
- Move code to `shared` only when genuinely reused across features.
- Avoid deep nesting when it does not improve clarity.

## 3) Separation of Concerns
1. Presentation concerns stay in UI components.
2. Business/domain decisions stay in feature/domain modules.
3. Data fetching and persistence logic stay in dedicated data-access modules.
4. Avoid mixing data access, business rules, and rendering in one file when a clean split is reasonable.
5. Keep each module focused on one clear responsibility.

## 4) Server vs Client Component Rules
1. Default to Server Components in App Router.
2. Use Client Components only when browser-only capabilities are required (stateful interactivity, event handling, or browser APIs).
3. Place `"use client"` only where necessary and keep client boundaries as small as possible.
4. Do not move entire pages to client components if only a small interactive area requires client behavior.
5. Keep data fetching server-side by default.

## 5) API and Data Access Boundaries
1. Route handlers and server actions must act as clear boundaries between UI and persistence.
2. UI components must not directly own low-level data access details.
3. Data access must be centralized in feature/shared data modules.
4. Validate inputs at the boundary before executing domain or persistence operations.
5. Keep API contracts clear and stable; avoid leaking internal implementation details.

## 6) Supabase Usage Principles
1. Use Supabase as the primary backend service for authentication and data storage.
2. Keep Supabase interactions in server-side contexts by default.
3. Apply least-privilege principles for queries and mutations.
4. Respect row-level security and avoid bypass-like patterns.
5. Do not hardcode secrets or credentials in source code.
6. Keep query logic predictable and easy to audit.

## 7) Naming Conventions
1. Use consistent, descriptive, domain-oriented names.
2. Components: `PascalCase`.
3. Variables/functions: `camelCase`.
4. Types/interfaces: `PascalCase`.
5. Files should follow existing project conventions and remain consistent within each layer.
6. Avoid ambiguous names such as `data`, `utils`, or `handler` when a specific name is possible.

## 8) State Management Restraint Rules
1. Keep state local by default.
2. Lift state only when needed by multiple siblings or shared flows.
3. Prefer server state from server rendering/fetching over duplicating it in client state.
4. Do not introduce global state tools unless clearly necessary and explicitly justified.
5. Avoid redundant state, derived-state duplication, and unnecessary synchronization logic.

## 9) Reusability Rules
1. Reuse only stable patterns, not speculative abstractions.
2. Extract shared components/utilities after repeated, meaningful duplication.
3. Keep reusable units small, focused, and well-named.
4. Do not create generic abstractions without at least one real reuse case.
5. Prefer composition over rigid inheritance-like structures.

## 10) Performance-Minded Defaults
1. Keep client bundles small by limiting client components and dependencies.
2. Prefer server rendering and selective hydration where appropriate.
3. Avoid unnecessary re-renders and avoid heavy work on the client.
4. Load only the data required for the current view.
5. Use lightweight animations and avoid motion patterns that degrade usability or responsiveness.

## 11) No Overengineering Rule
1. Implement only what is required for current MVP scope.
2. Avoid premature abstractions, speculative extensibility, and future-proofing not backed by requirements.
3. Choose straightforward solutions over complex frameworks or patterns.
4. When two options are viable, choose the simpler one that preserves maintainability.
