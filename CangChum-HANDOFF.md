# CangChum — Project Handoff

**Purpose:** Give a future developer or AI assistant enough verified context to maintain CangChum without rebuilding it or guessing at how code execution works.

**Project location (current Windows workspace):** `C:\Users\Psalm Racaza\PROGRAMMING\IdeaProjects\Real solo Projects\CangChum`

**Handoff prepared:** 2026-11-08 (Asia/Manila)

## 1. What this project is

CangChum is a browser-based Cangjie learning platform. It contains a 20-lesson curriculum, a problem workspace with an editor and custom stdin field, a dashboard, progress tracking, and a backend that compiles and executes Cangjie submissions in isolated Docker containers.

The implementation is intentionally lightweight:

- Browser UI: plain HTML, CSS, and JavaScript; no frontend framework or package dependencies.
- Backend: Node.js built-in `http`, `child_process`, and filesystem APIs; no npm runtime dependencies.
- Compiler: official Linux x86_64 Cangjie SDK 1.0.5 inside a local Docker image.
- Progress and preferences: browser `localStorage`; there is no account system or database.

## 2. Current project state

- Curriculum: **20 lessons, 100 problems, 520 official test cases**.
- Distribution: each lesson has five problems (2 Easy, 2 Medium, 1 Hard); overall 40 Easy, 40 Medium, 20 Hard.
- Batch 1 (Lessons 1–10): 50 problems and 270 cases.
- Batch 2 (Lessons 11–20): 50 problems and 250 cases.
- Intended runner image: `cangchum-cangjie:1.0.5`.
- Backend setting: `CANGJIE_RUNNER_IMAGE=cangchum-cangjie:1.0.5`.
- Local app port: `4173` by default; bind address is loopback (`127.0.0.1`).

### Validation history and scope

Validation recorded during the work on this project:

- Docker Desktop Linux engine and the `cangchum-cangjie:1.0.5` image were available; backend health reported Cangjie Compiler 1.0.5 ready.
- Real Cangjie source was compiled and executed inside the container. Batch 2 had **50/50 sample programs** and **250/250 official cases** pass in a prior full run.
- The most recent API spot check accepted a correct Lesson 11.1 program on 5/5 cases and returned the expected Wrong Answer, Compilation Error, and Runtime Error states for deliberately invalid submissions.
- A custom Run API call with two input lines returned `alpha|beta`, confirming multiline stdin.
- Curriculum regeneration and structural checks reported 20 lessons, 100 problems, 520 cases, no duplicate IDs, and no malformed records. The served curriculum endpoint returned HTTP 200 with `Cache-Control: no-cache`.
- A full 520-case execution was **not** rerun in the most recent verification. Do not describe the entire 520-case suite as freshly passing unless it is actually rerun.

## 3. Important files

| File | Responsibility |
| --- | --- |
| `index.html` | App shell, dashboard/curriculum/workspace markup, theme initialization. |
| `src/app.js` | UI rendering and events, navigation, editor, browser persistence, runner calls, status/results. |
| `src/styles.css` | Main visual styles, responsive layout, dark theme. |
| `src/output-diff.js` | Bounded output comparison/diff display for wrong answers. |
| `assets/` | Supporting UI, layout, motion, icon, and background styles/scripts. |
| `server.mjs` | Static-file server, runner health checks, `/api/run`, Docker process orchestration, test judging. |
| `Dockerfile.runner` | Builds the Linux compiler image from the official SDK archive. |
| `Cangjie_CodeChum_Batch1_Lessons1-10.md` | Authoritative Markdown source for Batch 1. |
| `Cangjie_CodeChum_Batch2_Lessons11-20.md` | Authoritative Markdown source for Batch 2. This source file is currently untracked in Git; preserve it. |
| `data/build-curriculum.mjs` | Parses both Markdown banks, validates their structure, writes generated JSON. |
| `data/curriculum.json` | Generated runtime curriculum consumed by the browser and backend. Do not hand-edit as the durable source of truth. |
| `README.md` | Setup, runner build, security settings, and user-facing overview. |
| `IMPLEMENTATION_PLAN.md` | Historical implementation notes; parts are stale (see below). |
| `.gitignore` | Excludes the downloaded SDK archive and temporary smoke-test files. |

### Existing worktree changes

At handoff time, these files already had changes in the shared worktree: `README.md`, `data/build-curriculum.mjs`, `data/curriculum.json`, `index.html`, and `server.mjs`. The Batch 2 Markdown source was untracked. These are intentional project work and must not be reset or discarded without checking with the user. This handoff file is an additional new file.

## 4. How the curriculum is maintained

The Markdown files are the editable source. `data/build-curriculum.mjs` reads them and creates `data/curriculum.json`, preserving each problem's `sourceMarkdown` alongside structured problem fields and test cases.

To rebuild after editing either bank:

```powershell
npm run build:data
```

The builder currently enforces 20 lessons, five problems per lesson, unique problem IDs, the 2/2/1 difficulty split, required problem/sample fields, at least five tests per problem, and exactly 520 cases total. If the curriculum is intentionally expanded or cases are added, update the applicable count checks and documentation deliberately; do not weaken validation just to make a build pass.

The Batch 2 parser also removes the editorial footer from the final problem statement and turns indented Markdown examples into fenced code blocks so they render as code in the workspace.

The corrected Batch 2 source data includes these audited fixes:

- Problem 11.2, test 5: expected output `C`.
- Problem 11.4, test 3: expected output `3`.
- Problem 14.5, test 2: input includes all required lines (`2`, `5`, `8`).

These values live in the Markdown source and should survive regeneration.

## 5. Application behavior and persistence

### Main UI flows

- Dashboard shows completion, attempts, lesson progress, difficulty progress, and recent activity.
- Curriculum view provides lesson navigation and difficulty/status filters.
- Workspace shows the problem statement, sample, official tests, Cangjie editor, custom input, and execution results.
- Navigation uses URL fragments such as `#dashboard`, `#curriculum`, and `#workspace/11.1`.
- Dark mode is toggled in the UI and persisted separately from study progress.
- The editor is a textarea with a syntax-highlight overlay and line-number gutter, not Monaco or a language server. It handles Tab indentation, Enter indentation, bracket matching, copy/reset, resize, and saved code.

### Browser storage

- `cangchum-progress-v1`: saved code by problem, completion, attempts, review flags, latest/best submission metadata, and recent activity (capped at 40 records).
- `cangchum-theme`: `dark` or `light`.
- `cangchum-custom-input:<problemId>`: custom stdin for each problem.
- `cangchum-split-width`: workspace panel split preference.

Data is per browser profile/device. There is no user login, cloud sync, server-side progress, or database migration system.

## 6. Backend API

Start with `npm start`. `PORT` is optional and defaults to 4173. Set the runner image in the same process environment before starting the server.

### `GET /api/health`

The health check verifies Docker CLI availability, daemon connectivity, the configured local image, and `cjc --version` inside a restricted container. A successful response includes `runnerAvailable: true`, compiler version, and runner image. A failed check disables execution in the UI; saved code remains in the browser.

### `POST /api/run`

JSON request shape:

```json
{
  "problemId": "11.1",
  "code": "main() { println(1) }",
  "mode": "run",
  "customInput": "hello\n"
}
```

- `mode: "run"`: sends `customInput` bytes to the program's stdin and returns actual stdout/stderr and execution status. Custom input is not judged against an official expected output.
- `mode: "submit"`: ignores custom input and executes the problem's official test cases. Completion is recorded client-side only when the response status is `Accepted`.
- Modes other than `run` and `submit`, missing problem IDs, invalid/empty code, oversized requests, and disallowed request origins are rejected.
- Judging normalizes CRLF to LF and ignores trailing newline characters only. Other output differences matter.

## 7. Docker runner details

### Build and start on Windows

Requirements: Node.js 20+, Docker Desktop with its Linux/WSL 2 engine running, and the official Linux x64 SDK archive `cangjie-sdk-linux-x64-1.0.5.tar.gz` in the repository root. The local SDK archive is ignored by Git; a fresh checkout needs its own download.

```powershell
docker info
docker build -f Dockerfile.runner --build-arg SDK_ARCHIVE=cangjie-sdk-linux-x64-1.0.5.tar.gz -t cangchum-cangjie:1.0.5 .
docker run --rm cangchum-cangjie:1.0.5 cjc --version
$env:CANGJIE_RUNNER_IMAGE = "cangchum-cangjie:1.0.5"
npm start
```

The image is Debian Bookworm slim plus SDK runtime dependencies. It installs the SDK at `/opt/cangjie`, sets `CANGJIE_HOME`, and loads `/opt/cangjie/envsetup.sh` through its entrypoint so compiler and runtime paths are set for both compiler and executable. Submitted code never uses the Windows compiler.

### Per-submission execution flow

1. Backend writes submitted source to a temporary host directory.
2. It starts a fresh `docker run --interactive` container and pipes stdin to it.
3. Container mounts source at `/input` read-only; compiler writes the executable in a temporary writable `/work` tmpfs.
4. `/bin/sh` compiles `/input/main.cj` to `/work/main`, writes diagnostics to a log, emits a unique compile-success marker, and executes the binary.
5. Backend separates compiler diagnostics from program stdout by marker and maps compile failures, runtime failures, timeouts, and output overflow to API result statuses.
6. Temporary host files are removed when the run finishes. Submit starts a separate container for each test case.

### Isolation and limits in `server.mjs`

Execution containers use:

- `--network=none`
- `--read-only` root filesystem
- Read-only bind mount for source
- Non-root UID/GID `65534:65534`
- `--cap-drop=ALL` and `--security-opt=no-new-privileges`
- 512 MiB memory, one CPU, 32 process limit
- CPU/file-size ulimits
- Writable `/work` tmpfs (32 MiB, executable) for compilation and output binary
- `/tmp` tmpfs (16 MiB, noexec)
- 8-second backend wall timeout
- 256,000-byte combined stdout/stderr limit
- Two simultaneous runs maximum
- Ten official test cases maximum per submission

Keep these restrictions intact when changing the runner. Do not mount the source writable, enable network access, run as root, mount the host filesystem, or expose the Docker socket to untrusted code.

## 8. Important constraints and known limitations

- **Local-only binding:** `server.mjs` listens on `127.0.0.1`. The run handler accepts browser Origin only for `http://127.0.0.1:<PORT>` or `http://localhost:<PORT>`. This is a local development configuration, not a production internet deployment configuration.
- **No authentication or rate limiting:** The local app was designed as a single-user development project. Before public deployment, add authentication/authorization, request throttling/abuse controls, HTTPS, and an intentional public-origin policy. Do not simply expose the current runner API to the internet.
- **Docker daemon access:** The Node backend starts Docker CLI containers. In a cloud deployment, it needs access to an appropriate Docker engine. Giving an app container the host Docker socket is effectively host-admin access; prefer running the backend as a controlled host service or redesign the execution boundary instead of casually mounting the socket.
- **Cloudflare:** Pages can serve the static frontend but cannot run this backend's local `docker` commands. Cloudflare Containers can host Linux images, but routing short-lived compiler work through it requires adapting the current runner orchestration. A Linux VPS with Docker is the least-change deployment target; Cloudflare can still provide DNS/proxy/static hosting.
- **Progress is local:** Browser storage is not synced between devices and may be cleared by the browser.
- **Editor is lightweight:** There is no language server, full IDE completion, diagnostics before submission, or Monaco editor.
- **Unicode problem coverage:** Lesson 11 exercises explicitly constrain tested string indexing/size and Rune inputs to ASCII. Actual Cangjie 1.0.5 probes showed `String.size` counts UTF-8 bytes, `String[index]` returns a byte (`UInt8`), and `String.runes()` iterates Unicode Runes. Do not add Unicode cases to ASCII-constrained problems without intentionally changing their requirements.
- **Problem 19.2:** The prompt defines a fixed no-input sequence, so its five black-box I/O cases necessarily produce the same result. Meaningfully testing empty/one/multiple-element iteration requires changing the problem contract to accept some parameter; do not invent input while claiming the current prompt is unchanged.
- **No automated npm test script:** `package.json` only defines `start` and `build:data`. Data build validation is not equivalent to compiling every sample or rerunning all official cases.
- **Historical doc drift:** `IMPLEMENTATION_PLAN.md` describes an earlier stage where Docker was unavailable and only the initial 10-lesson batch existed. Treat it as history, not current operational truth. `README.md` is the current operational guide; this handoff supplements it.

## 9. Suggested first steps for a future AI/code agent

1. Read this file, `README.md`, `server.mjs`, `Dockerfile.runner`, and the relevant curriculum Markdown before editing.
2. Check `git status` first. Preserve the existing worktree changes and the untracked Batch 2 source file.
3. Keep Markdown source authoritative; regenerate JSON with `npm run build:data` after curriculum changes.
4. For runner changes, test with the real `cangchum-cangjie:1.0.5` image and the existing security flags. Never claim execution based on mocked compiler output.
5. For an API/UI change, verify the matching real endpoint or browser flow. Report exactly which tests ran; distinguish prior validation from a fresh run.
6. Avoid changing unrelated curriculum, UI, or backend behavior when the task is limited to one area.

## 10. Quick troubleshooting

| Symptom | Likely cause / check |
| --- | --- |
| “Docker is not available” | `docker --version` cannot run from the Node process, Docker CLI is missing from its PATH, or Docker Desktop is stopped. |
| “Docker service is not running” | Check `docker info`; ensure Docker Desktop is using Linux containers and its WSL 2 engine is running. |
| Configured image unavailable | Inspect `CANGJIE_RUNNER_IMAGE`; build/tag the image exactly as `cangchum-cangjie:1.0.5`. |
| Compiler inaccessible | Run `docker run --rm cangchum-cangjie:1.0.5 cjc --version`; inspect image entrypoint and SDK archive layout. |
| Browser says local execution service is unreachable | Check the app process, port, `/api/health`, browser origin, and local firewall. |
| Source examples or corrected outputs disappear after rebuild | Edit the Markdown source, not only `data/curriculum.json`; rebuild and inspect the generated problem record. |
| Run works but Submit differs | Run ignores official expected outputs; Submit uses only that problem's registered cases. Inspect its `testCases` in generated JSON. |

