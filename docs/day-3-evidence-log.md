# Day 3 Evidence Log

Use this page to capture proof that Day 3 was completed against a real Postgres database.

## Session Info

- Date:
- Environment:
- Branch:
- Commit before test:
- Tester:

## Preconditions

- [ ] Docker Desktop running
- [ ] DB container up
- [ ] Backend started
- [ ] Migration applied

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
- Actual status:
- Response body:

```json

```

### 2) List Tasks

- Endpoint: `GET /tasks`
- Expected: `200`
- Actual status:
- Response body:

```json

```

### 3) Get One Task

- Endpoint: `GET /tasks/{id}`
- Expected: `200`
- Actual status:
- Response body:

```json

```

### 4) Update Task

- Endpoint: `PUT /tasks/{id}`
- Expected: `200`
- Actual status:
- Response body:

```json

```

### 5) Delete Task

- Endpoint: `DELETE /tasks/{id}`
- Expected: `204`
- Actual status:

### 6) Confirm Delete

- Endpoint: `GET /tasks/{id}`
- Expected: `404`
- Actual status:
- Response body:

```json

```

## Final Check

- [ ] Create returned 201
- [ ] Update returned 200
- [ ] Delete returned 204
- [ ] Post-delete GET returned 404
- [ ] Evidence captured in this file

## Notes

- Any errors encountered:
- How resolved:
- Follow-up actions:
