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
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | TBD | TBD |
| P2 | python --version; pip --version | Python environment available for backend tests | TBD | TBD |
| P3 | cd frontend; npm --version | Node/npm available for frontend tests | TBD | TBD |
| P4 | docker compose -f infra/docker-compose.yml ps | Stack services healthy/available (if integration tests used) | TBD | TBD |
| P5 | Review existing test strategy in docs/testing-checklist.md | Test scope and acceptance criteria confirmed | TBD | TBD |

Preflight Result: (record PASS / FAIL in evidence log before Step 1)

---

## Execution Checklist

### Step 1: Backend Test Scaffolding

- [ ] Add backend test framework dependencies (pytest and async test tooling)
- [ ] Create backend test folder structure
- [ ] Add shared fixtures for test app/client setup
- [ ] Ensure tests can run without changing production code paths

Acceptance Criteria:
- Backend tests discover with pytest
- Fixtures isolate test data setup/cleanup
- No app startup regression introduced

### Step 2: Backend Auth Tests

- [ ] test_register_success -> 201
- [ ] test_register_duplicate_email -> 409
- [ ] test_login_success -> 200 + JWT token
- [ ] test_login_wrong_password -> 401

Acceptance Criteria:
- All four auth tests pass reliably
- Assertions verify both status codes and response shape

### Step 3: Backend Task Authorization + CRUD Tests

- [ ] test_create_task_authenticated -> 201
- [ ] test_create_task_no_auth -> 401
- [ ] test_get_tasks_returns_user_tasks_only
- [ ] test_get_task_other_user -> 404 (resource hidden policy)
- [ ] test_update_task_success -> 200
- [ ] test_delete_task_success -> 204

Acceptance Criteria:
- Auth boundaries are covered by tests
- CRUD behavior verified with expected status codes

### Step 4: Frontend Test Scaffolding

- [ ] Add frontend test framework/tooling (Vitest + RTL or project-standard equivalent)
- [ ] Add test setup file and scripts in package.json
- [ ] Ensure tests run in non-interactive mode for CI compatibility

Acceptance Criteria:
- Frontend tests run with single command
- Test output is readable and deterministic

### Step 5: Frontend Core UI Tests

- [ ] TaskList renders tasks from props/state
- [ ] TaskForm validates required fields
- [ ] Login page shows error on invalid credentials path

Acceptance Criteria:
- UI behavior matches expected user flows
- Tests do not depend on external network availability

### Step 6: Full Suite Run and Documentation

- [ ] Run full backend test suite
- [ ] Run full frontend test suite
- [ ] Capture outputs in docs/day-11-evidence-log.md
- [ ] Update docs/testing-checklist.md if process changed
- [ ] Update roadmap/index if needed

Acceptance Criteria:
- Backend tests pass
- Frontend tests pass
- Evidence log complete and traceable

---

## Done Check

- [ ] Backend auth and CRUD tests implemented
- [ ] Frontend core UI tests implemented
- [ ] Test commands documented and repeatable
- [ ] Day 11 evidence log complete
- [ ] Day 11 updates committed and pushed

## Notes

- Prefer focused tests over broad flaky scenarios
- Keep test names behavior-oriented and easy to read
- Do not rewrite existing app logic only to satisfy tests
- If an expected behavior is unclear, log assumption in evidence before coding
