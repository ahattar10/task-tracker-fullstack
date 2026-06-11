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
- [ ] Working directory: task-tracker-fullstack root
- [ ] Git branch clean and synced
- [ ] All Day 9 code changes committed and pushed

Notes:

- If any .env files are already tracked in git, they must be removed and added to .gitignore before Day 10 completion.
- Fresh-clone test should happen in a temporary directory (not the main workspace).

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | TBD | TBD |
| P2 | cat infra/docker-compose.yml \| grep -i health | Health checks present on all 3 services | TBD | TBD |
| P3 | ls -la backend/.env* frontend/.env* | .env.example files exist or need creation | TBD | TBD |
| P4 | cat .gitignore \| grep -E "\.env\|\.venv" | .env and .venv properly ignored | TBD | TBD |
| P5 | docker compose config \| grep -i "restart" | Restart policy documented | TBD | TBD |

Preflight Result: TBD

## Implementation Evidence

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| I1 | backend/.env.example created with all required variables | File exists, no secrets, documented | TBD | TBD |
| I2 | frontend/.env.example created with VITE_API_BASE_URL and other config | File exists, no secrets, documented | TBD | TBD |
| I3 | .gitignore verified for .env and .env.example patterns | .env ignored, .example tracked | TBD | TBD |
| I4 | Health checks on db, backend, frontend services | All 3 services report health status | TBD | TBD |
| I5 | `docker compose ps` shows all services healthy or starting | No unhealthy services at startup | TBD | TBD |
| I6 | Restart policy configured in docker-compose.yml | Restart behavior documented | TBD | TBD |
| I7 | Manual health check commands succeed | `pg_isready`, curl `/health`, nginx responds | TBD | TBD |
| I8 | Logs clean and informative (no stack traces on normal startup) | Logs review shows no errors | TBD | TBD |

## Fresh-Clone Validation

| Check ID | Action | Expected | Actual | Status |
|---|---|---|---|---|
| FC1 | Clone repo in temp directory | Git clone succeeds without errors | TBD | TBD |
| FC2 | Run `docker compose up --build -d` from temp clone | All services start and become healthy | TBD | TBD |
| FC3 | Run migrations: `docker compose exec -T backend alembic upgrade head` | Migrations execute without errors | TBD | TBD |
| FC4 | Test frontend: `curl http://127.0.0.1:3000` | Returns 200 HTML | TBD | TBD |
| FC5 | Test backend health: `curl http://127.0.0.1:8000/health` | Returns 200 JSON with status ok | TBD | TBD |
| FC6 | Register user via frontend UI | Account creation succeeds (201) | TBD | TBD |
| FC7 | Create and persist task | Task appears in list and survives page reload | TBD | TBD |
| FC8 | No manual intervention or workarounds used | Entire flow automated | TBD | TBD |

## Reliability and Configuration Notes

- Document any restart policies configured
- Note any health check response times or timeout configurations
- Record any special environment variable requirements
- Capture any startup timing considerations or race conditions

## Documentation Updates

- Checklist updated: docs/day-10-checklist.md
- Evidence log updated: docs/day-10-evidence-log.md
- Setup guide updated: docs/setup-run-guide.md (if needed)
- Troubleshooting notes updated: docs/troubleshooting-notes.md (if needed)
- Roadmap/index updates: TBD

## Git Verification

- Branch: main
- git status --short result: TBD
- Synced with remote: TBD

## Issues and Resolutions

- Issue: TBD
- Resolution: TBD
- Residual risk: TBD

## Day 10 Completion Gate

- [ ] Scope complete or explicitly deferred
- [ ] Validation complete
- [ ] Evidence complete

**Day 10 Gate Result: TBD** ⏳
