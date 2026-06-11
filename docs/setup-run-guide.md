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

Operational rule:

- Backend commands must use a backend venv interpreter.
- Activation is optional if you run the interpreter path directly.
- Frontend, docs, and git commands do not require Python venv activation.

## Work-Machine Policy-Safe Setup (Recommended)

If your company policy blocks Python DLL files inside OneDrive paths, keep the repo in
OneDrive and create the virtual environment outside OneDrive.

One-time setup:

```powershell
python -m venv C:\projects\.venvs\task-tracker
C:\projects\.venvs\task-tracker\Scripts\Activate.ps1
pip install -r "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend\requirements.txt"
```

Daily start command:

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend"
C:\projects\.venvs\task-tracker\Scripts\python.exe -m app.dev_server
```

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

Why this is recommended:

- It avoids shell confusion about whether a venv is active.
- It guarantees backend dependencies are used from the correct environment.

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

## Frontend Local Dev (Vite)

Run the frontend from the repo's portable Node toolchain so versions stay consistent across machines:

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
.\scripts\enable-portable-node.ps1
cd frontend
npm install   # only on first run / after dependency changes
npm run dev
```

Then open http://127.0.0.1:5173.

API routing rule (important):

- For local dev, leave `VITE_API_BASE_URL` **unset** in `frontend/.env`. The frontend then sends requests to `/api`, and Vite's proxy (see `frontend/vite.config.ts`) forwards them to `http://127.0.0.1:8000`.
- Only set `VITE_API_BASE_URL` to an explicit URL (e.g. a VS Code dev tunnel) when you intentionally want to test against a remote backend. If a stale tunnel URL is left in `.env`, login and other API calls will hang silently because the frontend cannot reach the configured host. Comment out the override and restart Vite to recover.

## Day 9+: Docker Compose Full Stack

For a containerized dev environment that mimics cloud deployment, use Docker Compose to run all three services (database, backend, frontend) together.

### Prerequisites

- Docker Desktop installed and running
- Git branch clean and synced
- Day 8 gate confirmed PASS in docs/day-8-evidence-log.md

### One-Copy Full-Stack Start (Recommended)

From the repository root:

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\infra"
docker compose down --remove-orphans  # clean up any old containers
docker compose up --build -d           # build and start all services
```

Wait 5-10 seconds for services to start, then run migrations:

```powershell
docker compose exec -T backend alembic upgrade head
```

Then verify:

```powershell
docker compose ps
```

All three containers (`db`, `backend`, `frontend`) should show `Up` or `Healthy` status.

### Access Points

- **Frontend**: http://127.0.0.1:3000 (full-stack SPA)
- **Backend API**: http://127.0.0.1:8000 (OpenAPI docs at /docs)
- **Backend Health**: http://127.0.0.1:8000/health
- **Database**: localhost:5432 (PostgreSQL, credentials in docker-compose.yml)

### Cleanup / Restart

**Stop stack and preserve data:**

```powershell
docker compose down
```

**Stop stack and wipe database (fresh state):**

```powershell
docker compose down -v
```

**View logs:**

```powershell
docker compose logs backend --tail 50
docker compose logs frontend --tail 50
docker compose logs db --tail 50
```

### Data Persistence

By default, database data persists in a named volume (`task_tracker_pgdata`) across container restarts. If you run `docker compose down` without `-v`, the volume survives and data reappears when you `docker compose up` again. Use `-v` to delete the volume and reset the database.

### Common Issues

- **Services won't start**: Check that Docker Desktop is running and port 3000 and 8000 are not already in use.
- **Backend 500 errors**: Ensure migrations ran (`docker compose exec -T backend alembic upgrade head`) and check logs.
- **Frontend shows "Connection refused"**: Verify backend service is healthy (`docker compose ps`); nginx proxy config requires the trailing slash in proxy_pass.
- **Frontend container marked unhealthy**: Use IPv4 loopback for health probes (`http://127.0.0.1/health`) instead of `localhost` to avoid container IPv6 localhost resolution failures.
- **Port 3000 already in use**: Either stop the conflicting service or map to a different host port by editing `docker-compose.yml` (change `3000:80` to `3001:80`, etc.).

## Git And GitHub Quick Reference

This repository ships with an author-guard pre-commit hook under `.githooks/pre-commit`. It refuses any commit whose author identity is not `ahattar10 <88306485+ahattar10@users.noreply.github.com>`. Activate it once per clone:

```powershell
git config --local core.hooksPath .githooks
git config --local user.name  "ahattar10"
git config --local user.email "88306485+ahattar10@users.noreply.github.com"
```

For details and the (rare) bypass procedure, see `.githooks/README.md`.

If this is a brand-new local folder that is not cloned from GitHub yet:

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ahattar10/task-tracker-fullstack.git
git push -u origin main
```

Normal daily sync commands:

```powershell
git add .
git commit -m "Describe your changes"
git push
```

If you are on another machine:

```powershell
git clone https://github.com/ahattar10/task-tracker-fullstack.git
```

If already cloned, pull updates:

```powershell
git pull
```

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
