# Day 7 Checklist - Core Task UI + API Integration

## Objective
Implement task CRUD UI and wire it to authenticated backend APIs with loading, empty, and error states.

## Estimated Time
5 to 7 hours

## Difficulty
Medium-Hard

---

## Agreed UX Decisions (Locked)

- Task view: card list
- Create/edit flow: inline modal on tasks page
- Data strategy: refetch task list after each mutation
- Styling approach: extend Day 6 visual style (no major redesign)

## What To Do

- Implement task service layer for list/create/update/delete
- Build card-based task list UI with filters and pagination
- Build shared create/edit modal form
- Add delete confirmation flow
- Implement loading, empty, error, and success states
- Add GA4 task events

## Why This Matters

Day 7 connects frontend to real task operations and creates the first end-to-end usable product flow after login.

## Read Order

1. Confirm Day 6 checklist and evidence are complete.
2. Read docs/master-roadmap.md (Day 7 section).
3. Read docs/api-contract.md and backend/app/api/tasks.py for real endpoint behavior.
4. Read docs/setup-run-guide.md for startup commands.
5. Execute this checklist.
6. Use docs/troubleshooting-notes.md if blocked.

---

## Prerequisites

- Day 6 complete and validated
- Backend running locally at http://127.0.0.1:8000
- Frontend toolchain active (portable Node script if needed)
- JWT auth flow verified

---

## Pre-Execution Prep Gate (Completed)

- [x] Git branch clean and synced with remote
- [x] Portable Node enabled and versions verified
- [x] Frontend build succeeds
- [x] Backend health endpoint verified
- [x] Auth register/login smoke checks verified
- [x] Day 7 UX decisions finalized
- [x] Day 7 docs created and indexed

---

## Execution Checklist

### Step 1: Task Service Layer

- [ ] Add GET /tasks client with query params (page, limit, status, priority, search)
- [ ] Add POST /tasks client
- [ ] Add PUT /tasks/{id} client
- [ ] Add DELETE /tasks/{id} client
- [ ] Ensure Authorization bearer token is attached to task requests

### Step 2: Task List UI (Card Layout)

- [ ] Render task cards from API response items
- [ ] Show title, description, status, priority, and timestamps
- [ ] Add filter controls for status, priority, and search
- [ ] Add pagination controls using page/pages/total

### Step 3: Shared Task Modal (Create/Edit)

- [ ] Create reusable modal form for create and edit
- [ ] Pre-fill existing values in edit mode
- [ ] Validate title and field constraints before submit
- [ ] On success, close modal and refetch list

### Step 4: Delete + Complete Actions

- [ ] Add delete action per card
- [ ] Add confirmation dialog before delete
- [ ] Add quick complete action (status -> done)
- [ ] Refetch list after each successful mutation

### Step 5: State Handling

- [ ] Loading state while list or mutation requests are in progress
- [ ] Empty state when no tasks are available
- [ ] Error state with retry action when API calls fail
- [ ] Success feedback after create/update/delete

### Step 6: Analytics Events

- [ ] Emit task_created on create success
- [ ] Emit task_updated on update success
- [ ] Emit task_deleted on delete success
- [ ] Emit task_completed when status changes to done

### Step 7: Validation + Evidence

- [ ] Validate full CRUD flow in browser
- [ ] Validate filters and pagination behavior
- [ ] Validate loading/empty/error/success states
- [ ] Capture proof in docs/day-7-evidence-log.md

---

## Done Check

- Full task CRUD works end-to-end in browser
- Filters and pagination work with backend data
- Loading/empty/error/success states are all validated
- Day 7 evidence and docs updates are complete

## Notes

- Use scripts/enable-portable-node.ps1 in each new terminal before frontend commands if node is unavailable.
