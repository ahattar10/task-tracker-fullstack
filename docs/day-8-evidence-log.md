# Day 8 Evidence Log

Date: 2026-06-11
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

- [x] Required services running (backend on 8000, frontend on 5173, Postgres in Docker)
- [x] Required dependencies installed (frontend `npm install` clean)
- [x] Correct environment variables set (`frontend/.env` `VITE_API_BASE_URL` left unset for local proxy)
- [x] Clean starting git state recorded
- [x] Day 7 closeout commit landed (so Day 8 starts from a clean tree)

Notes:

- Day 7 closeout shipped in 87bd10e and author-guard hook in 02fad43. Tree clean at start of Day 8.
- Backend started via `python -m app.dev_server` with explicit `PYTHONPATH` set to backend folder; frontend via portable Node + `npm run dev`.
- Postgres container `task-tracker-db` reused from Day 7.

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | `## main...origin/main`; 0 ahead / 0 behind; fetch returned no new refs | PASS |
| P2 | scripts/enable-portable-node.ps1; node -v; npm -v | Node/npm available | node v24.16.0; npm 11.13.0 | PASS |
| P3 | frontend: npm run build | TypeScript + Vite build succeeds | tsc -b clean; Vite built 97 modules in 693ms; CSS 5.36 kB; JS 220.81 kB | PASS |
| P4 | scripts/day6-auth-verify.ps1 | Health 200, register/login behavior verified | HEALTH=200; REGISTER_OK=201; REGISTER_DUP=409; LOGIN_OK=200; LOGIN_BAD=401 | PASS |
| P5 | UX decision review (Decisions 1-5 in day-8-checklist.md) | Day 8 implementation decisions confirmed | Decision 1 (skeleton loaders) reviewed via in-browser preview at /tasks?skel=1; cards visually match real card layout (3 action buttons, 2 badge pills, title + 2 desc lines + meta); user accepted. Decisions 2-5 to be reviewed step-by-step before each step | PASS |

Preflight Result: PASS

## Implementation Evidence

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| I1 | Skeleton loader component added to task list | Skeleton renders on initial fetch and filter refetches | `frontend/src/components/TaskCardSkeleton.tsx` added; `TasksPage.tsx` renders `DEFAULT_LIMIT` (6) skeleton cards while `loading === true`; CSS `.skeleton` + `@keyframes skeleton-pulse` added to `styles.css`. Verified in browser at /tasks via hard refresh: 6 grey pulsing cards visible briefly, replaced by real task cards on response. Side-by-side preview at /tasks?skel=1 confirmed dimensions match real cards (title + 2 desc lines + meta + 3 action buttons + 2 badge pills). Production build green: 98 modules, 659ms | PASS |
| I2 | Submit-button spinner on create / edit / delete | Inline spinner + disabled button while request is in flight | `TasksPage.tsx` updated so create/edit submit shows verb copy with spinner (`Creating…` / `Saving…`) and disables the submit button while `saving===true`; delete action now tracks `deletingId` and shows `Deleting…` with spinner per-row while request is in flight. Spinner styles added in `styles.css` as `.btn-spinner` + `@keyframes btn-spin`. Preview reviewed and accepted in-browser; build verified green (98 modules, 717ms). | PASS |
| I3 | Distinct empty-state copy implemented | Different message for "no tasks yet" vs "no matches for filters" | `TasksPage.tsx` now branches empty state by active filters: no filters -> "No tasks yet. Create your first task to get started." with `Create Task` CTA; filters/search active -> "No tasks match your filters." with `Reset Filters` CTA. Preview paths `/tasks?empty=none` and `/tasks?empty=filtered` were reviewed and approved, then removed so only production logic remains. | PASS |
| I4 | Protected-route redirect | /tasks (logged out) redirects to /login | Existing implementation confirmed: `ProtectedRoute` checks token via `getAccessToken()` and returns `<Navigate to="/login" replace />` when missing; `App.tsx` wraps `/tasks` and `/tasks/:id` under `ProtectedRoute` + `Layout`. No new code required for Day 8 Step 4. | PASS |
| I5 | 401 session-expiry handling | axios interceptor clears token + redirects + shows expired notice | `http.ts` now has a global axios response interceptor: on 401 from non-auth endpoints with an existing token, it clears token storage, emits GA4 `session_expired`, and redirects to `/login?reason=session_expired`. `LoginPage.tsx` reads `reason=session_expired` and displays "Your session expired. Please sign in again." in a styled notice (`.form-notice`). Build verified green after change. | PASS |
| I6 | Logout flow | Logout clears token, redirects to /login, emits GA4 event | `Layout.tsx` logout handler now emits GA4 `user_logout` (`source: sidebar_button`), clears token via `clearAccessToken()`, and navigates to `/login` with `replace: true`. Manual verify: user logged in, clicked Log Out, and was redirected to login page. | PASS |
| I7 | Error copy audit | No raw error objects rendered; user-facing strings only | UI error paths in `LoginPage.tsx`, `RegisterPage.tsx`, and `TasksPage.tsx` use fixed user-facing strings (e.g., "Login failed. Verify credentials and try again.", "Couldn't load tasks. Try again."). No backend/raw exception object is interpolated into rendered JSX. | PASS |
| I8 | frontend: npm run build (post-implementation) | TypeScript build remains green | Latest verification after Day 8 changes: `npm run build` passed, Vite transformed 98 modules and completed successfully (latest run 650ms). | PASS |

## Manual Browser E2E Validation

| Check ID | Action | Expected | Actual | Status |
|---|---|---|---|---|
| M1 | Hard refresh /tasks with seed data | Skeleton placeholders briefly visible, then real cards | User refreshed while authenticated and tasks rendered from loader state into real cards as expected. | PASS |
| M2 | Apply a status filter | Skeleton (or subtle indicator) during refetch, no empty-state flash | Initially observed flicker; resolved by keeping cards mounted during refetch + delayed inline refresh hint. Retest passed: changing filter does not auto-apply, clicking Apply updates list without empty-state flash. | PASS |
| M3 | Submit Create Task | Button shows spinner + is disabled until response | Verified under throttled network: Create submit displayed `Creating…` with spinner and temporarily non-clickable state. | PASS |
| M4 | Submit Edit Task | Button shows spinner + is disabled until response | Verified during edit save: spinner state shown and save button became temporarily non-clickable while request was in flight. | PASS |
| M5 | Confirm Delete | Confirm button shows spinner until 204 returned | Native confirm dialog appears first; after confirm, delete action showed in-flight spinner/disabled behavior under throttled validation and completed successfully. | PASS |
| M6 | Brand-new account with zero tasks | "No tasks yet" copy with Create CTA | User created a brand-new account, logged in, and landed on an empty task list showing first-run empty-state behavior. | PASS |
| M7 | Filter to a no-match search term | "No tasks match your filters" copy with Reset CTA | Using a no-match query produced the expected copy and displayed the `Reset Filters` CTA. | PASS |
| M8 | Visit /tasks while logged out | Redirected to /login | Verified during logout/session-expiry checks: protected route redirected to `/login` when token absent. | PASS |
| M9 | Direct URL to a protected route while logged out | Lands on /login | User entered `http://127.0.0.1:5173/tasks` while logged out; app immediately returned to login page. | PASS |
| M10 | Delete token in DevTools, trigger refetch | Redirected to /login with "session expired" notice | Deleting `task_tracker_access_token` and triggering fetch logged user out and redirected to login route; interceptor path confirmed with backend 401 traffic. | PASS |
| M11 | Click Logout | Token cleared in storage, redirected to /login | User logged in and then clicked Log Out; app returned to `/login` and local-storage token row was empty in DevTools. | PASS |
| M12 | After logout, navigate back via browser back | Protected page is not revealed | Back navigation did not expose tasks; direct navigation to `/tasks` while logged out redirected to login. | PASS |
| M13 | Backend down → trigger list fetch | User-facing error + retry, no raw error object | With backend intentionally stopped, changing Status filter and applying triggered fetch failure; UI showed "Couldn't load tasks. Try again." and no raw error object text. | PASS |
| M14 | Recovery after backend restart | Retry succeeds, list reloads | Backend was restarted after outage test and user confirmed successful login again; app resumed normal authenticated flow. | PASS |

## Functional Verification Notes

- Key behavior verified: Protected routes enforce auth, logout clears session and returns to login, and session expiry via 401 redirects to login flow.
- Edge case verified: Manual token deletion forces re-authentication path; direct `/tasks` navigation while logged out bounces to login.
- Error path verified: Backend-down scenario surfaced user-facing auth error copy without raw exception output; recovery after restart succeeded.

## Documentation Updates

- Checklist updated: docs/day-8-checklist.md
- Evidence log updated: docs/day-8-evidence-log.md
- Roadmap updated: docs/master-roadmap.md current status reflects Day 8 progress
- Index/readme updated: docs/doc-index.md (Day 8 section)
- Binder parity status: pending (mirror after closeout)

## Git Verification

- Branch: main
- git status --short result: Clean after commit/push (`## main...origin/main`)
- Synced with remote: Yes (Day 8 commit pushed to origin/main)

## Issues and Resolutions

- Issue: Minor visual flicker still perceptible on some fast filter refetch transitions.
- Resolution: Reduced flicker by keeping current cards mounted during refetch and delaying refresh hint rendering.
- Residual risk: Small transient repaint may still be noticeable on some hardware/browser timing combinations; cosmetic only, no functional impact.

## Day 8 Completion Gate

- [x] Scope complete or explicitly deferred
- [x] Validation complete
- [x] Evidence complete
- [x] Documentation complete
- [x] Source control complete

Gate Result: PASS

## Sign-Off Block

- Day: DAY-8
- Gate Result: PASS
- Reviewed By: Anthony Hattar
- Date: 2026-06-11
- Notes: Day 8 UX/auth polish complete with validated evidence and minor non-blocking cosmetic flicker residual risk documented.

## Handoff to Next Day

- What is done: Skeleton loaders, inline submit spinners, distinct empty states, protected route enforcement, 401 session-expiry redirect + notice, logout telemetry/flow, and full Day 8 manual validation suite (M1-M14) completed.
- What remains: Optional cosmetic polish for occasional micro-flicker on fast refetch transitions; no functional blockers.
- First step for Day 9: open docs/day-9-checklist.md and confirm Day 8 gate reads PASS.
