# InterestingDeaf - Agent Workflow Rules

## Purpose
This document defines the mandatory workflow Cursor must follow for all tasks in the InterestingDeaf project.
The workflow is strict, task-bounded, and quality-driven.

## Mandatory Workflow (Execute in Order)
1. **Read project rules first**  
   Read all files in `/project-rules/` before starting implementation.

2. **Restate the task briefly**  
   Provide a concise restatement of the requested task to confirm scope and intent.

3. **Identify affected files**  
   Determine and state which files should be changed for this task.

4. **Make the smallest reasonable change**  
   Implement the minimal change required to complete the task correctly.

5. **Avoid unrelated edits**  
   Limit modifications strictly to task-relevant files and lines.

6. **Run diagnostics/checks**  
   Execute relevant checks after meaningful changes (build, lint/type, and targeted verification as applicable).

7. **Report what changed**  
   Provide a short implementation report listing changed files and key updates.

8. **Report task completion status**  
   Explicitly state whether the requested goal was completed.

9. **Report risks or remaining issues**  
   Disclose known risks, limitations, incomplete validations, or follow-up needs.

## Additional Operational Constraints
1. Do not silently refactor unrelated parts of the codebase.
2. Do not rename files unless it is necessary for the requested task.
3. Do not introduce new dependencies without clear need and explicit justification.
4. Do not continue into the next task automatically.
5. Stop after completing the requested task and reporting results.

## Scope and Discipline Rules
1. Stay within the explicit task boundary.
2. Do not add unrequested features or speculative improvements.
3. If required context is missing, request clarification instead of making assumptions.
4. If a potentially risky change is discovered, surface it clearly before proceeding.

## Completion Standard
A task is complete only when:
- The requested change is implemented.
- Required checks have been run or clearly reported if blocked.
- Results, completion status, and known risks are explicitly reported.
