# Adaptive Dodge — Dynamic Difficulty Adjustment

**README prose word count:** 649 (excludes code blocks and setup commands).

**Status — 16 November 2026:** Implemented browser-game prototype with player movement, falling obstacles, collision tracking, score, start/pause/restart, a deterministic dynamic difficulty controller, manual mode, player feedback, and labelled synthetic-input demonstration controls. The controller has eight automated tests. **Live gameplay has not yet been independently play-tested by the student.** Do not interpret this prototype as proof that DDA improves enjoyment.

## What works

The player uses A/D or the arrow keys to dodge obstacles. Difficulty begins at level 2. Every 10 seconds of **active play**, the controller checks collisions. Two or more collisions reduce difficulty by one. Two consecutive zero-collision windows increase difficulty by one. Otherwise the level stays the same. Levels are bounded 1–5. Higher levels increase obstacle speed and spawn frequency. Switching off DDA stops automatic changes and enables a fixed difficulty selector. Every decision is explained in the interface.

## Technology and AI

- **HTML/CSS:** accessible page structure, status display, settings and feedback.
- **JavaScript Canvas:** player, obstacles, scoring, collision detection and rendering.
- **JavaScript `difficulty.js`:** auditable, rule-based performance adaptation; **no machine learning model or LLM** is used at runtime.
- **Node.js:** built-in test runner; no external packages or API keys.
- **AI assistance:** ChatGPT generated the first code, test cases, architecture drawing and documentation from the student's literature review and assignment brief. The student must independently inspect and test this output, record corrections and state what was verified or changed before submission. Generated examples are not empirical evidence about real users.

## Run locally

Requires a recent desktop browser and a simple static server. In the repository directory run:

```bash
py -m http.server 8000
```

Or `python -m http.server 8000` on systems where `py` is unavailable. Visit `http://localhost:8000`, press **Start game**, and move with A/D or left/right arrows. Press **Space** to pause when a button is not focused. Do not open `index.html` through `file://`: JavaScript module loading may be blocked.

## Automated tests

Requires Node.js. Run:

```bash
npm test
```

Eight controller tests cover difficulty increases and decreases, neutral windows, reset of consecutive success, fixed mode, level boundaries, parameter changes and invalid input. Automated tests do **not** substitute for running the game in a browser.

## Architecture and interaction examples

- [Architecture diagram](assets/architecture.svg) — labels implemented components and **simulated input**.
- [Three interaction walkthroughs](assets/interaction-scenarios.svg) — illustrative, not recordings of real players.
- The buttons labelled **Simulate 2 collisions** and **Simulate 2 clean windows** inject artificial windows into the controller. Messages explicitly mark these inputs as simulated. No synthetic event is presented as a real player observation.

## Development record

| Date/stage | Change and rationale | Evidence |
|---|---|---|
| 16 Nov — Foundation | Added playable Canvas loop, controls, obstacles and collision tracking. This provides observable activity from which a difficulty decision can be made. | Initial source commits |
| 16 Nov — Adaptive logic | Separated `difficulty.js` from rendering, implemented 10-second thresholds and levels 1–5. Transparent rules make adaptation explainable and testable. | `difficulty.js`, eight tests |
| 16 Nov — Agency | Added DDA toggle, manual difficulty and status/decision feedback. Responds to literature concerns about user control and predictability. | `index.html`, `game.js` |
| 16 Nov — Demonstration | Added labelled simulation controls and schematic interaction scenarios to demonstrate states without claiming real user evidence. | `assets/`, demo buttons |
| **To complete — student testing** | Record direct browser observations, one genuine design revision with before/after comparison, and the associated commit. | **[ADD your observations and commit]** |

## Limitations and future possibilities

No user study or self-reported enjoyment data, long-term player model, persistent profile, multiplayer or mobile touch controls. The numerical thresholds are initial design hypotheses. A comparative user study of fixed vs automatic difficulty and reported agency is **planned only**, not implemented.

## Submission identifiers

- Repository: https://github.com/ArmanAli05/adaptive-dodge-iis
- README: https://github.com/ArmanAli05/adaptive-dodge-iis/blob/main/README.md
- Published game: **[Add GitHub Pages URL after verifying deployment]**
- Submitted revision/commit SHA: **[Add final full SHA before submission]**
- Report: submitted separately; link it here if included in the repository.
