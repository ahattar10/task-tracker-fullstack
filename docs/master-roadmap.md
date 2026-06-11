# Complete Roadmap: Day 1 → Job Applications

## Current Status

- ✅ Day 1: Plan + Setup
- ✅ Day 2: Backend Scaffold (/health endpoint)
- ✅ Day 3: Postgres + Task Model + CRUD
- ✅ Day 4: Authentication
- ✅ Day 5: API Quality
- 🚧 Day 6: Frontend Scaffold (in progress)

---

## Week 0: Foundation (Complete)

### Day 1 — Plan and Setup ✅
Time: 2-3 hrs | Difficulty: Easy

- [x] Create GitHub repository and local project folder
- [x] Create project folder structure (`frontend`, `backend`, `docs`, `infra`)
- [x] Add initial README with project goal and MVP scope
- [x] Add core planning docs (`project-plan`, `project-architecture`, `api-contract`)
- [x] Initialize git, commit baseline, and push to `main`
- [x] Verify repository content on GitHub

Done check:
- Repo structure exists and initial README is committed ✓
- Repository: https://github.com/ahattar10/task-tracker-fullstack

---

### Day 2 — Backend Scaffold (FastAPI) ✅
Time: 2-4 hrs | Difficulty: Easy-Medium

- [x] Create backend FastAPI application entrypoint
- [x] Add `GET /health` endpoint
- [x] Add environment-based config in `backend/app/core/config.py`
- [x] Verify backend starts successfully
- [x] Verify `GET /health` returns success JSON
- [x] Update setup and troubleshooting docs with verified commands

Start command:
```
cd backend
C:\projects\.venvs\task-tracker\Scripts\python.exe -m app.dev_server
```

Done check:
- `GET /health` returns `{"status":"ok","environment":"development"}` ✓

---

### Day 3 — Database Integration (Postgres) ✅
Time: 4-6 hrs | Difficulty: Medium

- [x] Start database container (`docker compose -f .\infra\docker-compose.yml up -d db`)
- [x] Apply latest migration (`alembic upgrade head`)
- [x] Verify Task CRUD against Postgres:
  - POST /tasks → 201
  - GET /tasks → list
  - GET /tasks/{id} → single record
  - PUT /tasks/{id} → 200
  - DELETE /tasks/{id} → 204
  - GET /tasks/{id} after delete → 404
- [x] Run smoke test (`.\scripts\day3-smoke-test.ps1`)
- [x] Captured results in `docs/day-3-evidence-log.md`

Done check:
- Full CRUD works against real Postgres records ✓
- Smoke test passes ✓

---

## Week 1: Build the Core

### Day 4 — Authentication
Time: 5-7 hrs | Difficulty: Medium-Hard

Step 1: User Registration
- [x] User model (id, email, hashed_password, created_at)
- [x] Migration → users table
- [x] POST /auth/register
  - Hash password with passlib/bcrypt
  - Return user info
  - Handle duplicate email → 409

Step 2: Login with JWT
- [x] POST /auth/login
  - Verify password against hash
  - Generate JWT with user_id in payload
  - Return access_token + token_type: "bearer"
  - Wrong password → 401

Step 3: Protect Task Routes
- [x] Auth dependency/middleware
  - Extract token from Authorization header
  - Decode → get user_id
  - Attach to request object
  - Missing/invalid → 401
- [x] Update all task endpoints:
  - POST /tasks → task.user_id = current user
  - GET /tasks → filter by current user
  - GET /tasks/{id} → verify ownership
  - PUT /tasks/{id} → verify ownership
  - DELETE /tasks/{id} → verify ownership

Done check:
- Register → Login → Create task WITH token ✓
- Create task WITHOUT token → 401 ✓
- GET tasks → only see your own ✓
- Wrong password → 401 ✓
- Duplicate email → 409 ✓

---

### Day 5 — API Quality
Time: 3-5 hrs | Difficulty: Medium

Step 1: Request Validation
- [x] Pydantic schemas for all request bodies
- [x] Proper HTTP status codes everywhere
- [x] Consistent error format: { "detail": "message", "status_code": X }

Step 2: Pagination
- [x] GET /tasks?page=1&limit=20
- [x] Return: { items: [...], total: 45, page: 1, pages: 3 }

Step 3: Filtering
- [x] GET /tasks?status=done
- [x] GET /tasks?priority=high
- [x] GET /tasks?search=keyword (search title + description)

Done check:
- Invalid inputs return clear error messages
- Pagination works with different page sizes
- Filters narrow down results correctly

---

### Day 6 — Frontend Scaffold
Time: 3-5 hrs | Difficulty: Medium

Step 1: React + TypeScript Setup
- [ ] Create React app with TypeScript (Vite or CRA)
- [ ] Install: react-router-dom, axios
- [ ] Folder structure: components/, pages/, services/, hooks/

Step 2: Routing + Layout
- [ ] Routes: /login, /register, /tasks, /tasks/:id
- [ ] Layout component (header, sidebar placeholder, main area)
- [ ] Basic styling (Tailwind or CSS modules)

Step 3: Login + Register Pages
- [ ] Login form (email, password, submit button)
- [ ] Register form (email, password, confirm password)
- [ ] Form validation
- [ ] Call backend auth endpoints
- [ ] Store JWT token (localStorage)
- [ ] Redirect to /tasks on success
- [ ] Show error messages on failure

ADD: GA4 Integration
- [ ] Add GA4 snippet to index.html or main.tsx
- [ ] Track: page_view (automatic)
- [ ] Track: user_registered event
- [ ] Track: user_login event

Done check:
- Frontend compiles and runs
- Auth pages render
- Login/Register calls backend successfully

---

### Day 7 — Core Task UI + API Integration
Time: 5-7 hrs | Difficulty: Medium-Hard

Step 1: Task List Component
- [ ] Fetch tasks from GET /tasks (with auth header)
- [ ] Display tasks in list/card layout
- [ ] Show: title, status, priority, due date
- [ ] Filter bar: by status, priority, search
- [ ] Pagination controls

Step 2: Task Form Component
- [ ] Create task form (title, description, due date, priority)
- [ ] Edit task form (pre-filled, PUT request)
- [ ] POST /tasks → add to list
- [ ] PUT /tasks/{id} → update in list
- [ ] Form validation

Step 3: Delete Task
- [ ] Delete button on each task
- [ ] Confirmation dialog
- [ ] DELETE /tasks/{id} → remove from list

Step 4: States
- [ ] Loading state: spinner/skeleton during API calls
- [ ] Empty state: "No tasks yet — create your first one"
- [ ] Error state: "Couldn't load tasks. Try again."

ADD: GA4 Events
- [ ] task_created
- [ ] task_updated
- [ ] task_deleted
- [ ] task_completed (when status changes to done)

Done check:
- Full CRUD works end-to-end in browser
- All states tested: loading, empty, error, success

---

## Week 2: Polish + DevOps + Ship

### Day 8 — UX Polish and Error States
Time: 3-5 hrs | Difficulty: Medium

- [ ] Skeleton loaders while fetching tasks
- [ ] Button spinner during form submission
- [ ] Empty states for all list scenarios
- [ ] Error states: API down, network error, session expired
- [ ] Protected routes: redirect to /login if no token
- [ ] Logout button clears token + redirects

Done check:
- All four states visible and working: loading, empty, error, success
- Error messages are user-facing, not raw error objects

---

### Day 9 — Dockerize Services
Time: 5-8 hrs | Difficulty: Hard

- [ ] Backend Dockerfile (python:3.11-slim)
- [ ] Frontend Dockerfile (node:18-alpine)
- [ ] Docker Compose: backend, frontend, postgres
- [ ] Named volume for data persistence
- [ ] Environment variables from .env file
- [ ] Test: delete repo → reclone → docker compose up → works

Done check:
- docker compose up --build starts everything
- Frontend loads at localhost:3000
- Backend responds at localhost:8000/health
- Full CRUD works through Docker

---

### Day 10 — Reliability + Environment Management
Time: 3-5 hrs | Difficulty: Medium-Hard

- [ ] .env.example with all required variables
- [ ] Database persistence with named volume
- [ ] Health checks in docker-compose
- [ ] .gitignore verified (no .env committed)

Done check:
- Clone fresh → docker compose up → works
- docker compose down → docker compose up → data persists

---

### Day 11 — Automated Testing
Time: 4-7 hrs | Difficulty: Hard

Backend tests (aim for 8-10):
- [ ] test_register_success → 201
- [ ] test_register_duplicate_email → 409
- [ ] test_login_success → 200, returns JWT
- [ ] test_login_wrong_password → 401
- [ ] test_create_task_authenticated → 201
- [ ] test_create_task_no_auth → 401
- [ ] test_get_tasks_returns_user_tasks_only
- [ ] test_get_task_other_user → 403 or 404
- [ ] test_update_task_success → 200
- [ ] test_delete_task_success → 204

Frontend tests (aim for 4-5):
- [ ] TaskList renders tasks from props
- [ ] TaskForm validates required fields
- [ ] Login page shows error on bad credentials

Done check:
- pytest passes all backend tests
- npm test passes all frontend tests
- Total: 12-15 tests

---

### Day 12 — CI/CD (GitHub Actions)
Time: 3-6 hrs | Difficulty: Medium-Hard

- [ ] Create .github/workflows/ci.yml
- [ ] Backend test job with Postgres service
- [ ] Frontend test job
- [ ] CI badge in README (green "passing")
- [ ] Optional: linting (flake8, eslint)

Done check:
- Push to GitHub triggers pipeline automatically
- All steps pass
- Badge shows green "passing"

---

### Day 13 — Deployment
Time: 4-7 hrs | Difficulty: Medium

- [ ] Deploy backend to Railway
- [ ] Set environment variables in platform dashboard
- [ ] Run database migrations
- [ ] Deploy frontend to Vercel
- [ ] Verify: GET /health returns 200
- [ ] Verify: full CRUD works on live URL
- [ ] GA4 events fire in production

Done check:
- Live URL is shareable
- All features work in production

---

### Day 14 — Portfolio Packaging
Time: 3-4 hrs | Difficulty: Easy-Medium

- [ ] README finalized with screenshots, CI badge, tech stack badges
- [ ] Architecture Decision Records (4 ADRs in docs/adr/)
- [ ] Postman collection exported to docs/postman-collection.json
- [ ] CONTRIBUTING.md created
- [ ] Quick start: git clone → docker compose up → works

Done check:
- Recruiter can understand project in 30 seconds
- Developer can run it in 5 minutes

---

## Week 3: AI Upgrade

### Day 15 — AI Task Parsing (Backend)
Time: 4-6 hrs | Difficulty: Medium-Hard

- [ ] pip install openai
- [ ] Add OPENAI_API_KEY to .env
- [ ] POST /api/ai/parse-task endpoint
- [ ] OpenAI prompt to extract structured task from natural text
- [ ] Error handling: bad JSON, API down, rate limiting

Done check:
- POST /api/ai/parse-task with natural language → structured JSON
- Garbage text → handled gracefully
- No auth → 401

---

### Day 16 — AI Task Parsing (Frontend)
Time: 4-6 hrs | Difficulty: Medium

- [ ] AiTaskInput.tsx component with idle/loading/success/error states
- [ ] useAiParse.ts hook
- [ ] Toggle: "Use AI" / "Create Manually"
- [ ] User can edit AI-parsed fields before creating

Done check:
- Type natural language → AI parses → preview shows fields → creates task

---

### Day 17 — Smart Priority Suggestions
Time: 4-6 hrs | Difficulty: Medium

- [ ] GET /api/ai/suggestions endpoint
- [ ] OpenAI prompt analyzing task list patterns
- [ ] AiSuggestions.tsx component with all states
- [ ] Cache suggestions for 5 minutes
- [ ] GA4 events: ai_suggestion_viewed, ai_suggestion_refreshed

Done check:
- Dashboard shows relevant AI suggestion card
- Refresh gives fresh suggestions

---

### Day 18 — Polish AI Features
Time: 3-5 hrs | Difficulty: Medium

- [ ] Comprehensive error review for all AI states
- [ ] Staged loading animations
- [ ] Edge cases: one-word input, very long text, no tasks
- [ ] Button disabled during AI calls
- [ ] Timeout after 15 seconds → show error
- [ ] GA4 verification in real-time report

Done check:
- Every AI state works: success, failure, loading, empty, rate limited
- User always has a fallback path

---

### Day 19 — Update Documentation + AI Tests + Deploy
Time: 3-5 hrs | Difficulty: Medium

- [ ] README updated with AI features section
- [ ] ADR-004: OpenAI integration decision
- [ ] Postman collection updated with AI endpoints
- [ ] AI backend tests (4-5 tests)
- [ ] AI frontend tests (1-2 tests)
- [ ] Redeploy with OPENAI_API_KEY in production
- [ ] Verify AI features on live URL

Done check:
- Live site has working AI features
- All tests pass in CI

---

## Week 4: Portfolio + Presentation + Apply

### Day 20-21 — Portfolio Site Update
Time: 5-8 hrs total | Difficulty: Easy-Medium

- [ ] Projects section with task tracker card (screenshot/GIF, description, tech badges, live + code links)
- [ ] Skills section (Frontend, Backend, Database, AI/ML, DevOps, Tools)
- [ ] GitHub and LinkedIn links prominent
- [ ] Resume viewable + downloadable PDF
- [ ] GA4 tracking active

---

### Day 22 — Subdomain Setup
Time: 1-2 hrs | Difficulty: Easy

- [ ] Porkbun DNS: CNAME app.anthony-hattar.com → Vercel
- [ ] Add custom domain in Vercel project settings
- [ ] SSL certificate provisioned
- [ ] Verify app.anthony-hattar.com loads task tracker
- [ ] Update portfolio "View Live" link to app.anthony-hattar.com

Done check:
- app.anthony-hattar.com → task tracker loads
- anthony-hattar.com → portfolio loads
- Both work on mobile

---

### Day 23 — Resume Update
Time: 1-2 hrs | Difficulty: Easy

- [ ] Add task tracker project entry with bullet points
- [ ] Update TECHNICAL SKILLS section
- [ ] Add Portfolio and GitHub URLs
- [ ] PDF exports correctly

---

### Day 24-25 — Video Walkthrough
Time: 3-5 hrs | Difficulty: Easy-Medium

- [ ] Record 3-5 minute walkthrough (Loom or OBS)
- [ ] Upload to YouTube (unlisted)
- [ ] Add video link to README (top section)
- [ ] Add video link/embed to portfolio

Script outline:
1. 0:00-0:30 — Introduction
2. 0:30-1:30 — AI task parsing demo
3. 1:30-2:30 — Manual CRUD demo
4. 2:30-3:15 — AI suggestions demo
5. 3:15-4:00 — Tech stack + DevOps
6. 4:00-4:30 — Wrap up + links

---

### Day 26 — Blog Post + Lighthouse Audit
Time: 2-4 hrs | Difficulty: Easy-Medium

- [ ] Write blog post on dev.to or Hashnode (one specific technical challenge)
- [ ] Add blog link to portfolio
- [ ] Run Lighthouse audit on deployed app
- [ ] Screenshot scores
- [ ] Add Lighthouse section to README

---

### Day 27 — Final Review
Time: 2-3 hrs | Difficulty: Easy

Must-have:
- [ ] Live deployed application (app.anthony-hattar.com)
- [ ] README with screenshots, CI badge, video link
- [ ] 12-15 tests passing (green CI badge)
- [ ] Error handling and loading states everywhere

Should-have:
- [ ] Blog post explaining one technical challenge
- [ ] 4 ADRs in docs/adr/
- [ ] CI/CD pipeline badge green
- [ ] Docker setup works
- [ ] Postman collection in docs/

Nice-to-have:
- [ ] Video walkthrough
- [ ] Lighthouse scores in README
- [ ] CONTRIBUTING.md

Full system test:
- [ ] Portfolio loads on desktop and mobile
- [ ] Task tracker loads on desktop and mobile
- [ ] All auth, CRUD, AI, and error flows work
- [ ] GitHub repo is public with clean history
- [ ] No API keys exposed
- [ ] Resume PDF downloads correctly

---

### Day 28+ — Start Applying

What you send with each application:
- Resume (PDF)
- Portfolio: anthony-hattar.com
- GitHub: github.com/ahattar10/task-tracker-fullstack
- Optional: video walkthrough link
- Optional: blog post link

LinkedIn updates:
- Headline: "Fullstack Developer | Python · React · AI Integration"
- Add project to Featured section
- Portfolio and GitHub URLs in contact info
