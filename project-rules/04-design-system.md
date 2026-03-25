# InterestingDeaf - Design System Rules

## Purpose
This document defines mandatory design system rules for InterestingDeaf.
The system must remain modern, mature, trustworthy, and product-focused.

## 1) Design Direction
1. The visual system must prioritize usability and credibility over novelty.
2. Avoid generic AI-generated visual aesthetics.
3. Avoid excessive gradients, heavy glow effects, and decorative noise.
4. Avoid overdecorated UI and unnecessary visual complexity.
5. Maintain a consistent, calm, and professional product appearance across all screens.

## 2) Typography Principles
1. Typography must communicate hierarchy clearly and consistently.
2. Use a limited, intentional type scale with distinct levels for headings, body, labels, and metadata.
3. Body text must prioritize readability at common viewport sizes.
4. Font weights must be used purposefully; avoid excessive variation.
5. Do not use typography styling as decoration.
6. Text alignment and spacing must support fast scanning.

## 3) Spacing Scale Principles
1. Use a single consistent spacing scale across the product.
2. Spacing must be systematic, not improvised per screen.
3. Internal component spacing and external layout spacing must follow the same rhythm rules.
4. Dense interfaces are acceptable only when readability and interaction clarity are preserved.
5. Related items should be visually grouped; unrelated items should have clear separation.

## 4) Border Radius Consistency
1. Border radius values must come from a small, predefined set.
2. Similar component categories must share the same radius behavior.
3. Do not mix many radius styles in one screen.
4. Extremely rounded or stylized radius treatments are not allowed unless explicitly approved.

## 5) Shadow Restraint
1. Shadows must be subtle and functional, used primarily for layering and focus cues.
2. Use a minimal shadow scale and keep it consistent.
3. Avoid dramatic shadows that create visual noise or a "floating card stack" aesthetic.
4. If hierarchy is clear without a shadow, prefer no shadow.

## 6) Component Consistency Rules
1. Components must behave and appear consistently across all features.
2. Similar interactions must use the same component patterns.
3. Variants must be intentional and limited; avoid one-off visual exceptions.
4. States (default, hover/focus, active, disabled, loading, error, success) must be clearly defined and consistent.
5. Do not redesign existing component patterns without a product-wide reason.

## 7) Icon Usage Rules
1. Icons must support comprehension, not decoration.
2. Use one icon style family consistently across the product.
3. Icons must be recognizable, simple, and legible at small sizes.
4. Do not use icons as the only source of meaning for critical actions or statuses.
5. Paired text labels are required when icon meaning may be ambiguous.

## 8) Visual Rhythm Rules
1. Layout rhythm must be consistent across pages and components.
2. Repeated structures should align to predictable spacing and sizing patterns.
3. Headings, supporting text, and actions must follow a stable order.
4. Avoid abrupt visual breaks caused by inconsistent density or sizing.
5. Rhythm must support calm scanning and fast task completion.

## 9) Responsive Behavior Expectations
1. Responsive behavior must preserve hierarchy, readability, and task flow.
2. Components must adapt gracefully without collapsing into clutter.
3. Touch targets and interactive controls must remain usable on smaller screens.
4. Content reflow must avoid hidden critical actions.
5. Mobile and desktop experiences should differ by layout, not by core interaction logic.

## 10) Component-Specific Rules

### Buttons
1. Button hierarchy (primary, secondary, tertiary, destructive) must be explicit and consistent.
2. Primary actions must be visually clear but not visually aggressive.
3. Button sizing must be consistent across contexts.
4. Disabled and loading states must be unambiguous.
5. Avoid stylistic button variants that do not map to a product need.

### Inputs
1. Inputs must have clear labels, visible boundaries, and predictable states.
2. Field states (focus, error, disabled, success) must be clearly distinguishable.
3. Validation messaging must be concise and actionable.
4. Input density must support readability and reduce entry errors.
5. Do not rely on placeholder text as a label replacement.

### Cards
1. Cards must group related information with a clear hierarchy.
2. Card content must avoid clutter and competing focal points.
3. Action placement in cards must be consistent.
4. Card styling must remain restrained and not overly ornamental.
5. Card variants should be limited to meaningful use cases.

### Badges
1. Badges are for compact status/category signals only.
2. Badge meanings must be consistent across the product.
3. Badge styling must remain subtle and legible.
4. Overuse of badges is not allowed.
5. Badge contrast must support quick recognition.

### Modals
1. Use modals only for focused, high-importance tasks.
2. Modal content must be concise, scannable, and action-oriented.
3. Each modal must present a clear primary action and clear dismissal path.
4. Modals must not contain excessive nested flows.
5. Background context should remain visually subordinate while modal is open.

### Empty States
1. Empty states must explain why content is missing.
2. Empty states must provide a clear next step where applicable.
3. Messaging must be direct, calm, and non-generic.
4. Visual treatment must be simple and consistent with product tone.
5. Empty states must reduce confusion, not fill space decoratively.

## 11) Future Color Selection Rules (No Final Palette Yet)
1. Define colors later based on accessibility, readability, and product trustworthiness.
2. Choose a restrained palette with clear semantic roles (background, text, border, accent, status).
3. Ensure color contrast supports accessibility standards for text and interactive elements.
4. Reserve strong accent usage for meaningful actions and key states.
5. Avoid trend-driven palettes that weaken professional tone or long-term consistency.
6. Color decisions must support hierarchy and usability first, branding second.

## 12) Enforcement
1. Any visual decision that reduces clarity, consistency, or trust must be rejected.
2. When in doubt, choose the simpler and more restrained design option.
3. The design system is a product quality tool, not a place for visual experimentation.
