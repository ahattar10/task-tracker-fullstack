# Day 13 Evidence Log

Date: 2026-06-12
Owner: Anthony Hattar
Day Scope: Deploy the app to production hosting, verify live behavior, and document production evidence
Environment: Windows 11, VS Code workspace terminal

## Scope Target

- Planned outcomes for this day:
  - Backend deployed to Railway
  - Frontend deployed to Vercel
  - Production health check passes
  - Live CRUD verified
  - GA4 events verified if enabled
- Out-of-scope items:
  - New product feature development
  - AI upgrade work (Week 3)
  - Major refactors unrelated to deployment

## Preconditions

- [x] Day 12 gate confirmed PASS
- [x] Working directory: task-tracker-fullstack root
- [x] Git branch clean and synced
- [x] Backend and frontend validation complete
- [x] Deployment targets and environment variables identified

Notes:

- Record any platform-specific setup details here.
- If deployment requires a manual step, capture it exactly.
- If a blocker appears, document the blocker before changing scope.

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | `## main...origin/main` | PASS |
| P2 | Review Day 12 evidence log | CI baseline confirmed | Day 12 gate reviewed and confirmed PASS | PASS |
| P3 | Confirm backend build/test command | Backend remains stable before deploy | Railway deployment healthy and auth endpoints verified via API checks | PASS |
| P4 | Confirm frontend build/test command | Frontend remains stable before deploy | Vercel deployment loads and authenticates against production backend | PASS |
| P5 | Review production env var list | Deployment inputs understood | Verified `VITE_API_BASE_URL` on Vercel and backend env vars on Railway; CORS allowlist updated | PASS |

Preflight Result: PASS

## Implementation Evidence

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| I1 | Deployment target review | Hosting targets identified | Backend: Railway (`https://task-tracker-fullstack-production.up.railway.app`), Frontend: Vercel (`https://task-tracker-fullstack-rho.vercel.app`) | PASS |
| I2 | Backend deployment | Backend available in production | Railway deployment active and successful | PASS |
| I3 | Backend migrations | Production schema updated successfully | Ran `alembic upgrade head` against public Railway DB URL; reached `0003 (head)` | PASS |
| I4 | Frontend deployment | Frontend available in production | Vercel deployment ready and accessible | PASS |
| I5 | Production health check | `/health` returns 200 in production | Live check returned HTTP 200 with `{"status":"ok","environment":"production"}` | PASS |
| I6 | Live CRUD verification | Core app flows work on the live URL | Login/register and task CRUD verified on live app | PASS |
| I7 | GA4 verification | Analytics events fire in production if enabled | `VITE_GA_MEASUREMENT_ID` not configured in Vercel for this rollout | N/A |
| I8 | Final deployment confirmation | Production rollout is complete | Frontend-backend integration validated end-to-end in production | PASS |

## Production Run Summary

| Step | Command or Trigger | Expected | Actual | Status |
|---|---|---|---|---|
| Backend deploy | Railway auto-deploy from `main` | Backend deployed successfully | Deployment `Fix CORS preflight for Vercel frontend` active and healthy | PASS |
| Backend migrations | `python -m alembic upgrade head` (local backend venv against public Railway DB URL) | Migration completed | Upgrades applied through `0003 (head)` | PASS |
| Frontend deploy | Vercel deployment from `main` | Frontend deployed successfully | Deployment ready at `task-tracker-fullstack-rho.vercel.app` | PASS |
| Health check | `GET /health` on Railway URL | Health endpoint returns 200 | 200 returned from production health endpoint | PASS |
| Live CRUD | Run login/register/task flows on Vercel URL | Task flows work in production | Auth + CRUD flows succeeded in live environment | PASS |
| GA4 | Check Vercel env vars and runtime events | Events fire if enabled | GA4 env var not configured; verification not applicable | N/A |

## Reliability Notes

- Record deployment duration
- Record any platform warnings or environment differences
- Record any manual hotfixes or redeploys
- Record rollback or retry notes if needed

## Documentation Updates

- Checklist updated: docs/day-13-checklist.md
- Evidence log updated: docs/day-13-evidence-log.md
- Testing guidance updated: no change required
- Roadmap updated: docs/master-roadmap.md
- Doc index updated: reviewed, no change required
- README updated: README.md

## Git Verification

- Branch: main
- git status --short result: clean
- Synced with remote: yes

## Issues and Resolutions

- Issue: Production rollout initially included CORS/preflight failures and a stale duplicate Railway project that left obsolete failed deployment records in GitHub.
- Resolution: Fixed CORS middleware handling, applied production DB migrations to head using the Railway database URL, removed the stale Railway project, and deleted obsolete GitHub deployment records so the active production target is the only remaining deployment.
- Residual risk: GA4 verification remains N/A until `VITE_GA_MEASUREMENT_ID` is configured, and database credential rotation is still recommended.

## Day 13 Completion Gate

- [x] Scope complete or explicitly deferred
- [x] Validation complete
- [x] Evidence complete
- [x] Documentation complete
- [x] Source control complete

Day 13 Gate Result: PASS

## Handoff to Next Day

- What is done: Production backend and frontend deployed; migrations applied; health/auth/CORS/CRUD validated.
- What remains: Optional GA4 enablement and credential rotation follow-up.
- First step for next session: Rotate Railway DB password, update secret values, and verify health/auth post-rotation.
