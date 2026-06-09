# API Contract Draft

This is the first-pass API shape for the task tracker project.

## Core Principles

- Keep responses JSON-based.
- Keep routes user-scoped.
- Protect task routes after authentication is added.
- Validate inputs before writing to the database.

## Authentication Routes

### `POST /register`

Creates a new user account.

Request fields:

- `email`
- `password`
- `name` or `username` if needed

Expected result:

- user account created
- token returned or user prompted to log in

### `POST /login`

Authenticates an existing user.

Request fields:

- `email`
- `password`

Expected result:

- JWT access token returned
- frontend stores the token for later requests

## Task Routes

### `GET /tasks`

Returns the current user's tasks.

Optional query fields:

- `status`
- `page`
- `limit`

### `POST /tasks`

Creates a new task.

Request fields:

- `title`
- `description`
- `status`
- `priority`
- `due_date`

### `PUT /tasks/{id}`

Updates an existing task.

Request fields:

- any editable task fields

### `DELETE /tasks/{id}`

Deletes a task.

## Task Object Draft

Likely task fields:

- `id`
- `user_id`
- `title`
- `description`
- `status`
- `priority`
- `due_date`
- `created_at`
- `updated_at`
- `completed_at`

## Status Values

Use a small, clear set of statuses.

Recommended first set:

- `todo`
- `in_progress`
- `done`

## Error Response Style

Keep errors consistent and readable.

Example shape:

- `message`
- `detail`
- `errors` when validation fails

## Notes For Later

This contract can grow once we add:

- database migrations
- auth middleware
- pagination behavior
- frontend fetch helpers
