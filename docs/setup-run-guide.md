# Setup and Run Guide

This page explains how to start the project from a fresh checkout.

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

## How To Run The Backend At Home

From the project root:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Then open:

- http://127.0.0.1:8000/
- http://127.0.0.1:8000/health

## Expected Result

- `/` should return a small running message
- `/health` should return `status: ok`

## What To Do Next After It Runs

1. Add the Postgres database connection.
2. Build task models.
3. Add CRUD routes.
4. Add authentication.
5. Start the frontend app.

## Troubleshooting Notes

- If `python` is missing, install Python and reopen the terminal.
- If PowerShell blocks activation, allow script execution for the session or use a different shell.
- If the port is busy, change the port in the uvicorn command.
