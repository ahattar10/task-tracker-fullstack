# Day 11 Evidence Log

Date: 2026-06-12
Owner: Anthony Hattar
Day Scope: Add automated backend/frontend tests, validate execution reliability, and document test evidence
Environment: Windows 11, VS Code workspace terminal

## Scope Target

- Planned outcomes for this day:
  - Backend auth and CRUD tests implemented and passing
  - Frontend core UI tests implemented and passing
  - Local test commands documented and repeatable
  - Evidence captured for all test suites
- Out-of-scope items:
  - New product feature development
  - Deployment changes (Day 13)
  - AI feature work (Week 3)

## Preconditions

- [x] Day 10 gate confirmed PASS
- [x] Working directory: task-tracker-fullstack root
- [x] Git branch clean and synced
- [x] Python environment available for backend tests
- [x] Node/npm environment available for frontend tests

Notes:

- If test tooling dependencies are added, record exact package names and versions.
- If behavior ambiguity appears, capture assumptions before implementing tests.

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | `## main...origin/main` | PASS |
| P2 | python --version; pip --version | Python environment available | Python 3.14.3 / pip 25.3 | PASS |
| P3 | cd frontend; npm --version | Node/npm available | npm 11.13.0 | PASS |
| P4 | docker compose -f infra/docker-compose.yml ps | Services available if integration tests used | backend/db/frontend healthy | PASS |
| P5 | Review docs/testing-checklist.md | Test scope and acceptance criteria confirmed | Reviewed backend/frontend/database/manual checks | PASS |

Preflight Result: PASS

## Implementation Evidence

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| I1 | Backend test framework + fixtures setup | Tests discoverable and isolated | Added pytest/httpx/aiosqlite and local SQLite test DB scaffold | PASS |
| I2 | Backend auth tests (register/login paths) | Status codes and token behavior validated | 4 auth tests passed | PASS |
| I3 | Backend task auth/CRUD tests | Ownership and CRUD behavior validated | 3 task tests passed | PASS |
| I4 | Frontend test framework setup | Test command runs non-interactive | Added Vitest, jsdom, Testing Library, and setup file | PASS |
| I5 | Frontend TaskList render test | Task list rendering behavior verified | Rendered task row and pager state | PASS |
| I6 | Frontend TaskForm validation test | Required field validation verified | Empty submit shows `Title is required.` | PASS |
| I7 | Frontend login error test | Invalid credential UX path verified | Failed login shows user-facing error | PASS |
| I8 | Full suite execution (backend + frontend) | All Day 11 tests pass | Backend 7/7, Frontend 6/6 | PASS |

## Test Run Summary

| Suite | Command | Expected | Actual | Status |
|---|---|---|---|---|
| Backend | cd backend; pytest -q | All backend tests pass | 7 passed in 3.50s | PASS |
| Frontend | cd frontend; npm test -- --run | All frontend tests pass | 6 passed in 1.43s | PASS |

## Reliability Notes

- Record flaky/unstable tests and mitigations: none observed
- Record test runtime durations: backend 3.50s, frontend 1.43s
- Record any mocking/stubbing approach used: frontend service modules mocked with Vitest; backend tests used isolated SQLite test DB
- Record CI compatibility notes: frontend requires Vitest/jsdom dependencies; backend uses local SQLite test DB for repeatable isolation

## Documentation Updates

- Checklist updated: docs/day-11-checklist.md
- Evidence log updated: docs/day-11-evidence-log.md
- Testing guidance updated: docs/testing-checklist.md (if changed)
- Roadmap updated: docs/master-roadmap.md (if changed)
- Doc index updated: docs/doc-index.md (if changed)

## Git Verification

- Branch: main
- git status --short result: clean
- Synced with remote: yes

## Issues and Resolutions

- Issue: Initial backend tests hit SQLite portability and cleanup issues on Windows (`now()` defaults and locked test.db).
- Resolution: Switched ORM timestamps to `CURRENT_TIMESTAMP`, added isolated SQLite test DB scaffolding, and ignored `backend/test.db`.
- Residual risk: FastAPI/Starlette deprecation warnings remain but do not block Day 11 validation.

## Day 11 Completion Gate

- [x] Scope complete or explicitly deferred
- [x] Validation complete
- [x] Evidence complete

Day 11 Gate Result: PASS
