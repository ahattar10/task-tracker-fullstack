# Day 9 Checklist - Dockerize Services

## Objective
Containerize the app stack so backend, frontend, and Postgres run together via Docker Compose with consistent local startup and reproducible environment behavior.

## Estimated Time
5 to 8 hours

## Difficulty
Hard

---

## Agreed Build Decisions (Locked)

- Backend image: Python 3.11 slim base, dependency install from requirements, run FastAPI with uvicorn.
- Frontend image: Node 18 Alpine build and runtime flow (or build + lightweight static serve strategy).
- Compose services: `db`, `backend`, `frontend` in one `infra/docker-compose.yml` stack.
- Persistence: named volume for Postgres data.
- Config: runtime configuration from `.env` / compose environment blocks (no hardcoded secrets).
- Verification: fresh-clone style run path validates startup and end-to-end API/UI behavior.

## What To Do

- Add backend Dockerfile for app runtime
- Add frontend Dockerfile for dev/prod run target used by compose
- Wire compose services for backend, frontend, postgres
- Add/verify named volume for Postgres persistence
- Add/verify env-variable wiring for all services
- Validate compose startup and service health
- Validate full auth + task CRUD through containerized stack

## Why This Matters

Day 9 removes machine-specific setup friction. A reproducible Docker path is key for demos, handoffs, and later CI/CD deployment alignment.

## Read Order

1. Confirm Day 8 gate is PASS in `docs/day-8-evidence-log.md`.
2. Read `docs/master-roadmap.md` (Day 9 section).
3. Read `docs/project-plan.md` (Day 9 section).
4. Read `docs/setup-run-guide.md` for existing local run commands.
5. Read `infra/docker-compose.yml` current state.
6. Execute this checklist.
7. Use `docs/troubleshooting-notes.md` if blocked.

---

## Prerequisites

- Day 8 complete and validated (PASS gate recorded)
- Docker Desktop running
- Existing local app still works outside Docker (baseline)
- Branch clean and synced before Day 9 edits

---

## Pre-Execution Prep Gate

- [ ] Git branch clean and synced with remote
- [ ] Docker CLI available (`docker --version`)
- [ ] Docker Compose available (`docker compose version`)
- [ ] Local baseline health verified (`GET /health`)
- [ ] Frontend build succeeds (`npm run build`)
- [ ] Day 9 docs created and indexed

Preflight Result: (record PASS / FAIL in evidence log before Step 1)

---

## Execution Checklist

### Step 1: Backend Container

- [ ] Create/update backend Dockerfile using Python 3.11 slim
- [ ] Install dependencies from `backend/requirements.txt`
- [ ] Copy app source and set working directory correctly
- [ ] Configure container command to run backend on compose network
- [ ] Verify backend container reaches Postgres via service hostname (not localhost)

### Step 2: Frontend Container

- [ ] Create/update frontend Dockerfile using Node 18 Alpine
- [ ] Install frontend dependencies from lock/package manifests
- [ ] Build or serve strategy defined for compose usage
- [ ] Expose frontend port and verify container starts
- [ ] Verify frontend can call backend via compose-safe API base/proxy config

### Step 3: Compose Wiring

- [ ] Define/verify `db`, `backend`, `frontend` services in `infra/docker-compose.yml`
- [ ] Add service dependencies and startup ordering hints
- [ ] Define named volume for Postgres persistence
- [ ] Define environment variables per service
- [ ] Map host ports clearly (frontend + backend)

### Step 4: Startup and Health Validation

- [ ] Run `docker compose -f infra/docker-compose.yml up --build`
- [ ] Confirm all services become healthy/running
- [ ] Verify backend `/health` returns success from host
- [ ] Verify frontend loads from host port
- [ ] Verify backend logs show DB connection success (no migration/runtime crash)

### Step 5: Functional Validation Through Docker

- [ ] Register a user through frontend
- [ ] Login and confirm JWT/auth flow still works
- [ ] Create, read, update, and delete tasks end-to-end
- [ ] Verify filtered/paginated list still works
- [ ] Stop and restart stack; verify data persistence via Postgres volume

### Step 6: Fresh-Clone Simulation

- [ ] `docker compose down` and remove running stack
- [ ] Re-run compose startup from clean state (without relying on local non-container services)
- [ ] Confirm app comes back without manual repair steps
- [ ] Capture exact final run command and URLs in evidence log

### Step 7: Documentation and Closeout

- [ ] Update setup docs with Docker run path
- [ ] Record full Day 9 evidence in `docs/day-9-evidence-log.md`
- [ ] Update roadmap/index references if needed
- [ ] Mirror docs updates to binder and verify parity

---

## Done Check

- `docker compose up --build` starts backend, frontend, and Postgres successfully
- Frontend is reachable from host and backend `/health` is OK
- Full auth + task CRUD works through containerized stack
- Postgres data persists across stack restart
- Day 9 evidence and docs updates are complete

## Notes

- Keep secrets out of git-tracked files; use `.env` + `.env.example` patterns.
- Prefer service names (`db`, `backend`) over `localhost` inside containers.
- If startup races occur, add retry/backoff or healthcheck-based readiness handling rather than manual waits.
