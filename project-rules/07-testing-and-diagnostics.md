# InterestingDeaf - Testing and Diagnostics Rules

## Purpose
This document defines mandatory testing and diagnostics rules for InterestingDeaf.
Verification is required after every meaningful implementation step.

## 1) Mandatory Post-Task Checks
After each meaningful task or implementation step, Cursor must verify all of the following:
1. The code builds successfully.
2. There are no obvious type errors.
3. There are no obvious lint errors.
4. The requested goal was actually completed.
5. Nearby related functionality was not obviously broken.

These checks are not optional and must be performed before task closure.

## 2) Minimum Diagnostics Expectations
1. Run the relevant diagnostics/check commands for the changed scope.
2. Include at minimum: build validation and static quality checks (lint/type checks where applicable).
3. Confirm that modified files do not introduce new obvious warnings/errors.
4. If full-project checks are too costly for each small step, run targeted checks first and run broader checks before final completion.
5. Do not skip diagnostics without explicit user instruction.

## 3) Build Validation Expectations
1. Build validation is mandatory for meaningful changes.
2. A task is not complete if the application cannot build in the expected environment.
3. If build fails, identify the failure cause and resolve it or report it clearly if blocked.
4. Do not treat unverified build status as acceptable.

## 4) Lint and Type Check Expectations
1. Lint and type checks are required quality gates.
2. New lint/type issues introduced by a change must be fixed before completion whenever feasible.
3. Existing unrelated issues may be reported separately but must not be hidden.
4. Do not suppress lint/type rules merely to pass checks unless explicitly justified and approved.

## 5) Feature Verification Expectations
1. Verify the implemented behavior against the original request, not assumptions.
2. Confirm primary success paths and key failure/empty states relevant to the change.
3. Ensure user-visible behavior matches expected UX and product rules.
4. For backend/data changes, verify that data flow and access behavior remain correct.

## 6) Regression Awareness Rules
1. Check adjacent features and integration points likely affected by the change.
2. Validate that unchanged user flows near the edited area still behave correctly at a basic level.
3. Be explicit about what was checked and what was not checked.
4. If regression risk remains, report it clearly.

## 7) Definition of Done Mindset
A task is done only when all of the following are true:
1. The requested implementation is complete.
2. Required diagnostics have been executed.
3. Build/lint/type status is known and reported.
4. Basic regression awareness checks have been performed.
5. Known issues, limitations, or risks are disclosed honestly.

## 8) Reporting Requirements
After each completed task, Cursor must provide a short implementation report that includes:
1. What was implemented.
2. Which files were changed.
3. What checks/diagnostics were run.
4. The result of each check (pass/fail or not run with reason).
5. What feature behavior was verified.
6. Any known issues, risks, or follow-up recommendations.

## 9) Honest Known-Issue Disclosure
1. Cursor must report known issues truthfully and without omission.
2. Cursor must not claim checks were run when they were not run.
3. Cursor must not claim completion when validation is incomplete.
4. If blocked, report blocker cause, impact, and next required action.

## 10) Enforcement
1. Any task closed without required verification is considered incomplete.
2. If constraints prevent full verification, clearly state the gap and residual risk.
3. Quality confidence must be evidence-based, not assumed.
