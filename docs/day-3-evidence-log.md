# Day 3 Evidence Log

Use this page to capture proof that Day 3 was completed against a real Postgres database.

## Session Info

- Date: 2026-06-10
- Environment: Local Windows + Docker Desktop + FastAPI (127.0.0.1:8000)
- Branch: main
- Commit before test: 6fca384
- Tester: GitHub Copilot + a_hat

## Preconditions

- [x] Docker Desktop running
- [x] DB container up
- [x] Backend started
- [x] Migration applied

## Commands Run

```powershell
cd "C:\Users\a_hat\OneDrive\Desktop\task-tracker-fullstack"
docker compose -f .\infra\docker-compose.yml up -d db

cd .\backend
alembic upgrade head

C:\projects\.venvs\task-tracker\Scripts\python.exe -m app.dev_server
```

## API Health Evidence

Request:

```http
GET /health
```

Response:

```json
{"status":"ok","environment":"development"}
```

## CRUD Evidence

### 1) Create Task

- Endpoint: `POST /tasks`
- Expected: `201`
- Actual status: `201`
- Response body:

```json
{"id":<int>,"title":"day3-recheck-task","priority":"medium"}
```

### 2) List Tasks

- Endpoint: `GET /tasks`
- Expected: `200`
- Actual status: `200`
- Response body:

```json
{"items":[...],"total":1,"page":1,"pages":1}
```

### 3) Get One Task

- Endpoint: `GET /tasks/{id}`
- Expected: `200`
- Actual status: `200`
- Response body:

```json
{"id":<int>,"title":"day3-recheck-task","is_complete":false}
```

### 4) Update Task

- Endpoint: `PUT /tasks/{id}`
- Expected: `200`
- Actual status: `200`
- Response body:

```json
{"id":<int>,"title":"day3-recheck-updated","is_complete":true,"priority":"high"}
```

### 5) Delete Task

- Endpoint: `DELETE /tasks/{id}`
- Expected: `204`
- Actual status: `204`

### 6) Confirm Delete

- Endpoint: `GET /tasks/{id}`
- Expected: `404`
- Actual status: `404`
- Response body:

```json
{"detail":"Task not found","status_code":404}
```

## Final Check

- [x] Create returned 201
- [x] Update returned 200
- [x] Delete returned 204
- [x] Post-delete GET returned 404
- [x] Evidence captured in this file
- [x] Automated regression output captured (auth-aware sequence replacing legacy Day 3 script)

## Notes

- Any errors encountered: Initial validation script prompt from `Invoke-WebRequest` security warning.
- How resolved: Confirmed prompt and completed full auth-aware regression successfully.
- Follow-up actions: Keep Day 3 verification auth-aware now that task routes require JWT; legacy Day 3 script should be updated in a future cleanup.
