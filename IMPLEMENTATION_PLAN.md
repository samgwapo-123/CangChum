# Implementation plan

## Page kind and design deal

Software learning app for Cangjie beginners. The application itself is the product UI and the main study action is **Start next problem**. The taste skill deal selected `software`, the `putty-black-teal` palette, the `Geist` pairing, a split hero with the real UI, `nav-cards`, `footer-statement`, `close-word`, `space`, `arrow` buttons, and the `dots` mark. With no product photography or user-owned screenshots, the photo-dependent navigation cards are re-dealt to a text navigation. The dashboard and code workspace are live HTML; no stock art, decorative shader, or invented product screen is used. Landing-page moments and a marketing close are omitted because this is the working application.

## Phases

1. Inspect the starter directory, design rules, complete question bank, installed compiler, and available container tools.
2. Convert the source into structured data while retaining original Markdown and test cases; validate lesson count and difficulty distribution.
3. Build the dashboard, curriculum, filters, responsive workspace, and saved study state.
4. Add a container-only execution service with test evaluation and clear unavailable/error states.
5. Run the application, inspect key flows, validate all curriculum records, and document runtime setup and limitations.

## Verified inspection

- The source bank has ten lessons, five problems per lesson, a 2 Easy / 2 Medium / 1 Hard split, and 270 test cases.
- Cangjie Compiler 1.0.5 is installed. `cjc` compiled a minimal program, but the compiled Windows executable exited with access-violation code `0xC0000005`.
- Docker and Podman are not installed. Browser code therefore cannot be executed safely on the host, and the UI will report that the isolated runner is unavailable.

## Verification notes

- The curriculum build checks all 50 IDs, required statement/sample fields, per-lesson difficulty counts, and the test-case total. The data check passed with 20 Easy, 20 Medium, and 10 Hard problems.
- The local page and curriculum endpoints returned HTTP 200. The run endpoint returned HTTP 503 with `runner_unavailable`; it did not execute code or create a result. A cross-origin run request returned 403, and the server does not serve `server.mjs` as a static file.
- Headless captures were reviewed for the dashboard and coding workspace at desktop and phone widths. The design checker also ran at 1440, 1024, 820, 768, and 390 pixels. Its remaining failures mostly assume a marketing page with a single-screen hero, photography, and no scrollable curriculum rail. This app is a multi-screen working interface; its live dashboard and editor are the product UI. The actionable mobile text-clipping and internal-link findings were corrected.
