# InterestingDeaf - UI Finalization and Polish Rules

## Purpose
This document defines mandatory MVP rules for the final UI and design polish stage in InterestingDeaf.
The goal is to improve consistency, readability, and perceived product quality without changing core product scope or introducing major new behavior.

## Project Context
- Product: InterestingDeaf (MVP platform for deaf and hard-of-hearing Dota 2 players).
- Stack context: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion.
- Stage intent: visual and interaction polish for existing MVP flows.

## 1) Purpose of the UI Finalization Stage
1. Refine the existing MVP interface into a cohesive, mature, and trustworthy product experience.
2. Eliminate obvious visual inconsistency and UI rough edges across current pages.
3. Improve clarity, readability, and usability in critical user flows.
4. Preserve current feature boundaries and avoid functional scope expansion.
5. Treat this stage as quality consolidation, not product redefinition.

## 2) Visual Consistency Expectations
1. Use a stable visual language across all route groups and key surfaces.
2. Standardize repeated patterns for page headers, cards, forms, lists, and empty states.
3. Keep visual hierarchy clear and predictable at first glance.
4. Ensure similar interaction patterns look and behave similarly.
5. Remove one-off styling decisions that reduce coherence.

## 3) Typography Consistency Expectations
1. Apply a consistent type scale for headings, subheadings, body text, labels, and metadata.
2. Keep typography readable, calm, and functional; avoid decorative text treatments.
3. Preserve clear contrast and legible line length for long-form content.
4. Use font weight and emphasis intentionally, not excessively.
5. Ensure typography supports rapid scanning in list-heavy and form-heavy screens.

## 4) Spacing and Layout Rhythm Expectations
1. Follow one consistent spacing rhythm across page sections and component internals.
2. Preserve predictable vertical flow between heading, context text, content, and actions.
3. Avoid cramped layouts and avoid excessive empty space without hierarchy value.
4. Keep alignment and grouping rules stable across related screens.
5. Ensure responsive layouts preserve readability and interaction clarity.

## 5) Shared Component Consistency Expectations
1. Reuse shared components and variants before creating custom one-off UI.
2. Keep component state behavior consistent (default, hover/focus, active, disabled, loading, error).
3. Align similar components with the same spacing, radii, and visual density rules.
4. Consolidate duplicate UI patterns into existing shared components when practical.
5. Do not introduce speculative component systems beyond current MVP needs.

## 6) Accessibility and Readability Expectations
1. Accessibility remains mandatory in final polish stage.
2. Ensure keyboard navigation and visible focus states across all interactive areas.
3. Keep label clarity, field association, and error readability explicit in forms.
4. Do not rely on color alone for critical status or validation meaning.
5. Preserve content readability for deaf and hard-of-hearing users through clear visual feedback and stable message hierarchy.

## 7) Restrained Animation Expectations
1. Animation must support comprehension, orientation, or state change only.
2. Keep motion subtle, short, and non-disruptive.
3. Avoid decorative or attention-seeking animation that slows task completion.
4. Use Framer Motion only where it improves UX clarity in existing flows.
5. Keep animation behavior consistent across similar interactions.

## 8) Anti-Generic-AI Aesthetic Guidance
1. Do not use default blue-purple AI SaaS styling patterns.
2. Do not add noisy gradients, glows, glossy effects, or decorative visual clutter.
3. Avoid trend-driven visuals that reduce product trust or readability.
4. Keep the interface mature, calm, modern, and product-focused.
5. Prefer restrained visual decisions that reinforce clarity and utility.

## 9) Maintainability Expectations
1. Keep polish changes incremental and easy to review.
2. Avoid broad rewrites or structural churn during visual refinement.
3. Maintain clear separation between presentation changes and business/data logic.
4. Preserve existing architecture and naming conventions.
5. Ensure style and component decisions are reusable and easy to audit over time.

## 10) Intentionally Out of Scope for This Stage
1. Full product redesign from scratch.
2. Major new product features or workflow expansions.
3. Large architecture refactors unrelated to UI consistency.
4. Experimental visual systems with unclear product value.
5. Heavy animation systems or highly stylized visual effects.
6. Rebranding efforts requiring new product identity strategy.

## 11) Execution Discipline for Final Polish
1. Prioritize high-impact consistency issues in core MVP flows first.
2. Apply the smallest effective change that improves clarity and quality.
3. Validate that polish work does not regress accessibility or usability.
4. If a polish change risks scope growth, defer it unless explicitly approved.

## Enforcement
1. Any final polish change that introduces noisy visuals, generic AI styling, or scope expansion is non-compliant.
2. If trade-offs arise, prioritize readability, accessibility, and consistency over novelty.
3. When uncertain, choose the simpler and more restrained design decision.
