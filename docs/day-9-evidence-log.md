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
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | TBD | TBD |
| P2 | docker --version | Docker CLI available | TBD | TBD |
| P3 | docker compose version | Compose available | TBD | TBD |
| P4 | backend health baseline (non-docker) | Existing app baseline works | TBD | TBD |
| P5 | frontend npm run build baseline | Frontend baseline build works | TBD | TBD |

Preflight Result: PASS / FAIL

## Implementation Evidence

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| I1 | Backend Dockerfile build | Backend image builds successfully | TBD | TBD |
| I2 | Frontend Dockerfile build | Frontend image builds successfully | TBD | TBD |
| I3 | Compose service wiring (`db`, `backend`, `frontend`) | Stack starts with all services | TBD | TBD |
| I4 | Env + network wiring | Services communicate over compose network | TBD | TBD |
| I5 | Named Postgres volume | Data survives restart | TBD | TBD |
| I6 | `docker compose up --build` full run | All services healthy/running | TBD | TBD |
| I7 | Backend health from host | `/health` returns success | TBD | TBD |
| I8 | Frontend host reachability | UI loads and calls backend successfully | TBD | TBD |

## Manual Browser E2E Validation

| Check ID | Action | Expected | Actual | Status |
|---|---|---|---|---|
| M1 | Open frontend container URL | Login/register UI renders | TBD | TBD |
| M2 | Register new user | Account creation succeeds | TBD | TBD |
| M3 | Login | Token/session established | TBD | TBD |
| M4 | Create task | Task appears in list | TBD | TBD |
| M5 | Edit task | Task updates persist | TBD | TBD |
| M6 | Delete task | Task removed successfully | TBD | TBD |
| M7 | Filter/search/pagination sanity | Results behave as expected | TBD | TBD |
| M8 | Restart stack | Data remains present (volume persistence) | TBD | TBD |

## Functional Verification Notes

- Capture regressions versus Day 8 behavior (if any) and resolution steps.
- Record any container-specific caveats (CORS/proxy, hostnames, port mapping).

## Documentation Updates

- Checklist updated: docs/day-9-checklist.md
- Evidence log updated: docs/day-9-evidence-log.md
- Roadmap/index updates: TBD
- Binder parity status: TBD

## Git Verification

- Branch: main
- git status --short result: TBD
- Synced with remote: TBD

## Issues and Resolutions

- Issue: TBD
- Resolution: TBD
- Residual risk: TBD

## Day 9 Completion Gate

- [ ] Scope complete or explicitly deferred
- [ ] Validation complete
- [ ] Evidence complete
- [ ] Documentation complete
- [ ] Source control complete

Gate Result: PASS / FAIL

## Sign-Off Block

- Day: DAY-9
- Gate Result: PASS / FAIL
- Reviewed By: Anthony Hattar
- Date: YYYY-MM-DD
- Notes: TBD

## Handoff to Next Day

- What is done: TBD
- What remains: TBD
- First step for Day 10: open docs/master-roadmap.md Day 10 section and confirm Day 9 gate result.
