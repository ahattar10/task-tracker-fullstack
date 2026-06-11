# Day 7 Evidence Log

Date: 2026-06-11
Owner: Anthony Hattar
Day Scope: Core task UI + API integration implementation
Environment: Windows 11, VS Code workspace terminal

## Scope Target

- Planned outcomes for this day: implement task CRUD UI, modal workflows, filters, pagination, and state handling
- Out-of-scope items: Day 8 polish work and major visual redesign

## Preconditions

- [x] Required services running
- [x] Required dependencies installed
- [x] Correct environment variables set
- [x] Clean starting git state recorded

Notes:

- Backend preflight was run against local server at http://127.0.0.1:8000.
- Frontend toolchain was validated with portable Node from .tools/node.

## Pre-Execution Validation Runs

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| 1 | git status -sb | Branch clean and synced | ## main...origin/main | PASS |
| 2 | scripts/enable-portable-node.ps1; node -v; npm -v | Node/npm available in terminal | node v24.16.0, npm 11.13.0 | PASS |
| 3 | frontend: npm run build | TypeScript + Vite build succeeds | Build succeeded (97 modules transformed) | PASS |
| 4 | scripts/day6-auth-verify.ps1 - health | GET /health returns 200 | HEALTH=200 with development payload | PASS |
| 5 | scripts/day6-auth-verify.ps1 - register/login checks | Register 201, duplicate 409, login good 200, login bad 401 | REGISTER_OK=201, REGISTER_DUP=409, LOGIN_OK=200, LOGIN_BAD=401 | PASS |
| 6 | UX decision review | Day 7 implementation decisions confirmed | Card list, inline modal, refetch strategy, Day 6 style extension | PASS |

## Implementation Evidence

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| I1 | Add frontend task service module | CRUD API clients with auth header support | Implemented in frontend/src/services/tasks.ts | PASS |
| I2 | Replace task placeholder page | Card list, filters, pagination, modal CRUD | Implemented in frontend/src/pages/TasksPage.tsx | PASS |
| I3 | Add Day 7 UI styles | Responsive card board and modal styles | Implemented in frontend/src/styles.css | PASS |
| I4 | frontend: npm run build (post-implementation) | TypeScript build remains green | Build passed after implementation changes | PASS |
| I5 | scripts/day7-api-verify.ps1 | Authenticated CRUD + filter/search/pagination API checks pass | REGISTER=201, LOGIN=200, CREATE_A=201, CREATE_B=201, LIST_PAGE1=200, LIST_PAGE2=200, FILTER_PRIORITY_HIGH=200, SEARCH_A=200, UPDATE_DONE=200, DELETE_A=204, DAY7_API_VERIFY=PASS | PASS |

## Manual Browser E2E Validation

Validated against http://127.0.0.1:5173 with backend on http://127.0.0.1:8000 and Postgres in `task-tracker-db` Docker container. Test account `day7e2e@test.local` was created via the UI and used for the full session. Backend access logs were monitored in real time to confirm each browser action reached the API.

A pre-flight bug was found and fixed during validation: `frontend/.env` had `VITE_API_BASE_URL` pointing at an inactive VS Code dev tunnel (`https://qdv1j8jp-8000.use.devtunnels.ms`), which caused the login submit to hang indefinitely ("Signing In..." with no backend hits). The override was commented out so requests fall back to `/api` and Vite's proxy forwards to `127.0.0.1:8000`. Vite was restarted and login worked on the next attempt.

| Check ID | Action | Expected | Actual | Status |
|---|---|---|---|---|
| M1 | Register `day7e2e@test.local` and log in | Land on /tasks with empty state | POST /auth/register 201, POST /auth/login 200, /tasks page rendered with "No tasks yet - create your first one." | PASS |
| M2 | Create task via modal ("New Task" button) | Card appears in list | POST /tasks 201, list refetched, card visible | PASS |
| M3 | Edit existing task via card edit action | Card updates with new values | PUT /tasks/13 200, list refetched, card showed edited title | PASS |
| M4 | Mark complete via card action | Status changes to done | Status badge updated to done after refetch | PASS |
| M5 | Delete task with confirmation dialog | Card removed | DELETE /tasks/13 204, list refetched, empty state returned | PASS |
| M6 | Seed 8 tasks via API and reload | 16 tasks total spread across 3 pages of 6 | total=16 pages=3 page1_items=6 returned by GET /tasks; UI showed page indicator 1 of 3 | PASS |
| M7 | Pagination Next/Prev across pages 1-3 | Distinct cards on each page | GET /tasks?page=1, page=2, page=3 all 200; correct cards rendered each step | PASS |
| M8 | Status filter = todo | Only todo tasks shown | GET /tasks?status=todo 200, list narrowed to todo cards | PASS |
| M9 | Priority filter = high | Only high-priority tasks shown | GET /tasks?priority=high 200, list narrowed to high cards | PASS |
| M10 | Search = "demo" with priority=high | Cards matching "demo" only | GET /tasks?priority=high&search=demo 200, single "Prep demo" card | PASS |
| M11 | Search = "zzznotreal" | Empty state shown | GET /tasks?search=zzznotreal 200 with empty items, empty-state copy displayed | PASS |
| M12 | Combo filter status=done + priority=medium | Narrowed list of done+medium tasks | GET /tasks?status=done&priority=medium 200, narrowed correctly | PASS |
| M13 | Loading state on hard refresh | Brief loading indicator before list paints | Loading state observed on Ctrl+Shift+R | PASS |
| M14 | Error state when backend stopped | Error message + recovery path | Backend killed via terminal; UI showed "Couldn't load tasks. Try again." | PASS |
| M15 | Recovery after backend restart | List repopulates without re-login | Backend restarted; refresh restored cards (token still valid in localStorage) | PASS |

## Functional Verification Notes

- Key behavior verified: task service layer and Task page CRUD interactions are wired to backend APIs with bearer token auth.
- Automated API verification passed for create/list/update/delete plus filter, search, and pagination via scripts/day7-api-verify.ps1.
- Manual browser E2E pass (M1-M15) covers full CRUD, filter/search/pagination, and loading/empty/error/success states end-to-end.
- Edge case verified: complete action only triggers when status is not already done; delete requires explicit user confirmation.
- Error path verified: list, mutation, and validation failures display user-facing messages in the Task UI; error state recovers cleanly when backend returns.

## Documentation Updates

- Checklist updated: docs/day-7-checklist.md
- Evidence log updated: docs/day-7-evidence-log.md
- Roadmap updated: docs/master-roadmap.md current status shows Day 7 ready to execute
- Index/readme updated: docs/doc-index.md (Day 7 section added)
- Binder parity status: complete for prep docs (mirrored with checksum match)

## Git Verification

- Branch: main
- git status --short result: clean before implementation; frontend/doc updates currently staged locally
- Synced with remote: Yes

## Issues and Resolutions

- Issue: `frontend/.env` had `VITE_API_BASE_URL` pointing at an inactive VS Code dev tunnel; login submit hung with no API hit.
- Resolution: commented out the `VITE_API_BASE_URL` override so axios falls back to `/api` and uses the Vite dev proxy to `127.0.0.1:8000`; restarted Vite.
- Residual risk: none for local dev. The tunnel URL is preserved as a comment for future remote-backend testing.

## Day 7 Pre-Execution Gate

- [x] Scope for implementation is clear
- [x] Validation prechecks complete
- [x] Evidence captured
- [x] Documentation created
- [x] Source control state verified

Gate Result: PASS (Day 7 Complete)

## Handoff to Execution

- What is done: Day 7 fully complete - task service, card list UI, modal create/edit, delete, complete, filters, pagination, GA event hooks, and all manual browser E2E checks (CRUD, filter/search/pagination, loading/empty/error/success) validated against the local stack.
- What remains: nothing for Day 7. Ready to start Day 8.
- First step for Day 8: open docs/day-8-checklist.md (or master-roadmap.md Day 8 section) once authored, and confirm preflight gate.

## Sign-Off Block

- Day: DAY-7
- Gate Result: PASS
- Reviewed By: Anthony Hattar
- Date: 2026-06-11
- Notes: Day 7 closed end-to-end. Implementation evidence (I1-I5) and manual browser E2E (M1-M15) all PASS. One env config issue found and fixed during validation (frontend/.env VITE_API_BASE_URL was pointing at an inactive dev tunnel; reset to use Vite proxy to local backend). Roadmap, checklist, and evidence log updated.
