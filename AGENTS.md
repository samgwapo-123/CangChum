# CangChum: No Changes Without Permission

**Applies to:** any AI assistant or developer working on this repository (Codex, Claude, or anyone else).

**Owner:** Psalm. Only the owner can authorize a change.

## The rule

**Do not modify anything in this project unless the owner explicitly says so.**

That covers code, curriculum, configuration, Docker setup, documentation, Git history, and the owner's machine. If the owner has not clearly told you to change a specific thing, do not change it.

## What you may do without asking

- Read files and explain how they work.
- Audit, review, and question the code or plan.
- Report bugs, risks, and stale documentation.
- Describe a proposed change in plain words (what, where, why, and what could go wrong).
- Run read-only commands, such as listing files, `git status`, `git diff`, or `docker --version`.

## What needs explicit permission first

Ask, then wait for a clear "yes, do it" for each of these:

- Editing, creating, renaming, moving, or deleting any file.
- Running commands that write anything (builds, installs, formatters, generators).
- Running `npm run build:data`, which overwrites `data/curriculum.json`.
- Building, tagging, pulling, or removing Docker images or containers.
- Running the full test suite or submitting code to the runner (it starts containers and creates temporary files).
- Any Git write action: commit, push, pull, merge, rebase, reset, checkout, stash, clean, or branch changes.
- Installing, updating, or removing any dependency or tool.
- Changing environment variables, ports, firewall settings, or system services.
- Deploying anything, or exposing the app to a network or the internet.

## What counts as permission

- Permission is **specific**. "Fix the Origin check" allows that fix only. It does not allow other edits you notice along the way.
- Permission is **one-time**. Approval for one change does not carry over to later changes.
- Silence, "sounds good", or "maybe later" is **not** permission.
- If the request is unclear, ask one short question. Do not guess.

## Protected items (do not touch unless named by the owner)

- **Existing worktree changes:** `README.md`, `data/build-curriculum.mjs`, `data/curriculum.json`, `index.html`, `server.mjs`. These are intentional work. Do not reset, revert, or discard them.
- **Curriculum sources:** `Cangjie_CodeChum_Batch1_Lessons1-10.md` and `Cangjie_CodeChum_Batch2_Lessons11-20.md` are the authoritative source. Preserve them, including the audited fixes for 11.2 (test 5), 11.4 (test 3), and 14.5 (test 2).
- **`data/curriculum.json`:** generated. Never hand-edit it as the durable source.
- **Validation rules in `data/build-curriculum.mjs`:** do not weaken them just to make a build pass.
- **Docker isolation in `server.mjs`:** keep `--network=none`, read-only root filesystem, read-only source mount, non-root UID/GID `65534:65534`, `--cap-drop=ALL`, `no-new-privileges`, and the memory, CPU, process, output, time, and concurrency limits. Never mount the source writable, enable network access, run as root, mount the host filesystem, or expose the Docker socket to untrusted code.
- **Pinned compiler version:** Cangjie SDK 1.0.5, image `cangchum-cangjie:1.0.5`. Do not upgrade or rebuild against a newer version.
- **Local-only binding:** the server listens on `127.0.0.1`. Do not change this or expose the runner API publicly.
- **Git:** do not discard uncommitted work or untracked files.

## How to propose a change

When you think something should change, send the owner a short note with:

1. **What** you would change and in which file.
2. **Why** it is needed.
3. **Risk** to anything else (judging, security, progress data, curriculum).
4. **How it would be checked** afterwards.

Then stop and wait for the owner's decision.

## Honesty rules

- Say exactly what you read, ran, or checked. Do not claim a test passed unless it ran.
- Do not describe the full 520-case suite as passing unless it was actually rerun.
- Do not report mocked or imagined compiler output as real.
- If you changed something by mistake, say so immediately and describe how to undo it. Do not hide it.

## If in doubt

**Do nothing, and ask.**