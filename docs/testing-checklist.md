# Testing Checklist

Use this checklist when you start adding tests to the project.

## Backend Checks

- Confirm the health endpoint returns `status: ok`.
- Test that the root route returns a response.
- Test validation errors for bad task input.
- Test task creation, update, and delete flows.
- Test that protected routes reject unauthenticated requests.

## Frontend Checks

- Confirm the app loads without console errors.
- Test login and registration form behavior.
- Test task list rendering.
- Test task form submission.
- Test loading, empty, and error states.

## Database Checks

- Confirm task records are saved correctly.
- Confirm user-scoped data stays tied to the right user.
- Confirm updates are written to the database.
- Confirm deletes remove the correct record.

## Manual Smoke Test Before Commit

1. Start the backend.
2. Open the health route.
3. Create or edit one task.
4. Make sure the app still responds normally.
5. Save only after the change is working.

## Later Test Automation Ideas

- Add backend unit tests for routes and validation.
- Add integration tests for CRUD and auth.
- Add a small set of frontend component tests.
- Add a test command to the project scripts.

## When To Update This File

Add a new item here whenever you learn a repeatable test step that helps catch bugs early.
