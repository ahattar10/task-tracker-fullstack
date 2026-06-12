# Day 13 Checklist - Deployment

## Objective
Deploy the backend and frontend to their target hosting platforms, verify the live application works, and document evidence for the production rollout.

## Estimated Time
4 to 7 hours

## Difficulty
Medium

---

## Agreed Build Decisions (Locked from Day 12)

- Day 12 CI/CD is PASS and should remain the validation baseline
- Deployment should use the existing app behavior without adding new product scope
- Production settings must stay explicit and documented
- Keep deployment steps reproducible so the live environment can be recreated if needed

## What To Do

- Deploy the backend to Railway
- Set production environment variables in the hosting dashboard
- Run database migrations in the production environment
- Deploy the frontend to Vercel
- Verify the live app responds correctly
- Confirm GA4 events fire in production if they are enabled
- Record all results in `docs/day-13-evidence-log.md`

## Why This Matters

A successful deployment proves the project works beyond local and CI validation:
- Confirms the app runs in a real hosting environment
- Surfaces environment-specific issues before sharing the portfolio
- Makes the project easier to demonstrate to recruiters and reviewers

## Read Order

1. Confirm Day 12 gate is PASS in `docs/day-12-evidence-log.md`.
2. Read `docs/master-roadmap.md` (Day 13 section).
3. Read `docs/project-plan.md` (Day 13 section).
4. Review `docs/setup-run-guide.md` for any environment or run notes.
5. Execute this checklist.
6. Record all outcomes in `docs/day-13-evidence-log.md`.
7. Use `docs/troubleshooting-notes.md` if blocked.

---

## Prerequisites

- Day 12 complete and documented
- Git branch clean and synced
- Backend and frontend build/test checks pass locally or in CI
- Railway and Vercel accounts are available
- Production environment variables are identified
- Database migration command is understood

## Short Day 13 Preflight Checklist

- Railway access confirmed
- Vercel access confirmed
- Production environment variables gathered
- Production migration command confirmed
- Git status clean and synced

---

## Pre-Execution Validation Runs (Required)

| Check ID | Command or Action | Expected | Actual | Status |
|---|---|---|---|---|
| P1 | git fetch --all --prune; git status -sb | Branch clean/synced baseline confirmed | TBD | TBD |
| P2 | Review Day 12 evidence log | CI baseline confirmed | TBD | TBD |
| P3 | Confirm backend build/test command | Backend remains stable before deploy | TBD | TBD |
| P4 | Confirm frontend build/test command | Frontend remains stable before deploy | TBD | TBD |
| P5 | Review production env var list | Deployment inputs understood | TBD | TBD |

Preflight Result: (record PASS / FAIL in evidence log before Step 1)

---

## Execution Checklist

### Step 1: Production Readiness

- [x] Confirm target services and deployment URLs
- [x] Verify required environment variables for backend and frontend
- [x] Confirm database migration strategy for production
- [x] Review rollback or redeploy plan

Acceptance Criteria:
- Deployment targets are identified
- Required variables are documented
- Migration and rollback approach is clear

### Step 2: Backend Deployment

- [x] Deploy backend to Railway
- [x] Set production environment variables
- [x] Run production database migrations
- [x] Confirm backend service is healthy

Acceptance Criteria:
- Backend is reachable in production
- Migrations complete successfully
- Health endpoint returns 200

### Step 3: Frontend Deployment

- [x] Deploy frontend to Vercel
- [x] Set production environment variables if needed
- [x] Confirm frontend loads successfully
- [x] Verify frontend talks to the production backend

Acceptance Criteria:
- Frontend is reachable in production
- Production frontend renders without errors
- API calls work against production backend

### Step 4: Live Application Verification

- [x] Verify `GET /health` returns 200 in production
- [x] Verify login/register flow works in production
- [x] Verify full CRUD works on the live URL
- [ ] Verify GA4 events fire if enabled

Acceptance Criteria:
- Core user flows work in production
- Health endpoint responds successfully
- Analytics events behave as expected

### Step 5: Documentation and Cleanup

- [x] Capture deployment outputs in `docs/day-13-evidence-log.md`
- [ ] Update `docs/master-roadmap.md` if needed
- [ ] Update `docs/doc-index.md` if needed
- [ ] Update README deployment links if needed

Acceptance Criteria:
- Evidence log is complete and traceable
- Documentation reflects production status
- Any changed links are up to date

---

## Done Check

- [x] Backend deployed successfully
- [x] Frontend deployed successfully
- [x] Production health check passed
- [x] Live CRUD verified
- [x] Day 13 evidence log complete
- [ ] Day 13 updates committed and pushed

## Notes

- Keep secrets out of the repository
- Prefer explicit environment variables over hidden defaults
- If production deployment is blocked, record the blocker clearly before moving on
