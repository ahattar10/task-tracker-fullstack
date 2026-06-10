# Day 4 Evidence Log

Use this page to capture proof that authentication was implemented and validated.

## Session Info

- Date: 2026-06-10
- Environment: Local (Windows, PowerShell, FastAPI on 127.0.0.1:8000)
- Branch: main
- Commit before test:
- Tester: GitHub Copilot + a_hat

## Scope

- [x] Register endpoint implemented
- [x] Login endpoint implemented
- [x] JWT token generation working
- [x] Protected task routes require authentication

## Commands Run

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
cd .\backend
.\.venv\Scripts\python.exe -m alembic upgrade head
.\.venv\Scripts\python.exe -m app.dev_server
cd ..
.\scripts\day4-auth-smoke-test.ps1
```

## Auth API Evidence

### 1) Register

- Endpoint: `POST /auth/register`
- Expected: `201` or `200`
- Actual status: `201`
- Response body:

```json
{"id":"<int>","email":"smoke.<timestamp>@example.com","created_at":"<timestamp>"}
```

### 2) Login

- Endpoint: `POST /auth/login`
- Expected: `200`
- Actual status: `200`
- Response body (token payload):

```json
{"access_token":"<jwt>","token_type":"bearer"}
```

### 3) Protected Route Without Token

- Endpoint: protected task route (example `GET /tasks`)
- Expected: `401` or `403`
- Actual status: `401`
- Response body:

```json
{"detail":"Missing or invalid authorization token"}
```

### 4) Protected Route With Valid Token

- Endpoint: protected task route (example `GET /tasks`)
- Expected: `200`
- Actual status: `200`
- Response body:

```json
[]
```

## Final Check

- [x] Register works
- [x] Login returns valid token
- [x] Protected route rejects missing token
- [x] Protected route accepts valid token
- [x] Evidence captured in this file
- [x] Optional smoke test output captured (`scripts/day4-auth-smoke-test.ps1`)

## Notes

- Any errors encountered: `500` during register due to `passlib` + `bcrypt 5.x` incompatibility.
- How resolved: Pinned `bcrypt==4.0.1` in backend requirements and reinstalled dependencies.
- Follow-up actions: Add auth requests to `backend/requests.http` for manual verification and frontend integration.
