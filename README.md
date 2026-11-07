# CangChum

CangChum is a local Cangjie study platform built from the supplied Batch 1 lesson bank. It includes the ten original lessons, their 50 problems and 270 test cases, a progress dashboard, a problem workspace, and an isolated execution-service boundary.

## Start the app

Requirements: Node.js 20 or later. No npm packages are required.

```powershell
npm start
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). The app stores saved code, review flags, attempts, submissions, and completion in this browser's local storage.

To rebuild the structured curriculum after editing the source lesson document:

```powershell
npm run build:data
```

## Cangjie execution

The local Cangjie 1.0.5 compiler is detected, but the sample executable compiled during setup crashed when launched on this Windows environment. Docker is also not installed here, so real submissions are currently disabled. The app reports this directly, saves the code, and does not create test results or mark problems complete.

Execution is only enabled when all of the following are available:

- Docker Engine with a local Cangjie runner image.
- The image contains `cjc`, the Cangjie runtime libraries, and `/bin/sh`.
- `CANGJIE_RUNNER_IMAGE` names the image before starting the server.

Example PowerShell setup:

```powershell
$env:CANGJIE_RUNNER_IMAGE = "your-local-cangjie-runner:tag"
npm start
```

The backend passes each program to a fresh container. Containers have no network, a read-only root filesystem, a read-only source mount, a non-root user, dropped Linux capabilities, 512 MB memory, one CPU, process, file-size and 256 KB combined output limits, and an eight-second wall timeout. At most two runs execute at once. Source and input files are temporary and removed after the run. The host compiler is never used to execute browser-submitted code.

Use `Run code` for the sample or a selected source test case. Use `Submit` for the full test suite. A problem is completed only after a real isolated run passes every required case.

## What's included

- Dashboard with overall and difficulty progress, current lesson, attempts, next problem, and recent activity.
- Navigation across all ten lessons, with every lesson available from the start.
- Difficulty, completion, attempt, and review filters.
- Problem statements, input/output formats, constraints, samples, and source test cases.
- Cangjie editor with language-specific highlighting, line numbers, indentation, matching brackets, saved code, reset, copy, and resizable panels.
- Run and submit actions with separate compilation, runtime, timeout, wrong-answer, and accepted states.
- Local progress and submission history that persists after refresh.
- Responsive dashboard, curriculum, and coding workspace.

## Current limits

- Real compilation and execution require the isolated Docker image described above. The installed Windows compiler did not run its compiled smoke-test executable successfully, and no Docker engine is present.
- Progress is stored per browser profile, not synchronized across devices.
- The lightweight editor provides Cangjie-specific syntax colors and keyboard editing, but does not include Monaco's full language-server features.
- Source questions and expected outputs are preserved as provided; any errors in the source document remain visible in the app.
