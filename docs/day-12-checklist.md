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
- Add a backend job that runs migrations and tests with a Postgres service
- Add a frontend job that runs the frontend test suite and production build
- Add or verify a green CI badge in `README.md`
- Optionally add lint jobs if they are low-risk and fast
- Record all validation and outcomes in `docs/day-12-evidence-log.md`
- Observe the GitHub Actions run externally when available

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
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | `## main...origin/main` | PASS |
| P2 | Review `.github/workflows/` contents | CI workflow target identified or creation needed | `.github/workflows/ci.yml` present | PASS |
| P3 | Confirm backend test command from Day 11 | Existing backend tests are still the baseline | `python -m pytest -q` | PASS |
| P4 | Confirm frontend test command from Day 11 | Existing frontend tests are still the baseline | `npm test -- --run` | PASS |
| P5 | Review `README.md` badge section | Badge placement and wording understood | Badge points to `ci.yml` workflow | PASS |

Preflight Result: PASS

---

## Execution Checklist

### Step 1: CI Workflow Scaffolding

- [x] Create or update `.github/workflows/ci.yml`
- [x] Trigger on `push` and `pull_request`
- [x] Define backend and frontend jobs with clear names
- [x] Use stable, pinned setup actions where practical

Acceptance Criteria:
- Workflow file exists
- Pipeline triggers on the intended events
- Jobs are readable and isolated

### Step 2: Backend CI Job

- [x] Start a Postgres service for backend tests
- [x] Install backend dependencies
- [x] Run database migrations before backend tests
- [x] Run backend tests with the Day 11 command
- [x] Ensure backend job fails clearly on test errors

Acceptance Criteria:
- Backend tests run successfully in CI
- Postgres service is used for the backend job
- Migrations complete successfully before tests run
- Failure output is understandable

### Step 3: Frontend CI Job

- [x] Install frontend dependencies
- [x] Run frontend tests with the Day 11 command
- [x] Run the production frontend build
- [x] Ensure frontend job fails clearly on test errors

Acceptance Criteria:
- Frontend tests run successfully in CI
- Frontend production build succeeds
- Job is deterministic and non-interactive

### Step 4: README Badge

- [x] Add or confirm a CI badge in `README.md`
- [x] Ensure the badge links to the correct workflow
- [x] Keep badge wording consistent with the workflow name

Acceptance Criteria:
- Badge is visible and points to GitHub Actions
- Badge turns green when the pipeline passes

### Step 5: Optional Linting

- [x] Decide to defer backend linting for Day 12 scope
- [x] Decide to defer frontend linting for Day 12 scope
- [x] Keep lint jobs out of CI until they are stable and quick

Acceptance Criteria:
- Optional linting does not block the main test flow
- Lint output is actionable if enabled

### Step 6: Final Validation and Documentation

- [x] Run the workflow locally or push to trigger GitHub Actions
- [x] Verify all jobs pass
- [x] Capture outputs in `docs/day-12-evidence-log.md`
- [x] Update `docs/master-roadmap.md` if needed
- [x] Update `docs/doc-index.md` if needed
- [x] Update binder docs if shared docs changed

Acceptance Criteria:
- Pipeline passes on the target branch
- Badge reflects the passing state
- Evidence log is complete and traceable

---

## Done Check

- [x] CI workflow created and passing locally
- [x] Backend job verified with Postgres service
- [x] Frontend job verified
- [x] Backend migrations verified
- [x] Frontend build verified
- [x] README badge added or confirmed
- [x] Day 12 evidence log complete
- [x] Day 12 updates committed and pushed

## Notes

- Prefer focused CI jobs over overbuilt pipeline logic
- Keep secrets out of the workflow file
- If linting is deferred, note why in the evidence log
- GitHub Actions confirmation can be reviewed externally after push
