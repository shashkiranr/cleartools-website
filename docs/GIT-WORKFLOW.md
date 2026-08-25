# Git workflow

## Branch model

`main` holds completed, verified phases. Each phase is developed on its own
branch and merged into `main` only after that phase's verification task passes.

```
main ──●──────────────●──────────────●──────────────▶
       │              │              │
       └ feat/phase0  └ feat/phase1  └ feat/phase2
```

### Branch names

`feat/phase<n>`, one per phase defined by admin:

Branches for phases that have not started yet are not created in advance. A
branch is cut from `main` when its phase begins, so it starts from the verified
state of everything before it.

### Lifecycle of a phase

```bash
git checkout main
git pull
git checkout -b feat/phase4

# ... work, committing as you go ...

npm run verify                # must pass before the phase is considered done
git push -u origin feat/phase4

gh pr create --base main --head feat/phase4 \
  --title "feat: Phase 4 — CRUD, drag and drop, transfers" \
  --body "..."

# after review
gh pr merge --squash

git checkout main
git pull
git checkout -b feat/phase5
git push -u origin feat/phase5
```

Squash merge via a GitHub PR is deliberate: one commit per PR on `main`,
regardless of how many commits happened on the branch while working through
it. That single squashed commit is the record that a unit of work (a phase,
while phases are still the unit of work; later, a feature or fix PR) was
completed and verified, which is exactly the granularity anyone auditing this
project later will care about — the source branch itself still holds the
full, uncompressed commit history if that detail is ever needed.

Every phase uses squash merge.

Phase branches are kept after merging rather than deleted.

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/). Scopes in use:
`bridge`, `panel`, `popup`, `devtools`, `ios`, `native`, `build`, `docs`, `deps`,
`fixtures`.

```
feat(bridge): add chunked binary read with progress reporting
fix(panel): restore focus to the trigger after closing the rename dialog
test(fixtures): add OPFS playground page
```

Write the body for whoever reads this in six months without the surrounding
context. Explain why a change was made, not what changed — the diff already says
what changed.

## Known repository quirk: stale lock files

Part of this project is developed in an environment whose filesystem mount
permits creating and writing files but **not deleting them**. Git relies on
creating a `.lock` file and then removing it, so lock files accumulate there and
block subsequent operations.

If git reports:

```
fatal: Unable to create '.git/index.lock': File exists.
```

and you are certain no other git process is running:

```bash
rm -f .git/HEAD.lock .git/index.lock .git/refs/heads/*.lock .git/packed-refs.lock
find .git/objects -name 'tmp_obj_*' -delete
git reset          # resync the index with HEAD
git status         # should now be accurate
```

`scripts/git-unstick.sh` does exactly this.

The stray objects are harmless orphans — `git gc` will collect them — but they
accumulate, so clearing them periodically is worthwhile.
