# Environment Injection How-To (Exactly What We Did)

Date: 2026-06-10
Project: task-tracker-fullstack

## Goal
Enable terminal environment-variable injection from .env and verify DATABASE_URL is available.

## What We Changed

### 1) Enabled terminal env-file injection in workspace settings
Created/updated `.vscode/settings.json` with:

```json
{
  "python.terminal.useEnvFile": true,
  "python.envFile": "${workspaceFolder}/backend/.env"
}
```

Why: this project stores `.env` in `backend/.env`, not at workspace root.

### 2) Verified the setting file exists and contains those values
Confirmed workspace file content in:
- `.vscode/settings.json`

### 3) Checked terminal env value (initially empty)
Ran a verification command and saw:
- `DATABASE_URL=`
- `PY_DATABASE_URL=None`

This can happen in already-open terminal sessions.

### 4) Loaded backend/.env into the active terminal session (manual fallback)
Ran this in terminal from `backend/`:

```powershell
Set-Location 'C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend'
Get-Content '.env' | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  $parts = $_.Split('=', 2)
  if ($parts.Count -eq 2) {
    $name = $parts[0].Trim()
    $value = $parts[1].Trim()
    Set-Item -Path ("Env:" + $name) -Value $value
  }
}
Write-Output ("DATABASE_URL=" + $env:DATABASE_URL)
.\.venv\Scripts\python.exe -c "import os; print('PY_DATABASE_URL=' + str(os.getenv('DATABASE_URL')))"
```

Result after manual load:
- `DATABASE_URL=postgresql+psycopg://taskuser:taskpass@localhost:5432/tasktracker`
- `PY_DATABASE_URL=postgresql+psycopg://taskuser:taskpass@localhost:5432/tasktracker`

## What To Do Next Time

### Preferred
1. Open a brand-new VS Code integrated terminal.
2. Activate venv.
3. Verify quickly:

```powershell
Write-Output "DATABASE_URL=$env:DATABASE_URL"
```

### If still empty
Use the manual fallback loader command above to import `backend/.env` into the current terminal session.

## Notes
- This affects terminal process env vars.
- App-level config still reads `.env` directly via pydantic-settings, so the app can work even when terminal injection is off.
