# Setup and Run Guide

This page explains how to start the project from a fresh checkout.

## Day Mapping

- Day 1: backend setup and health-check validation
- Day 2: backend scaffold verification
- Day 3: Postgres integration, migration, and CRUD validation

## Python Interpreter Choice (Important)

Use one of these interpreter approaches consistently for all backend commands:

- Local backend venv: `backend/.venv` (normal setup)
- Policy-safe venv: `C:\projects\.venvs\task-tracker` (use this if OneDrive policy blocks local `.venv`)

## What You Need

Install these first:

- Git
- Python 3.11+
- Node.js LTS
- Docker Desktop

Optional but useful:

- VS Code
- PostgreSQL client tools

## Project Layout

- `frontend/` will hold the React app
- `backend/` holds the FastAPI app
- `docs/` holds project notes and references
- `infra/` will hold Docker and deployment files

## Current Backend Status

The backend currently has:

- a root route at `GET /`
- a health route at `GET /health`
- environment-based settings in `app/core/config.py`
- async SQLAlchemy 2.0 + psycopg3 connection to Postgres
- Alembic migrations under `backend/alembic/`
- Task CRUD endpoints under `/tasks` (POST, GET list, GET one, PUT, DELETE)

## Rebuild From Zero (Backend)

Use this exact sequence on a fresh machine or fresh clone.

Step 1: Open a terminal in the repository root.

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
```

Step 2: Create and activate backend virtual environment.

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Step 3: Install dependencies and environment file.

```powershell
pip install -r requirements.txt
Copy-Item .env.example .env
```

Step 4: Start Postgres (Docker Desktop must be running).

```powershell
docker compose -f ..\infra\docker-compose.yml up -d db
```

Step 5: Run database migrations.

```powershell
alembic upgrade head
```

Step 6: Start the API (recommended command).

```powershell
.\.venv\Scripts\python.exe -m app.dev_server
```

Alternative (also valid):

```powershell
python -m app.dev_server
```

Policy-safe variant:

```powershell
C:\projects\.venvs\task-tracker\Scripts\python.exe -m app.dev_server
```

Then open:

- http://127.0.0.1:8000/
- http://127.0.0.1:8000/health
- http://127.0.0.1:8000/docs  (Swagger UI for the Task CRUD endpoints)

## One-Copy Day 3 Run Block (Policy-Safe)

Use this if you want a single copy/paste flow from repo root.

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
docker compose -f .\infra\docker-compose.yml up -d db
cd .\backend
C:\projects\.venvs\task-tracker\Scripts\python.exe -m alembic upgrade head
C:\projects\.venvs\task-tracker\Scripts\python.exe -m app.dev_server
```

## One-Copy Day 3 Run Block (Local .venv)

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
cd ..
docker compose -f .\infra\docker-compose.yml up -d db
cd .\backend
.\.venv\Scripts\python.exe -m alembic upgrade head
.\.venv\Scripts\python.exe -m app.dev_server
```

## Expected Result

- `/` should return a small running message
- `/health` should return `status: ok`
- `/docs` should list the `/tasks` CRUD endpoints
- `POST /tasks` with `{"title": "Hello"}` should return a task with an `id`

Quick terminal verification:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/health" | ConvertTo-Json -Compress
```

Expected response:

```json
{"status":"ok","environment":"development"}
```

If this response appears, Day 2 backend scaffold is confirmed working.

For Day 3 completion, continue by validating CRUD against Postgres and recording evidence in `docs/day-3-evidence-log.md`.

## Testing The Task Endpoints

Open `backend/requests.http` in VS Code and click **Send Request** above each
block (requires the REST Client extension). Or use Swagger at `/docs`.

Optional automated smoke tests:

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
.\scripts\day3-smoke-test.ps1
```

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
.\scripts\day4-auth-smoke-test.ps1
```

## What To Do Next After It Runs

1. Add the Postgres database connection.  ✅ done
2. Build task models.                     ✅ done
3. Add CRUD routes.                       ✅ done
4. Add authentication.
5. Start the frontend app.

## Troubleshooting Notes

## Quick Fail Checklist (30 Seconds)

- Are you in `task-tracker-fullstack/backend` before backend commands?
- Is Docker Desktop engine running?
- Did `docker compose ... up -d db` complete successfully?
- Did `alembic upgrade head` run without errors?
- Are you using the correct Python interpreter path for your environment?
- Are you starting backend with `python -m app.dev_server`?

- If `python` is missing, install Python and reopen the terminal.
- If PowerShell blocks activation, allow script execution for the session or use a different shell.
- If the port is busy, free port 8000 or change `app_port` in `backend/.env`.
- If the API returns 500s on `/tasks` calls, check that `docker compose ... up -d db` is running and that `alembic upgrade head` ran without errors.
- To reset the database: `docker compose -f infra\docker-compose.yml down -v` then `up -d db` and `alembic upgrade head` again.
