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

## Backend Will Not Start

Check these first:

- The virtual environment is activated.
- Dependencies are installed with `pip install -r requirements.txt`.
- The `.env` file exists.
- Nothing else is already using port `8000`.

If you see `No module named uvicorn`:

1. You are likely in the wrong folder or using the wrong Python environment.
2. Change to `task-tracker-fullstack/backend`.
3. Start with backend venv Python directly:

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack\backend"
.\.venv\Scripts\python.exe -m app.dev_server
```

## Health Endpoint Does Not Load

If `http://127.0.0.1:8000/health` does not work:

1. Confirm `uvicorn` is still running.
2. Confirm the backend started without errors.
3. Check the terminal for the exact error message.

## File Path Or Folder Not Found

If a folder or file seems missing:

- Make sure you opened `c:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack`.
- Check that you are in the project root before running commands.
- Reopen the folder in VS Code if needed.

## When To Update This File

Add a note here whenever you hit a new issue that takes more than a few minutes to solve.
