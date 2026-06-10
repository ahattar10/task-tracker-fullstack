# Day 5 Checklist — API Quality

## Objective
Improve API quality with stronger request validation, consistent responses, pagination, and filtering support.

## Estimated Time
3 to 5 hours

## Difficulty
Medium

---

## What To Do

- Add/verify request validation schemas for task endpoints
- Ensure consistent HTTP status code usage
- Add pagination support to `GET /tasks`
- Add filtering support to `GET /tasks`
- Verify API behavior with manual checks

## Why This Matters

Makes the backend easier to use, easier to debug, and safer for frontend integration.

## Read Order

1. Confirm Day 4 checklist is complete.
2. Read `docs/master-roadmap.md` (Day 5 section).
3. Read `docs/project-plan.md` (Day 5 section).
4. Read `docs/setup-run-guide.md` for startup commands.
5. Execute this checklist.
6. Use `docs/troubleshooting-notes.md` only if blocked.

---

## Prerequisites

- Day 4 completed and validated
- Postgres container running
- Migration state current (`alembic upgrade head`)
- Backend starts with `python -m app.dev_server`

---

## Execution Checklist

- [ ] Review `app/schemas.py` and confirm request models are strict enough
- [ ] Confirm create/update endpoints return validation errors for invalid payloads
- [ ] Standardize response/error format where needed
- [ ] Confirm status codes are correct and consistent (`200`, `201`, `204`, `400`, `401`, `404`, `409`, `422`)

- [ ] Add pagination query params to `GET /tasks` (`page`, `limit`)
- [ ] Return paginated payload shape with metadata (for example: `items`, `total`, `page`, `pages`)
- [ ] Validate boundary cases (`page < 1`, `limit <= 0`, very large `limit`)

- [ ] Add filtering query params to `GET /tasks`
- [ ] Verify status filter (`/tasks?status=completed`)
- [ ] Verify priority filter (`/tasks?priority=high`)
- [ ] Verify keyword search (`/tasks?search=keyword`)

- [ ] Verify combined pagination + filter behavior
- [ ] Verify auth still enforced for all task routes
- [ ] Capture request/response evidence for at least 5 checks

---

## Suggested Validation Commands

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
```

Use Swagger at `http://127.0.0.1:8000/docs` or `backend/requests.http` and validate:

1. invalid create/update body returns validation details
2. `GET /tasks?page=1&limit=5` returns paginated response
3. `GET /tasks?status=completed`
4. `GET /tasks?priority=high`
5. `GET /tasks?search=test`

---

## Done Check

- API returns clear validation errors
- Pagination and filtering both work and are documented
- Task endpoint behavior remains auth-protected and user-scoped
