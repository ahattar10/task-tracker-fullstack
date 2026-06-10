# Day Completion Gate (Industry Standard)

Purpose: provide a repeatable quality gate so a day is marked complete only when scope, tests, evidence, and documentation are all verified.

Use this at the end of every work day.

## Principles

- Traceability: each completed roadmap item must map to evidence.
- Reproducibility: another developer can rerun validation from documented steps.
- Verifiability: completion is based on observed results, not memory.
- Auditability: all decisions and outcomes are recorded in docs.

## Required Inputs

Before running this gate, ensure these exist for the current day:

- Day checklist file in docs.
- Day evidence log file in docs.
- Updated roadmap status for completed scope.
- Any scripts or commands used for validation.

## Day Completion Criteria

All criteria must be true.

1. Scope Complete
- Every planned item for the day is either complete or explicitly deferred.
- No silent skips.

2. Validation Complete
- Required runtime checks completed.
- API/UI behavior verified for that day's scope.
- Any failing checks either fixed or explicitly documented with blocker notes.

3. Evidence Complete
- Evidence log includes:
  - date/time and environment
  - commands executed
  - expected result
  - actual result
  - pass or fail per check
  - notes for anomalies and resolutions

4. Documentation Complete
- Checklist reflects final state.
- Evidence log is linked from index/readme where appropriate.
- Roadmap reflects accurate completion state.

5. Source Control Complete
- Relevant changes committed.
- Branch is synced with remote.
- Working tree is clean unless there is an intentional and documented reason not to be clean.

## End-of-Day Gate Checklist

Run this in order and mark each item.

- [ ] Day checklist reviewed and updated.
- [ ] Day evidence log completed with command/output summaries.
- [ ] Validation checks rerun for final confirmation.
- [ ] Roadmap status updated.
- [ ] Doc index/readme links updated if new docs were added.
- [ ] Binder parity reviewed for shared docs.
- [ ] Git status reviewed and clean.
- [ ] Final summary written: what was done, what remains, risks/blockers.

## Pass/Fail Rules

Pass:
- All End-of-Day Gate Checklist items are checked.
- No unresolved critical blocker is hidden.

Fail:
- Any required item missing.
- Any required validation not executed.
- Evidence log incomplete or inconsistent with checklist/roadmap.

If fail, day remains in-progress and cannot be marked complete.

## Evidence Log Standard Format

Use docs/day-evidence-log-template.md for each day.

Minimum entries:

- Scope section
- Preconditions section
- Validation run table
- Final verdict section
- Next-day handoff notes

## Recommended Command Set (Quick Audit)

Run from repository root.

```powershell
git status --short
git branch --show-current
git fetch --all --prune
```

If docs were updated and binder mirror is expected, run your parity check process before closing the day.

## Sign-Off Block

Copy this block into each day's evidence log.

- Day: DAY-X
- Gate Result: PASS or FAIL
- Reviewed By: <name>
- Date: YYYY-MM-DD
- Notes: <brief summary>
