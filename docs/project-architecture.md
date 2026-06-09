
# Project Architecture

## What This App Is

Task Tracker Full Stack is a portfolio-grade task management app with:

- a React + TypeScript frontend
- a FastAPI backend
- a PostgreSQL database
- Docker-based local development
- GitHub Actions for CI

## How The Pieces Fit Together

1. The user opens the React app in the browser.
2. The frontend sends requests to the FastAPI backend.
3. The backend validates the request and applies business rules.
4. The backend reads or writes data in PostgreSQL.
5. The backend returns JSON to the frontend.
6. The frontend updates the UI based on the response.

## Folder Responsibilities

- `frontend/` holds the React application.
- `backend/` holds the FastAPI application and API logic.
- `docs/` holds planning notes, handoffs, and reference docs.
- `infra/` holds Docker and deployment support files.

## Backend Shape

The backend currently starts with:

- `GET /` for a simple root message
- `GET /health` for service health checks
- environment-based config in `app/core/config.py`

Planned backend additions:

- user registration and login
- JWT authentication
- task CRUD endpoints
- database models and migrations
- validation and filtering

## Frontend Shape

The frontend will eventually handle:

- login and registration screens
- task list display
- task create/edit forms
- status filtering
- loading and error states

## Data Shape

Each task will likely have:

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

For the first version, keep it simple and start with:

- `id`
- `user_id`
- `title`
- `description`
- `status`
- `created_at`
- `updated_at`

## Suggested Build Order

1. Backend health and config
2. Database connection
3. Task CRUD endpoints
4. Authentication
5. Frontend task UI
6. Docker and environment setup
7. Tests
8. CI and deployment

## Purpose Of This Document

This file is here so you can quickly answer:

- what the project is
- how the pieces interact
- what each folder does
- what to build next
