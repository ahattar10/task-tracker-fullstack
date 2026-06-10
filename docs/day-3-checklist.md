# Day 3 Checklist — Database Integration (Postgres)

## Objective
Connect the backend to PostgreSQL, apply migrations, and verify Task CRUD endpoints against real records.

## Estimated Time
4 to 6 hours

## Difficulty
Medium

---

## What To Do

- Connect backend to Postgres
- Create/verify Task model and migration
- Build/verify CRUD endpoints

## Why This Matters

Demonstrates SQL usage, schema migration workflow, and backend data integration.

---

## Prerequisites

- Docker Desktop running
- Backend dependencies installed
- `.env` present at `backend/.env`

---

## Execution Checklist

- [ ] Start database container

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
docker compose -f .\infra\docker-compose.yml up -d db
```

- [ ] Start backend API (recommended for work machine)

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend"
C:\projects\.venvs\task-tracker\Scripts\python.exe -m app.dev_server
```

Alternative command if local backend `.venv` is allowed:

```powershell
.\.venv\Scripts\python.exe -m app.dev_server
```

- [ ] Apply latest migration

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend"
alembic upgrade head
```

- [ ] Verify Task CRUD against Postgres

Use `http://127.0.0.1:8000/docs` or `backend/requests.http`.

1. Create with `POST /tasks`
2. List with `GET /tasks`
3. Read one with `GET /tasks/{id}`
4. Update with `PUT /tasks/{id}`
5. Delete with `DELETE /tasks/{id}`
6. Confirm deleted task returns 404 on `GET /tasks/{id}`

- [ ] Capture evidence in `docs/day-3-evidence-log.md`

---

## Done Check

- CRUD operations work against real database records.

Suggested evidence to capture:

- Successful create response (201)
- Successful update response (200)
- Successful delete response (204)
- Not found response after delete (404)
