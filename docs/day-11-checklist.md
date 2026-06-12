# Day 11 Checklist - Automated Testing

## Objective
Add reliable automated test coverage for backend and frontend flows so behavior is verifiable and repeatable in local and CI environments.

## Estimated Time
4 to 7 hours

## Difficulty
Hard

---

## Agreed Build Decisions (Locked from Day 10)

- Day 10 reliability gate is PASS and stack is healthy
- GitHub Actions CI exists and passes build checks
- Day 11 introduces tests; do not expand product scope
- Keep tests deterministic and isolated (no dependency on manual UI steps)

## What To Do

- Add backend automated tests for auth and task APIs
- Add frontend automated tests for core UI behavior
- Ensure tests run locally with simple commands
- Record Day 11 evidence with command outputs and PASS/FAIL results
- Update docs where needed for test setup and execution

Standard test commands for Day 11 execution (use these unless project scripts change):
- Backend: `cd backend; pytest -q`
- Frontend: `cd frontend; npm test -- --run`

## Why This Matters

Automated tests reduce regressions and improve confidence:
- Catch breaks before merge/deploy
- Prove behavior without manual re-testing each change
- Support stronger CI gates
- Improve interview readiness with measurable quality signals

## Read Order

1. Confirm Day 10 gate is PASS in docs/day-10-evidence-log.md.
2. Read docs/master-roadmap.md (Day 11 section).
3. Read docs/testing-checklist.md.
4. Execute this checklist.
5. Record all outcomes in docs/day-11-evidence-log.md.
6. Use docs/troubleshooting-notes.md if blocked.

---

## Prerequisites

- Day 10 complete and documented
- Docker stack available when integration checks are needed
- Python backend dependencies installed
- Frontend dependencies installed
- Git branch clean and synced

---

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | `## main...origin/main` | PASS |
| P2 | python --version; pip --version | Python environment available for backend tests | Python 3.14.3 / pip 25.3 | PASS |
| P3 | cd frontend; npm --version | Node/npm available for frontend tests | npm 11.13.0 | PASS |
| P4 | docker compose -f infra/docker-compose.yml ps | Stack services healthy/available (if integration tests used) | backend/db/frontend healthy | PASS |
| P5 | Review existing test strategy in docs/testing-checklist.md | Test scope and acceptance criteria confirmed | Reviewed backend/frontend/database/manual checks | PASS |

Preflight Result: PASS

---

## Execution Checklist

### Step 1: Backend Test Scaffolding

- [x] Add backend test framework dependencies (pytest and async test tooling)
- [x] Create backend test folder structure
- [x] Add shared fixtures for test app/client setup
- [x] Ensure tests can run without changing production code paths

Acceptance Criteria:
- Backend tests discover with pytest
- Fixtures isolate test data setup/cleanup
- No app startup regression introduced

### Step 2: Backend Auth Tests

- [x] test_register_success -> 201
- [x] test_register_duplicate_email -> 409
- [x] test_login_success -> 200 + JWT token
- [x] test_login_wrong_password -> 401

Acceptance Criteria:
- All four auth tests pass reliably
- Assertions verify both status codes and response shape

### Step 3: Backend Task Authorization + CRUD Tests

- [x] test_create_and_list_tasks -> 201 + scoped list response
- [x] test_get_task_other_user_returns_404 -> 404 (resource hidden policy)
- [x] test_update_and_delete_task_success -> 200/204

Acceptance Criteria:
- Auth boundaries are covered by tests
- CRUD behavior verified with expected status codes

### Step 4: Frontend Test Scaffolding

- [x] Add frontend test framework/tooling (Vitest + RTL or project-standard equivalent)
- [x] Add test setup file and scripts in package.json
- [x] Ensure tests run in non-interactive mode for CI compatibility

Acceptance Criteria:
- Frontend tests run with single command
- Test output is readable and deterministic

### Step 5: Frontend Core UI Tests

- [x] Tasks page validates required fields
- [x] Login page shows error on invalid credentials path
- [x] Protected route and task skeleton tests cover guard/loading behavior

Acceptance Criteria:
- UI behavior matches expected user flows
- Tests do not depend on external network availability

### Step 6: Full Suite Run and Documentation

- [x] Run full backend test suite
- [x] Run full frontend test suite
- [x] Capture outputs in docs/day-11-evidence-log.md
- [x] Update docs/testing-checklist.md if process changed
- [x] Update roadmap/index if needed

Acceptance Criteria:
- Backend tests pass
- Frontend tests pass
- Evidence log complete and traceable

---

## Done Check

- [x] Backend auth and CRUD tests implemented
- [x] Frontend core UI tests implemented
- [x] Test commands documented and repeatable
- [x] Day 11 evidence log complete
- [x] Day 11 updates committed and pushed

## Notes

- Prefer focused tests over broad flaky scenarios
- Keep test names behavior-oriented and easy to read
- Do not rewrite existing app logic only to satisfy tests
- If an expected behavior is unclear, log assumption in evidence before coding
