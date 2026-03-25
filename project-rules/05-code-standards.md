# InterestingDeaf - Code Standards

## Purpose
This document defines mandatory code standards for InterestingDeaf.
The goal is long-term maintainability, clarity, and stable MVP delivery.

## 1) General Engineering Standards
1. Prefer maintainable solutions over clever solutions.
2. Keep implementation simple and aligned with MVP scope.
3. Do not introduce patterns that are too complex for current product needs.
4. Follow existing architecture and conventions before introducing new structure.
5. Every change must improve or preserve readability and reliability.

## 2) TypeScript-First Rules
1. TypeScript is mandatory for all application logic.
2. Use explicit, domain-meaningful types for data models and interfaces.
3. Prefer precise type definitions over broad or implicit typing.
4. Avoid type assertions unless they are truly required and safe.
5. Keep type definitions close to their domain boundaries, then extract to shared locations only when reuse is real.

## 3) Strict Typing Preference
1. Strict typing is the default.
2. Do not use `any` unless absolutely unavoidable and explicitly justified in context.
3. When temporary type loosening is unavoidable, isolate it to the smallest possible area and document why.
4. Prefer `unknown` over `any` when handling uncertain input and narrow it safely.
5. Treat type errors as correctness issues, not as inconveniences.

## 4) Component Structure Rules
1. Components must have one clear responsibility.
2. Keep rendering logic readable and easy to scan.
3. Move non-UI logic out of components when complexity grows.
4. Separate presentational concerns from domain/data concerns.
5. Avoid deep conditional rendering blocks; extract smaller units when needed.

## 5) File Naming Conventions
1. Use consistent, descriptive, domain-oriented file names.
2. React component files use `PascalCase`.
3. Utility/helper modules use clear `camelCase` or descriptive lowercase naming consistent with project conventions.
4. Avoid ambiguous names such as `misc`, `temp`, or `helpers2`.
5. File names must describe purpose, not implementation detail.

## 6) Import Organization
1. Keep imports ordered and grouped consistently.
2. Prefer explicit imports over wildcard patterns that reduce clarity.
3. Remove unused imports immediately.
4. Avoid circular dependencies.
5. Keep module boundaries clear; do not import across layers in ways that break architecture rules.

## 7) Readability Expectations
1. Code must be understandable by a new contributor without hidden assumptions.
2. Keep functions and modules focused, with clear inputs and outputs.
3. Use clear names for variables, functions, and types.
4. Avoid deeply nested control flow where a simpler structure is possible.
5. Prioritize explicitness when it improves maintainability.

## 8) Comment Policy
1. Comments must explain intent, constraints, or non-obvious decisions.
2. Do not add comments that restate obvious code behavior.
3. Keep comments concise, accurate, and current.
4. Remove or update comments when code changes.
5. Do not use comments to justify weak or temporary design decisions.

## 9) Dead Code Policy
1. Dead code is not allowed in committed changes.
2. Remove unused variables, functions, branches, and files.
3. Do not leave commented-out implementation blocks in source files.
4. Temporary debug code must be removed before task completion.

## 10) Duplication Restraint
1. Avoid copy-paste duplication when a clear shared abstraction exists.
2. Do not create speculative abstractions for one-time usage.
3. Extract shared logic only after meaningful repetition appears.
4. Keep shared abstractions small and understandable.

## 11) Component Size Limits
1. Avoid large components that combine many responsibilities.
2. When a component becomes difficult to scan, split it into focused subcomponents.
3. Keep business logic and view logic separated to prevent growth into monolith components.
4. Large files without clear structure are not acceptable.

## 12) Utility and Helper Organization
1. Place utilities near the feature that owns them unless reused broadly.
2. Promote helpers to shared modules only when reuse is proven.
3. Utility names must clearly describe behavior and expected input/output.
4. Helpers must not hide important domain rules behind generic naming.

## 13) Validation Rules
1. Validate external or user-provided input at system boundaries.
2. Validation must be explicit, predictable, and testable.
3. Do not rely on UI-only validation for data integrity.
4. Validation errors must be clear and actionable.
5. Keep validation logic close to the boundary where data enters the system.

## 14) Error Handling Expectations
1. Handle errors intentionally; do not silently swallow failures.
2. Return or surface clear error outcomes for expected failure paths.
3. Keep error messages safe, actionable, and appropriate to context.
4. Distinguish recoverable errors from critical failures.
5. Log or report errors where operational visibility is required.

## 15) No Quick Hacks Rule
1. Quick hacks are prohibited in production code.
2. Temporary shortcuts that reduce maintainability must not be introduced.
3. If a constrained temporary workaround is unavoidable, it must be clearly justified, isolated, and tracked for removal.
4. Delivery speed must not come at the cost of long-term code health.

## 16) Enforcement
1. Code that violates these standards must be revised before completion.
2. When trade-offs exist, choose the option that improves long-term clarity and maintainability.
3. If a requested implementation conflicts with these standards, request clarification before proceeding.
