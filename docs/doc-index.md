# Documentation Index (Day 1 to Day 11)

Use this order for review and execution.

Preflight Rule: Before Step 1 coding on any day, run start-of-day preflight and record the result in that day's evidence log.

## Day 1

1. `day-1-checklist.md`
2. `setup-run-guide.md`
3. `troubleshooting-notes.md` (only if blocked)

## Day 2

1. `day-2-checklist.md`
2. `setup-run-guide.md`
3. `troubleshooting-notes.md` (only if blocked)

## Day 3

1. `day-3-checklist.md`
2. `setup-run-guide.md` (Day 3 run block)
3. `scripts/day3-smoke-test.ps1` (optional)
4. `day-3-evidence-log.md`
5. `troubleshooting-notes.md` (only if blocked)

## Day 4

1. `day-3-checklist.md` (read the Day 4 handoff section)
2. `day-4-checklist.md`
3. `scripts/day4-auth-smoke-test.ps1` (optional)
4. `day-4-evidence-log.md`
5. `troubleshooting-notes.md` (if blocked)

## Day 5

1. `day-5-checklist.md`
2. `master-roadmap.md` (Day 5 section)
3. `project-plan.md` (Day 5 section)
4. `setup-run-guide.md`
5. `day-5-evidence-log.md`
6. `testing-checklist.md`
7. `troubleshooting-notes.md` (if blocked)

## Day 6

1. `day-6-checklist.md`
2. `master-roadmap.md` (Day 6 section)
3. `project-plan.md` (frontend section)
4. `setup-run-guide.md`
5. `testing-checklist.md`
6. `day-6-evidence-log.md`
7. `troubleshooting-notes.md` (if blocked)

## Day 7

1. `day-7-checklist.md`
2. `master-roadmap.md` (Day 7 section)
3. `api-contract.md`
4. `setup-run-guide.md`
5. `day-7-evidence-log.md`
6. `troubleshooting-notes.md` (if blocked)

## Day 8

1. `day-8-checklist.md`
2. `master-roadmap.md` (Day 8 section)
3. `api-contract.md`
4. `setup-run-guide.md` (Frontend Local Dev section)
5. `day-8-evidence-log.md`
6. `troubleshooting-notes.md` (if blocked)

## Day 9

1. `day-9-checklist.md`
2. `master-roadmap.md` (Day 9 section)
3. `project-plan.md` (Day 9 section)
4. `setup-run-guide.md` (Docker/compose run guidance)
5. `infra/docker-compose.yml`
6. `day-9-evidence-log.md`
7. `troubleshooting-notes.md` (if blocked)

## Day 10

1. `day-10-checklist.md`
2. `master-roadmap.md` (Day 10 section)
3. `setup-run-guide.md` (Docker Compose reliability)
4. `day-10-evidence-log.md`
5. `troubleshooting-notes.md` (if blocked)

## Day 11

1. `day-11-checklist.md`
2. `master-roadmap.md` (Day 11 section)
3. `testing-checklist.md`
4. `day-11-evidence-log.md`
5. `troubleshooting-notes.md` (if blocked)

## Rule

If a checklist changes in this docs folder, mirror the same process update in `binder for project` on the same day.

Binder Sync Cadence:

- Do binder sync once per day at closeout (not after every small edit).
- Sequence: finish work -> commit/push in task-tracker -> sync `docs/` to binder `docs/` -> run parity check.
- Keep task-tracker `docs/` as source of truth; binder is mirrored backup/reference.

## Operational Topics (Merged Into Main Docs)

- Backend setup and run steps: `setup-run-guide.md`
- Work-machine policy-safe venv workflow: `setup-run-guide.md` and `troubleshooting-notes.md`
- Git and GitHub setup/sync commands: `setup-run-guide.md`
- Day close quality gate (required): `day-completion-gate.md`
- Evidence log starter template: `day-evidence-log-template.md`

## Review Later Note

- Review whether to add "canonical source" notes at the top of binder-only guides in `binder for project`.
- Keep binder files as backup/reference, with main source of truth in this repo's `docs/` folder.
- Added on 2026-06-10 for follow-up.
- Completed on 2026-06-10: re-synced binder copies of `doc-index.md`, `setup-run-guide.md`, and `troubleshooting-notes.md`.
