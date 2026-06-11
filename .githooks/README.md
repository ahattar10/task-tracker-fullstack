# Repository Git Hooks

This folder contains git hooks committed to the repository. They are activated by:

```powershell
git config --local core.hooksPath .githooks
```

This is automatic for new clones once you run that command once.

## Hooks

### pre-commit

Author guard. Aborts the commit if the author identity that git is about to record does not match the allowed pattern (`ahattar10 <88306485+ahattar10@users.noreply.github.com>`).

This catches:

- Accidental `-c user.name=... -c user.email=...` overrides on a single commit
- Misconfigured `--author=` flags
- Global-config drift on a new machine
- IDE buttons that commit with whatever identity is cached

To bypass for a single intentional commit (rare), set `GIT_AUTHOR_GUARD_BYPASS=1` in the environment for that command only.

## Why this lives in the repo

Hooks under `.git/hooks/` are not version-controlled and do not survive re-clone. Hooks under `.githooks/` are tracked by git and are activated by a single `core.hooksPath` config. This makes the protection auditable, portable, and self-documenting.
