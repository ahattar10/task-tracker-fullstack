# Troubleshooting Notes

Use this page when something does not start the way you expect.

## Python Is Missing

If `python` is not recognized:

1. Install Python 3.11 or newer.
2. Restart the terminal.
3. Run `python --version` again.

## Node Or npm Is Missing

If `node` or `npm` is not recognized:

1. Install Node.js LTS.
2. Restart the terminal.
3. Run `node --version` and `npm --version` again.

## Git Is Missing

If `git` is not recognized:

1. Install Git.
2. Restart the terminal.
3. Run `git --version` again.

## Python Virtual Environment Will Not Activate

If PowerShell blocks `.venv` activation:

- Use a new PowerShell session.
- Allow script execution for the current session.
- Or use Command Prompt instead.

Note:

- Backend work still requires backend venv dependencies.
- If activation is flaky, run backend commands with the interpreter path directly instead of activating first.

## Application Control Policy Blocks Python DLLs

If you see an error similar to this:

```text
ImportError: DLL load failed while importing _pydantic_core:
An Application Control policy has blocked this file.
```

This is usually caused by running `.venv` from a OneDrive-synced path.

Use this fix:

```powershell
python -m venv C:\projects\.venvs\task-tracker
C:\projects\.venvs\task-tracker\Scripts\Activate.ps1
pip install -r "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend\requirements.txt"
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend"
C:\projects\.venvs\task-tracker\Scripts\python.exe -m app.dev_server
```

Keep the project code in OneDrive, but keep the active Python environment outside OneDrive.

## Backend Will Not Start

Check these first:

- The virtual environment is activated.
- Dependencies are installed with `pip install -r requirements.txt`.
- The `.env` file exists.
- Nothing else is already using port `8000`.

If you see `No module named uvicorn`:

1. You are likely in the wrong folder or using the wrong Python environment.
2. Change to `task-tracker-fullstack/backend`.
3. Start with backend venv Python directly (preferred):

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend"
.\.venv\Scripts\python.exe -m app.dev_server
```

Scope reminder:

- This venv requirement applies to backend Python commands only.
- Frontend (`npm`), docs, and git commands do not depend on Python venv activation.

## Health Endpoint Does Not Load

If `http://127.0.0.1:8000/health` does not work:

1. Confirm `uvicorn` is still running.
2. Confirm the backend started without errors.
3. Check the terminal for the exact error message.

## Frontend Container Shows Unhealthy In Docker Compose

If `docker compose ps` shows frontend `unhealthy` but the UI still loads:

1. Check the container health output:

```powershell
docker inspect --format "{{json .State.Health}}" task-tracker-frontend
```

2. If you see `wget: can't connect to remote host: Connection refused`, update health checks to target IPv4 loopback:

- Use `http://127.0.0.1/health` (not `http://localhost/health`) in:
	- `frontend/Dockerfile` HEALTHCHECK
	- `infra/docker-compose.yml` frontend healthcheck

3. Rebuild and restart frontend:

```powershell
docker compose -f infra/docker-compose.yml up --build -d frontend
docker compose -f infra/docker-compose.yml ps
```

## File Path Or Folder Not Found

If a folder or file seems missing:

- Make sure you opened `c:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack`.
- Check that you are in the project root before running commands.
- Reopen the folder in VS Code if needed.

## When To Update This File

Add a note here whenever you hit a new issue that takes more than a few minutes to solve.
