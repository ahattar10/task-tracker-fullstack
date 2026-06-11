# Day 8 Checklist - UX Polish and Error States

## Objective
Tighten the Day 7 task UI with consistent loading/empty/error/success affordances, harden auth boundary behavior (protected routes, logout, expired sessions), and replace any remaining raw error displays with user-facing copy.

## Estimated Time
3 to 5 hours

## Difficulty
Medium

---

## Agreed UX Decisions (Locked)

- Loading affordances: skeleton placeholders for the task list, inline spinner for form submit buttons (no global blocking overlay).
- Empty states: distinct copy per scenario (no tasks at all vs. no tasks match current filters).
- Error states: user-facing messages only - never raw `Error` objects or stack traces in the UI.
- Session expiry: 401 from any authenticated request clears the token and redirects to /login with a one-line notice.
- Logout: explicit Logout button in the layout that clears the token and routes to /login.
- Visual style: extend the existing Day 6/7 look; no theme rework.

## What To Do

- Add skeleton loaders to the task list while initial fetch and refetches are in flight
- Add per-button inline spinner for create / update / delete submit actions
- Differentiate "no tasks yet" from "no tasks match your filters"
- Implement protected-route redirect to /login when no token is present
- Implement session-expired flow when an authenticated request returns 401
- Wire the Logout button to clear the token and redirect to /login
- Replace any remaining raw error displays with user-friendly copy
- Add GA4 events for auth lifecycle: `user_logout`, `session_expired`

## Why This Matters

Day 8 turns a working Day 7 product into one that feels polished and trustworthy. Clean state handling and clear auth boundaries are the difference between a portfolio demo and something a stranger could use without confusion.

## Read Order

1. Confirm Day 7 checklist and evidence are complete (gate must read PASS).
2. Read docs/master-roadmap.md (Day 8 section).
3. Read docs/api-contract.md for the 401 contract on protected endpoints.
4. Read frontend/src/pages/TasksPage.tsx and frontend/src/components/ProtectedRoute.tsx for the surfaces being polished.
5. Read docs/setup-run-guide.md for startup commands and the Vite proxy rule.
6. Execute this checklist.
7. Use docs/troubleshooting-notes.md if blocked.

---

## Prerequisites

- Day 7 complete and validated (PASS gate recorded)
- Backend running locally at http://127.0.0.1:8000
- Frontend toolchain active (portable Node script if needed)
- JWT auth flow verified
- Seed data present (or new seed run) so loading/empty/error states can be exercised side by side

---

## Pre-Execution Prep Gate

- [ ] Git branch clean and synced with remote
- [ ] Portable Node enabled and versions verified
- [ ] Frontend build succeeds (npm run build)
- [ ] Backend health endpoint verified
- [ ] Auth register/login smoke checks verified
- [ ] Day 8 UX decisions finalized
- [ ] Day 8 docs created and indexed

Preflight Result: (record PASS / FAIL in evidence log before Step 1)

---

## Execution Checklist

### Step 1: Skeleton Loaders for Task List

- [ ] Add a `TaskCardSkeleton` (or equivalent) component matching real card dimensions
- [ ] Render N skeleton cards on initial fetch when no data is yet cached
- [ ] Render skeletons (or a subtle inline indicator) on filter/pagination refetches without flashing the empty state
- [ ] Verify skeleton does not appear during silent background mutations

### Step 2: Submit-Button Spinners

- [ ] Inline spinner on Create Task submit while POST is in flight
- [ ] Inline spinner on Edit Task submit while PUT is in flight
- [ ] Inline spinner on Delete confirm while DELETE is in flight
- [ ] Disable the submit button while in-flight to prevent double-submit
- [ ] Restore button label promptly on success or error

### Step 3: Distinct Empty States

- [ ] "No tasks yet - create your first one." when the user has zero tasks total
- [ ] "No tasks match your filters." when filters/search produced an empty page
- [ ] Each empty state offers an obvious next action (Create / Reset filters)
- [ ] Empty state never appears during loading

### Step 4: Protected Routes

- [ ] /tasks (and any other authenticated route) redirects to /login when no token is present
- [ ] Direct URL entry to a protected route while logged out lands on /login
- [ ] After successful login, the user lands on the originally requested route when applicable
- [ ] Navigating back after logout does not reveal protected pages

### Step 5: Session Expiry Handling

- [ ] axios response interceptor detects 401 on authenticated requests
- [ ] On 401, the stored token is cleared and the user is redirected to /login
- [ ] A one-line, user-facing notice ("Your session expired. Please sign in again.") is shown on the login page in this flow
- [ ] No raw `AxiosError` or stack content appears in the UI

### Step 6: Logout Flow

- [ ] Logout button is visible in the authenticated layout
- [ ] Click clears the token from storage and any in-memory user state
- [ ] Click redirects to /login
- [ ] Subsequent attempts to access protected routes redirect to /login
- [ ] GA4 `user_logout` event emitted on successful logout

### Step 7: Error Copy Audit

- [ ] List/CRUD error messages are user-facing strings, not raw error objects
- [ ] Network failure (backend down) renders a clear message + retry affordance (regression check from Day 7 M14)
- [ ] Validation errors map to inline field messages, not banner-only output
- [ ] No `console.error` is the only signal of a user-visible failure

### Step 8: Validation + Evidence

- [ ] Validate skeleton loader behavior in browser (initial load + filter refetch)
- [ ] Validate button spinners on create / edit / delete
- [ ] Validate both empty-state copies (zero tasks vs. zero matches)
- [ ] Validate protected-route redirect (logged-out direct URL)
- [ ] Validate 401 session-expired flow (manually delete token in storage and trigger a request)
- [ ] Validate Logout clears token and redirects
- [ ] Capture proof in docs/day-8-evidence-log.md

---

## Done Check

- All four states visible and working end-to-end: loading, empty, error, success
- Error messages are user-facing, not raw error objects
- Protected routes enforce auth at every entry point
- Logout and session-expired flows return the user cleanly to /login
- Day 8 evidence and docs updates are complete

## Notes

- Use scripts/enable-portable-node.ps1 in each new terminal before frontend commands if node is unavailable.
- For session-expiry validation, the simplest browser-side trick is: open DevTools - Application - Local Storage, delete `task_tracker_access_token`, then trigger any list refetch.
- Day 8 should not introduce new backend endpoints. If polish surfaces a missing API behavior, log it as a Day 9+ follow-up rather than expanding Day 8 scope.
