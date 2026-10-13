
# Week 1 Day 5 — Git Workflow

## 1. Branching Strategy

Use a separate feature branch for each day's work.

- feature/week-1-day-1
- feature/week-1-day-2
- feature/week-1-day-3
- feature/week-1-day-4
- feature/week-1-day-5

Keep changes for each task in its own branch. Start new branches from the appropriate agreed base branch.

## 2. Commit Message Convention

Use descriptive commit messages:

- feat: add a new feature
- fix: resolve a bug
- docs: update documentation
- chore: update project configuration

Example:
feat: complete git workflow week-1-day-5

## 3. Pull Request Review Checklist

Before requesting a review:

- [ ] The correct feature branch is selected.
- [ ] Changes are relevant to the task.
- [ ] Code is readable and files are saved.
- [ ] No passwords, tokens, or secrets are committed.
- [ ] .gitignore is present and correct.
- [ ] Tests or manual checks are complete.
- [ ] Commit messages are descriptive.
- [ ] PR description explains the changes.
- [ ] Screenshots or other required evidence is attached.

## 4. Squashing Commits

Use an interactive rebase to combine related commits into one clean commit when appropriate.

Do not rewrite shared or protected branch history without approval.

## 5. Merge Conflict Resolution

1. Read the conflict markers.
2. Compare both versions.
3. Keep the correct content from both changes where appropriate.
4. Remove all conflict markers.
5. Test the resolved file.
6. Stage and commit the resolution.

## 6. Git Commands

git status
git branch
git switch -c feature/week-1-day-5
git add .gitignore GIT_WORKFLOW.md
git commit -m "feat: document git workflow week-1-day-5"
git push -u origin feature/week-1-day-5

