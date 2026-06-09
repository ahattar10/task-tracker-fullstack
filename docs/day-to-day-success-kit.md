# Day-to-Day Success Kit

This is the practical setup for working on the Task Tracker project without wasting time.

## 1. Exact VS Code Extensions To Install

Install these first:

- Python (`ms-python.python`)
- Pylance (`ms-python.vscode-pylance`)
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Docker (`ms-azuretools.vscode-docker`)
- GitLens (`eamodio.gitlens`)
- REST Client (`humao.rest-client`)
- EditorConfig (`EditorConfig.EditorConfig`)

Helpful but optional:

- Path Intellisense (`christian-kohler.path-intellisense`)
- Auto Rename Tag (`formulahendry.auto-rename-tag`)
- Error Lens (`usernamehw.errorlens`)
- Git Graph (`mhutchie.git-graph`)

If you only install six, use:

1. Python
2. Pylance
3. ESLint
4. Prettier
5. Docker
6. GitLens

## 2. Best Cheat Sheet Links

Keep these bookmarked:

- Python: https://docs.python.org/3/
- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/docs/
- Git: https://git-scm.com/docs
- Docker: https://docs.docker.com/
- PostgreSQL: https://www.postgresql.org/docs/
- SQL basics: https://www.w3schools.com/sql/
- JWT overview: https://jwt.io/introduction
- MDN JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript

Useful project-specific pages:

- Roadmap: [project-plan.md](project-plan.md)
- Home handoff: [home-handoff.rtf](home-handoff.rtf)

## 3. Simple Workflow For This Project

Use this order every time you sit down to work:

### Start Session

1. Open the project in VS Code.
2. Read the roadmap in `docs/project-plan.md`.
3. Check the last working note in `docs/home-handoff.rtf`.
4. Decide on one small task only.

### Build Session

1. Make the smallest change possible.
2. Keep the backend running if you are on backend work.
3. Test the exact thing you changed.
4. Fix errors before moving on.
5. Save only working code.

### End Session

1. Update the README or docs if anything important changed.
2. Write down the next step.
3. Commit the work if Git is available.

## 4. What To Focus On Each Day

- Backend day: health endpoint, config, database wiring, CRUD routes.
- Frontend day: layout, auth pages, task list, task forms.
- Cleanup day: docs, Docker, tests, GitHub Actions.

## 5. Rules That Keep You Moving

- Do not try to solve everything in one sitting.
- Do not skip documentation.
- Do not build UI before the API shape is clear.
- Do not add Docker, testing, and CI before the core app works.
- Always know the next task before you stop.

## 6. Best Mental Model

Think of the project as one working slice at a time:

- first the backend runs
- then the database connects
- then tasks can be created and viewed
- then login protects the data
- then the frontend uses the API
- then the app is packaged, tested, and deployed

That is the fastest route to a finished portfolio project.
