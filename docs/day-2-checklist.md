# Day 2 Checklist — Backend Scaffold (FastAPI)

## Objective
Create and verify a working FastAPI backend foundation.

## Estimated Time
2 to 4 hours

## Difficulty
Easy to Medium

---

## What To Do

- Create FastAPI app
- Add `/health` endpoint
- Add config for environment variables

## Why This Matters

Proves backend service setup and runtime verification skills.

## Read Order

1. Confirm Day 1 checklist is complete.
2. Read `docs/setup-run-guide.md` backend run steps.
3. Execute this checklist.
4. Use `docs/troubleshooting-notes.md` only if blocked.

---

## Execution Checklist

- [x] Create backend FastAPI application entrypoint
- [x] Add `GET /health` endpoint
- [x] Add environment-based config in `backend/app/core/config.py`
- [x] Verify backend starts successfully
- [x] Verify `GET /health` returns success JSON
- [x] Update setup and troubleshooting docs with verified commands

---

## Done Check

- API runs and `/health` returns success.

## Verification Evidence

Command:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/health" | ConvertTo-Json -Compress
```

Observed response:

```json
{"status":"ok","environment":"development"}
```
