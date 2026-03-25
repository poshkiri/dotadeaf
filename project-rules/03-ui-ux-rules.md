# InterestingDeaf - UI/UX Rules

## Purpose
This document defines mandatory UI/UX rules for InterestingDeaf, a platform for deaf and hard-of-hearing Dota 2 players.
All interface decisions must prioritize accessibility, clarity, and practical usability.

## 1) Core UX Principles
1. Accessibility-first is mandatory, not optional.
2. Visual clarity always takes priority over decoration.
3. Interface style must be clean, modern, calm, and structured.
4. Information hierarchy must be obvious at first glance.
5. Interactions must be predictable and consistent across the product.
6. Cognitive load must be minimized in every key flow.

## 2) Visual Direction Constraints
1. Do not use generic blue-purple AI SaaS aesthetics by default.
2. Do not use random gradients, glowing effects, noisy backgrounds, or decorative clutter.
3. Do not rely on visual novelty to compensate for weak structure.
4. Keep surfaces, typography, spacing, and grouping clear and deliberate.
5. Strong contrast is required for all essential content and controls.
6. Brand colors are not defined here and must not be invented in this document.

## 3) Deaf and Hard-of-Hearing UX Requirements
1. Critical states and events must be communicated visually, not by sound cues.
2. Status, activity, and interaction outcomes must be explicit and persistent enough to notice.
3. Feedback messages must be clear, concise, and immediately understandable.
4. Important actions must have visible confirmation and error states.
5. Time-sensitive communication areas (such as chat) must emphasize visual readability and message state clarity.

## 4) Hierarchy, Spacing, and Readability Rules
1. Use clear heading and text hierarchy to separate primary, secondary, and meta information.
2. Preserve readable spacing between sections, controls, and content groups.
3. Avoid dense layouts that reduce scanability.
4. Keep line lengths and text blocks comfortable for reading.
5. Prioritize legible typography and explicit labels over placeholder-only communication.

## 5) Interaction and Motion Rules
1. Every interactive element must have clear default, hover/focus, active, disabled, success, and error behavior as applicable.
2. Interaction outcomes must never be ambiguous.
3. Animation is allowed only when it supports comprehension, orientation, or state change feedback.
4. Animation must not be decorative noise, must not delay task completion, and must not create distraction.
5. Motion intensity and duration must remain subtle and consistent.

## 6) Component-Specific Rules

### Forms
1. Labels are mandatory for all fields; placeholders are supplementary only.
2. Required/optional status must be explicit.
3. Validation must be immediate enough to prevent confusion and must explain how to fix errors.
4. Submit actions must clearly indicate processing, success, and failure states.
5. Form layout must remain simple, linear, and easy to scan.

### Cards
1. Cards must group related content with clear visual boundaries.
2. Card hierarchy must make primary information immediately visible.
3. Do not overload cards with excessive metadata or competing actions.
4. Action placement must be consistent across similar cards.
5. Card content must support quick comparison in list contexts (for example, player listings).

### Navigation
1. Navigation structure must be shallow, explicit, and stable.
2. Current location and available next steps must always be visually clear.
3. Navigation labels must use plain language and avoid ambiguous wording.
4. Do not hide critical navigation behind unclear icons or gestures.
5. Mobile and desktop navigation patterns must remain consistent in logic.

### Chat UI
1. Message chronology and sender distinction must be immediately clear.
2. Unread, delivered, and active states must be represented with strong visual signals.
3. Input area and send action must stay obvious and accessible at all times.
4. Chat surfaces must favor readability over dense decorative styling.
5. New message and status updates must be visually noticeable without being disruptive.

### Search and Filter UI
1. Search input must be prominent and easy to access.
2. Filters must be understandable, grouped logically, and easy to reset.
3. Active filters must be clearly visible.
4. Empty states must explain why results are missing and what to do next.
5. Result lists must support fast scanning and comparison.

### Patch Article Pages
1. Content structure must prioritize readability and comprehension.
2. Headings, sections, and metadata must clearly separate major patch topics.
3. Long text must be broken into digestible sections with consistent spacing.
4. Visual noise must be minimized to keep focus on patch information.
5. Russian-language readability quality is a core requirement for these pages.

## 7) Enforcement Rules
1. Any UI decision that reduces clarity, accessibility, or predictability must be rejected.
2. If a design choice conflicts with these rules, choose the simpler and more readable option.
3. When uncertain, prioritize structure, contrast, and user comprehension over visual flair.
