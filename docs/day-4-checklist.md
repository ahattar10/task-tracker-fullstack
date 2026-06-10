# Day 4 Checklist — Authentication and Route Protection

## Objective
Implement authentication (register/login), issue JWT tokens, and protect task routes so only authenticated users can access their own data.

## Estimated Time
4 to 6 hours

## Difficulty
Medium

---

## What To Do

- Add auth endpoints (`/auth/register`, `/auth/login`)
- Generate and validate JWT tokens
- Protect task routes with auth dependency
- Verify authorized vs unauthorized access behavior

## Why This Matters

Demonstrates secure API design, identity flow, and access control fundamentals.

## Read Order

1. Confirm Day 3 checklist is complete.
2. Read `docs/setup-run-guide.md` for startup commands.
3. Execute this checklist.
4. Capture results in `docs/day-4-evidence-log.md`.
5. Use `docs/troubleshooting-notes.md` only if blocked.

---

## Prerequisites

- Day 3 completed and validated
- Postgres container running
- Migration state current (`alembic upgrade head`)
- Backend starts with `python -m app.dev_server`

---

## Execution Checklist

- [x] Add auth data model changes (if needed)
- [x] Add password hashing utility
- [x] Implement `POST /auth/register`
- [x] Implement `POST /auth/login`
- [x] Return JWT token on successful login
- [x] Add auth dependency to protected routes
- [x] Ensure `/tasks` endpoints require valid token
- [x] Verify missing token returns `401` or `403`
- [x] Verify invalid token returns `401` or `403`
- [x] Verify valid token allows access (`200`)
- [x] Capture evidence in `docs/day-4-evidence-log.md`

- [x] Run automated auth smoke test (optional but recommended)

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
.\scripts\day4-auth-smoke-test.ps1
```

---

## Done Check

- Authentication endpoints work and token-based protection is enforced.

Suggested evidence to capture:

- Successful register response
- Successful login response with token payload
- Unauthorized response without token
- Successful response with valid token
- Smoke test output from `scripts/day4-auth-smoke-test.ps1` (optional)
