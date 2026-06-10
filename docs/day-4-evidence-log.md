# Day 4 Evidence Log

Use this page to capture proof that authentication was implemented and validated.

## Session Info

- Date:
- Environment:
- Branch:
- Commit before test:
- Tester:

## Scope

- [ ] Register endpoint implemented
- [ ] Login endpoint implemented
- [ ] JWT token generation working
- [ ] Protected task routes require authentication

## Commands Run

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
cd .\backend
C:\projects\.venvs\task-tracker\Scripts\python.exe -m app.dev_server
```

## Auth API Evidence

### 1) Register

- Endpoint: `POST /auth/register`
- Expected: `201` or `200`
- Actual status:
- Response body:

```json

```

### 2) Login

- Endpoint: `POST /auth/login`
- Expected: `200`
- Actual status:
- Response body (token payload):

```json

```

### 3) Protected Route Without Token

- Endpoint: protected task route (example `GET /tasks`)
- Expected: `401` or `403`
- Actual status:
- Response body:

```json

```

### 4) Protected Route With Valid Token

- Endpoint: protected task route (example `GET /tasks`)
- Expected: `200`
- Actual status:
- Response body:

```json

```

## Final Check

- [ ] Register works
- [ ] Login returns valid token
- [ ] Protected route rejects missing token
- [ ] Protected route accepts valid token
- [ ] Evidence captured in this file
- [ ] Optional smoke test output captured (`scripts/day4-auth-smoke-test.ps1`)

## Notes

- Any errors encountered:
- How resolved:
- Follow-up actions:
