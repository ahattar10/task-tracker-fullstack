# 14 Day Projects (Revamped With Time and Difficulty)

## Purpose
This version is tailored to your current skill set so you can realistically plan effort, avoid burnout, and still ship a strong portfolio project.

## Current Skill Baseline
- Strong: HTML, CSS, JavaScript, Git/GitHub, deployment, troubleshooting discipline
- Medium: Python basics, API concepts
- Newer: React depth, TypeScript depth, Docker, CI/CD, testing, database design

## Realistic Effort Model
- Weeknight sessions: 1.5 to 2.5 hours
- Weekend sessions: 3 to 5 hours
- Total estimated effort: 45 to 65 hours

## Day 1 - Plan and Setup
Estimated time: 2 to 3 hours
Difficulty: Easy

What to do:
- Create repo and folders: frontend, backend, docs, infra
- Write simple README with goals and MVP scope
- Define MVP: login, task CRUD, filters

Why this matters:
- Shows planning and scoping before coding

Done check:
- Repo structure exists and initial README committed

## Day 2 - Backend Scaffold (FastAPI)
Estimated time: 2 to 4 hours
Difficulty: Easy to Medium

What to do:
- Create FastAPI app
- Add /health endpoint
- Add config for environment variables

Why this matters:
- Proves you can stand up backend services correctly

Done check:
- API runs and /health returns success

## Day 3 - Database Integration (Postgres)
Estimated time: 4 to 6 hours
Difficulty: Medium

What to do:
- Connect backend to Postgres
- Create Task model and migration
- Build CRUD endpoints

Why this matters:
- Demonstrates SQL and backend data integration

Done check:
- CRUD operations work against real database records

## Day 4 - Authentication
Estimated time: 5 to 7 hours
Difficulty: Medium to Hard

What to do:
- Add user model
- Build register/login endpoints
- Implement JWT and protect task routes

Why this matters:
- Auth is a core junior full-stack requirement

Done check:
- Protected routes reject unauthenticated requests

## Day 5 - API Quality (Validation + Pagination + Filtering)
Estimated time: 3 to 5 hours
Difficulty: Medium

What to do:
- Add request validation
- Add clean, consistent error responses
- Add pagination/filtering to task list endpoint

Why this matters:
- Shows software design maturity, not just feature coding

Done check:
- Invalid inputs are handled safely and clearly

## Day 6 - Frontend Scaffold (React + TypeScript)
Estimated time: 3 to 5 hours
Difficulty: Medium

What to do:
- Create React + TypeScript app
- Add basic routing and layout
- Build login/register pages

Why this matters:
- Demonstrates TypeScript front-end fundamentals

Done check:
- Frontend app runs with basic auth pages

## Day 7 - Core Task UI + API Integration
Estimated time: 5 to 7 hours
Difficulty: Medium to Hard

What to do:
- Build task list and task form components
- Connect UI to backend CRUD API
- Add create/edit/delete flows

Why this matters:
- Proves end-to-end full-stack integration

Done check:
- User can perform full CRUD in browser

## Day 8 - UX Polish and Error States
Estimated time: 3 to 5 hours
Difficulty: Medium

What to do:
- Add loading, empty, and error states
- Add client-side form validation
- Add protected routes + logout behavior

Why this matters:
- Makes project feel production-ready

Done check:
- App handles common UX failure cases gracefully

## Day 9 - Dockerize Services
Estimated time: 5 to 8 hours
Difficulty: Hard (for current level)

What to do:
- Create Dockerfile for backend
- Create Dockerfile for frontend
- Create docker-compose for frontend + backend + postgres

Why this matters:
- Containerization is a direct match to job requirements

Done check:
- docker compose up --build starts all services successfully

## Day 10 - Reliability and Environment Management
Estimated time: 3 to 5 hours
Difficulty: Medium to Hard

What to do:
- Add .env.example
- Add DB data persistence volume
- Add readiness/health checks

Why this matters:
- Shows practical deployment discipline

Done check:
- Restarting containers does not lose expected data

## Day 11 - Automated Testing
Estimated time: 4 to 7 hours
Difficulty: Hard

What to do:
- Add backend tests for auth and CRUD
- Add a few frontend tests for core UI components
- Add test scripts for one-command runs

Why this matters:
- Testing is frequently listed in junior role requirements

Done check:
- Test suite passes locally

## Day 12 - CI/CD (GitHub Actions)
Estimated time: 3 to 6 hours
Difficulty: Medium to Hard

What to do:
- Build CI workflow: lint, test, build
- Add status badge to README

Why this matters:
- Demonstrates DevSecOps and automation readiness

Done check:
- Push/PR triggers successful pipeline

## Day 13 - Deployment
Estimated time: 4 to 7 hours
Difficulty: Medium

What to do:
- Deploy app to a cloud host
- Configure production environment variables
- Validate auth and CRUD in production

Why this matters:
- Live deployed projects carry the most interview value

Done check:
- Live URL works and is shareable

## Day 14 - Portfolio Packaging
Estimated time: 3 to 4 hours
Difficulty: Easy to Medium

What to do:
- Finalize README (architecture, setup, features)
- Add screenshots and a short demo clip
- Add project to your portfolio site and resume

Why this matters:
- Hiring teams evaluate communication as much as code

Done check:
- Recruiter can understand and run your project quickly

## Highest Difficulty Areas For You Right Now
1. Docker and service orchestration
2. Auth/JWT end-to-end implementation
3. Test setup and coverage
4. CI pipeline troubleshooting

## Easiest Areas For You Right Now
1. Project planning and execution discipline
2. Basic UI build flow
3. Documentation and presenting outcomes clearly

## Recommended Pace Adjustment
If your schedule is tight, use a 21-day delivery window for better quality:
- Milestone A (Days 1-7): API + DB + baseline frontend
- Milestone B (Days 8-14): Auth + UX + Docker
- Milestone C (Days 15-21): Tests + CI + deploy + portfolio write-up

## Resume Bullets After Completion
- Built and deployed a containerized full-stack task tracker using React, TypeScript, FastAPI, and PostgreSQL.
- Implemented JWT authentication, protected routes, and user-scoped CRUD APIs with validation, filtering, and pagination.
- Added Docker Compose orchestration and GitHub Actions CI for linting, testing, and build verification.