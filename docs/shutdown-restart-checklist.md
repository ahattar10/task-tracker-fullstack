# Shutdown and Restart Checklist

Use this at the end of the day so you can stop cleanly and resume fast tomorrow.

## End-of-Day Shutdown

Run these steps in order.

### 1. Save Project State

- Finish the smallest working unit possible.
- Update the current day's checklist and evidence log if anything changed.
- Write a short note about the next task before stopping.

### 2. Check Git State

From the repository root:

```powershell
git status -sb
```

Desired result:

- Clean working tree if the day is complete.
- If not clean, make sure you understand exactly what is still uncommitted.

### 3. Stop Local Backend Dev Server

If `python -m app.dev_server` is running in a terminal:

- Press `Ctrl+C` in that terminal.

### 4. Stop Frontend Dev Server

If `npm run dev` is running:

- Press `Ctrl+C` in that terminal.

### 5. Stop Docker Services If You Started Them

If you were using the Day 9+ containerized stack, from `infra/` run:

```powershell
docker compose down
```

Use `docker compose down --remove-orphans` if you want a slightly cleaner stop after testing.

### 6. Handle the Python Venv

If a backend virtual environment is active:

```powershell
deactivate
```

Notes:

- This is optional.
- Leaving the venv active does not damage anything.
- Closing the terminal also ends it.

### 7. Close Extra Terminals and Windows

- Close terminals you do not need.
- Leave VS Code open only if you want the same workspace restored tomorrow.

### 8. Sync Binder Docs at Closeout

If `docs/` changed today, follow the normal mirror process:

1. Commit and push in `task-tracker-fullstack`.
2. Sync `docs/` to `binder for project/docs`.
3. Run the parity check.

### 9. Final End-of-Day Check

Before you stop, make sure you can answer these:

- What did I finish today?
- What is the next exact task tomorrow?
- Is anything still running that I do not want left open?
- Is my work committed if I meant to save the day's progress?

## Next-Day Restart

Use this sequence tomorrow.

### 1. Open the Repo

Open the workspace at:

```text
C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack
```

### 2. Read the Current Working Docs

Open these first:

1. `docs/doc-index.md`
2. The current day's checklist
3. The current day's evidence log
4. `docs/master-roadmap.md`

If the current day has not started execution yet (for example, Day 11 prep only), keep the evidence log in template mode (`TBD`) until preflight and implementation runs are actually executed.

### 3. Check Git Status

From repo root:

```powershell
git status -sb
git pull
```

### 4. Choose Your Run Mode

Pick one:

- Local backend/frontend dev
- Docker Compose full stack
- Docs-only session

### 5. Start Local Backend Mode

If working locally on backend tasks:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
.\.venv\Scripts\python.exe -m app.dev_server
```

If using the policy-safe venv, use that interpreter path instead.

### 6. Start Local Frontend Mode

In another terminal:

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
.\scripts\enable-portable-node.ps1
cd frontend
npm run dev
```

### 7. Start Docker Compose Mode

If resuming the containerized stack instead:

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\infra"
docker compose up --build -d
docker compose exec -T backend alembic upgrade head
```

### 8. Run the Preflight Check

Before new coding work, run the normal preflight for the day and record PASS/FAIL in the current evidence log.

### 9. Resume With One Exact Task

Do not restart by browsing randomly. Resume from the note you left yourself the night before.

## Fast Version

If you want the shortest version, use this:

### Stop Tonight

1. Update docs.
2. Check `git status -sb`.
3. Stop backend/frontend/Docker if running.
4. Optionally run `deactivate`.
5. Close terminals.

### Start Tomorrow

1. Open repo.
2. Read `docs/doc-index.md` and today's checklist.
3. Run `git status -sb` and `git pull`.
4. Start the stack you need.
5. Run preflight.
6. Continue with one exact task.