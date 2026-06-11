# Day 8 Evidence Log

Date:
Owner: Anthony Hattar
Day Scope: UX polish (skeletons, button spinners, distinct empty states), protected-route enforcement, session-expiry handling, logout flow, and error-copy audit
Environment: Windows 11, VS Code workspace terminal

## Scope Target

- Planned outcomes for this day:
  - Skeleton loaders on the task list (initial load + filter refetch)
  - Inline submit spinners on create / edit / delete
  - Distinct empty-state copy for "no tasks yet" vs "no tasks match filters"
  - Protected route redirect to /login when no token
  - 401 session-expiry detection, token clear, redirect, and user-facing notice
  - Logout button that clears token and redirects to /login
  - Error-copy audit removing any raw error objects from the UI
  - GA4 `user_logout` and `session_expired` events
- Out-of-scope items:
  - Day 9 Docker / containerization work
  - New backend endpoints or schema changes
  - Visual redesign beyond Day 6/7 styles

## Preconditions

- [ ] Required services running (backend on 8000, frontend on 5173, Postgres in Docker)
- [ ] Required dependencies installed (frontend `npm install` clean)
- [ ] Correct environment variables set (`frontend/.env` `VITE_API_BASE_URL` left unset for local proxy)
- [ ] Clean starting git state recorded
- [ ] Day 7 closeout commit landed (so Day 8 starts from a clean tree)

Notes:

-

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git status -sb | Branch clean/synced baseline confirmed |  | PASS/FAIL |
| P2 | scripts/enable-portable-node.ps1; node -v; npm -v | Node/npm available |  | PASS/FAIL |
| P3 | frontend: npm run build | TypeScript + Vite build succeeds |  | PASS/FAIL |
| P4 | scripts/day6-auth-verify.ps1 (or equivalent) | Health 200, register/login behavior verified |  | PASS/FAIL |
| P5 | UX decision review | Day 8 implementation decisions confirmed |  | PASS/FAIL |

Preflight Result: PASS/FAIL (must read PASS before Step 1 of execution)

## Implementation Evidence

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| I1 | Skeleton loader component added to task list | Skeleton renders on initial fetch and filter refetches |  | PASS/FAIL |
| I2 | Submit-button spinner on create / edit / delete | Inline spinner + disabled button while request is in flight |  | PASS/FAIL |
| I3 | Distinct empty-state copy implemented | Different message for "no tasks yet" vs "no matches for filters" |  | PASS/FAIL |
| I4 | Protected-route redirect | /tasks (logged out) redirects to /login |  | PASS/FAIL |
| I5 | 401 session-expiry handling | axios interceptor clears token + redirects + shows expired notice |  | PASS/FAIL |
| I6 | Logout flow | Logout clears token, redirects to /login, emits GA4 event |  | PASS/FAIL |
| I7 | Error copy audit | No raw error objects rendered; user-facing strings only |  | PASS/FAIL |
| I8 | frontend: npm run build (post-implementation) | TypeScript build remains green |  | PASS/FAIL |

## Manual Browser E2E Validation

| Check ID | Action | Expected | Actual | Status |
|---|---|---|---|---|
| M1 | Hard refresh /tasks with seed data | Skeleton placeholders briefly visible, then real cards |  | PASS/FAIL |
| M2 | Apply a status filter | Skeleton (or subtle indicator) during refetch, no empty-state flash |  | PASS/FAIL |
| M3 | Submit Create Task | Button shows spinner + is disabled until response |  | PASS/FAIL |
| M4 | Submit Edit Task | Button shows spinner + is disabled until response |  | PASS/FAIL |
| M5 | Confirm Delete | Confirm button shows spinner until 204 returned |  | PASS/FAIL |
| M6 | Brand-new account with zero tasks | "No tasks yet" copy with Create CTA |  | PASS/FAIL |
| M7 | Filter to a no-match search term | "No tasks match your filters" copy with Reset CTA |  | PASS/FAIL |
| M8 | Visit /tasks while logged out | Redirected to /login |  | PASS/FAIL |
| M9 | Direct URL to a protected route while logged out | Lands on /login |  | PASS/FAIL |
| M10 | Delete token in DevTools, trigger refetch | Redirected to /login with "session expired" notice |  | PASS/FAIL |
| M11 | Click Logout | Token cleared in storage, redirected to /login |  | PASS/FAIL |
| M12 | After logout, navigate back via browser back | Protected page is not revealed |  | PASS/FAIL |
| M13 | Backend down → trigger list fetch | User-facing error + retry, no raw error object |  | PASS/FAIL |
| M14 | Recovery after backend restart | Retry succeeds, list reloads |  | PASS/FAIL |

## Functional Verification Notes

- Key behavior verified:
- Edge case verified:
- Error path verified:

## Documentation Updates

- Checklist updated: docs/day-8-checklist.md
- Evidence log updated: docs/day-8-evidence-log.md
- Roadmap updated: docs/master-roadmap.md current status reflects Day 8 progress
- Index/readme updated: docs/doc-index.md (Day 8 section)
- Binder parity status: pending (mirror after closeout)

## Git Verification

- Branch:
- git status --short result:
- Synced with remote: Yes/No

## Issues and Resolutions

- Issue:
- Resolution:
- Residual risk:

## Day 8 Completion Gate

- [ ] Scope complete or explicitly deferred
- [ ] Validation complete
- [ ] Evidence complete
- [ ] Documentation complete
- [ ] Source control complete

Gate Result: PASS/FAIL

## Sign-Off Block

- Day: DAY-8
- Gate Result:
- Reviewed By: Anthony Hattar
- Date:
- Notes:

## Handoff to Next Day

- What is done:
- What remains:
- First step for Day 9: open docs/day-9-checklist.md (to be authored) and confirm Day 8 gate read PASS.
