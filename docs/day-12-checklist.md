# Day 12 Checklist - CI/CD (GitHub Actions)

## Objective
Add a repeatable GitHub Actions CI pipeline that runs backend and frontend verification automatically on push and pull request events.

## Estimated Time
3 to 6 hours

## Difficulty
Medium-Hard

---

## Agreed Build Decisions (Locked from Day 11)

- Day 11 automated tests are PASS and should remain the validation baseline
- CI should run the existing backend and frontend test commands without expanding product scope
- Keep the pipeline deterministic and fast enough for routine pushes
- Optional linting is allowed only if it does not block the core pass/fail flow

## What To Do

- Create `.github/workflows/ci.yml`
- Add a backend job that runs tests with a Postgres service
- Add a frontend job that runs the frontend test suite
- Add or verify a green CI badge in `README.md`
- Optionally add lint jobs if they are low-risk and fast
- Record all validation and outcomes in `docs/day-12-evidence-log.md`

## Why This Matters

A CI pipeline catches regressions before they reach the main branch:
- Confirms the app still builds and tests cleanly on every push
- Makes test results visible to reviewers and future maintainers
- Provides a concrete reliability signal for the portfolio

## Read Order

1. Confirm Day 11 gate is PASS in `docs/day-11-evidence-log.md`.
2. Read `docs/master-roadmap.md` (Day 12 section).
3. Read `docs/project-plan.md` (Day 12 section).
4. Read `docs/testing-checklist.md`.
5. Execute this checklist.
6. Record all outcomes in `docs/day-12-evidence-log.md`.
7. Use `docs/troubleshooting-notes.md` if blocked.

---

## Prerequisites

- Day 11 complete and documented
- Backend and frontend tests are already passing locally
- Git branch clean and synced
- GitHub repository has Actions enabled
- Required secrets and environment configuration are understood

---

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | TBD | TBD |
| P2 | Review `.github/workflows/` contents | CI workflow target identified or creation needed | TBD | TBD |
| P3 | Confirm backend test command from Day 11 | Existing backend tests are still the baseline | TBD | TBD |
| P4 | Confirm frontend test command from Day 11 | Existing frontend tests are still the baseline | TBD | TBD |
| P5 | Review `README.md` badge section | Badge placement and wording understood | TBD | TBD |

Preflight Result: (record PASS / FAIL in evidence log before Step 1)

---

## Execution Checklist

### Step 1: CI Workflow Scaffolding

- [ ] Create or update `.github/workflows/ci.yml`
- [ ] Trigger on `push` and `pull_request`
- [ ] Define backend and frontend jobs with clear names
- [ ] Use stable, pinned setup actions where practical

Acceptance Criteria:
- Workflow file exists
- Pipeline triggers on the intended events
- Jobs are readable and isolated

### Step 2: Backend CI Job

- [ ] Start a Postgres service for backend tests
- [ ] Install backend dependencies
- [ ] Run backend tests with the Day 11 command
- [ ] Ensure backend job fails clearly on test errors

Acceptance Criteria:
- Backend tests run successfully in CI
- Postgres service is used for the backend job
- Failure output is understandable

### Step 3: Frontend CI Job

- [ ] Install frontend dependencies
- [ ] Run frontend tests with the Day 11 command
- [ ] Ensure frontend job fails clearly on test errors

Acceptance Criteria:
- Frontend tests run successfully in CI
- Job is deterministic and non-interactive

### Step 4: README Badge

- [ ] Add or confirm a CI badge in `README.md`
- [ ] Ensure the badge links to the correct workflow
- [ ] Keep badge wording consistent with the workflow name

Acceptance Criteria:
- Badge is visible and points to GitHub Actions
- Badge turns green when the pipeline passes

### Step 5: Optional Linting

- [ ] Decide whether backend linting should be included
- [ ] Decide whether frontend linting should be included
- [ ] Add lint jobs only if they are stable and quick

Acceptance Criteria:
- Optional linting does not block the main test flow
- Lint output is actionable if enabled

### Step 6: Final Validation and Documentation

- [ ] Run the workflow locally or push to trigger GitHub Actions
- [ ] Verify all jobs pass
- [ ] Capture outputs in `docs/day-12-evidence-log.md`
- [ ] Update `docs/master-roadmap.md` if needed
- [ ] Update `docs/doc-index.md` if needed
- [ ] Update binder docs if shared docs changed

Acceptance Criteria:
- Pipeline passes on the target branch
- Badge reflects the passing state
- Evidence log is complete and traceable

---

## Done Check

- [ ] CI workflow created and passing
- [ ] Backend job verified with Postgres service
- [ ] Frontend job verified
- [ ] README badge added or confirmed
- [ ] Day 12 evidence log complete
- [ ] Day 12 updates committed and pushed

## Notes

- Prefer focused CI jobs over overbuilt pipeline logic
- Keep secrets out of the workflow file
- If linting is deferred, note why in the evidence log
