# Day 10 Evidence Log

Date: 2026-06-11
Owner: Anthony Hattar
Day Scope: Harden Docker environment for production readiness—validate .env configuration, verify health checks, ensure fresh-clone scenario works, and document troubleshooting steps
Environment: Windows 11, VS Code workspace terminal

## Scope Target

- Planned outcomes for this day:
  - .env.example files created (no secrets) and tracked in git
  - .gitignore verified (.env ignored, examples tracked)
  - All services have working health checks
  - Startup order guaranteed via `depends_on: condition: service_healthy`
  - Fresh-clone scenario tested (repo clone → docker compose up → works)
  - Restart policies and error handling documented
- Out-of-scope items:
  - CI/CD pipeline work (Day 12)
  - Cloud deployment work (Day 13)
  - Performance optimization (future)

## Preconditions

- [x] Day 9 gate confirmed PASS (docker-compose.yml, Dockerfiles, E2E tests complete)
- [x] Docker Compose stack running or recently stopped (all services configured)
- [x] Working directory: task-tracker-fullstack root
- [x] Git branch clean and synced
- [x] All Day 9 code changes committed and pushed

Notes:

- If any .env files are already tracked in git, they must be removed and added to .gitignore before Day 10 completion.
- Fresh-clone test should happen in a temporary directory (not the main workspace).

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | `## main...origin/main` at preflight start | PASS |
| P2 | Select-String infra/docker-compose.yml healthcheck | Health checks present on all 3 services | Found 3 `healthcheck` blocks (db, backend, frontend) | PASS |
| P3 | Get-ChildItem backend,frontend -Filter .env* | .env.example files exist or need creation | backend/.env.example and frontend/.env.example present; local .env files also present (ignored) | PASS |
| P4 | Select-String .gitignore '^\\.env$|^\\.venv/?$' | .env and .venv properly ignored | `.env` and `.venv/` found in .gitignore | PASS |
| P5 | docker compose config \| Select-String restart: | Restart policy documented | `restart: unless-stopped` on all 3 services | PASS |

Preflight Result: PASS

## Implementation Evidence

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| I1 | backend/.env.example created with all required variables | File exists, no secrets, documented | backend/.env.example verified present with APP_* + DATABASE_* sample values (no private secrets) | PASS |
| I2 | frontend/.env.example created with VITE_API_BASE_URL and other config | File exists, no secrets, documented | frontend/.env.example verified present with VITE_API_BASE_URL and GA sample ID | PASS |
| I3 | .gitignore verified for .env and .env.example patterns | .env ignored, .example tracked | `git ls-files *.env` returned none; `git ls-files *.env.example` returned 2 files | PASS |
| I4 | Health checks on db, backend, frontend services | All 3 services report health status | Verified all 3 health checks in compose; fixed frontend check target to `127.0.0.1` | PASS |
| I5 | `docker compose ps` shows all services healthy or starting | No unhealthy services at startup | Final state: db healthy, backend healthy, frontend healthy | PASS |
| I6 | Restart policy configured in docker-compose.yml | Restart behavior documented | `restart: unless-stopped` confirmed on db/backend/frontend | PASS |
| I7 | Manual health check commands succeed | `pg_isready`, curl `/health`, nginx responds | db accepted connections; backend `/health` returned status ok; frontend `/health` returned success after IPv4 fix | PASS |
| I8 | Logs clean and informative (no stack traces on normal startup) | Logs review shows no errors | Backend logs show repeated 200 `/health`; no startup exceptions in normal run | PASS |

## Fresh-Clone Validation

| Check ID | Action | Expected | Actual | Status |
|---|---|---|---|---|
| FC1 | Clone repo in temp directory | Git clone succeeds without errors | Cloned to `%TEMP%/task-tracker-fullstack-day10-clone` successfully | PASS |
| FC2 | Run `docker compose up --build -d` from temp clone | All services start and become healthy | Stack built and started in clone; services reached healthy/starting quickly | PASS |
| FC3 | Run migrations: `docker compose exec -T backend alembic upgrade head` | Migrations execute without errors | Alembic upgrade head completed without errors | PASS |
| FC4 | Test frontend: `curl http://127.0.0.1:3000` | Returns 200 HTML | `FC_FRONTEND_STATUS=200` | PASS |
| FC5 | Test backend health: `curl http://127.0.0.1:8000/health` | Returns 200 JSON with status ok | `FC_BACKEND_STATUS=200`, body `{"status":"ok","environment":"production"}` | PASS |
| FC6 | Register user via frontend UI | Account creation succeeds (201) | Automated via `scripts/day9-compose-verify.ps1`: `REGISTER=201` | PASS |
| FC7 | Create and persist task | Task appears in list and survives page reload | Automated via `scripts/day9-compose-verify.ps1`: create/list/update/delete all succeeded | PASS |
| FC8 | No manual intervention or workarounds used | Entire flow automated | Full flow completed by scripted clone + compose + verify commands | PASS |

## Reliability and Configuration Notes

- Restart policy: all services use `restart: unless-stopped` in compose.
- Health checks: db(5s interval), backend(10s interval + 10s start_period), frontend(10s interval + 5s start_period).
- Frontend reliability fix: changed healthcheck target from `http://localhost/health` to `http://127.0.0.1/health` to avoid IPv6 localhost resolution failures in container health probes.
- Startup timing: frontend/backend may show `health: starting` briefly, then transition to healthy without manual action.

## Documentation Updates

- Checklist updated: docs/day-10-checklist.md
- Evidence log updated: docs/day-10-evidence-log.md
- Setup guide updated: docs/setup-run-guide.md (Day 10 reliability note added)
- Troubleshooting notes updated: docs/troubleshooting-notes.md (frontend healthcheck localhost vs 127.0.0.1)
- Roadmap/index updates: docs/master-roadmap.md Day 10 marked complete

## Git Verification

- Branch: main
- git status --short result: `M frontend/Dockerfile`, `M infra/docker-compose.yml`, plus Day 10 docs updates
- Synced with remote: pending final Day 10 commit

## Issues and Resolutions

- Issue: Frontend container reported `unhealthy` although app served requests.
- Resolution: Updated frontend health checks (Dockerfile + compose) to use `127.0.0.1` instead of `localhost`.
- Residual risk: low. Health now stable; keep IPv4 target for nginx health probes.

## Day 10 Completion Gate

- [x] Scope complete or explicitly deferred
- [x] Validation complete
- [x] Evidence complete

**Day 10 Gate Result: PASS** ✅
