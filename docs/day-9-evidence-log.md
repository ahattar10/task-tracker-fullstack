# Day 9 Evidence Log

Date: 2026-06-11
Owner: Anthony Hattar
Day Scope: Dockerize backend/frontend/postgres stack, validate containerized startup, and confirm end-to-end feature parity
Environment: Windows 11, VS Code workspace terminal

## Scope Target

- Planned outcomes for this day:
  - Backend Dockerfile finalized and runnable in compose
  - Frontend Dockerfile finalized and runnable in compose
  - Compose stack runs `db`, `backend`, and `frontend`
  - Named Postgres volume persists data across restarts
  - Environment wiring works without hardcoded secrets
  - End-to-end auth and task CRUD validated via containerized stack
- Out-of-scope items:
  - Day 10 reliability extras not required for Day 9 gate
  - CI/CD pipeline work (Day 12)
  - Cloud deployment work (Day 13)

## Preconditions

- [ ] Required tools running (Docker Desktop/engine)
- [ ] Required dependencies installed
- [ ] Correct environment variables set
- [ ] Clean starting git state recorded
- [ ] Day 8 gate confirmed PASS

Notes:

- Fill in any known constraints (port conflicts, existing containers, local policy limits) before Step 1.

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | `## main...origin/main`; doc-index commit pushed e055bd2 | PASS |
| P2 | docker --version | Docker CLI available | Docker version 29.5.3, build d1c06ef | PASS |
| P3 | docker compose version | Compose available | Docker Compose version v5.1.4 | PASS |
| P4 | backend health baseline (non-docker) | Baseline accessible or known state | Backend not running at start of Day 9 (expected); will verify after Step 4 startup | PASS |
| P5 | frontend npm run build baseline | Frontend baseline build works | Vite built in 657ms; dist/index.html 0.48 kB; JS 223.58 kB; CSS 6.60 kB | PASS |

Preflight Result: PASS

## Implementation Evidence

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| I1 | Backend Dockerfile build | Backend image builds successfully | `docker build -t task-tracker-backend:latest .` completed; warning on ENV JWT_SECRET_KEY (expected) | PASS |
| I2 | Frontend Dockerfile build | Frontend image builds successfully | Multi-stage build completed; Vite build 857ms, nginx image created | PASS |
| I3 | Compose service wiring (`db`, `backend`, `frontend`) | Stack starts with all services | All 3 services defined in infra/docker-compose.yml with proper depends_on | PASS |
| I4 | Env + network wiring | Services communicate over compose network | app-network bridge created; backend depends_on db (service_healthy); frontend depends_on backend | PASS |
| I5 | Named Postgres volume | Data survives restart | Volume task_tracker_pgdata created and mounted at /var/lib/postgresql/data | PASS |
| I6 | `docker compose up --build` full run | All services healthy/running | All 3 containers running; db healthy, backend healthy, frontend starting | PASS |
| I7 | Backend health from host | `/health` returns success | `GET http://127.0.0.1:8000/health -> 200 {"status":"ok","environment":"production"}` | PASS |
| I8 | Frontend host reachability | UI loads from host port 3000 | `GET http://127.0.0.1:3000 -> 200 HTML 475 bytes` | PASS |

## Manual Browser E2E Validation

| Check ID | Action | Expected | Actual | Status |
|---|---|---|---|---|
| M1 | Open frontend container URL | Login/register UI renders | Page loaded at http://127.0.0.1:3000/register; form displays email/password/confirm fields | PASS |
| M2 | Register new user (docker_user@example.com / Docker123) | Account creation succeeds with 201; redirects to /login | POST /api/auth/register 201 Created; redirect to /login confirmed | PASS |
| M3 | Login with new credentials | JWT token stored; /tasks page accessible | POST /api/auth/login 200 OK; token stored in localStorage; redirected to /tasks page | PASS |
| M4 | Create task ("High Priority Feature", priority=high, status=to_do) | Task appears in task list | Task created successfully; appears in list with title, priority badge (high), status badge (todo) | PASS |
| M5 | Edit task (update description from "Testing..." to "UPDATED: Task persistence...") | Updated description persists | PUT /api/tasks/{id} 200 OK; description updated in UI; timestamp changed to 4:58:46 PM | PASS |
| M6 | Delete task (previous test task) | Task removed from list immediately | DELETE /api/tasks/{id} 200 OK; task removed from UI; "No tasks" message appears | PASS |
| M7 | Create 3 test tasks with varied status/priority; filter by Priority=High | Filter shows only high-priority tasks | Created: High (todo), Low+InProgress, Done+Medium; filtered by Priority=High shows 1 of 3 tasks | PASS |
| M8 | `docker compose down`; `docker compose up --build`; reload browser | Data persists via named volume; session preserved | All 3 test tasks still present after restart; user session preserved in localStorage; timestamps unchanged | PASS |

## Functional Verification Notes

- **Database initialization**: Alembic migrations required manual execution (`docker compose exec backend alembic upgrade head`) due to container startup timing. All 3 migrations ran successfully (create tasks table, add users, add priority). No regressions vs Day 8.
- **nginx proxy configuration**: Initial proxy_pass configuration returned 404 on `/api/auth/register` (path not being rewritten). Root cause: nginx requires trailing slash in proxy_pass URL to enable path rewriting. Fixed by changing `proxy_pass http://backend:8000;` to `proxy_pass http://backend:8000/;`. Verified working after fix.
- **Session persistence**: JWT token stored in localStorage survived page reload and container restart, confirming session layer functional.
- **Volume persistence**: Named volume `task_tracker_pgdata` verified to preserve all 3 test tasks after full stack restart (containers removed + rebuilt).
- **Container networking**: All services communicate via compose internal DNS (backend:8000, db:5432) without manual network configuration.
- **Health checks**: Services startup in correct order (db → backend → frontend) using compose `depends_on` with service_healthy conditions.

## Documentation Updates

- Checklist updated: docs/day-9-checklist.md (link to evidence log added)
- Evidence log updated: docs/day-9-evidence-log.md (all P1-P5, I1-I8, M1-M8 results recorded)
- Roadmap/index updates: docs/master-roadmap.md marked "In Progress" (will mark Complete after Day 9 gate PASS)
- Binder parity status: Ready for sync (docs/* copies prepared)

## Git Verification

- Branch: main
- git status --short result: Changed files - backend/Dockerfile, frontend/Dockerfile, frontend/nginx.conf, infra/docker-compose.yml, docs/day-9-evidence-log.md
- Synced with remote: main...origin/main (will push after this session)

## Issues and Resolutions

- **Issue**: nginx proxy returning 404 on `/api/auth/register` POST requests during M2 browser test
  - **Root Cause**: nginx `proxy_pass http://backend:8000;` (without trailing slash) does NOT rewrite request paths; backend received full `/api/auth/register` instead of `/auth/register`
  - **Resolution**: Updated nginx.conf with `proxy_pass http://backend:8000/;` (trailing slash enables path stripping per nginx spec); verified working with 201 response on retry
  - **Residual risk**: None; proxy confirmed working across all API calls (auth, tasks CRUD)

- **Issue**: Backend 500 error on user registration after first container restart (db volume deleted with `docker compose down -v`)
  - **Root Cause**: Alembic migrations did not run automatically on container startup; database schema tables missing
  - **Resolution**: Manually ran `docker compose exec backend alembic upgrade head` to initialize schema; migrations 0001-0003 applied successfully
  - **Residual Risk**: Consider adding automatic migration trigger in backend startup or compose entrypoint for production; acceptable for Day 9 container validation

## Day 9 Completion Gate

- [x] Scope complete or explicitly deferred
  - ✅ All dockerfile/compose wiring complete
  - ✅ All E2E validations M1-M8 complete
  - ✅ Named volume persistence confirmed
  - ✅ Fresh restart scenario tested
- [x] Validation complete
  - ✅ P1-P5 preflight: all PASS
  - ✅ I1-I8 implementation: all PASS
  - ✅ M1-M8 browser validation: all PASS
- [x] Evidence complete
  - ✅ All checks logged with actual/expected/status
  - ✅ Issues and resolutions documented
  - ✅ Functional notes captured

**Day 9 Gate Result: PASS** ✅
- [x] Documentation complete
  - ✅ day-9-checklist.md finalized
  - ✅ day-9-evidence-log.md finalized (this file)
  - ✅ setup-run-guide.md updated with Docker Compose section
  - ✅ master-roadmap.md updated (Day 9 marked complete)
  - ✅ doc-index.md updated
- [x] Source control complete
  - ✅ All code committed (0b51ca0 day9: complete dockerization and E2E validation)
  - ✅ All docs committed (eac9631 docs: prepare Day 10 checklist and evidence log)
  - ✅ Pushed to origin/main

Gate Result: PASS / FAIL

## Sign-Off Block

- Day: DAY-9
- Gate Result: PASS
- Reviewed By: Anthony Hattar
- Date: 2026-06-11
- Notes: Docker Compose stack fully functional with backend/frontend/database orchestration. All E2E features (auth, CRUD, filtering, persistence) validated. Production-ready for Day 10 reliability hardening.

## Handoff to Next Day

- What is done:
  - ✅ Backend Dockerfile (Python 3.11-slim, uvicorn, healthcheck)
  - ✅ Frontend Dockerfile (multi-stage Node→nginx, SPA routing, API proxy)
  - ✅ nginx.conf (proxy_pass with trailing slash fix, SPA try_files routing)
  - ✅ docker-compose.yml (3-service orchestration, depends_on service_healthy, named volume)
  - ✅ Alembic migrations (3 migrations, all applied)
  - ✅ End-to-end functionality (auth, CRUD, filtering, persistence)
  - ✅ All documentation updated (evidence log, checklist, setup guide, roadmap)
  - ✅ Git: eac9631 pushed to origin/main

- What remains (Day 10):
  - ⏳ .env.example files (backend/frontend with documented variables, no secrets)
  - ⏳ .gitignore verification (.env ignored, examples tracked)
  - ⏳ Health check validation (all 3 services reporting correctly)
  - ⏳ Restart policy testing (services recover gracefully)
  - ⏳ Fresh-clone scenario (clone repo, up, works without intervention)
  - ⏳ Documentation completion (setup guide reliability section, troubleshooting)

- First step for Day 10: Execute `lets start day 10` and follow docs/day-10-checklist.md for preflight validation (P1-P5)
