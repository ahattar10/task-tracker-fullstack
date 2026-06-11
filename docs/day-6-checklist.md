# Day 6 Checklist — Frontend Scaffold

## Objective
Create the frontend scaffold with routing, auth pages, and initial analytics hooks so backend and UI can be integrated cleanly.

## Estimated Time
3 to 5 hours

## Difficulty
Medium

---

## What To Do

- Set up React + TypeScript project structure
- Add core frontend dependencies and folder organization
- Implement route skeleton and shared layout
- Build login/register flows wired to backend auth endpoints
- Add baseline GA4 tracking events

## Why This Matters

Establishes the UI foundation needed for Day 7 task CRUD integration and portfolio-ready frontend progress.

## Read Order

1. Confirm Day 5 checklist is complete.
2. Read `docs/master-roadmap.md` (Day 6 section).
3. Read `docs/project-plan.md` (frontend section if needed).
4. Read `docs/setup-run-guide.md` for backend startup commands.
5. Execute this checklist.
6. Use `docs/troubleshooting-notes.md` only if blocked.

---

## Prerequisites

- Day 5 completed and validated
- Backend API running locally (`python -m app.dev_server`)
- Auth endpoints working (`/auth/register`, `/auth/login`)
- Node.js and npm installed

---

## Day 6 — Frontend Scaffold
Time: 3-5 hrs | Difficulty: Medium

### Step 1: React + TypeScript Setup

- [x] Create React app with TypeScript (Vite or CRA)
- [x] Install: react-router-dom, axios
- [x] Folder structure: components/, pages/, services/, hooks/

### Step 2: Routing + Layout

- [x] Routes: /login, /register, /tasks, /tasks/:id
- [x] Layout component (header, sidebar placeholder, main area)
- [x] Basic styling (Tailwind or CSS modules)

### Step 3: Login + Register Pages

- [x] Login form (email, password, submit button)
- [x] Register form (email, password, confirm password)
- [x] Form validation
- [x] Call backend auth endpoints
- [x] Store JWT token (localStorage)
- [x] Redirect to /tasks on success
- [x] Show error messages on failure

### ADD: GA4 Integration

- [x] Add GA4 snippet to index.html or main.tsx
- [x] Track: page_view (automatic)
- [x] Track: user_registered event
- [x] Track: user_login event

---

## Suggested Validation Commands

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\frontend"

# if scaffold not created yet (Vite + TS)
npm create vite@latest . -- --template react-ts

# install deps
npm install react-router-dom axios

# run frontend
npm run dev
```

With backend running, verify:

1. `/login` and `/register` routes render.
2. Register submits to backend and handles both success and duplicate email.
3. Login stores token and redirects to `/tasks`.
4. Invalid credentials show a user-friendly error.

---

## Done Check

- Frontend compiles and runs
- Auth pages render
- Login/Register calls backend successfully

## Current Status Note (2026-06-11)

- Frontend scaffold and Day 6 code implementation are complete in source files.
- Node.js/npm execution is now available using portable Node in `.tools/node` (no admin install required).
- `npm install` and `npm run build` completed successfully in `frontend`.
- `npm run dev` verified and backend auth runtime checks completed: register success (201), duplicate register (409), login success (200), login failure (401).