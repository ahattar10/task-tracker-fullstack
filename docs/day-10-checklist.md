# Day 10 Checklist - Reliability + Environment Management

## Objective
Harden the Docker environment for production readiness: validate .env configuration, verify data persistence, ensure health checks work, and confirm fresh-clone scenario works without manual intervention.

## Estimated Time
3 to 5 hours

## Difficulty
Medium-Hard

---

## Agreed Build Decisions (Locked from Day 9)

- Docker Compose orchestrates db, backend, frontend services
- Named volume `task_tracker_pgdata` persists Postgres data
- Health checks on all services with `depends_on` service_healthy ordering
- Backend runs on 0.0.0.0:8000, frontend on 0.0.0.0:80 (mapped to 3000 host)
- All secrets and config via environment variables (no hardcoded values in Dockerfile or code)

## What To Do

- Create .env.example with all required environment variables (documented, no secrets)
- Verify .gitignore excludes .env and .venv directories
- Test fresh-clone scenario: clone repo → `docker compose up` → app works without manual steps
- Validate all health checks report correctly after startup
- Document troubleshooting steps for common startup issues
- Create Day 10 evidence log with validation results

## Why This Matters

Production readiness requires automation. A reliable .env pattern and health checks ensure:
- New team members can clone and start the app in seconds
- CI/CD pipelines can start the stack without custom scripts
- Deployment failures are caught early via health checks
- Configuration is reproducible across environments

## Read Order

1. Confirm Day 9 gate is PASS in `docs/day-9-evidence-log.md`.
2. Read `docs/master-roadmap.md` (Day 10 section).
3. Read `docs/setup-run-guide.md` (Docker Compose section from Day 9).
4. Review current `infra/docker-compose.yml` (health checks state).
5. Execute this checklist.
6. Use `docs/troubleshooting-notes.md` if blocked.

---

## Prerequisites

- Day 9 complete and validated (PASS gate recorded)
- Docker Compose stack running from Day 9 (or freshly stopped)
- Access to git repository
- All Day 9 Dockerfiles and compose config in place

---

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | TBD | TBD |
| P2 | cat infra/docker-compose.yml \| grep -i health | Health checks present on all 3 services | TBD | TBD |
| P3 | ls -la backend/.env* frontend/.env* \| find . -name ".env*" | .env.example files exist | TBD | TBD |
| P4 | cat .gitignore \| grep -E "\.env|\.venv" | .env and .venv ignored | TBD | TBD |
| P5 | docker compose config \| grep -i "restart" | Restart policy verified | TBD | TBD |

Preflight Result: (record PASS / FAIL in evidence log before Step 1)

---

## Execution Checklist

### Step 1: Environment Variables (.env.example)

- [x] Create backend/.env.example with all required variables (DATABASE_URL, JWT_SECRET_KEY, etc.)
- [x] Create frontend/.env.example with VITE_API_BASE_URL and other config
- [x] Add comments explaining each variable
- [x] Verify no actual secrets are in .example files
- [x] Document which variables are required vs. optional

**Acceptance Criteria:**
- Both .env.example files in git (committed, not .gitignore'd)
- Each variable has a description or example value
- No actual secret values visible in the files

### Step 2: .gitignore Verification

- [x] Verify .gitignore includes `.env` (but not `.env.example`)
- [x] Verify .gitignore includes `.venv`, `node_modules/`, `dist/`, `__pycache__/`
- [x] Verify no .env files are currently tracked in git
- [x] Run `git status` to confirm no .env files appear

**Acceptance Criteria:**
- `git ls-files .env` returns nothing (no .env in git)
- `git ls-files .env.example` returns files (examples are tracked)
- No untracked .env files in `git status`

### Step 3: Health Checks Validation

- [x] Verify all 3 services have healthcheck in docker-compose.yml
- [x] Test healthcheck manually: `docker compose exec db pg_isready`, `docker compose exec backend curl http://localhost:8000/health`, etc.
- [x] Verify `depends_on` uses `service_healthy` conditions
- [x] Confirm startup order: db → backend → frontend

**Acceptance Criteria:**
- `docker compose ps` shows all services with health status
- Backend reports "healthy" or "starting" (not "unhealthy")
- Services start in correct order without race conditions
- Manual healthcheck commands succeed after 5-10 second wait

### Step 4: Restart Policy and Error Handling

- [x] Verify docker-compose.yml has restart policy (e.g., `restart_policy: condition: on-failure`)
- [x] Test: stop one service (`docker compose stop backend`), verify it does not auto-restart
- [x] Document what to do if a service enters unhealthy state (logs, manual restart, cleanup)
- [x] Verify container logs do not contain unhandled exceptions on startup

**Acceptance Criteria:**
- Compose file defines restart behavior explicitly
- Services recover gracefully from temporary failures
- Logs are clean and informative (no stack traces on normal startup)

### Step 5: Fresh-Clone Simulation

- [x] In a temp directory, clone the repo: `git clone https://github.com/ahattar10/task-tracker-fullstack.git temp-clone`
- [x] Navigate to temp-clone: `cd temp-clone`
- [x] Run: `docker compose -f infra/docker-compose.yml up --build -d`
- [x] Wait 5-10 seconds, run: `docker compose ps` (verify all healthy)
- [x] Run migrations: `docker compose exec -T backend alembic upgrade head`
- [x] Test frontend: `curl http://127.0.0.1:3000` (should return HTML)
- [x] Test backend: `curl http://127.0.0.1:8000/health` (should return JSON)
- [x] Register a test user via frontend UI
- [x] Create a test task and verify it persists

**Acceptance Criteria:**
- Fresh clone starts from `git clone` with no manual setup required
- All services become healthy within 10 seconds
- Full auth + CRUD workflow succeeds
- No manual intervention or workarounds needed

### Step 6: Documentation and Closeout

- [x] Update docs/setup-run-guide.md with Day 10 reliability additions (restart policies, health checks)
- [x] Record full Day 10 evidence in `docs/day-10-evidence-log.md`
- [x] Add troubleshooting section to docs/troubleshooting-notes.md if needed
- [x] Update roadmap/index if needed

---

## Done Check

- [x] .env.example files created and documented (no secrets)
- [x] .gitignore verified (.env ignored, .env.example tracked)
- [x] All services have health checks and correct startup order
- [x] Fresh-clone scenario works without manual steps
- [x] Day 10 evidence and docs updates are complete

## Notes

- Keep `.env.example` in git as a template; users copy it to `.env` locally
- Health checks should be lightweight (not expensive DB queries)
- Ensure logs are informative for debugging but not verbose enough to include secrets
- Consider adding a startup script that auto-runs migrations if needed (optional for Day 10)
